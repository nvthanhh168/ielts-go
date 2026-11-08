"use strict";
/**
 * IELTS Master AI - Shared Domain Types & Enums
 * Used across Frontend and Backend for unified type safety
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillType = exports.BandLevel = exports.ExamType = void 0;
/**
 * 2 hình thức thi IELTS chính thức
 */
var ExamType;
(function (ExamType) {
    ExamType["ACADEMIC"] = "ACADEMIC";
    ExamType["GENERAL_TRAINING"] = "GENERAL_TRAINING";
})(ExamType || (exports.ExamType = ExamType = {}));
/**
 * 5 cấp độ phân tầng năng lực học tập theo Band điểm
 */
var BandLevel;
(function (BandLevel) {
    BandLevel["ZERO_FOUNDATION"] = "ZERO_FOUNDATION";
    BandLevel["BELOW_4_5"] = "BELOW_4_5";
    BandLevel["BAND_4_5_TO_6_0"] = "BAND_4_5_TO_6_0";
    BandLevel["BAND_6_0_TO_7_5"] = "BAND_6_0_TO_7_5";
    BandLevel["BAND_7_5_PLUS"] = "BAND_7_5_PLUS";
})(BandLevel || (exports.BandLevel = BandLevel = {}));
/**
 * 4 Kỹ năng cốt lõi của IELTS
 */
var SkillType;
(function (SkillType) {
    SkillType["LISTENING"] = "LISTENING";
    SkillType["SPEAKING"] = "SPEAKING";
    SkillType["READING"] = "READING";
    SkillType["WRITING"] = "WRITING";
})(SkillType || (exports.SkillType = SkillType = {}));
//# sourceMappingURL=ielts.js.map