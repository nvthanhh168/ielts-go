import { apiClient } from './api-client';
import { SpeakingTopicId } from '../../../../shared/types/speaking';

export interface EvaluateSpeakingPayload {
  transcript: string;
  part: 1 | 2 | 3;
  questionOrCard: string;
  prepNotes?: string;
  topicId?: SpeakingTopicId | string;
  targetBand?: number;
}

export interface GeneratePart3QuestionsPayload {
  part2Topic: string;
  candidateSpeechSnippet?: string;
}

export const SpeakingApi = {
  /**
   * Lấy danh mục 20 chủ điểm Speaking thông dụng
   */
  getTopics: async () => {
    return apiClient.get('/speaking/topics');
  },

  /**
   * Lấy chi tiết toàn bộ học liệu của 1 chủ đề (Collocations, Ideas, Natural Phrases, Sample Answers)
   */
  getTopicDetail: async (topicId: string) => {
    return apiClient.get(`/speaking/topics/${topicId}`);
  },

  /**
   * AI Examiner chấm điểm bản ghi âm / transcript bài nói theo 4 tiêu chí chuẩn IELTS
   */
  evaluateSpeech: async (payload: EvaluateSpeakingPayload) => {
    return apiClient.post('/speaking/evaluate', payload);
  },

  /**
   * Sinh các câu hỏi mở rộng Part 3 chuyên sâu dựa trên bài nói Part 2 của học viên
   */
  generatePart3Questions: async (payload: GeneratePart3QuestionsPayload) => {
    return apiClient.post('/speaking/part3-questions', payload);
  },
};
