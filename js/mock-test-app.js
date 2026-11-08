/**
 * IELTS GO! - Chế Độ 9: Phòng Thi Thử IELTS Listening & Reading (Cambridge Mock Exam Engine)
 * Phần A: Phòng thi Listening (4 Sections, 30m nghe + 10m transfer) & Reading (3 Passages, 60m, Split-screen, Highlighter)
 * Phần B: Bảng Điểm Tổng Hợp & Cấp Chứng Chỉ IELTS Test Report Form (TRF)
 * - Tự động tính Overall Band Score theo quy chuẩn làm tròn Cambridge (.25 -> .5; .75 -> .0)
 * - Thiết kế Chứng chỉ TRF điện tử sang trọng chuẩn British Council, IDP & Cambridge Assessment English
 * - Dấu mộc đỏ chuẩn khảo thí (Official Verified Exam Seal), chữ ký Giám đốc và mã TRF Number
 * - Hỗ trợ in PDF và xuất hình ảnh PNG chất lượng cao
 * - Đồng bộ điểm và tiến độ học tập với Header Gamification HUD
 */

class IeltsMockTestApp {
  constructor() {
    this.container = null;
    this.activeMockMode = 'EXAM_ROOM'; // 'EXAM_ROOM' (Phần A) hoặc 'TRF_CERTIFICATE' (Phần B)

    // Phần A: State Phòng Thi
    this.activeSkill = 'LISTENING'; // 'LISTENING' hoặc 'READING'
    this.readingTrack = 'ACADEMIC'; // 'ACADEMIC' hoặc 'GENERAL'
    this.examState = 'IDLE'; // 'IDLE', 'TESTING', 'SUBMITTED'

    // Listening State
    this.currentListeningSection = 1; // 1, 2, 3, 4
    this.listeningTimerSeconds = 40 * 60; // 40 phút (30m nghe + 10m transfer)
    this.isAudioPlayedOnce = false;
    this.isAudioPlaying = false;
    this.audioPlaybackTime = 0;

    // Reading State
    this.currentReadingPassage = 1; // 1, 2, 3
    this.readingTimerSeconds = 60 * 60; // 60 phút
    this.currentHighlightColor = 'yellow'; // 'yellow', 'green', 'orange'

    // Lưu trữ câu trả lời: { [qId]: string }
    this.userAnswers = {};

    // Timer Interval
    this.timerInterval = null;

    // Kết quả chấm thi Phần A
    this.gradingResult = null;

    // Phần B: Hồ sơ & Điểm số Chứng chỉ TRF
    this.loadTrfProfileAndScores();
  }

  // Tải hoặc thiết lập mặc định hồ sơ chứng chỉ TRF
  loadTrfProfileAndScores() {
    try {
      const savedProfile = localStorage.getItem('ielts_trf_candidate_profile');
      if (savedProfile) {
        this.candidateProfile = JSON.parse(savedProfile);
      } else {
        this.candidateProfile = {
          fullName: 'NGUYEN VAN AN',
          candidateId: 'VN001-08924',
          dob: '15/08/2000',
          sex: 'Male',
          schemeCode: 'Academic',
          country: 'Vietnam',
          firstLanguage: 'Vietnamese',
          testDate: new Date().toLocaleDateString('en-GB'),
          centreNumber: 'VN001 - British Council Hanoi'
        };
      }

      const savedScores = localStorage.getItem('ielts_trf_skill_scores');
      if (savedScores) {
        this.trfScores = JSON.parse(savedScores);
      } else {
        this.trfScores = {
          listening: 7.5,
          reading: 8.0,
          writing: 7.0,
          speaking: 7.5
        };
      }
    } catch (e) {
      this.candidateProfile = {
        fullName: 'NGUYEN VAN AN',
        candidateId: 'VN001-08924',
        dob: '15/08/2000',
        sex: 'Male',
        schemeCode: 'Academic',
        country: 'Vietnam',
        firstLanguage: 'Vietnamese',
        testDate: new Date().toLocaleDateString('en-GB'),
        centreNumber: 'VN001 - British Council Hanoi'
      };
      this.trfScores = { listening: 7.5, reading: 8.0, writing: 7.0, speaking: 7.5 };
    }
  }

  saveTrfProfileAndScores() {
    try {
      localStorage.setItem('ielts_trf_candidate_profile', JSON.stringify(this.candidateProfile));
      localStorage.setItem('ielts_trf_skill_scores', JSON.stringify(this.trfScores));
    } catch (e) {}
  }

  // Khởi tạo và render vào container
  render(containerId = 'mock-test-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (this.activeMockMode === 'TRF_CERTIFICATE') {
      this.renderTrfCertificateView();
    } else {
      if (this.examState === 'IDLE') {
        this.renderLobby();
      } else if (this.examState === 'TESTING') {
        if (this.activeSkill === 'LISTENING') {
          this.renderListeningExam();
        } else {
          this.renderReadingExam();
        }
      } else if (this.examState === 'SUBMITTED') {
        this.renderExamResults();
      }
    }
  }

  // Chuyển đổi giữa Phần A (Phòng thi) và Phần B (Chứng chỉ TRF)
  switchMockMode(mode) {
    this.activeMockMode = mode;
    if (window.soundSystem) window.soundSystem.playClick();
    this.render();
  }

  // Header Sub-tabs Navigation
  renderModeSubnavHtml() {
    return `
      <div class="mock-mode-subnav-bar">
        <button
          class="mock-subnav-btn ${this.activeMockMode === 'EXAM_ROOM' ? 'active' : ''}"
          onclick="window.mockTestApp.switchMockMode('EXAM_ROOM')"
        >
          <span>🎧 Phần A: Phòng Thi Thử Listening &amp; Reading</span>
        </button>
        <button
          class="mock-subnav-btn ${this.activeMockMode === 'TRF_CERTIFICATE' ? 'active' : ''}"
          onclick="window.mockTestApp.switchMockMode('TRF_CERTIFICATE')"
        >
          <span>🎓 Phần B: Bảng Điểm Tổng Hợp &amp; Cấp Chứng Chỉ TRF</span>
        </button>
      </div>
    `;
  }

  // ================= 1. GIAO DIỆN PHÒNG CHỜ (LOBBY - PHẦN A) =================
  renderLobby() {
    this.container.innerHTML = `
      <div class="mock-lobby-shell">
        <!-- HEADER ROYAL BANNER -->
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #B91C1C 0%, #7F1D1D 50%, #0F172A 100%); border-radius: var(--border-radius-lg); padding: 24px; color: #FFFFFF; box-shadow: var(--box-shadow); margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span style="background: #FEE2E2; color: #991B1B; font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: var(--border-radius-full); text-transform: uppercase;">Mô-đun #09 &bull; Cambridge Official Exam Engine</span>
                <span style="background: rgba(255,255,255,0.15); color: #FEF3C7; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: var(--border-radius-full);">🏆 Cấp Chứng Chỉ Kết Quả TRF</span>
              </div>
              <h2 style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 6px;">
                🏆 Phòng Thi Thử IELTS Chuẩn Khảo Thí &amp; Cấp Chứng Chỉ TRF
              </h2>
              <p style="font-size: 13px; color: #FECACA; margin: 0; max-width: 700px; line-height: 1.45;">
                Thi thử 40 câu hỏi Listening (30m nghe + 10m transfer) và Reading Split-Screen 60 phút. Tự động kiểm tra giới hạn từ, quy đổi Band 1-9 và cấp chứng chỉ Test Report Form quốc tế.
              </p>
            </div>

            <!-- CHUYỂN ĐỔI SUB-TABS PHẦN A / PHẦN B -->
            ${this.renderModeSubnavHtml()}
          </div>
        </div>

        <!-- 2 KHỐI CHỌN KỸ NĂNG THI (LISTENING vs READING) -->
        <div class="mock-skills-choice-grid">
          <!-- CARD LISTENING -->
          <div class="skill-choice-card card-listening">
            <div class="skill-icon-wrap" style="background: #EEF2FF; color: #4338CA;">
              <span>🎧</span>
            </div>
            <div class="skill-info-wrap">
              <span class="skill-badge" style="background: #E0E7FF; color: #3730A3;">Official Audio • 4 Sections</span>
              <h3 class="skill-name">IELTS Listening Simulation</h3>
              <p class="skill-desc">
                40 câu hỏi qua 4 Sections (Hội thoại đời sống, Chỉ dẫn bản đồ, Thảo luận học thuật, Bài giảng nghiên cứu). Bộ đếm 30 phút nghe + 10 phút chuyển đáp án. Trình phát Audio chỉ nghe 1 lần duy nhất chuẩn phòng thi.
              </p>
              <div class="skill-meta-tags">
                <span>⏱️ 40 Phút</span>
                <span>❓ 40 Câu Hỏi</span>
                <span>📏 Kiểm Tra Giới Hạn Từ</span>
              </div>
            </div>
            <button class="btn-start-exam-skill btn-start-listening" onclick="window.mockTestApp.startExam('LISTENING')">
              <span>Bắt Đầu Thi Listening</span>
              <span>➡️</span>
            </button>
          </div>

          <!-- CARD READING -->
          <div class="skill-choice-card card-reading">
            <div class="skill-icon-wrap" style="background: #FAF5FF; color: #6B21A8;">
              <span>📖</span>
            </div>
            <div class="skill-info-wrap">
              <span class="skill-badge" style="background: #F3E8FF; color: #581C87;">Split-screen • 3 Passages</span>
              <h3 class="skill-name">IELTS Reading Simulation</h3>
              <p class="skill-desc">
                Giao diện Split-screen: Bài đọc bên trái có bút tô sáng (Highlighter), 40 câu hỏi bên phải cùng đồng hồ đếm ngược 60 phút. Hỗ trợ cả 2 hệ thi Academic và General Training.
              </p>
              <!-- Chọn Track Academic hoặc General -->
              <div class="reading-track-toggle">
                <button
                  class="track-btn ${this.readingTrack === 'ACADEMIC' ? 'active' : ''}"
                  onclick="window.mockTestApp.setReadingTrack('ACADEMIC')"
                >
                  🎓 Academic Reading
                </button>
                <button
                  class="track-btn ${this.readingTrack === 'GENERAL' ? 'active' : ''}"
                  onclick="window.mockTestApp.setReadingTrack('GENERAL')"
                >
                  💼 General Training Reading
                </button>
              </div>
              <div class="skill-meta-tags">
                <span>⏱️ 60 Phút</span>
                <span>❓ 40 Câu Hỏi</span>
                <span>🖍️ Bút Tô Sáng Split-Screen</span>
              </div>
            </div>
            <button class="btn-start-exam-skill btn-start-reading" onclick="window.mockTestApp.startExam('READING')">
              <span>Bắt Đầu Thi Reading (${this.readingTrack === 'ACADEMIC' ? 'Academic' : 'General'})</span>
              <span>➡️</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  setReadingTrack(track) {
    this.readingTrack = track;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderLobby();
  }

  // Khởi động bài thi
  startExam(skill) {
    this.activeSkill = skill;
    this.examState = 'TESTING';
    this.userAnswers = {};
    this.gradingResult = null;
    this.isAudioPlayedOnce = false;
    this.isAudioPlaying = false;
    this.audioPlaybackTime = 0;

    if (skill === 'LISTENING') {
      this.currentListeningSection = 1;
      this.listeningTimerSeconds = 40 * 60; // 40 phút
      this.startTimer(() => {
        this.listeningTimerSeconds--;
        this.updateListeningTimerUi();
        if (this.listeningTimerSeconds <= 0) {
          this.submitExam(true);
        }
      });
    } else {
      this.currentReadingPassage = 1;
      this.readingTimerSeconds = 60 * 60; // 60 phút
      this.startTimer(() => {
        this.readingTimerSeconds--;
        this.updateReadingTimerUi();
        if (this.readingTimerSeconds <= 0) {
          this.submitExam(true);
        }
      });
    }

    if (window.soundSystem) window.soundSystem.playClick();
    this.render();
  }

  startTimer(callback) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(callback, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // ================= 2. GIAO DIỆN PHÒNG THI LISTENING =================
  renderListeningExam() {
    const examData = window.IELTS_LISTENING_EXAM_DATA;
    const currentSec = examData.sections.find(s => s.sectionNumber === this.currentListeningSection);
    const isTransferPhase = this.listeningTimerSeconds <= 10 * 60;

    this.container.innerHTML = `
      <div class="mock-exam-wrapper listening-room">
        <!-- TOP TOOLBAR -->
        <div class="mock-top-bar">
          <div class="exam-title-meta">
            <span class="badge-official">Cambridge Practice Test 1</span>
            <h2 class="exam-title">🎧 IELTS Listening Exam (40 Questions)</h2>
          </div>

          <!-- DUAL TIMER (30m NGHE + 10m TRANSFER) -->
          <div class="dual-timer-box">
            <div class="timer-phase-caption">
              ${isTransferPhase ? '✍️ 10 PHÚT CHUYỂN & KIỂM TRA ĐÁP ÁN' : '🎧 30 PHÚT NGHE BÀI THI'}
            </div>
            <div class="timer-display-digits ${isTransferPhase ? 'transfer-active' : ''}" id="listening-timer-digits">
              ${this.formatTime(this.listeningTimerSeconds)}
            </div>
          </div>

          <button class="btn-submit-exam" onclick="window.mockTestApp.confirmSubmitExam()">
            <span>Nộp Bài Chấm Điểm</span>
            <span>✅</span>
          </button>
        </div>

        <!-- AUDIO PLAYER BAR (ONE-TIME PLAYBACK ENFORCEMENT) -->
        <div class="audio-enforcement-bar">
          <div class="audio-icon-box">📻</div>
          <div class="audio-control-details">
            <div class="audio-track-title">
              Section ${this.currentListeningSection}: ${currentSec.title} (${currentSec.audioFilename})
            </div>
            <div class="audio-playback-note">
              ${this.isAudioPlayedOnce
                ? '⚠️ Chế độ thi chuẩn Cambridge: Audio chỉ được phát một lần duy nhất!'
                : 'Trình phát audio khảo thí: Bấm nút bên phải để bắt đầu phát băng nghe.'}
            </div>
          </div>
          <div class="audio-actions-wrap">
            <button
              class="btn-audio-play ${this.isAudioPlayedOnce ? 'disabled' : ''}"
              onclick="window.mockTestApp.toggleListeningAudio()"
              ${this.isAudioPlayedOnce && !this.isAudioPlaying ? 'disabled' : ''}
            >
              ${this.isAudioPlaying ? '⏸️ Tạm Dừng' : '▶️ Bắt Đầu Nghe Băng'}
            </button>
          </div>
        </div>

        <!-- SECTIONS TABS NAVIGATION -->
        <div class="exam-sections-tabs">
          ${examData.sections.map(sec => `
            <button
              class="sec-tab-btn ${sec.sectionNumber === this.currentListeningSection ? 'active' : ''}"
              onclick="window.mockTestApp.switchListeningSection(${sec.sectionNumber})"
            >
              <span>Section ${sec.sectionNumber}</span>
              <small>(Câu ${(sec.sectionNumber - 1) * 10 + 1} - ${sec.sectionNumber * 10})</small>
            </button>
          `).join('')}
        </div>

        <!-- CONTEXT DESCRIPTION BANNER -->
        <div class="section-context-banner">
          <strong>Bối cảnh Section ${currentSec.sectionNumber}:</strong> ${currentSec.contextDescription}
        </div>

        <!-- QUESTIONS LIST OF CURRENT SECTION -->
        <div class="questions-card-container">
          ${currentSec.questions.map(q => this.renderQuestionCard(q)).join('')}
        </div>

        <!-- BOTTOM NAVIGATION -->
        <div class="exam-bottom-nav">
          <button
            class="btn-prev-section"
            onclick="window.mockTestApp.switchListeningSection(${this.currentListeningSection - 1})"
            ${this.currentListeningSection === 1 ? 'disabled' : ''}
          >
            ⬅️ Section Trước
          </button>
          <button
            class="btn-next-section"
            onclick="window.mockTestApp.switchListeningSection(${this.currentListeningSection + 1})"
            ${this.currentListeningSection === 4 ? 'disabled' : ''}
          >
            Section Tiếp Theo ➡️
          </button>
        </div>
      </div>
    `;
  }

  updateListeningTimerUi() {
    const el = document.getElementById('listening-timer-digits');
    if (el) {
      el.textContent = this.formatTime(this.listeningTimerSeconds);
      if (this.listeningTimerSeconds <= 10 * 60) {
        el.classList.add('transfer-active');
      }
    }
  }

  switchListeningSection(secNum) {
    if (secNum < 1 || secNum > 4) return;
    this.currentListeningSection = secNum;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderListeningExam();
  }

  toggleListeningAudio() {
    if (this.isAudioPlaying) {
      this.isAudioPlaying = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    } else {
      this.isAudioPlaying = true;
      this.isAudioPlayedOnce = true;

      const examData = window.IELTS_LISTENING_EXAM_DATA;
      const currentSec = examData.sections.find(s => s.sectionNumber === this.currentListeningSection);

      if (typeof window !== 'undefined' && 'speechSynthesis' in window && currentSec) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentSec.fullTapescript.substring(0, 1500));
        utterance.lang = 'en-GB';
        utterance.rate = 0.95;
        utterance.onend = () => {
          this.isAudioPlaying = false;
          this.renderListeningExam();
        };
        window.speechSynthesis.speak(utterance);
      }
    }
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderListeningExam();
  }

  // ================= 3. GIAO DIỆN PHÒNG THI READING =================
  renderReadingExam() {
    const examData = this.readingTrack === 'ACADEMIC'
      ? window.IELTS_ACADEMIC_READING_EXAM_DATA
      : window.IELTS_GENERAL_READING_EXAM_DATA;

    const currentPassage = examData.passages.find(p => p.passageNumber === this.currentReadingPassage) || examData.passages[0];

    this.container.innerHTML = `
      <div class="mock-exam-wrapper reading-room">
        <!-- TOP TOOLBAR -->
        <div class="mock-top-bar">
          <div class="exam-title-meta">
            <span class="badge-official">
              ${this.readingTrack === 'ACADEMIC' ? 'Academic Reading' : 'General Training Reading'} &bull; 3 Passages
            </span>
            <h2 class="exam-title">📖 IELTS Reading Exam (60:00 Countdown)</h2>
          </div>

          <div class="dual-timer-box">
            <div class="timer-phase-caption">ĐỒNG HỒ ĐẾM NGƯỢC 60 PHÚT</div>
            <div class="timer-display-digits" id="reading-timer-digits">
              ${this.formatTime(this.readingTimerSeconds)}
            </div>
          </div>

          <button class="btn-submit-exam" onclick="window.mockTestApp.confirmSubmitExam()">
            <span>Nộp Bài Chấm Điểm</span>
            <span>✅</span>
          </button>
        </div>

        <div class="exam-sections-tabs">
          ${examData.passages.map(p => `
            <button
              class="sec-tab-btn ${p.passageNumber === this.currentReadingPassage ? 'active' : ''}"
              onclick="window.mockTestApp.switchReadingPassage(${p.passageNumber})"
            >
              <span>Passage ${p.passageNumber}</span>
              <small>${p.title.substring(0, 32)}...</small>
            </button>
          `).join('')}
        </div>

        <div class="reading-split-screen-grid">
          <div class="split-pane pane-passage">
            <div class="passage-highlighter-toolbar">
              <span class="hl-label">🖍️ Bút Tô Sáng:</span>
              <button class="hl-btn hl-yellow ${this.currentHighlightColor === 'yellow' ? 'active' : ''}" onclick="window.mockTestApp.setHighlighterColor('yellow')">Vàng</button>
              <button class="hl-btn hl-green ${this.currentHighlightColor === 'green' ? 'active' : ''}" onclick="window.mockTestApp.setHighlighterColor('green')">Xanh</button>
              <button class="hl-btn hl-orange ${this.currentHighlightColor === 'orange' ? 'active' : ''}" onclick="window.mockTestApp.setHighlighterColor('orange')">Cam</button>
              <button class="hl-btn hl-clear" onclick="window.mockTestApp.clearHighlights()">🧹 Xóa Tô Sáng</button>
              <span style="font-size: 11px; color: #64748B; margin-left: auto;">Bôi đen chữ trong bài đọc để tô màu</span>
            </div>

            <div class="passage-text-scrollable" id="passage-content-area" onmouseup="window.mockTestApp.handleTextSelection()">
              <div class="passage-header">
                <h3 class="passage-title">${currentPassage.title}</h3>
                <p class="passage-subtitle">${currentPassage.subtitle || ''}</p>
              </div>

              <div class="passage-body">
                ${currentPassage.paragraphs.map(para => `
                  <div class="passage-para-block" id="para-${para.label}">
                    <span class="para-label-tag">${para.label}</span>
                    <p class="para-text">${para.text}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="split-pane pane-questions">
            <div class="questions-header-bar">
              <span>📋 Câu hỏi Passage ${currentPassage.passageNumber} (${currentPassage.questions.length} câu)</span>
              <span class="questions-answered-badge">
                Đã trả lời: ${Object.keys(this.userAnswers).length} / 40
              </span>
            </div>

            <div class="questions-scrollable-list">
              ${currentPassage.questions.map(q => this.renderQuestionCard(q)).join('')}
            </div>
          </div>
        </div>

        <div class="exam-bottom-nav">
          <button
            class="btn-prev-section"
            onclick="window.mockTestApp.switchReadingPassage(${this.currentReadingPassage - 1})"
            ${this.currentReadingPassage === 1 ? 'disabled' : ''}
          >
            ⬅️ Passage Trước
          </button>
          <button
            class="btn-next-section"
            onclick="window.mockTestApp.switchReadingPassage(${this.currentReadingPassage + 1})"
            ${this.currentReadingPassage === 3 ? 'disabled' : ''}
          >
            Passage Tiếp Theo ➡️
          </button>
        </div>
      </div>
    `;
  }

  updateReadingTimerUi() {
    const el = document.getElementById('reading-timer-digits');
    if (el) {
      el.textContent = this.formatTime(this.readingTimerSeconds);
    }
  }

  switchReadingPassage(pNum) {
    if (pNum < 1 || pNum > 3) return;
    this.currentReadingPassage = pNum;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderReadingExam();
  }

  setHighlighterColor(color) {
    this.currentHighlightColor = color;
    if (window.soundSystem) window.soundSystem.playClick();
  }

  handleTextSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const parentContainer = document.getElementById('passage-content-area');
    if (!parentContainer || !parentContainer.contains(range.commonAncestorContainer)) return;

    const span = document.createElement('span');
    span.className = `hl-span hl-${this.currentHighlightColor}`;
    try {
      range.surroundContents(span);
    } catch (e) {}
    selection.removeAllRanges();
  }

  clearHighlights() {
    const container = document.getElementById('passage-content-area');
    if (!container) return;
    const spans = container.querySelectorAll('.hl-span');
    spans.forEach(s => {
      const parent = s.parentNode;
      while (s.firstChild) parent.insertBefore(s.firstChild, s);
      parent.removeChild(s);
    });
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // ================= 4. RENDER CÂU HỎI & BỘ ĐẾM GIỚI HẠN TỪ =================
  renderQuestionCard(q) {
    const currentVal = this.userAnswers[q.id] || '';
    const wordCount = currentVal.trim() ? currentVal.trim().split(/\s+/).filter(Boolean).length : 0;
    const maxWords = this.extractMaxWords(q.instruction);

    let wordLimitClass = 'limit-ok';
    let wordLimitText = `${wordCount} từ`;
    if (maxWords > 0) {
      wordLimitText = `${wordCount} / ${maxWords} từ`;
      if (wordCount > maxWords) {
        wordLimitClass = 'limit-exceeded';
        wordLimitText = `⚠️ ${wordCount} / ${maxWords} từ (VƯỢT QUÁ GIỚI HẠN!)`;
      }
    }

    return `
      <div class="question-card" id="qcard-${q.id}">
        <div class="q-header-row">
          <span class="q-num-badge">Câu ${q.id}</span>
          <span class="q-type-tag">${q.type.replace(/_/g, ' ')}</span>
          ${q.instruction ? `<span class="q-instruction-tag">📏 ${q.instruction}</span>` : ''}
        </div>

        <div class="q-prompt-text">${q.prompt}</div>

        <div class="q-input-area">
          ${this.renderQuestionInputControls(q, currentVal, wordLimitClass, wordLimitText)}
        </div>
      </div>
    `;
  }

  renderQuestionInputControls(q, currentVal, wordLimitClass, wordLimitText) {
    if (q.options && q.options.length) {
      return `
        <div class="q-options-list">
          ${q.options.map(opt => {
            const optLetter = opt.trim().substring(0, 1).toUpperCase();
            const isChecked = currentVal.toUpperCase() === optLetter;
            return `
              <label class="q-option-label ${isChecked ? 'selected' : ''}">
                <input
                  type="radio"
                  name="q-${q.id}"
                  value="${optLetter}"
                  ${isChecked ? 'checked' : ''}
                  onchange="window.mockTestApp.saveAnswer(${q.id}, this.value)"
                />
                <span class="opt-text">${opt}</span>
              </label>
            `;
          }).join('')}
        </div>
      `;
    }

    if (q.type === 'MATCHING_HEADINGS' && q.headingsList) {
      return `
        <div class="q-dropdown-wrap">
          <select
            class="q-select-heading"
            onchange="window.mockTestApp.saveAnswer(${q.id}, this.value)"
          >
            <option value="">-- Chọn tiêu đề La Mã phù hợp --</option>
            ${q.headingsList.map(h => {
              const val = h.romanNumeral || h.split('.')[0].trim();
              const isSelected = currentVal.toLowerCase() === val.toLowerCase();
              return `
                <option value="${val}" ${isSelected ? 'selected' : ''}>
                  ${h.romanNumeral ? `${h.romanNumeral}. ${h.text}` : h}
                </option>
              `;
            }).join('')}
          </select>
        </div>
      `;
    }

    if (q.type === 'TRUE_FALSE_NOT_GIVEN' || q.type === 'YES_NO_NOT_GIVEN') {
      const choices = q.type === 'TRUE_FALSE_NOT_GIVEN'
        ? ['TRUE', 'FALSE', 'NOT GIVEN']
        : ['YES', 'NO', 'NOT GIVEN'];
      return `
        <div class="q-binary-choices">
          ${choices.map(c => `
            <button
              type="button"
              class="btn-binary-choice ${currentVal.toUpperCase() === c ? 'active' : ''}"
              onclick="window.mockTestApp.saveAnswer(${q.id}, '${c}')"
            >
              ${c}
            </button>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="q-text-input-wrap">
        <input
          type="text"
          class="q-text-input"
          placeholder="Nhập đáp án của bạn..."
          value="${this.escapeHtml(currentVal)}"
          oninput="window.mockTestApp.handleTextInput(${q.id}, this.value)"
        />
        <div class="word-limit-live-badge ${wordLimitClass}">
          ${wordLimitText}
        </div>
      </div>
    `;
  }

  extractMaxWords(instruction) {
    if (!instruction) return 0;
    const upper = instruction.toUpperCase();
    if (upper.includes('NO MORE THAN ONE WORD')) return 1;
    if (upper.includes('NO MORE THAN TWO WORDS')) return 2;
    if (upper.includes('NO MORE THAN THREE WORDS')) return 3;
    if (upper.includes('A NUMBER ONLY')) return 1;
    return 0;
  }

  handleTextInput(qId, val) {
    this.saveAnswer(qId, val);
    const card = document.getElementById(`qcard-${qId}`);
    if (card) {
      const badge = card.querySelector('.word-limit-live-badge');
      const examData = this.activeSkill === 'LISTENING'
        ? window.IELTS_LISTENING_EXAM_DATA
        : (this.readingTrack === 'ACADEMIC' ? window.IELTS_ACADEMIC_READING_EXAM_DATA : window.IELTS_GENERAL_READING_EXAM_DATA);

      let question = null;
      if (this.activeSkill === 'LISTENING') {
        for (const sec of examData.sections) {
          question = sec.questions.find(q => q.id === qId);
          if (question) break;
        }
      } else {
        for (const pass of examData.passages) {
          question = pass.questions.find(q => q.id === qId);
          if (question) break;
        }
      }

      if (badge && question) {
        const words = val.trim() ? val.trim().split(/\s+/).filter(Boolean).length : 0;
        const maxWords = this.extractMaxWords(question.instruction);
        if (maxWords > 0) {
          if (words > maxWords) {
            badge.className = 'word-limit-live-badge limit-exceeded';
            badge.textContent = `⚠️ ${words} / ${maxWords} từ (VƯỢT QUÁ GIỚI HẠN!)`;
          } else {
            badge.className = 'word-limit-live-badge limit-ok';
            badge.textContent = `${words} / ${maxWords} từ`;
          }
        }
      }
    }
  }

  saveAnswer(qId, val) {
    this.userAnswers[qId] = val.trim();
  }

  confirmSubmitExam() {
    const answeredCount = Object.keys(this.userAnswers).length;
    const confirmMsg = `Bạn đã hoàn thành ${answeredCount} / 40 câu hỏi. Bạn có chắc chắn muốn nộp bài chấm điểm ngay không?`;
    if (confirm(confirmMsg)) {
      this.submitExam();
    }
  }

  // ================= 5. BỘ CHẤM ĐIỂM TỰ ĐỘNG CHUẨN CAMBRIDGE =================
  submitExam(isTimeOut = false) {
    this.stopTimer();
    this.examState = 'SUBMITTED';

    const examData = this.activeSkill === 'LISTENING'
      ? window.IELTS_LISTENING_EXAM_DATA
      : (this.readingTrack === 'ACADEMIC' ? window.IELTS_ACADEMIC_READING_EXAM_DATA : window.IELTS_GENERAL_READING_EXAM_DATA);

    this.gradingResult = this.gradeExam(this.activeSkill, this.readingTrack, this.userAnswers, examData);

    // Cập nhật điểm sang hồ sơ TRF nếu có điểm cao hơn
    if (this.activeSkill === 'LISTENING') {
      this.trfScores.listening = this.gradingResult.bandScore;
    } else {
      this.trfScores.reading = this.gradingResult.bandScore;
    }
    this.saveTrfProfileAndScores();

    // Thưởng Gamification
    if (window.gamification) {
      window.gamification.addExp(100);
      window.gamification.addCrowns(10);
    }
    if (window.soundSystem) window.soundSystem.playCorrect();

    this.render();
  }

  gradeExam(skill, readingTrack, userAnswers, examData) {
    let allQuestions = [];
    if (skill === 'LISTENING') {
      for (const sec of examData.sections) {
        allQuestions.push(...sec.questions);
      }
    } else {
      for (const pass of examData.passages) {
        allQuestions.push(...pass.questions);
      }
    }

    let correctCount = 0;
    const questionEvaluations = [];

    allQuestions.forEach(q => {
      const userAns = (userAnswers[q.id] || '').trim();
      const evalResult = this.checkCambridgeAnswer(userAns, q.correctPattern, q.instruction);

      if (evalResult.isCorrect) {
        correctCount++;
      }

      questionEvaluations.push({
        id: q.id,
        prompt: q.prompt,
        userAnswer: userAns || '(Bỏ trống)',
        correctPattern: q.correctPattern,
        instruction: q.instruction || '',
        isCorrect: evalResult.isCorrect,
        reason: evalResult.reason,
        tapescriptSnippet: q.tapescriptSnippet || q.contextQuote || ''
      });
    });

    const tableKey = skill === 'LISTENING'
      ? 'LISTENING'
      : (readingTrack === 'ACADEMIC' ? 'ACADEMIC_READING' : 'GENERAL_READING');

    const bandTable = window.IELTS_BAND_CONVERSION[tableKey];
    const match = bandTable.find(b => correctCount >= b.min && correctCount <= b.max) || bandTable[bandTable.length - 1];

    let readiness = {};
    if (correctCount >= 27) {
      readiness = {
        level: 'HIGH_READINESS',
        badge: '🟢 SẴN SÀNG CAO (HIGH EXAM READINESS)',
        badgeColor: '#15803D',
        badgeBg: '#DCFCE7',
        message: 'Khả năng cao bạn sẽ đạt điểm tốt (Band 6.5 - 9.0) trong điều kiện phòng thi thực tế của Hội đồng Anh (British Council) hoặc IDP! Hãy giữ vững phong độ và quản lý thời gian ổn định.'
      };
    } else if (correctCount >= 15) {
      readiness = {
        level: 'MODERATE_READINESS',
        badge: '🟡 ĐẠT NGƯỠNG CƠ BẢN (MODERATE READINESS)',
        badgeColor: '#B45309',
        badgeBg: '#FEF3C7',
        message: 'Có thể đạt mức điểm chấp nhận được ở một số trường hoặc diện định cư, nhưng điểm số này còn ở ranh giới mong manh. Hãy rèn luyện thêm kỹ năng bắt từ đồng nghĩa (Paraphrase) và kiểm soát số từ để bứt phá lên Band 6.5+.'
      };
    } else {
      readiness = {
        level: 'LOW_READINESS',
        badge: '🔴 CẦN ÔN LUYỆN THÊM (SIGNIFICANT IMPROVEMENT NEEDED)',
        badgeColor: '#B91C1C',
        badgeBg: '#FEE2E2',
        message: 'Khả năng cao bạn chưa đạt mức điểm chấp nhận được của kỳ thi IELTS. Cần củng cố ngữ pháp cơ bản, chính tả và rèn luyện kỹ năng nghe chép chính tả (Dictation) trước khi đăng ký thi thật.'
      };
    }

    return {
      skill,
      readingTrack,
      totalQuestions: 40,
      correctCount,
      bandScore: match.band,
      bandDesc: match.desc,
      readiness,
      questionEvaluations
    };
  }

  checkCambridgeAnswer(userAnswer, correctPattern, instruction) {
    if (!userAnswer) {
      return { isCorrect: false, reason: 'Chưa điền đáp án (Bỏ trống)' };
    }

    const normUser = this.normalizeCambridgeText(userAnswer);
    const maxWords = this.extractMaxWords(instruction);

    if (maxWords > 0) {
      const userWordCount = normUser.split(/\s+/).filter(Boolean).length;
      if (userWordCount > maxWords) {
        return {
          isCorrect: false,
          reason: `Phạm quy giới hạn từ: Đề yêu cầu tối đa ${maxWords} từ, bạn đã điền ${userWordCount} từ ("${userAnswer}")!`
        };
      }
    }

    const rawOptions = correctPattern.split(/\/\/|\//).map(s => s.trim());
    const expandedPatterns = [];
    rawOptions.forEach(opt => {
      expandedPatterns.push(opt);
      if (opt.includes('(') && opt.includes(')')) {
        const withOptional = opt.replace(/[()]/g, '');
        const withoutOptional = opt.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
        expandedPatterns.push(withOptional);
        if (withoutOptional) expandedPatterns.push(withoutOptional);
      }
    });

    for (const pat of expandedPatterns) {
      const normPat = this.normalizeCambridgeText(pat);

      if (normUser === normPat) {
        return { isCorrect: true, reason: 'Chính xác' };
      }

      if (this.isUsUkSpellingMatch(normUser, normPat)) {
        return { isCorrect: true, reason: 'Chính xác (Chấp nhận chính tả US/UK)' };
      }

      if (this.isNumberWordMatch(normUser, normPat)) {
        return { isCorrect: true, reason: 'Chính xác (Tương đương số/chữ số)' };
      }
    }

    return {
      isCorrect: false,
      reason: `Sai đáp án. Đáp án chấp nhận: "${correctPattern}"`
    };
  }

  normalizeCambridgeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[£$,.?!]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  isUsUkSpellingMatch(str1, str2) {
    const pairs = [
      ['centre', 'center'],
      ['theatre', 'theater'],
      ['colour', 'color'],
      ['flavour', 'flavor'],
      ['honour', 'honor'],
      ['neighbour', 'neighbor'],
      ['labour', 'labor'],
      ['programme', 'program'],
      ['travelling', 'traveling'],
      ['travelled', 'traveled'],
      ['dialogue', 'dialog'],
      ['organise', 'organize'],
      ['realise', 'realize'],
      ['analyse', 'analyze'],
      ['practise', 'practice'],
      ['defence', 'defense'],
      ['licence', 'license'],
      ['metre', 'meter'],
      ['litre', 'liter']
    ];

    for (const [uk, us] of pairs) {
      if ((str1.includes(uk) && str2.includes(us)) || (str1.includes(us) && str2.includes(uk))) {
        return true;
      }
    }
    return false;
  }

  isNumberWordMatch(s1, s2) {
    const numMap = {
      '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
      '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten'
    };
    for (const [digit, word] of Object.entries(numMap)) {
      if ((s1 === digit && s2 === word) || (s1 === word && s2 === digit)) {
        return true;
      }
    }
    return false;
  }

  // ================= 6. GIAO DIỆN KẾT QUẢ PHẦN A =================
  renderExamResults() {
    if (!this.gradingResult) return;
    const res = this.gradingResult;

    this.container.innerHTML = `
      <div class="mock-results-wrapper">
        ${this.renderModeSubnavHtml()}

        <div class="trf-certificate-card">
          <div class="trf-header-row">
            <div>
              <span class="trf-tag">IELTS OFFICIAL TEST REPORT FORM (SIMULATION)</span>
              <h2 class="trf-title">KẾT QUẢ KHẢO THÍ CHUẨN CAMBRIDGE</h2>
              <p class="trf-sub">Kỹ năng: <strong>${res.skill}</strong> ${res.readingTrack ? `(${res.readingTrack})` : ''} &bull; Ngày làm bài: ${new Date().toLocaleDateString('vi-VN')}</p>
            </div>
            <div class="trf-overall-score-box">
              <span class="trf-band-label">ESTIMATED BAND SCORE</span>
              <span class="trf-band-number">${res.bandScore.toFixed(1)}</span>
              <span class="trf-band-desc">${res.bandDesc}</span>
            </div>
          </div>

          <div class="trf-stats-grid">
            <div class="trf-stat-item">
              <span class="stat-lbl">Số Câu Đúng / 40:</span>
              <span class="stat-val" style="color: #15803D;">${res.correctCount} / 40</span>
            </div>
            <div class="trf-stat-item">
              <span class="stat-lbl">Độ Chính Xác:</span>
              <span class="stat-val" style="color: #0284C7;">${Math.round((res.correctCount / 40) * 100)}%</span>
            </div>
            <div class="trf-stat-item">
              <span class="stat-lbl">Phần Thưởng Tích Lũy:</span>
              <span class="stat-val" style="color: #D97706;">+100 EXP &bull; +10 👑</span>
            </div>
          </div>
        </div>

        <div class="readiness-assessment-card" style="border-left: 4px solid ${res.readiness.badgeColor}; background: ${res.readiness.badgeBg};">
          <div class="readiness-header">
            <span class="readiness-badge" style="color: ${res.readiness.badgeColor}; font-weight: 900;">
              ${res.readiness.badge}
            </span>
          </div>
          <p class="readiness-message" style="color: #1E293B;">
            ${res.readiness.message}
          </p>
        </div>

        <div class="results-review-section">
          <div class="review-section-header">
            <h3 class="review-title">📋 Bảng Chi Tiết Đáp Án &amp; Dẫn Chứng Khảo Thí (40 Câu)</h3>
            <button class="btn-return-lobby" onclick="window.mockTestApp.returnToLobby()">
              🔄 Quay Về Phòng Chờ Thi Thử
            </button>
          </div>

          <div class="review-questions-list">
            ${res.questionEvaluations.map(q => `
              <div class="review-question-row ${q.isCorrect ? 'row-correct' : 'row-incorrect'}">
                <div class="review-q-left">
                  <div class="review-q-badge-row">
                    <span class="rq-num">Câu ${q.id}</span>
                    <span class="rq-status ${q.isCorrect ? 'status-ok' : 'status-err'}">
                      ${q.isCorrect ? '✅ ĐÚNG (+1)' : '❌ SAI (0)'}
                    </span>
                    ${q.instruction ? `<span class="rq-inst">📏 ${q.instruction}</span>` : ''}
                  </div>
                  <div class="rq-prompt"><strong>Đề bài:</strong> ${q.prompt}</div>
                  <div class="rq-answers-diff">
                    <div><strong>Bài làm của bạn:</strong> <code class="${q.isCorrect ? 'code-correct' : 'code-wrong'}">${this.escapeHtml(q.userAnswer)}</code></div>
                    <div><strong>Đáp án chuẩn Cambridge:</strong> <code class="code-official">${this.escapeHtml(q.correctPattern)}</code></div>
                  </div>
                  ${!q.isCorrect ? `<div class="rq-reason-text">💡 <em>Lý do: ${q.reason}</em></div>` : ''}
                  ${q.tapescriptSnippet ? `
                    <div class="rq-evidence-box">
                      <strong>🔍 Dẫn chứng trong bài nghe/bài đọc:</strong>
                      <blockquote>"${this.escapeHtml(q.tapescriptSnippet)}"</blockquote>
                    </div>
                  ` : ''}
                </div>

                <div class="review-q-right">
                  <button
                    class="btn-ai-explain"
                    onclick="window.mockTestApp.explainWithAi(${q.id}, '${this.escapeText(q.prompt)}', '${this.escapeText(q.userAnswer)}', '${this.escapeText(q.correctPattern)}', '${this.escapeText(q.tapescriptSnippet)}')"
                  >
                    🤖 Victoria AI Giải Thích
                  </button>
                  <div id="ai-exp-box-${q.id}" class="ai-explanation-drawer" style="display: none;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  async explainWithAi(qId, prompt, userAns, correctAns, snippet) {
    const box = document.getElementById(`ai-exp-box-${qId}`);
    if (!box) return;

    box.style.display = 'block';
    box.innerHTML = `
      <div style="font-size: 11px; color: #64748B; font-style: italic; padding: 6px;">
        👩‍🏫 Giám khảo Victoria đang bóc tách bẫy và paraphrase...
      </div>
    `;

    try {
      if (window.aiService) {
        const explanation = await window.aiService.explainAnswer({
          skill: this.activeSkill,
          questionText: prompt,
          passageOrScript: snippet,
          studentAnswer: userAns,
          correctAnswer: correctAns
        });

        box.innerHTML = `
          <div class="ai-exp-content">
            <div style="font-weight: 800; color: #15803D; margin-bottom: 4px;">💡 Phân Tích Của AI Trợ Giảng:</div>
            <p style="margin: 0 0 6px 0; line-height: 1.4;">${explanation.detailedExplanation || 'Xem xét kỹ từ đồng nghĩa trong đoạn dẫn chứng.'}</p>
            ${explanation.trapAnalysis ? `<div style="color: #B45309;"><strong>⚠️ Cảnh báo bẫy:</strong> ${explanation.trapAnalysis}</div>` : ''}
          </div>
        `;
      } else {
        box.innerHTML = `
          <div class="ai-exp-content">
            <p style="margin: 0; line-height: 1.4;">Dẫn chứng đã chỉ rõ: "${snippet}". Thí sinh cần chú ý từ đồng nghĩa và giới hạn số từ theo quy định.</p>
          </div>
        `;
      }
    } catch (e) {
      box.innerHTML = `
        <div class="ai-exp-content">
          <p style="margin: 0; line-height: 1.4;">Dẫn chứng cốt lõi: "${snippet}". Hãy đối chiếu từ đồng nghĩa (paraphrase) để nhận diện đáp án chuẩn.</p>
        </div>
      `;
    }
  }

  returnToLobby() {
    this.examState = 'IDLE';
    this.userAnswers = {};
    this.gradingResult = null;
    this.stopTimer();
    if (window.soundSystem) window.soundSystem.playClick();
    this.render();
  }

  // =========================================================================
  // 7. GIAO DIỆN PHẦN B: BẢNG ĐIỂM TỔNG HỢP & CẤP CHỨNG CHỈ TRF
  // =========================================================================
  renderTrfCertificateView() {
    const prof = this.candidateProfile;
    const scores = this.trfScores;

    // Tính điểm Overall theo công thức chuẩn Cambridge
    const overallBand = window.calculateIeltsOverallBand(scores.listening, scores.reading, scores.writing, scores.speaking);

    // Lấy mô tả năng lực tương ứng
    const descInfo = window.IELTS_BAND_COMPETENCY_DESCRIPTIONS[overallBand] || window.IELTS_BAND_COMPETENCY_DESCRIPTIONS[6.5];

    // Tạo mã TRF giả lập chuẩn quốc tế
    const trfNumber = `24VN00${prof.candidateId.replace(/\D/g, '').substring(0, 4)}AN001A`;

    this.container.innerHTML = `
      <div class="trf-view-shell">
        <!-- TOP BANNER -->
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #4338CA 100%); border-radius: var(--border-radius-lg); padding: 22px 24px; color: #FFFFFF; box-shadow: var(--box-shadow); margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="background: #E0E7FF; color: #3730A3; font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: var(--border-radius-full); text-transform: uppercase;">Mô-đun #09 &bull; Phần B</span>
                <span style="background: rgba(255,255,255,0.15); color: #FEF3C7; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: var(--border-radius-full);">🎓 Official Test Report Form</span>
              </div>
              <h2 style="font-size: 22px; font-weight: 900; letter-spacing: -0.5px; margin: 0;">
                Bảng Điểm Tổng Hợp &amp; Cấp Chứng Chỉ IELTS TRF
              </h2>
              <p style="font-size: 13px; color: #C7D2FE; margin: 4px 0 0 0;">
                Hệ thống tính điểm Overall Band Score 4 kỹ năng (Làm tròn chuẩn Cambridge .25 &bull; .75), in dấu mộc đỏ xác thực và xuất file chất lượng cao.
              </p>
            </div>

            <!-- CHUYỂN ĐỔI SUB-TABS -->
            ${this.renderModeSubnavHtml()}
          </div>
        </div>

        <!-- BỐ CỤC 2 CỘT: FORM NHẬP THÔNG TIN (TRÁI 4 FR) & BẢN XEM TRƯỚC CHỨNG CHỈ (PHẢI 8 FR) -->
        <div class="trf-workspace-grid">
          <!-- CỘT TRÁI: FORM CHỈNH SỬA THÔNG TIN & ĐIỂM SỐ -->
          <div class="trf-editor-card">
            <h3 class="trf-editor-title">📝 Thông Tin Thí Sinh &amp; 4 Kỹ Năng</h3>

            <!-- 4 KỸ NĂNG SCORES SLIDERS / SELECTORS -->
            <div class="trf-scores-input-group">
              <div class="score-input-header">
                <span style="font-size: 12px; font-weight: 800; color: #0F172A;">ĐIỂM 4 KỸ NĂNG (1.0 - 9.0)</span>
                <button class="btn-sync-scores" onclick="window.mockTestApp.syncScoresFromRecentExams()" title="Lấy điểm từ các bài thi gần nhất">
                  🔄 Đồng Bộ Điểm Thi
                </button>
              </div>

              <div class="score-slider-row">
                <label>🎧 Listening:</label>
                <input
                  type="range" min="1.0" max="9.0" step="0.5"
                  value="${scores.listening}"
                  oninput="window.mockTestApp.updateTrfScore('listening', this.value)"
                />
                <span class="score-num-pill">${scores.listening.toFixed(1)}</span>
              </div>

              <div class="score-slider-row">
                <label>📖 Reading:</label>
                <input
                  type="range" min="1.0" max="9.0" step="0.5"
                  value="${scores.reading}"
                  oninput="window.mockTestApp.updateTrfScore('reading', this.value)"
                />
                <span class="score-num-pill">${scores.reading.toFixed(1)}</span>
              </div>

              <div class="score-slider-row">
                <label>✍️ Writing:</label>
                <input
                  type="range" min="1.0" max="9.0" step="0.5"
                  value="${scores.writing}"
                  oninput="window.mockTestApp.updateTrfScore('writing', this.value)"
                />
                <span class="score-num-pill">${scores.writing.toFixed(1)}</span>
              </div>

              <div class="score-slider-row">
                <label>🎤 Speaking:</label>
                <input
                  type="range" min="1.0" max="9.0" step="0.5"
                  value="${scores.speaking}"
                  oninput="window.mockTestApp.updateTrfScore('speaking', this.value)"
                />
                <span class="score-num-pill">${scores.speaking.toFixed(1)}</span>
              </div>

              <!-- TỔNG KẾT OVERALL PREVIEW -->
              <div class="overall-calc-preview-box">
                <div class="calc-label">Điểm Trung Bình Cộng:</div>
                <div class="calc-raw">${((scores.listening + scores.reading + scores.writing + scores.speaking) / 4).toFixed(3)}</div>
                <div class="calc-arrow">➡️</div>
                <div class="calc-rounded">Overall Band: <strong>${overallBand.toFixed(1)}</strong></div>
                <div class="calc-cefr">(${descInfo.cefr})</div>
              </div>
            </div>

            <!-- THÔNG TIN CÁ NHÂN IN LÊN TRF -->
            <div class="candidate-info-inputs">
              <div class="field-wrap">
                <label>Họ và Tên Thí Sinh (In Hoa):</label>
                <input
                  type="text"
                  value="${this.escapeHtml(prof.fullName)}"
                  oninput="window.mockTestApp.updateCandidateField('fullName', this.value.toUpperCase())"
                />
              </div>

              <div class="field-row-2col">
                <div class="field-wrap">
                  <label>Số Thẻ / ID Number:</label>
                  <input
                    type="text"
                    value="${this.escapeHtml(prof.candidateId)}"
                    oninput="window.mockTestApp.updateCandidateField('candidateId', this.value)"
                  />
                </div>
                <div class="field-wrap">
                  <label>Ngày Sinh (DD/MM/YYYY):</label>
                  <input
                    type="text"
                    value="${this.escapeHtml(prof.dob)}"
                    oninput="window.mockTestApp.updateCandidateField('dob', this.value)"
                  />
                </div>
              </div>

              <div class="field-row-2col">
                <div class="field-wrap">
                  <label>Giới Tính:</label>
                  <select onchange="window.mockTestApp.updateCandidateField('sex', this.value)">
                    <option value="Male" ${prof.sex === 'Male' ? 'selected' : ''}>Male (Nam)</option>
                    <option value="Female" ${prof.sex === 'Female' ? 'selected' : ''}>Female (Nữ)</option>
                  </select>
                </div>
                <div class="field-wrap">
                  <label>Hệ Thi (Scheme):</label>
                  <select onchange="window.mockTestApp.updateCandidateField('schemeCode', this.value)">
                    <option value="Academic" ${prof.schemeCode === 'Academic' ? 'selected' : ''}>Academic (Đại học/Sau đại học)</option>
                    <option value="General Training" ${prof.schemeCode === 'General Training' ? 'selected' : ''}>General Training (Đào tạo/Định cư)</option>
                  </select>
                </div>
              </div>

              <div class="field-row-2col">
                <div class="field-wrap">
                  <label>Quốc Tịch (Origin):</label>
                  <input
                    type="text"
                    value="${this.escapeHtml(prof.country)}"
                    oninput="window.mockTestApp.updateCandidateField('country', this.value)"
                  />
                </div>
                <div class="field-wrap">
                  <label>Ngôn Ngữ Mẹ Đẻ:</label>
                  <input
                    type="text"
                    value="${this.escapeHtml(prof.firstLanguage)}"
                    oninput="window.mockTestApp.updateCandidateField('firstLanguage', this.value)"
                  />
                </div>
              </div>

              <div class="field-wrap">
                <label>Trung Tâm Khảo Thí (Test Centre):</label>
                <input
                  type="text"
                  value="${this.escapeHtml(prof.centreNumber)}"
                  oninput="window.mockTestApp.updateCandidateField('centreNumber', this.value)"
                />
              </div>
            </div>

            <!-- BUTTONS: SAVE & SYNC GAMIFICATION -->
            <div class="trf-actions-group">
              <button class="btn-save-sync-hud" onclick="window.mockTestApp.saveAndSyncToGamificationHUD()">
                <span>💾 Cập Nhật Vào Hồ Sơ &amp; Gamification HUD</span>
              </button>
            </div>
          </div>

          <!-- CỘT PHẢI: BẢN XEM TRƯỚC CHỨNG CHỈ CHUẨN KHẢO THÍ (OFFICIAL PREVIEW) -->
          <div class="trf-preview-card">
            <!-- TOOLBAR DOWNLOAD & PRINT -->
            <div class="trf-preview-toolbar">
              <span class="preview-caption">👁️ Bản Xem Trước Chứng Chỉ TRF Chuẩn Quốc Tế</span>
              <div class="preview-actions">
                <button class="btn-cert-download" onclick="window.mockTestApp.downloadCertificateImage()" title="Tải file ảnh PNG sắc nét">
                  <span>📥 Tải Ảnh PNG</span>
                </button>
                <button class="btn-cert-print" onclick="window.mockTestApp.printCertificate()" title="In chứng chỉ ra giấy hoặc lưu PDF">
                  <span>🖨️ In / Lưu PDF</span>
                </button>
              </div>
            </div>

            <!-- THE OFFICIAL TEST REPORT FORM (PRINTABLE AREA) -->
            <div class="official-trf-document" id="printable-trf-document">
              <!-- WATERMARK SECURITY PATTERN -->
              <div class="trf-security-watermark">IELTS</div>

              <!-- LOGOS HEADER BAR -->
              <div class="trf-official-logos-header">
                <div class="logo-ielts-brand">
                  <span class="ielts-box-red">IELTS</span>
                  <span class="ielts-sub-text">TM</span>
                </div>

                <div class="partner-logos-wrap">
                  <div class="logo-partner logo-bc">
                    <span class="bc-dots">••••</span>
                    <span class="partner-name">BRITISH COUNCIL</span>
                  </div>
                  <div class="logo-partner logo-idp">
                    <span class="idp-badge">idp</span>
                    <span class="partner-name">IELTS AUSTRALIA</span>
                  </div>
                  <div class="logo-partner logo-cambridge">
                    <span class="partner-name">Cambridge Assessment</span>
                    <small>English</small>
                  </div>
                </div>
              </div>

              <!-- DOCUMENT TITLE -->
              <div class="trf-title-band">
                <h1>Test Report Form</h1>
                <div class="trf-scheme-display">${prof.schemeCode.toUpperCase()}</div>
              </div>

              <!-- CANDIDATE DETAILS GRID -->
              <div class="trf-details-table-wrap">
                <table class="trf-candidate-table">
                  <tbody>
                    <tr>
                      <td class="lbl">Candidate Name:</td>
                      <td class="val-name" colspan="3">${prof.fullName}</td>
                      <td rowspan="4" class="val-photo-cell">
                        <div class="candidate-photo-box">
                          <div class="photo-silhouette">👤</div>
                          <span class="photo-caption">AUTHENTICATED<br>PHOTO</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="lbl">Candidate Number:</td>
                      <td class="val">${prof.candidateId}</td>
                      <td class="lbl">Centre Number:</td>
                      <td class="val">${prof.centreNumber.split('-')[0].trim()}</td>
                    </tr>
                    <tr>
                      <td class="lbl">Date of Birth:</td>
                      <td class="val">${prof.dob}</td>
                      <td class="lbl">Sex (M/F):</td>
                      <td class="val">${prof.sex.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td class="lbl">Country of Origin:</td>
                      <td class="val">${prof.country}</td>
                      <td class="lbl">First Language:</td>
                      <td class="val">${prof.firstLanguage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- TEST RESULTS GRID -->
              <div class="trf-results-section">
                <div class="section-micro-title">Test Results</div>
                <table class="trf-scores-table">
                  <thead>
                    <tr>
                      <th>Listening</th>
                      <th>Reading</th>
                      <th>Writing</th>
                      <th>Speaking</th>
                      <th class="th-overall">Overall Band Score</th>
                      <th class="th-cefr">CEFR Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="score-cell">${scores.listening.toFixed(1)}</td>
                      <td class="score-cell">${scores.reading.toFixed(1)}</td>
                      <td class="score-cell">${scores.writing.toFixed(1)}</td>
                      <td class="score-cell">${scores.speaking.toFixed(1)}</td>
                      <td class="score-cell cell-overall">
                        <span class="overall-number">${overallBand.toFixed(1)}</span>
                      </td>
                      <td class="score-cell cell-cefr">
                        <span class="cefr-badge">${descInfo.cefr}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- BAND COMPETENCY DESCRIPTOR & ACCEPTANCE NOTE -->
              <div class="trf-competency-card">
                <div class="comp-title-row">
                  <span class="comp-level-badge">${descInfo.title}</span>
                  <span class="comp-cefr-tag">CEFR Framework: Level ${descInfo.cefr}</span>
                </div>
                <p class="comp-desc-en">"${descInfo.descEn}"</p>
                <p class="comp-desc-vi">🇻🇳 ${descInfo.descVi}</p>
                <div class="comp-acceptance-note">
                  ${descInfo.acceptanceNote}
                </div>
              </div>

              <!-- OFFICIAL VERIFICATION FOOTER & RED INK STAMP -->
              <div class="trf-footer-verification">
                <div class="verification-meta">
                  <div class="meta-item">
                    <span class="m-lbl">Administrator Signature:</span>
                    <span class="m-sig">Victoria Examiner</span>
                  </div>
                  <div class="meta-item">
                    <span class="m-lbl">Date of Issue:</span>
                    <span class="m-val">${prof.testDate}</span>
                  </div>
                  <div class="meta-item">
                    <span class="m-lbl">Validation TRF Number:</span>
                    <span class="m-val trf-num-code">${trfNumber}</span>
                  </div>
                </div>

                <!-- DẤU MỘC ĐỎ CHUẨN KHẢO THÍ CAMBRIDGE (ROTATED SEAL) -->
                <div class="official-red-seal-stamp">
                  <div class="seal-inner-circle">
                    <div class="seal-curve-top">CAMBRIDGE ASSESSMENT</div>
                    <div class="seal-stars">★ ★ ★</div>
                    <div class="seal-center-text">
                      <span>OFFICIAL</span>
                      <strong>VERIFIED</strong>
                      <span>EXAM</span>
                    </div>
                    <div class="seal-curve-bottom">IELTS VALIDATED TRF</div>
                  </div>
                </div>
              </div>

              <!-- MICRO SECURITY PRINT FOOTER -->
              <div class="trf-microprint-bottom">
                The validity of this IELTS Test Report Form can be verified online by recognizing organizations at https://ielts.ucles.org.uk
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  updateCandidateField(field, value) {
    this.candidateProfile[field] = value;
    this.saveTrfProfileAndScores();
    this.renderTrfCertificateView();
  }

  updateTrfScore(skill, value) {
    this.trfScores[skill] = parseFloat(value) || 0;
    this.saveTrfProfileAndScores();
    this.renderTrfCertificateView();
  }

  // Đồng bộ điểm từ các bài thi vừa hoàn thành
  syncScoresFromRecentExams() {
    let synced = false;
    if (this.gradingResult) {
      if (this.gradingResult.skill === 'LISTENING') {
        this.trfScores.listening = this.gradingResult.bandScore;
        synced = true;
      } else {
        this.trfScores.reading = this.gradingResult.bandScore;
        synced = true;
      }
    }

    if (synced) {
      this.saveTrfProfileAndScores();
      if (window.soundSystem) window.soundSystem.playCorrect();
      alert('Đã đồng bộ kết quả từ bài thi vừa hoàn thành vào chứng chỉ TRF!');
    } else {
      alert('Chưa có bài thi Listening/Reading mới hoàn thành trong phiên này. Bạn có thể kéo thanh trượt để điều chỉnh điểm thủ công.');
    }
    this.renderTrfCertificateView();
  }

  // Lưu điểm và đồng bộ sang Header Gamification HUD
  saveAndSyncToGamificationHUD() {
    const overall = window.calculateIeltsOverallBand(
      this.trfScores.listening,
      this.trfScores.reading,
      this.trfScores.writing,
      this.trfScores.speaking
    );

    this.saveTrfProfileAndScores();

    if (window.gamification) {
      // Cập nhật Band điểm ước tính lên Header HUD
      window.gamification.setBandScore(overall);
      window.gamification.addExp(50);
      window.gamification.addCrowns(5);
    }

    if (window.soundSystem) window.soundSystem.playCrown();
    if (window.mascot) {
      window.mascot.say(`🎉 Chứng chỉ TRF đã được cập nhật! Điểm Overall Band Score của bạn là <strong>Band ${overall.toFixed(1)}</strong> (+50 EXP, +5 👑)!`, 4000);
    }

    alert(`Đã lưu hồ sơ chứng chỉ TRF! Điểm Overall Band ${overall.toFixed(1)} đã được đồng bộ lên Thanh Gamification Header.`);
    this.renderTrfCertificateView();
  }

  // In hoặc Lưu PDF
  printCertificate() {
    if (window.soundSystem) window.soundSystem.playClick();
    window.print();
  }

  // Tải hình ảnh PNG chứng chỉ chất lượng cao qua HTML5 Canvas
  downloadCertificateImage() {
    const prof = this.candidateProfile;
    const scores = this.trfScores;
    const overallBand = window.calculateIeltsOverallBand(scores.listening, scores.reading, scores.writing, scores.speaking);
    const descInfo = window.IELTS_BAND_COMPETENCY_DESCRIPTIONS[overallBand] || window.IELTS_BAND_COMPETENCY_DESCRIPTIONS[6.5];
    const trfNumber = `24VN00${prof.candidateId.replace(/\D/g, '').substring(0, 4)}AN001A`;

    // Khởi tạo Canvas độ phân giải cao 1200x820
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 820;
    const ctx = canvas.getContext('2d');

    // 1. Nền giấy parchment chứng chỉ
    ctx.fillStyle = '#FFFEFA';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Viền hoa văn bảo mật kép
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, canvas.width - 52, canvas.height - 52);

    // 3. Watermark nền mờ
    ctx.save();
    ctx.font = 'bold 140px Arial, sans-serif';
    ctx.fillStyle = 'rgba(226, 232, 240, 0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('IELTS', canvas.width / 2, canvas.height / 2 + 30);
    ctx.restore();

    // 4. Logo IELTS đỏ góc trên
    ctx.fillStyle = '#E11D48';
    ctx.fillRect(50, 45, 120, 44);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillText('IELTS', 70, 78);

    // Logo Đối tác khảo thí (British Council, IDP, Cambridge)
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('BRITISH COUNCIL  •  IDP IELTS AUSTRALIA  •  CAMBRIDGE ASSESSMENT ENGLISH', canvas.width - 50, 72);

    // 5. Tiêu đề TRF
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 26px "Times New Roman", Georgia, serif';
    ctx.fillText('INTERNATIONAL ENGLISH LANGUAGE TESTING SYSTEM', 50, 135);

    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillStyle = '#B91C1C';
    ctx.fillText(`TEST REPORT FORM - ${prof.schemeCode.toUpperCase()}`, 50, 165);

    // 6. Bảng thông tin thí sinh
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 185, 1100, 150);

    ctx.fillStyle = '#1E293B';
    ctx.font = '14px Arial, sans-serif';

    // Dòng 1
    ctx.fillText(`Candidate Name:  `, 65, 215);
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText(prof.fullName, 210, 215);

    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Candidate Number: `, 650, 215);
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(prof.candidateId, 800, 215);

    // Dòng 2
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Date of Birth: `, 65, 255);
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(prof.dob, 210, 255);

    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Sex (M/F): `, 420, 255);
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(prof.sex.toUpperCase(), 510, 255);

    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Scheme Code: `, 650, 255);
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(prof.schemeCode, 800, 255);

    // Dòng 3
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Country of Origin: `, 65, 295);
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(prof.country, 210, 295);

    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`First Language: `, 420, 295);
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(prof.firstLanguage, 540, 295);

    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Test Centre: `, 650, 295);
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(prof.centreNumber, 750, 295);

    // Khung ảnh thẻ bên phải
    ctx.strokeRect(980, 195, 150, 130);
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(981, 196, 148, 128);
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 11px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AUTHENTICATED', 1055, 255);
    ctx.fillText('PHOTO', 1055, 275);

    // 7. Bảng điểm 4 kỹ năng & Overall
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('Test Results', 50, 365);

    // Header bảng điểm
    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(50, 380, 1100, 40);
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(50, 380, 1100, 100);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Listening', 140, 405);
    ctx.fillText('Reading', 320, 405);
    ctx.fillText('Writing', 500, 405);
    ctx.fillText('Speaking', 680, 405);
    ctx.fillText('Overall Band Score', 880, 405);
    ctx.fillText('CEFR Level', 1070, 405);

    // Đường kẻ dọc
    [230, 410, 590, 770, 990].forEach(x => {
      ctx.beginPath();
      ctx.moveTo(x, 380);
      ctx.lineTo(x, 480);
      ctx.stroke();
    });

    // Giá trị điểm
    ctx.font = 'bold 22px Consolas, monospace';
    ctx.fillText(scores.listening.toFixed(1), 140, 455);
    ctx.fillText(scores.reading.toFixed(1), 320, 455);
    ctx.fillText(scores.writing.toFixed(1), 500, 455);
    ctx.fillText(scores.speaking.toFixed(1), 680, 455);

    ctx.fillStyle = '#B91C1C';
    ctx.font = 'bold 30px Consolas, monospace';
    ctx.fillText(overallBand.toFixed(1), 880, 460);

    ctx.fillStyle = '#4338CA';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText(descInfo.cefr, 1070, 458);

    // 8. Đánh giá năng lực Cambridge
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.fillText(`Competency Descriptor (${descInfo.title}):`, 50, 510);
    ctx.font = 'italic 12px Arial, sans-serif';
    ctx.fillText(`"${descInfo.descEn}"`, 50, 532);
    ctx.fillText(`🇻🇳 ${descInfo.descVi}`, 50, 552);

    ctx.font = '11px Arial, sans-serif';
    ctx.fillStyle = '#B45309';
    ctx.fillText(descInfo.acceptanceNote, 50, 574);

    // 9. Dấu mộc đỏ chuẩn khảo thí Cambridge (Rotated Seal)
    ctx.save();
    ctx.translate(920, 680);
    ctx.rotate(-12 * Math.PI / 180);

    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 75, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 68, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#DC2626';
    ctx.font = 'bold 10px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CAMBRIDGE ASSESSMENT', 0, -42);
    ctx.fillText('★ OFFICIAL TRF ★', 0, -18);
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('VERIFIED', 0, 8);
    ctx.font = 'bold 9px Arial, sans-serif';
    ctx.fillText('EXAM VALIDATION', 0, 26);
    ctx.fillText('IELTS AUSTRALIA & BC', 0, 48);

    ctx.restore();

    // 10. Chữ ký Giám đốc & Mã TRF
    ctx.fillStyle = '#0F172A';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('Administrator Signature: Victoria Examiner (Cambridge Senior)', 50, 630);
    ctx.fillText(`Date of Issue: ${prof.testDate}`, 50, 655);
    ctx.font = 'bold 13px Consolas, monospace';
    ctx.fillText(`Validation TRF Number: ${trfNumber}`, 50, 685);

    // Microprint footer
    ctx.font = '10px Arial, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('The validity of this IELTS Test Report Form can be verified online at https://ielts.ucles.org.uk', 50, 780);

    // Kích hoạt tải ảnh về máy
    const safeName = prof.fullName.replace(/\s+/g, '_');
    const link = document.createElement('a');
    link.download = `IELTS_TRF_Certificate_${safeName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (window.soundSystem) window.soundSystem.playCorrect();
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  escapeText(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Khởi tạo Singleton
window.mockTestApp = new IeltsMockTestApp();
