/**
 * IELTS Writing Domain Types & Schema
 * Covers Task 1 (Academic & General) and Task 2 with Cambridge AI Examiner Evaluation
 */
import { ExamType, BandLevel } from './ielts';
export type WritingTaskType = 'TASK_1_ACADEMIC' | 'TASK_1_GENERAL' | 'TASK_2_ESSAY';
export type Task1AcademicSubtype = 'LINE_GRAPH' | 'BAR_CHART' | 'PIE_CHART' | 'TABLE' | 'PROCESS_DIAGRAM' | 'MAP_COMPARISON' | 'MULTIPLE_GRAPHS';
export type Task1GeneralSubtype = 'FORMAL_LETTER' | 'SEMI_FORMAL_LETTER' | 'INFORMAL_LETTER';
export type Task2EssayType = 'OPINION_AGREE_OR_DISAGREE' | 'DISCUSS_BOTH_VIEWS' | 'ADVANTAGES_AND_DISADVANTAGES' | 'PROBLEM_AND_SOLUTION' | 'TWO_PART_QUESTION';
export interface WritingPrompt {
    id: string;
    taskType: WritingTaskType;
    examType: ExamType;
    title: string;
    promptQuestion: string;
    visualDataDescription?: string;
    visualImageUrl?: string;
    bulletPoints?: string[];
    recommendedMinutes: 20 | 40;
    minimumWords: 150 | 250;
}
export interface CriteriaScoreDetail {
    score: number;
    title: string;
    comment: string;
    strengths: string[];
    weaknesses: string[];
}
export interface WritingAssessmentResult {
    overallBand: number;
    bandTier: BandLevel;
    wordCount: number;
    wordCountPenalty: boolean;
    taskType: WritingTaskType;
    criteria: {
        taskAchievementOrResponse: CriteriaScoreDetail;
        coherenceAndCohesion: CriteriaScoreDetail;
        lexicalResource: CriteriaScoreDetail;
        grammaticalRangeAndAccuracy: CriteriaScoreDetail;
    };
    cambridgeExaminerComment: string;
    academicToneIssues: Array<{
        foundSnippet: string;
        issueDescription: string;
        suggestedFormalReplacement: string;
    }>;
    upgradedModelAnswer: {
        targetBand: number;
        modelEssayText: string;
        keyImprovementsAnalysis: string[];
        vocabularyUpgrades: Array<{
            original: string;
            upgraded: string;
            explanation: string;
        }>;
    };
}
