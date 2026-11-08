"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUMBER_WORDS_MAP = exports.US_UK_SPELLING_MAP = void 0;
exports.normalizeUserAnswer = normalizeUserAnswer;
exports.countWordsAndNumbers = countWordsAndNumbers;
exports.validateWordLimit = validateWordLimit;
exports.compileCambridgeAcceptableAnswers = compileCambridgeAcceptableAnswers;
exports.gradeSingleListeningQuestion = gradeSingleListeningQuestion;
/**
 * Từ điển các cặp từ đồng nghĩa chính tả US - UK thông dụng trong kỳ thi IELTS
 */
exports.US_UK_SPELLING_MAP = {
    // -re vs -er
    centre: 'center',
    center: 'centre',
    theatre: 'theater',
    theater: 'theatre',
    metre: 'meter',
    meter: 'metre',
    litre: 'liter',
    liter: 'litre',
    // -our vs -or
    colour: 'color',
    color: 'colour',
    flavour: 'flavor',
    flavor: 'flavour',
    favourite: 'favorite',
    favorite: 'favourite',
    honour: 'honor',
    honor: 'honour',
    humour: 'humor',
    humor: 'humour',
    neighbour: 'neighbor',
    neighbor: 'neighbour',
    harbour: 'harbor',
    harbor: 'harbour',
    labour: 'labor',
    labor: 'labour',
    // -ise vs -ize
    organise: 'organize',
    organize: 'organise',
    realise: 'realize',
    realize: 'realise',
    recognise: 'recognize',
    recognize: 'recognise',
    analyse: 'analyze',
    analyze: 'analyse',
    criticise: 'criticize',
    criticize: 'criticise',
    apologise: 'apologize',
    apologize: 'apologise',
    // Double l vs single l
    travelling: 'traveling',
    traveling: 'travelling',
    cancelled: 'canceled',
    canceled: 'cancelled',
    fuelled: 'fueled',
    fueled: 'fuelled',
    // Miscellaneous
    programme: 'program',
    program: 'programme',
    dialogue: 'dialog',
    dialog: 'dialogue',
    cheque: 'check',
    check: 'cheque',
    grey: 'gray',
    gray: 'grey',
    defence: 'defense',
    defense: 'defence',
    licence: 'license',
    license: 'licence',
    jewellery: 'jewelry',
    jewelry: 'jewellery',
    tyre: 'tire',
    tire: 'tyre',
};
/**
 * Bảng ánh xạ số dạng chữ sang số dạng số (cho các số cơ bản)
 */
exports.NUMBER_WORDS_MAP = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    ten: '10',
    first: '1st',
    second: '2nd',
    third: '3rd',
    fourth: '4th',
    fifth: '5th',
};
/**
 * Phân tích và chuẩn hóa chuỗi người dùng nhập:
 * - Chuyển chữ thường
 * - Cắt bỏ khoảng trắng dư thừa
 * - Bỏ dấu chấm câu ở cuối
 */
function normalizeUserAnswer(text) {
    if (!text)
        return '';
    return text
        .trim()
        .toLowerCase()
        .replace(/[.,;!?]+$/, '') // Bỏ dấu chấm câu kết thúc
        .replace(/\s+/g, ' '); // Chuẩn hóa khoảng trắng đôi thành đơn
}
/**
 * Đếm số từ và số lượng số theo quy tắc Cambridge IELTS:
 * - Từ ghép có dấu gạch nối ("part-time", "well-known") = 1 từ
 * - Con số ("25", "1999", "10.5", "50%") = 1 số
 */
function countWordsAndNumbers(text) {
    const normalized = normalizeUserAnswer(text);
    if (!normalized)
        return { wordCount: 0, numberCount: 0 };
    // Tách theo khoảng trắng
    const tokens = normalized.split(' ').filter(Boolean);
    let wordCount = 0;
    let numberCount = 0;
    for (const token of tokens) {
        // Kiểm tra xem token có phải là số thuần túy (e.g. 25, 2026, $50, 10.5, 50%)
        const cleanToken = token.replace(/[$€£%]/g, '');
        if (/^\d+([.,]\d+)?$/.test(cleanToken)) {
            numberCount++;
        }
        else {
            // Từ ngữ (kể cả từ nối bằng gạch ngang như part-time)
            wordCount++;
        }
    }
    return { wordCount, numberCount };
}
/**
 * Kiểm tra xem câu trả lời có vi phạm giới hạn từ của đề bài hay không
 */
function validateWordLimit(text, rule) {
    const { wordCount, numberCount } = countWordsAndNumbers(text);
    if (!rule) {
        return { isValid: true, wordCount, numberCount };
    }
    if (wordCount > rule.maxWords) {
        return {
            isValid: false,
            wordCount,
            numberCount,
            errorMessage: `Vượt quá số từ cho phép! Đã nhập ${wordCount} từ (tối đa ${rule.maxWords} từ).`,
        };
    }
    if (!rule.allowNumber && numberCount > 0) {
        return {
            isValid: false,
            wordCount,
            numberCount,
            errorMessage: 'Đề bài không cho phép nhập số trong câu trả lời này.',
        };
    }
    return { isValid: true, wordCount, numberCount };
}
/**
 * Sinh danh sách tất cả các biến thể tương đương cho một biểu thức con chứa từ tùy chọn trong ngoặc:
 * Ví dụ: "(the) garden" -> ["garden", "the garden"]
 * Ví dụ: "(on) 15(th) (of) May" -> sinh tất cả các tổ hợp
 */
function expandOptionalWords(pattern) {
    const match = pattern.match(/\(([^)]+)\)/);
    if (!match) {
        return [pattern.trim()];
    }
    const optionalWord = match[1];
    const withWord = pattern.replace(match[0], ` ${optionalWord} `);
    const withoutWord = pattern.replace(match[0], ' ');
    // Đệ quy để xử lý nếu có nhiều cặp ngoặc đơn
    const expandedWith = expandOptionalWords(withWord);
    const expandedWithout = expandOptionalWords(withoutWord);
    const merged = Array.from(new Set([...expandedWith, ...expandedWithout]))
        .map((s) => s.replace(/\s+/g, ' ').trim())
        .filter(Boolean);
    return merged;
}
/**
 * Sinh danh sách các biến thể thay thế từ dấu gạch chéo đơn '/':
 * Ví dụ: "police station/office" -> ["police station", "police office"]
 * Ví dụ: "red/blue car" -> ["red car", "blue car"]
 * Ví dụ: "centre/center" -> ["centre", "center"]
 */
function expandSlashAlternatives(pattern) {
    if (!pattern.includes('/')) {
        return [pattern.trim()];
    }
    const tokens = pattern.split(' ');
    let results = [''];
    for (const token of tokens) {
        if (token.includes('/')) {
            const parts = token.split('/').map((p) => p.trim()).filter(Boolean);
            const newResults = [];
            for (const prefix of results) {
                for (const part of parts) {
                    newResults.push(`${prefix} ${part}`.trim());
                }
            }
            results = newResults;
        }
        else {
            results = results.map((prefix) => `${prefix} ${token}`.trim());
        }
    }
    return results;
}
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
function compileCambridgeAcceptableAnswers(pattern) {
    if (!pattern)
        return [];
    // Bước 1: Tách theo `//` (các đáp án độc lập)
    const distinctBranches = pattern
        .split('//')
        .map((s) => s.trim())
        .filter(Boolean);
    const acceptableSet = new Set();
    for (const branch of distinctBranches) {
        // Bước 2: Phân rã dấu ngoặc đơn `(...)`
        const withOptionalExpanded = expandOptionalWords(branch);
        for (const optVariation of withOptionalExpanded) {
            // Bước 3: Phân rã dấu gạch chéo đơn `/`
            const withSlashExpanded = expandSlashAlternatives(optVariation);
            for (const finalItem of withSlashExpanded) {
                const cleanItem = normalizeUserAnswer(finalItem);
                if (cleanItem) {
                    acceptableSet.add(cleanItem);
                    // Bước 4: Tự động bổ sung biến thể chính tả US / UK
                    const words = cleanItem.split(' ');
                    for (let i = 0; i < words.length; i++) {
                        const w = words[i];
                        if (exports.US_UK_SPELLING_MAP[w]) {
                            const altWord = exports.US_UK_SPELLING_MAP[w];
                            const variantWords = [...words];
                            variantWords[i] = altWord;
                            acceptableSet.add(variantWords.join(' '));
                        }
                    }
                    // Bước 5: Bổ sung tương đương chữ và số
                    for (let i = 0; i < words.length; i++) {
                        const w = words[i];
                        if (exports.NUMBER_WORDS_MAP[w]) {
                            const numVariant = [...words];
                            numVariant[i] = exports.NUMBER_WORDS_MAP[w];
                            acceptableSet.add(numVariant.join(' '));
                        }
                    }
                }
            }
        }
    }
    return Array.from(acceptableSet);
}
/**
 * CORE FUNCTION: Chấm điểm một câu hỏi IELTS Listening theo chuẩn Cambridge
 *
 * @param userAnswer Câu trả lời của thí sinh
 * @param correctAnswerPattern Chuỗi đáp án chuẩn Cambridge
 * @param wordLimitRule Quy tắc giới hạn từ (nếu có)
 * @returns Kết quả đúng (1 điểm) hoặc sai (0 điểm) và danh sách đáp án chấp nhận
 */
function gradeSingleListeningQuestion(userAnswer, correctAnswerPattern, wordLimitRule) {
    const normalizedUser = normalizeUserAnswer(userAnswer);
    // 1. Kiểm tra giới hạn từ
    const limitCheck = validateWordLimit(userAnswer, wordLimitRule);
    if (!limitCheck.isValid) {
        return {
            isCorrect: false,
            score: 0,
            wordLimitExceeded: true,
            wordCount: limitCheck.wordCount,
            numberCount: limitCheck.numberCount,
            acceptableAnswers: compileCambridgeAcceptableAnswers(correctAnswerPattern),
        };
    }
    // 2. Biên dịch mẫu đáp án Cambridge
    const acceptableAnswers = compileCambridgeAcceptableAnswers(correctAnswerPattern);
    // 3. So khớp chính xác không phân biệt hoa thường
    let isCorrect = acceptableAnswers.includes(normalizedUser);
    // 4. Nếu chưa khớp, thử so khớp thêm sau khi quy đổi US/UK trong câu của học sinh
    if (!isCorrect && normalizedUser) {
        const userWords = normalizedUser.split(' ');
        const altUserWords = userWords.map((w) => exports.US_UK_SPELLING_MAP[w] || w);
        const altUserAnswer = altUserWords.join(' ');
        if (acceptableAnswers.includes(altUserAnswer)) {
            isCorrect = true;
        }
    }
    // Không có nửa điểm: Đúng = 1, Sai = 0
    const score = isCorrect ? 1 : 0;
    return {
        isCorrect,
        score,
        wordLimitExceeded: false,
        wordCount: limitCheck.wordCount,
        numberCount: limitCheck.numberCount,
        acceptableAnswers,
    };
}
//# sourceMappingURL=cambridge-grading.js.map