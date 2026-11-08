/**
 * IELTS GO! - Spaced Repetition System (SRS) & Mastery Verification Engine
 * Quản lý 4 trạng thái học tập chuẩn xác và chu kỳ ngắt quãng Leitner / SM-2:
 * 1. ⚪ Chưa học (New): Mặc định khi từ mới xuất hiện trong hệ thống
 * 2. 🟡 Đang học (Learning): Kích hoạt khi lật Flashcard 3D hoặc tra cứu Lexical Deep-Dive Card
 * 3. 🔵 Đang ôn tập (Reviewing): Kích hoạt khi làm đúng 1 lần trong Quiz Đoán từ hoặc Game Lật thẻ trí nhớ
 * 4. 🟢 Đã thành thạo (Mastered): Đạt được khi làm đúng trong ít nhất 2 bài tập KHÁC NHAU HOẶC đặt câu / phát âm đạt điểm AI >= 7.0
 *
 * Quy tắc Gatekeeper:
 * Chỉ những từ đạt trạng thái "🔵 Reviewing" hoặc "🟢 Mastered" mới được tính vào hạn ngạch vượt Band.
 *
 * Chu kỳ ngắt quãng SRS:
 * Stage 1: Sau 1 ngày (24h)
 * Stage 2: Sau 3 ngày (72h)
 * Stage 3: Sau 7 ngày (168h)
 * Stage 4: Sau 14 ngày (336h)
 */

const IELTS_SRS_STORAGE_KEY = 'ielts_go_srs_state_v1';

// Bảng cấu hình các chặng lặp lại Spaced Repetition
const IELTS_SRS_STAGES = [
  { stage: 0, days: 0, label: 'Mới bắt đầu', desc: 'Chưa có chu kỳ ôn tập' },
  { stage: 1, days: 1, label: 'Chặng 1 (+1 ngày)', desc: 'Ôn tập củng cố sau 24 giờ' },
  { stage: 2, days: 3, label: 'Chặng 2 (+3 ngày)', desc: 'Chuyển hóa vào trí nhớ ngắn hạn' },
  { stage: 3, days: 7, label: 'Chặng 3 (+7 ngày)', desc: 'Khắc sâu vào trí nhớ trung hạn' },
  { stage: 4, days: 14, label: 'Chặng 4 (+14 ngày)', desc: 'Định hình trí nhớ dài hạn bền vững' },
  { stage: 5, days: 30, label: 'Chặng 5 (+30 ngày)', desc: 'Duy trì thành thạo phản xạ tự nhiên' },
];

class IeltsSrsManager {
  constructor() {
    this.records = {}; // { [wordId]: VocabSrsRecord }
    this.listeners = [];
    this.loadState();
  }

  // Tải dữ liệu SRS từ LocalStorage và đồng bộ với gamification
  loadState() {
    try {
      const saved = localStorage.getItem(IELTS_SRS_STORAGE_KEY);
      if (saved) {
        this.records = JSON.parse(saved);
      } else {
        this.records = {};
      }
    } catch (e) {
      console.warn('[SRS Manager] Lỗi đọc LocalStorage:', e);
      this.records = {};
    }

    // Tự động di chuyển dữ liệu cũ từ gamification nếu có
    this.migrateLegacyGamificationData();
  }

  // Lưu trạng thái SRS bền vững
  saveState() {
    try {
      localStorage.setItem(IELTS_SRS_STORAGE_KEY, JSON.stringify(this.records));
    } catch (e) {
      console.error('[SRS Manager] Không thể lưu LocalStorage:', e);
    }
    this.syncWithGamification();
    this.notify();
  }

  // Đăng ký nhận thông báo thay đổi trạng thái SRS
  subscribe(fn) {
    if (typeof fn === 'function') {
      this.listeners.push(fn);
      fn(this.getSummary());
    }
  }

  notify() {
    const summary = this.getSummary();
    this.listeners.forEach((fn) => {
      try {
        fn(summary);
      } catch (err) {
        console.error('[SRS Manager] Lỗi subscriber:', err);
      }
    });
  }

  // Chuyển đổi dữ liệu cũ (masteredVocabIds / reviewVocabIds) sang cấu trúc SRS mới
  migrateLegacyGamificationData() {
    if (typeof window === 'undefined' || !window.gamification || !window.gamification.state) {
      return;
    }

    const state = window.gamification.state;
    const oldMastered = Array.isArray(state.masteredVocabIds) ? state.masteredVocabIds : [];
    const oldReview = Array.isArray(state.reviewVocabIds) ? state.reviewVocabIds : [];
    let hasChanges = false;

    // Migrate các từ đã Mastered cũ
    oldMastered.forEach((wordId) => {
      if (!this.records[wordId]) {
        this.records[wordId] = {
          wordId,
          word: wordId,
          status: 'mastered',
          srsStage: 2,
          intervalDays: 3,
          lastReviewedAt: new Date().toISOString(),
          nextReviewDate: new Date(Date.now() + 3 * 86400000).toISOString(),
          correctActivities: ['manual', 'quiz'],
          totalCorrectCount: 2,
          totalAttemptCount: 2,
          aiEvaluations: [],
          highestAiScore: 0,
          history: [{ activity: 'manual', isCorrect: true, timestamp: new Date().toISOString() }],
        };
        hasChanges = true;
      }
    });

    // Migrate các từ đang Review cũ
    oldReview.forEach((wordId) => {
      if (!this.records[wordId]) {
        this.records[wordId] = {
          wordId,
          word: wordId,
          status: 'reviewing',
          srsStage: 1,
          intervalDays: 1,
          lastReviewedAt: new Date().toISOString(),
          nextReviewDate: new Date(Date.now() + 1 * 86400000).toISOString(),
          correctActivities: ['quiz'],
          totalCorrectCount: 1,
          totalAttemptCount: 1,
          aiEvaluations: [],
          highestAiScore: 0,
          history: [{ activity: 'quiz', isCorrect: true, timestamp: new Date().toISOString() }],
        };
        hasChanges = true;
      }
    });

    if (hasChanges) {
      try {
        localStorage.setItem(IELTS_SRS_STORAGE_KEY, JSON.stringify(this.records));
      } catch (e) {}
    }
  }

  // Lấy hoặc khởi tạo bản ghi cho từ vựng
  getRecord(wordId, wordMeta = {}) {
    if (!wordId) return null;

    if (!this.records[wordId]) {
      this.records[wordId] = {
        wordId,
        word: wordMeta.word || wordId,
        topicId: wordMeta.topicId || (wordMeta.topic ? wordMeta.topic.id : null),
        bandTier: wordMeta.bandTier || wordMeta.band || null,
        status: 'new', // ⚪ Mặc định là 'new'
        srsStage: 0,
        intervalDays: 0,
        lastReviewedAt: null,
        nextReviewDate: null,
        correctActivities: [],
        totalCorrectCount: 0,
        totalAttemptCount: 0,
        aiEvaluations: [],
        highestAiScore: 0,
        history: [],
      };
    } else if (wordMeta.word && (!this.records[wordId].word || this.records[wordId].word === wordId)) {
      // Cập nhật bổ sung metadata nếu bản ghi cũ thiếu
      this.records[wordId].word = wordMeta.word;
      if (wordMeta.topicId) this.records[wordId].topicId = wordMeta.topicId;
      if (wordMeta.bandTier) this.records[wordId].bandTier = wordMeta.bandTier;
    }

    return this.records[wordId];
  }

  // Lấy trạng thái hiện tại của từ ('new' | 'learning' | 'reviewing' | 'mastered')
  getStatus(wordId) {
    if (!wordId || !this.records[wordId]) return 'new';
    return this.records[wordId].status || 'new';
  }

  // Kiểm tra từ đã đạt mức Thành Thạo (Mastered) chưa
  isMastered(wordId) {
    return this.getStatus(wordId) === 'mastered';
  }

  // Kiểm tra từ có đang ở trạng thái Đang Ôn Tập (Reviewing) không
  isReviewing(wordId) {
    return this.getStatus(wordId) === 'reviewing';
  }

  // Kiểm tra từ có đang ở trạng thái Đang Học (Learning) không
  isLearning(wordId) {
    return this.getStatus(wordId) === 'learning';
  }

  // Kiểm tra từ có phải là từ Chưa Học (New) không
  isNew(wordId) {
    return this.getStatus(wordId) === 'new';
  }

  // Kiểm tra từ có đủ điều kiện tính vào Thanh Tiến Độ Vượt Band không (reviewing HOẶC mastered)
  isQualifiedForGatekeeper(wordId) {
    const s = this.getStatus(wordId);
    return s === 'reviewing' || s === 'mastered';
  }

  /**
   * 1. KÍCH HOẠT TRẠNG THÁI "🟡 ĐANG HỌC (LEARNING)"
   * Khi học viên lật xem thẻ Flashcard 3D
   */
  recordFlashcardFlip(wordId, wordMeta = {}) {
    const record = this.getRecord(wordId, wordMeta);
    if (!record) return;

    record.lastReviewedAt = new Date().toISOString();

    // Nếu từ đang ở trạng thái 'new', chuyển ngay sang 'learning'
    if (record.status === 'new') {
      record.status = 'learning';
      record.history.push({
        activity: 'flashcard',
        isCorrect: true,
        timestamp: new Date().toISOString(),
      });
      this.saveState();
      return { transitioned: true, from: 'new', to: 'learning' };
    }

    return { transitioned: false, status: record.status };
  }

  /**
   * Kích hoạt trạng thái khi học viên mở Thẻ Lexical Deep-Dive chuyên sâu
   */
  recordDeepDive(wordId, wordMeta = {}) {
    const record = this.getRecord(wordId, wordMeta);
    if (!record) return;

    record.lastReviewedAt = new Date().toISOString();

    if (record.status === 'new') {
      record.status = 'learning';
      record.history.push({
        activity: 'lexical_deep_dive',
        isCorrect: true,
        timestamp: new Date().toISOString(),
      });
      this.saveState();
      return { transitioned: true, from: 'new', to: 'learning' };
    }

    return { transitioned: false, status: record.status };
  }

  /**
   * 2. GHI NHẬN HOẠT ĐỘNG BÀI TẬP (QUIZ, MEMORY MATCH, SENTENCE SCRAMBLE)
   * - Trả lời đúng lần đầu -> Chuyển thành "🔵 Đang ôn tập (Reviewing)"
   * - Trả lời đúng trong ít nhất 2 bài tập KHÁC NHAU -> Chuyển thành "🟢 Đã thành thạo (Mastered)"
   * - Trả lời sai -> Reset về Stage 1 (+1 ngày) để ôn lại
   */
  recordActivity(wordId, activityType, isCorrect, wordMeta = {}) {
    const record = this.getRecord(wordId, wordMeta);
    if (!record) return null;

    record.totalAttemptCount += 1;
    record.lastReviewedAt = new Date().toISOString();

    record.history.push({
      activity: activityType,
      isCorrect: !!isCorrect,
      timestamp: new Date().toISOString(),
    });

    let transitioned = false;
    let oldStatus = record.status;

    if (isCorrect) {
      record.totalCorrectCount += 1;

      // Thêm bài tập vào danh sách bài tập đã làm đúng (không trùng lặp)
      if (!record.correctActivities.includes(activityType)) {
        record.correctActivities.push(activityType);
      }

      // ĐIỀU KIỆN 1: Thành thạo khi làm đúng trong ít nhất 2 bài tập KHÁC NHAU
      if (record.correctActivities.length >= 2) {
        if (record.status !== 'mastered') {
          record.status = 'mastered';
          transitioned = true;
          // Tăng stage lên tối thiểu Stage 2 (+3 ngày)
          record.srsStage = Math.max(2, record.srsStage + 1);
          this.awardMasteryBonus(record.word, 'Hoàn thành chính xác 2 dạng bài tập khác nhau');
        } else {
          // Đã mastered, tăng chu kỳ lặp lại theo SRS
          record.srsStage = Math.min(5, record.srsStage + 1);
        }
      } else {
        // ĐIỀU KIỆN 2: Đúng 1 lần trong bài tập -> Chuyển thành "🔵 Reviewing"
        if (record.status === 'new' || record.status === 'learning') {
          record.status = 'reviewing';
          transitioned = true;
          record.srsStage = 1; // Stage 1: +1 ngày
        } else if (record.status === 'reviewing') {
          // Tăng stage nếu đang ôn tập tốt
          record.srsStage = Math.min(4, record.srsStage + 1);
        }
      }

      // Tính ngày ôn tập tiếp theo dựa theo srsStage
      const stageConfig = IELTS_SRS_STAGES.find((s) => s.stage === record.srsStage) || IELTS_SRS_STAGES[1];
      record.intervalDays = stageConfig.days;
      record.nextReviewDate = new Date(Date.now() + stageConfig.days * 86400000).toISOString();

    } else {
      // Khi làm sai: Giảm stage về 1 (+1 ngày) để ôn tập lại sớm
      record.srsStage = 1;
      record.intervalDays = 1;
      record.nextReviewDate = new Date(Date.now() + 1 * 86400000).toISOString();

      // Nếu đang ở mastered mà làm sai, đưa về reviewing để củng cố
      if (record.status === 'mastered') {
        record.status = 'reviewing';
        transitioned = true;
      }
    }

    this.saveState();

    return {
      transitioned,
      from: oldStatus,
      to: record.status,
      record,
    };
  }

  /**
   * 3. GHI NHẬN ĐÁNH GIÁ TỪ GIÁM KHẢO AI (EXAMINER AI / SPEECH AI >= 7.0)
   * Nếu đặt câu hoặc phát âm đạt điểm AI >= 7.0 -> Thăng hạng trực tiếp lên "🟢 Mastered"
   */
  recordAiMastery(wordId, aiType, bandScore, wordMeta = {}) {
    const record = this.getRecord(wordId, wordMeta);
    if (!record) return null;

    const score = Math.max(0, parseFloat(bandScore) || 0);
    record.lastReviewedAt = new Date().toISOString();
    record.totalAttemptCount += 1;

    record.aiEvaluations.push({
      type: aiType,
      bandScore: score,
      timestamp: new Date().toISOString(),
    });

    if (score > record.highestAiScore) {
      record.highestAiScore = score;
    }

    let transitioned = false;
    const oldStatus = record.status;

    if (score >= 7.0) {
      // ĐẠT TIÊU CHUẨN THÀNH THẠO AI: Band >= 7.0
      record.totalCorrectCount += 1;
      if (!record.correctActivities.includes(aiType)) {
        record.correctActivities.push(aiType);
      }

      record.status = 'mastered';
      transitioned = oldStatus !== 'mastered';
      // Thăng hạng Stage 2 hoặc 3 (+3 hoặc +7 ngày)
      record.srsStage = Math.max(2, record.srsStage + 1);

      const stageConfig = IELTS_SRS_STAGES.find((s) => s.stage === record.srsStage) || IELTS_SRS_STAGES[2];
      record.intervalDays = stageConfig.days;
      record.nextReviewDate = new Date(Date.now() + stageConfig.days * 86400000).toISOString();

      this.awardMasteryBonus(record.word, `Đạt điểm Giám khảo AI Band ${score.toFixed(1)}`);

    } else if (score >= 5.5) {
      // Đạt mức khá -> chuyển sang reviewing nếu chưa mastered
      if (record.status === 'new' || record.status === 'learning') {
        record.status = 'reviewing';
        transitioned = true;
        record.srsStage = 1;
        record.intervalDays = 1;
        record.nextReviewDate = new Date(Date.now() + 1 * 86400000).toISOString();
      }
    }

    this.saveState();

    return {
      transitioned,
      from: oldStatus,
      to: record.status,
      bandScore: score,
      record,
    };
  }

  /**
   * Đánh dấu trực tiếp "Đã thuộc" (Manual Master)
   */
  recordDirectMaster(wordId, wordMeta = {}) {
    const record = this.getRecord(wordId, wordMeta);
    if (!record) return;

    const oldStatus = record.status;
    record.status = 'mastered';
    record.lastReviewedAt = new Date().toISOString();
    record.srsStage = Math.max(2, record.srsStage || 2);
    record.intervalDays = 3;
    record.nextReviewDate = new Date(Date.now() + 3 * 86400000).toISOString();

    if (!record.correctActivities.includes('manual')) {
      record.correctActivities.push('manual');
    }

    this.awardMasteryBonus(record.word, 'Đánh dấu thành thạo trực tiếp');
    this.saveState();

    return { transitioned: oldStatus !== 'mastered', from: oldStatus, to: 'mastered' };
  }

  /**
   * Đánh dấu trực tiếp "Cần ôn tập" (Manual Review)
   */
  recordDirectReview(wordId, wordMeta = {}) {
    const record = this.getRecord(wordId, wordMeta);
    if (!record) return;

    const oldStatus = record.status;
    record.status = 'reviewing';
    record.lastReviewedAt = new Date().toISOString();
    record.srsStage = 1;
    record.intervalDays = 1;
    record.nextReviewDate = new Date(Date.now() + 1 * 86400000).toISOString();

    this.saveState();
    return { transitioned: oldStatus !== 'reviewing', from: oldStatus, to: 'reviewing' };
  }

  // Thưởng EXP và hiển thị chúc mừng khi đạt Mastered
  awardMasteryBonus(word, reason) {
    if (typeof window === 'undefined') return;

    if (window.gamification) {
      window.gamification.addExp(20);
      window.gamification.addCrowns(1);
    }

    if (window.soundSystem) {
      window.soundSystem.playCorrect();
    }

    if (window.mascot) {
      window.mascot.say(`🎉 CHÚC MỪNG! Bạn đã Đạt Thành Thạo từ "<strong>${word}</strong>" (${reason})! +20 EXP &amp; +1 👑!`, 4000);
      window.mascot.setMood('happy');
    }
  }

  /**
   * 4. QUẢN LÝ LỊCH ÔN TẬP VÀ KIỂM TRA ĐẾN HẠN (SPACED REPETITION SCHEDULE)
   */

  // Kiểm tra từ có đến hạn ôn tập hôm nay không
  isDueForReview(wordId) {
    const record = this.records[wordId];
    if (!record || !record.nextReviewDate) return false;

    // Đã có lịch nhắc và thời gian <= hiện tại (hoặc cùng ngày)
    const reviewTime = new Date(record.nextReviewDate).getTime();
    const now = Date.now();
    return reviewTime <= now || this.isSameDay(new Date(reviewTime), new Date(now));
  }

  isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  // Lấy danh sách các từ đến hạn ôn tập
  getDueReviews(topicId = 'all', bandTier = 'all') {
    const dueList = [];
    const now = Date.now();

    Object.values(this.records).forEach((r) => {
      // Chỉ kiểm tra các từ đang ở trạng thái 'reviewing' hoặc 'mastered'
      if (r.status !== 'reviewing' && r.status !== 'mastered') return;

      if (!r.nextReviewDate) return;

      const reviewTime = new Date(r.nextReviewDate).getTime();
      const isDue = reviewTime <= now || this.isSameDay(new Date(reviewTime), new Date(now));

      if (isDue) {
        if (topicId !== 'all' && r.topicId && r.topicId !== topicId) return;
        if (bandTier !== 'all' && r.bandTier && r.bandTier !== bandTier) return;
        dueList.push(r);
      }
    });

    return dueList;
  }

  // Thống kê số lượng từ đến hạn ôn tập nhóm theo Band điểm
  getDueReviewsGroupedByBand() {
    const dueWords = this.getDueReviews('all', 'all');
    const group = {
      'Mất gốc': 0,
      '< 4.5': 0,
      '4.5 - 6.0': 0,
      '6.0 - 7.5': 0,
      '7.5+': 0,
    };

    dueWords.forEach((item) => {
      let tier = item.bandTier || '4.5 - 6.0';
      if (group[tier] === undefined) {
        // Fallback mapping nếu band tier được viết dạng khác
        if (tier.includes('6.0') || tier.includes('6.5') || tier.includes('7.0')) tier = '6.0 - 7.5';
        else if (tier.includes('7.5') || tier.includes('8.') || tier.includes('9.')) tier = '7.5+';
        else if (tier.includes('4.5') || tier.includes('5.') || tier.includes('6.')) tier = '4.5 - 6.0';
        else if (tier.includes('3.') || tier.includes('4.') || tier.includes('< 4.5')) tier = '< 4.5';
        else tier = 'Mất gốc';
      }
      group[tier] = (group[tier] || 0) + 1;
    });

    return group;
  }

  /**
   * 5. THỐNG KÊ TỔNG QUAN VÀ ĐỒNG BỘ GAMIFICATION
   */

  // Lấy tổng số từ đạt chuẩn (Reviewing + Mastered) để nạp vào Gatekeeper
  getQualifiedCount(bandTier = 'all') {
    let count = 0;
    Object.values(this.records).forEach((r) => {
      if (r.status === 'reviewing' || r.status === 'mastered') {
        if (bandTier === 'all' || r.bandTier === bandTier) {
          count += 1;
        }
      }
    });
    return count;
  }

  // Lấy toàn bộ số liệu tổng hợp của hệ thống SRS
  getSummary() {
    let newCount = 0;
    let learningCount = 0;
    let reviewingCount = 0;
    let masteredCount = 0;
    const dueByBand = this.getDueReviewsGroupedByBand();
    let dueTodayCount = 0;

    Object.values(dueByBand).forEach((c) => {
      dueTodayCount += c;
    });

    Object.values(this.records).forEach((r) => {
      if (r.status === 'mastered') masteredCount += 1;
      else if (r.status === 'reviewing') reviewingCount += 1;
      else if (r.status === 'learning') learningCount += 1;
      else newCount += 1;
    });

    const totalWords = Object.keys(this.records).length;
    const qualifiedCount = reviewingCount + masteredCount;

    return {
      totalWords,
      newCount,
      learningCount,
      reviewingCount,
      masteredCount,
      qualifiedCount,
      dueTodayCount,
      dueByBand,
    };
  }

  // Đồng bộ hai chiều với Gamification Engine và Vocabulary Gatekeeper
  syncWithGamification() {
    if (typeof window === 'undefined' || !window.gamification || !window.gamification.state) {
      return;
    }

    const state = window.gamification.state;

    // Danh sách từ đã Mastered
    const masteredIds = [];
    // Danh sách từ đang Reviewing
    const reviewIds = [];

    Object.values(this.records).forEach((r) => {
      if (r.status === 'mastered') {
        masteredIds.push(r.wordId);
      } else if (r.status === 'reviewing') {
        reviewIds.push(r.wordId);
      }
    });

    state.masteredVocabIds = masteredIds;
    state.reviewVocabIds = reviewIds;

    // QUY TẮC CỐT LÕI:
    // Chỉ những từ đạt trạng thái "Reviewing" HOẶC "Mastered" mới được tính vào Thanh tiến độ Vượt Band
    const qualifiedCount = masteredIds.length + reviewIds.length;
    state.vocabMastered = qualifiedCount;

    // Kiểm tra thưởng Gatekeeper nếu đạt mốc
    if (window.vocabGatekeeper) {
      window.vocabGatekeeper.checkAndTriggerGatekeeperReward(qualifiedCount);
    }

    // Lưu Gamification
    try {
      localStorage.setItem('ielts_go_user_progress_v1', JSON.stringify(state));
      window.gamification.notify();
    } catch (e) {}
  }

  /**
   * Trả về HTML badge trực quan của 4 trạng thái SRS
   */
  renderStatusBadgeHtml(wordId) {
    const status = this.getStatus(wordId);
    const record = this.records[wordId];
    const isDue = this.isDueForReview(wordId);

    if (status === 'mastered') {
      const criteriaNote = record && record.highestAiScore >= 7.0
        ? `⭐ AI Band ${record.highestAiScore.toFixed(1)}`
        : '🏆 2 Bài tập';
      return `
        <span class="srs-status-badge srs-mastered" title="Đã thành thạo (${criteriaNote}) - Chu kỳ SRS: +${record ? record.intervalDays : 3} ngày">
          🟢 Đã thành thạo <small class="srs-sub-note">${criteriaNote}</small>
        </span>
      `;
    }

    if (status === 'reviewing') {
      const dueBadge = isDue ? '<span class="srs-due-indicator" title="Đã đến hạn ôn tập hôm nay!">⏰ Cần ôn</span>' : '';
      const stageText = record ? `Stage ${record.srsStage}` : 'Stage 1';
      return `
        <span class="srs-status-badge srs-reviewing" title="Đang ôn tập (${stageText}) - Chu kỳ: +${record ? record.intervalDays : 1} ngày">
          🔵 Đang ôn tập <small class="srs-sub-note">${stageText}</small> ${dueBadge}
        </span>
      `;
    }

    if (status === 'learning') {
      return `
        <span class="srs-status-badge srs-learning" title="Đang học (Mới lật thẻ / Deep-Dive) - Chưa qua kiểm tra phản xạ">
          🟡 Đang học
        </span>
      `;
    }

    return `
      <span class="srs-status-badge srs-new" title="Từ mới chưa bắt đầu học">
        ⚪ Chưa học
      </span>
    `;
  }
}

// Khởi tạo SRS Manager toàn cục
if (typeof window !== 'undefined') {
  window.srsManager = new IeltsSrsManager();
}

// Hỗ trợ export module cho Node / Jest / TS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IeltsSrsManager,
    IELTS_SRS_STAGES,
  };
}
