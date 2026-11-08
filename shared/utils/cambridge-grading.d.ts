import { WordLimitRule } from '../types/listening';
/**
 * Từ điển các cặp từ đồng nghĩa chính tả US - UK thông dụng trong kỳ thi IELTS
 */
export declare const US_UK_SPELLING_MAP: Record<string, string>;
/**
 * Bảng ánh xạ số dạng chữ sang số dạng số (cho các số cơ bản)
 */
export declare const NUMBER_WORDS_MAP: Record<string, string>;
/**
 * Phân tích và chuẩn hóa chuỗi người dùng nhập:
 * - Chuyển chữ thường
 * - Cắt bỏ khoảng trắng dư thừa
 * - Bỏ dấu chấm câu ở cuối
 */
export declare function normalizeUserAnswer(text: string): string;
/**
 * Đếm số từ và số lượng số theo quy tắc Cambridge IELTS:
 * - Từ ghép có dấu gạch nối ("part-time", "well-known") = 1 từ
 * - Con số ("25", "1999", "10.5", "50%") = 1 số
 */
export declare function countWordsAndNumbers(text: string): {
    wordCount: number;
    numberCount: number;
};
/**
 * Kiểm tra xem câu trả lời có vi phạm giới hạn từ của đề bài hay không
 */
export declare function validateWordLimit(text: string, rule?: WordLimitRule): {
    isValid: boolean;
    wordCount: number;
    numberCount: number;
    errorMessage?: string;
};
/**
 * Trình biên dịch cú pháp đáp án chuẩn Cambridge (Cambridge Pattern Expander):
 * 1. Tách các phương án độc lập theo `//`
 * 2. Phân rã dấu ngoặc đơn `(...)` (từ tùy chọn)
 * 3. Phân rã dấu gạch chéo đơn `/` (từ thay thế)
 * 4. Tự động bổ sung các biến thể chính tả US / UK tương ứng
 * 5. Bổ sung tương đương số (e.g., '1' <-> 'one')
 *
 * @param pattern Chuỗi đáp án từ Cambridge Answer Key (vd: "(the) garden // park", "centre/center")
 * @returns Danh sách đầy đủ các chuỗi đáp án chuẩn xác được chấp nhận
 */
export declare function compileCambridgeAcceptableAnswers(pattern: string): string[];
/**
 * CORE FUNCTION: Chấm điểm một câu hỏi IELTS Listening theo chuẩn Cambridge
 *
 * @param userAnswer Câu trả lời của thí sinh
 * @param correctAnswerPattern Chuỗi đáp án chuẩn Cambridge
 * @param wordLimitRule Quy tắc giới hạn từ (nếu có)
 * @returns Kết quả đúng (1 điểm) hoặc sai (0 điểm) và danh sách đáp án chấp nhận
 */
export declare function gradeSingleListeningQuestion(userAnswer: string, correctAnswerPattern: string, wordLimitRule?: WordLimitRule): {
    isCorrect: boolean;
    score: 1 | 0;
    wordLimitExceeded: boolean;
    wordCount: number;
    numberCount: number;
    acceptableAnswers: string[];
};
