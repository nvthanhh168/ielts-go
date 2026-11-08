/**
 * IELTS Reading Domain Types & Schema
 * Supports both Academic and General Training with Split-screen layout
 */
import { ExamType, BandLevel } from './ielts';
export type ReadingQuestionType = 'MATCHING_HEADINGS' | 'TRUE_FALSE_NOT_GIVEN' | 'YES_NO_NOT_GIVEN' | 'SUMMARY_COMPLETION' | 'MULTIPLE_CHOICE' | 'CLASSIFICATION';
export interface ReadingParagraph {
    label: string;
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
    id: number;
    passageNumber: 1 | 2 | 3;
    type: ReadingQuestionType;
    prompt: string;
    paragraphRef?: string;
    options?: string[];
    headingsList?: HeadingOption[];
    correctAnswer: string;
    contextQuote?: string;
}
export interface ReadingExamPaper {
    id: string;
    examType: ExamType;
    title: string;
    timeAllowedMinutes: 60;
    totalQuestions: 40;
    passages: [ReadingPassage, ReadingPassage, ReadingPassage];
    questions: ReadingQuestion[];
}
export interface ReadingGradingResult {
    rawScore: number;
    bandScore: number;
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
    studentBandLevel: BandLevel;
}
/**
 * AI Reading Mentor Response (Personalized by Band Tier)
 */
export interface AiReadingMentorResponse {
    questionId: number;
    studentBandLevel: BandLevel;
    mode: 'FOUNDATION_SUPPORT' | 'ADVANCED_ANALYSIS';
    vietnameseTranslation?: string;
    coreVocabularyList?: Array<{
        word: string;
        meaning: string;
        phonetic?: string;
    }>;
    paraphraseClues?: Array<{
        inQuestion: string;
        inReadingPassage: string;
    }>;
    logicalArgumentAnalysis?: string;
    authorStanceAndTone?: string;
    falseVsNotGivenDistinction?: string;
    actionableExamTip: string;
}
