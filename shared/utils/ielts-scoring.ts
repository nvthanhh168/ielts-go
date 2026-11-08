import { BandLevel, SkillType } from '../types/ielts';

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
export function calculateOverallBandScore(scores: {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}): {
  rawAverage: number;
  overallBand: number;
  roundedDirection: 'DOWN' | 'HALF' | 'UP' | 'EXACT';
} {
  const { listening, reading, writing, speaking } = scores;
  
  // Đảm bảo điểm nằm trong khoảng hợp lệ 0 - 9
  const clamp = (val: number) => Math.max(0, Math.min(9, val));
  const l = clamp(listening);
  const r = clamp(reading);
  const w = clamp(writing);
  const s = clamp(speaking);

  const rawAverage = (l + r + w + s) / 4;
  const integerPart = Math.floor(rawAverage);
  const decimalPart = rawAverage - integerPart;

  let overallBand: number;
  let roundedDirection: 'DOWN' | 'HALF' | 'UP' | 'EXACT' = 'EXACT';

  if (decimalPart === 0 || decimalPart === 0.5) {
    overallBand = rawAverage;
    roundedDirection = 'EXACT';
  } else if (decimalPart < 0.25) {
    overallBand = integerPart;
    roundedDirection = 'DOWN';
  } else if (decimalPart < 0.75) {
    overallBand = integerPart + 0.5;
    roundedDirection = 'HALF';
  } else {
    overallBand = integerPart + 1.0;
    roundedDirection = 'UP';
  }

  // Band điểm tối đa là 9.0
  overallBand = Math.min(9.0, Math.max(0, overallBand));

  return {
    rawAverage: Number(rawAverage.toFixed(3)),
    overallBand: Number(overallBand.toFixed(1)),
    roundedDirection,
  };
}

/**
 * Thuật toán quy đổi từ Overall Band Score sang 5 Phân tầng Cấp độ của hệ thống
 * - "Mất gốc": 0.0 - 3.0
 * - "< 4.5": 3.5 - 4.0
 * - "4.5 - 6.0": 4.5 - 6.0
 * - "6.0 - 7.5": 6.5 - 7.0 (ngưỡng 6.0-6.5 đạt chuẩn du học)
 * - "7.5+": 7.5 - 9.0
 */
export function mapBandToTier(band: number): BandLevel {
  if (band <= 3.0) {
    return BandLevel.ZERO_FOUNDATION; // Mất gốc
  } else if (band < 4.5) {
    return BandLevel.BELOW_4_5;       // < 4.5
  } else if (band <= 6.0) {
    return BandLevel.BAND_4_5_TO_6_0; // 4.5 - 6.0
  } else if (band < 7.5) {
    return BandLevel.BAND_6_0_TO_7_5; // 6.0 - 7.5
  } else {
    return BandLevel.BAND_7_5_PLUS;   // 7.5+
  }
}

/**
 * Bảng quy đổi số câu đúng sang Band điểm Listening (40 câu)
 */
export function convertListeningRawScoreToBand(rawScore: number): number {
  const s = Math.max(0, Math.min(40, Math.round(rawScore)));
  if (s >= 39) return 9.0;
  if (s >= 37) return 8.5;
  if (s >= 35) return 8.0;
  if (s >= 32) return 7.5;
  if (s >= 30) return 7.0;
  if (s >= 26) return 6.5;
  if (s >= 23) return 6.0;
  if (s >= 18) return 5.5;
  if (s >= 16) return 5.0;
  if (s >= 13) return 4.5;
  if (s >= 10) return 4.0;
  if (s >= 8) return 3.5;
  if (s >= 6) return 3.0;
  if (s >= 4) return 2.5;
  if (s >= 2) return 2.0;
  if (s >= 1) return 1.0;
  return 0.0;
}

/**
 * Bảng quy đổi số câu đúng sang Band điểm Reading (Academic vs General Training)
 */
export function convertReadingRawScoreToBand(rawScore: number, isAcademic: boolean = true): number {
  const s = Math.max(0, Math.min(40, Math.round(rawScore)));
  if (isAcademic) {
    // Academic Reading
    if (s >= 39) return 9.0;
    if (s >= 37) return 8.5;
    if (s >= 35) return 8.0;
    if (s >= 33) return 7.5;
    if (s >= 30) return 7.0;
    if (s >= 27) return 6.5;
    if (s >= 23) return 6.0;
    if (s >= 19) return 5.5;
    if (s >= 15) return 5.0;
    if (s >= 13) return 4.5;
    if (s >= 10) return 4.0;
    if (s >= 8) return 3.5;
    if (s >= 6) return 3.0;
    if (s >= 4) return 2.5;
    return 2.0;
  } else {
    // General Training Reading (Yêu cầu số câu đúng cao hơn để đạt cùng band)
    if (s === 40) return 9.0;
    if (s >= 39) return 8.5;
    if (s >= 37) return 8.0;
    if (s >= 36) return 7.5;
    if (s >= 34) return 7.0;
    if (s >= 32) return 6.5;
    if (s >= 30) return 6.0;
    if (s >= 27) return 5.5;
    if (s >= 23) return 5.0;
    if (s >= 19) return 4.5;
    if (s >= 15) return 4.0;
    if (s >= 12) return 3.5;
    if (s >= 9) return 3.0;
    return 2.0;
  }
}
