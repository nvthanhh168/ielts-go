import { ENV_CONFIG } from '../../config/env.config';
import {
  AiCallOptions,
  AiPromptPayload,
  AiResponse,
  GeneratedPersonalizedRoadmap,
  IeltsSpeakingAssessment,
  IeltsWritingAssessment,
  RoadmapGenerationInput,
} from './ai.types';
import { ExamType, BandLevel, SkillType } from '../../common/enums';
import { BAND_TIER_CONFIGS, EXAM_TYPE_DEFINITIONS } from '../../../../shared/constants/ielts-levels';

/**
 * Mask an API key to securely log errors or diagnostics without leaking credentials
 */
function maskApiKey(key: string): string {
  if (!key || key.length < 10) return '***';
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

/**
 * Utility to delay execution for exponential backoff retries
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * CORE HELPER: Gọi AI API dùng chung cho toàn bộ hệ thống
 * Hỗ trợ timeout, retry tự động với exponential backoff, JSON parsing và validation
 *
 * @param payload Dữ liệu prompt và cấu hình
 * @returns AiResponse với dữ liệu đã được parse
 */
export async function callAiApi<T = string>(payload: AiPromptPayload): Promise<AiResponse<T>> {
  const startTime = Date.now();
  const apiKey = ENV_CONFIG.AI_API_KEY;
  const baseUrl = ENV_CONFIG.AI_API_BASE_URL;
  const model = payload.options?.model || ENV_CONFIG.AI_MODEL_NAME;
  const timeoutMs = payload.options?.timeoutMs || ENV_CONFIG.AI_REQUEST_TIMEOUT_MS;
  const maxRetries = payload.options?.retryAttempts ?? 2;
  const isJsonExpected = payload.options?.responseMimeType === 'application/json';

  if (!apiKey) {
    throw new Error('[AiHelper] AI_API_KEY is not configured in the environment.');
  }

  // Construct Google Generative AI compatible endpoint
  const url = `${baseUrl}/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  // Construct request payload
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [
    {
      role: 'user',
      parts: [{ text: payload.prompt }],
    },
  ];

  const requestBody: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: payload.options?.temperature ?? 0.3,
      topP: payload.options?.topP ?? 0.8,
      topK: payload.options?.topK ?? 40,
      maxOutputTokens: payload.options?.maxOutputTokens ?? 4096,
      responseMimeType: payload.options?.responseMimeType || 'text/plain',
    },
  };

  // Add system instruction if provided
  if (payload.systemInstruction) {
    requestBody.systemInstruction = {
      parts: [{ text: payload.systemInstruction }],
    };
  }

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= maxRetries) {
    try {
      attempt++;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        const status = response.status;
        
        // Log masked error
        console.error(
          `[AiHelper] HTTP Error ${status} (attempt ${attempt}/${maxRetries + 1}) using key ${maskApiKey(apiKey)}:`,
          errorText
        );

        // Don't retry on client errors (400, 401, 403), only retry on 429, 500, 502, 503, 504
        if (status >= 400 && status < 500 && status !== 429) {
          throw new Error(`AI API Client Error (${status}): ${errorText}`);
        }

        if (attempt <= maxRetries) {
          const backoffDelay = Math.pow(2, attempt) * 1000;
          await wait(backoffDelay);
          continue;
        }

        throw new Error(`AI API Server Error (${status}): ${errorText}`);
      }

      const rawJson = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text: string }>;
          };
        }>;
        usageMetadata?: {
          promptTokenCount?: number;
          candidatesTokenCount?: number;
          totalTokenCount?: number;
        };
      };

      const extractedText = rawJson.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const durationMs = Date.now() - startTime;

      let parsedData: T;

      if (isJsonExpected) {
        try {
          // Clean markdown backticks if AI wrapped JSON inside ```json ... ```
          const cleanedJsonText = extractedText
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/, '')
            .replace(/```\s*$/, '')
            .trim();
          parsedData = JSON.parse(cleanedJsonText) as T;
        } catch (jsonErr) {
          console.warn('[AiHelper] Failed to parse expected JSON, returning raw text as fallback:', jsonErr);
          parsedData = extractedText as unknown as T;
        }
      } else {
        parsedData = extractedText as unknown as T;
      }

      return {
        success: true,
        data: parsedData,
        rawText: extractedText,
        model,
        usage: {
          promptTokens: rawJson.usageMetadata?.promptTokenCount,
          completionTokens: rawJson.usageMetadata?.candidatesTokenCount,
          totalTokens: rawJson.usageMetadata?.totalTokenCount,
        },
        durationMs,
      };
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`[AiHelper] Attempt ${attempt} failed: ${lastError.message}`);

      if (attempt <= maxRetries) {
        const backoffDelay = Math.pow(2, attempt) * 1000;
        await wait(backoffDelay);
      }
    }
  }

  throw new Error(`[AiHelper] All ${maxRetries + 1} attempts failed. Last error: ${lastError?.message}`);
}

// ==============================================================================
// HIGHER-LEVEL DOMAIN HELPERS FOR IELTS LEARNING SYSTEM
// ==============================================================================

/**
 * 1. AI HELPER: Sinh Lộ trình học tập cá nhân hóa (Personalized Learning Roadmap)
 * Hỗ trợ 2 hình thức thi: Academic & General Training
 * Phân chia theo 5 cấp độ: Mất gốc, < 4.5, 4.5 - 6.0, 6.0 - 7.5, 7.5+
 */
export async function generatePersonalizedRoadmap(
  input: RoadmapGenerationInput
): Promise<GeneratedPersonalizedRoadmap> {
  const examMetadata = EXAM_TYPE_DEFINITIONS[input.targetExamType];
  const startTierConfig = BAND_TIER_CONFIGS[input.currentTier];
  const targetTierConfig = BAND_TIER_CONFIGS[input.targetTier];

  const systemInstruction = `
Bạn là Giám khảo IELTS Trưởng kiêm Chuyên gia Sư phạm Ngôn ngữ Anh hàng đầu.
Nhiệm vụ của bạn là thiết lập một Lộ trình học tập cá nhân hóa chi tiết, chuẩn khoa học cho học viên.
Hệ thống sử dụng ma trận phân tầng 5 cấp độ:
- Cấp độ 0 (ZERO_FOUNDATION): "Mất gốc" (Pre-IELTS 0 - 3.0)
- Cấp độ 1 (BELOW_4_5): "< 4.5" (Foundation 3.0 - 4.0)
- Cấp độ 2 (BAND_4_5_TO_6_0): "4.5 - 6.0" (Intermediate)
- Cấp độ 3 (BAND_6_0_TO_7_5): "6.0 - 7.5" (Upper-Intermediate)
- Cấp độ 4 (BAND_7_5_PLUS): "7.5+" (Mastery)

Hãy chú trọng sự khác biệt giữa 2 hình thức thi:
- ACADEMIC: Viết Task 1 (Biểu đồ, Quy trình, Bản đồ) & Đọc hiểu văn bản học thuật chuyên sâu.
- GENERAL_TRAINING: Viết Task 1 (Thư trang trọng/thân mật) & Đọc hiểu đời sống, nơi làm việc.
Phản hồi HOÀN TOÀN bằng định dạng JSON theo đúng schema được yêu cầu.
`;

  const prompt = `
Hãy thiết kế Lộ trình học tập cá nhân hóa:
1. Hình thức thi: ${input.targetExamType} (${examMetadata.name})
   - Mục đích: ${examMetadata.targetAudience}
2. Cấp độ xuất phát: ${startTierConfig.displayLabel} (Band tương đương: ${startTierConfig.targetScoreRange})
3. Cấp độ mục tiêu: ${targetTierConfig.displayLabel} (Band mục tiêu cụ thể: ${input.targetBand})
4. Thời gian dành cho việc tự học mỗi tuần: ${input.weeklyHoursAvailable} giờ/tuần
5. Năng lực 4 kỹ năng hiện tại:
   - Listening: Band ${input.currentSkills.LISTENING.band} (${BAND_TIER_CONFIGS[input.currentSkills.LISTENING.tier].displayLabel})
   - Speaking: Band ${input.currentSkills.SPEAKING.band} (${BAND_TIER_CONFIGS[input.currentSkills.SPEAKING.tier].displayLabel})
   - Reading: Band ${input.currentSkills.READING.band} (${BAND_TIER_CONFIGS[input.currentSkills.READING.tier].displayLabel})
   - Writing: Band ${input.currentSkills.WRITING.band} (${BAND_TIER_CONFIGS[input.currentSkills.WRITING.tier].displayLabel})

Yêu cầu xuất ra cấu trúc JSON:
{
  "title": string,
  "strategySummary": string,
  "estimatedWeeks": number,
  "examType": "${input.targetExamType}",
  "phases": [
    {
      "phaseNumber": number,
      "targetTier": string,
      "title": string,
      "description": string,
      "weeklyHours": number,
      "skillFocus": {
        "LISTENING": { "objective": string, "keyTopics": string[], "milestoneCheck": string },
        "SPEAKING": { "objective": string, "keyTopics": string[], "milestoneCheck": string },
        "READING": { "objective": string, "keyTopics": string[], "milestoneCheck": string },
        "WRITING": { "objective": string, "keyTopics": string[], "milestoneCheck": string }
      }
    }
  ]
}
`;

  const response = await callAiApi<GeneratedPersonalizedRoadmap>({
    prompt,
    systemInstruction,
    options: {
      temperature: 0.2,
      responseMimeType: 'application/json',
    },
  });

  return response.data;
}

/**
 * 2. AI HELPER: Đánh giá bài IELTS Writing (Task 1 & Task 2)
 * Theo chuẩn 4 tiêu chí chấm điểm chính thức của Cambridge & IDP
 */
export async function evaluateIeltsWriting(params: {
  examType: ExamType;
  taskType: 'TASK_1' | 'TASK_2';
  promptQuestion: string;
  studentEssay: string;
}): Promise<IeltsWritingAssessment> {
  const isTask1 = params.taskType === 'TASK_1';
  const examContext =
    params.examType === ExamType.ACADEMIC
      ? isTask1
        ? 'Academic Task 1: Mô tả biểu đồ / sơ đồ / quy trình khách quan, có Overview và số liệu nổi bật'
        : 'Academic Task 2: Bài luận học thuật 250 từ với lập luận logic'
      : isTask1
        ? 'General Training Task 1: Viết thư (Formal/Semi-formal/Informal) đạt mục đích giao tiếp'
        : 'General Training Task 2: Bài luận xã hội hoặc ý kiến cá nhân 250 từ';

  const systemInstruction = `
Bạn là Giám khảo IELTS chính thức (Examiner). Bạn chấm bài viết IELTS dựa trên 4 tiêu chí:
1. Task Achievement (Task 1) hoặc Task Response (Task 2)
2. Coherence and Cohesion
3. Lexical Resource
4. Grammatical Range and Accuracy
Ngữ cảnh bài thi: ${examContext}
Hãy đưa ra nhận xét trung thực, chính xác và hướng dẫn cụ thể cách nâng band lên cấp độ tiếp theo.
Luôn trả về kết quả dưới định dạng JSON.
`;

  const prompt = `
Đề bài (${params.taskType} - ${params.examType}):
"${params.promptQuestion}"

Bài làm của học viên:
"""
${params.studentEssay}
"""

Xuất kết quả dưới định dạng JSON chuẩn:
{
  "overallBand": number (ví dụ 6.0),
  "bandTier": "ZERO_FOUNDATION" | "BELOW_4_5" | "BAND_4_5_TO_6_0" | "BAND_6_0_TO_7_5" | "BAND_7_5_PLUS",
  "taskAchievementScore": number,
  "coherenceCohesionScore": number,
  "lexicalResourceScore": number,
  "grammaticalRangeScore": number,
  "summaryFeedback": string (tiếng Việt),
  "strengths": string[],
  "weaknesses": string[],
  "annotatedCorrections": [
    {
      "originalSnippet": string,
      "suggestedImprovement": string,
      "explanation": string,
      "errorType": "GRAMMAR" | "VOCABULARY" | "COHESION" | "TASK_RESPONSE"
    }
  ],
  "bandUpgradeAdvice": string (lời khuyên cụ thể để lên cấp độ tiếp theo)
}
`;

  const response = await callAiApi<IeltsWritingAssessment>({
    prompt,
    systemInstruction,
    options: {
      temperature: 0.1,
      responseMimeType: 'application/json',
    },
  });

  return response.data;
}

/**
 * 3. AI HELPER: Đánh giá bài IELTS Speaking qua văn bản gỡ băng (Transcription)
 */
export async function evaluateIeltsSpeaking(params: {
  part: 1 | 2 | 3;
  question: string;
  transcriptText: string;
}): Promise<IeltsSpeakingAssessment> {
  const systemInstruction = `
Bạn là Giám khảo IELTS Speaking giàu kinh nghiệm. Bạn đánh giá nội dung câu trả lời của thí sinh
qua 4 tiêu chí: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, và nhận định ngữ âm/ngữ điệu.
Trả về định dạng JSON theo đúng schema.
`;

  const prompt = `
Phần thi: Speaking Part ${params.part}
Câu hỏi: "${params.question}"
Bản gỡ băng câu trả lời:
"""
${params.transcriptText}
"""

Hãy chấm điểm và xuất định dạng JSON:
{
  "overallBand": number,
  "bandTier": "ZERO_FOUNDATION" | "BELOW_4_5" | "BAND_4_5_TO_6_0" | "BAND_6_0_TO_7_5" | "BAND_7_5_PLUS",
  "fluencyCoherenceScore": number,
  "lexicalResourceScore": number,
  "grammaticalRangeScore": number,
  "pronunciationAdvice": string,
  "summaryFeedback": string,
  "actionableDrills": string[]
}
`;

  const response = await callAiApi<IeltsSpeakingAssessment>({
    prompt,
    systemInstruction,
    options: {
      temperature: 0.2,
      responseMimeType: 'application/json',
    },
  });

  return response.data;
}
