/**
 * IELTS GO! - Chế Độ 7: Ngữ Pháp & Ghép Câu Học Thuật (Grammar Vault & Sentence Scramble)
 * 1. Thư viện 25 Chủ điểm ngữ pháp trọng tâm phân loại theo Band điểm
 * 2. Game Ghép câu học thuật (Sentence Scramble) hỗ trợ tương tác chọn chip mượt mà,
 *    kiểm tra đáp án tức thì, giải thích chi tiết cấu trúc câu và tích hợp Gamification
 */

class IeltsGrammarApp {
  constructor() {
    this.container = null;
    this.activeView = 'vault'; // 'vault' (25 Chủ điểm) hoặc 'scramble' (Game ghép câu)

    // Bộ lọc Grammar Vault
    this.bandFilter = 'ALL'; // 'ALL', '4.5-6.0', '6.0-7.5+'
    this.searchKeyword = '';
    this.expandedTopicId = 'topic-01';

    // Trạng thái Game Ghép Câu (Sentence Scramble)
    this.scrambleIndex = 0;
    this.placedTokens = []; // Các mảnh từ đã xếp vào câu: [{ id, text }]
    this.bankTokens = []; // Các mảnh từ còn trong ngân hàng từ: [{ id, text }]
    this.feedback = null; // { isCorrect: boolean, message: string }
    this.consecutiveStreak = 0;
    this.totalExpEarned = 0;
    this.completedChallenges = new Set();
  }

  // Khởi tạo và render vào container
  render(containerId = 'grammar-scramble-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (this.activeView === 'scramble' && this.bankTokens.length === 0 && this.placedTokens.length === 0) {
      this.initChallenge(this.scrambleIndex);
    }

    this.renderMainUI();
  }

  // Chuyển đổi giữa 2 chế độ con
  switchView(view) {
    this.activeView = view;
    if (view === 'scramble' && this.bankTokens.length === 0 && this.placedTokens.length === 0) {
      this.initChallenge(this.scrambleIndex);
    }
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderMainUI();
  }

  // Khởi tạo một câu ghép mới
  initChallenge(index) {
    const challenges = window.IELTS_SCRAMBLE_CHALLENGES || [];
    if (!challenges.length) return;

    this.scrambleIndex = Math.max(0, Math.min(index, challenges.length - 1));
    const challenge = challenges[this.scrambleIndex];

    this.placedTokens = [];
    this.feedback = null;

    // Tạo danh sách token với ID duy nhất và xáo trộn ngẫu nhiên
    const tokens = challenge.scrambledTokens.map((text, idx) => ({
      id: `token-${this.scrambleIndex}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      text: text.trim()
    }));

    // Xáo trộn mảng theo thuật toán Fisher-Yates
    this.bankTokens = this.shuffleArray([...tokens]);
  }

  shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Render toàn bộ giao diện chính
  renderMainUI() {
    if (!this.container) return;

    const challenges = window.IELTS_SCRAMBLE_CHALLENGES || [];
    const completedCount = this.completedChallenges.size;

    this.container.innerHTML = `
      <div class="grammar-app-shell">
        <!-- HEADER ROYAL BANNER -->
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #15803D 0%, #064E3B 50%, #0F172A 100%); margin-bottom: 20px; border-radius: var(--border-radius-lg); padding: 22px 24px; color: #FFFFFF; box-shadow: var(--box-shadow);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span style="background: #DCFCE7; color: #166534; font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: var(--border-radius-full); text-transform: uppercase; letter-spacing: 0.5px;">Mô-đun #07 • Oxford Academic Grammar</span>
                <span style="background: rgba(255,255,255,0.15); color: #FEF3C7; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: var(--border-radius-full);">🔥 Cambridge C1/C2</span>
              </div>
              <h2 style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
                <span>📐 Ngữ Pháp &amp; Ghép Câu Học Thuật</span>
              </h2>
              <p style="font-size: 13px; color: #BBF7D0; margin: 0; max-width: 650px; line-height: 1.45;">
                25 chủ điểm ngữ pháp tinh hoa Cambridge (Đảo ngữ, Mệnh đề phân từ, Danh từ hóa, Câu chẻ) và Game ghép câu tương tác chuẩn Band 7.5+.
              </p>
            </div>

            <!-- CHUYỂN ĐỔI CHẾ ĐỘ CON (SUB-TABS) -->
            <div class="grammar-subnav-pill">
              <button class="grammar-subnav-btn ${this.activeView === 'vault' ? 'active' : ''}" onclick="window.grammarScrambleApp.switchView('vault')">
                <span>📚 25 Chủ Điểm Ngữ Pháp</span>
              </button>
              <button class="grammar-subnav-btn ${this.activeView === 'scramble' ? 'active' : ''}" onclick="window.grammarScrambleApp.switchView('scramble')">
                <span>🧩 Game Ghép Câu (${completedCount}/${challenges.length})</span>
              </button>
            </div>
          </div>
        </div>

        <!-- MAIN VIEW CONTAINER -->
        <div class="grammar-body-content">
          ${this.activeView === 'vault' ? this.renderVaultViewHtml() : this.renderScrambleViewHtml()}
        </div>
      </div>
    `;
  }

  // ================= VIEW 1: 25 CHỦ ĐIỂM NGỮ PHÁP (GRAMMAR VAULT) =================
  renderVaultViewHtml() {
    const allTopics = window.IELTS_GRAMMAR_TOPICS || [];

    // Lọc theo Band
    let filtered = allTopics;
    if (this.bandFilter !== 'ALL') {
      filtered = filtered.filter(t => t.bandTier === this.bandFilter);
    }

    // Lọc theo từ khóa tìm kiếm
    if (this.searchKeyword.trim()) {
      const q = this.searchKeyword.toLowerCase().trim();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.titleEn.toLowerCase().includes(q) ||
        t.formula.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    return `
      <!-- THANH ĐIỀU HƯỚNG BỘ LỌC & TÌM KIẾM -->
      <div class="grammar-filter-bar">
        <div class="grammar-tier-pills">
          <button class="tier-pill-btn ${this.bandFilter === 'ALL' ? 'active' : ''}" onclick="window.grammarScrambleApp.setBandFilter('ALL')">
            🌐 Tất Cả (${allTopics.length})
          </button>
          <button class="tier-pill-btn ${this.bandFilter === '4.5-6.0' ? 'active' : ''}" onclick="window.grammarScrambleApp.setBandFilter('4.5-6.0')">
            🟢 Band &lt; 4.5 &amp; 4.5 - 6.0: Nền Tảng &amp; Quy Trình Task 1 (12)
          </button>
          <button class="tier-pill-btn ${this.bandFilter === '6.0-7.5+' ? 'active' : ''}" onclick="window.grammarScrambleApp.setBandFilter('6.0-7.5+')">
            🟣 Band 6.0 - 7.5 &amp; 7.5+: Đảo Ngữ &amp; Danh Từ Hóa Bứt Phá (13)
          </button>
        </div>

        <div class="grammar-search-box">
          <span style="color: #94A3B8; font-size: 14px;">🔍</span>
          <input
            type="text"
            placeholder="Tìm theo chủ điểm, công thức (inversion, passive, subjunctive...)..."
            value="${this.escapeHtml(this.searchKeyword)}"
            oninput="window.grammarScrambleApp.handleSearch(this.value)"
          />
          ${this.searchKeyword ? `<button class="btn-clear-search" onclick="window.grammarScrambleApp.clearSearch()">✕</button>` : ''}
        </div>
      </div>

      <!-- DANH SÁCH CÁC CHỦ ĐIỂM (TOPICS LIST) -->
      ${filtered.length === 0 ? `
        <div style="text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--border-radius-md); border: 1.5px dashed #CBD5E1;">
          <p style="font-size: 40px; margin-bottom: 8px;">🔍</p>
          <h4 style="font-size: 16px; font-weight: 800; color: #1E293B;">Không tìm thấy chủ điểm ngữ pháp phù hợp</h4>
          <p style="font-size: 13px; color: #64748B;">Hãy thử tìm kiếm với từ khóa khác như "bị động", "so sánh", "đảo ngữ", "phân từ".</p>
        </div>
      ` : `
        <div class="grammar-topics-grid">
          ${filtered.map(topic => this.renderTopicCardHtml(topic)).join('')}
        </div>
      `}
    `;
  }

  renderTopicCardHtml(topic) {
    const isExpanded = this.expandedTopicId === topic.id;
    const isAdvanced = topic.bandTier === '6.0-7.5+';

    return `
      <div class="grammar-topic-card ${isExpanded ? 'expanded' : ''}" id="card-${topic.id}">
        <!-- HEADER TOPIC CARD -->
        <div class="topic-card-header" onclick="window.grammarScrambleApp.toggleTopicExpand('${topic.id}')">
          <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
            <div class="topic-number-badge ${isAdvanced ? 'badge-advanced' : 'badge-foundation'}">
              #${topic.num < 10 ? '0' + topic.num : topic.num}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px; flex-wrap: wrap;">
                <span class="topic-band-pill ${isAdvanced ? 'pill-advanced' : 'pill-foundation'}">
                  ${topic.bandBadge}
                </span>
                <span class="topic-cat-tag">${topic.category}</span>
              </div>
              <h3 class="topic-title-vn">${topic.title}</h3>
              <p class="topic-title-en">${topic.titleEn}</p>
            </div>
          </div>
          <div class="topic-expand-icon">
            ${isExpanded ? '▲' : '▼'}
          </div>
        </div>

        <!-- FORMULA SUMMARY PREVIEW -->
        <div class="topic-formula-box">
          <div class="formula-label">📐 CÔNG THỨC &amp; CẤU TRÚC:</div>
          <code class="formula-code">${this.escapeHtml(topic.formula)}</code>
        </div>

        <!-- EXPANDED DETAILED CONTENT -->
        ${isExpanded ? `
          <div class="topic-expanded-body">
            <!-- 1. CÁCH DÙNG TRONG WRITING & SPEAKING -->
            <div class="topic-section">
              <h4 class="section-title">
                <span>🎯 Ứng Dụng Trong Bài Thi IELTS</span>
              </h4>
              <div class="usage-grid">
                <div class="usage-col">
                  <div class="usage-header" style="color: #B45309;">
                    <span>✍️ Academic Writing (Task 1 &amp; Task 2)</span>
                  </div>
                  <p class="usage-text">${topic.application.writing}</p>
                </div>
                <div class="usage-col">
                  <div class="usage-header" style="color: #0284C7;">
                    <span>🎤 IELTS Speaking (Part 1, 2, 3)</span>
                  </div>
                  <p class="usage-text">${topic.application.speaking}</p>
                </div>
              </div>
            </div>

            <!-- 2. LỖI THƯỜNG GẶP & CÁCH KHẮC PHỤC (COMMON PITFALLS) -->
            <div class="topic-section">
              <h4 class="section-title">
                <span style="color: #DC2626;">⚠️ Lỗi Thường Gặp Cần Tránh (Common Pitfalls)</span>
              </h4>
              <div class="pitfalls-list">
                ${topic.commonMistakes.map(m => `
                  <div class="pitfall-item">
                    <div class="pitfall-diff-row">
                      <div class="diff-box diff-incorrect">
                        <span class="diff-tag tag-wrong">❌ SAI</span>
                        <code>${this.escapeHtml(m.incorrect)}</code>
                      </div>
                      <div class="diff-box diff-correct">
                        <span class="diff-tag tag-right">✅ CHUẨN IELTS</span>
                        <code>${this.escapeHtml(m.correct)}</code>
                      </div>
                    </div>
                    <p class="pitfall-explanation">
                      <strong>💡 Giám Khảo Phân Tích:</strong> ${m.explanation}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 3. VÍ DỤ MINH HỌA CAMBRIDGE CHUẨN MỰC -->
            <div class="topic-section">
              <h4 class="section-title">
                <span style="color: #15803D;">📖 Ví Dụ Minh Họa Chuẩn Khảo Thí Cambridge</span>
              </h4>
              <div class="examples-list">
                ${topic.examples.map(ex => `
                  <div class="example-item">
                    <p class="example-en">"${this.escapeHtml(ex.en)}"</p>
                    <p class="example-vi">🇻🇳 ${this.escapeHtml(ex.vi)}</p>
                    <div class="example-analysis">
                      <strong>🔍 Phân tích cấu trúc:</strong> ${ex.analysis}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 4. LỜI KHUYÊN GIÁM KHẢO VICTORIA AI -->
            <div class="examiner-tip-banner">
              <div class="tip-avatar">👩‍🏫</div>
              <div class="tip-content">
                <div class="tip-title">Lời Khuyên Của Giám Khảo Victoria AI:</div>
                <p class="tip-desc">${topic.examinerTip}</p>
              </div>
            </div>

            <!-- NÚT CHUYỂN SANG GAME GHÉP CÂU -->
            <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
              <button class="btn-quick-scramble" onclick="window.grammarScrambleApp.launchScrambleForTopic('${topic.id}')">
                <span>🧩 Thử Thách Ghép Câu Về Chủ Điểm Này</span>
                <span>➡️</span>
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ================= VIEW 2: GAME GHÉP CÂU HỌC THUẬT (SENTENCE SCRAMBLE) =================
  renderScrambleViewHtml() {
    const challenges = window.IELTS_SCRAMBLE_CHALLENGES || [];
    if (!challenges.length) {
      return `<p style="padding: 40px; text-align: center;">Chưa có dữ liệu câu đố ghép câu.</p>`;
    }

    const current = challenges[this.scrambleIndex];
    const isCompleted = this.completedChallenges.has(current.id);
    const totalCount = challenges.length;

    return `
      <div class="scramble-game-container">
        <!-- GAME TOP HUD -->
        <div class="scramble-hud-bar">
          <div class="scramble-hud-col">
            <span class="hud-label">TIẾN ĐỘ THỬ THÁCH</span>
            <div class="hud-value" style="color: #15803D;">
              Câu ${this.scrambleIndex + 1} / ${totalCount}
              ${isCompleted ? ' <span style="color: #16A34A; font-size: 13px;">(Đã vượt qua ✅)</span>' : ''}
            </div>
          </div>

          <div class="scramble-hud-col">
            <span class="hud-label">CHUỖI ĐÚNG LIÊN TIẾP</span>
            <div class="hud-value" style="color: #D97706;">
              🔥 ${this.consecutiveStreak} Câu
            </div>
          </div>

          <div class="scramble-hud-col">
            <span class="hud-label">MỤC TIÊU BAND ĐIỂM</span>
            <div class="hud-value" style="color: #7C3AED;">
              🎯 ${current.targetBand}
            </div>
          </div>

          <div class="scramble-hud-col">
            <span class="hud-label">PHẦN THƯỞNG MỖI CÂU</span>
            <div class="hud-value" style="color: #1E40AF;">
              ⭐ +30 EXP &bull; 👑 +2
            </div>
          </div>
        </div>

        <!-- CHALLENGE CARD -->
        <div class="scramble-card">
          <!-- BREADCRUMB & CONTEXT -->
          <div class="scramble-card-meta">
            <span class="context-badge">📌 ${current.taskContext}</span>
            <span class="grammar-badge">📐 ${current.grammarPoint}</span>
          </div>

          <!-- VIETNAMESE PROMPT BANNER -->
          <div class="vietnamese-prompt-box">
            <div class="vn-label">🇻🇳 CÂU HỌC THUẬT CẦN GHÉP:</div>
            <h3 class="vn-text">"${current.vietnamesePrompt}"</h3>
          </div>

          <!-- ANSWER SLOTS AREA (VÙNG XẾP CÂU) -->
          <div class="sentence-slots-wrapper">
            <div class="slots-header">
              <span class="slots-title">✨ Khung Ghép Câu Hoàn Chỉnh:</span>
              <span class="slots-count">
                Đã xếp ${this.placedTokens.length} / ${current.scrambledTokens.length} mảnh từ
              </span>
            </div>

            <div class="sentence-slots-box ${this.feedback ? (this.feedback.isCorrect ? 'slot-correct' : 'slot-wrong') : ''}">
              ${this.placedTokens.length === 0 ? `
                <div class="slots-empty-placeholder">
                  <span>👆 Nhấp vào các mảnh từ vựng bên dưới theo đúng thứ tự ngữ pháp học thuật...</span>
                </div>
              ` : `
                <div class="chips-placed-list">
                  ${this.placedTokens.map((token, idx) => `
                    <div class="token-chip chip-placed" onclick="window.grammarScrambleApp.removeToken('${token.id}')">
                      <span class="chip-idx">${idx + 1}</span>
                      <span class="chip-text">${this.escapeHtml(token.text)}</span>
                      <span class="chip-remove-btn" title="Gỡ từ này">✕</span>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>

          <!-- WORD BANK (KHO MẢNH TỪ) -->
          <div class="word-bank-wrapper">
            <div class="bank-header">
              <span class="bank-title">📦 Kho Từ Vựng &amp; Cụm Từ (Nhấp để đưa vào câu):</span>
              <div class="bank-quick-actions">
                <button class="btn-bank-action" onclick="window.grammarScrambleApp.shuffleBank()" title="Xáo trộn lại kho từ">
                  🔄 Xáo Trộn
                </button>
                <button class="btn-bank-action" onclick="window.grammarScrambleApp.giveHint()" title="Nhận gợi ý từ tiếp theo">
                  💡 Gợi Ý Từ Tiếp Theo
                </button>
                <button class="btn-bank-action btn-clear" onclick="window.grammarScrambleApp.clearAllSlots()" title="Xóa toàn bộ câu">
                  🧹 Xóa Hết
                </button>
              </div>
            </div>

            <div class="word-bank-chips-box">
              ${this.bankTokens.length === 0 ? `
                <div style="font-size: 12px; color: #64748B; font-style: italic; padding: 10px;">
                  Đã sử dụng hết toàn bộ từ trong kho. Hãy nhấp "Kiểm Tra Đáp Án" bên dưới!
                </div>
              ` : `
                ${this.bankTokens.map(token => `
                  <button class="token-chip chip-bank" onclick="window.grammarScrambleApp.placeToken('${token.id}')">
                    <span>${this.escapeHtml(token.text)}</span>
                  </button>
                `).join('')}
              `}
            </div>
          </div>

          <!-- ACTION BUTTONS -->
          <div class="scramble-actions-bar">
            <button
              class="btn-scramble-prev"
              onclick="window.grammarScrambleApp.prevChallenge()"
              ${this.scrambleIndex === 0 ? 'disabled' : ''}
            >
              ⬅️ Câu Trước
            </button>

            <button
              class="btn-scramble-submit"
              onclick="window.grammarScrambleApp.checkAnswer()"
              ${this.placedTokens.length === 0 ? 'disabled' : ''}
            >
              ✅ Kiểm Tra Đáp Án Ngữ Pháp
            </button>

            <button
              class="btn-scramble-next"
              onclick="window.grammarScrambleApp.nextChallenge()"
              ${this.scrambleIndex === totalCount - 1 ? 'disabled' : ''}
            >
              Câu Kế Tiếp ➡️
            </button>
          </div>

          <!-- FEEDBACK & GRAMMAR BREAKDOWN DRAWER -->
          ${this.feedback ? this.renderFeedbackDrawerHtml(current) : ''}
        </div>
      </div>
    `;
  }

  renderFeedbackDrawerHtml(current) {
    const isCorrect = this.feedback.isCorrect;

    return `
      <div class="scramble-feedback-drawer ${isCorrect ? 'drawer-correct' : 'drawer-wrong'}">
        <!-- BANNER THÔNG BÁO -->
        <div class="feedback-banner">
          <div class="feedback-icon">${isCorrect ? '🎉' : '⚠️'}</div>
          <div class="feedback-text-wrap">
            <h4 class="feedback-headline">
              ${isCorrect ? 'CHÍNH XÁC XUẤT SẮC! CẤU TRÚC ĐẠT CHUẨN BAND 7.5+' : 'CHƯA HOÀN TOÀN CHÍNH XÁC'}
            </h4>
            <p class="feedback-sub">
              ${this.feedback.message}
            </p>
          </div>
          ${isCorrect ? `
            <div class="reward-pill">
              <span>⭐ +30 EXP</span>
              <span>👑 +2</span>
            </div>
          ` : ''}
        </div>

        <!-- NẾU SAI: HIỂN THỊ ĐÁP ÁN CHUẨN ĐỐI CHIẾU -->
        ${!isCorrect ? `
          <div class="correct-answer-reference">
            <div class="ref-title">🔑 Thứ Tự Ghép Chuẩn Khảo Thí:</div>
            <div class="ref-sentence">
              "${current.correctOrder.join(' ')}"
            </div>
          </div>
        ` : ''}

        <!-- PHÂN TÍCH NGỮ PHÁP CHUYÊN SÂU (GRAMMAR BREAKDOWN) -->
        <div class="breakdown-container">
          <h5 class="breakdown-title">
            <span>🔬 Phân Tích Cú Pháp Học Thuật &amp; Bẻ Khóa Cấu Trúc:</span>
          </h5>
          <p class="breakdown-desc">${current.explanation}</p>

          <!-- TỪ VỰNG & COLLOCATION ĂN ĐIỂM -->
          ${current.vocabularyHighlights && current.vocabularyHighlights.length ? `
            <div class="vocab-highlights-box">
              <div class="vocab-hl-title">🌟 Từ Vựng &amp; Collocation Ăn Điểm C1/C2 Trong Câu:</div>
              <div class="vocab-hl-grid">
                ${current.vocabularyHighlights.map(v => `
                  <div class="vocab-hl-item">
                    <span class="vh-word">${v.word}</span>
                    <span class="vh-type">(${v.type})</span>
                    <span class="vh-meaning">: ${v.meaning}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- NÚT TIẾP TỤC SAU KHI ĐÚNG -->
        ${isCorrect ? `
          <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
            <button class="btn-continue-next" onclick="window.grammarScrambleApp.nextChallenge()">
              <span>Tiếp Tục Câu Tiếp Theo</span>
              <span>🚀</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ================= TƯƠNG TÁC NGƯỜI DÙNG & LOGIC GAME =================

  // Đưa mảnh từ từ ngân hàng lên khung câu
  placeToken(tokenId) {
    const idx = this.bankTokens.findIndex(t => t.id === tokenId);
    if (idx === -1) return;

    const [token] = this.bankTokens.splice(idx, 1);
    this.placedTokens.push(token);

    if (window.soundSystem) window.soundSystem.playClick();
    this.feedback = null; // Xóa kết quả kiểm tra cũ khi có chỉnh sửa
    this.renderMainUI();
  }

  // Gỡ mảnh từ trong câu trả lại ngân hàng
  removeToken(tokenId) {
    const idx = this.placedTokens.findIndex(t => t.id === tokenId);
    if (idx === -1) return;

    const [token] = this.placedTokens.splice(idx, 1);
    this.bankTokens.push(token);

    if (window.soundSystem) window.soundSystem.playClick();
    this.feedback = null;
    this.renderMainUI();
  }

  // Xóa toàn bộ câu về ngân hàng
  clearAllSlots() {
    if (this.placedTokens.length === 0) return;
    this.bankTokens.push(...this.placedTokens);
    this.placedTokens = [];
    this.feedback = null;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderMainUI();
  }

  // Xáo trộn lại kho từ
  shuffleBank() {
    this.bankTokens = this.shuffleArray(this.bankTokens);
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderMainUI();
  }

  // Gợi ý từ kế tiếp đúng theo đáp án
  giveHint() {
    const challenges = window.IELTS_SCRAMBLE_CHALLENGES || [];
    const current = challenges[this.scrambleIndex];
    if (!current) return;

    const nextIndex = this.placedTokens.length;
    if (nextIndex >= current.correctOrder.length) return;

    const expectedText = current.correctOrder[nextIndex];

    // Tìm trong kho từ mảnh có nội dung khớp
    let tokenIndex = this.bankTokens.findIndex(t => t.text === expectedText);
    if (tokenIndex !== -1) {
      const [token] = this.bankTokens.splice(tokenIndex, 1);
      this.placedTokens.push(token);
    } else {
      // Nếu đã xếp nhầm ở vị trí khác trong placedTokens, nhặt ra và chuyển đến vị trí này
      tokenIndex = this.placedTokens.findIndex((t, i) => i !== nextIndex && t.text === expectedText);
      if (tokenIndex !== -1) {
        const [token] = this.placedTokens.splice(tokenIndex, 1);
        this.placedTokens.push(token);
      }
    }

    if (window.soundSystem) window.soundSystem.playClick();
    this.feedback = null;
    this.renderMainUI();
  }

  // Kiểm tra đáp án câu ghép
  checkAnswer() {
    const challenges = window.IELTS_SCRAMBLE_CHALLENGES || [];
    const current = challenges[this.scrambleIndex];
    if (!current) return;

    const userSentence = this.placedTokens.map(t => t.text).join(' ').trim();
    const targetSentence = current.correctOrder.join(' ').trim();

    const isMatch = userSentence.toLowerCase() === targetSentence.toLowerCase();

    if (isMatch) {
      this.consecutiveStreak++;
      this.totalExpEarned += 30;
      this.completedChallenges.add(current.id);

      // Thưởng EXP & Vương Miện vào Gamification HUD
      if (window.gamification) {
        window.gamification.addExp(30);
        window.gamification.addCrowns(2);
      }
      if (window.soundSystem) window.soundSystem.playCorrect();

      this.feedback = {
        isCorrect: true,
        message: 'Bạn đã áp dụng chính xác quy tắc ngữ pháp học thuật, từ nối và vị trí các mệnh đề.'
      };

      if (window.mascot) {
        window.mascot.say(`Tuyệt vời! Bạn đã ghép đúng câu <strong>${current.grammarPoint}</strong> (+30 EXP, +2 👑)!`, 4000);
      }
    } else {
      this.consecutiveStreak = 0;
      if (window.soundSystem) window.soundSystem.playWrong();

      this.feedback = {
        isCorrect: false,
        message: 'Thứ tự ngữ pháp hoặc vị trí của một số từ nối chưa hoàn toàn chính xác. Hãy đối chiếu đáp án chuẩn bên dưới hoặc dùng nút "Gợi Ý" để điều chỉnh lại.'
      };
    }

    this.renderMainUI();

    // Cuộn nhẹ xuống feedback nếu cần
    const drawer = document.querySelector('.scramble-feedback-drawer');
    if (drawer) {
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Câu trước
  prevChallenge() {
    if (this.scrambleIndex > 0) {
      this.initChallenge(this.scrambleIndex - 1);
      if (window.soundSystem) window.soundSystem.playClick();
      this.renderMainUI();
    }
  }

  // Câu kế tiếp
  nextChallenge() {
    const challenges = window.IELTS_SCRAMBLE_CHALLENGES || [];
    if (this.scrambleIndex < challenges.length - 1) {
      this.initChallenge(this.scrambleIndex + 1);
    } else {
      // Đã làm hết toàn bộ câu, quay lại câu đầu
      this.initChallenge(0);
    }
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderMainUI();
  }

  // Kích hoạt ghép câu từ thẻ chủ điểm ở View 1
  launchScrambleForTopic(topicId) {
    // Chuyển sang View Scramble
    this.activeView = 'scramble';

    // Thử tìm câu challenge phù hợp
    const challenges = window.IELTS_SCRAMBLE_CHALLENGES || [];
    const num = parseInt(topicId.replace('topic-', ''), 10);
    const targetIdx = (num - 1) % challenges.length;

    this.initChallenge(targetIdx);
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderMainUI();
  }

  // Bộ lọc theo Band điểm
  setBandFilter(tier) {
    this.bandFilter = tier;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderMainUI();
  }

  // Tìm kiếm
  handleSearch(kw) {
    this.searchKeyword = kw;
    this.renderMainUI();
  }

  clearSearch() {
    this.searchKeyword = '';
    this.renderMainUI();
  }

  // Mở rộng / thu gọn thẻ chủ điểm
  toggleTopicExpand(topicId) {
    this.expandedTopicId = this.expandedTopicId === topicId ? null : topicId;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderMainUI();
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
}

// Khởi tạo Singleton
window.grammarScrambleApp = new IeltsGrammarApp();
