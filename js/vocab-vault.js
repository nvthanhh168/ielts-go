/**
 * IELTS GO! - Ma Trận Từ Vựng 20 Chủ Đề x 5 Cấp Độ Band Điểm (Chế Độ 10)
 * 1. Chế độ "Học theo Chủ đề (Topic View)": 20 Chủ đề chuẩn IELTS kèm icon SVG riêng, màu nhận diện & thanh % hoàn thành, chia 5 Tab Band điểm.
 * 2. Chế độ "Cày từ vượt Band (Level Progression View)": 5 Tab Band Gatekeeper, thanh tiến độ qua màn & bộ lọc 20 chủ đề.
 * 3. Đồng bộ Gamification HUD, Vocabulary Gatekeeper 2.500 từ và chuyển đổi Flashcard 3D.
 */

class IeltsVocabVaultApp {
  constructor() {
    this.container = null;
    this.matrixService = window.vocabMatrixService;

    // Trạng thái giao diện
    this.viewMode = 'TOPIC_VIEW'; // 'TOPIC_VIEW' | 'PROGRESSION_VIEW'
    this.selectedTopicId = 'study';
    this.selectedBandTier = '4.5 - 6.0';
    this.selectedStatus = 'all'; // 'all' | 'mastered' | 'review' | 'unlearned'
    this.searchKeyword = '';

    // Layout hiển thị danh sách từ: 'grid' hoặc 'table'
    this.cardLayout = 'grid';
  }

  // Khởi tạo và render vào container
  render(containerId = 'vocab-vault-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (!window.vocabMatrixService) {
      this.container.innerHTML = `<div style="padding: 24px; text-align: center;">Đang khởi tạo cơ sở dữ liệu ma trận từ vựng...</div>`;
      return;
    }

    this.loadPersistedAiWords();
    this.renderUI();
  }

  // Chuyển đổi giữa Chế độ 1 (Topic View) và Chế độ 2 (Progression View)
  switchViewMode(mode) {
    if (this.viewMode === mode) return;
    this.viewMode = mode;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderUI();
  }

  // Chọn chủ đề (trong Topic View hoặc Progression View)
  selectTopic(topicId) {
    this.selectedTopicId = topicId;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderUI();
  }

  // Chọn Tab Band điểm (trong Topic View hoặc Progression View)
  selectBandTier(tierKey) {
    this.selectedBandTier = tierKey;
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderUI();
  }

  // Lọc theo trạng thái đã thuộc / cần ôn
  filterByStatus(status) {
    this.selectedStatus = status;
    if (window.soundSystem) window.soundSystem.playClick();
    this.updateWordCardsList();
  }

  // Tìm kiếm tức thì
  onSearchInput(val) {
    this.searchKeyword = val.trim();
    this.updateWordCardsList();
  }

  // Xóa tìm kiếm
  clearSearch() {
    this.searchKeyword = '';
    const input = document.getElementById('matrix-search-input');
    if (input) input.value = '';
    this.updateWordCardsList();
  }

  // Render toàn bộ khung giao diện Ma Trận Từ Vựng
  renderUI() {
    if (!this.container) return;

    const svc = window.vocabMatrixService;
    const masteredIds = window.gamification ? window.gamification.state.masteredVocabIds || [] : [];
    const reviewIds = window.gamification ? window.gamification.state.reviewVocabIds || [] : [];

    const topics = svc.getTopics();
    const bandTiers = svc.getBandTiers();
    const currentTopic = svc.getTopicById(this.selectedTopicId);
    const currentTier = svc.getBandTierByKey(this.selectedBandTier);

    // Tính tổng số từ trong kho ma trận
    const allWords = svc.getAllWords();
    const totalWordsCount = allWords.length;
    const masteredCount = allWords.filter((w) => masteredIds.includes(w.id)).length;
    const overallPercent = totalWordsCount > 0 ? Math.round((masteredCount / totalWordsCount) * 100) : 0;

    this.container.innerHTML = `
      <div class="vocab-matrix-wrapper">
        <!-- 1. ROYAL HEADER BANNER & BỘ CHUYỂN ĐỔI CHẾ ĐỘ XEM -->
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 45%, #312E81 100%); border-radius: var(--border-radius-lg); padding: 22px 24px; color: #FFFFFF; box-shadow: var(--box-shadow); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span style="background: #FEE2E2; color: #991B1B; font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: var(--border-radius-full); text-transform: uppercase;">Mô-đun #10 &bull; Cambridge Lexical Matrix</span>
                <span style="background: rgba(255, 255, 255, 0.15); color: #FEF3C7; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: var(--border-radius-full);">📊 20 Chủ Đề &bull; 5 Cấp Độ Band</span>
              </div>
              <h2 style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin: 0 0 6px 0;">
                📖 Ma Trận Từ Vựng 20 Chủ Đề x 5 Cấp Độ Band Điểm
              </h2>
              <p style="font-size: 13px; color: #C7D2FE; margin: 0; max-width: 720px; line-height: 1.45;">
                Tổ chức 20 chủ đề IELTS chuẩn mực kết hợp 5 bậc thang năng lực Cambridge. Chuyển đổi linh hoạt giữa học sâu từng chủ đề và cày từ vượt ngưỡng Band Gatekeeper.
              </p>
            </div>

            <!-- NÚT HÀNH ĐỘNG HEADER -->
            <div class="matrix-header-actions" style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <button class="btn-vault-action ai-expand" id="btn-ai-auto-expand" onclick="window.vocabVaultApp.autoExpandCurrentTopic()" title="Dùng AI tự động sinh thêm gói 20 từ vựng học thuật chuẩn Cambridge cho chủ đề này">
                <span>✨ AI Auto-Expand (+20 Từ)</span>
              </button>
              <button class="btn-vault-action primary" onclick="window.vocabVaultApp.studyWithFlashcard()" title="Chuyển các từ vựng đang chọn sang Flashcard 3D để luyện phản xạ">
                <span>🃏 Luyện Trên Flashcard 3D</span>
              </button>
              <button class="btn-vault-action outline" onclick="window.vocabVaultApp.openExportModal()" title="Xuất danh sách từ vựng thành bản in hoặc sao chép">
                <span>📥 Xuất Sổ Tay</span>
              </button>
            </div>
          </div>

          <!-- THANH CHUYỂN ĐỔI 2 CHẾ ĐỘ XEM CHÍNH (VIEW SWITCHER PILLS) -->
          <div class="matrix-view-switcher-bar" style="margin-top: 18px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 14px; flex-wrap: wrap; gap: 12px;">
            <div class="switcher-pills-wrap">
              <button
                class="switcher-pill ${this.viewMode === 'TOPIC_VIEW' ? 'active' : ''}"
                onclick="window.vocabVaultApp.switchViewMode('TOPIC_VIEW')"
              >
                <span>🎯 Chế Độ 1: Học Theo 20 Chủ Đề (Topic View)</span>
              </button>
              <button
                class="switcher-pill ${this.viewMode === 'PROGRESSION_VIEW' ? 'active' : ''}"
                onclick="window.vocabVaultApp.switchViewMode('PROGRESSION_VIEW')"
              >
                <span>🚀 Chế Độ 2: Cày Từ Vượt Band (Level Progression View)</span>
              </button>
            </div>

            <div class="quick-matrix-stats" style="font-size: 12px; color: #E0E7FF; font-weight: 700;">
              <span>Tổng kho: <strong>${masteredCount}/${totalWordsCount}</strong> từ đã thuộc (${overallPercent}%)</span>
            </div>
          </div>
        </div>

        <!-- 2. NỘI DUNG CHÍNH THEO CHẾ ĐỘ XEM ĐANG CHỌN -->
        ${this.viewMode === 'TOPIC_VIEW' ? this.renderTopicViewHtml(topics, currentTopic, bandTiers, masteredIds) : this.renderProgressionViewHtml(bandTiers, currentTier, topics, masteredIds)}

        <!-- 3. THANH CÔNG CỤ TÌM KIẾM & BỘ LỌC TRẠNG THÁI (SEARCH & TOOLBAR) -->
        <div class="matrix-toolbar-card">
          <div class="matrix-search-wrap">
            <span class="search-icon">🔍</span>
            <input
              type="text"
              id="matrix-search-input"
              class="matrix-search-input"
              placeholder="Tra cứu từ vựng, Collocation, phiên âm IPA, nghĩa tiếng Việt hoặc Paraphrase..."
              value="${this.escapeText(this.searchKeyword)}"
              oninput="window.vocabVaultApp.onSearchInput(this.value)"
            />
            ${this.searchKeyword ? `<button class="btn-clear-search" onclick="window.vocabVaultApp.clearSearch()">&times;</button>` : ''}
          </div>

          <div class="matrix-status-filter-pills">
            <button
              class="status-filter-btn ${this.selectedStatus === 'all' ? 'active' : ''}"
              onclick="window.vocabVaultApp.filterByStatus('all')"
            >
              🌟 Tất Cả (${this.getFilteredCount('all', masteredIds, reviewIds)})
            </button>
            <button
              class="status-filter-btn due-srs ${this.selectedStatus === 'due_srs' ? 'active' : ''}"
              onclick="window.vocabVaultApp.filterByStatus('due_srs')"
              title="Các từ vựng đến chu kỳ cần ôn tập hôm nay theo thuật toán Spaced Repetition"
            >
              ⏰ Đến Hạn Ôn SRS (${this.getFilteredCount('due_srs', masteredIds, reviewIds)})
            </button>
            <button
              class="status-filter-btn mastered ${this.selectedStatus === 'mastered' ? 'active' : ''}"
              onclick="window.vocabVaultApp.filterByStatus('mastered')"
            >
              🟢 Đã Thành Thạo (${this.getFilteredCount('mastered', masteredIds, reviewIds)})
            </button>
            <button
              class="status-filter-btn review ${this.selectedStatus === 'review' ? 'active' : ''}"
              onclick="window.vocabVaultApp.filterByStatus('review')"
            >
              🔵 Đang Ôn Tập (${this.getFilteredCount('review', masteredIds, reviewIds)})
            </button>
            <button
              class="status-filter-btn learning ${this.selectedStatus === 'learning' ? 'active' : ''}"
              onclick="window.vocabVaultApp.filterByStatus('learning')"
            >
              🟡 Đang Học (${this.getFilteredCount('learning', masteredIds, reviewIds)})
            </button>
          </div>
        </div>

        <!-- 4. KHUNG DANH SÁCH THẺ TỪ VỰNG MA TRẬN (CARDS CONTAINER) -->
        <div id="matrix-cards-container" class="matrix-cards-grid">
          <!-- Render tự động qua updateWordCardsList() -->
        </div>
      </div>
    `;

    // Nạp danh sách thẻ từ vựng ngay sau khi render khung
    this.updateWordCardsList();
  }

  // ==================== A. RENDER CHẾ ĐỘ 1: TOPIC VIEW ====================
  renderTopicViewHtml(topics, currentTopic, bandTiers, masteredIds) {
    const svc = window.vocabMatrixService;

    // Danh sách 20 thẻ chủ đề dạng Carousel / Grid
    const topicsNavHtml = topics
      .map((t) => {
        const prog = svc.getTopicProgress(t.id, masteredIds);
        const isActive = t.id === this.selectedTopicId;

        return `
          <div
            class="topic-nav-card ${isActive ? 'active' : ''}"
            onclick="window.vocabVaultApp.selectTopic('${t.id}')"
            style="--topic-accent: ${t.color}; --topic-bg: ${t.bgColor}; --topic-border: ${t.borderColor};"
          >
            <div class="topic-nav-top">
              <span class="topic-icon-svg">${t.svgIcon}</span>
              <span class="topic-percent-pill">${prog.percentage}%</span>
            </div>
            <div class="topic-nav-names">
              <strong class="t-name-en">${t.nameEn.split('&')[0].trim()}</strong>
              <small class="t-name-vi">${t.nameVi.split('&')[0].trim()}</small>
            </div>
            <div class="topic-progress-mini-bar">
              <div class="t-bar-fill" style="width: ${prog.percentage}%; background: ${t.color};"></div>
            </div>
          </div>
        `;
      })
      .join('');

    // 5 Tab cấp độ Band điểm cho chủ đề đang chọn
    const bandTabsHtml = bandTiers
      .map((b) => {
        const isActive = b.tierKey === this.selectedBandTier;
        // Đếm số từ của chủ đề này trong Band này
        const wordsInBand = svc.getAllWords().filter((w) => w.topicId === this.selectedTopicId && w.bandTier === b.tierKey);
        const masteredInBand = wordsInBand.filter((w) => masteredIds.includes(w.id)).length;

        return `
          <button
            class="matrix-band-tab-btn ${isActive ? 'active' : ''}"
            onclick="window.vocabVaultApp.selectBandTier('${b.tierKey}')"
            style="--band-color: ${b.color}; --band-bg: ${b.bgColor}; --band-border: ${b.borderColor};"
          >
            <span class="b-icon">${b.icon}</span>
            <div class="b-text">
              <strong class="b-tier-title">${b.tierKey}</strong>
              <small class="b-band-label">${b.bandLabel} (${b.cefr})</small>
            </div>
            <span class="b-count-badge">${masteredInBand}/${wordsInBand.length}</span>
          </button>
        `;
      })
      .join('');

    const topicProg = svc.getTopicProgress(currentTopic.id, masteredIds);

    return `
      <!-- THANH CHỌN 20 CHỦ ĐỀ CUỘN NGANG / LƯỚI CARD -->
      <div class="matrix-topic-selection-section">
        <div class="section-micro-header">
          <span>🎯 BƯỚC 1: CHỌN 1 TRONG 22 CHỦ ĐỀ IELTS (ĐANG CHỌN: ${currentTopic.nameEn.toUpperCase()})</span>
          <span style="color: #64748B; font-size: 11px;">Cuộn ngang để xem đủ 22 chủ đề</span>
        </div>
        <div class="topics-nav-scroll-track">
          ${topicsNavHtml}
        </div>
      </div>

      <!-- BANNER CHI TIẾT CHỦ ĐỀ ĐANG CHỌN VÀ 5 TAB BAND ĐIỂM -->
      <div class="selected-topic-detail-card" style="border-left: 6px solid ${currentTopic.color}; background: #FFFFFF; border-radius: var(--border-radius-lg); padding: 18px 22px; box-shadow: var(--box-shadow); margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div class="topic-hero-svg" style="background: ${currentTopic.bgColor}; color: ${currentTopic.color}; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 10px;">
              ${currentTopic.svgIcon}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="font-size: 20px; font-weight: 900; color: #0F172A; margin: 0;">${currentTopic.nameEn}</h3>
                <span style="font-size: 13px; color: #64748B; font-weight: 700;">(${currentTopic.nameVi})</span>
              </div>
              <p style="font-size: 12.5px; color: #475569; margin: 3px 0 0 0;">${currentTopic.description}</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <div class="topic-detail-stat-pill" style="background: ${currentTopic.bgColor}; border: 1px solid ${currentTopic.borderColor}; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; color: ${currentTopic.color};">
              Đã thuộc: ${topicProg.mastered}/${topicProg.total} từ (${topicProg.percentage}%)
            </div>
            <button class="btn-topic-ai-expand" onclick="window.generateMoreVocabularyWithAI('${currentTopic.nameEn || currentTopic.name}', '${this.selectedBandTier}', 20)" title="Dùng AI sinh thêm 20 từ vựng thực chiến chuẩn Cambridge cho chủ đề ${currentTopic.nameEn || currentTopic.name}">
              <span>✨ AI Tạo Thêm 20 Từ Chuẩn Cambridge</span>
            </button>
          </div>
        </div>

        <!-- 5 TAB CẤP ĐỘ BAND ĐIỂM CHO CHỦ ĐỀ NÀY -->
        <div class="section-micro-header" style="margin-top: 14px; margin-bottom: 8px;">
          <span>⚡ BƯỚC 2: CHỌN CẤP ĐỘ BAND ĐIỂM ĐỂ HỌC TỪ DỄ ĐẾN KHÓ</span>
        </div>
        <div class="matrix-band-tabs-bar">
          ${bandTabsHtml}
        </div>
      </div>
    `;
  }

  // ==================== B. RENDER CHẾ ĐỘ 2: LEVEL PROGRESSION VIEW ====================
  renderProgressionViewHtml(bandTiers, currentTier, topics, masteredIds) {
    const svc = window.vocabMatrixService;

    // 5 Tab cấp độ Band điểm Gatekeeper (đặt ở trên cùng)
    const bandTiersNavHtml = bandTiers
      .map((b) => {
        const isActive = b.tierKey === this.selectedBandTier;
        const prog = svc.getBandProgress(b.tierKey, masteredIds);

        return `
          <button
            class="progression-tier-tab ${isActive ? 'active' : ''}"
            onclick="window.vocabVaultApp.selectBandTier('${b.tierKey}')"
            style="--tier-color: ${b.color}; --tier-bg: ${b.bgColor}; --tier-border: ${b.borderColor};"
          >
            <div class="p-tab-top">
              <span class="p-icon">${b.icon}</span>
              <span class="p-badge">${b.bandLabel}</span>
            </div>
            <strong class="p-title">${b.nameVi}</strong>
            <small class="p-cefr">CEFR ${b.cefr} &bull; Định mức: ${b.gateQuota} từ</small>
            <div class="p-progress-track">
              <div class="p-bar-fill" style="width: ${prog.percentage}%; background: ${b.color};"></div>
            </div>
            <div class="p-stats-foot">
              <span>Đã thuộc: <strong>${prog.mastered}/${prog.total}</strong> từ</span>
              <span>${prog.percentage}%</span>
            </div>
          </button>
        `;
      })
      .join('');

    // Banner tổng kết Gatekeeper của Band đang chọn
    const bandProg = svc.getBandProgress(currentTier.tierKey, masteredIds);
    const neededWords = Math.max(0, currentTier.gateQuota - bandProg.mastered);

    // Bộ lọc 20 chủ đề trong Band này
    const topicChipsHtml = topics
      .map((t) => {
        const isSelected = t.id === this.selectedTopicId;
        const wordsInTopicBand = svc.getAllWords().filter((w) => w.topicId === t.id && w.bandTier === this.selectedBandTier);
        const count = wordsInTopicBand.length;

        return `
          <button
            class="topic-filter-chip ${isSelected ? 'active' : ''}"
            onclick="window.vocabVaultApp.selectTopic('${t.id}')"
            style="--t-color: ${t.color};"
          >
            <span>${t.icon}</span>
            <span>${t.nameEn.split('&')[0].trim()}</span>
            <span class="chip-badge">${count}</span>
          </button>
        `;
      })
      .join('');

    return `
      <!-- 5 TAB CẤP ĐỘ BAND ĐIỂM GATEKEEPER TRÊN ĐẦU -->
      <div class="progression-tiers-selection-section">
        <div class="section-micro-header">
          <span>🚀 BƯỚC 1: CHỌN MỐC BAND ĐIỂM BẠN ĐANG CẦN CÀY ĐỂ VƯỢT GATEKEEPER</span>
        </div>
        <div class="progression-tiers-grid">
          ${bandTiersNavHtml}
        </div>
      </div>

      <!-- GATEKEEPER BANNER CỦA BAND HIỆN TẠI -->
      <div class="progression-gatekeeper-banner" style="background: linear-gradient(135deg, ${currentTier.color} 0%, #0F172A 100%); color: #FFFFFF; border-radius: var(--border-radius-lg); padding: 18px 22px; box-shadow: var(--box-shadow); margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="background: rgba(255,255,255,0.2); color: #FEF3C7; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: var(--border-radius-full);">
                ${currentTier.icon} ${currentTier.bandLabel} &bull; CEFR ${currentTier.cefr}
              </span>
              <span style="font-size: 11px; opacity: 0.9;">Định mức vượt ngưỡng: thuộc ${currentTier.gateQuota} Core Words</span>
            </div>
            <h3 style="font-size: 20px; font-weight: 900; margin: 0;">${currentTier.nameVi} (${currentTier.nameEn})</h3>
            <p style="font-size: 12.5px; opacity: 0.88; margin: 3px 0 0 0; max-width: 650px;">${currentTier.summary}</p>
          </div>

          <div class="gate-status-pill-box" style="background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.25); border-radius: 12px; padding: 10px 16px; text-align: right;">
            <div style="font-size: 11px; opacity: 0.9; text-transform: uppercase;">Tiến độ thuộc từ vựng Band này</div>
            <div style="font-size: 20px; font-weight: 900; color: #FBBF24;">${bandProg.mastered} / ${bandProg.total} từ</div>
            <div style="font-size: 11px; color: #E2E8F0; margin-bottom: 8px;">Cần thêm: <strong>${neededWords} từ</strong> để đủ định mức thi</div>
            <div style="display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;">
              <button class="btn-topic-ai-expand" style="padding: 6px 12px; font-size: 11px;" onclick="window.generateMoreVocabularyWithAI(window.vocabVaultApp.selectedTopicId === 'all' ? 'Environment' : window.vocabVaultApp.selectedTopicId, '${currentTier.tierKey}', 20)" title="Dùng AI sinh thêm 20 từ vựng thực chiến chuẩn Cambridge cho cấp độ ${currentTier.tierKey}">
                <span>✨ AI Tạo Thêm 20 Từ Chuẩn Cambridge</span>
              </button>
              ${window.bandPromotionExam ? window.bandPromotionExam.renderPromotionButtonHtml() : ''}
            </div>
          </div>
        </div>

        <!-- BỘ LỌC NHANH 20 CHỦ ĐỀ TRONG BAND NÀY -->
        <div style="margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.18); padding-top: 12px;">
          <div style="font-size: 11px; font-weight: 700; opacity: 0.85; margin-bottom: 8px; text-transform: uppercase;">
            📁 BƯỚC 2: CHỌN CHỦ ĐỀ ĐỂ CÀY TẬP TRUNG (HOẶC CHỌN 'TẤT CẢ CHỦ ĐỀ'):
          </div>
          <div class="topic-chips-scroll-track">
            <button
              class="topic-filter-chip ${this.selectedTopicId === 'all' ? 'active' : ''}"
              onclick="window.vocabVaultApp.selectTopic('all')"
              style="--t-color: #F59E0B;"
            >
              <span>🌐</span>
              <span>Tất Cả 22 Chủ Đề</span>
              <span class="chip-badge">${bandProg.total}</span>
            </button>
            ${topicChipsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // ==================== C. CẬP NHẬT DANH SÁCH THẺ TỪ VỰNG ====================
  updateWordCardsList() {
    const listContainer = document.getElementById('matrix-cards-container');
    if (!listContainer || !window.vocabMatrixService) return;

    const svc = window.vocabMatrixService;
    const masteredIds = window.gamification ? window.gamification.state.masteredVocabIds || [] : [];
    const reviewIds = window.gamification ? window.gamification.state.reviewVocabIds || [] : [];

    const filteredWords = svc.filterMatrix({
      viewMode: this.viewMode,
      selectedTopicId: this.selectedTopicId,
      selectedBandTier: this.selectedBandTier,
      keyword: this.searchKeyword,
      status: this.selectedStatus,
      masteredIds,
      reviewIds
    });

    if (filteredWords.length === 0) {
      listContainer.innerHTML = `
        <div class="matrix-empty-state">
          <span style="font-size: 42px;">🔍</span>
          <h4>Không tìm thấy từ vựng phù hợp!</h4>
          <p>Thử xóa từ khóa tìm kiếm hoặc chọn bộ lọc trạng thái "Tất cả" để hiển thị đầy đủ danh sách.</p>
          <button class="btn-clear-search-pill" onclick="window.vocabVaultApp.clearSearch()">
            Xóa Bộ Lọc Tìm Kiếm
          </button>
        </div>
      `;
      return;
    }

    const cardsHtml = filteredWords
      .map((word) => {
        const topic = svc.getTopicById(word.topicId);
        const srsStatus = window.srsManager ? window.srsManager.getStatus(word.id) : (masteredIds.includes(word.id) ? 'mastered' : reviewIds.includes(word.id) ? 'reviewing' : 'new');
        const isMastered = srsStatus === 'mastered';
        const isReview = srsStatus === 'reviewing';
        const isDue = window.srsManager ? window.srsManager.isDueForReview(word.id) : false;

        let statusClass = `status-${srsStatus}`;
        if (isDue) statusClass += ' is-due-srs-today';

        return `
          <div class="matrix-word-card ${statusClass}" id="matrix-card-${word.id}" style="--topic-color: ${topic.color};">
            <!-- HEADER THẺ: TỪ LOẠI, BAND, VÀ NÚT TÍNH NĂNG -->
            <div class="m-card-header">
              <div class="m-card-badges">
                <span class="topic-micro-tag" style="background: ${topic.bgColor}; color: ${topic.color}; border: 1px solid ${topic.borderColor};">
                  ${topic.icon} ${topic.nameEn.split('&')[0].trim()}
                </span>
                <span class="pos-micro-tag">${word.partOfSpeech.toUpperCase()}</span>
                <span class="band-micro-tag">${word.bandTier} (${word.cefr})</span>
                ${window.srsManager ? window.srsManager.renderStatusBadgeHtml(word.id) : ''}
              </div>

              <!-- NÚT PHÁT ÂM UK VÀ US QUA WEB SPEECH API -->
              <div class="audio-pronounce-buttons">
                <button
                  class="btn-audio-speak uk"
                  onclick="window.vocabVaultApp.speak('${this.escapeText(word.word)}', 'UK')"
                  title="Nghe phát âm chuẩn giọng Anh (UK Accent)"
                >
                  🇬🇧 UK
                </button>
                <button
                  class="btn-audio-speak us"
                  onclick="window.vocabVaultApp.speak('${this.escapeText(word.word)}', 'US')"
                  title="Nghe phát âm chuẩn giọng Mỹ (US Accent)"
                >
                  🇺🇸 US
                </button>
              </div>
            </div>

            <!-- TỪ VỰNG CHÍNH VÀ PHIÊN ÂM IPA & WORD STRESS -->
            <div class="m-card-word-wrap">
              <h3 class="m-card-word" onclick="window.lexicalDeepDive.open('${word.id}')" title="Bấm để mở Thẻ Lexical Deep-Dive chuyên sâu">
                <span>${word.word}</span>
                <span class="m-word-inspect-badge" title="Mổ xẻ Lexical Resource">🔬</span>
              </h3>
              <div class="m-card-ipa-line">
                <span class="m-ipa">UK: ${word.ipaUk}</span>
                <span class="m-ipa">US: ${word.ipaUs}</span>
              </div>
              ${word.stress ? `<div class="m-stress-note">🎯 Trọng âm: <strong>${word.stress}</strong></div>` : ''}
            </div>

            <!-- ĐỊNH NGHĨA TIẾNG VIỆT VÀ TIẾNG ANH -->
            <div class="m-card-definition-box">
              <div class="def-vi">🇻🇳 ${word.definitionVi}</div>
              <div class="def-en">🇬🇧 ${word.definitionEn}</div>
            </div>

            <!-- TỪ ĐỒNG NGHĨA PARAPHRASE TRONG IELTS -->
            ${
              word.synonyms && word.synonyms.length > 0
                ? `
                <div class="m-synonyms-block">
                  <span class="m-syn-label">Synonyms/Paraphrase:</span>
                  <div class="m-syn-chips">
                    ${word.synonyms.map((s) => `<span class="syn-chip">${s}</span>`).join('')}
                  </div>
                </div>
              `
                : ''
            }

            <!-- COLLOCATIONS THƯỜNG GẶP -->
            ${
              word.collocations && word.collocations.length > 0
                ? `
                <div class="m-collocations-block">
                  <span class="m-colloc-label">Collocations Thường Gặp:</span>
                  <div class="m-colloc-pills">
                    ${word.collocations.map((c) => `<span class="colloc-pill">${c}</span>`).join('')}
                  </div>
                </div>
              `
                : ''
            }

            <!-- CÂU VÍ DỤ CHUẨN BỐI CẢNH CAMBRIDGE IELTS -->
            <div class="m-example-box">
              <p class="m-ex-en">"${word.exampleEn}"</p>
              <p class="m-ex-vi">🇻🇳 ${word.exampleVi}</p>
            </div>

            <!-- NÚT THAO TÁC: ĐÁNH DẤU THUỘC / CẦN ÔN / FLASHCARD / DEEP-DIVE -->
            <div class="m-card-actions">
              <button
                class="btn-mark-mastered ${isMastered ? 'active' : ''}"
                onclick="window.vocabVaultApp.toggleMastered('${word.id}')"
                title="Đánh dấu đã thành thạo từ này (Cộng EXP &amp; Vương miện)"
              >
                ${isMastered ? '🟢 ĐÃ THUỘC' : '☆ ĐÁNH DẤU THUỘC'}
              </button>

              <button
                class="btn-deep-dive-direct"
                onclick="window.lexicalDeepDive.open('${word.id}')"
                title="Mổ xẻ từ vựng chuẩn tiêu chí Lexical Resource (Thang nâng band, Word family, Ví dụ Speaking &amp; Writing)"
              >
                🔬 Deep-Dive
              </button>

              <button
                class="btn-mark-review ${isReview ? 'active' : ''}"
                onclick="window.vocabVaultApp.toggleReview('${word.id}')"
                title="Đánh dấu đang ôn tập hoặc cần ôn tập"
              >
                ${isReview ? '🔵 ĐANG ÔN' : '⚠️ CẦN ÔN'}
              </button>

              <button
                class="btn-study-card-direct"
                onclick="window.vocabVaultApp.openDirectInFlashcard('${word.id}')"
                title="Mở lật thẻ 3D từ này"
              >
                🃏 Thẻ 3D
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    listContainer.innerHTML = cardsHtml;
  }

  // Đếm số từ theo bộ lọc trạng thái
  getFilteredCount(status, masteredIds, reviewIds) {
    if (!window.vocabMatrixService) return 0;
    const words = window.vocabMatrixService.filterMatrix({
      viewMode: this.viewMode,
      selectedTopicId: this.selectedTopicId,
      selectedBandTier: this.selectedBandTier,
      keyword: this.searchKeyword,
      status: 'all',
      masteredIds,
      reviewIds
    });

    if (status === 'mastered') {
      return words.filter((w) => window.srsManager ? window.srsManager.isMastered(w.id) : masteredIds.includes(w.id)).length;
    }
    if (status === 'review') {
      return words.filter((w) => window.srsManager ? window.srsManager.isReviewing(w.id) : reviewIds.includes(w.id)).length;
    }
    if (status === 'learning') {
      return words.filter((w) => window.srsManager ? window.srsManager.isLearning(w.id) : false).length;
    }
    if (status === 'due_srs') {
      return words.filter((w) => window.srsManager ? window.srsManager.isDueForReview(w.id) : reviewIds.includes(w.id)).length;
    }
    if (status === 'unlearned' || status === 'new') {
      return words.filter((w) => window.srsManager ? window.srsManager.isNew(w.id) : !masteredIds.includes(w.id)).length;
    }
    return words.length;
  }

  // Toggle trạng thái đã thuộc từ vựng (đồng bộ Gamification + Gatekeeper + SRS)
  toggleMastered(wordId) {
    const word = window.vocabMatrixService ? window.vocabMatrixService.getAllWords().find(w => w.id === wordId) : null;
    if (window.srsManager) {
      if (window.srsManager.isMastered(wordId)) {
        window.srsManager.recordDirectReview(wordId, word || {});
        if (window.soundSystem) window.soundSystem.playClick();
      } else {
        window.srsManager.recordDirectMaster(wordId, word || {});
      }
    } else if (window.gamification) {
      const isMastered = window.gamification.toggleVocabMastered(wordId);
      if (isMastered) {
        if (window.soundSystem) window.soundSystem.playCorrect();
      } else {
        if (window.soundSystem) window.soundSystem.playClick();
      }
    }

    // Cập nhật lại giao diện thẻ từ vựng và thanh tiến độ
    this.updateWordCardsList();
    this.updateHeaderAndTopBars();
  }

  // Toggle trạng thái cần ôn tập
  toggleReview(wordId) {
    const word = window.vocabMatrixService ? window.vocabMatrixService.getAllWords().find(w => w.id === wordId) : null;
    if (window.srsManager) {
      if (window.srsManager.isReviewing(wordId)) {
        // Toggle về learning
        const record = window.srsManager.getRecord(wordId, word || {});
        record.status = 'learning';
        window.srsManager.saveState();
      } else {
        window.srsManager.recordDirectReview(wordId, word || {});
      }
      if (window.soundSystem) window.soundSystem.playClick();
    } else if (window.gamification) {
      if (window.gamification.isVocabReview(wordId)) {
        window.gamification.state.reviewVocabIds = window.gamification.state.reviewVocabIds.filter((id) => id !== wordId);
        window.gamification.saveState();
      } else {
        window.gamification.markVocabReview(wordId);
      }
      if (window.soundSystem) window.soundSystem.playClick();
    }

    this.updateWordCardsList();
  }

  // Cập nhật lại các thanh tiến độ trên giao diện
  updateHeaderAndTopBars() {
    if (window.app && typeof window.app.renderGamificationHud === 'function' && window.gamification) {
      window.app.renderGamificationHud(window.gamification.state);
    }
  }

  // Alias tương thích ngược cho updateDashboardStats
  updateDashboardStats() {
    this.updateHeaderAndTopBars();
  }

  // Chuyển danh sách từ đang lọc sang Flashcard 3D để học ngay
  studyWithFlashcard() {
    if (window.app && typeof window.app.switchTab === 'function') {
      window.app.switchTab('flashcard');
      if (window.flashcardApp) {
        window.flashcardApp.selectedTopic = this.selectedTopicId === 'all' ? 'study' : this.selectedTopicId;
        window.flashcardApp.selectedBand = this.selectedBandTier;
        window.flashcardApp.render();
      }
    }
  }

  // Mở thẻ từ vựng cụ thể trên Flashcard 3D
  openDirectInFlashcard(wordId) {
    if (window.app && typeof window.app.switchTab === 'function') {
      window.app.switchTab('flashcards');
      if (window.flashcardApp) {
        window.flashcardApp.selectedTopic = this.selectedTopicId === 'all' ? 'study' : this.selectedTopicId;
        window.flashcardApp.selectedBand = this.selectedBandTier;
        window.flashcardApp.render();
      }
    }
  }

  // Phát âm chuẩn Web Speech API giọng Anh (UK) hoặc Mỹ (US)
  speak(text, accent = 'UK') {
    if (!text || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent === 'UK' ? 'en-GB' : 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  // Mở Modal Xuất Sổ Tay / In Sách
  openExportModal() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Vui lòng cho phép popup để mở bản in Sổ Tay Từ Vựng!');
      return;
    }

    const svc = window.vocabMatrixService;
    const words = svc.filterMatrix({
      viewMode: this.viewMode,
      selectedTopicId: this.selectedTopicId,
      selectedBandTier: this.selectedBandTier,
      keyword: this.searchKeyword,
      status: this.selectedStatus,
      masteredIds: window.gamification ? window.gamification.state.masteredVocabIds || [] : [],
      reviewIds: window.gamification ? window.gamification.state.reviewVocabIds || [] : []
    });

    const topic = svc.getTopicById(this.selectedTopicId);
    const tier = svc.getBandTierByKey(this.selectedBandTier);

    let rowsHtml = words
      .map(
        (w, i) => `
        <tr style="border-bottom: 1px solid #E2E8F0;">
          <td style="padding: 8px 10px; font-weight: bold; width: 30px;">${i + 1}</td>
          <td style="padding: 8px 10px; font-weight: 800; color: #0F172A; width: 160px;">${w.word}</td>
          <td style="padding: 8px 10px; font-size: 12px; color: #475569; width: 150px;">${w.ipaUk}</td>
          <td style="padding: 8px 10px; font-size: 13px; color: #166534; font-weight: 600;">${w.definitionVi}</td>
          <td style="padding: 8px 10px; font-size: 12px; color: #334155; font-style: italic;">"${w.exampleEn}"</td>
        </tr>
      `
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>IELTS GO! - Sổ Tay Từ Vựng Học Thuật</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 24px; color: #0F172A; }
            h1 { font-size: 20px; color: #B91C1C; margin-bottom: 4px; }
            p { font-size: 13px; color: #475569; margin: 0 0 16px 0; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { background: #0F172A; color: #FFFFFF; padding: 10px; text-align: left; }
          </style>
        </head>
        <body>
          <h1>📖 IELTS GO! - MA TRẬN TỪ VỰNG HỌC THUẬT CAMBRIDGE</h1>
          <p>Chủ đề: <strong>${topic.nameEn} (${topic.nameVi})</strong> | Cấp độ: <strong>${tier.bandLabel} (${tier.nameVi})</strong> | Số lượng: ${words.length} mục từ</p>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Từ Vựng / Collocation</th>
                <th>Phiên Âm IPA</th>
                <th>Nghĩa Tiếng Việt</th>
                <th>Câu Ví Dụ IELTS</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  // Nạp các từ vựng đã được AI sinh thêm từ localStorage (đảm bảo tính bền vững)
  loadPersistedAiWords() {
    if (!window.vocabMatrixService || typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem('ielts_ai_expanded_vocab');
      if (saved) {
        const words = JSON.parse(saved);
        if (Array.isArray(words)) {
          const existingIds = new Set(window.vocabMatrixService.matrixWords.map((w) => w.id));
          words.forEach((w) => {
            if (!existingIds.has(w.id)) {
              window.vocabMatrixService.matrixWords.push(w);
              existingIds.add(w.id);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Không thể nạp từ vựng đã mở rộng từ localStorage:', e);
    }
  }

  // Chức năng AI Auto-Expand Vocabulary: Tự động sinh thêm 20 từ vựng cho chủ đề hiện tại
  async autoExpandCurrentTopic() {
    if (!window.vocabMatrixService) return;

    const topicId = this.selectedTopicId === 'all' ? 'animals' : this.selectedTopicId;
    const topic = window.vocabMatrixService.getTopicById(topicId);
    const topicName = topic ? topic.nameEn : 'Animals & Wildlife';

    // Đổi trạng thái hiển thị loading cho các nút bấm AI
    const btnList = document.querySelectorAll('.btn-topic-ai-expand, #btn-ai-auto-expand');
    btnList.forEach((btn) => {
      btn.disabled = true;
      btn.dataset.origHtml = btn.innerHTML;
      btn.innerHTML = `<span>⏳ Victoria AI đang sinh 20 từ vựng ${topicName}...</span>`;
    });

    if (window.soundSystem && typeof window.soundSystem.playClick === 'function') {
      window.soundSystem.playClick();
    }

    try {
      const existingWords = window.vocabMatrixService
        .getAllWords()
        .filter((w) => w.topicId === topicId)
        .map((w) => w.word);

      let newItems = [];
      if (window.aiService && typeof window.aiService.autoExpandVocabulary === 'function') {
        newItems = await window.aiService.autoExpandVocabulary({
          topicId,
          topicName,
          existingWords,
          count: 20
        });
      }

      if (!newItems || newItems.length === 0) {
        throw new Error('AI không thể sinh thêm từ vựng lúc này.');
      }

      // Chuẩn hóa và chèn các từ mới vào Ma Trận
      const existingIds = new Set(window.vocabMatrixService.matrixWords.map((w) => w.id));
      const newlyAdded = [];

      newItems.forEach((item) => {
        if (!existingIds.has(item.id)) {
          const wordObj = {
            id: item.id,
            topicId: item.topic || topicId,
            bandTier: item.bandLevel || '6.0 - 7.5',
            cefr:
              item.bandLevel === 'Mất gốc'
                ? 'A1'
                : item.bandLevel === '< 4.5'
                ? 'A2'
                : item.bandLevel === '4.5 - 6.0'
                ? 'B1/B2'
                : item.bandLevel === '6.0 - 7.5'
                ? 'B2/C1'
                : 'C1/C2',
            word: item.word,
            partOfSpeech: item.partOfSpeech || 'collocation',
            ipaUk: item.ipa || '/.../',
            ipaUs: item.ipa || '/.../',
            stress: item.stressPattern || item.stress || '',
            definitionVi: item.vietnameseMeaning || item.definitionVi || '',
            definitionEn: item.exampleSentence || item.definitionEn || '',
            synonyms: item.synonymsByBand
              ? [item.synonymsByBand.band45, item.synonymsByBand.band65, item.synonymsByBand.band80].filter(Boolean)
              : item.synonyms || [],
            collocations: item.collocations || [],
            exampleEn: item.exampleSentence || item.exampleEn || '',
            exampleVi: item.exampleTranslation || item.exampleVi || '',
            wordFamily: item.wordFamily || {},
            synonymsByBand: item.synonymsByBand || {}
          };
          window.vocabMatrixService.matrixWords.push(wordObj);
          newlyAdded.push(wordObj);
          existingIds.add(item.id);
        }
      });

      // Lưu trữ bền vững vào localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('ielts_ai_expanded_vocab') || '[]');
        stored.push(...newlyAdded);
        localStorage.setItem('ielts_ai_expanded_vocab', JSON.stringify(stored));
      } catch (err) {
        console.warn('Lỗi lưu trữ localStorage:', err);
      }

      // Thưởng EXP cho người học
      if (window.gamification && typeof window.gamification.addExp === 'function') {
        window.gamification.addExp(25);
      }
      if (window.soundSystem && typeof window.soundSystem.playCorrect === 'function') {
        window.soundSystem.playCorrect();
      }

      // Hiển thị thông báo Toast
      if (window.lexicalDeepDive && typeof window.lexicalDeepDive.showToast === 'function') {
        window.lexicalDeepDive.showToast(
          `✨ Đã nạp thành công ${newlyAdded.length} từ vựng học thuật mới cho chủ đề "${topicName}"! (+25 EXP)`
        );
      } else {
        alert(
          `✨ Victoria AI đã sinh & nạp thành công ${newlyAdded.length} từ vựng học thuật mới cho chủ đề "${topicName}"! (+25 EXP)`
        );
      }

      // Re-render lại giao diện Ma trận từ vựng
      this.renderUI();
    } catch (error) {
      console.error('Lỗi khi sinh từ vựng bằng AI:', error);
      alert(`Không thể sinh thêm từ lúc này: ${error.message}. Vui lòng thử lại sau!`);
    } finally {
      btnList.forEach((btn) => {
        btn.disabled = false;
        if (btn.dataset.origHtml) btn.innerHTML = btn.dataset.origHtml;
      });
    }
  }

  escapeText(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Khởi tạo Singleton App
window.vocabVaultApp = new IeltsVocabVaultApp();
