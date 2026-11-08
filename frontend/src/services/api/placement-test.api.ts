import { apiClient } from './api-client';
import { ExamType, BandLevel } from '../../types/ielts';

export interface ScoreEvaluationPayload {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  examType?: ExamType;
  rawListeningScore?: number;
  rawReadingScore?: number;
}

export interface PlacementSubmitPayload {
  userId: string;
  examType: ExamType;
  scores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  targetOverallBand?: number;
  weeklyHoursAvailable?: number;
}

export const PlacementTestApi = {
  /**
   * Lấy Bảng 9 Band điểm chuẩn IELTS & Hướng dẫn ngưỡng Du học
   */
  getBandDescriptors: async () => {
    return apiClient.get('/placement-test/descriptors');
  },

  /**
   * Tính toán điểm Band và tự động phân bổ học liệu
   */
  evaluateScore: async (payload: ScoreEvaluationPayload) => {
    return apiClient.post('/placement-test/evaluate', payload);
  },

  /**
   * Lấy danh sách học liệu theo band hoặc tier
   */
  getMaterials: async (params?: { tier?: BandLevel; band?: number }) => {
    return apiClient.get('/placement-test/materials', { params });
  },

  /**
   * Nộp kết quả test và sinh lộ trình học
   */
  submitTest: async (payload: PlacementSubmitPayload) => {
    return apiClient.post('/placement-test/submit', payload);
  },
};
