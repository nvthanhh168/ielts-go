import { apiClient } from './api-client';
import { WritingTaskType } from '../../../../shared/types/writing';

export const WritingApi = {
  /**
   * Lấy danh sách đề bài IELTS Writing
   */
  getPrompts: async () => {
    return apiClient.get('/writing/prompts');
  },

  /**
   * AI Examiner Chấm chữa chi tiết bài viết & nâng cấp bài mẫu
   */
  evaluateEssay: async (payload: {
    userId?: string;
    taskType: WritingTaskType;
    promptTitle?: string;
    promptQuestion: string;
    visualDataDescription?: string;
    userEssayText: string;
    targetBand?: number;
  }) => {
    return apiClient.post('/writing/evaluate', payload);
  },
};
