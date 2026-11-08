import { Request, Response } from 'express';
import { SAMPLE_WRITING_PROMPTS } from '../../../../shared/constants/sample-writing-prompts';
import { WritingAssessmentResult, WritingTaskType } from '../../../../shared/types/writing';
import { BandLevel } from '../../common/enums';
import { mapBandToTier } from '../../../../shared/utils/ielts-scoring';
import { callAiApi } from '../../services/ai/ai.helper';
import { prisma } from '../../database/prisma.client';

/**
 * Các mẫu viết tắt không chuẩn trong IELTS Academic Writing
 */
const INFORMAL_CONTRACTIONS: Record<string, string> = {
  "don't": 'do not',
  "doesn't": 'does not',
  "can't": 'cannot',
  "won't": 'will not',
  "isn't": 'is not',
  "aren't": 'are not',
  "haven't": 'have not',
  "hasn't": 'has not',
  "didn't": 'did not',
  "wasn't": 'was not',
  "weren't": 'were not',
  "it's": 'it is',
  "there's": 'there is',
  kids: 'children / adolescents',
  'a lot of': 'numerous / a substantial proportion of',
  gonna: 'going to',
  wanna: 'want to',
};

/**
 * Quét lỗi văn phong học thuật trong bài viết
 */
function scanAcademicToneIssues(text: string): Array<{
  foundSnippet: string;
  issueDescription: string;
  suggestedFormalReplacement: string;
}> {
  const issues: Array<{
    foundSnippet: string;
    issueDescription: string;
    suggestedFormalReplacement: string;
  }> = [];

  const lower = text.toLowerCase();
  for (const [informal, formal] of Object.entries(INFORMAL_CONTRACTIONS)) {
    const regex = new RegExp(`\\b${informal}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      issues.push({
        foundSnippet: matches[0],
        issueDescription:
          informal.includes("'")
            ? 'Lỗi dùng từ viết tắt (Contraction) trong văn phong học thuật'
            : 'Lỗi dùng từ ngữ thân mật / văn nói (Informal vocabulary)',
        suggestedFormalReplacement: formal,
      });
    }
  }

  return issues;
}

export class WritingController {
  /**
   * 1. Lấy danh sách đề bài Task 1 và Task 2 mẫu
   * GET /api/v1/writing/prompts
   */
  public static async getPrompts(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      data: SAMPLE_WRITING_PROMPTS,
    });
  }

  /**
   * 2. AI Examiner Chấm Chữa Chi Tiết & Nâng Cấp Bài Mẫu
   * POST /api/v1/writing/evaluate
   */
  public static async evaluateEssay(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        taskType = 'TASK_2_ESSAY',
        promptTitle,
        promptQuestion,
        visualDataDescription,
        userEssayText,
        targetBand = 7.5,
      } = req.body;

      if (!promptQuestion || !userEssayText || typeof userEssayText !== 'string') {
        res.status(400).json({
          success: false,
          message: 'promptQuestion and userEssayText are required.',
        });
        return;
      }

      // Đếm từ thực tế
      const words = userEssayText.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;

      const minWords = taskType === 'TASK_2_ESSAY' ? 250 : 150;
      const isWordCountPenalty = wordCount < minWords;

      // Quét lỗi văn phong học thuật
      const toneIssues = scanAcademicToneIssues(userEssayText);

      // Xây dựng System Instruction chuẩn Giám khảo Cambridge
      const systemInstruction = `
Bạn là Giám khảo IELTS Trưởng (Senior IELTS Examiner) của Cambridge & IDP với hơn 15 năm kinh nghiệm chấm thi.
Bạn chấm bài viết dựa trên đúng 4 tiêu chí của Khung Đánh Giá IELTS Writing Chính Thức:
1. Task Achievement (Task 1) / Task Response (Task 2)
   - Task 1: Overview rõ ràng, chọn lọc số liệu nổi bật (Key features), so sánh thỏa đáng.
   - Task 2: Trả lời trọn vẹn mọi vế của đề bài, lập luận mạch lạc, dẫn chứng xác đáng.
2. Coherence and Cohesion
   - Tổ chức đoạn văn logic (Introduction, Body Paragraphs, Conclusion).
   - Sử dụng từ nối (Signpost words / Linking devices) tự nhiên, không lạm dụng máy móc.
3. Lexical Resource
   - Vốn từ học thuật phong phú, collocations tự nhiên, tránh dùng từ hoa mỹ gượng gạo hoặc viết tắt/văn nói.
4. Grammatical Range and Accuracy
   - Sử dụng đa dạng câu phức, mệnh đề quan hệ, câu chẻ, câu bị động, đảo ngữ với độ chính xác cao.

ĐẶC BIỆT:
1. Viết nhận xét tổng thể (cambridgeExaminerComment) theo đúng phong thái "Examiner's Comment" trong các sách Cambridge Practice Tests (ngắn gọn, sắc bén, khen điểm mạnh cụ thể và chỉ ra hạn chế cốt lõi).
2. Sinh một BÀI VIẾT MẪU (upgradedModelAnswer) đạt Band ${targetBand}+ ĐƯỢC PHÁT TRIỂN VÀ NÂNG CẤP TRỰC TIẾP TỪ CHÍNH Ý TƯỞNG CỦA HỌC VIÊN. Không thay đổi cốt truyện/ý chính của học viên, mà nâng cấp ngôn từ, từ nối và cấu trúc ngữ pháp học thuật.
Xuất kết quả hoàn toàn bằng định dạng JSON theo schema yêu cầu.
`;

      const prompt = `
Đề bài (${taskType}):
"${promptQuestion}"

${visualDataDescription ? `Dữ liệu số liệu biểu đồ (Task 1):\n${visualDataDescription}\n` : ''}

Bài viết của học viên (${wordCount} từ - ${isWordCountPenalty ? `⚠️ CẢNH BÁO DƯỚI ${minWords} TỪ` : 'Đủ độ dài'}):
"""
${userEssayText}
"""

Hãy chấm điểm và xuất định dạng JSON chuẩn xác:
{
  "overallBand": number (ví dụ: 6.0),
  "bandTier": "ZERO_FOUNDATION" | "BELOW_4_5" | "BAND_4_5_TO_6_0" | "BAND_6_0_TO_7_5" | "BAND_7_5_PLUS",
  "wordCount": ${wordCount},
  "wordCountPenalty": ${isWordCountPenalty},
  "taskType": "${taskType}",
  "criteria": {
    "taskAchievementOrResponse": {
      "score": number,
      "title": "${taskType === 'TASK_2_ESSAY' ? 'Task Response' : 'Task Achievement'}",
      "comment": string (nhận xét cụ thể tiêu chí này),
      "strengths": string[],
      "weaknesses": string[]
    },
    "coherenceAndCohesion": {
      "score": number,
      "title": "Coherence and Cohesion",
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
    }
  },
  "cambridgeExaminerComment": string (Viết theo đúng văn phong Examiner's Comment của Cambridge),
  "upgradedModelAnswer": {
    "targetBand": ${targetBand},
    "modelEssayText": string (Toàn văn bài viết mẫu đạt Band ${targetBand}+ phát triển từ ý tưởng của học viên),
    "keyImprovementsAnalysis": string[] (3-4 điểm cải tiến quan trọng nhất),
    "vocabularyUpgrades": [
      { "original": string, "upgraded": string, "explanation": string }
    ]
  }
}
`;

      const aiResponse = await callAiApi<WritingAssessmentResult>({
        prompt,
        systemInstruction,
        options: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });

      const assessmentData = aiResponse.data;
      assessmentData.academicToneIssues = toneIssues;

      // Lưu kết quả chấm điểm vào Database nếu có userId
      if (userId) {
        try {
          await prisma.aiEvaluationRecord.create({
            data: {
              userId,
              skill: 'WRITING',
              examType: taskType.includes('GENERAL') ? 'GENERAL_TRAINING' : 'ACADEMIC',
              taskType,
              userInputText: userEssayText,
              aiPrompt: promptQuestion,
              aiResponseText: JSON.stringify(assessmentData),
              estimatedBand: assessmentData.overallBand,
              bandTier: assessmentData.bandTier,
              criteriaScores: JSON.stringify(assessmentData.criteria),
              suggestedImprovements: JSON.stringify(
                assessmentData.upgradedModelAnswer.keyImprovementsAnalysis
              ),
            },
          });
        } catch (dbErr) {
          console.warn('[WritingController] Failed to save evaluation to DB:', dbErr);
        }
      }

      res.status(200).json({
        success: true,
        data: assessmentData,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Writing evaluation failed';
      res.status(500).json({ success: false, error: msg });
    }
  }
}
