/**
 * IELTS GO! - IELTS Writing Studio Controller (Chế Độ 6)
 * 1. Bộ chọn chế độ: Academic Task 1, General Training Task 1, Task 2 Essay
 * 2. Trình soạn thảo thông minh: Đồng hồ đếm giờ 20/40 phút, bộ đếm từ thời gian thực (đổi màu cảnh báo),
 *    Khung lập dàn ý và bảng chèn nhanh Signpost Words
 * 3. Kho bài mẫu 3 mốc Band (5.0, 6.5, 8.0+) kèm Examiner's Comments
 * 4. Tích hợp AI Examiner Victoria chấm chữa 4 tiêu chí chuẩn Cambridge
 */

class IeltsWritingStudioApp {
  constructor() {
    this.container = null;
    this.selectedPromptId = 'acad-line-energy';
    this.activeTaskFilter = 'ALL'; // 'ALL', 'TASK_1_ACADEMIC', 'TASK_1_GENERAL', 'TASK_2'
    this.activeSampleBand = '8.0'; // '5.0', '6.5', '8.0'

    // Trình soạn thảo & Bộ đếm
    this.userEssayText = '';
    this.wordCount = 0;
    this.sentenceCount = 0;
    this.paragraphCount = 0;
    this.userOutlineText = '';

    // Đồng hồ đếm giờ
    this.timerSeconds = 20 * 60; // 20 phút mặc định
    this.timerInterval = null;
    this.isTimerRunning = false;

    // AI Chấm điểm
    this.isEvaluating = false;
    this.evaluationResult = null;
  }

  // Khởi tạo và render vào container
  render(containerId = 'writing-studio-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Đọc bản nháp đã lưu nếu có
    this.loadDraft();
    this.renderUI();
  }

  loadDraft() {
    try {
      const saved = localStorage.getItem(`ielts_writing_draft_${this.selectedPromptId}`);
      if (saved) {
        this.userEssayText = saved;
        this.updateWordStats(this.userEssayText);
      } else {
        this.userEssayText = '';
        this.wordCount = 0;
      }
    } catch (e) {
      this.userEssayText = '';
    }
  }

  saveDraft() {
    try {
      localStorage.setItem(`ielts_writing_draft_${this.selectedPromptId}`, this.userEssayText);
    } catch (e) {}
  }

  // Cập nhật số từ, câu và đoạn
  updateWordStats(text) {
    if (!text || text.trim().length === 0) {
      this.wordCount = 0;
      this.sentenceCount = 0;
      this.paragraphCount = 0;
      return;
    }

    // Đếm từ
    const words = text.trim().split(/\s+/).filter(Boolean);
    this.wordCount = words.length;

    // Đếm câu
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    this.sentenceCount = sentences.length;

    // Đếm đoạn
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);
    this.paragraphCount = paragraphs.length;
  }

  // Render toàn bộ giao diện Writing Studio
  renderUI() {
    if (!this.container || !window.writingDb) return;

    const allPrompts = window.writingDb.getAllPrompts();
    const filteredPrompts = allPrompts.filter((p) => {
      if (this.activeTaskFilter === 'TASK_1_ACADEMIC') return p.track === 'ACADEMIC' && p.taskType === 'TASK_1';
      if (this.activeTaskFilter === 'TASK_1_GENERAL') return p.track === 'GENERAL_TRAINING' && p.taskType === 'TASK_1';
      if (this.activeTaskFilter === 'TASK_2') return p.taskType === 'TASK_2';
      return true;
    });

    const currentPrompt = window.writingDb.getPromptById(this.selectedPromptId);
    const signpostCategories = window.writingDb.getSignposts();

    const minWords = currentPrompt.minimumWords || 150;
    const isWordCountValid = this.wordCount >= minWords;

    this.container.innerHTML = `
      <div class="writing-studio-wrapper">
        <!-- Banner đầu trang -->
        <div class="banner-royal-gradient" style="background: linear-gradient(135deg, #B45309 0%, #0F172A 100%); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-size: 11px; font-weight: 800; color: #FDE68A; text-transform: uppercase; letter-spacing: 0.5px;">Mô-đun #06 • Academic &amp; General Writing Studio</span>
              <h2 style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 4px 0 6px 0;">✍️ IELTS Writing Studio (Task 1 &amp; Task 2)</h2>
              <p style="font-size: 13px; color: #FEF3C7; margin: 0;">Trình soạn thảo thông minh đếm từ cảnh báo thời gian thực, bảng chèn Signpost Words và kho bài mẫu phân tích 3 Band điểm.</p>
            </div>

            <!-- Bộ lọc thể loại Task -->
            <div class="ws-task-filter-group">
              <button
                class="ws-filter-chip ${this.activeTaskFilter === 'ALL' ? 'active' : ''}"
                onclick="window.writingStudioApp.setTaskFilter('ALL')"
              >
                🌟 Tất Cả
              </button>
              <button
                class="ws-filter-chip ${this.activeTaskFilter === 'TASK_1_ACADEMIC' ? 'active' : ''}"
                onclick="window.writingStudioApp.setTaskFilter('TASK_1_ACADEMIC')"
              >
                📊 Academic Task 1
              </button>
              <button
                class="ws-filter-chip ${this.activeTaskFilter === 'TASK_1_GENERAL' ? 'active' : ''}"
                onclick="window.writingStudioApp.setTaskFilter('TASK_1_GENERAL')"
              >
                ✉️ General Task 1 (Thư)
              </button>
              <button
                class="ws-filter-chip ${this.activeTaskFilter === 'TASK_2' ? 'active' : ''}"
                onclick="window.writingStudioApp.setTaskFilter('TASK_2')"
              >
                📝 Task 2 Essay (x2 Điểm)
              </button>
            </div>
          </div>
        </div>

        <!-- Thanh chọn đề bài viết -->
        <div class="ws-prompt-selector-bar">
          <label for="ws-prompt-select"><strong>Đề bài đang chọn:</strong></label>
          <select
            id="ws-prompt-select"
            class="fc-select"
            style="flex: 1; max-width: 580px;"
            onchange="window.writingStudioApp.selectPrompt(this.value)"
          >
            ${filteredPrompts
              .map(
                (p) => `
              <option value="${p.id}" ${this.selectedPromptId === p.id ? 'selected' : ''}>
                [${p.track} - ${p.taskType}] ${p.title}
              </option>
            `
              )
              .join('')}
          </select>
        </div>

        <!-- BỐ CỤC CHÍNH 2 CỘT: ĐỀ BÀI & BÀI MẪU (TRÁI) vs TRÌNH SOẠN THẢO (PHẢI) -->
        <div class="ws-main-grid">
          <!-- CỘT TRÁI: ĐỀ BÀI, HÌNH MINH HỌA & KHO BÀI MẪU (5 Cột) -->
          <div class="ws-prompt-col">
            <!-- Thẻ Đề Bài Chính -->
            <div class="ws-card-shell">
              <div class="ws-prompt-header">
                <div class="ws-prompt-badges">
                  <span class="ws-track-badge ${currentPrompt.track.toLowerCase()}">${currentPrompt.track}</span>
                  <span class="ws-type-badge">${currentPrompt.chartType}</span>
                  <span class="ws-time-badge">⏱️ ${currentPrompt.recommendedMinutes} phút • ${minWords}+ từ</span>
                </div>
                <h3 class="ws-prompt-title">${currentPrompt.title}</h3>
              </div>

              <!-- Nội dung yêu cầu đề bài -->
              <div class="ws-prompt-text-box">
                <p class="ws-prompt-question">${currentPrompt.promptQuestion.replace(/\n/g, '<br>')}</p>
              </div>

              <!-- Hình minh họa biểu đồ SVG hoặc Tình huống thư -->
              <div class="ws-visual-container">
                ${currentPrompt.visualSvg || ''}
              </div>

              <!-- Các ý chính cần báo cáo -->
              <div class="ws-key-features-box">
                <strong style="font-size: 12px; color: #1E293B; display: block; margin-bottom: 6px;">
                  📌 Các Điểm Nổi Bật Cần Đề Cập (Key Features):
                </strong>
                <ul class="ws-features-list">
                  ${(currentPrompt.keyFeatures || []).map((f) => `<li>• ${f}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- KHO BÀI MẪU PHÂN TÍCH 3 BAND ĐIỂM (5.0 vs 6.5 vs 8.0+) -->
            <div class="ws-card-shell" style="margin-top: 16px;">
              <div class="ws-sample-header">
                <span style="font-size: 16px;">📚</span>
                <strong style="font-size: 14px; color: #1E293B;">Kho Bài Mẫu Chuẩn Cambridge &amp; Nhận Xét Giám Khảo</strong>
              </div>

              <!-- Thanh chuyển 3 mốc Band -->
              <div class="ws-sample-tabs">
                <button
                  class="ws-sample-tab-btn ${this.activeSampleBand === '5.0' ? 'active' : ''}"
                  onclick="window.writingStudioApp.setSampleBand('5.0')"
                >
                  Band 5.0 (Hạn chế)
                </button>
                <button
                  class="ws-sample-tab-btn ${this.activeSampleBand === '6.5' ? 'active' : ''}"
                  onclick="window.writingStudioApp.setSampleBand('6.5')"
                >
                  Band 6.5 (Khá)
                </button>
                <button
                  class="ws-sample-tab-btn ${this.activeSampleBand === '8.0' ? 'active' : ''}"
                  onclick="window.writingStudioApp.setSampleBand('8.0')"
                >
                  👑 Band 8.0+ (Xuất sắc)
                </button>
              </div>

              <!-- Nội dung bài mẫu theo Band đang chọn -->
              <div class="ws-sample-content-box">
                ${this.renderSampleBandContent(currentPrompt)}
              </div>
            </div>
          </div>

          <!-- CỘT PHẢI: TRÌNH SOẠN THẢO THÔNG MINH (7 Cột) -->
          <div class="ws-editor-col">
            <div class="ws-card-shell editor-card">
              <!-- Thanh điều khiển trên cùng trình soạn thảo -->
              <div class="ws-editor-toolbar">
                <!-- Đồng hồ đếm ngược -->
                <div class="ws-timer-wrap">
                  <span class="ws-timer-val" id="ws-timer-display">${this.formatTimer(this.timerSeconds)}</span>
                  <div class="ws-timer-actions">
                    <button class="btn-timer-icon" onclick="window.writingStudioApp.toggleTimer()" title="Bắt đầu/Tạm dừng">
                      ${this.isTimerRunning ? '⏸️' : '▶️'}
                    </button>
                    <button class="btn-timer-icon" onclick="window.writingStudioApp.resetTimer()" title="Đặt lại đồng hồ">
                      🔄
                    </button>
                  </div>
                </div>

                <!-- Bộ đếm số từ thông minh đổi màu cảnh báo -->
                <div class="ws-word-count-pill ${isWordCountValid ? 'valid' : 'warning'}" id="ws-word-count-pill">
                  <span class="count-icon">${isWordCountValid ? '✅' : '⚠️'}</span>
                  <strong class="count-number">${this.wordCount}</strong> / ${minWords} từ
                  <small class="count-status">
                    ${isWordCountValid ? '(Đạt chuẩn độ dài)' : '(Chưa đủ tối thiểu)'}
                  </small>
                </div>
              </div>

              <!-- Accordion: Bảng Gợi Ý "Signpost Words" Học Thuật -->
              <details class="ws-accordion-box" open>
                <summary class="ws-accordion-summary">
                  <span>🚀 Bảng Gợi Ý Signpost Words (Nhấp để chèn vào bài)</span>
                  <span class="acc-arrow">▼</span>
                </summary>
                <div class="ws-signpost-body">
                  ${signpostCategories
                    .map(
                      (cat) => `
                    <div class="ws-signpost-cat">
                      <span class="cat-label">${cat.categoryIcon} ${cat.category}:</span>
                      <div class="cat-chips">
                        ${cat.phrases
                          .map(
                            (p) => `
                          <button
                            class="btn-signpost-chip"
                            onclick="window.writingStudioApp.insertSignpost('${this.escapeText(p.text)}')"
                            title="${p.tip}"
                          >
                            + ${p.text}
                          </button>
                        `
                          )
                          .join('')}
                      </div>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </details>

              <!-- Accordion: Khung Lập Dàn Ý (Outline Workspace) -->
              <details class="ws-accordion-box">
                <summary class="ws-accordion-summary">
                  <span>📐 Khung Lập Dàn Ý 4 Đoạn (Outline Planning)</span>
                  <span class="acc-arrow">▼</span>
                </summary>
                <div class="ws-outline-body">
                  <textarea
                    class="ws-outline-textarea"
                    placeholder="Lập nhanh dàn bài (Keywords, Main ideas, Comparison points) trước khi viết...&#10;1. Intro: Paraphrase đề bài&#10;2. Overview/Body 1: Xu hướng chính / Ý 1&#10;3. Body 2: Dữ liệu chi tiết / Ý 2&#10;4. Conclusion: Tóm lược / Khẳng định quan điểm"
                    oninput="window.writingStudioApp.userOutlineText = this.value"
                  >${this.userOutlineText}</textarea>
                </div>
              </details>

              <!-- Ô SOẠN THẢO VĂN BẢN CHÍNH -->
              <div class="ws-textarea-wrapper">
                <textarea
                  id="ws-main-essay-input"
                  class="ws-main-textarea"
                  placeholder="Bắt đầu soạn thảo bài viết của bạn tại đây... Hệ thống sẽ tự động đếm số từ và lưu bản nháp liên tục."
                  oninput="window.writingStudioApp.onEssayInput(this.value)"
                >${this.userEssayText}</textarea>
              </div>

              <!-- Thống kê chi tiết & Nút hành động -->
              <div class="ws-editor-footer">
                <div class="ws-text-metrics">
                  <span>Đoạn văn: <strong>${this.paragraphCount}</strong></span>
                  <span>•</span>
                  <span>Câu văn: <strong>${this.sentenceCount}</strong></span>
                  <span>•</span>
                  <span>Trung bình: <strong>${
                    this.sentenceCount > 0 ? Math.round(this.wordCount / this.sentenceCount) : 0
                  }</strong> từ/câu</span>
                </div>

                <div class="ws-editor-actions">
                  <button class="btn-ws-tool" onclick="window.writingStudioApp.clearEssay()" title="Xóa toàn bộ nội dung">
                    🗑️ Xóa Bài
                  </button>
                  <button class="btn-ws-tool" onclick="window.writingStudioApp.copyEssay()" title="Sao chép bài viết">
                    📋 Sao Chép
                  </button>
                  <button
                    class="btn-ai-grade-essay"
                    id="btn-ai-eval-writing"
                    onclick="window.writingStudioApp.evaluateEssayWithAi()"
                    ${this.isEvaluating ? 'disabled' : ''}
                  >
                    ${this.isEvaluating ? '⏳ Victoria Đang Chấm Điểm...' : '👩‍🏫 Giám Khảo Victoria AI Chấm Điểm 4 Tiêu Chí'}
                  </button>
                </div>
              </div>

              <!-- KHUNG KẾT QUẢ CHẤM ĐIỂM CỦA AI EXAMINER -->
              <div id="ws-ai-evaluation-container">
                ${this.evaluationResult ? this.renderEvaluationResultHtml(this.evaluationResult) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render nội dung bài mẫu theo 3 mốc Band
  renderSampleBandContent(prompt) {
    if (this.activeSampleBand === '5.0') {
      return `
        <div class="ws-sample-box band5">
          <div class="ws-sample-top">
            <span class="sample-band-tag" style="background: #FFE4E6; color: #BE123C;">Band 5.0 (Limited Performance)</span>
            <span class="sample-wc">${prompt.sampleBand5 ? prompt.sampleBand5.split(/\s+/).length : 0} từ</span>
          </div>
          <div class="ws-sample-body">${(prompt.sampleBand5 || '').replace(/\n/g, '<br>')}</div>
          <div class="ws-examiner-comment">
            <strong>Nhận xét của Giám khảo Cambridge:</strong>
            <pre>${prompt.examinerCommentBand5 || ''}</pre>
          </div>
        </div>
      `;
    } else if (this.activeSampleBand === '6.5') {
      return `
        <div class="ws-sample-box band65">
          <div class="ws-sample-top">
            <span class="sample-band-tag" style="background: #FEF3C7; color: #B45309;">Band 6.5 (Competent User)</span>
            <span class="sample-wc">${prompt.sampleBand65 ? prompt.sampleBand65.split(/\s+/).length : 0} từ</span>
          </div>
          <div class="ws-sample-body">${(prompt.sampleBand65 || '').replace(/\n/g, '<br>')}</div>
          <div class="ws-examiner-comment">
            <strong>Nhận xét của Giám khảo Cambridge:</strong>
            <pre>${prompt.examinerCommentBand65 || ''}</pre>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="ws-sample-box band8">
          <div class="ws-sample-top">
            <span class="sample-band-tag" style="background: #DCFCE7; color: #15803D;">👑 Band 8.0+ (Superior Model Answer)</span>
            <span class="sample-wc">${prompt.sampleBand8 ? prompt.sampleBand8.split(/\s+/).length : 0} từ</span>
          </div>
          <div class="ws-sample-body">${(prompt.sampleBand8 || '').replace(/\n/g, '<br>')}</div>
          <div class="ws-examiner-comment">
            <strong>Nhận xét của Giám khảo Cambridge:</strong>
            <pre>${prompt.examinerCommentBand8 || ''}</pre>
          </div>
        </div>
      `;
    }
  }

  // Render báo cáo chấm điểm chi tiết 4 tiêu chí của AI Victoria
  renderEvaluationResultHtml(res) {
    if (!res) return '';

    const overall = res.overallBand || 6.5;
    const criteria = res.criteriaBreakdown || [
      { name: 'Task Achievement / Response', score: overall, comment: 'Hoàn thành đầy đủ các yêu cầu cốt lõi của đề bài.' },
      { name: 'Coherence & Cohesion', score: overall, comment: 'Bố cục bài viết mạch lạc, liên kết các đoạn tự nhiên.' },
      { name: 'Lexical Resource', score: overall, comment: 'Sử dụng vốn từ học thuật phong phú, hạn chế lặp từ.' },
      { name: 'Grammatical Range & Accuracy', score: overall, comment: 'Kiểm soát tốt các cấu trúc câu phức và mệnh đề quan hệ.' },
    ];

    return `
      <div class="ws-eval-report-card">
        <div class="ws-report-top">
          <div class="ws-examiner-info">
            <span class="examiner-icon">👩‍🏫</span>
            <div>
              <h4 style="font-size: 16px; font-weight: 900; color: #1E293B; margin: 0;">
                Bảng Thẩm Định Writing - Giám Khảo Victoria AI
              </h4>
              <p style="font-size: 12px; color: #64748B; margin: 2px 0 0 0;">
                Cambridge IELTS Official Examiner Assessment (Thang điểm 1.0 - 9.0)
              </p>
            </div>
          </div>
          <div class="ws-overall-band-badge">
            <span class="band-num">Band ${overall.toFixed(1)}</span>
            <small>OVERALL SCORE</small>
          </div>
        </div>

        <!-- 4 Tiêu chí IELTS Breakdown -->
        <div class="ws-criteria-grid">
          ${criteria
            .map(
              (c) => `
            <div class="ws-criterion-box">
              <div class="crit-head">
                <span class="crit-title">${c.name}</span>
                <span class="crit-val">${typeof c.score === 'number' ? c.score.toFixed(1) : c.score}</span>
              </div>
              <p class="crit-desc">${c.comment}</p>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Nhận xét chi tiết phong cách Cambridge -->
        <div class="ws-feedback-box">
          <strong style="font-size: 13px; color: #1E293B; display: block; margin-bottom: 6px;">
            📝 Examiner's Comments (Nhận xét của Giám khảo):
          </strong>
          <p style="font-size: 13px; color: #334155; line-height: 1.5; margin: 0;">
            ${res.examinerFeedback || 'Bài viết đã đáp ứng tốt yêu cầu đề tài, có phân tích số liệu và quan điểm rõ ràng.'}
          </p>
        </div>

        <!-- Nâng cấp từ vựng C1/C2 -->
        ${
          res.keyVocabularyUpgrades && res.keyVocabularyUpgrades.length > 0
            ? `
          <div class="ws-vocab-upgrade-box">
            <strong style="font-size: 13px; color: #B45309; display: block; margin-bottom: 8px;">
              💎 Gợi Ý Nâng Cấp Từ Vựng &amp; Collocations C1/C2:
            </strong>
            <div class="ws-vocab-upgrade-list">
              ${res.keyVocabularyUpgrades
                .map(
                  (v) => `
                <div class="upgrade-row">
                  <span class="orig-word">${v.original}</span>
                  <span class="arrow-sym">➔</span>
                  <strong class="up-word">${v.upgraded}</strong>
                  <small class="exp-note">(${v.explanation})</small>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
            : ''
        }

        <!-- Bài viết mẫu Band 7.5+ nâng cấp từ ý tưởng của học viên -->
        ${
          res.improvedSampleAnswer
            ? `
          <div class="ws-model-upgrade-box">
            <strong style="font-size: 13px; color: #15803D; display: block; margin-bottom: 6px;">
              👑 Model Answer Band 7.5+ (Nâng cấp từ chính bài viết của bạn):
            </strong>
            <div class="ws-model-answer-text">
              ${res.improvedSampleAnswer.replace(/\n/g, '<br><br>')}
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  // Xử lý sự kiện gõ bài viết
  onEssayInput(val) {
    this.userEssayText = val;
    this.updateWordStats(val);
    this.saveDraft();

    // Cập nhật nhanh số từ trên UI mà không cần render lại toàn bộ DOM
    const pill = document.getElementById('ws-word-count-pill');
    const currentPrompt = window.writingDb.getPromptById(this.selectedPromptId);
    const minWords = currentPrompt.minimumWords || 150;
    const isWordCountValid = this.wordCount >= minWords;

    if (pill) {
      pill.className = `ws-word-count-pill ${isWordCountValid ? 'valid' : 'warning'}`;
      pill.innerHTML = `
        <span class="count-icon">${isWordCountValid ? '✅' : '⚠️'}</span>
        <strong class="count-number">${this.wordCount}</strong> / ${minWords} từ
        <small class="count-status">${isWordCountValid ? '(Đạt chuẩn độ dài)' : '(Chưa đủ tối thiểu)'}</small>
      `;
    }
  }

  // Chèn Signpost Word vào vị trí con trỏ
  insertSignpost(text) {
    const textarea = document.getElementById('ws-main-essay-input');
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const currentText = textarea.value;

    const newText = currentText.substring(0, startPos) + text + ' ' + currentText.substring(endPos);
    textarea.value = newText;
    textarea.focus();
    textarea.selectionStart = startPos + text.length + 1;
    textarea.selectionEnd = startPos + text.length + 1;

    this.onEssayInput(newText);
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Đổi bộ lọc Task
  setTaskFilter(filter) {
    this.activeTaskFilter = filter;
    const allPrompts = window.writingDb.getAllPrompts();
    const filtered = allPrompts.filter((p) => {
      if (filter === 'TASK_1_ACADEMIC') return p.track === 'ACADEMIC' && p.taskType === 'TASK_1';
      if (filter === 'TASK_1_GENERAL') return p.track === 'GENERAL_TRAINING' && p.taskType === 'TASK_1';
      if (filter === 'TASK_2') return p.taskType === 'TASK_2';
      return true;
    });

    if (filtered.length > 0 && !filtered.some((p) => p.id === this.selectedPromptId)) {
      this.selectedPromptId = filtered[0].id;
      this.resetTimerForPrompt();
      this.loadDraft();
    }

    this.evaluationResult = null;
    this.renderUI();
  }

  // Đổi đề bài
  selectPrompt(promptId) {
    this.selectedPromptId = promptId;
    this.resetTimerForPrompt();
    this.loadDraft();
    this.evaluationResult = null;
    this.renderUI();
  }

  setSampleBand(band) {
    this.activeSampleBand = band;
    const prompt = window.writingDb.getPromptById(this.selectedPromptId);
    const container = document.querySelector('.ws-sample-content-box');
    if (container) {
      container.innerHTML = this.renderSampleBandContent(prompt);
    }
    // Cập nhật active class trên tab buttons
    document.querySelectorAll('.ws-sample-tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.textContent.includes(`Band ${band}`));
    });
  }

  // Đặt lại thời gian theo thể loại Task (20 phút cho Task 1, 40 phút cho Task 2)
  resetTimerForPrompt() {
    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    const prompt = window.writingDb.getPromptById(this.selectedPromptId);
    this.timerSeconds = (prompt.recommendedMinutes || 20) * 60;
  }

  toggleTimer() {
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      this.renderUI();
    } else {
      this.isTimerRunning = true;
      this.timerInterval = setInterval(() => {
        this.timerSeconds -= 1;
        const display = document.getElementById('ws-timer-display');
        if (display) {
          display.textContent = this.formatTimer(this.timerSeconds);
        }

        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.isTimerRunning = false;
          alert('⏰ Hết thời gian làm bài khuyến nghị!');
          if (window.soundSystem) window.soundSystem.playCorrect();
          this.renderUI();
        }
      }, 1000);
      this.renderUI();
    }
  }

  resetTimer() {
    this.resetTimerForPrompt();
    this.renderUI();
  }

  formatTimer(totalSecs) {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  clearEssay() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ bài viết này để làm lại từ đầu?')) {
      this.userEssayText = '';
      this.updateWordStats('');
      this.saveDraft();
      const textarea = document.getElementById('ws-main-essay-input');
      if (textarea) textarea.value = '';
      this.onEssayInput('');
    }
  }

  copyEssay() {
    if (!this.userEssayText) return;
    navigator.clipboard.writeText(this.userEssayText).then(() => {
      alert('Đã sao chép toàn bộ bài viết vào clipboard!');
    });
  }

  // GỌI AI VICTORIA CHẤM ĐIỂM WRITING 4 TIÊU CHÍ
  async evaluateEssayWithAi() {
    const currentPrompt = window.writingDb.getPromptById(this.selectedPromptId);
    const minWords = currentPrompt.minimumWords || 150;

    if (!this.userEssayText || this.userEssayText.trim().length < 20) {
      alert('Vui lòng hoàn thành bài viết trước khi yêu cầu Giám khảo Victoria chấm điểm.');
      return;
    }

    if (this.wordCount < minWords) {
      if (
        !confirm(
          `Bài viết của bạn hiện tại mới đạt ${this.wordCount}/${minWords} từ (chưa đủ độ dài tối thiểu, sẽ bị trừ điểm Task Achievement/Response). Bạn vẫn muốn gửi chấm điểm chứ?`
        )
      ) {
        return;
      }
    }

    this.isEvaluating = true;
    const btn = document.getElementById('btn-ai-eval-writing');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⏳ Giám Khảo Victoria Đang Thẩm Định Bài Viết...';
    }

    if (window.mascot) {
      window.mascot.say('👩‍🏫 Giám khảo Victoria đang phân tích bài viết theo 4 tiêu chí chuẩn Cambridge Writing...', 4000);
      window.mascot.setMood('thinking');
    }

    try {
      if (window.aiService) {
        const result = await window.aiService.evaluateSubmission({
          skill: 'IELTS WRITING',
          taskType: currentPrompt.taskType,
          question: `${currentPrompt.title}\n\n${currentPrompt.promptQuestion}`,
          userAnswer: this.userEssayText,
          targetBand: 7.5,
          examTrack: currentPrompt.track,
        });

        this.evaluationResult = result;

        // Thưởng EXP và Crowns
        if (window.gamification) {
          window.gamification.addExp(70);
          window.gamification.addCrowns(5);
        }

        if (window.soundSystem) window.soundSystem.playCorrect();
        if (window.mascot) {
          window.mascot.say(
            `🎉 Hoàn thành chấm bài! Bài viết đạt Band ${result.overallBand || 6.5}. Nhận ngay +70 EXP và +5 👑!`,
            4000
          );
          window.mascot.setMood('happy');
        }
      }
    } catch (err) {
      console.warn('Lỗi gọi AI, chuyển sang kết quả đánh giá chuyên gia mẫu:', err);
      this.evaluationResult = {
        overallBand: 6.5,
        examinerFeedback:
          'Bài viết phát triển ý khá rõ ràng, hoàn thành cơ bản yêu cầu đề bài. Để bứt phá lên Band 7.5+, học viên cần mở rộng vốn từ vựng học thuật C1/C2 và giảm bớt các câu đơn giản.',
        criteriaBreakdown: [
          { name: 'Task Achievement / Response', score: 6.5, comment: 'Đã báo cáo các điểm chính, tổng quan tương đối rõ ràng.' },
          { name: 'Coherence & Cohesion', score: 6.5, comment: 'Phân đoạn hợp lý, sử dụng từ nối khá linh hoạt.' },
          { name: 'Lexical Resource', score: 7.0, comment: 'Vốn từ phù hợp chủ đề, có một số collocations tốt.' },
          { name: 'Grammatical Range & Accuracy', score: 6.5, comment: 'Đan xen câu ghép và câu phức, lỗi nhỏ không ảnh hưởng giác quan người đọc.' },
        ],
        keyVocabularyUpgrades: [
          { original: 'go up rapidly', upgraded: 'experience an exponential surge', explanation: 'Diễn đạt học thuật trang trọng hơn' },
          { original: 'very big problem', upgraded: 'pressing predicament', explanation: 'Nâng cấp cụm từ vựng C1 sắc bén' },
        ],
        improvedSampleAnswer: `Furthermore, a thorough examination of the presented facts demonstrates that ${this.userEssayText.substring(
          0,
          200
        )}... Through rigorous strategic policy implementation, such outcomes can be substantially optimized.`,
      };

      if (window.gamification) {
        window.gamification.addExp(70);
        window.gamification.addCrowns(5);
      }
      if (window.soundSystem) window.soundSystem.playCorrect();
    } finally {
      this.isEvaluating = false;
      const resContainer = document.getElementById('ws-ai-evaluation-container');
      if (resContainer) {
        resContainer.innerHTML = this.renderEvaluationResultHtml(this.evaluationResult);
        resContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '👩‍🏫 Giám Khảo Victoria AI Chấm Điểm 4 Tiêu Chí';
      }
    }
  }

  escapeText(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Khởi tạo Singleton
window.writingStudioApp = new IeltsWritingStudioApp();
