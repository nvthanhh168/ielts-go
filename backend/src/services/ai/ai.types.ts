import { ExamType, BandLevel, SkillType } from '../../common/enums';

/**
 * Options when calling the AI API
 */
export interface AiCallOptions {
  model?: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  systemInstruction?: string;
  responseMimeType?: 'text/plain' | 'application/json';
  timeoutMs?: number;
  retryAttempts?: number;
}

/**
 * Generic AI Request Payload
 */
export interface AiPromptPayload {
  prompt: string;
  systemInstruction?: string;
  contextData?: Record<string, unknown>;
  options?: AiCallOptions;
}

/**
 * Generic AI Response
 */
export interface AiResponse<T = string> {
  success: boolean;
  data: T;
  rawText: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  durationMs: number;
}

/**
 * IELTS Writing Assessment Result Schema
 */
export interface IeltsWritingAssessment {
  overallBand: number;
  bandTier: BandLevel;
  taskAchievementScore: number;
  coherenceCohesionScore: number;
  lexicalResourceScore: number;
  grammaticalRangeScore: number;
  summaryFeedback: string;
  strengths: string[];
  weaknesses: string[];
  annotatedCorrections: Array<{
    originalSnippet: string;
    suggestedImprovement: string;
    explanation: string;
    errorType: 'GRAMMAR' | 'VOCABULARY' | 'COHESION' | 'TASK_RESPONSE';
  }>;
  bandUpgradeAdvice: string;
}

/**
 * IELTS Speaking Assessment Result Schema
 */
export interface IeltsSpeakingAssessment {
  overallBand: number;
  bandTier: BandLevel;
  fluencyCoherenceScore: number;
  lexicalResourceScore: number;
  grammaticalRangeScore: number;
  pronunciationAdvice: string;
  summaryFeedback: string;
  actionableDrills: string[];
}

/**
 * Personalized Roadmap Generation Request
 */
export interface RoadmapGenerationInput {
  targetExamType: ExamType; // ACADEMIC or GENERAL_TRAINING
  currentTier: BandLevel;   // ZERO_FOUNDATION, BELOW_4_5, etc.
  targetTier: BandLevel;    // BAND_6_0_TO_7_5, BAND_7_5_PLUS, etc.
  targetBand: number;       // e.g., 6.5 or 7.5
  currentSkills: {
    [key in SkillType]: {
      tier: BandLevel;
      band: number;
    };
  };
  weeklyHoursAvailable: number;
  targetExamDate?: string;
}

/**
 * AI Generated Personalized Roadmap Output
 */
export interface GeneratedPersonalizedRoadmap {
  title: string;
  strategySummary: string;
  estimatedWeeks: number;
  examType: ExamType;
  phases: Array<{
    phaseNumber: number;
    targetTier: BandLevel;
    title: string;
    description: string;
    weeklyHours: number;
    skillFocus: Record<SkillType, {
      objective: string;
      keyTopics: string[];
      milestoneCheck: string;
    }>;
  }>;
}
