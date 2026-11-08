/**
 * IELTS Writing Domain Types & Schema
 * Covers Task 1 (Academic & General) and Task 2 with Cambridge AI Examiner Evaluation
 */

import { ExamType, BandLevel } from './ielts';

export type WritingTaskType = 'TASK_1_ACADEMIC' | 'TASK_1_GENERAL' | 'TASK_2_ESSAY';

export type Task1AcademicSubtype =
  | 'LINE_GRAPH'
  | 'BAR_CHART'
  | 'PIE_CHART'
  | 'TABLE'
  | 'PROCESS_DIAGRAM'
  | 'MAP_COMPARISON'
  | 'MULTIPLE_GRAPHS';

export type Task1GeneralSubtype =
  | 'FORMAL_LETTER'
  | 'SEMI_FORMAL_LETTER'
  | 'INFORMAL_LETTER';

export type Task2EssayType =
  | 'OPINION_AGREE_OR_DISAGREE'
  | 'DISCUSS_BOTH_VIEWS'
  | 'ADVANTAGES_AND_DISADVANTAGES'
  | 'PROBLEM_AND_SOLUTION'
  | 'TWO_PART_QUESTION';

export interface WritingPrompt {
  id: string;
  taskType: WritingTaskType;
  examType: ExamType;
  title: string;
  promptQuestion: string;
  visualDataDescription?: string; // Dữ liệu số liệu biểu đồ hoặc sơ đồ cho Task 1 Academic
  visualImageUrl?: string;
  bulletPoints?: string[]; // 3 gạch đầu dòng hướng dẫn cho Task 1 General hoặc Task 2
  recommendedMinutes: 20 | 40;
  minimumWords: 150 | 250;
}

export interface CriteriaScoreDetail {
  score: number; // 1.0 to 9.0 (step 0.5)
  title: string;
  comment: string;
  strengths: string[];
  weaknesses: string[];
}

export interface WritingAssessmentResult {
  overallBand: number; // 1.0 to 9.0
  bandTier: BandLevel;
  wordCount: number;
  wordCountPenalty: boolean; // Bị trừ điểm nếu dưới 150 từ (Task 1) hoặc dưới 250 từ (Task 2)
  taskType: WritingTaskType;
  
  // 4 tiêu chí chấm thi IELTS Writing chính thức
  criteria: {
    taskAchievementOrResponse: CriteriaScoreDetail; // Task 1: Task Achievement | Task 2: Task Response
    coherenceAndCohesion: CriteriaScoreDetail;
    lexicalResource: CriteriaScoreDetail;
    grammaticalRangeAndAccuracy: CriteriaScoreDetail;
  };

  // Nhận xét theo đúng phong cách Examiner's Comment trong sách Cambridge
  cambridgeExaminerComment: string;

  // Cảnh báo văn phong & lỗi viết tắt (Informal / Contractions)
  academicToneIssues: Array<{
    foundSnippet: string;
    issueDescription: string;
    suggestedFormalReplacement: string;
  }>;

  // Bài viết mẫu Band 7.5+ nâng cấp từ chính ý tưởng của học viên
  upgradedModelAnswer: {
    targetBand: number; // e.g. 7.5 or 8.0
    modelEssayText: string;
    keyImprovementsAnalysis: string[];
    vocabularyUpgrades: Array<{ original: string; upgraded: string; explanation: string }>;
  };
}
