import { apiClient } from './api-client';
import { ExamType, BandLevel, SkillType } from '../../types/ielts';

export interface CreateLearningPathPayload {
  userId: string;
  title: string;
  description?: string;
  examType: ExamType;
  startOverallTier: BandLevel;
  targetOverallTier: BandLevel;
  targetOverallBand: number;
  estimatedWeeks?: number;
  weeklyHoursCommitment?: number;
}

export const LearningPathApi = {
  /**
   * Lấy cấu hình metadata 2 hình thức thi và 5 phân tầng Band Level
   */
  getMetadata: async () => {
    return apiClient.get('/learning-paths/metadata');
  },

  /**
   * Lấy danh sách Lộ trình học (hỗ trợ lọc theo userId, examType, tier)
   */
  getLearningPaths: async (params?: { userId?: string; examType?: ExamType; tier?: BandLevel }) => {
    return apiClient.get('/learning-paths', { params });
  },

  /**
   * Lấy chi tiết lộ trình học tập theo ID
   */
  getLearningPathById: async (id: string) => {
    return apiClient.get(`/learning-paths/${id}`);
  },

  /**
   * Tạo lộ trình mới
   */
  createPath: async (payload: CreateLearningPathPayload) => {
    return apiClient.post('/learning-paths', payload);
  },
};
