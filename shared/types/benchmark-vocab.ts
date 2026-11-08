/**
 * IELTS GO! - Official Benchmark Vocabulary & Metadata Schema
 * Đảm bảo tính nhất quán tuyệt đối giữa CSDL Frontend, Backend và Tiêu chuẩn Khảo thí Cambridge
 */

export interface IeltsBandRequirement {
  label: string;
  cefr: string;
  requiredCoreWords: number;
  realWorldEquivalent: number;
}

export interface IeltsTopicMetadata {
  id: string;
  number: number;
  name: string;
  viName: string;
  icon: string;
}

export interface IeltsBenchmarkMetadata {
  appName: string;
  totalCoreWordsTarget: number;
  bandRequirements: {
    mat_goc: IeltsBandRequirement;
    duoi_4_5: IeltsBandRequirement;
    band_4_5_6_0: IeltsBandRequirement;
    band_6_0_7_5: IeltsBandRequirement;
    band_7_5_plus: IeltsBandRequirement;
  };
  topics: IeltsTopicMetadata[];
}

export interface IeltsBenchmarkVocabularyItem {
  id: string;
  word: string;
  ipaUK: string;
  ipaUS: string;
  stressPattern: string;
  partOfSpeech: string;
  topic: string;
  bandLevel: string;
  cefr: string;
  vietnameseMeaning: string;
  synonymsByBand: {
    band_4_5: string;
    band_6_5: string;
    band_8_0: string;
  };
  collocations: string[];
  wordFamily: string[];
  exampleSpeaking: string;
  exampleWriting: string;
  exampleTranslation: string;
}

export interface IeltsBenchmarkDataset {
  metadata: IeltsBenchmarkMetadata;
  vocabulary: IeltsBenchmarkVocabularyItem[];
}
