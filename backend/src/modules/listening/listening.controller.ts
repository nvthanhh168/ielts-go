import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { CAMBRIDGE_LISTENING_TEST_1 } from '../../../../shared/constants/sample-listening-exam';
import {
  gradeSingleListeningQuestion,
  validateWordLimit,
} from '../../../../shared/utils/cambridge-grading';
import { getListeningFeedbackByScore } from '../../../../shared/constants/listening-feedback';
import {
  ListeningGradingResult,
  QuestionGradingDetail,
} from '../../../../shared/types/listening';
import { callAiApi } from '../../services/ai/ai.helper';

export class ListeningController {
  /**
   * 1. Lấy toàn bộ đề thi 4 Sections (40 câu) kèm hướng dẫn chuẩn Cambridge
   * GET /api/v1/listening/exam-paper
   */
  public static async getExamPaper(_req: Request, res: Response): Promise<void> {
    // Ẩn correctAnswerPattern khi học viên đang làm bài để đảm bảo tính khách quan
    const sanitizedSections = CAMBRIDGE_LISTENING_TEST_1.sections.map((section) => ({
      ...section,
      fullTapescript: undefined, // Không gửi tapescript trước khi nộp bài
      questions: section.questions.map((q) => ({
        ...q,
        correctAnswerPattern: undefined, // Ẩn đáp án
        tapescriptSnippet: undefined,
      })),
    }));

    res.status(200).json({
      success: true,
      data: {
        id: CAMBRIDGE_LISTENING_TEST_1.id,
        title: CAMBRIDGE_LISTENING_TEST_1.title,
        series: CAMBRIDGE_LISTENING_TEST_1.series,
        totalQuestions: CAMBRIDGE_LISTENING_TEST_1.totalQuestions,
        listeningTimeMinutes: CAMBRIDGE_LISTENING_TEST_1.listeningTimeMinutes,
        transferTimeMinutes: CAMBRIDGE_LISTENING_TEST_1.transferTimeMinutes,
        sections: sanitizedSections,
      },
    });
  }

  /**
   * 2. Stream file âm thanh MP3 từ thư mục cục bộ của ứng dụng
   * GET /api/v1/listening/audio/:filename
   */
  public static async streamAudio(req: Request, res: Response): Promise<void> {
    const filename = String(req.params.filename);

    // Đường dẫn an toàn tới file MP3 trong thư mục làm việc của dự án
    const projectRoot = path.resolve(__dirname, '../../../../');
    const audioPath = path.join(projectRoot, filename);

    if (!fs.existsSync(audioPath)) {
      res.status(404).json({ success: false, message: `Audio file not found: ${filename}` });
      return;
    }

    const stat = fs.statSync(audioPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Hỗ trợ HTTP Range Request (206 Partial Content) cho Audio Player
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(audioPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
      };
      res.writeHead(200, head);
      fs.createReadStream(audioPath).pipe(res);
    }
  }

  /**
   * 3. Chấm điểm bài thi tự động chuẩn khảo thí Cambridge (Auto-grading Parser)
   * POST /api/v1/listening/grade
   */
  public static async gradeExam(req: Request, res: Response): Promise<void> {
    try {
      const { userAnswers = {} } = req.body as { userAnswers: Record<string | number, string> };

      let totalRawScore = 0;
      const sectionBreakdown = {
        section1: { correct: 0, total: 10 },
        section2: { correct: 0, total: 10 },
        section3: { correct: 0, total: 10 },
        section4: { correct: 0, total: 10 },
      };

      const details: QuestionGradingDetail[] = [];

      // Duyệt qua tất cả 40 câu hỏi trong đề thi
      for (const section of CAMBRIDGE_LISTENING_TEST_1.sections) {
        for (const question of section.questions) {
          const rawAnswer = userAnswers[question.id] || '';

          // Thực hiện chấm điểm bằng parser Cambridge
          const result = gradeSingleListeningQuestion(
            rawAnswer,
            question.correctAnswerPattern,
            question.wordLimit
          );

          if (result.isCorrect) {
            totalRawScore++;
            if (section.sectionNumber === 1) sectionBreakdown.section1.correct++;
            if (section.sectionNumber === 2) sectionBreakdown.section2.correct++;
            if (section.sectionNumber === 3) sectionBreakdown.section3.correct++;
            if (section.sectionNumber === 4) sectionBreakdown.section4.correct++;
          }

          details.push({
            questionId: question.id,
            section: section.sectionNumber,
            type: question.type,
            userAnswer: rawAnswer,
            correctAnswerPattern: question.correctAnswerPattern,
            isCorrect: result.isCorrect,
            score: result.score,
            wordCount: result.wordCount,
            numberCount: result.numberCount,
            wordLimitExceeded: result.wordLimitExceeded,
            acceptableAnswersList: result.acceptableAnswers,
            tapescriptSnippet: question.tapescriptSnippet,
          });
        }
      }

      // Lấy bảng tư vấn đánh giá theo 3 mức điểm (0-17, 18-27, 28-40)
      const feedback = getListeningFeedbackByScore(totalRawScore);

      const gradingResponse: ListeningGradingResult = {
        totalRawScore,
        estimatedBand: feedback.bandScore,
        performanceTier: feedback.tier.tierKey,
        tierTitle: feedback.tier.tierTitle,
        adviceMessage: feedback.tier.evaluationSummary,
        sectionBreakdown,
        details,
      };

      res.status(200).json({
        success: true,
        data: {
          result: gradingResponse,
          feedbackDetails: feedback.tier,
        },
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Grading failed';
      res.status(500).json({ success: false, error: msg });
    }
  }

  /**
   * 4. Gọi AI giải thích chi tiết vị trí đáp án trong Tapescript & phân tích bẫy (Distractors)
   * POST /api/v1/listening/explain-with-ai
   */
  public static async explainTapescriptWithAi(req: Request, res: Response): Promise<void> {
    try {
      const { questionId, userAnswer, correctAnswerPattern, tapescriptSnippet, questionPrompt } =
        req.body;

      if (!questionId || !correctAnswerPattern || !tapescriptSnippet) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: questionId, correctAnswerPattern, tapescriptSnippet',
        });
        return;
      }

      const systemInstruction = `
Bạn là Chuyên gia luyện thi IELTS Listening hàng đầu của Cambridge & IDP.
Nhiệm vụ của bạn là giải thích ngắn gọn, súc tích và cực kỳ sắc bén tại sao đáp án lại nằm ở vị trí đó trong Tapescript.
Phân tích:
1. Trích dẫn câu nói chính xác trong audio (Exact quote).
2. Phân tích bẫy (Distractor Trap) hoặc sự đổi ý của người nói (nếu có).
3. Từ vựng đồng nghĩa (Paraphrasing) giữa câu hỏi trong đề và từ ngữ người nói sử dụng trong audio.
4. Lời khuyên giúp học sinh tránh mất điểm trong các câu tương tự.
Trả về định dạng JSON thuần túy theo schema yêu cầu.
`;

      const prompt = `
Câu hỏi số ${questionId}:
- Đề bài: "${questionPrompt || 'Listening Question'}"
- Câu trả lời của học viên: "${userAnswer || '(Bỏ trống)'}"
- Đáp án chuẩn Cambridge: "${correctAnswerPattern}"
- Đoạn Tapescript liên quan:
"""
${tapescriptSnippet}
"""

Xuất kết quả dưới định dạng JSON:
{
  "questionId": ${questionId},
  "exactQuoteInAudio": string (câu trích dẫn trong băng),
  "analysisExplanation": string (giải thích ngắn gọn dễ hiểu bằng tiếng Việt),
  "distractorTraps": string (chỉ ra bẫy khiến thí sinh dễ chọn sai),
  "keyVocabularyParaphrased": [
    { "inQuestion": string, "inAudio": string }
  ]
}
`;

      const aiRes = await callAiApi<{
        questionId: number;
        exactQuoteInAudio: string;
        analysisExplanation: string;
        distractorTraps: string;
        keyVocabularyParaphrased: Array<{ inQuestion: string; inAudio: string }>;
      }>({
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
      const msg = error instanceof Error ? error.message : 'AI Explanation failed';
      res.status(500).json({ success: false, error: msg });
    }
  }
}
