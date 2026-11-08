export interface ListeningPerformanceFeedback {
    minScore: number;
    maxScore: number;
    bandRange: string;
    tierKey: 'NEED_MORE_PRACTICE' | 'ACCEPTABLE_BUT_NEEDS_MORE' | 'EXAM_READY';
    tierTitle: string;
    vietnameseTitle: string;
    statusBadge: {
        color: string;
        label: string;
    };
    evaluationSummary: string;
    actionableRecommendations: string[];
}
/**
 * Bảng tư vấn 3 mức điểm khảo thí chuẩn Cambridge Listening
 */
export declare const LISTENING_PERFORMANCE_TIERS: ListeningPerformanceFeedback[];
/**
 * Lấy đánh giá tư vấn tương ứng với số câu đúng đạt được (0 - 40)
 */
export declare function getListeningFeedbackByScore(score: number): {
    rawScore: number;
    bandScore: number;
    tier: ListeningPerformanceFeedback;
};
