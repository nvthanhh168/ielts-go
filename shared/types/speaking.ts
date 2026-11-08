/**
 * IELTS Speaking Domain Types & Schema
 * 20 Common Topics & AI Virtual Exam Room (Parts 1, 2, 3)
 */

import { BandLevel } from './ielts';

export type SpeakingTopicId =
  | 'animals'
  | 'art'
  | 'celebrations'
  | 'clothes'
  | 'environment'
  | 'famous_people'
  | 'food'
  | 'friends'
  | 'holidays'
  | 'music'
  | 'nation_culture'
  | 'routines'
  | 'science'
  | 'shopping'
  | 'social_media'
  | 'sport'
  | 'technology'
  | 'transport'
  | 'weather'
  | 'study';

export interface CollocationItem {
  phrase: string;
  meaning: string;
  exampleSentence: string;
  bandLevel: string; // e.g. "C1", "C2", "Band 7.5+"
}

export interface NaturalPhraseItem {
  category: 'STARTING_OFF' | 'BUYING_TIME' | 'GIVING_OPINION' | 'CONTRASTING' | 'SPECULATING';
  phrase: string;
  usageContext: string;
}

export interface Part2CueCard {
  topicTitle: string;
  cueCardInstruction: string;
  bulletPoints: string[];
  suggestedIdeas: {
    [bulletIndex: number]: string[];
  };
}

export interface SampleSpeakingAnswer {
  band: number; // e.g. 6.0 vs 8.0
  title: string;
  scriptText: string;
  highlightedFeatures: string[];
}

export interface SpeakingTopicData {
  id: SpeakingTopicId;
  name: string;
  vietnameseName: string;
  icon: string;
  part1Questions: Array<{
    id: number;
    question: string;
    sampleIdea: string;
  }>;
  part2CueCard: Part2CueCard;
  part3Questions: Array<{
    id: number;
    question: string;
    analyticalAngle: string;
  }>;
  usefulCollocations: CollocationItem[];
  suggestedNaturalPhrases: NaturalPhraseItem[];
  sampleAnswers: {
    part1Band6: string;
    part1Band8: string;
    part2Band6: string;
    part2Band8: string;
  };
}

export interface SpeakingCriteriaScore {
  score: number; // 1.0 to 9.0
  title: string;
  comment: string;
  strengths: string[];
  weaknesses: string[];
}

export interface SpeakingAssessmentResult {
  overallBand: number;
  bandTier: BandLevel;
  partEvaluated: 1 | 2 | 3;
  questionOrCardTopic: string;
  studentTranscript: string;
  criteria: {
    fluencyAndCoherence: SpeakingCriteriaScore;
    lexicalResource: SpeakingCriteriaScore;
    grammaticalRangeAndAccuracy: SpeakingCriteriaScore;
    pronunciation: SpeakingCriteriaScore;
  };
  cambridgeExaminerComment: string;
  pronunciationAdvice: {
    wordStressIssues: Array<{ word: string; incorrectAttempt: string; correctIpa: string }>;
    intonationAndLinkingTip: string;
  };
  vocabularyUpgrades: Array<{
    originalWord: string;
    upgradedIdiomOrCollocation: string;
    explanation: string;
  }>;
  upgradedBand8Transcript: string;
}
