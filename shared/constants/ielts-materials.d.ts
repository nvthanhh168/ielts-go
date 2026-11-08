import { BandLevel, SkillType } from '../types/ielts';
export interface StudyMaterialItem {
    id: string;
    title: string;
    series: string;
    authorOrPublisher: string;
    targetSkill: SkillType | 'ALL';
    tierLevel: BandLevel;
    targetBandRange: string;
    type: 'BOOK' | 'AUDIO' | 'WORKBOOK' | 'MOCK_TEST' | 'RESOURCE_DOC';
    description: string;
    keyFeatures: string[];
    localAvailablePath?: string;
}
/**
 * Kho dữ liệu học liệu chuẩn hóa theo 5 cấp độ Band điểm
 */
export declare const IELTS_STUDY_MATERIALS: Record<BandLevel, StudyMaterialItem[]>;
/**
 * Thuật toán tự động phân bổ kho học liệu và bài tập theo Band điểm học viên
 */
export declare function getRecommendedMaterialsByBand(bandScore: number, preferredSkill?: SkillType): {
    tier: BandLevel;
    materials: StudyMaterialItem[];
    primaryRoadmapBook: StudyMaterialItem;
    practiceTestBook: StudyMaterialItem | undefined;
};
