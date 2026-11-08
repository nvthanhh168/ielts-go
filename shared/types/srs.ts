/**
 * IELTS GO! - Spaced Repetition System (SRS) & Mastery Verification Types
 * Định nghĩa kiểu dữ liệu cho 4 trạng thái học tập và chu kỳ ngắt quãng Leitner / SM-2
 */

export type VocabLearningStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

export type SrsStage = 0 | 1 | 2 | 3 | 4 | 5;

export type SrsActivityType =
  | 'flashcard'
  | 'lexical_deep_dive'
  | 'quiz'
  | 'memory'
  | 'scramble'
  | 'examiner_ai'
  | 'speech_ai'
  | 'manual';

export interface SrsStageConfig {
  stage: SrsStage;
  intervalDays: number;
  label: string;
  description: string;
}

export interface SrsAiEvaluationRecord {
  type: 'examiner_ai' | 'speech_ai' | 'writing_ai';
  bandScore: number;
  timestamp: string;
  notes?: string;
}

export interface SrsActivityHistoryEntry {
  activity: SrsActivityType;
  isCorrect: boolean;
  timestamp: string;
  score?: number;
}

export interface VocabSrsRecord {
  wordId: string;
  word: string;
  topicId?: string;
  bandTier?: string;
  status: VocabLearningStatus;
  srsStage: SrsStage;
  intervalDays: number;
  lastReviewedAt: string | null;
  nextReviewDate: string | null;
  correctActivities: SrsActivityType[];
  totalCorrectCount: number;
  totalAttemptCount: number;
  aiEvaluations: SrsAiEvaluationRecord[];
  highestAiScore: number;
  history: SrsActivityHistoryEntry[];
  isDue: boolean;
}

export interface SrsSummary {
  totalWords: number;
  newCount: number;
  learningCount: number;
  reviewingCount: number;
  masteredCount: number;
  qualifiedCount: number; // reviewingCount + masteredCount
  dueTodayCount: number;
  dueByBand: Record<string, number>;
  dueByTopic: Record<string, number>;
}
