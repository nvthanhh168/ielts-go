/**
 * BẢNG ĐÁNH GIÁ NĂNG LỰC 9 BAND ĐIỂM CHUẨN IELTS (IELTS 9-BAND SCALE)
 * Nguồn: Cambridge English / IDP IELTS / British Council
 */
export interface IeltsBandDescriptor {
    band: number;
    levelName: string;
    vietnameseTitle: string;
    cefrLevel: string;
    detailedDescription: string;
    academicSuitability: string;
    isStudyAbroadThreshold?: boolean;
}
export declare const IELTS_9_BAND_DESCRIPTORS: IeltsBandDescriptor[];
/**
 * Lời khuyên định hướng du học theo ngưỡng Band 6.0 - 6.5
 */
export declare const STUDY_ABROAD_GUIDELINE: {
    title: string;
    summary: string;
    keyTakeaways: {
        target: string;
        requirement: string;
        description: string;
    }[];
};
