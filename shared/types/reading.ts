/**
 * IELTS Reading Domain Types & Schema
 * Supports both Academic and General Training with Split-screen layout
 */

import { ExamType, BandLevel } from './ielts';

export type ReadingQuestionType =
  | 'MATCHING_HEADINGS'
  | 'TRUE_FALSE_NOT_GIVEN'
  | 'YES_NO_NOT_GIVEN'
  | 'SUMMARY_COMPLETION'
  | 'MULTIPLE_CHOICE'
  | 'CLASSIFICATION';

export interface ReadingParagraph {
  label: string; // 'A', 'B', 'C', 'D', 'E', 'F', 'G', etc.
  text: string;
}

export interface ReadingPassage {
  passageNumber: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  wordCount: number;
  paragraphs: ReadingParagraph[];
  fullText: string;
}

export interface HeadingOption {
  romanNumeral: 'i' | 'ii' | 'iii' | 'iv' | 'v' | 'vi' | 'vii' | 'viii' | 'ix' | 'x';
  text: string;
}

export interface ReadingQuestion {
  id: number; // 1 to 40
  passageNumber: 1 | 2 | 3;
  type: ReadingQuestionType;
  prompt: string;
  paragraphRef?: string; // e.g. 'Paragraph B', 'Paragraph D'
  options?: string[]; // Cho Multiple Choice hoặc Classification
  headingsList?: HeadingOption[]; // Cho Matching Headings
  correctAnswer: string; // e.g. 'iv', 'TRUE', 'NOT GIVEN', 'geothermal energy'
  contextQuote?: string; // Đoạn trích trong bài đọc chứa manh mối đáp án
}

export interface ReadingExamPaper {
  id: string;
  examType: ExamType; // ACADEMIC or GENERAL_TRAINING
  title: string;
  timeAllowedMinutes: 60;
  totalQuestions: 40;
  passages: [ReadingPassage, ReadingPassage, ReadingPassage];
  questions: ReadingQuestion[];
}

export interface ReadingGradingResult {
  rawScore: number; // 0 to 40
  bandScore: number; // 1.0 to 9.0
  examType: ExamType;
  passage1Score: number;
  passage2Score: number;
  passage3Score: number;
  details: Array<{
    questionId: number;
    passageNumber: number;
    type: ReadingQuestionType;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    contextQuote?: string;
  }>;
}

/**
 * AI Reading Mentor Request
 */
export interface AiReadingMentorRequest {
  questionId: number;
  questionType: ReadingQuestionType;
  questionPrompt: string;
  userAnswer?: string;
  correctAnswer: string;
  contextSentenceOrParagraph: string;
  studentBandLevel: BandLevel; // ZERO_FOUNDATION, BELOW_4_5, BAND_4_5_TO_6_0, BAND_6_0_TO_7_5, BAND_7_5_PLUS
}

/**
 * AI Reading Mentor Response (Personalized by Band Tier)
 */
export interface AiReadingMentorResponse {
  questionId: number;
  studentBandLevel: BandLevel;
  mode: 'FOUNDATION_SUPPORT' | 'ADVANCED_ANALYSIS';
  
  // Dành cho Band < 6.0 (Foundation & Intermediate)
  vietnameseTranslation?: string;
  coreVocabularyList?: Array<{ word: string; meaning: string; phonetic?: string }>;
  paraphraseClues?: Array<{ inQuestion: string; inReadingPassage: string }>;
  
  // Dành cho Band 6.0+ (Upper & Mastery)
  logicalArgumentAnalysis?: string;
  authorStanceAndTone?: string;
  falseVsNotGivenDistinction?: string; // Bóc tách mâu thuẫn (False) vs Thiếu dữ kiện (Not Given)
  
  actionableExamTip: string;
}
