import { BandLevel } from '../types/ielts';
/**
 * Thuật toán tính Overall Band Score theo quy tắc làm tròn chính thức của IELTS
 * (IDP & British Council Scoring Guidelines):
 *
 * 1. Tính trung bình cộng của 4 kỹ năng: average = (L + R + W + S) / 4
 * 2. Lấy phần thập phân (fraction):
 *    - fraction < 0.25: Làm tròn xuống số nguyên gần nhất (vd: 6.125 -> 6.0)
 *    - 0.25 <= fraction < 0.75: Làm tròn thành .5 (vd: 6.25 -> 6.5, 6.625 -> 6.5)
 *    - fraction >= 0.75: Làm tròn lên số nguyên tiếp theo (vd: 6.75 -> 7.0, 6.875 -> 7.0)
 *
 * @param scores Điểm 4 kỹ năng trên thang điểm từ 0.0 đến 9.0
 * @returns Overall Band Score đã được làm tròn chuẩn
 */
export declare function calculateOverallBandScore(scores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
}): {
    rawAverage: number;
    overallBand: number;
    roundedDirection: 'DOWN' | 'HALF' | 'UP' | 'EXACT';
};
/**
 * Thuật toán quy đổi từ Overall Band Score sang 5 Phân tầng Cấp độ của hệ thống
 * - "Mất gốc": 0.0 - 3.0
 * - "< 4.5": 3.5 - 4.0
 * - "4.5 - 6.0": 4.5 - 6.0
 * - "6.0 - 7.5": 6.5 - 7.0 (ngưỡng 6.0-6.5 đạt chuẩn du học)
 * - "7.5+": 7.5 - 9.0
 */
export declare function mapBandToTier(band: number): BandLevel;
/**
 * Bảng quy đổi số câu đúng sang Band điểm Listening (40 câu)
 */
export declare function convertListeningRawScoreToBand(rawScore: number): number;
/**
 * Bảng quy đổi số câu đúng sang Band điểm Reading (Academic vs General Training)
 */
export declare function convertReadingRawScoreToBand(rawScore: number, isAcademic?: boolean): number;
