import { Request, Response } from 'express';
import { IELTS_SPEAKING_20_TOPICS, getSpeakingTopicById } from '../../../../shared/constants/speaking-topics-db';
import { SpeakingAssessmentResult, SpeakingTopicId } from '../../../../shared/types/speaking';
import { mapBandToTier } from '../../../../shared/utils/ielts-scoring';
import { callAiApi } from '../../services/ai/ai.helper';

/**
 * Controller xử lý nghiệp vụ Luyện thi IELTS Speaking & Phòng thi ảo AI
 */
export class SpeakingController {
  /**
   * Lấy danh sách 20 chủ điểm Speaking thông dụng
   * GET /api/v1/speaking/topics
   */
  public async getTopics(_req: Request, res: Response): Promise<void> {
    try {
      const summaryList = IELTS_SPEAKING_20_TOPICS.map((topic) => ({
        id: topic.id,
        name: topic.name,
        vietnameseName: topic.vietnameseName,
        icon: topic.icon,
        part1Count: topic.part1Questions.length,
        part2Title: topic.part2CueCard.topicTitle,
        part3Count: topic.part3Questions.length,
        collocationCount: topic.usefulCollocations.length,
        naturalPhraseCount: topic.suggestedNaturalPhrases.length,
      }));

      res.status(200).json({
        success: true,
        totalTopics: summaryList.length,
        data: summaryList,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tải danh sách chủ đề Speaking',
        error: error.message,
      });
    }
  }

  /**
   * Lấy chi tiết toàn bộ học liệu của một chủ đề theo Topic ID
   * GET /api/v1/speaking/topics/:topicId
   */
  public async getTopicDetail(req: Request, res: Response): Promise<void> {
    try {
      const topicId = String(req.params.topicId);
      const topic = getSpeakingTopicById(topicId);

      if (!topic) {
        res.status(404).json({
          success: false,
          message: `Không tìm thấy chủ điểm Speaking với mã ID: ${topicId}`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: topic,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi truy xuất chi tiết chủ đề Speaking',
        error: error.message,
      });
    }
  }

  /**
   * Đánh giá bản thu âm / transcript bài nói của thí sinh qua AI Examiner
   * POST /api/v1/speaking/evaluate
   */
  public async evaluateSpeech(req: Request, res: Response): Promise<void> {
    try {
      const {
        transcript,
        part,
        questionOrCard,
        prepNotes,
        topicId,
        targetBand = 7.5,
      } = req.body;

      if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp nội dung bản ghi âm hoặc văn bản (transcript) để giám khảo chấm điểm.',
        });
        return;
      }

      const cleanTranscript = transcript.trim();
      const validPart = [1, 2, 3].includes(Number(part)) ? (Number(part) as 1 | 2 | 3) : 2;

      // Xây dựng System Instruction chuẩn Giám khảo Cambridge IELTS Speaking
      const systemInstruction = `
Bạn là Giám khảo Trưởng IELTS Speaking (Senior Cambridge / IDP Speaking Examiner) với hơn 15 năm kinh nghiệm chấm thi trực tiếp.
Bạn chịu trách nhiệm lắng nghe, thẩm định transcript và chấm điểm bài nói của thí sinh dựa trên đúng 4 TIÊU CHÍ CHẤM THI CHÍNH THỨC của IELTS:
1. Fluency and Coherence (Độ trôi chảy và mạch lạc):
   - Part 1: Nói tự nhiên, kéo dài vừa phải, không ngập ngừng quá nhiều.
   - Part 2: Nói liên tục 1-2 phút, bám sát các bullet points trên Cue Card, liên kết ý logic.
   - Part 3: Phát triển ý tưởng trừu tượng, phân tích nguyên nhân/hệ quả, sử dụng từ nối đa dạng.
2. Lexical Resource (Vốn từ vựng):
   - Dùng từ chính xác theo ngữ cảnh, collocations tự nhiên, phrasal verbs, idiomatic language ăn điểm (C1/C2).
   - Tránh lặp từ đơn giản, giải thích linh hoạt khi thiếu từ (paraphrase).
3. Grammatical Range and Accuracy (Độ đa dạng và chính xác ngữ pháp):
   - Đa dạng thì thời, câu ghép, câu phức (mệnh đề quan hệ, câu điều kiện, câu nhượng bộ, đảo ngữ).
   - Độ chính xác chia động từ, giới từ, mạo từ và trật tự từ.
4. Pronunciation (Ngữ âm & Phát âm):
   - Đánh giá khả năng phát âm từ vựng (dựa trên transcript và từ vựng thí sinh lựa chọn).
   - Phân tích trọng âm từ (Word stress), ngữ điệu (Intonation), nối âm (Connected speech) và nhịp điệu (Rhythm).
   - Chỉ ra các từ thí sinh dễ phát âm sai trọng âm hoặc âm đuôi trong bài.

YÊU CẦU ĐẶC BIỆT:
1. "cambridgeExaminerComment": Nhận xét theo phong cách Giám khảo Cambridge (khách quan, trung thực, chỉ rõ ưu điểm và nhược điểm lớn nhất cần khắc phục).
2. "pronunciationAdvice": Liệt kê cụ thể ít nhất 2-3 từ vựng trong bài kèm phiên âm quốc tế IPA chuẩn xác và lỗi nhấn sai trọng âm người Việt hay mắc.
3. "vocabularyUpgrades": Chọn 3-5 từ/cụm từ học viên đã dùng trong bài và gợi ý cách nâng cấp thành idioms/collocations C1/C2 tự nhiên.
4. "upgradedBand8Transcript": Viết lại BÀI NÓI MẪU BAND 8.0 DỰA TRÊN CHÍNH Ý TƯỞNG CỦA HỌC VIÊN. Không bịa ra một câu chuyện hoàn toàn khác mà hãy nâng cấp ngôn từ, ngữ điệu và cấu trúc từ chính câu chuyện của học viên.

BẮT BUỘC TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON theo cấu trúc sau (không kèm markdown ngoài khối JSON):
{
  "overallBand": number (thang 1.0 - 9.0, bước 0.5),
  "bandTier": "ZERO_FOUNDATION" | "BELOW_4_5" | "BAND_4_5_TO_6_0" | "BAND_6_0_TO_7_5" | "BAND_7_5_PLUS",
  "partEvaluated": ${validPart},
  "questionOrCardTopic": string,
  "studentTranscript": string,
  "criteria": {
    "fluencyAndCoherence": {
      "score": number,
      "title": "Fluency and Coherence",
      "comment": string,
      "strengths": string[],
      "weaknesses": string[]
    },
    "lexicalResource": {
      "score": number,
      "title": "Lexical Resource",
      "comment": string,
      "strengths": string[],
      "weaknesses": string[]
    },
    "grammaticalRangeAndAccuracy": {
      "score": number,
      "title": "Grammatical Range and Accuracy",
      "comment": string,
      "strengths": string[],
      "weaknesses": string[]
    },
    "pronunciation": {
      "score": number,
      "title": "Pronunciation",
      "comment": string,
      "strengths": string[],
      "weaknesses": string[]
    }
  },
  "cambridgeExaminerComment": string,
  "pronunciationAdvice": {
    "wordStressIssues": [
      { "word": string, "incorrectAttempt": string, "correctIpa": string }
    ],
    "intonationAndLinkingTip": string
  },
  "vocabularyUpgrades": [
    { "originalWord": string, "upgradedIdiomOrCollocation": string, "explanation": string }
  ],
  "upgradedBand8Transcript": string
}
`;

      const userPrompt = `
PHÒNG THI IELTS SPEAKING - PART ${validPart}
Chủ đề / Đề bài: "${questionOrCard || 'General Speaking Assessment'}"
${prepNotes ? `Ghi chú chuẩn bị 1 phút của thí sinh (Part 2 Notes):\n"""\n${prepNotes}\n"""\n` : ''}
Bản ghi âm / Transcript bài nói của thí sinh:
"""
${cleanTranscript}
"""

Mục tiêu của thí sinh: Band ${targetBand}
Hãy thực hiện chấm điểm công tâm, chuyên nghiệp theo thang điểm Cambridge IELTS!
`;

      const aiResponse = await callAiApi<SpeakingAssessmentResult>({
        prompt: userPrompt,
        systemInstruction,
        options: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      });

      const assessmentData = typeof aiResponse.data === 'string'
        ? JSON.parse(aiResponse.data)
        : aiResponse.data;

      // Đảm bảo bandTier chuẩn xác
      if (!assessmentData.bandTier) {
        assessmentData.bandTier = mapBandToTier(assessmentData.overallBand || 6.0) as any;
      }
      assessmentData.studentTranscript = cleanTranscript;
      assessmentData.partEvaluated = validPart;
      assessmentData.questionOrCardTopic = questionOrCard || `IELTS Speaking Part ${validPart}`;

      res.status(200).json({
        success: true,
        data: assessmentData,
      });
    } catch (error: any) {
      console.error('Speaking assessment error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi Giám khảo AI chấm điểm bài nói IELTS Speaking',
        error: error.message,
      });
    }
  }

  /**
   * Sinh câu hỏi Part 3 trừu tượng dựa trên bài nói Part 2 của thí sinh
   * POST /api/v1/speaking/part3-questions
   */
  public async generatePart3Questions(req: Request, res: Response): Promise<void> {
    try {
      const { part2Topic, candidateSpeechSnippet } = req.body;

      const systemInstruction = `
Bạn là Giám khảo IELTS Cambridge điều phối phần thi Speaking Part 3 (Two-way Discussion).
Nhiệm vụ của bạn là đưa ra 3 câu hỏi Part 3 mang tính học thuật, trừu tượng, có liên hệ tự nhiên đến chủ đề Part 2 của thí sinh.
Trả về định dạng JSON thuần túy:
{
  "part3Questions": [
    {
      "id": number,
      "question": string,
      "analyticalAngle": string,
      "usefulVocabulary": string[]
    }
  ]
}
`;

      const prompt = `
Chủ đề Part 2 vừa thi: "${part2Topic || 'General Topic'}"
Tóm tắt nội dung bài nói của thí sinh: "${candidateSpeechSnippet || 'Thí sinh đã hoàn thành Part 2'}"
Hãy tạo 3 câu hỏi thảo luận chuyên sâu cho Part 3!
`;

      const aiResponse = await callAiApi<any>({
        prompt,
        systemInstruction,
        options: {
          temperature: 0.4,
          responseMimeType: 'application/json',
        },
      });

      const parsed = typeof aiResponse.data === 'string'
        ? JSON.parse(aiResponse.data)
        : aiResponse.data;

      res.status(200).json({
        success: true,
        data: parsed,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo câu hỏi Part 3',
        error: error.message,
      });
    }
  }
}

export const speakingController = new SpeakingController();
