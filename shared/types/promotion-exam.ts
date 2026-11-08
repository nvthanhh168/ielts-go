/**
 * IELTS GO! - Band Promotion Exam Types
 * Định nghĩa cấu trúc bài thi thăng cấp Band điểm 3 vòng liên hoàn
 */

export interface PromotionTierConfig {
  level: number;
  fromBand: string;
  toBand: string;
  targetScore: number;
  quotaRequired: number;
  title: string;
  badgeName: string;
  badgeIcon: string;
  badgeColor: string;
  description: string;
}

export type Round1QuestionType = 'paraphrase' | 'gap_fill';

export interface PromotionRound1Question {
  id: string;
  type: Round1QuestionType;
  prompt: string;
  subPrompt?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface PromotionRound2Item {
  id: string;
  word: string;
  ipaUk: string;
  ipaUs: string;
  acceptedSpellings: string[]; // Chấp nhận cả UK và US spelling
  definitionVi: string;
  hintSentence: string;
}

export interface PromotionRound3Challenge {
  id: string;
  targetWord: string;
  partOfSpeech: string;
  ipa: string;
  meaningVi: string;
  academicContext: string;
  guidanceTip: string;
}

export interface PromotionRound3Evaluation {
  sentence: string;
  contextScore: number; // 0 - 3
  grammarScore: number; // 0 - 3
  collocationScore: number; // 0 - 2
  academicRegisterScore: number; // 0 - 2
  totalScore: number; // 0 - 10
  examinerRemarks: string;
  improvedVersion: string;
}

export interface PromotionExamResult {
  examId: string;
  level: number;
  fromBand: string;
  toBand: string;
  candidateName: string;
  round1Score: number; // 0 - 15
  round2Score: number; // 0 - 15
  round3Score: number; // 0 - 30
  totalScore: number; // 0 - 60
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  certificateId?: string;
  issuedAt?: string;
  examinerFeedback: string;
}
