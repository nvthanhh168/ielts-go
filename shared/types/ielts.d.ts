/**
 * IELTS Master AI - Shared Domain Types & Enums
 * Used across Frontend and Backend for unified type safety
 */
/**
 * 2 hình thức thi IELTS chính thức
 */
export declare enum ExamType {
    ACADEMIC = "ACADEMIC",// Bậc đại học, sau đại học hoặc mục đích chuyên môn
    GENERAL_TRAINING = "GENERAL_TRAINING"
}
/**
 * Metadata thông tin chi tiết của từng hình thức thi
 */
export interface ExamTypeMetadata {
    code: ExamType;
    name: string;
    targetAudience: string;
    description: string;
    readingFormat: string;
    writingTask1Format: string;
}
/**
 * 5 cấp độ phân tầng năng lực học tập theo Band điểm
 */
export declare enum BandLevel {
    ZERO_FOUNDATION = "ZERO_FOUNDATION",// "Mất gốc" (Pre-IELTS / Band 0 - 3.0)
    BELOW_4_5 = "BELOW_4_5",// "< 4.5" (Foundation / Band 3.0 - 4.0)
    BAND_4_5_TO_6_0 = "BAND_4_5_TO_6_0",// "4.5 - 6.0" (Intermediate)
    BAND_6_0_TO_7_5 = "BAND_6_0_TO_7_5",// "6.0 - 7.5" (Upper-Intermediate to Advanced)
    BAND_7_5_PLUS = "BAND_7_5_PLUS"
}
/**
 * 4 Kỹ năng cốt lõi của IELTS
 */
export declare enum SkillType {
    LISTENING = "LISTENING",
    SPEAKING = "SPEAKING",
    READING = "READING",
    WRITING = "WRITING"
}
/**
 * Cấu hình chi tiết cho từng phân tầng cấp độ học tập
 */
export interface BandTierConfig {
    level: BandLevel;
    displayLabel: string;
    cefrEquivalent: string;
    targetScoreRange: string;
    description: string;
    keyFocusAreas: {
        [key in SkillType]: {
            objective: string;
            coreSkills: string[];
            recommendedHours: number;
        };
    };
}
/**
 * Điểm số và đánh giá của User theo từng kỹ năng
 */
export interface UserSkillProficiency {
    skill: SkillType;
    currentBand: number;
    currentTier: BandLevel;
    targetBand: number;
    targetTier: BandLevel;
    strengths: string[];
    weaknesses: string[];
}
/**
 * Mô hình Lộ trình học tập cá nhân hóa (Learning Path)
 */
export interface LearningPathOverview {
    id: string;
    userId: string;
    title: string;
    examType: ExamType;
    overallStartingTier: BandLevel;
    overallTargetTier: BandLevel;
    targetOverallBand: number;
    estimatedWeeks: number;
    totalModulesCount: number;
    completedModulesCount: number;
    skillsProgress: Record<SkillType, {
        currentBand: number;
        targetBand: number;
        completionPercentage: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
