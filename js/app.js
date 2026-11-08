/**
 * IELTS GO! - Main Application Controller (App Shell)
 * Quản lý thanh điều hướng Tabs, Hộp thoại 10 Chế Độ Học, Hồ sơ học viên và Đồng bộ Gamification
 */

// Định nghĩa đầy đủ danh mục 10 Chế độ học IELTS
const IELTS_10_MODES = [
  {
    id: 'roadmap',
    number: '01',
    icon: '🗺️',
    title: 'Lộ Trình 5 Band Điểm',
    badge: 'Cambridge Roadmap',
    badgeBg: '#FFE8CC',
    badgeColor: '#D9480F',
    category: 'foundation',
    categoryName: 'Lộ Trình',
    desc: 'Hệ thống phân tầng 5 cấp độ từ Mất gốc, < 4.5, 4.5-6.0, 6.0-7.5 đến 7.5+ chuẩn khảo thí.',
  },
  {
    id: 'flashcard',
    number: '02',
    icon: '🃏',
    title: 'Flashcard 3D',
    badge: 'Spaced Repetition',
    badgeBg: '#E7F5FF',
    badgeColor: '#1864AB',
    category: 'vocab',
    categoryName: 'Từ Vựng',
    desc: 'Lật thẻ 3 chiều học 1000 từ vựng C1/C2 thuộc 20 chủ điểm thông dụng kèm phiên âm IPA & câu ví dụ.',
  },
  {
    id: 'guess-game',
    number: '03',
    icon: '🎮',
    title: 'Game Đoán Từ',
    badge: 'Hot Game',
    badgeBg: '#FFE3E3',
    badgeColor: '#E03131',
    category: 'game',
    categoryName: 'Game Phản Xạ',
    desc: 'Thử thách phản xạ từ vựng IELTS có tính giờ đếm ngược, chuỗi combo ăn điểm và thưởng Vương Miện.',
  },
  {
    id: 'memory-game',
    number: '04',
    icon: '🧩',
    title: 'Lật Thẻ Trí Nhớ (Paraphrase Match)',
    badge: 'C1 Collocations',
    badgeBg: '#E6FCF5',
    badgeColor: '#0CA678',
    category: 'game',
    categoryName: 'Game Ghép Cặp',
    desc: 'Rèn luyện phản xạ liên kết từ đồng nghĩa (synonyms) và cụm collocations ăn điểm Lexical Resource.',
  },
  {
    id: 'speech-test',
    number: '05',
    icon: '🎤',
    title: 'Test Phát Âm & Speaking AI',
    badge: 'AI Voice & IPA',
    badgeBg: '#F3F0FF',
    badgeColor: '#7048E8',
    category: 'skills',
    categoryName: 'Kỹ Năng',
    desc: 'Phòng thi Speaking 3 Parts mô phỏng Cambridge, thu âm giọng nói thời gian thực và chấm 4 tiêu chí.',
  },
  {
    id: 'writing-studio',
    number: '06',
    icon: '✍️',
    title: 'IELTS Writing Studio',
    badge: 'Examiner Feedback',
    badgeBg: '#FFF9DB',
    badgeColor: '#D97706',
    category: 'skills',
    categoryName: 'Kỹ Năng',
    desc: 'Phòng viết Task 1 & 2 với bộ đếm từ tự động, cảnh báo lỗi văn nói và sinh bài mẫu Band 7.5+.',
  },
  {
    id: 'grammar-scramble',
    number: '07',
    icon: '📐',
    title: 'Ngữ Pháp & Ghép Câu Học Thuật',
    badge: 'Academic Grammar',
    badgeBg: '#EBFBEE',
    badgeColor: '#2B8A3E',
    category: 'foundation',
    categoryName: 'Nền Tảng',
    desc: 'Luyện ghép cấu trúc câu phức, câu chẻ, mệnh đề quan hệ và đảo ngữ nâng điểm Grammatical Range.',
  },
  {
    id: 'strict-sensei',
    number: '08',
    icon: '👩‍🏫',
    title: 'Giám Khảo Victoria AI (Khảo bài 1-on-1)',
    badge: 'Oral Interrogation',
    badgeBg: '#FFF0F6',
    badgeColor: '#D6336C',
    category: 'ai-exam',
    categoryName: 'Khảo Bài AI',
    desc: 'Phiên chất vấn 1-on-1 với Giám khảo Cambridge Victoria: Bắt lỗi trực tiếp và thử thách phản biện sâu.',
  },
  {
    id: 'mock-test',
    number: '09',
    icon: '🏆',
    title: 'Thi Thử IELTS (Cấp chứng chỉ TRF)',
    badge: 'Full Mock Test',
    badgeBg: '#FFE3E3',
    badgeColor: '#C92A2A',
    category: 'exam',
    categoryName: 'Thi Thử',
    desc: 'Bài thi thử 4 kỹ năng chuẩn Cambridge, tính điểm Overall Band Score và cấp chứng chỉ kết quả TRF.',
  },
  {
    id: 'vocab-vault',
    number: '10',
    icon: '📖',
    title: 'Sổ Tay Từ Vựng & Giáo Trình',
    badge: 'Cambridge Vault',
    badgeBg: '#F1F3F5',
    badgeColor: '#495057',
    category: 'vocab',
    categoryName: 'Học Liệu',
    desc: 'Kho học liệu tuyển chọn theo 5 cấp độ Band điểm: Basic Tactics, Cambridge IELTS, Mindset for IELTS...',
  },
];

class IeltsApp {
  constructor() {
    this.currentTab = 'roadmap';
    this.init();
  }

  init() {
    // Đọc tab đã lưu từ LocalStorage nếu có
    const savedTab = localStorage.getItem('ielts_go_active_tab');
    if (savedTab && IELTS_10_MODES.some((m) => m.id === savedTab)) {
      this.currentTab = savedTab;
    }

    // Đăng ký cập nhật Gamification HUD
    if (window.gamification) {
      window.gamification.subscribe((state) => this.renderGamificationHud(state));
    }

    // Gắn sự kiện chuyển tab
    this.bindTabEvents();

    // Render danh sách 10 chế độ trong Modal
    this.renderModesModalGrid();

    // Kích hoạt tab mặc định
    this.switchTab(this.currentTab, false);
  }

  // Cập nhật các chỉ số Gamification lên Header HUD Ribbon
  renderGamificationHud(state) {
    // 1. Tiến độ từ vựng 20 chủ điểm & Gatekeeping Level
    const masteryEl = document.getElementById('user-vocab-mastery');
    if (masteryEl) {
      if (window.vocabGatekeeper) {
        masteryEl.innerHTML = window.vocabGatekeeper.renderHeaderHtml(state.vocabMastered);
      } else {
        const target = state.totalVocabTarget || 2500;
        const percent = Math.round((state.vocabMastered / target) * 100);
        masteryEl.innerHTML = `${percent}% <span class="hide-mobile">(${state.vocabMastered}/${target} từ)</span>`;
      }
    }

    // 2. Chuỗi ngày học liên tục (Streak)
    const streakEl = document.getElementById('user-streak');
    if (streakEl) {
      streakEl.textContent = `${state.streak} ngày`;
    }

    // 3. Vương miện thưởng tích lũy (Crowns)
    const crownsEl = document.getElementById('user-crowns');
    if (crownsEl) {
      crownsEl.textContent = `${state.crowns}`;
    }

    // 4. Điểm kinh nghiệm (EXP)
    const expEl = document.getElementById('user-exp');
    if (expEl) {
      expEl.textContent = `${state.exp} EXP`;
    }

    // 5. Cấp độ học viên & Band Tier
    const levelEl = document.getElementById('user-level');
    const titleEl = document.getElementById('user-title');
    const tier = window.gamification ? window.gamification.getCurrentTierInfo() : null;

    if (levelEl) {
      levelEl.textContent = `Lv.${state.level}`;
    }
    if (titleEl && tier) {
      titleEl.textContent = `${tier.icon} Band ${tier.tierKey}`;
      titleEl.style.color = tier.color;
    }

    // Nút chọn hệ thi Academic / General Training
    const trackAcadBtn = document.getElementById('track-chip-academic');
    const trackGenBtn = document.getElementById('track-chip-general');
    if (trackAcadBtn && trackGenBtn) {
      trackAcadBtn.classList.toggle('active', state.examTrack === 'ACADEMIC');
      trackGenBtn.classList.toggle('active', state.examTrack === 'GENERAL_TRAINING');
    }

    // Đồng bộ số liệu thống kê realtime sang Sổ Tay & Flashcard nếu đang hiển thị
    if (window.vocabVaultApp && document.getElementById('vv-cards-container')) {
      if (typeof window.vocabVaultApp.updateHeaderAndTopBars === 'function') {
        window.vocabVaultApp.updateHeaderAndTopBars();
      } else if (typeof window.vocabVaultApp.updateDashboardStats === 'function') {
        window.vocabVaultApp.updateDashboardStats();
      }
    }
    if (window.flashcardApp && document.getElementById('fc-quick-stats-pill')) {
      if (typeof window.flashcardApp.updateStatsDisplay === 'function') {
        window.flashcardApp.updateStatsDisplay();
      }
    }
  }

  // Chuyển đổi hệ thi Academic vs General Training
  setExamTrack(track) {
    if (window.gamification) {
      window.gamification.setExamTrack(track);
      if (window.soundSystem) window.soundSystem.playClick();
      if (window.mascot) {
        if (track === 'ACADEMIC') {
          window.mascot.say('🎓 Bạn đã chọn hệ Academic (Đại học & Sau đại học)! Tập trung phân tích biểu đồ Task 1 & Reading học thuật nhé.', 4000);
        } else {
          window.mascot.say('💼 Bạn đã chọn hệ General Training (Đào tạo nghề & Định cư)! Chú ý kỹ năng viết thư Task 1 & Reading thông tin thực tế.', 4000);
        }
      }
    }
  }

  // Cuộn thanh tab ngang sang trái / phải
  scrollNav(offset) {
    const wrap = document.getElementById('nav-tabs-wrap');
    if (wrap) {
      wrap.scrollBy({ left: offset, behavior: 'smooth' });
    }
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Gắn sự kiện click cho các tab điều hướng
  bindTabEvents() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        if (tabId) {
          this.switchTab(tabId);
        }
      });
    });
  }

  // Chuyển Tab hiển thị
  switchTab(tabId, playSound = true) {
    if (!IELTS_10_MODES.some((m) => m.id === tabId)) return;

    this.currentTab = tabId;
    localStorage.setItem('ielts_go_active_tab', tabId);

    // Cập nhật trạng thái nút tab
    const tabs = document.querySelectorAll('.nav-tab-btn');
    tabs.forEach((btn) => {
      const isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isTarget);
      if (isTarget) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Cập nhật các section nội dung
    const panels = document.querySelectorAll('.app-tab-panel');
    panels.forEach((p) => {
      p.classList.remove('active');
    });

    const activePanel = document.getElementById(`tab-${tabId}`);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    // Khởi tạo nội dung của từng chế độ học khi tab được mở
    if (tabId === 'flashcard' && window.flashcardApp) {
      window.flashcardApp.render();
    } else if (tabId === 'guess-game' && window.guessGameApp) {
      window.guessGameApp.render();
    } else if (tabId === 'memory-game' && window.memoryGameApp) {
      window.memoryGameApp.render();
    } else if (tabId === 'speech-test' && window.speechTestApp) {
      window.speechTestApp.render();
    } else if (tabId === 'vocab-vault' && window.vocabVaultApp) {
      window.vocabVaultApp.render();
    } else if (tabId === 'writing-studio' && window.writingStudioApp) {
      window.writingStudioApp.render();
    } else if (tabId === 'grammar-scramble' && window.grammarScrambleApp) {
      window.grammarScrambleApp.render();
    } else if (tabId === 'strict-sensei' && window.strictExaminerApp) {
      window.strictExaminerApp.render();
    } else if (tabId === 'mock-test' && window.mockTestApp) {
      window.mockTestApp.render();
    } else if (tabId === 'roadmap' && (window.roadmap || window.roadmapModule)) {
      (window.roadmap || window.roadmapModule).render();
    }

    if (playSound && window.soundSystem) {
      window.soundSystem.playClick();
    }

    // Mascot chào mừng nhẹ khi đổi chế độ
    const modeInfo = IELTS_10_MODES.find((m) => m.id === tabId);
    if (modeInfo && window.mascot && playSound) {
      window.mascot.say(`Chế độ: <strong>${modeInfo.title}</strong> (${modeInfo.badge})!`, 3000);
    }
  }

  // Mở Hộp Thoại (Modal) hiển thị danh sách 10 Chế Độ Học
  openModesModal() {
    const modal = document.getElementById('modes-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Ngăn cuộn nền
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  // Đóng Modal 10 Chế Độ Học
  closeModesModal() {
    const modal = document.getElementById('modes-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  // Render lưới 10 Chế Độ Học trong Modal
  renderModesModalGrid() {
    const container = document.getElementById('modes-grid-container');
    if (!container) return;

    container.innerHTML = IELTS_10_MODES.map((mode) => `
      <div class="mode-card ${mode.id === this.currentTab ? 'current-active' : ''}" onclick="window.app.selectModeFromModal('${mode.id}')">
        <div class="mode-card-header">
          <div class="mode-icon-wrap">${mode.icon}</div>
          <span class="mode-badge" style="background:${mode.badgeBg}; color:${mode.badgeColor};">${mode.badge}</span>
        </div>
        <h4 class="mode-card-title">${mode.title}</h4>
        <p class="mode-card-desc">${mode.desc}</p>
        <div class="mode-card-footer">
          <span class="mode-number">Mô-đun #${mode.number}</span>
          <span class="mode-arrow">Vào học ➔</span>
        </div>
      </div>
    `).join('');
  }

  // Chọn chế độ từ trong Modal
  selectModeFromModal(modeId) {
    this.closeModesModal();
    this.switchTab(modeId);
  }

  // Mở chế độ ôn tập các từ đến hạn Spaced Repetition (SRS)
  openSrsDueReview(bandTier) {
    this.switchTab('flashcard');
    setTimeout(() => {
      if (window.flashcardApp) {
        if (bandTier && bandTier !== 'all') {
          window.flashcardApp.setFilter('band', bandTier);
        }
        window.flashcardApp.setFilter('status', 'due_srs');
      }
    }, 100);
  }

  // Mở Modal Hồ Sơ & Cài Đặt Gamification
  openProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    const state = window.gamification ? window.gamification.state : {};
    const tier = window.gamification ? window.gamification.getCurrentTierInfo() : {};

    // Cập nhật thông tin vào modal
    document.getElementById('prof-stat-streak').textContent = `${state.streak || 1} ngày`;
    document.getElementById('prof-stat-crowns').textContent = `${state.crowns || 0} 👑`;
    document.getElementById('prof-stat-exp').textContent = `${state.exp || 0} EXP`;
    document.getElementById('prof-stat-vocab').textContent = `${state.vocabMastered || 0} / ${state.totalVocabTarget || 2500} Core Words`;
    document.getElementById('prof-stat-band').textContent = `Band ${state.overallBand || 5.5} (${tier.title || 'Trung Cấp'})`;
    document.getElementById('prof-stat-track').textContent = state.examTrack === 'ACADEMIC' ? 'Academic (Đại học/Thạc sĩ)' : 'General Training (Định cư)';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Đóng Modal Hồ Sơ
  closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  // Reset tiến độ
  confirmReset() {
    if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ điểm kinh nghiệm và vương miện tích lũy?')) {
      if (window.gamification) {
        window.gamification.resetProgress();
        this.closeProfileModal();
        if (window.mascot) {
          window.mascot.say('Toàn bộ tiến độ đã được đặt lại mới. Hãy bắt đầu một chặng đường mới nhé!', 4000);
        }
      }
    }
  }
}

// Khởi tạo đối tượng app toàn cục
document.addEventListener('DOMContentLoaded', () => {
  window.app = new IeltsApp();
});
