import { apiClient } from './api-client';

export const ListeningApi = {
  /**
   * Lấy đề thi Listening 40 câu
   */
  getExamPaper: async () => {
    return apiClient.get('/listening/exam-paper');
  },

  /**
   * Lấy URL phát âm thanh của Section MP3
   */
  getAudioUrl: (filename: string) => {
    return `http://localhost:5000/api/v1/listening/audio/${encodeURIComponent(filename)}`;
  },

  /**
   * Chấm điểm bài thi 40 câu
   */
  gradeExam: async (userAnswers: Record<number, string>) => {
    return apiClient.post('/listening/grade', { userAnswers });
  },

  /**
   * Giải thích câu hỏi bằng AI với Tapescript
   */
  explainWithAi: async (data: {
    questionId: number;
    userAnswer: string;
    correctAnswerPattern: string;
    tapescriptSnippet: string;
    questionPrompt: string;
  }) => {
    return apiClient.post('/listening/explain-with-ai', data);
  },
};
