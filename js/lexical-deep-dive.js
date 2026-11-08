/**
 * IELTS GO! - IELTS Lexical Deep-Dive Card Component & Controller
 * Mô-đun phân tích chuyên sâu từ vựng chuẩn chấm thi Lexical Resource
 * Tích hợp:
 * 1. Thông tin cốt lõi (Headword, POS, Band, CEFR, UK/US IPA, Biểu đồ trọng âm Syllable Pitch Visualizer)
 * 2. 🔄 Thang Nâng Cấp Band (Band Upgrade / Paraphrase Ladder: Band 4.0 -> Band 6.0 -> Band 7.5+)
 * 3. 🧩 Gia Đình Từ & Collocations Thực Chiến (Word Family & Useful Collocations)
 * 4. 📜 Câu Ví Dụ Chuẩn IELTS Academic Context (Speaking & Writing)
 * 5. Tương tác đa giác quan: Phát âm Web Speech API, Gamification (+15 EXP), Đồng bộ Gatekeeper & Flashcard 3D
 */

class IeltsLexicalDeepDive {
  constructor() {
    this.currentData = null;
    this.history = [];
    this.activeTab = 'all'; // 'all' | 'ladder' | 'family' | 'academic'
    this.modalEl = null;
    this.isOpen = false;

    this.init();
  }

  init() {
    // Tự động kiểm tra hoặc gắn modal shell vào DOM
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setupModalShell());
      } else {
        this.setupModalShell();
      }
      this.bindShortcuts();
    }
  }

  setupModalShell() {
    let modal = document.getElementById('lexical-deep-dive-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lexical-deep-dive-modal';
      modal.className = 'modal-overlay lexical-modal-overlay';
      modal.onclick = (e) => {
        if (e.target === modal) this.close();
      };
      modal.innerHTML = `
        <div class="modal-content-shell lexical-modal-shell" id="lexical-modal-content">
          <!-- Nội dung render động qua this.render() -->
        </div>
      `;
      document.body.appendChild(modal);
    }
    this.modalEl = modal;
  }

  /**
   * Mở thẻ Lexical Deep-Dive cho bất kỳ từ hoặc ID nào
   */
  open(wordOrId) {
    if (!wordOrId) return;

    if (!window.IeltsLexicalDataHelper) {
      console.error('IeltsLexicalDataHelper chưa được nạp!');
      return;
    }

    const data = window.IeltsLexicalDataHelper.getDeepDiveData(wordOrId);
    if (!data) {
      alert(`Không tìm thấy dữ liệu Lexical Deep-Dive cho từ: "${wordOrId}"`);
      return;
    }

    if (this.currentData && this.currentData.word !== data.word) {
      this.history.push(this.currentData.word);
    }
    this.currentData = data;
    this.activeTab = 'all';

    this.setupModalShell();
    const contentEl = document.getElementById('lexical-modal-content');
    if (contentEl) {
      contentEl.innerHTML = this.renderCardHtml(this.currentData, true);
    }

    if (this.modalEl) {
      this.modalEl.classList.add('show');
      this.isOpen = true;
      document.body.style.overflow = 'hidden'; // Ngăn cuộn nền
    }

    // Tự động phát âm từ vựng khi vừa mở (giọng UK tự nhiên)
    setTimeout(() => {
      this.speak(this.currentData.word, 'UK');
    }, 350);

    // Kích hoạt SRS: Ghi nhận học tập Deep-Dive chuyển sang "🟡 Đang học (Learning)"
    if (window.srsManager && this.currentData) {
      window.srsManager.recordDeepDive(this.currentData.id || this.currentData.word, this.currentData);
    }

    // Kích hoạt âm thanh mở thẻ
    if (window.soundSystem && typeof window.soundSystem.playClick === 'function') {
      window.soundSystem.playClick();
    }
  }

  /**
   * Đóng modal
   */
  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove('show');
    }
    this.isOpen = false;
    document.body.style.overflow = '';
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Quay lại từ trước đó trong lịch sử tra cứu
   */
  goBack() {
    if (this.history.length > 0) {
      const prevWord = this.history.pop();
      const data = window.IeltsLexicalDataHelper.getDeepDiveData(prevWord);
      if (data) {
        this.currentData = data;
        const contentEl = document.getElementById('lexical-modal-content');
        if (contentEl) {
          contentEl.innerHTML = this.renderCardHtml(this.currentData, true);
        }
      }
    }
  }

  /**
   * Chuyển tab hiển thị trên thẻ Deep-Dive
   */
  switchTab(tabName) {
    this.activeTab = tabName;
    const contentEl = document.getElementById('lexical-modal-content');
    if (contentEl && this.currentData) {
      contentEl.innerHTML = this.renderCardHtml(this.currentData, true);
    }
  }

  /**
   * Render toàn bộ HTML cho Thẻ IELTS Lexical Deep-Dive Card
   */
  renderCardHtml(data, isModal = true) {
    if (!data) return '';

    const isMastered =
      typeof window !== 'undefined' && window.gamification && window.gamification.state
        ? (window.gamification.state.masteredVocabIds || []).includes(data.id)
        : false;

    const syllablesHtml = this.renderPitchStressVisualizer(data.phoneticDetails, data.word);
    const upgradeLadderHtml = this.renderUpgradeLadder(data.upgradeLadder, data.examinerTips);
    const wordFamilyHtml = this.renderWordFamily(data.wordFamily, data.nominalisationExample);
    const collocationsHtml = this.renderCollocations(data.collocations);
    const academicContextHtml = this.renderAcademicContext(data.speakingContext, data.writingContext);

    return `
      <div class="lexical-deep-dive-card" id="lexical-card-${data.id}">
        <!-- HEADER THANH ĐIỀU HƯỚNG VÀ DANH MỤC -->
        <div class="ldd-header">
          <div class="ldd-header-left">
            ${
              this.history.length > 0
                ? `<button class="btn-ldd-back" onclick="window.lexicalDeepDive.goBack()" title="Quay lại từ trước">← Quay Lại</button>`
                : ''
            }
            <span class="ldd-topic-badge" style="background: rgba(99, 102, 241, 0.1); color: #4F46E5; border: 1px solid rgba(99, 102, 241, 0.25);">
              ${data.topicIcon || '📖'} ${data.topicName || 'IELTS Lexical Resource'}
            </span>
            <span class="ldd-band-badge" style="background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF;">
              🎯 ${data.bandLevel} • ${data.cefr}
            </span>
            <span class="ldd-pos-badge">
              ${data.posLabel || (data.partOfSpeech || '').toUpperCase()}
            </span>
          </div>

          <div class="ldd-header-right">
            <button class="btn-ldd-action copy" onclick="window.lexicalDeepDive.copyWordSummary()" title="Sao chép toàn bộ thông tin học thuật của từ vựng này">
              📋 Sao Chép
            </button>
            ${
              isModal
                ? `<button class="btn-ldd-close" onclick="window.lexicalDeepDive.close()" title="Đóng hộp thoại (Phím Esc)">&times;</button>`
                : ''
            }
          </div>
        </div>

        <!-- 1. THÔNG TIN CỐT LÕI (CORE INFORMATION & HEADWORD) -->
        <div class="ldd-core-hero">
          <div class="ldd-word-title-row">
            <h1 class="ldd-headword">${data.word}</h1>
            <div class="ldd-audio-pair">
              <button class="btn-ldd-speak uk" onclick="window.lexicalDeepDive.speak('${this.escapeText(data.word)}', 'UK')" title="Nghe phát âm chuẩn giọng Anh (UK Accent - Phím U)">
                <span class="flag-icon">🇬🇧</span>
                <span class="audio-label">UK Audio</span>
                <span class="ipa-pill">${data.ipaUk}</span>
              </button>
              <button class="btn-ldd-speak us" onclick="window.lexicalDeepDive.speak('${this.escapeText(data.word)}', 'US')" title="Nghe phát âm chuẩn giọng Mỹ (US Accent - Phím A)">
                <span class="flag-icon">🇺🇸</span>
                <span class="audio-label">US Audio</span>
                <span class="ipa-pill">${data.ipaUs}</span>
              </button>
            </div>
          </div>

          <!-- ĐỊNH NGHĨA SONG NGỮ ANH - VIỆT -->
          <div class="ldd-definitions-box">
            <div class="ldd-def-item vi">
              <span class="def-badge vi">🇻🇳 NGHĨA TIẾNG VIỆT</span>
              <p class="def-content vi">${data.definitionVi}</p>
            </div>
            <div class="ldd-def-item en">
              <span class="def-badge en">🇬🇧 CAMBRIDGE DEFINITION</span>
              <p class="def-content en">${data.definitionEn}</p>
            </div>
          </div>

          <!-- BIỂU ĐỒ TRỌNG ÂM THỊ GIÁC (WORD STRESS PATTERN & PITCH VISUALIZER) -->
          <div class="ldd-stress-visualizer-card">
            <div class="stress-viz-header">
              <div class="stress-title-group">
                <span class="stress-icon-badge">⚡</span>
                <strong>BIỂU ĐỒ TRỌNG ÂM & CAO ĐỘ (WORD STRESS & PITCH ACCENT)</strong>
              </div>
              <span class="stress-pattern-code">${data.phoneticDetails.patternCode || '[o O o o]'}</span>
            </div>

            <!-- Khung vẽ các khối âm tiết cao độ kiểu NIHONGO GO! -->
            ${syllablesHtml}

            <!-- Lời khuyên phát âm & lỗi thí sinh Việt Nam -->
            <div class="stress-tips-grid">
              <div class="stress-tip-box rule">
                <span class="tip-icon">🎯</span>
                <div class="tip-text">
                  <strong>Quy tắc nhấn âm:</strong> ${data.phoneticDetails.stressRule}
                </div>
              </div>
              <div class="stress-tip-box warning">
                <span class="tip-icon">⚠️</span>
                <div class="tip-text">
                  <strong>Lỗi thí sinh Việt Nam hay mắc:</strong> ${data.phoneticDetails.commonMistakes}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- THANH ĐIỀU HƯỚNG TẮT CÁC PANEL MỞ RỘNG (EXPANSION PILLS) -->
        <div class="ldd-tabs-nav">
          <button class="ldd-tab-btn ${this.activeTab === 'all' ? 'active' : ''}" onclick="window.lexicalDeepDive.switchTab('all')">
            📑 Toàn Bộ 3 Bảng Ăn Điểm
          </button>
          <button class="ldd-tab-btn ${this.activeTab === 'ladder' ? 'active' : ''}" onclick="window.lexicalDeepDive.switchTab('ladder')">
            🔄 1. Thang Nâng Cấp Band
          </button>
          <button class="ldd-tab-btn ${this.activeTab === 'family' ? 'active' : ''}" onclick="window.lexicalDeepDive.switchTab('family')">
            🧩 2. Gia Đình Từ &amp; Collocations
          </button>
          <button class="ldd-tab-btn ${this.activeTab === 'academic' ? 'active' : ''}" onclick="window.lexicalDeepDive.switchTab('academic')">
            📜 3. Bối Cảnh Speaking &amp; Writing
          </button>
        </div>

        <!-- NỘI DUNG 3 BẢNG MỞ RỘNG -->
        <div class="ldd-body-content">
          ${
            this.activeTab === 'all' || this.activeTab === 'ladder'
              ? `
              <!-- BẢNG 1: THANG NÂNG CẤP BAND (BAND UPGRADE / PARAPHRASE LADDER) -->
              <div class="ldd-panel-section" id="ldd-panel-ladder">
                <div class="ldd-panel-heading">
                  <div class="panel-icon-wrap" style="background: rgba(124, 58, 237, 0.1); color: #7C3AED;">
                    🔄
                  </div>
                  <div>
                    <h3 class="panel-title">BẢNG 1: THANG NÂNG CẤP BAND (BAND UPGRADE / PARAPHRASE LADDER)</h3>
                    <p class="panel-subtitle">Cách diễn đạt cùng một ý tưởng theo từng tầng bậc điểm số từ Band 4.0 đến Band 9.0</p>
                  </div>
                </div>
                ${upgradeLadderHtml}
              </div>
            `
              : ''
          }

          ${
            this.activeTab === 'all' || this.activeTab === 'family'
              ? `
              <!-- BẢNG 2: GIA ĐÌNH TỪ & COLLOCATIONS THỰC CHIẾN -->
              <div class="ldd-panel-section" id="ldd-panel-family">
                <div class="ldd-panel-heading">
                  <div class="panel-icon-wrap" style="background: rgba(16, 185, 129, 0.1); color: #10B981;">
                    🧩
                  </div>
                  <div>
                    <h3 class="panel-title">BẢNG 2: GIA ĐÌNH TỪ &amp; COLLOCATIONS THỰC CHIẾN</h3>
                    <p class="panel-subtitle">Bảng chia 4 từ loại, kỹ thuật Danh từ hóa (Nominalisation) và các cụm kết hợp từ chuẩn xác</p>
                  </div>
                </div>
                ${wordFamilyHtml}
                ${collocationsHtml}
              </div>
            `
              : ''
          }

          ${
            this.activeTab === 'all' || this.activeTab === 'academic'
              ? `
              <!-- BẢNG 3: CÂU VÍ DỤ CHUẨN BỐI CẢNH IELTS (SPEAKING & WRITING) -->
              <div class="ldd-panel-section" id="ldd-panel-academic">
                <div class="ldd-panel-heading">
                  <div class="panel-icon-wrap" style="background: rgba(245, 158, 11, 0.1); color: #F59E0B;">
                    📜
                  </div>
                  <div>
                    <h3 class="panel-title">BẢNG 3: CÂU VÍ DỤ CHUẨN BỐI CẢNH IELTS (ACADEMIC CONTEXT)</h3>
                    <p class="panel-subtitle">Áp dụng trực tiếp vào câu trả lời Speaking Part 1/2/3 và bài luận Writing Task 2</p>
                  </div>
                </div>
                ${academicContextHtml}
              </div>
            `
              : ''
          }
        </div>

        <!-- FOOTER THANH CÔNG CỤ TƯƠNG TÁC (BOTTOM ACTION BAR) -->
        <div class="ldd-footer-actions">
          <div class="ldd-footer-left">
            <button
              class="btn-ldd-master ${isMastered ? 'mastered' : ''}"
              onclick="window.lexicalDeepDive.toggleMastered()"
              title="Đánh dấu đã thuộc từ này để cộng +15 EXP và đồng bộ vào Gatekeeper"
            >
              ${isMastered ? '⭐ ĐÃ THUỘC TỪ NÀY' : '☆ ĐÁNH DẤU ĐÃ THUỘC (+15 EXP)'}
            </button>
            <button
              class="btn-ldd-flashcard"
              onclick="window.lexicalDeepDive.openInFlashcard()"
              title="Chuyển sang Chế Độ 2: Flashcard 3D để luyện phản xạ lật thẻ ngắt quãng"
            >
              🃏 Luyện Trên Flashcard 3D
            </button>
          </div>

          <div class="ldd-footer-right">
            <span class="ldd-shortcut-hint">Phím tắt: <kbd>Esc</kbd> Đóng • <kbd>U</kbd> Giọng UK • <kbd>A</kbd> Giọng US</span>
            ${
              isModal
                ? `<button class="btn-ldd-done" onclick="window.lexicalDeepDive.close()">Hoàn Tất Tra Cứu</button>`
                : ''
            }
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Biểu đồ trọng âm cao độ Syllable Pitch Visualizer (kiểu NIHONGO GO!)
   */
  renderPitchStressVisualizer(details, word) {
    if (!details || !details.syllables || details.syllables.length === 0) {
      return `
        <div class="syllables-pitch-container simple">
          <span class="simple-stress-text">Trọng âm: <strong>${details ? details.stressRule : word}</strong></span>
        </div>
      `;
    }

    const syllables = details.syllables;

    const blocksHtml = syllables
      .map((s, index) => {
        if (s.type === 'separator') {
          return `<div class="syllable-separator-dot">•</div>`;
        }

        const isPrimary = s.type === 'primary';
        const isSecondary = s.type === 'secondary';

        let heightPx = 48;
        let pitchClass = 'pitch-low';
        let badgeText = 'o (Thấp)';

        if (isPrimary) {
          heightPx = 82;
          pitchClass = 'pitch-high primary-stress';
          badgeText = 'O (Cao & Dài)';
        } else if (isSecondary) {
          heightPx = 62;
          pitchClass = 'pitch-mid secondary-stress';
          badgeText = '• (Nhấn phụ)';
        }

        return `
          <div
            class="syllable-pitch-block ${pitchClass}"
            style="height: ${heightPx}px;"
            title="${s.label || ''}: ${s.text} (${s.ipa || ''})"
            onclick="window.lexicalDeepDive.speak('${this.escapeText(s.text.toLowerCase())}', 'UK')"
          >
            <div class="syllable-dot-marker">${isPrimary ? '●' : '○'}</div>
            <div class="syllable-text-wrap">
              ${isPrimary ? '<span class="stress-prime-mark">ˈ</span>' : ''}
              ${isSecondary ? '<span class="stress-sec-mark">ˌ</span>' : ''}
              <span class="syllable-spelling">${s.text}</span>
            </div>
            ${s.ipa ? `<span class="syllable-ipa">${s.ipa}</span>` : ''}
            <span class="syllable-pitch-label">${badgeText}</span>
          </div>
        `;
      })
      .join('');

    return `
      <div class="syllables-pitch-track-wrap">
        <div class="syllables-pitch-baseline"></div>
        <div class="syllables-pitch-container">
          ${blocksHtml}
        </div>
      </div>
    `;
  }

  /**
   * Render Bảng 1: Thang Nâng Cấp Band (Band Upgrade / Paraphrase Ladder)
   */
  renderUpgradeLadder(ladder, tips) {
    if (!ladder || ladder.length === 0) return '';

    const stepsHtml = ladder
      .map((step, idx) => {
        const isTop = idx === ladder.length - 1;
        return `
          <div class="ladder-step-card ${isTop ? 'highlight-top' : ''}" style="--step-accent: ${step.color}; --step-bg: ${step.bgColor}; --step-border: ${step.borderColor};">
            <div class="ladder-step-header">
              <div class="ladder-tier-info">
                <span class="ladder-step-number">BẬC ${idx + 1}</span>
                <strong class="ladder-band-tag">${step.band}</strong>
                <span class="ladder-level-sub">(${step.levelLabel})</span>
              </div>
              ${isTop ? '<span class="expert-crown-badge">👑 ĐIỂM CHUYÊN GIA</span>' : ''}
            </div>

            <!-- DANH SÁCH CÁC CÁCH DIỄN ĐẠT / PARAPHRASE Ở BAND NÀY -->
            <div class="ladder-phrases-wrap">
              <span class="phrases-label">Các từ / cụm từ tương ứng:</span>
              <div class="ladder-phrase-chips">
                ${step.phrases
                  .map(
                    (p) => `
                  <button class="phrase-chip-btn" onclick="window.lexicalDeepDive.speak('${this.escapeText(p)}', 'UK')" title="Bấm để nghe phát âm: ${p}">
                    <span>${p}</span>
                    <span class="chip-speaker">🔊</span>
                  </button>
                `
                  )
                  .join('')}
              </div>
            </div>

            <!-- CÂU VÍ DỤ ÁP DỤNG TRONG BÀI THI -->
            <div class="ladder-example-box">
              <span class="example-quote-icon">“</span>
              <p class="example-text">${step.example}</p>
            </div>

            <!-- NHẬN XÉT CỦA GIÁM KHẢO (EXAMINER NOTES) -->
            <div class="ladder-examiner-comment">
              <span class="examiner-avatar-sm">👩‍🏫</span>
              <p class="examiner-feedback">${step.examinerNote}</p>
            </div>
          </div>
        `;
      })
      .join('');

    return `
      <div class="ladder-container">
        <div class="ladder-steps-vertical">
          ${stepsHtml}
        </div>

        ${
          tips
            ? `
          <div class="ladder-strategy-banner">
            <div class="strat-icon">💡</div>
            <div class="strat-content">
              <strong>CHIẾN LƯỢC PARAPHRASE CỦA GIÁM KHẢO CAMBRIDGE:</strong>
              <p>${tips}</p>
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  /**
   * Render Bảng 2: Gia Đình Từ & Kỹ Thuật Nominalisation
   */
  renderWordFamily(family, nominalisation) {
    if (!family) return '';

    return `
      <div class="word-family-matrix-card">
        <div class="sub-section-title">
          <span>👨‍👩‍👧‍👦</span> GIA ĐÌNH TỪ VỰNG (WORD FAMILY MATRIX)
        </div>
        <p class="sub-section-desc">Linh hoạt biến đổi từ loại giúp tăng điểm Grammatical Range &amp; Lexical Resource</p>

        <div class="word-family-grid">
          <!-- NOUN -->
          <div class="family-pos-col noun">
            <div class="pos-col-header">
              <span class="pos-dot noun"></span>
              <strong>DANH TỪ (NOUN)</strong>
            </div>
            <div class="pos-words-list">
              ${(family.noun || ['(Không phổ biến)'])
                .map((w) => `<div class="pos-word-pill">${w}</div>`)
                .join('')}
            </div>
          </div>

          <!-- VERB -->
          <div class="family-pos-col verb">
            <div class="pos-col-header">
              <span class="pos-dot verb"></span>
              <strong>ĐỘNG TỪ (VERB)</strong>
            </div>
            <div class="pos-words-list">
              ${(family.verb || ['(Không phổ biến)'])
                .map((w) => `<div class="pos-word-pill">${w}</div>`)
                .join('')}
            </div>
          </div>

          <!-- ADJECTIVE -->
          <div class="family-pos-col adj">
            <div class="pos-col-header">
              <span class="pos-dot adj"></span>
              <strong>TÍNH TỪ (ADJECTIVE)</strong>
            </div>
            <div class="pos-words-list">
              ${(family.adjective || ['(Không phổ biến)'])
                .map((w) => `<div class="pos-word-pill">${w}</div>`)
                .join('')}
            </div>
          </div>

          <!-- ADVERB -->
          <div class="family-pos-col adv">
            <div class="pos-col-header">
              <span class="pos-dot adv"></span>
              <strong>TRẠNG TỪ (ADVERB)</strong>
            </div>
            <div class="pos-words-list">
              ${(family.adverb || ['(Không phổ biến)'])
                .map((w) => `<div class="pos-word-pill">${w}</div>`)
                .join('')}
            </div>
          </div>
        </div>

        ${
          nominalisation
            ? `
          <!-- KHUNG KỸ THUẬT DANH TỪ HÓA (NOMINALISATION) -->
          <div class="nominalisation-showcase">
            <div class="nom-header">
              <span class="nom-badge">🚀 KỸ THUẬT DANH TỪ HÓA (NOMINALISATION) ĂN ĐIỂM BAND 8.0+</span>
            </div>
            <div class="nom-comparison-row">
              <div class="nom-box basic">
                <span class="nom-tag basic">❌ Band 5.0 (Văn phong nói / Dùng động từ đơn giản)</span>
                <p class="nom-sentence">"${nominalisation.basicSentence}"</p>
              </div>
              <div class="nom-arrow">➔</div>
              <div class="nom-box academic">
                <span class="nom-tag academic">✅ Band 8.5+ (Danh từ hóa học thuật trang trọng)</span>
                <p class="nom-sentence">"${nominalisation.academicSentence}"</p>
              </div>
            </div>
            <div class="nom-analysis">
              <strong>Phân tích của Giám khảo:</strong> ${nominalisation.analysis}
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  /**
   * Render Các Cụm Collocations Thường Gặp
   */
  renderCollocations(collocations) {
    if (!collocations || collocations.length === 0) return '';

    const itemsHtml = collocations
      .map(
        (c) => `
        <div class="collocation-card-item">
          <div class="colloc-top-row">
            <span class="colloc-type-tag">${c.type}</span>
            <button class="btn-colloc-speak" onclick="window.lexicalDeepDive.speak('${this.escapeText(c.phrase)}', 'UK')" title="Nghe cụm này">
              🔊 Nghe Cụm
            </button>
          </div>
          <h4 class="colloc-phrase">${c.phrase}</h4>
          <p class="colloc-meaning">🇻🇳 ${c.meaning}</p>
          <div class="colloc-example">
            <span class="ex-label">Ví dụ:</span>
            <span class="ex-sentence">"${c.example}"</span>
          </div>
        </div>
      `
      )
      .join('');

    return `
      <div class="collocations-matrix-card">
        <div class="sub-section-title">
          <span>🔗</span> CÁC COLLOCATIONS THỰC CHIẾN CHUẨN XÁC NHẤT
        </div>
        <p class="sub-section-desc">Không bao giờ mắc lỗi "Word Choice" hoặc "Collocational Clash" khi viết và nói</p>
        <div class="collocations-list-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  /**
   * Render Bảng 3: Câu Ví Dụ Chuẩn Bối Cảnh IELTS (Speaking & Writing)
   */
  renderAcademicContext(speaking, writing) {
    return `
      <div class="academic-context-container">
        <!-- 1. KHUNG IELTS SPEAKING CONTEXT -->
        ${
          speaking
            ? `
          <div class="context-card speaking-card">
            <div class="context-card-top">
              <div class="context-tag-wrap">
                <span class="context-badge speaking">🎤 ${speaking.part}</span>
                <span class="context-topic-name">Chủ đề: ${speaking.topic}</span>
              </div>
              <button class="btn-context-audio" onclick="window.lexicalDeepDive.speak('${this.escapeText(speaking.answer)}', 'UK')" title="Nghe toàn bộ câu trả lời Speaking với ngữ điệu tự nhiên">
                <span>🔊 Nghe Toàn Bộ Câu Nói</span>
              </button>
            </div>

            <!-- CÂU HỎI GIÁM KHẢO (EXAMINER QUESTION) -->
            <div class="examiner-prompt-box">
              <span class="prompt-icon">👩‍🏫 <strong>Giám khảo hỏi:</strong></span>
              <p class="prompt-text">"${speaking.question}"</p>
            </div>

            <!-- BÀI MẪU THÍ SINH (MODEL ANSWER) -->
            <div class="candidate-response-box">
              <span class="response-icon">💬 <strong>Câu trả lời mẫu Band 8.5+:</strong></span>
              <p class="response-text">${this.highlightTargetKeywords(speaking.answer, speaking.keyVocabUsed)}</p>
              <p class="response-translation">🇻🇳 <em>Dịch nghĩa: ${speaking.translation}</em></p>
            </div>

            <!-- PHÂN TÍCH GIÁM KHẢO VỀ SPEAKING -->
            <div class="context-examiner-insight">
              <div class="insight-badge">🎯 NHẬN XÉT TIÊU CHÍ LEXICAL RESOURCE &amp; FLUENCY:</div>
              <p>${speaking.examinerInsight}</p>
            </div>
          </div>
        `
            : ''
        }

        <!-- 2. KHUNG IELTS WRITING CONTEXT -->
        ${
          writing
            ? `
          <div class="context-card writing-card">
            <div class="context-card-top">
              <div class="context-tag-wrap">
                <span class="context-badge writing">✍️ ${writing.task}</span>
                <span class="context-topic-name">Chủ đề: ${writing.topic}</span>
              </div>
              <button class="btn-context-copy" onclick="window.lexicalDeepDive.copyText('${this.escapeText(writing.sentence)}', 'Đã sao chép câu mẫu Writing Task 2!')" title="Sao chép câu văn học thuật này vào clipboard">
                <span>📋 Sao Chép Câu Mẫu</span>
              </button>
            </div>

            <!-- ĐỀ BÀI WRITING (TASK PROMPT) -->
            <div class="examiner-prompt-box writing">
              <span class="prompt-icon">📝 <strong>Đề bài nghị luận:</strong></span>
              <p class="prompt-text">"${writing.prompt}"</p>
            </div>

            <!-- CÂU VĂN HỌC THUẬT (MODEL SENTENCE) -->
            <div class="candidate-response-box writing">
              <span class="response-icon">🏛️ <strong>Câu văn học thuật Band 8.5+ (Formal Academic Sentence):</strong></span>
              <p class="response-text academic">${this.highlightTargetKeywords(writing.sentence, writing.keyVocabUsed)}</p>
              <p class="response-translation">🇻🇳 <em>Dịch nghĩa: ${writing.translation}</em></p>
            </div>

            <!-- PHÂN TÍCH GIÁM KHẢO VỀ WRITING -->
            <div class="context-examiner-insight writing">
              <div class="insight-badge">⚖️ PHÂN TÍCH TỪ VỰNG &amp; CẤU TRÚC NGỮ PHÁP (EXAMINER ANALYSIS):</div>
              <p>${writing.examinerInsight}</p>
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  /**
   * Tô màu nổi bật các từ khóa đắt giá trong câu ví dụ
   */
  highlightTargetKeywords(text, keywords = []) {
    if (!text || !keywords || keywords.length === 0) return text;

    let highlighted = text;
    keywords.forEach((kw) => {
      if (!kw || kw.length < 3) return;
      // Regex an toàn
      const regex = new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      highlighted = highlighted.replace(regex, `<span class="ldd-keyword-highlight">$1</span>`);
    });

    return highlighted;
  }

  /**
   * Phát âm văn bản bằng Web Speech API
   */
  speak(text, accent = 'UK') {
    if (!text || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent === 'UK' ? 'en-GB' : 'en-US';
    utterance.rate = 0.88; // Tốc độ chuẩn luyện thi
    utterance.pitch = 1.0;

    // Chọn voice bản xứ nếu có
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const targetLang = accent === 'UK' ? 'en-GB' : 'en-US';
      const voice = voices.find((v) => v.lang === targetLang && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Siri')));
      if (voice) utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Đánh dấu đã thuộc từ vựng (đồng bộ Gamification HUD & Gatekeeper)
   */
  toggleMastered() {
    if (!this.currentData || !window.gamification) return;

    const isMastered = window.gamification.toggleVocabMastered(this.currentData.id);

    // Kích hoạt âm thanh
    if (isMastered) {
      if (window.soundSystem && typeof window.soundSystem.playCorrect === 'function') {
        window.soundSystem.playCorrect();
      }
      this.showToast(`⭐ Đã thuộc "${this.currentData.word}"! (+15 EXP)`);
    } else {
      if (window.soundSystem && typeof window.soundSystem.playClick === 'function') {
        window.soundSystem.playClick();
      }
      this.showToast(`Đã chuyển "${this.currentData.word}" về trạng thái đang học`);
    }

    // Cập nhật giao diện modal hiện tại
    const contentEl = document.getElementById('lexical-modal-content');
    if (contentEl) {
      contentEl.innerHTML = this.renderCardHtml(this.currentData, true);
    }

    // Cập nhật đồng bộ các màn hình khác
    if (window.vocabVaultApp && typeof window.vocabVaultApp.updateWordCardsList === 'function') {
      window.vocabVaultApp.updateWordCardsList();
      window.vocabVaultApp.updateHeaderAndTopBars();
    }
  }

  /**
   * Chuyển từ này sang học trên Flashcard 3D
   */
  openInFlashcard() {
    if (!this.currentData) return;
    this.close();

    if (window.app && typeof window.app.switchTab === 'function') {
      window.app.switchTab('flashcards');
      if (window.flashcardApp) {
        window.flashcardApp.selectedTopic = this.currentData.topicId || 'all';
        window.flashcardApp.selectedBand = this.currentData.bandLevel || 'all';
        window.flashcardApp.searchKeyword = this.currentData.word;
        window.flashcardApp.applyFilters();
      }
    }
  }

  /**
   * Sao chép toàn bộ tóm tắt từ vựng
   */
  copyWordSummary() {
    if (!this.currentData) return;
    const d = this.currentData;
    const summary = `
[IELTS GO! - LEXICAL DEEP-DIVE]
Từ vựng: ${d.word} (${d.partOfSpeech.toUpperCase()})
Cấp độ: ${d.bandLevel} (${d.cefr})
Phiên âm: UK: ${d.ipaUk} | US: ${d.ipaUs}
Trọng âm: ${d.phoneticDetails ? d.phoneticDetails.stressRule : ''}
Định nghĩa: ${d.definitionVi} (${d.definitionEn})
Collocations: ${(d.collocations || []).map((c) => c.phrase).join(', ')}
Ví dụ Writing: "${d.writingContext ? d.writingContext.sentence : ''}"
    `.trim();

    this.copyText(summary, 'Đã sao chép đầy đủ thông tin từ vựng!');
  }

  /**
   * Sao chép text vào clipboard kèm Toast thông báo
   */
  copyText(text, successMessage = 'Đã sao chép vào bộ nhớ tạm!') {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(successMessage);
      });
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast(successMessage);
    }
  }

  /**
   * Hiển thị Toast thông báo nhanh
   */
  showToast(message) {
    let toast = document.getElementById('lexical-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'lexical-toast';
      toast.className = 'lexical-toast-alert';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /**
   * Gắn các phím tắt tiện lợi
   */
  bindShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      } else if (e.key.toLowerCase() === 'u') {
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          if (this.currentData) this.speak(this.currentData.word, 'UK');
        }
      } else if (e.key.toLowerCase() === 'a') {
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          if (this.currentData) this.speak(this.currentData.word, 'US');
        }
      }
    });
  }

  escapeText(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Khởi tạo Singleton toàn cục
if (typeof window !== 'undefined') {
  window.lexicalDeepDive = new IeltsLexicalDeepDive();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IeltsLexicalDeepDive };
}
