import { ExamType, ExamTypeMetadata, BandLevel, BandTierConfig } from '../types/ielts';
/**
 * Metadata chuẩn cho 2 hình thức thi IELTS
 */
export declare const EXAM_TYPE_DEFINITIONS: Record<ExamType, ExamTypeMetadata>;
/**
 * Ma trận 5 Cấp độ Phân tầng theo Band điểm tương ứng 4 Kỹ năng (Listening, Speaking, Reading, Writing)
 */
export declare const BAND_TIER_CONFIGS: Record<BandLevel, BandTierConfig>;
