/**
 * IELTS Listening Exam Domain Types & Cambridge Rules
 */
export type QuestionType = 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'SENTENCE_COMPLETION' | 'NOTES_COMPLETION' | 'TABLE_COMPLETION' | 'DIAGRAM_LABELLING' | 'MAP_LABELLING' | 'CLASSIFICATION' | 'MATCHING';
export interface WordLimitRule {
    maxWords: number;
    allowNumber: boolean;
    rawInstruction: string;
}
export interface ListeningQuestion {
    id: number;
    section: 1 | 2 | 3 | 4;
    type: QuestionType;
    prompt: string;
    options?: string[];
    correctAnswerPattern: string;
    wordLimit?: WordLimitRule;
    contextSentence?: string;
    diagramImageUrl?: string;
    tapescriptSnippet?: string;
    explanation?: string;
}
export interface ListeningSection {
    sectionNumber: 1 | 2 | 3 | 4;
    title: string;
    contextDescription: string;
    audioFilename: string;
    audioDurationSeconds: number;
    questions: ListeningQuestion[];
    fullTapescript: string;
}
export interface ListeningTestExam {
    id: string;
    title: string;
    series: string;
    totalQuestions: 40;
    listeningTimeMinutes: 30;
    transferTimeMinutes: 10;
    sections: [ListeningSection, ListeningSection, ListeningSection, ListeningSection];
}
export interface QuestionGradingDetail {
    questionId: number;
    section: number;
    type: QuestionType;
    userAnswer: string;
    correctAnswerPattern: string;
    isCorrect: boolean;
    score: 1 | 0;
    wordCount: number;
    numberCount: number;
    wordLimitExceeded: boolean;
    acceptableAnswersList: string[];
    tapescriptSnippet?: string;
}
export interface ListeningGradingResult {
    totalRawScore: number;
    estimatedBand: number;
    performanceTier: 'NEED_MORE_PRACTICE' | 'ACCEPTABLE_BUT_NEEDS_MORE' | 'EXAM_READY';
    tierTitle: string;
    adviceMessage: string;
    sectionBreakdown: {
        section1: {
            correct: number;
            total: 10;
        };
        section2: {
            correct: number;
            total: 10;
        };
        section3: {
            correct: number;
            total: 10;
        };
        section4: {
            correct: number;
            total: 10;
        };
    };
    details: QuestionGradingDetail[];
}
export interface AiTapescriptExplanationRequest {
    questionId: number;
    questionPrompt: string;
    userAnswer: string;
    correctPattern: string;
    tapescriptExcerpt: string;
}
export interface AiTapescriptExplanationResponse {
    questionId: number;
    isCorrect: boolean;
    exactQuoteInAudio: string;
    analysisExplanation: string;
    distractorTraps?: string;
    keyVocabularyParaphrased?: Array<{
        inQuestion: string;
        inAudio: string;
    }>;
}
