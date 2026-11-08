/**
 * IELTS GO! - Gamification Engine & User Progress State
 * Quản lý 5 chỉ số Gamification, lưu trữ LocalStorage, chuyển đổi hệ thi Academic / General Training
 */

const GAMIFICATION_STORAGE_KEY = 'ielts_go_user_progress_v1';

// Bảng phân mốc 5 cấp độ Band điểm
const BAND_TIER_DEFINITIONS = [
  {
    tierKey: 'Mất gốc',
    title: 'Mất Gốc Nền Tảng',
    minScore: 0,
    maxScore: 3.5,
    icon: '🌱',
    color: '#E03131',
    description: 'Chưa có nền tảng ngữ pháp & từ vựng. Tập trung phát âm và từ vựng A1/A2.',
  },
  {
    tierKey: '< 4.5',
    title: 'Sơ Cấp (Elementary)',
    minScore: 3.5,
    maxScore: 4.5,
    icon: '🥉',
    color: '#F08C00',
    description: 'Hiểu các câu cơ bản nhưng vốn từ hạn chế. Bắt đầu làm quen các dạng đề Cambridge.',
  },
  {
    tierKey: '4.5 - 6.0',
    title: 'Trung Cấp (Intermediate)',
    minScore: 4.5,
    maxScore: 6.0,
    icon: '🥈',
    color: '#1971C2',
    description: 'Sử dụng ngôn ngữ tương đối hiệu quả. Luyện phương pháp Skimming, Scanning & Task 1.',
  },
  {
    tierKey: '6.0 - 7.5',
    title: 'Nâng Cao (Competent - Du Học)',
    minScore: 6.0,
    maxScore: 7.5,
    icon: '🥇',
    color: '#099268',
    description: 'Đạt ngưỡng chuẩn du học đại học & thạc sĩ. Chinh phục câu phức và collocations C1.',
  },
  {
    tierKey: '7.5+',
    title: 'Chuyên Sâu (Expert Master)',
    minScore: 7.5,
    maxScore: 9.0,
    icon: '👑',
    color: '#7048E8',
    description: 'Thành thạo xuất sắc, kiểm soát sắc thái biểu đạt học thuật tinh tế, tiệm cận bản xứ.',
  },
];

class IeltsGamificationEngine {
  constructor() {
    this.listeners = [];
    this.loadState();
    this.checkDailyStreak();
  }

  // Tải trạng thái từ LocalStorage hoặc gán mặc định
  loadState() {
    try {
      const saved = localStorage.getItem(GAMIFICATION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = {
          examTrack: parsed.examTrack || 'ACADEMIC', // 'ACADEMIC' hoặc 'GENERAL_TRAINING'
          vocabMastered: parsed.vocabMastered || 0,
          totalVocabTarget: Math.max(2500, parsed.totalVocabTarget || 2500),
          streak: parsed.streak || 1,
          lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0],
          crowns: parsed.crowns !== undefined ? parsed.crowns : 50,
          exp: parsed.exp || 0,
          level: parsed.level || 1,
          bandTier: parsed.bandTier || '4.5 - 6.0',
          overallBand: parsed.overallBand || 5.5,
          soundEnabled: parsed.soundEnabled !== undefined ? parsed.soundEnabled : true,
          unlockedHints: parsed.unlockedHints || [],
          studyHistory: parsed.studyHistory || [],
          masteredVocabIds: parsed.masteredVocabIds || [],
          reviewVocabIds: parsed.reviewVocabIds || [],
          claimedGatekeeperLevels: parsed.claimedGatekeeperLevels || [],
        };
      } else {
        this.state = {
          examTrack: 'ACADEMIC',
          vocabMastered: 0,
          totalVocabTarget: 2500,
          streak: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          crowns: 50,
          exp: 0,
          level: 1,
          bandTier: '4.5 - 6.0',
          overallBand: 5.5,
          soundEnabled: true,
          unlockedHints: [],
          studyHistory: [],
          masteredVocabIds: [],
          reviewVocabIds: [],
          claimedGatekeeperLevels: [],
        };
        this.saveState();
      }
    } catch (e) {
      console.warn('Lỗi đọc LocalStorage, khởi tạo dữ liệu mặc định:', e);
      this.state = {
        examTrack: 'ACADEMIC',
        vocabMastered: 0,
        totalVocabTarget: 2500,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        crowns: 50,
        exp: 0,
        level: 1,
        bandTier: '4.5 - 6.0',
        overallBand: 5.5,
        soundEnabled: true,
        unlockedHints: [],
        studyHistory: [],
        masteredVocabIds: [],
        reviewVocabIds: [],
        claimedGatekeeperLevels: [],
      };
    }
  }

  // Lưu trạng thái vào LocalStorage và thông báo listeners
  saveState() {
    try {
      localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Không thể lưu LocalStorage:', e);
    }
    this.notify();
  }

  // Đăng ký listener cập nhật giao diện
  subscribe(fn) {
    if (typeof fn === 'function') {
      this.listeners.push(fn);
      fn(this.state);
    }
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.state);
      } catch (err) {
        console.error('Lỗi khi thực thi gamification subscriber:', err);
      }
    });
  }

  // Chuyển đổi hệ thi Academic vs General Training
  setExamTrack(track) {
    if (track !== 'ACADEMIC' && track !== 'GENERAL_TRAINING') return;
    this.state.examTrack = track;
    this.saveState();
  }

  // Cập nhật chuỗi ngày học liên tục (Daily Streak)
  checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = this.state.lastActiveDate;

    if (!lastDate) {
      this.state.lastActiveDate = today;
      this.state.streak = 1;
      this.saveState();
      return;
    }

    if (lastDate === today) {
      return; // Cùng ngày, giữ nguyên
    }

    const prevDay = new Date();
    prevDay.setDate(prevDay.getDate() - 1);
    const yesterday = prevDay.toISOString().split('T')[0];

    if (lastDate === yesterday) {
      // Học liên tục sang ngày kế tiếp -> Tăng streak
      this.state.streak += 1;
      this.state.lastActiveDate = today;
      this.addCrowns(5); // Thưởng vương miện khi duy trì streak
      if (window.mascot) {
        window.mascot.celebrateStreak(this.state.streak);
      }
    } else {
      // Bị gián đoạn hơn 1 ngày -> Reset về 1
      this.state.streak = 1;
      this.state.lastActiveDate = today;
    }

    this.saveState();
  }

  // Cộng điểm kinh nghiệm (EXP) và tính toán lên Level
  addExp(amount) {
    if (amount <= 0) return;
    this.state.exp += amount;

    // 100 EXP = 1 Level
    const newLevel = Math.floor(this.state.exp / 100) + 1;
    if (newLevel > this.state.level) {
      this.state.level = newLevel;
      this.addCrowns(10); // Thưởng 10 crowns khi lên cấp
      if (window.soundSystem) window.soundSystem.playLevelUp();
      if (window.mascot) {
        window.mascot.say(`🎉 Chúc mừng bạn đã thăng cấp Level ${newLevel}! Nhận thêm 10 👑 Vương Miện!`, 4000);
        window.mascot.setMood('happy');
      }
    }

    this.saveState();
  }

  // Tăng số vương miện tích lũy
  addCrowns(amount) {
    if (amount <= 0) return;
    this.state.crowns += amount;
    this.saveState();
  }

  // Tiêu vương miện để mở khóa gợi ý / trợ giúp
  spendCrowns(amount) {
    if (this.state.crowns < amount) {
      if (window.soundSystem) window.soundSystem.playWrong();
      if (window.mascot) {
        window.mascot.say('Bạn không đủ Vương Miện 👑! Hãy hoàn thành các bài học để kiếm thêm nhé.', 3000);
      }
      return false;
    }
    this.state.crowns -= amount;
    this.saveState();
    return true;
  }

  // Cập nhật tiến độ thuộc từ vựng 20 chủ điểm
  recordVocabLearned(count = 1) {
    this.state.vocabMastered = Math.min(this.state.totalVocabTarget, this.state.vocabMastered + count);
    this.addExp(count * 5); // 1 từ = 5 EXP
    if (window.vocabGatekeeper) {
      window.vocabGatekeeper.checkAndTriggerGatekeeperReward(this.state.vocabMastered);
    }
    this.saveState();
  }

  // Đánh dấu từ vựng đã thuộc (Mastered)
  markVocabMastered(wordId) {
    if (!this.state.masteredVocabIds) this.state.masteredVocabIds = [];
    if (!this.state.reviewVocabIds) this.state.reviewVocabIds = [];

    if (!this.state.masteredVocabIds.includes(wordId)) {
      this.state.masteredVocabIds.push(wordId);
      // Xóa khỏi danh sách cần ôn nếu có
      this.state.reviewVocabIds = this.state.reviewVocabIds.filter((id) => id !== wordId);
      // Cập nhật chỉ số tiến độ trên Header
      this.state.vocabMastered = this.state.masteredVocabIds.length;
      this.addExp(10); // Thưởng +10 EXP cho mỗi từ thuộc
      if (window.vocabGatekeeper) {
        window.vocabGatekeeper.checkAndTriggerGatekeeperReward(this.state.vocabMastered);
      }
      this.saveState();
      return true;
    }
    return false;
  }

  // Đánh dấu từ vựng cần ôn tập lại (Needs Review)
  markVocabReview(wordId) {
    if (!this.state.masteredVocabIds) this.state.masteredVocabIds = [];
    if (!this.state.reviewVocabIds) this.state.reviewVocabIds = [];

    // Nếu đã từng thuộc thì gỡ ra
    if (this.state.masteredVocabIds.includes(wordId)) {
      this.state.masteredVocabIds = this.state.masteredVocabIds.filter((id) => id !== wordId);
      this.state.vocabMastered = this.state.masteredVocabIds.length;
    }

    if (!this.state.reviewVocabIds.includes(wordId)) {
      this.state.reviewVocabIds.push(wordId);
    }
    this.saveState();
  }

  // Toggle trạng thái đã thuộc / chưa thuộc
  toggleVocabMastered(wordId) {
    if (this.isVocabMastered(wordId)) {
      this.state.masteredVocabIds = this.state.masteredVocabIds.filter((id) => id !== wordId);
      this.state.vocabMastered = this.state.masteredVocabIds.length;
      this.saveState();
      return false;
    } else {
      return this.markVocabMastered(wordId);
    }
  }

  // Kiểm tra từ đã thuộc chưa
  isVocabMastered(wordId) {
    return Array.isArray(this.state.masteredVocabIds) && this.state.masteredVocabIds.includes(wordId);
  }

  // Kiểm tra từ có trong danh sách cần ôn không
  isVocabReview(wordId) {
    return Array.isArray(this.state.reviewVocabIds) && this.state.reviewVocabIds.includes(wordId);
  }

  // Đặt cấp độ Band thủ công hoặc qua bài test đầu vào
  setBandScore(score) {
    const num = Math.min(9.0, Math.max(0, parseFloat(score) || 0));
    this.state.overallBand = num;

    // Tìm band tier tương ứng
    const tier = BAND_TIER_DEFINITIONS.find((t) => num >= t.minScore && num <= t.maxScore) || BAND_TIER_DEFINITIONS[2];
    this.state.bandTier = tier.tierKey;
    this.saveState();
  }

  // Lấy định nghĩa chi tiết của Band Tier hiện tại
  getCurrentTierInfo() {
    return (
      BAND_TIER_DEFINITIONS.find((t) => t.tierKey === this.state.bandTier) ||
      BAND_TIER_DEFINITIONS[2]
    );
  }

  // Reset toàn bộ tiến độ (dành cho tính năng cài đặt)
  resetProgress() {
    this.state = {
      examTrack: 'ACADEMIC',
      vocabMastered: 0,
      totalVocabTarget: 2500,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      crowns: 50,
      exp: 0,
      level: 1,
      bandTier: '4.5 - 6.0',
      overallBand: 5.5,
      soundEnabled: true,
      unlockedHints: [],
      studyHistory: [],
      masteredVocabIds: [],
      reviewVocabIds: [],
      claimedGatekeeperLevels: [],
    };
    this.saveState();
  }
}

// Khởi tạo engine toàn cục
window.gamification = new IeltsGamificationEngine();
