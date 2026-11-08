import { Request, Response } from 'express';
import { SAMPLE_ACADEMIC_READING_EXAM } from '../../../../shared/constants/sample-reading-exams';
import { convertReadingRawScoreToBand } from '../../../../shared/utils/ielts-scoring';
import { ExamType, BandLevel } from '../../common/enums';
import { callAiApi } from '../../services/ai/ai.helper';
import { AiReadingMentorResponse } from '../../../../shared/types/reading';

export class ReadingController {
  /**
   * 1. Lấy toàn bộ đề thi IELTS Reading (3 Passages, 40 câu hỏi)
   * GET /api/v1/reading/exam-paper
   */
  public static async getExamPaper(req: Request, res: Response): Promise<void> {
    const examType = (req.query.type as ExamType) || ExamType.ACADEMIC;

    // Ẩn correctAnswer khi học viên đang làm bài
    const sanitizedExam = {
      ...SAMPLE_ACADEMIC_READING_EXAM,
      examType,
      questions: SAMPLE_ACADEMIC_READING_EXAM.questions.map((q) => ({
        ...q,
        correctAnswer: undefined, // Ẩn đáp án
        contextQuote: undefined,
      })),
    };

    res.status(200).json({
      success: true,
      data: sanitizedExam,
    });
  }

  /**
   * 2. Chấm điểm bài thi IELTS Reading tự động
   * POST /api/v1/reading/grade
   */
  public static async gradeExam(req: Request, res: Response): Promise<void> {
    try {
      const { userAnswers = {}, examType = ExamType.ACADEMIC } = req.body as {
        userAnswers: Record<string | number, string>;
        examType: ExamType;
      };

      let rawScore = 0;
      let p1 = 0;
      let p2 = 0;
      let p3 = 0;

      const details = SAMPLE_ACADEMIC_READING_EXAM.questions.map((q) => {
        const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
        const expected = q.correctAnswer.toLowerCase();

        // Xử lý các đáp án tương đương (ví dụ roman numerals hoặc multiple choice)
        let isCorrect = false;
        if (expected.includes('//')) {
          const branches = expected.split('//').map((s) => s.trim());
          isCorrect = branches.includes(userAns);
        } else {
          isCorrect = userAns === expected;
        }

        if (isCorrect) {
          rawScore++;
          if (q.passageNumber === 1) p1++;
          if (q.passageNumber === 2) p2++;
          if (q.passageNumber === 3) p3++;
        }

        return {
          questionId: q.id,
          passageNumber: q.passageNumber,
          type: q.type,
          userAnswer: userAnswers[q.id] || '',
          correctAnswer: q.correctAnswer,
          isCorrect,
          contextQuote: q.contextQuote,
        };
      });

      // Quy đổi sang Band điểm chuẩn theo từng hình thức thi (Academic vs General)
      const bandScore = convertReadingRawScoreToBand(rawScore, examType === ExamType.ACADEMIC);

      res.status(200).json({
        success: true,
        data: {
          rawScore,
          bandScore,
          examType,
          passage1Score: p1,
          passage2Score: p2,
          passage3Score: p3,
          details,
        },
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Grading reading exam failed';
      res.status(500).json({ success: false, error: msg });
    }
  }

  /**
   * 3. AI Trợ Giảng Cá Nhân Hóa Theo Band Điểm Học Viên
   * POST /api/v1/reading/ai-mentor
   */
  public static async consultAiMentor(req: Request, res: Response): Promise<void> {
    try {
      const {
        questionId,
        questionType,
        questionPrompt,
        userAnswer,
        correctAnswer,
        contextSentenceOrParagraph,
        studentBandLevel = BandLevel.BAND_4_5_TO_6_0,
      } = req.body;

      if (!questionId || !questionPrompt || !correctAnswer || !contextSentenceOrParagraph) {
        res.status(400).json({
          success: false,
          message: 'Missing required parameters: questionId, questionPrompt, correctAnswer, contextSentenceOrParagraph',
        });
        return;
      }

      const isFoundationTier =
        studentBandLevel === BandLevel.ZERO_FOUNDATION ||
        studentBandLevel === BandLevel.BELOW_4_5 ||
        studentBandLevel === BandLevel.BAND_4_5_TO_6_0;

      let systemInstruction = '';
      let prompt = '';

      if (isFoundationTier) {
        // Dành cho Band < 4.5 và 4.5 - 6.0: Tập trung dịch nghĩa tiếng Việt, giải thích từ vựng và chỉ rõ cặp từ đồng nghĩa paraphrase
        systemInstruction = `
Bạn là Gia sư IELTS Reading tận tụy, chuyên hỗ trợ học viên ở trình độ Mất gốc đến Trung cấp (Band dưới 6.0).
Phong cách: Giải thích ân cần, dễ hiểu bằng tiếng Việt.
Nhiệm vụ:
1. Dịch nghĩa tiếng Việt câu văn khó/đoạn trích trong bài đọc.
2. Liệt kê 3-4 từ vựng cốt lõi kèm phiên âm và nghĩa.
3. Chỉ rõ các cặp từ đồng nghĩa (Paraphrase pairs) giữa câu hỏi đề thi và văn bản bài đọc dẫn tới đáp án.
4. Mẹo làm bài thực tế để lấy điểm.
Trả về định dạng JSON thuần túy theo schema yêu cầu.
`;

        prompt = `
Học viên đang ở cấp độ Band: ${studentBandLevel} (< 6.0).
Câu hỏi ${questionId} (${questionType}): "${questionPrompt}"
Đáp án học viên chọn: "${userAnswer || '(Bỏ trống)'}"
Đáp án đúng: "${correctAnswer}"
Đoạn văn trích dẫn trong bài đọc:
"""
${contextSentenceOrParagraph}
"""

Xuất kết quả dưới định dạng JSON:
{
  "questionId": ${questionId},
  "studentBandLevel": "${studentBandLevel}",
  "mode": "FOUNDATION_SUPPORT",
  "vietnameseTranslation": string (bản dịch tiếng Việt mượt mà của đoạn trích),
  "coreVocabularyList": [
    { "word": string, "meaning": string, "phonetic": string }
  ],
  "paraphraseClues": [
    { "inQuestion": string, "inReadingPassage": string }
  ],
  "actionableExamTip": string (mẹo nhận diện từ khóa cho học sinh)
}
`;
      } else {
        // Dành cho Band 6.0 - 7.5 và 7.5+: Tập trung phân tích cấu trúc lập luận học thuật và bóc tách ranh giới FALSE/NO vs NOT GIVEN
        systemInstruction = `
Bạn là Giám khảo IELTS Trưởng kiêm Chuyên gia Phân tích Học thuật (Band 7.5+ to 9.0).
Phong cách: Học thuật sắc bén, logic và chuyên sâu.
Nhiệm vụ:
1. Phân tích cấu trúc lập luận logic (Logical Argument Structure) và thái độ tác giả (Author's Stance/Tone).
2. Phân tích sâu sắc ranh giới giữa FALSE / NO (thông tin trong bài mâu thuẫn trực tiếp với câu hỏi) và NOT GIVEN (thông tin suy diễn ngoài bài hoặc không được khẳng định).
3. Chỉ ra cạm bẫy gây nhiễu tinh vi của đề thi Cambridge.
4. Chiến thuật tối ưu tốc độ đọc và độ chính xác tuyệt đối.
Trả về định dạng JSON thuần túy theo schema yêu cầu.
`;

        prompt = `
Học viên đang ở cấp độ Nâng cao: ${studentBandLevel} (Band 6.0 - 7.5+).
Câu hỏi ${questionId} (${questionType}): "${questionPrompt}"
Đáp án học viên chọn: "${userAnswer || '(Chưa chọn)'}"
Đáp án đúng: "${correctAnswer}"
Đoạn văn học thuật:
"""
${contextSentenceOrParagraph}
"""

Xuất kết quả dưới định dạng JSON:
{
  "questionId": ${questionId},
  "studentBandLevel": "${studentBandLevel}",
  "mode": "ADVANCED_ANALYSIS",
  "logicalArgumentAnalysis": string (phân tích cấu trúc logic luận điểm của tác giả),
  "authorStanceAndTone": string (thái độ, quan điểm ngầm hiểu của tác giả),
  "falseVsNotGivenDistinction": string (lý giải tại sao là False hay Not Given, bóc tách ranh giới suy diễn),
  "actionableExamTip": string (chiến thuật tư duy phản biện cho Band 7.5+)
}
`;
      }

      const aiRes = await callAiApi<AiReadingMentorResponse>({
        prompt,
        systemInstruction,
        options: {
          temperature: 0.1,
          responseMimeType: 'application/json',
        },
      });

      res.status(200).json({
        success: true,
        data: aiRes.data,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'AI Reading Mentor consultation failed';
      res.status(500).json({ success: false, error: msg });
    }
  }
}
