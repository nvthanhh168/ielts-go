/**
 * IELTS GO! - Flashcard 3D Engine (Chế Độ 2)
 * Hiệu ứng lật thẻ 3 chiều CSS 3D Flip, phát âm UK/US qua Web Speech API,
 * Thuật toán phân loại 20 chủ điểm & 3 mốc Band điểm, tích hợp Gamification HUD
 */

class IeltsFlashcardApp {
  constructor() {
    this.container = null;
    this.currentIndex = 0;
    this.isFlipped = false;
    this.autoPlayInterval = null;
    this.currentList = [];
    this.filters = {
      topic: 'all',
      band: 'all',
      status: 'all',
    };

    // Khởi tạo danh sách từ và gắn sự kiện phím tắt
    this.init();
  }

  init() {
    this.bindKeyboardShortcuts();
  }

  // Khởi tạo và render giao diện Flashcard vào container
  render(containerId = 'flashcard-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.applyFilters(false);
    this.renderUI();
  }

  // Áp dụng bộ lọc cho kho thẻ
  applyFilters(resetIndex = true) {
    if (!window.vocabDb || !window.gamification) return;

    const masteredIds = window.gamification.state.masteredVocabIds || [];
    const reviewIds = window.gamification.state.reviewVocabIds || [];

    this.currentList = window.vocabDb.filter({
      topic: this.filters.topic,
      band: this.filters.band,
      status: this.filters.status,
      masteredIds,
      reviewIds,
    });

    if (resetIndex || this.currentIndex >= this.currentList.length) {
      this.currentIndex = 0;
    }
    this.isFlipped = false;
  }

  // Đổi bộ lọc từ giao diện
  setFilter(key, value) {
    this.filters[key] = value;
    this.applyFilters(true);
    this.updateCardDisplay();
    this.updateStatsDisplay();
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Render toàn bộ cấu trúc giao diện Flashcard 3D
  renderUI() {
    if (!this.container) return;

    const topics = window.vocabDb ? window.vocabDb.getTopics() : [];

    this.container.innerHTML = `
      <div class="flashcard-module-wrapper">
        <!-- Banner đầu trang -->
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #0369A1 0%, #0F172A 100%); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-size: 11px; font-weight: 800; color: #7DD3FC; text-transform: uppercase; letter-spacing: 0.5px;">Mô-đun #02 • Spaced Repetition</span>
              <h2 style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 4px 0 6px 0;">🃏 Flashcard 3D - 20 Chủ Điểm Chuẩn Cambridge</h2>
              <p style="font-size: 13px; color: #E0F2FE; margin: 0;">Lật thẻ 3 chiều trực quan, phát âm giọng chuẩn Anh & Mỹ, tra cứu collocations và ghi nhớ sâu.</p>
            </div>
            <div class="fc-quick-stats-pill" id="fc-quick-stats-pill">
              <!-- Render số lượng thẻ qua updateStatsDisplay -->
            </div>
          </div>
        </div>

        <!-- Thanh điều khiển Bộ Lọc Thông Minh (Filters Bar) -->
        <div class="fc-filters-card">
          <div class="fc-filter-group">
            <label for="fc-select-topic"><span>📚</span> Chủ Điểm (22 Topics):</label>
            <select id="fc-select-topic" class="fc-select" onchange="window.flashcardApp.setFilter('topic', this.value)">
              <option value="all">🌟 Tất cả 22 Chủ điểm (${window.vocabDb ? window.vocabDb.getAll().length : 0} từ)</option>
              ${topics
                .map(
                  (t) =>
                    `<option value="${t.id}" ${this.filters.topic === t.id ? 'selected' : ''}>${t.icon} ${t.name} ${t.viName ? `(${t.viName})` : ''}</option>`
                )
                .join('')}
            </select>
          </div>

          <div class="fc-filter-group">
            <label for="fc-select-band"><span>🎖️</span> Cấp Độ Band Điểm:</label>
            <select id="fc-select-band" class="fc-select" onchange="window.flashcardApp.setFilter('band', this.value)">
              <option value="all" ${this.filters.band === 'all' ? 'selected' : ''}>🎯 Mọi cấp độ Band</option>
              <option value="Mất gốc" ${this.filters.band === 'Mất gốc' ? 'selected' : ''}>🌱 Mất gốc (Band 0 - 3.5)</option>
              <option value="< 4.5" ${this.filters.band === '< 4.5' ? 'selected' : ''}>🥉 Sơ cấp (Band < 4.5)</option>
              <option value="4.5 - 6.0" ${this.filters.band === '4.5 - 6.0' ? 'selected' : ''}>🥈 Trung cấp (Band 4.5 - 6.0)</option>
              <option value="6.0 - 7.5" ${this.filters.band === '6.0 - 7.5' ? 'selected' : ''}>🥇 Nâng cao (Band 6.0 - 7.5)</option>
              <option value="7.5+" ${this.filters.band === '7.5+' ? 'selected' : ''}>👑 Chuyên gia (Band 7.5+)</option>
            </select>
          </div>

          <div class="fc-filter-group">
            <label for="fc-select-status"><span>⚡</span> Trạng Thái Học &amp; SRS:</label>
            <select id="fc-select-status" class="fc-select" onchange="window.flashcardApp.setFilter('status', this.value)">
              <option value="all" ${this.filters.status === 'all' ? 'selected' : ''}>🌟 Tất cả trạng thái</option>
              <option value="due_srs" ${this.filters.status === 'due_srs' ? 'selected' : ''}>⏰ Đến hạn ôn SRS hôm nay</option>
              <option value="mastered" ${this.filters.status === 'mastered' ? 'selected' : ''}>🟢 Đã thành thạo (Mastered)</option>
              <option value="review" ${this.filters.status === 'review' ? 'selected' : ''}>🔵 Đang ôn tập (Reviewing)</option>
              <option value="learning" ${this.filters.status === 'learning' ? 'selected' : ''}>🟡 Đang học (Learning)</option>
              <option value="new" ${this.filters.status === 'new' ? 'selected' : ''}>⚪ Chưa học (New)</option>
            </select>
          </div>

          <div class="fc-filter-actions">
            <button class="btn-fc-tool" onclick="window.flashcardApp.shuffleCards()" title="Xáo trộn ngẫu nhiên thẻ">
              🎲 Xáo trộn
            </button>
            <button class="btn-fc-tool" id="btn-fc-autoplay" onclick="window.flashcardApp.toggleAutoPlay()" title="Tự động lật và đọc thẻ">
              ▶️ Tự động
            </button>
            <button class="btn-fc-ai-expand" onclick="window.generateMoreVocabularyWithAI(document.getElementById('fc-select-topic').value, document.getElementById('fc-select-band').value, 20)" title="Dùng AI tạo thêm 20 từ vựng thực chiến chuẩn Cambridge cho chủ đề này">
              ✨ AI Tạo Thêm 20 Từ Chuẩn Cambridge
            </button>
          </div>
        </div>

        <!-- Khung 3D Viewport hiển thị Thẻ Flashcard -->
        <div class="fc-stage-area">
          <div class="fc-progress-wrap">
            <div class="fc-progress-bar">
              <div class="fc-progress-fill" id="fc-progress-fill" style="width: 0%;"></div>
            </div>
            <div class="fc-progress-counter" id="fc-counter-text">Thẻ 0 / 0</div>
          </div>

          <div class="fc-card-viewport" id="fc-viewport" onclick="window.flashcardApp.handleCardClick(event)">
            <div class="fc-card-3d" id="fc-card-3d">
              <!-- Nội dung thẻ mặt trước và mặt sau render qua updateCardDisplay -->
            </div>
          </div>

          <!-- Nút lật nhanh & Thanh gợi ý thao tác -->
          <div class="fc-flip-hint-bar">
            <span>👆 Nhấp vào thẻ hoặc bấm phím <strong>Space</strong> để lật mặt</span>
            <button class="btn-quick-flip" onclick="window.flashcardApp.flipCard()">
              🔄 Lật Thẻ (Space)
            </button>
          </div>

          <!-- Thanh nút Đánh Giá Tiến Độ: Cần Ôn Lại vs Đã Thuộc -->
          <div class="fc-action-buttons-wrap">
            <button class="btn-fc-action review" onclick="window.flashcardApp.markReview()" title="Phím tắt: Số 1">
              <span class="btn-action-icon">⚠️</span>
              <div class="btn-action-text">
                <strong>Cần Ôn Lại</strong>
                <small>Giữ trong hàng đợi luyện tập</small>
              </div>
              <span class="btn-shortcut-badge">Phím 1</span>
            </button>

            <button class="btn-fc-action mastered" onclick="window.flashcardApp.markMastered()" title="Phím tắt: Số 2">
              <span class="btn-action-icon">✅</span>
              <div class="btn-action-text">
                <strong>Đã Thuộc</strong>
                <small>+10 EXP &amp; Cập nhật tiến độ 🎯</small>
              </div>
              <span class="btn-shortcut-badge">Phím 2</span>
            </button>
          </div>

          <!-- Thanh Điều Hướng Thẻ: Trước / Sau -->
          <div class="fc-nav-controls">
            <button class="btn-fc-nav" id="btn-fc-prev" onclick="window.flashcardApp.prevCard()" title="Phím tắt: Mũi tên trái">
              ‹ Thẻ Trước
            </button>
            <button class="btn-fc-nav" id="btn-fc-next" onclick="window.flashcardApp.nextCard()" title="Phím tắt: Mũi tên phải">
              Thẻ Kế Tiếp ›
            </button>
          </div>

          <!-- Bảng hướng dẫn phím tắt (Keyboard Shortcuts Bar) -->
          <div class="fc-keyboard-shortcuts">
            <span class="shortcut-item"><kbd>Space</kbd> Lật thẻ</span>
            <span class="shortcut-item"><kbd>←</kbd> <kbd>→</kbd> Chuyển thẻ</span>
            <span class="shortcut-item"><kbd>1</kbd> Cần ôn lại</span>
            <span class="shortcut-item"><kbd>2</kbd> Đã thuộc</span>
            <span class="shortcut-item"><kbd>U</kbd> Phát âm UK 🇬🇧</span>
            <span class="shortcut-item"><kbd>A</kbd> Phát âm US 🇺🇸</span>
          </div>
        </div>
      </div>
    `;

    this.updateCardDisplay();
    this.updateStatsDisplay();
  }

  // Cập nhật hiển thị thống kê nhanh trên đầu module
  updateStatsDisplay() {
    const statsEl = document.getElementById('fc-quick-stats-pill');
    if (!statsEl || !window.vocabDb || !window.gamification) return;

    const masteredIds = window.gamification.state.masteredVocabIds || [];
    const reviewIds = window.gamification.state.reviewVocabIds || [];
    const stats = window.vocabDb.getStats(masteredIds, reviewIds);

    statsEl.innerHTML = `
      <div class="fc-stat-sub">
        <span>Đang lọc: <strong>${this.currentList.length} thẻ</strong></span>
        <span>•</span>
        <span style="color: #10B981;">Đã thuộc: <strong>${stats.mastered}/${stats.total} (${stats.percentage}%)</strong></span>
      </div>
    `;
  }

  // Cập nhật nội dung thẻ hiện tại vào 3D Viewport
  updateCardDisplay() {
    const cardEl = document.getElementById('fc-card-3d');
    const counterEl = document.getElementById('fc-counter-text');
    const fillEl = document.getElementById('fc-progress-fill');
    const prevBtn = document.getElementById('btn-fc-prev');
    const nextBtn = document.getElementById('btn-fc-next');

    if (!cardEl) return;

    // Trạng thái nếu không có thẻ nào phù hợp bộ lọc
    if (!this.currentList || this.currentList.length === 0) {
      cardEl.className = 'fc-card-3d empty';
      cardEl.innerHTML = `
        <div class="fc-card-empty-state">
          <span style="font-size: 54px;">🔍</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #1E293B; margin: 12px 0 6px 0;">Không tìm thấy từ vựng phù hợp</h3>
          <p style="font-size: 13px; color: #64748B; max-width: 380px; margin: 0 auto 16px auto;">Vui lòng nới lỏng các tiêu chí bộ lọc Chủ điểm, Cấp độ Band hoặc Trạng thái học tập.</p>
          <button class="btn-empty-reset" onclick="window.flashcardApp.resetFilters()">
            🔄 Đặt Lại Tất Cả Bộ Lọc
          </button>
        </div>
      `;
      if (counterEl) counterEl.textContent = '0 / 0';
      if (fillEl) fillEl.style.width = '0%';
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    if (prevBtn) prevBtn.disabled = this.currentIndex <= 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex >= this.currentList.length - 1;

    const item = this.currentList[this.currentIndex];
    const total = this.currentList.length;
    const currentNum = this.currentIndex + 1;
    const percent = Math.round((currentNum / total) * 100);

    if (counterEl) counterEl.textContent = `Thẻ ${currentNum} / ${total}`;
    if (fillEl) fillEl.style.width = `${percent}%`;

    const isMastered = window.gamification ? window.gamification.isVocabMastered(item.id) : false;
    const isReview = window.gamification ? window.gamification.isVocabReview(item.id) : false;

    // Xóa class flipped khi đổi thẻ
    cardEl.classList.toggle('flipped', this.isFlipped);

    // Xây dựng màu sắc badge Band
    let bandBadgeBg = '#E0F2FE';
    let bandBadgeColor = '#0369A1';
    if (item.band === '6.0 - 7.5') {
      bandBadgeBg = '#DCFCE7';
      bandBadgeColor = '#15803D';
    } else if (item.band === '7.5+') {
      bandBadgeBg = '#F3E8FF';
      bandBadgeColor = '#7E22CE';
    }

    cardEl.innerHTML = `
      <!-- MẶT TRƯỚC (FRONT FACE) -->
      <div class="fc-card-face fc-front">
        <div class="fc-face-header">
          <div class="fc-topic-chip">
            <span>${item.topicIcon}</span>
            <span>${item.topicName}</span>
          </div>

          <div class="fc-badges-wrap">
            <span class="fc-pos-badge">${item.partOfSpeech}</span>
            <span class="fc-band-badge" style="background: ${bandBadgeBg}; color: ${bandBadgeColor};">
              🎯 Band ${item.band} (${item.level})
            </span>
            ${
              window.srsManager
                ? window.srsManager.renderStatusBadgeHtml(item.id)
                : (isMastered
                    ? '<span class="fc-status-badge mastered">✓ Đã thuộc</span>'
                    : isReview
                    ? '<span class="fc-status-badge review">! Cần ôn</span>'
                    : '<span class="fc-status-badge new">Mới</span>')
            }
          </div>
        </div>

        <div class="fc-front-body">
          <div class="fc-illustration-wrap">
            ${item.svg || ''}
          </div>

          <h3 class="fc-word-headline">${item.word}</h3>

          <!-- Nút phát âm 2 giọng UK & US qua Web Speech API -->
          <div class="fc-pronounce-actions">
            <button class="btn-audio-voice uk" onclick="event.stopPropagation(); window.flashcardApp.speak('${this.escapeText(
              item.word
            )}', 'UK')" title="Phát âm giọng Anh - Chuẩn Oxford (Phím U)">
              <span>🇬🇧</span> UK Audio
            </button>
            <button class="btn-audio-voice us" onclick="event.stopPropagation(); window.flashcardApp.speak('${this.escapeText(
              item.word
            )}', 'US')" title="Phát âm giọng Mỹ (Phím A)">
              <span>🇺🇸</span> US Audio
            </button>
          </div>
        </div>

        <div class="fc-face-footer">
          <div class="fc-flip-callout">
            <span>↻ Nhấp hoặc Space để lật xem định nghĩa, phát âm IPA &amp; câu ví dụ</span>
          </div>
        </div>
      </div>

      <!-- MẶT SAU (BACK FACE) -->
      <div class="fc-card-face fc-back">
        <div class="fc-face-header back">
          <div class="fc-word-back-title">
            <strong>${item.word}</strong>
            <span class="fc-pos-badge sm">${item.partOfSpeech}</span>
            <span class="fc-band-badge sm" style="background: ${bandBadgeBg}; color: ${bandBadgeColor};">
              Band ${item.band}
            </span>
          </div>
          <div class="fc-pronounce-actions compact">
            <button class="btn-voice-mini uk" onclick="event.stopPropagation(); window.flashcardApp.speak('${this.escapeText(
              item.word
            )}', 'UK')" title="Nghe UK">🇬🇧</button>
            <button class="btn-voice-mini us" onclick="event.stopPropagation(); window.flashcardApp.speak('${this.escapeText(
              item.word
            )}', 'US')" title="Nghe US">🇺🇸</button>
            <button class="btn-voice-mini deep-dive" onclick="event.stopPropagation(); window.lexicalDeepDive.open('${item.id || this.escapeText(item.word)}')" title="Mổ xẻ từ vựng chuẩn chấm thi Lexical Resource">🔬 Deep-Dive</button>
          </div>
        </div>

        <div class="fc-back-body-scroll">
          <!-- Khối Phiên Âm IPA & Dấu nhấn trọng âm -->
          <div class="fc-phonetics-block">
            <div class="fc-ipa-row">
              <span class="ipa-label">🇬🇧 UK:</span>
              <span class="ipa-value">${item.ipaUk}</span>
              <span class="ipa-divider">•</span>
              <span class="ipa-label">🇺🇸 US:</span>
              <span class="ipa-value">${item.ipaUs}</span>
            </div>
            <div class="fc-stress-row">
              <span class="stress-icon">⚡</span>
              <span class="stress-text"><strong>Trọng âm:</strong> ${item.stress}</span>
            </div>
          </div>

          <!-- Định nghĩa tiếng Việt -->
          <div class="fc-definition-vi-box">
            <span class="def-label">Nghĩa tiếng Việt:</span>
            <p class="def-text">${item.definitionVi}</p>
          </div>

          <!-- Định nghĩa tiếng Anh Cambridge -->
          <div class="fc-definition-en-box">
            <span class="def-label">Cambridge Definition:</span>
            <p class="def-text">${item.definitionEn}</p>
          </div>

          <!-- Từ đồng nghĩa & Paraphrase Tags -->
          ${
            item.synonyms && item.synonyms.length > 0
              ? `
            <div class="fc-synonyms-block">
              <span class="block-tag-title">🎯 Từ Đồng Nghĩa &amp; Paraphrase:</span>
              <div class="fc-tag-cloud">
                ${item.synonyms
                  .map(
                    (s) =>
                      `<span class="fc-synonym-tag" onclick="event.stopPropagation(); window.flashcardApp.speak('${s}', 'UK')">${s} 🔊</span>`
                  )
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

          <!-- Cụm Collocations thường gặp -->
          ${
            item.collocations && item.collocations.length > 0
              ? `
            <div class="fc-collocations-block">
              <span class="block-tag-title">🔗 Collocations Hay Gặp:</span>
              <ul class="fc-collocations-list">
                ${item.collocations.map((c) => `<li>• ${c}</li>`).join('')}
              </ul>
            </div>
          `
              : ''
          }

          <!-- Câu ví dụ bối cảnh đề thi IELTS -->
          <div class="fc-example-block">
            <div class="fc-example-header">
              <span class="block-tag-title">📝 Ví dụ trong bài thi IELTS:</span>
              <button class="btn-speak-sentence" onclick="event.stopPropagation(); window.flashcardApp.speak('${this.escapeText(
                item.exampleEn
              )}', 'UK')" title="Đọc toàn bộ câu ví dụ">
                🔊 Nghe câu
              </button>
            </div>
            <blockquote class="fc-example-en">"${item.exampleEn}"</blockquote>
            <p class="fc-example-vi">👉 <em>${item.exampleVi}</em></p>
          </div>
        </div>

        <div class="fc-face-footer back">
          <span class="fc-flip-callout">↺ Nhấp để lật lại mặt trước</span>
        </div>
      </div>
    `;
  }

  // Xử lý sự kiện click trên thẻ
  handleCardClick(event) {
    // Nếu click vào nút phát âm hoặc link thì không lật thẻ
    if (event.target.closest('button') || event.target.closest('.fc-synonym-tag')) {
      return;
    }
    this.flipCard();
  }

  // Lật mặt thẻ 3 chiều
  flipCard() {
    const cardEl = document.getElementById('fc-card-3d');
    if (!cardEl || !this.currentList || this.currentList.length === 0) return;

    this.isFlipped = !this.isFlipped;
    cardEl.classList.toggle('flipped', this.isFlipped);

    // KÍCH HOẠT SRS: Khi lật thẻ xem định nghĩa -> Chuyển sang "🟡 Đang học (Learning)" nếu đang là "⚪ New"
    if (this.isFlipped) {
      const item = this.currentList[this.currentIndex];
      if (item && window.srsManager) {
        const res = window.srsManager.recordFlashcardFlip(item.id, item);
        if (res && res.transitioned) {
          // Cập nhật lại badge trên thẻ
          this.updateCardDisplay();
          this.updateStatsDisplay();
        }
      }
    }

    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Chuyển sang thẻ kế tiếp
  nextCard() {
    if (!this.currentList || this.currentList.length === 0) return;

    if (this.currentIndex < this.currentList.length - 1) {
      this.currentIndex += 1;
      this.isFlipped = false;
      this.updateCardDisplay();
      if (window.soundSystem) window.soundSystem.playClick();
    } else {
      if (window.mascot) {
        window.mascot.say('🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ thẻ trong lượt này!', 3500);
        window.mascot.setMood('happy');
      }
    }
  }

  // Quay về thẻ trước
  prevCard() {
    if (!this.currentList || this.currentList.length === 0) return;

    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.isFlipped = false;
      this.updateCardDisplay();
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  // Đánh dấu "Đã thuộc" (Mastered)
  markMastered() {
    if (!this.currentList || this.currentList.length === 0) return;
    const item = this.currentList[this.currentIndex];

    if (window.srsManager) {
      window.srsManager.recordDirectMaster(item.id, item);
    } else if (window.gamification) {
      const isNew = window.gamification.markVocabMastered(item.id);
      if (isNew) {
        if (window.soundSystem) window.soundSystem.playCorrect();
        if (window.mascot) {
          window.mascot.say(`🎉 Tuyệt đỉnh! Bạn đã thuộc từ "<strong>${item.word}</strong>"! Nhận ngay +10 EXP!`, 3000);
          window.mascot.setMood('happy');
        }
      }
    }

    this.updateStatsDisplay();
    this.updateCardDisplay();

    // Tự động chuyển thẻ kế tiếp sau 350ms
    setTimeout(() => {
      if (this.currentIndex < this.currentList.length - 1) {
        this.nextCard();
      }
    }, 350);
  }

  // Đánh dấu "Cần ôn lại" (Review)
  markReview() {
    if (!this.currentList || this.currentList.length === 0) return;
    const item = this.currentList[this.currentIndex];

    if (window.srsManager) {
      window.srsManager.recordDirectReview(item.id, item);
      if (window.soundSystem) window.soundSystem.playClick();
      if (window.mascot) {
        window.mascot.say(`Đã thêm từ "<strong>${item.word}</strong>" vào danh sách cần ôn tập (Stage 1: +1 ngày)! Cố gắng lên nhé.`, 2500);
      }
    } else if (window.gamification) {
      window.gamification.markVocabReview(item.id);
      if (window.soundSystem) window.soundSystem.playClick();
      if (window.mascot) {
        window.mascot.say(`Đã thêm từ "<strong>${item.word}</strong>" vào danh sách cần ôn tập! Cố gắng lên nhé.`, 2500);
      }
    }

    this.updateStatsDisplay();
    this.updateCardDisplay();

    // Chuyển thẻ kế tiếp
    setTimeout(() => {
      if (this.currentIndex < this.currentList.length - 1) {
        this.nextCard();
      }
    }, 350);
  }

  // Xáo trộn thẻ ngẫu nhiên
  shuffleCards() {
    if (!this.currentList || this.currentList.length <= 1) return;

    // Fisher-Yates shuffle
    for (let i = this.currentList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.currentList[i], this.currentList[j]] = [this.currentList[j], this.currentList[i]];
    }

    this.currentIndex = 0;
    this.isFlipped = false;
    this.updateCardDisplay();

    if (window.soundSystem) window.soundSystem.playClick();
    if (window.mascot) {
      window.mascot.say('🎲 Đã xáo trộn thứ tự các thẻ Flashcard!', 2000);
    }
  }

  // Bật / tắt chế độ tự động lật và chuyển thẻ (Auto-play)
  toggleAutoPlay() {
    const btn = document.getElementById('btn-fc-autoplay');
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      if (btn) btn.innerHTML = '▶️ Tự động';
      if (window.mascot) window.mascot.say('Đã dừng chế độ tự động phát.', 2000);
    } else {
      if (btn) btn.innerHTML = '⏸️ Tạm dừng';
      if (window.mascot) window.mascot.say('Đang chạy chế độ tự động lật và đọc thẻ!', 2500);

      // Chu trình: 0s đọc trước -> 3s lật sau -> 6s chuyển thẻ
      this.autoPlayInterval = setInterval(() => {
        if (!this.isFlipped) {
          this.flipCard();
        } else {
          if (this.currentIndex >= this.currentList.length - 1) {
            this.currentIndex = 0;
          } else {
            this.nextCard();
          }
        }
      }, 4000);
    }
  }

  // Đặt lại toàn bộ bộ lọc
  resetFilters() {
    this.filters = { topic: 'all', band: 'all', status: 'all' };
    const topicSel = document.getElementById('fc-select-topic');
    const bandSel = document.getElementById('fc-select-band');
    const statusSel = document.getElementById('fc-select-status');
    if (topicSel) topicSel.value = 'all';
    if (bandSel) bandSel.value = 'all';
    if (statusSel) statusSel.value = 'all';

    this.applyFilters(true);
    this.updateCardDisplay();
    this.updateStatsDisplay();
  }

  // Phát âm từ vựng qua Web Speech API (Hỗ trợ UK và US)
  speak(text, accent = 'UK') {
    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt không hỗ trợ Web Speech API');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Dừng câu đang đọc nếu có
      const utterance = new SpeechSynthesisUtterance(text);

      const targetLang = accent === 'UK' ? 'en-GB' : 'en-US';
      utterance.lang = targetLang;
      utterance.rate = 0.9; // Tốc độ chuẩn cho người học tiếng Anh
      utterance.pitch = 1.0;

      // Ưu tiên chọn giọng đọc bản xứ phù hợp nhất
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice =
          voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
          voices.find((v) => v.lang.toLowerCase().startsWith(targetLang.toLowerCase().substring(0, 2)));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Lỗi khi phát âm từ vựng:', err);
    }
  }

  // Gắn phím tắt bàn phím tiện lợi
  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Chỉ kích hoạt khi đang ở Tab Flashcard và không gõ trong ô nhập liệu
      if (window.app && window.app.currentTab !== 'flashcard') return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.flipCard();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.nextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.prevCard();
      } else if (e.key === '1') {
        e.preventDefault();
        this.markReview();
      } else if (e.key === '2') {
        e.preventDefault();
        this.markMastered();
      } else if (e.key.toLowerCase() === 'u') {
        e.preventDefault();
        if (this.currentList && this.currentList[this.currentIndex]) {
          this.speak(this.currentList[this.currentIndex].word, 'UK');
        }
      } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (this.currentList && this.currentList[this.currentIndex]) {
          this.speak(this.currentList[this.currentIndex].word, 'US');
        }
      }
    });
  }

  escapeText(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Khởi tạo Singleton cho Flashcard App
window.flashcardApp = new IeltsFlashcardApp();
