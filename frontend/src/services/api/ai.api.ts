import { apiClient } from './api-client';
import { ExamType, BandLevel, SkillType } from '../../types/ielts';

export interface AiRoadmapRequest {
  targetExamType: ExamType;
  currentTier: BandLevel;
  targetTier: BandLevel;
  targetBand: number;
  currentSkills: Record<SkillType, { tier: BandLevel; band: number }>;
  weeklyHoursAvailable: number;
  targetExamDate?: string;
}

export const AiApi = {
  /**
   * Gọi AI sinh lộ trình học tập cá nhân hóa
   */
  generateRoadmap: async (data: AiRoadmapRequest) => {
    return apiClient.post('/ai/generate-roadmap', data);
  },

  /**
   * Chấm điểm bài viết IELTS Writing
   */
  evaluateWriting: async (data: {
    examType: ExamType;
    taskType: 'TASK_1' | 'TASK_2';
    promptQuestion: string;
    studentEssay: string;
  }) => {
    return apiClient.post('/ai/evaluate-writing', data);
  },

  /**
   * Đánh giá câu trả lời IELTS Speaking
   */
  evaluateSpeaking: async (data: {
    part: 1 | 2 | 3;
    question: string;
    transcriptText: string;
  }) => {
    return apiClient.post('/ai/evaluate-speaking', data);
  },
};
