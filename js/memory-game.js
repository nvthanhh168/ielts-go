/**
 * IELTS GO! - Lật Thẻ Trí Nhớ (Paraphrase Memory Match - Chế Độ 4)
 * 1. Lưới thẻ 4x3 (6 cặp) hoặc 4x4 (8 cặp) theo 20 chủ đề & Band điểm
 * 2. Hai chế độ ghép: [Từ vựng gốc] - [Từ đồng nghĩa Paraphrase] hoặc [Từ vựng] - [Nghĩa tiếng Việt]
 * 3. Đếm số lượt lật (Moves), đồng hồ bấm giờ (Timer), phát âm Web Speech khi ghép đúng và thưởng EXP/Crowns
 */

class IeltsMemoryGameApp {
  constructor() {
    this.container = null;
    this.gameState = 'LOBBY'; // 'LOBBY', 'PLAYING', 'VICTORY'
    this.gridSize = '4x3'; // '4x3' (6 cặp) hoặc '4x4' (8 cặp)
    this.matchMode = 'PARAPHRASE'; // 'PARAPHRASE' hoặc 'VIETNAMESE'
    this.selectedTopic = 'all';
    this.selectedBand = 'all';

    // Trạng thái bàn chơi
    this.cards = [];
    this.flippedCards = []; // Tối đa 2 thẻ đang lật
    this.matchedPairsCount = 0;
    this.totalPairs = 6;
    this.moves = 0;
    this.isBoardLocked = false;

    // Thời gian
    this.secondsElapsed = 0;
    this.timerInterval = null;

    // Thưởng
    this.earnedExp = 0;
    this.earnedCrowns = 0;
    this.currentPairsData = []; // Lưu lại để hiển thị bảng tổng kết
  }

  // Khởi tạo và render vào container
  render(containerId = 'memory-game-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (this.gameState === 'LOBBY') {
      this.renderLobby();
    } else if (this.gameState === 'PLAYING') {
      this.renderGameBoard();
    } else if (this.gameState === 'VICTORY') {
      this.renderVictory();
    }
  }

  // 1. GIAO DIỆN PHÒNG CHỜ (LOBBY SETUP)
  renderLobby() {
    if (!this.container || !window.vocabDb) return;

    const topics = window.vocabDb.getTopics();

    this.container.innerHTML = `
      <div class="memory-game-wrapper">
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #0F766E 0%, #0F172A 100%); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-size: 11px; font-weight: 800; color: #99F6E4; text-transform: uppercase; letter-spacing: 0.5px;">Mô-đun #04 • Lexical Resource Matrix</span>
              <h2 style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 4px 0 6px 0;">🧩 Lật Thẻ Trí Nhớ (Paraphrase Match)</h2>
              <p style="font-size: 13px; color: #CCFBF1; margin: 0;">Lật tìm các cặp từ đồng nghĩa C1/C2 hoặc nghĩa tiếng Việt, rèn luyện phản xạ ngôn ngữ ăn điểm Lexical Resource.</p>
            </div>
            <div class="mg-badge-pill">
              <span>🎯 Luyện phản xạ Paraphrase</span>
            </div>
          </div>
        </div>

        <div class="mg-setup-card">
          <div class="mg-setup-header">
            <span class="mg-setup-icon">🧩</span>
            <div>
              <h3 style="font-size: 16px; font-weight: 900; color: #1E293B; margin: 0;">Thiết Lập Ván Đấu Trí Nhớ</h3>
              <p style="font-size: 12px; color: #64748B; margin: 2px 0 0 0;">Tùy chọn kích thước bàn cờ và kiểu liên kết thẻ để bắt đầu</p>
            </div>
          </div>

          <div class="mg-setup-grid">
            <div class="mg-setup-field">
              <label for="mg-mode-select"><span>🔗</span> Kiểu Ghép Cặp Thẻ:</label>
              <select id="mg-mode-select" class="fc-select" onchange="window.memoryGameApp.matchMode = this.value">
                <option value="PARAPHRASE" ${this.matchMode === 'PARAPHRASE' ? 'selected' : ''}>
                  🎯 [Từ Gốc] - [Từ Đồng Nghĩa Paraphrase IELTS] (Khuyên dùng)
                </option>
                <option value="VIETNAMESE" ${this.matchMode === 'VIETNAMESE' ? 'selected' : ''}>
                  🇻🇳 [Từ Vựng Học Thuật] - [Nghĩa Tiếng Việt]
                </option>
              </select>
            </div>

            <div class="mg-setup-field">
              <label for="mg-grid-select"><span>📐</span> Kích Thước Lưới Thẻ:</label>
              <select id="mg-grid-select" class="fc-select" onchange="window.memoryGameApp.gridSize = this.value">
                <option value="4x3" ${this.gridSize === '4x3' ? 'selected' : ''}>4 x 3 (12 thẻ • 6 cặp từ vựng - Vừa sức)</option>
                <option value="4x4" ${this.gridSize === '4x4' ? 'selected' : ''}>4 x 4 (16 thẻ • 8 cặp từ vựng - Thử thách trí nhớ)</option>
              </select>
            </div>

            <div class="mg-setup-field">
              <label for="mg-topic-select"><span>📚</span> Chủ Điểm (20 Topics):</label>
              <select id="mg-topic-select" class="fc-select" onchange="window.memoryGameApp.selectedTopic = this.value">
                <option value="all">🌟 Toàn bộ 20 Chủ điểm tổng hợp</option>
                ${topics
                  .map(
                    (t) =>
                      `<option value="${t.id}" ${this.selectedTopic === t.id ? 'selected' : ''}>${t.icon} ${t.name}</option>`
                  )
                  .join('')}
              </select>
            </div>

            <div class="mg-setup-field">
              <label for="mg-band-select"><span>🎖️</span> Cấp Độ Band Điểm:</label>
              <select id="mg-band-select" class="fc-select" onchange="window.memoryGameApp.selectedBand = this.value">
                <option value="all" ${this.selectedBand === 'all' ? 'selected' : ''}>🎯 Mọi cấp độ Band</option>
                <option value="4.5 - 6.0" ${this.selectedBand === '4.5 - 6.0' ? 'selected' : ''}>🥉 Band 4.5 - 6.0 (Intermediate)</option>
                <option value="6.0 - 7.5" ${this.selectedBand === '6.0 - 7.5' ? 'selected' : ''}>🥇 Band 6.0 - 7.5 (Du Học)</option>
                <option value="7.5+" ${this.selectedBand === '7.5+' ? 'selected' : ''}>👑 Band 7.5+ (Master)</option>
              </select>
            </div>
          </div>

          <!-- Gợi ý chiến thuật ăn điểm -->
          <div class="mg-tips-banner">
            <span style="font-size: 24px;">💡</span>
            <div>
              <strong style="font-size: 13px; color: #065F46; display: block;">Mẹo Chinh Phục Lexical Resource:</strong>
              <p style="font-size: 12px; color: #047857; margin: 2px 0 0 0;">
                Trong IELTS Reading và Writing, khả năng nhận diện cặp Paraphrase (ví dụ: <em>natural habitat</em> = <em>native territory</em>) là chìa khóa then chốt để đạt Band 7.0+. Hãy ghi nhớ kỹ các cặp thẻ nhé!
              </p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 10px;">
            <button class="btn-start-memory-game" onclick="window.memoryGameApp.startGame()">
              🎮 Bắt Đầu Lật Thẻ Ngay!
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 2. KHỞI TẠO BÀN CHƠI & XÁO TRỘN CẶP THẺ
  startGame() {
    if (!window.vocabDb) return;

    let pool = window.vocabDb.filter({
      topic: this.selectedTopic,
      band: this.selectedBand,
    });

    if (pool.length < 4) {
      pool = window.vocabDb.getAll();
    }

    this.totalPairs = this.gridSize === '4x4' ? 8 : 6;

    // Chọn ngẫu nhiên N từ vựng từ kho
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const selectedVocab = shuffledPool.slice(0, Math.min(this.totalPairs, shuffledPool.length));

    // Nếu không đủ số cặp, nhân bản thêm từ kho chung
    while (selectedVocab.length < this.totalPairs) {
      const extra = window.vocabDb.getAll().find((w) => !selectedVocab.some((v) => v.id === w.id));
      if (extra) selectedVocab.push(extra);
      else break;
    }

    this.currentPairsData = selectedVocab;

    // Tạo danh sách thẻ: Mỗi từ sinh 2 thẻ (Thẻ A & Thẻ B)
    const cardDeck = [];

    selectedVocab.forEach((item, idx) => {
      const pairId = `pair-${item.id}`;

      // Thẻ A: Luôn là Từ vựng gốc tiếng Anh
      cardDeck.push({
        cardId: `card-${item.id}-A`,
        pairId: pairId,
        vocabItem: item,
        sideType: 'WORD',
        text: item.word,
        subText: `${item.partOfSpeech} • Band ${item.band}`,
        icon: item.topicIcon,
        isFlipped: false,
        isMatched: false,
      });

      // Thẻ B: Tùy chế độ (Paraphrase hoặc Nghĩa Tiếng Việt)
      let partnerText = '';
      let partnerSub = '';
      if (this.matchMode === 'PARAPHRASE') {
        partnerText = item.synonyms && item.synonyms.length > 0 ? item.synonyms[0] : item.definitionVi;
        partnerSub = '🎯 Paraphrase Tag';
      } else {
        partnerText = item.definitionVi;
        partnerSub = '🇻🇳 Nghĩa Tiếng Việt';
      }

      cardDeck.push({
        cardId: `card-${item.id}-B`,
        pairId: pairId,
        vocabItem: item,
        sideType: 'PARTNER',
        text: partnerText,
        subText: partnerSub,
        icon: '🔗',
        isFlipped: false,
        isMatched: false,
      });
    });

    // Xáo trộn thẻ trên bàn
    this.cards = cardDeck.sort(() => Math.random() - 0.5);

    // Reset chỉ số
    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.moves = 0;
    this.isBoardLocked = false;
    this.secondsElapsed = 0;
    this.gameState = 'PLAYING';

    // Bắt đầu đồng hồ bấm giờ
    this.startStopwatch();

    if (window.soundSystem) window.soundSystem.playClick();
    if (window.mascot) {
      window.mascot.say('🧩 Bàn cờ đã sẵn sàng! Hãy tìm các cặp thẻ tương ứng nhé!', 2500);
      window.mascot.setMood('happy');
    }

    this.renderGameBoard();
  }

  // Bắt đầu đồng hồ tính giây
  startStopwatch() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.secondsElapsed += 1;
      const timerEl = document.getElementById('mg-stopwatch');
      if (timerEl) {
        timerEl.textContent = this.formatTime(this.secondsElapsed);
      }
    }, 1000);
  }

  formatTime(totalSecs) {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // 3. RENDER BÀN CỜ VÀ LƯỚI THẺ ÚP
  renderGameBoard() {
    if (!this.container) return;

    const gridClass = this.gridSize === '4x4' ? 'grid-4x4' : 'grid-4x3';

    this.container.innerHTML = `
      <div class="memory-game-wrapper">
        <!-- HUD Quản Lý Ván Chơi -->
        <div class="mg-in-game-hud">
          <div class="mg-hud-item">
            <span class="hud-label">Cặp Đã Ghép</span>
            <strong class="hud-val" id="mg-pairs-count">${this.matchedPairsCount} / ${this.totalPairs}</strong>
          </div>

          <div class="mg-hud-item">
            <span class="hud-label">Số Lượt Lật (Moves)</span>
            <strong class="hud-val" id="mg-moves-count">${this.moves}</strong>
          </div>

          <div class="mg-hud-item">
            <span class="hud-label">Thời Gian</span>
            <strong class="hud-val timer-number" id="mg-stopwatch">${this.formatTime(this.secondsElapsed)}</strong>
          </div>

          <div class="mg-hud-actions">
            <button class="btn-mg-control" onclick="window.memoryGameApp.restartGame()" title="Chơi lại ván này">
              🔄 Chơi Lại
            </button>
            <button class="btn-mg-control" onclick="window.memoryGameApp.backToLobby()" title="Về màn hình thiết lập">
              ⚙️ Cấu Hình
            </button>
          </div>
        </div>

        <!-- Khung Lưới Thẻ Úp (Grid Viewport) -->
        <div class="mg-board-area">
          <div class="mg-cards-grid ${gridClass}" id="mg-cards-grid">
            ${this.cards
              .map(
                (card, idx) => `
              <div
                class="mg-card-container ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}"
                id="mg-card-${card.cardId}"
                onclick="window.memoryGameApp.handleCardClick('${card.cardId}')"
              >
                <div class="mg-card-inner">
                  <!-- MẶT ÚP (CARD BACK) -->
                  <div class="mg-face mg-face-back">
                    <div class="mg-back-pattern">
                      <span class="mg-back-symbol">👑</span>
                      <span class="mg-back-brand">IELTS GO!</span>
                    </div>
                  </div>

                  <!-- MẶT NGỬA (CARD FRONT) -->
                  <div class="mg-face mg-face-front ${card.sideType === 'WORD' ? 'theme-word' : 'theme-partner'}">
                    <span class="mg-front-icon">${card.icon}</span>
                    <strong class="mg-front-text">${card.text}</strong>
                    <small class="mg-front-sub">${card.subText}</small>
                  </div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 4. XỬ LÝ LẬT THẺ & KIỂM TRA GHÉP CẶP
  handleCardClick(cardId) {
    if (this.isBoardLocked) return;

    const card = this.cards.find((c) => c.cardId === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Không cho lật quá 2 thẻ cùng lúc
    if (this.flippedCards.length >= 2) return;

    // Lật thẻ này
    card.isFlipped = true;
    this.flippedCards.push(card);

    const cardEl = document.getElementById(`mg-card-${cardId}`);
    if (cardEl) cardEl.classList.add('flipped');

    if (window.soundSystem) window.soundSystem.playClick();

    // Nếu đã lật đủ 2 thẻ -> So sánh
    if (this.flippedCards.length === 2) {
      this.moves += 1;
      const movesEl = document.getElementById('mg-moves-count');
      if (movesEl) movesEl.textContent = this.moves;

      this.checkCardMatch();
    }
  }

  // So sánh 2 thẻ vừa lật
  checkCardMatch() {
    this.isBoardLocked = true;
    const [c1, c2] = this.flippedCards;

    const isMatch = c1.pairId === c2.pairId;

    if (isMatch) {
      // GHÉP ĐÚNG!
      setTimeout(() => {
        c1.isMatched = true;
        c2.isMatched = true;

        const el1 = document.getElementById(`mg-card-${c1.cardId}`);
        const el2 = document.getElementById(`mg-card-${c2.cardId}`);
        if (el1) el1.classList.add('matched');
        if (el2) el2.classList.add('matched');

        this.matchedPairsCount += 1;
        const countEl = document.getElementById('mg-pairs-count');
        if (countEl) countEl.textContent = `${this.matchedPairsCount} / ${this.totalPairs}`;

        if (window.soundSystem) window.soundSystem.playCorrect();

        // KÍCH HOẠT SRS: Ghi nhận ghép đúng thẻ trong Memory Match
        // Làm đúng 1 lần -> Chuyển thành "🔵 Đang ôn tập (Reviewing)"
        // Nếu trước đó đã làm đúng ở Quiz Đoán từ -> Thăng hạng lên "🟢 Đã thành thạo (Mastered)"
        if (window.srsManager && c1.vocabItem) {
          const srsRes = window.srsManager.recordActivity(c1.vocabItem.id, 'memory', true, c1.vocabItem);
          if (srsRes && srsRes.transitioned && srsRes.to === 'mastered') {
            if (window.mascot) {
              window.mascot.say(`🟢 ĐÃ THÀNH THẠO: Từ "<strong>${c1.vocabItem.word}</strong>" đã được củng cố chuẩn xác qua 2 bài tập khác nhau!`, 3500);
            }
          }
        }

        // Đọc to từ vựng qua Web Speech API
        if (window.flashcardApp && c1.vocabItem) {
          window.flashcardApp.speak(c1.vocabItem.word, 'UK');
        }

        this.flippedCards = [];
        this.isBoardLocked = false;

        // Kiểm tra xem đã hoàn thành toàn bộ bàn cờ chưa
        if (this.matchedPairsCount >= this.totalPairs) {
          setTimeout(() => this.handleVictory(), 600);
        }
      }, 500);
    } else {
      // GHÉP SAI -> Úp thẻ lại sau 800ms
      setTimeout(() => {
        c1.isFlipped = false;
        c2.isFlipped = false;

        const el1 = document.getElementById(`mg-card-${c1.cardId}`);
        const el2 = document.getElementById(`mg-card-${c2.cardId}`);
        if (el1) {
          el1.classList.remove('flipped');
          el1.classList.add('shake');
          setTimeout(() => el1.classList.remove('shake'), 400);
        }
        if (el2) {
          el2.classList.remove('flipped');
          el2.classList.add('shake');
          setTimeout(() => el2.classList.remove('shake'), 400);
        }

        if (window.soundSystem) window.soundSystem.playWrong();

        this.flippedCards = [];
        this.isBoardLocked = false;
      }, 800);
    }
  }

  // 5. MÀN HÌNH CHIẾN THẮNG (VICTORY MODAL)
  handleVictory() {
    clearInterval(this.timerInterval);
    this.gameState = 'VICTORY';

    // Tính điểm EXP & Crowns dựa theo số lượt lật và thời gian
    const baseExp = this.gridSize === '4x4' ? 80 : 50;
    const efficiencyBonus = Math.max(0, 40 - Math.floor(this.moves / 2));
    this.earnedExp = baseExp + efficiencyBonus;
    this.earnedCrowns = this.moves <= this.totalPairs * 2 ? 5 : 3;

    // Cộng vào Gamification Engine
    if (window.gamification) {
      window.gamification.addExp(this.earnedExp);
      window.gamification.addCrowns(this.earnedCrowns);
    }

    if (window.soundSystem) window.soundSystem.playLevelUp();
    if (window.mascot) {
      window.mascot.say('🎉 XUẤT SẮC! Bạn đã lật mở toàn bộ các cặp Paraphrase thành công!', 3500);
      window.mascot.setMood('happy');
    }

    this.renderVictory();
  }

  renderVictory() {
    if (!this.container) return;

    // Đánh giá sao (⭐⭐⭐)
    let starRating = '⭐⭐';
    if (this.moves <= this.totalPairs + 3) starRating = '⭐⭐⭐ (Xuất Sắc)';
    else if (this.moves > this.totalPairs * 2.5) starRating = '⭐ (Cần Rèn Luyện)';

    this.container.innerHTML = `
      <div class="memory-game-wrapper">
        <div class="mg-victory-card">
          <div class="mg-victory-header">
            <span class="mg-victory-stars">${starRating}</span>
            <h2 style="font-size: 26px; font-weight: 900; color: #1E293B; margin: 8px 0 4px 0;">Chúc Mừng Hoàn Thành Màn Chơi!</h2>
            <p style="font-size: 13px; color: #64748B; margin: 0;">Bạn đã ghi nhớ toàn bộ ${this.totalPairs} cặp từ vựng học thuật</p>
          </div>

          <!-- Bảng 3 số liệu kết quả -->
          <div class="mg-results-grid">
            <div class="mg-res-box">
              <span class="res-label">Thời Gian</span>
              <strong class="res-val" style="color: #0F766E;">${this.formatTime(this.secondsElapsed)}</strong>
            </div>

            <div class="mg-res-box">
              <span class="res-label">Số Lượt Lật</span>
              <strong class="res-val" style="color: #2563EB;">${this.moves} Lượt</strong>
            </div>

            <div class="mg-res-box">
              <span class="res-label">Phần Thưởng</span>
              <strong class="res-val" style="color: #D97706;">+${this.earnedExp} EXP • +${this.earnedCrowns} 👑</strong>
            </div>
          </div>

          <!-- Danh sách các cặp Paraphrase vừa hoàn thành để ôn tập -->
          <div class="mg-summary-pairs-box">
            <h4 style="font-size: 14px; font-weight: 800; color: #065F46; margin: 0 0 10px 0;">
              📚 Tổng Hợp Các Cặp Paraphrase Vừa Ghép Được:
            </h4>
            <div class="mg-pairs-table">
              ${this.currentPairsData
                .map(
                  (item) => `
                <div class="mg-pair-row">
                  <div class="pair-col-left">
                    <span class="pair-icon">${item.topicIcon}</span>
                    <strong class="pair-word">${item.word}</strong>
                    <span class="fc-pos-badge sm">${item.partOfSpeech}</span>
                  </div>
                  <span class="pair-arrow">➔</span>
                  <div class="pair-col-right">
                    <span class="pair-syn">${
                      this.matchMode === 'PARAPHRASE'
                        ? item.synonyms && item.synonyms.length > 0
                          ? item.synonyms[0]
                          : item.definitionVi
                        : item.definitionVi
                    }</span>
                    <button class="btn-pair-audio" onclick="window.memoryGameApp.speakPairWord('${this.escapeText(
                      item.word
                    )}')">🔊</button>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Nút hành động -->
          <div class="mg-action-buttons">
            <button class="btn-mg-play-again" onclick="window.memoryGameApp.startGame()">
              🔄 Chơi Ván Mới
            </button>
            <button class="btn-mg-to-lobby" onclick="window.memoryGameApp.backToLobby()">
              ⚙️ Đổi Chế Độ / Chủ Đề
            </button>
            <button class="btn-mg-to-vault" onclick="window.memoryGameApp.openVocabVault()">
              📖 Xem Sổ Tay Từ Vựng
            </button>
          </div>
        </div>
      </div>
    `;
  }

  speakPairWord(word) {
    if (window.flashcardApp) {
      window.flashcardApp.speak(word, 'UK');
    }
  }

  restartGame() {
    this.startGame();
  }

  backToLobby() {
    clearInterval(this.timerInterval);
    this.gameState = 'LOBBY';
    this.renderLobby();
  }

  openVocabVault() {
    if (window.app) {
      window.app.switchTab('vocab-vault');
    }
  }

  escapeText(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Khởi tạo Singleton
window.memoryGameApp = new IeltsMemoryGameApp();
