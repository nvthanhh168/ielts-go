import { convertListeningRawScoreToBand } from '../utils/ielts-scoring';

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
export const LISTENING_PERFORMANCE_TIERS: ListeningPerformanceFeedback[] = [
  {
    minScore: 0,
    maxScore: 17,
    bandRange: 'Band 1.0 - 5.0',
    tierKey: 'NEED_MORE_PRACTICE',
    tierTitle: 'Cần học thêm nhiều trước khi thi',
    vietnameseTitle: 'Chưa đủ điều kiện dự thi thực tế - Cần củng cố nền tảng cấp tốc',
    statusBadge: {
      color: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300',
      label: '⚠️ CẦN LUYỆN TẬP THÊM NHIỀU',
    },
    evaluationSummary:
      'Điểm số dưới 18/40 cho thấy bạn chưa kiểm soát tốt tốc độ bài nghe, phản xạ nhận diện âm thanh và từ vựng còn hạn chế. Bạn thường xuyên bị lỡ nhịp ở Section 2, 3 và 4.',
    actionableRecommendations: [
      'Tập trung luyện nghe chép chính tả (Dictation) với các tài liệu sơ cấp: Basic Tactics for Listening, Listen Carefully.',
      'Rèn kỹ năng nghe bảng chữ cái, đánh vần tên riêng, số điện thoại và ngày tháng để lấy trọn vẹn 10/10 điểm ở Section 1.',
      'Luyện phương pháp đọc đề trước (Prediction) và gạch chân từ khóa (Keywords) trước khi audio vang lên.',
      'Chưa nên vội đăng ký thi thật để tránh lãng phí chi phí lệ phí thi.',
    ],
  },
  {
    minScore: 18,
    maxScore: 27,
    bandRange: 'Band 5.5 - 6.5',
    tierKey: 'ACCEPTABLE_BUT_NEEDS_MORE',
    tierTitle: 'Có thể đạt yêu cầu nhưng nên luyện thêm',
    vietnameseTitle: 'Tiệm cận hoặc Vừa chạm ngưỡng du học - Cần tối ưu điểm số',
    statusBadge: {
      color: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300',
      label: '⚡ CÓ THỂ ĐẠT YÊU CẦU NHƯNG NÊN LUYỆN THÊM',
    },
    evaluationSummary:
      'Bạn đã nắm vững cấu trúc đề thi, làm tốt Section 1 & 2. Tuy nhiên, bạn còn vấp phải các bẫy đổi ý kiến (Distractors) ở Section 3 (thảo luận nhóm) và chưa theo kịp tốc độ của Section 4 (bài giảng học thuật).',
    actionableRecommendations: [
      'Luyện chuyên sâu dạng bài Multiple Choice (Trắc nghiệm nhiều lựa chọn) và Map/Plan Labelling (Bản đồ / Sơ đồ).',
      'Xây dựng bảng từ đồng nghĩa (Paraphrasing notebook) đối chiếu giữa đề bài và tapescript băng nghe.',
      'Rèn thói quen kiểm tra lỗi số ít / số nhiều danh từ (-s / -es) và lỗi chính tả khi chuyển đáp án.',
      'Luyện giải trọn vẹn các bộ đề Cambridge IELTS 4 - 9 có sẵn trong hệ thống để ổn định phong độ ở mức 26-28 câu đúng.',
    ],
  },
  {
    minScore: 28,
    maxScore: 40,
    bandRange: 'Band 7.0 - 9.0',
    tierKey: 'EXAM_READY',
    tierTitle: 'Sẵn sàng đi thi',
    vietnameseTitle: 'Xuất sắc - Đạt chuẩn trực tiếp mọi trường Đại học hàng đầu thế giới',
    statusBadge: {
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
      label: '🎉 SẴN SÀNG ĐI THI THẬT',
    },
    evaluationSummary:
      'Tuyệt vời! Bạn có phản xạ nghe tự nhiên, nắm bắt từ khóa và xử lý bẫy thông tin cực kỳ nhạy bén. Bạn làm chủ hoàn toàn các bài giảng học thuật phức tạp của Section 4.',
    actionableRecommendations: [
      'Duy trì phản xạ nghe hàng ngày với tốc độ 1.25x - 1.5x qua các bài nói TED Talks, BBC Radio 4, Oxford Union.',
      'Thực hiện các bài Full Test bấm giờ nghiêm ngặt 30 phút nghe + 10 phút chuyển đáp án để làm quen áp lực phòng thi.',
      'Tập trung loại bỏ hoàn toàn các lỗi sai do bất cẩn (Careless mistakes) để chinh phục mục tiêu Band 8.5 - 9.0 tuyệt đối.',
      'Bạn đã hoàn toàn tự tin để đăng ký thi chính thức tại IDP hoặc Hội đồng Anh (British Council)!',
    ],
  },
];

/**
 * Lấy đánh giá tư vấn tương ứng với số câu đúng đạt được (0 - 40)
 */
export function getListeningFeedbackByScore(score: number): {
  rawScore: number;
  bandScore: number;
  tier: ListeningPerformanceFeedback;
} {
  const clampedScore = Math.max(0, Math.min(40, Math.round(score)));
  const bandScore = convertListeningRawScoreToBand(clampedScore);

  const tier =
    LISTENING_PERFORMANCE_TIERS.find(
      (t) => clampedScore >= t.minScore && clampedScore <= t.maxScore
    ) || LISTENING_PERFORMANCE_TIERS[0];

  return {
    rawScore: clampedScore,
    bandScore,
    tier,
  };
}
