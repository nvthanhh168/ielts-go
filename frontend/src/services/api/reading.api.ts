import { apiClient } from './api-client';
import { ExamType, BandLevel } from '../../types/ielts';
import { ReadingQuestionType } from '../../../../shared/types/reading';

export const ReadingApi = {
  /**
   * Lấy đề thi IELTS Reading (Academic hoặc General Training)
   */
  getExamPaper: async (examType: ExamType = ExamType.ACADEMIC) => {
    return apiClient.get('/reading/exam-paper', { params: { type: examType } });
  },

  /**
   * Chấm điểm bài thi 40 câu
   */
  gradeExam: async (payload: { userAnswers: Record<number, string>; examType: ExamType }) => {
    return apiClient.post('/reading/grade', payload);
  },

  /**
   * Gọi AI Trợ giảng cá nhân hóa theo Band (< 6.0 vs 6.0+)
   */
  consultAiMentor: async (payload: {
    questionId: number;
    questionType: ReadingQuestionType;
    questionPrompt: string;
    userAnswer?: string;
    correctAnswer: string;
    contextSentenceOrParagraph: string;
    studentBandLevel: BandLevel;
  }) => {
    return apiClient.post('/reading/ai-mentor', payload);
  },
};
