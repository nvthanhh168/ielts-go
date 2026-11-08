/**
 * IELTS GO! - Game Đoán Từ Phản Xạ (Speed Vocab Quiz & Combo System - Chế Độ 3)
 * 3 Hình thức câu hỏi:
 * 1. Nhìn hình SVG & Định nghĩa học thuật -> Chọn từ đúng
 * 2. Nghe âm thanh (Web Speech Audio) -> Chọn từ đúng
 * 3. Điền Collocation vào chỗ trống câu IELTS
 * Tích hợp đồng hồ đếm ngược từng câu, hệ số nhân Combo (x2, x3...) và thưởng EXP / Crowns
 */

class IeltsGuessGameApp {
  constructor() {
    this.container = null;
    this.gameState = 'LOBBY'; // 'LOBBY', 'PLAYING', 'GAME_OVER'
    this.selectedTopic = 'all';
    this.selectedBand = 'all';
    this.questionCount = 10;
    this.timerSeconds = 15;

    // Tiến trình trận đấu
    this.questions = [];
    this.currentIndex = 0;
    this.currentTimer = 15;
    this.timerInterval = null;
    this.isAnswerLocked = false;

    // Điểm số & Combo
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.earnedExp = 0;
    this.earnedCrowns = 0;
    this.reviewItems = []; // Danh sách các câu làm sai để ôn tập
  }

  // Khởi tạo và render vào container
  render(containerId = 'guess-game-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (this.gameState === 'LOBBY') {
      this.renderLobby();
    } else if (this.gameState === 'PLAYING') {
      this.renderQuestion();
    } else if (this.gameState === 'GAME_OVER') {
      this.renderGameOver();
    }
  }

  // 1. GIAO DIỆN PHÒNG CHỜ (LOBBY SETUP)
  renderLobby() {
    if (!this.container || !window.vocabDb) return;

    const topics = window.vocabDb.getTopics();

    this.container.innerHTML = `
      <div class="guess-game-wrapper">
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #BE123C 0%, #0F172A 100%); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-size: 11px; font-weight: 800; color: #FECDD3; text-transform: uppercase; letter-spacing: 0.5px;">Mô-đun #03 • Speed Vocab Arena</span>
              <h2 style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 4px 0 6px 0;">🎮 Game Đoán Từ Phản Xạ &amp; Combo</h2>
              <p style="font-size: 13px; color: #FFE4E6; margin: 0;">Thử thách tốc độ nhận diện từ vựng, nghe phát âm và ghép Collocations với chuỗi Combo nhân đôi EXP!</p>
            </div>
            <div class="gg-badge-pill">
              <span>⚡ Đếm ngược 15s/câu</span>
            </div>
          </div>
        </div>

        <div class="gg-setup-card">
          <div class="gg-setup-header">
            <span class="gg-setup-icon">⚙️</span>
            <div>
              <h3 style="font-size: 16px; font-weight: 900; color: #1E293B; margin: 0;">Cấu Hình Trận Đấu Phản Xạ</h3>
              <p style="font-size: 12px; color: #64748B; margin: 2px 0 0 0;">Chọn chủ đề và mức độ để hệ thống tự động sinh 3 dạng câu hỏi ngẫu nhiên</p>
            </div>
          </div>

          <div class="gg-setup-grid">
            <div class="gg-setup-field">
              <label for="gg-topic-select"><span>📚</span> Chủ Điểm (20 Topics):</label>
              <select id="gg-topic-select" class="fc-select" onchange="window.guessGameApp.selectedTopic = this.value">
                <option value="all">🌟 Ngẫu nhiên toàn bộ 20 Chủ điểm</option>
                ${topics
                  .map(
                    (t) =>
                      `<option value="${t.id}" ${this.selectedTopic === t.id ? 'selected' : ''}>${t.icon} ${t.name}</option>`
                  )
                  .join('')}
              </select>
            </div>

            <div class="gg-setup-field">
              <label for="gg-band-select"><span>🎖️</span> Cấp Độ Band Điểm:</label>
              <select id="gg-band-select" class="fc-select" onchange="window.guessGameApp.selectedBand = this.value">
                <option value="all" ${this.selectedBand === 'all' ? 'selected' : ''}>🎯 Mọi mốc Band (4.5 - 7.5+)</option>
                <option value="4.5 - 6.0" ${this.selectedBand === '4.5 - 6.0' ? 'selected' : ''}>🥉 Band 4.5 - 6.0 (Intermediate)</option>
                <option value="6.0 - 7.5" ${this.selectedBand === '6.0 - 7.5' ? 'selected' : ''}>🥇 Band 6.0 - 7.5 (Du Học)</option>
                <option value="7.5+" ${this.selectedBand === '7.5+' ? 'selected' : ''}>👑 Band 7.5+ (Master)</option>
              </select>
            </div>

            <div class="gg-setup-field">
              <label for="gg-count-select"><span>📝</span> Số Lượng Câu Hỏi:</label>
              <select id="gg-count-select" class="fc-select" onchange="window.guessGameApp.questionCount = parseInt(this.value)">
                <option value="10" ${this.questionCount === 10 ? 'selected' : ''}>10 Câu (Tiêu chuẩn)</option>
                <option value="15" ${this.questionCount === 15 ? 'selected' : ''}>15 Câu (Bền bỉ)</option>
                <option value="20" ${this.questionCount === 20 ? 'selected' : ''}>20 Câu (Thử thách cao cấp)</option>
              </select>
            </div>

            <div class="gg-setup-field">
              <label for="gg-time-select"><span>⏱️</span> Thời Gian Mỗi Câu:</label>
              <select id="gg-time-select" class="fc-select" onchange="window.guessGameApp.timerSeconds = parseInt(this.value)">
                <option value="15" ${this.timerSeconds === 15 ? 'selected' : ''}>15 Giây (Chuẩn tốc độ)</option>
                <option value="10" ${this.timerSeconds === 10 ? 'selected' : ''}>10 Giây (Cực nhanh - Chuyên gia)</option>
                <option value="20" ${this.timerSeconds === 20 ? 'selected' : ''}>20 Giây (Thong thả ôn luyện)</option>
              </select>
            </div>
          </div>

          <!-- Quy tắc ăn điểm & Combo -->
          <div class="gg-rules-box">
            <h4 style="font-size: 13px; font-weight: 800; color: #991B1B; margin: 0 0 6px 0;">🔥 Luật Chơi &amp; Hệ Số Nhân Combo:</h4>
            <div class="gg-rules-list">
              <div class="rule-item">✅ <strong>Đúng 1 câu:</strong> +10 EXP cơ bản (cộng thêm điểm theo giây còn lại).</div>
              <div class="rule-item">🔥 <strong>Combo x2 (2 câu liên tiếp):</strong> x1.5 Điểm thưởng (+15 EXP).</div>
              <div class="rule-item">⚡ <strong>Combo x3 (3-5 câu):</strong> x2.0 Điểm thưởng (+20 EXP &amp; +1 👑 Vương Miện).</div>
              <div class="rule-item">👑 <strong>Combo x5+ (Chuỗi hoàn hảo):</strong> x3.0 Điểm thưởng (+30 EXP &amp; +2 👑/câu).</div>
              <div class="rule-item">❌ <strong>Sai hoặc hết giờ:</strong> Chuỗi Combo trở về 0. Không bị trừ điểm.</div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 10px;">
            <button class="btn-start-game" onclick="window.guessGameApp.startGame()">
              🚀 Bắt Đầu Trận Đấu Ngay!
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 2. KHỞI ĐỘNG TRẬN ĐẤU & TẠO CÂU HỎI
  startGame() {
    if (!window.vocabDb) return;

    let pool = window.vocabDb.filter({
      topic: this.selectedTopic,
      band: this.selectedBand,
    });

    if (pool.length < 4) {
      pool = window.vocabDb.getAll(); // Nới lỏng toàn bộ nếu bộ lọc quá hẹp
    }

    // Xáo trộn kho từ
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const chosenWords = shuffledPool.slice(0, Math.min(this.questionCount, shuffledPool.length));

    // Sinh 3 hình thức câu hỏi ngẫu nhiên
    const questionTypes = ['DEFINITION_IMAGE', 'AUDIO_LISTENING', 'FILL_BLANK_COLLOCATION'];

    this.questions = chosenWords.map((item, idx) => {
      const type = questionTypes[idx % questionTypes.length]; // Luân phiên 3 dạng

      // Chọn 3 phương án nhiễu ngẫu nhiên
      const distractors = window.vocabDb
        .getAll()
        .filter((w) => w.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allOptions = [item, ...distractors].sort(() => Math.random() - 0.5);

      return {
        id: idx + 1,
        type,
        target: item,
        options: allOptions,
        userAnswer: null,
        isCorrect: false,
        timeTaken: 0,
      };
    });

    // Reset chỉ số trận đấu
    this.currentIndex = 0;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.earnedExp = 0;
    this.earnedCrowns = 0;
    this.reviewItems = [];
    this.gameState = 'PLAYING';

    if (window.soundSystem) window.soundSystem.playClick();
    if (window.mascot) {
      window.mascot.say('🔥 Trận đấu bắt đầu! Hãy tập trung nghe và chọn thật nhanh nhé!', 2500);
      window.mascot.setMood('strict');
    }

    this.renderQuestion();
  }

  // 3. RENDER CÂU HỎI HIỆN TẠI
  renderQuestion() {
    if (!this.container || this.currentIndex >= this.questions.length) {
      this.endGame();
      return;
    }

    const q = this.questions[this.currentIndex];
    const totalQ = this.questions.length;
    const progressPercent = Math.round(((this.currentIndex + 1) / totalQ) * 100);

    this.isAnswerLocked = false;
    this.currentTimer = this.timerSeconds;

    // Xác định tiêu đề và nội dung theo từng dạng câu hỏi
    let typeBadgeText = '';
    let questionContentHtml = '';

    if (q.type === 'DEFINITION_IMAGE') {
      typeBadgeText = '🖼️ Nhìn Hình &amp; Định Nghĩa';
      questionContentHtml = `
        <div class="gg-prompt-box">
          <div class="gg-prompt-illustration">
            ${q.target.svg || ''}
          </div>
          <div class="gg-prompt-text-wrap">
            <span class="gg-prompt-label">Định nghĩa học thuật Cambridge:</span>
            <p class="gg-prompt-def">"${q.target.definitionEn}"</p>
            <p class="gg-prompt-vi">👉 <em>${q.target.definitionVi}</em></p>
            <div class="gg-prompt-meta">
              <span class="fc-pos-badge sm">${q.target.partOfSpeech}</span>
              <span class="fc-band-badge sm" style="background:#E0F2FE; color:#0369A1;">🎯 Band ${q.target.band}</span>
            </div>
          </div>
        </div>
      `;
    } else if (q.type === 'AUDIO_LISTENING') {
      typeBadgeText = '🎧 Nghe Âm Thanh &amp; Đoán Từ';
      questionContentHtml = `
        <div class="gg-prompt-box audio-mode">
          <div class="gg-audio-center-speaker">
            <button class="btn-gg-big-speaker" onclick="window.guessGameApp.replayAudio()" title="Nghe lại phát âm">
              🔊
            </button>
            <span class="audio-hint-text">Nhấp vào loa để nghe lại giọng phát âm UK 🇬🇧</span>
          </div>
          <div class="gg-prompt-text-wrap" style="text-align: center;">
            <p class="gg-prompt-vi">Nghĩa tiếng Việt gợi ý: <strong>${q.target.definitionVi}</strong></p>
            <span class="fc-pos-badge sm">${q.target.partOfSpeech}</span>
          </div>
        </div>
      `;
      // Tự động phát âm ngay khi câu hỏi hiện ra
      setTimeout(() => this.replayAudio(), 300);
    } else if (q.type === 'FILL_BLANK_COLLOCATION') {
      typeBadgeText = '📝 Điền Collocation Vào Chỗ Trống';
      // Thay thế từ vựng trong câu bằng chỗ trống _____
      const blankRegex = new RegExp(q.target.word, 'gi');
      const sentenceWithBlank = q.target.exampleEn.replace(blankRegex, '________');

      questionContentHtml = `
        <div class="gg-prompt-box">
          <div class="gg-prompt-text-wrap" style="width: 100%;">
            <span class="gg-prompt-label">Chọn cụm từ / Collocation thích hợp nhất điền vào câu IELTS:</span>
            <blockquote class="gg-blank-sentence">"${sentenceWithBlank}"</blockquote>
            <p class="gg-prompt-vi">👉 Bản dịch: <em>${q.target.exampleVi}</em></p>
          </div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="guess-game-wrapper">
        <!-- HUD trên cùng trận đấu: Điểm, Câu số, Combo, Đồng hồ -->
        <div class="gg-in-game-hud">
          <div class="gg-hud-item">
            <span class="hud-label">Câu hỏi</span>
            <strong class="hud-val">${this.currentIndex + 1} / ${totalQ}</strong>
          </div>

          <div class="gg-hud-item timer-item">
            <span class="hud-label">Thời gian</span>
            <strong class="hud-val timer-number" id="gg-timer-val">${this.currentTimer}s</strong>
          </div>

          <div class="gg-hud-item combo-item">
            <span class="hud-label">Chuỗi Combo</span>
            <div class="hud-combo-badge ${this.combo >= 2 ? 'flaming' : ''}" id="gg-combo-badge">
              🔥 x${Math.max(1, this.combo)}
            </div>
          </div>

          <div class="gg-hud-item">
            <span class="hud-label">Điểm số</span>
            <strong class="hud-val score-val">${this.score}</strong>
          </div>
        </div>

        <!-- Thanh tiến trình thời gian đếm ngược -->
        <div class="gg-timer-bar-wrap">
          <div class="gg-timer-bar-fill" id="gg-timer-bar" style="width: 100%;"></div>
        </div>

        <!-- Khung Câu Hỏi Chính -->
        <div class="gg-question-card">
          <div class="gg-q-header">
            <span class="gg-q-type-badge">${typeBadgeText}</span>
            <div class="gg-topic-pill">
              <span>${q.target.topicIcon}</span>
              <span>${q.target.topicName}</span>
            </div>
          </div>

          ${questionContentHtml}

          <!-- 4 Lựa chọn Trắc nghiệm A, B, C, D -->
          <div class="gg-options-grid" id="gg-options-grid">
            ${q.options
              .map((opt, oIdx) => {
                const label = ['A', 'B', 'C', 'D'][oIdx];
                return `
                <button
                  class="btn-gg-option"
                  id="gg-opt-${opt.id}"
                  onclick="window.guessGameApp.selectAnswer('${opt.id}', '${q.target.id}')"
                >
                  <span class="opt-prefix">${label}</span>
                  <div class="opt-text-wrap">
                    <strong class="opt-word">${opt.word}</strong>
                    <small class="opt-ipa">${opt.ipaUk}</small>
                  </div>
                </button>
              `;
              })
              .join('')}
          </div>
        </div>
      </div>
    `;

    // Bắt đầu đếm ngược
    this.startTimer();
  }

  // Đếm ngược thời gian cho câu hỏi
  startTimer() {
    clearInterval(this.timerInterval);
    const timerEl = document.getElementById('gg-timer-val');
    const barEl = document.getElementById('gg-timer-bar');

    this.timerInterval = setInterval(() => {
      this.currentTimer -= 1;

      if (timerEl) {
        timerEl.textContent = `${this.currentTimer}s`;
        if (this.currentTimer <= 4) {
          timerEl.style.color = '#E11D48';
          timerEl.classList.add('pulse');
        } else {
          timerEl.style.color = '';
          timerEl.classList.remove('pulse');
        }
      }

      if (barEl) {
        const percent = Math.max(0, (this.currentTimer / this.timerSeconds) * 100);
        barEl.style.width = `${percent}%`;
        if (percent <= 25) {
          barEl.style.background = '#EF4444';
        } else if (percent <= 50) {
          barEl.style.background = '#F59E0B';
        } else {
          barEl.style.background = '#10B981';
        }
      }

      // Hết giờ
      if (this.currentTimer <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeOut();
      }
    }, 1000);
  }

  // Xử lý khi thí sinh chọn đáp án
  selectAnswer(selectedId, correctId) {
    if (this.isAnswerLocked) return;
    this.isAnswerLocked = true;
    clearInterval(this.timerInterval);

    const q = this.questions[this.currentIndex];
    q.userAnswer = selectedId;
    q.isCorrect = selectedId === correctId;
    q.timeTaken = this.timerSeconds - this.currentTimer;

    const optButtons = document.querySelectorAll('.btn-gg-option');
    optButtons.forEach((btn) => (btn.disabled = true));

    const selectedBtn = document.getElementById(`gg-opt-${selectedId}`);
    const correctBtn = document.getElementById(`gg-opt-${correctId}`);

    if (q.isCorrect) {
      // Đúng đáp án
      if (selectedBtn) selectedBtn.classList.add('correct');
      this.handleCorrectAnswer();
    } else {
      // Sai đáp án
      if (selectedBtn) selectedBtn.classList.add('wrong');
      if (correctBtn) correctBtn.classList.add('correct');
      this.handleWrongAnswer(q.target);
    }

    // Chuyển sang câu kế tiếp sau 1.2s
    setTimeout(() => {
      this.currentIndex += 1;
      this.renderQuestion();
    }, 1200);
  }

  // Xử lý khi hết giờ
  handleTimeOut() {
    if (this.isAnswerLocked) return;
    this.isAnswerLocked = true;

    const q = this.questions[this.currentIndex];
    q.userAnswer = null;
    q.isCorrect = false;
    q.timeTaken = this.timerSeconds;

    const correctBtn = document.getElementById(`gg-opt-${q.target.id}`);
    if (correctBtn) correctBtn.classList.add('correct');

    this.handleWrongAnswer(q.target, true);

    setTimeout(() => {
      this.currentIndex += 1;
      this.renderQuestion();
    }, 1200);
  }

  // Xử lý tính điểm và tăng Combo khi trả lời đúng
  handleCorrectAnswer() {
    this.combo += 1;
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }
    this.correctCount += 1;

    // Tính điểm dựa theo hệ số Combo và thời gian còn lại
    let multiplier = 1.0;
    if (this.combo >= 5) multiplier = 3.0;
    else if (this.combo >= 3) multiplier = 2.0;
    else if (this.combo >= 2) multiplier = 1.5;

    const basePoints = 100;
    const timeBonus = this.currentTimer * 10;
    const roundScore = Math.round((basePoints + timeBonus) * multiplier);

    this.score += roundScore;
    this.earnedExp += Math.round(10 * multiplier);

    // Thưởng vương miện khi duy trì Combo cao
    if (this.combo === 3 || this.combo === 5 || this.combo === 8) {
      this.earnedCrowns += 1;
      if (window.gamification) window.gamification.addCrowns(1);
    }

    if (window.soundSystem) window.soundSystem.playCorrect();

    // GHI NHẬN VÀO HỆ THỐNG SPACED REPETITION (SRS):
    // Làm đúng 1 lần -> Chuyển thành "🔵 Đang ôn tập (Reviewing)"
    // Nếu trước đó đã làm đúng ở bài tập khác (như Memory Match) -> Thăng hạng lên "🟢 Đã thành thạo (Mastered)"
    const q = this.questions[this.currentIndex];
    if (window.srsManager && q && q.target) {
      const srsRes = window.srsManager.recordActivity(q.target.id, 'quiz', true, q.target);
      if (srsRes && srsRes.transitioned && srsRes.to === 'mastered') {
        if (window.mascot) {
          window.mascot.say(`👑 XUẤT SẮC! Từ "<strong>${q.target.word}</strong>" đã đạt trạng thái 🟢 ĐÃ THÀNH THẠO (làm đúng 2 dạng bài tập khác nhau)!`, 4000);
        }
      }
    }

    // Mascot chúc mừng
    if (window.mascot) {
      if (this.combo >= 5) {
        window.mascot.say(`🔥 CHUỖI COMBO x${this.combo}! Không thể cản phá!`, 2000);
        window.mascot.setMood('happy');
      } else if (this.combo >= 3) {
        window.mascot.say(`⚡ Đang vào guồng! Combo x${this.combo}! Tiếp tục nhé!`, 2000);
      }
    }
  }

  // Xử lý khi trả lời sai hoặc hết thời gian
  handleWrongAnswer(targetWord, isTimeout = false) {
    this.combo = 0; // Gãy chuỗi combo
    this.wrongCount += 1;
    this.reviewItems.push(targetWord);

    // KÍCH HOẠT SRS: Ghi nhận trả lời sai, đưa về Stage 1 (+1 ngày) để nhắc ôn tập lại
    if (window.srsManager && targetWord) {
      window.srsManager.recordActivity(targetWord.id, 'quiz', false, targetWord);
    }

    if (window.soundSystem) window.soundSystem.playWrong();

    if (window.mascot) {
      if (isTimeout) {
        window.mascot.say('⏱️ Hết giờ rồi! Đừng lo, câu sau hãy quyết đoán hơn nhé.', 2000);
      } else {
        window.mascot.say(`Đáp án đúng là "<strong>${targetWord.word}</strong>". Hãy ghi nhớ nhé!`, 2500);
      }
    }
  }

  // Nghe lại phát âm từ vựng (dùng cho Type 2)
  replayAudio() {
    if (!this.questions[this.currentIndex]) return;
    const word = this.questions[this.currentIndex].target.word;
    if (window.flashcardApp) {
      window.flashcardApp.speak(word, 'UK');
    }
  }

  // 4. MÀN HÌNH TỔNG KẾT TRẬN ĐẤU (GAME OVER / VICTORY)
  endGame() {
    clearInterval(this.timerInterval);
    this.gameState = 'GAME_OVER';

    // Thưởng EXP vào Gamification Engine
    if (window.gamification && this.earnedExp > 0) {
      window.gamification.addExp(this.earnedExp);
    }

    if (window.soundSystem) window.soundSystem.playLevelUp();

    this.renderGameOver();
  }

  renderGameOver() {
    if (!this.container) return;

    const total = this.questions.length;
    const accuracy = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    let starRating = '⭐⭐';
    if (accuracy >= 80) starRating = '⭐⭐⭐';
    else if (accuracy < 50) starRating = '⭐';

    this.container.innerHTML = `
      <div class="guess-game-wrapper">
        <div class="gg-victory-card">
          <div class="gg-victory-header">
            <span class="gg-star-rating">${starRating}</span>
            <h2 style="font-size: 26px; font-weight: 900; color: #1E293B; margin: 8px 0 4px 0;">Hoàn Thành Trận Đấu Phản Xạ!</h2>
            <p style="font-size: 13px; color: #64748B; margin: 0;">Bạn đã hoàn thành xuất sắc thử thách phản xạ từ vựng IELTS</p>
          </div>

          <!-- Bảng 4 số liệu kết quả -->
          <div class="gg-results-grid">
            <div class="gg-res-box">
              <span class="res-label">Tổng Điểm Trận</span>
              <strong class="res-val" style="color: #BE123C;">${this.score}</strong>
            </div>

            <div class="gg-res-box">
              <span class="res-label">Độ Chính Xác</span>
              <strong class="res-val" style="color: #16A34A;">${this.correctCount}/${total} (${accuracy}%)</strong>
            </div>

            <div class="gg-res-box">
              <span class="res-label">Max Combo</span>
              <strong class="res-val" style="color: #D97706;">🔥 x${this.maxCombo}</strong>
            </div>

            <div class="gg-res-box">
              <span class="res-label">Phần Thưởng</span>
              <strong class="res-val" style="color: #7C3AED;">+${this.earnedExp} EXP ${
                this.earnedCrowns > 0 ? `• +${this.earnedCrowns} 👑` : ''
              }</strong>
            </div>
          </div>

          <!-- Danh sách câu sai cần ôn lại nếu có -->
          ${
            this.reviewItems.length > 0
              ? `
            <div class="gg-review-box">
              <h4 style="font-size: 13px; font-weight: 800; color: #B45309; margin: 0 0 10px 0;">
                ⚠️ Các Từ Cần Ôn Lại (${this.reviewItems.length} từ):
              </h4>
              <div class="gg-review-chips">
                ${this.reviewItems
                  .map(
                    (item) => `
                  <div class="gg-review-chip">
                    <strong>${item.word}</strong>
                    <span>(${item.partOfSpeech}): ${item.definitionVi}</span>
                    <button class="btn-review-audio" onclick="window.guessGameApp.speakReviewWord('${this.escapeText(
                      item.word
                    )}')">🔊</button>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          `
              : `
            <div class="gg-perfect-badge">
              <span>🎉 HOÀN HẢO! Bạn không sai một câu nào trong lượt này!</span>
            </div>
          `
          }

          <!-- Nút hành động -->
          <div class="gg-action-buttons">
            <button class="btn-gg-play-again" onclick="window.guessGameApp.startGame()">
              🔄 Chơi Lại Trận Mới
            </button>
            <button class="btn-gg-change-setup" onclick="window.guessGameApp.backToLobby()">
              ⚙️ Đổi Chủ Đề Khác
            </button>
            <button class="btn-gg-to-flashcard" onclick="window.guessGameApp.openFlashcardReview()">
              🃏 Ôn Tập Bằng Flashcard 3D
            </button>
          </div>
        </div>
      </div>
    `;
  }

  speakReviewWord(word) {
    if (window.flashcardApp) {
      window.flashcardApp.speak(word, 'UK');
    }
  }

  backToLobby() {
    this.gameState = 'LOBBY';
    this.renderLobby();
  }

  openFlashcardReview() {
    if (window.app) {
      window.app.switchTab('flashcard');
    }
  }

  escapeText(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Khởi tạo Singleton
window.guessGameApp = new IeltsGuessGameApp();
