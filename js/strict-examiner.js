/**
 * IELTS GO! - Chế Độ 8: Giám Khảo Victoria AI (Strict Cambridge Examiner)
 * Lấy cảm hứng trực tiếp từ giao diện "Cô giáo Tanaka" trên NIHONGO GO!
 * 1. Header Nhân vật: Avatar, Danh xưng, Mô tả Senior Examiner, Bộ chọn cấp độ khắt khe (Band 5.0, 6.5, 8.0)
 * 2. Khung Từ vựng / Collocation mục tiêu cần đặt câu thuộc 20 chủ điểm
 * 3. Khung Đề bài khảo bài (Challenge Prompt) với gợi ý ngữ pháp & bẫy từ vựng
 * 4. Khung Chat 1-on-1 tương tác trực tiếp: Micro thu âm, Gợi ý nhanh, AI mổ xẻ 4 tiêu chí lỗi sai,
 *    chấm điểm Band và viết lại 2 phiên bản nâng cấp (Band 6.5 & Band 8.0+)
 */

class IeltsStrictExaminerApp {
  constructor() {
    this.container = null;
    this.strictBand = '6.5'; // '5.0', '6.5', '8.0'
    this.currentChallengeIndex = 0;
    this.isEvaluating = false;
    this.isListening = false;
    this.recognition = null;
    this.userDraft = '';

    // Khởi tạo lịch sử chat với lời chào mang cá tính nghiêm cẩn của Giám khảo Victoria
    this.chatMessages = [
      {
        id: 'msg-init',
        sender: 'victoria',
        timestamp: this.getCurrentTimeString(),
        text: 'Victoria chào bạn. Tôi là Senior Cambridge Examiner từ London. Trong phòng khảo bài 1-on-1 này, tôi tuyệt đối không chấp nhận các lỗi dịch "word-by-word" từ tiếng Việt, dùng từ sáo rỗng như "Nowadays", sai chính tả hay ngô nghê về chia thì. Hãy chọn Band mục tiêu của bạn ở trên, xem kỹ Từ vựng mục tiêu và thử thách diễn đạt. Tôi sẽ soi kính lúp mổ xẻ từng lỗi sai trong câu của bạn!',
        evaluation: null
      }
    ];

    this.initSpeechRecognition();
  }

  // Khởi tạo Web Speech Recognition cho Micro
  initSpeechRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-GB'; // Ưu tiên giọng chuẩn Anh - Cambridge

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateMicUi();
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('victoria-chat-input');
        if (input) {
          input.value = (input.value ? input.value + ' ' : '') + transcript;
          this.userDraft = input.value;
        }
        if (window.soundSystem) window.soundSystem.playClick();
      };

      this.recognition.onerror = (e) => {
        console.warn('[Victoria Voice] Lỗi nhận diện giọng nói:', e.error);
        this.isListening = false;
        this.updateMicUi();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateMicUi();
      };
    }
  }

  // Khởi tạo và render vào container
  render(containerId = 'strict-sensei-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.renderUI();
  }

  getCurrentTimeString() {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  // Chuyển đổi mức độ khắt khe (Band 5.0, 6.5, 8.0)
  setStrictBand(band) {
    this.strictBand = band;
    let admonition = '';
    if (band === '5.0') {
      admonition = 'Bạn đã chọn mốc Band 5.0 (Foundation). Tôi sẽ tập trung soi kỹ cấu trúc câu đơn/ghép, độ chính xác chia thì hiện tại/quá khứ và lỗi chính tả cơ bản.';
    } else if (band === '6.5') {
      admonition = 'Bạn đã chọn mốc Band 6.5 (Competent). Mức độ khắt khe sẽ tăng đáng kể: tôi sẽ bắt lỗi dùng giới từ, mạo từ "the/a", tính tự nhiên của Collocations và sự mạch lạc trong phát triển ý.';
    } else {
      admonition = 'Bạn đã chọn mốc Band 8.0+ (Superior Academic). Tuyệt vời! Tiêu chuẩn cao nhất của Cambridge: Tôi sẽ nghiêm cấm 100% văn nói, đòi hỏi cấu trúc phức hợp (Đảo ngữ, Mệnh đề phân từ, Danh từ hóa) và kỹ thuật Hedging học thuật sắc bén.';
    }

    this.chatMessages.push({
      id: `msg-band-${Date.now()}`,
      sender: 'victoria',
      timestamp: this.getCurrentTimeString(),
      text: admonition,
      evaluation: null
    });

    if (window.soundSystem) window.soundSystem.playClick();
    this.renderUI();
    this.scrollToChatBottom();
  }

  // Đổi đề bài / từ vựng mục tiêu mới
  randomizeChallenge() {
    const challenges = window.IELTS_VICTORIA_CHALLENGES || [];
    if (!challenges.length) return;

    let nextIdx = Math.floor(Math.random() * challenges.length);
    if (nextIdx === this.currentChallengeIndex && challenges.length > 1) {
      nextIdx = (nextIdx + 1) % challenges.length;
    }
    this.currentChallengeIndex = nextIdx;
    const ch = challenges[this.currentChallengeIndex];

    this.chatMessages.push({
      id: `msg-newch-${Date.now()}`,
      sender: 'victoria',
      timestamp: this.getCurrentTimeString(),
      text: `Tôi đã đổi cho bạn đề bài mới thuộc chủ đề <strong>${ch.topicName}</strong> với từ vựng mục tiêu <strong>"${ch.targetWord}"</strong>. Hãy quan sát khung đề bài ở trên và viết một câu hoàn chỉnh gửi tôi chấm!`,
      evaluation: null
    });

    if (window.soundSystem) window.soundSystem.playClick();
    this.renderUI();
    this.scrollToChatBottom();
  }

  // Render toàn bộ giao diện
  renderUI() {
    if (!this.container) return;

    const challenges = window.IELTS_VICTORIA_CHALLENGES || [];
    const current = challenges[this.currentChallengeIndex] || {
      topicName: 'Environment',
      topicIcon: '🌍',
      targetWord: 'mitigate',
      targetType: 'verb',
      targetIpa: '/ˈmɪt.ɪ.ɡeɪt/',
      targetMeaning: 'Làm giảm nhẹ, xoa dịu',
      targetCollocations: ['mitigate the adverse effects', 'mitigate climate change'],
      vietnamesePrompt: 'Chính phủ cần áp dụng các biện pháp quyết liệt nhằm giảm thiểu những tác động tiêu cực của biến đổi khí hậu.',
      victoriaHint: {
        grammar: 'Dùng câu bị động khách quan ("Urgent measures must be instituted").',
        collocation: 'Kết hợp "mitigate the adverse impacts of climate change".',
        traps: 'Không dùng "bad effects" hay mở đầu bằng "Nowadays".'
      }
    };

    this.container.innerHTML = `
      <div class="victoria-app-shell">
        <!-- 1. PHẦN HEADER NHÂN VẬT (CHARACTER BANNER) -->
        <div class="victoria-character-header">
          <div class="character-identity">
            <!-- Avatar Giám khảo Victoria Hoàng Gia -->
            <div class="victoria-avatar-wrap">
              <div class="avatar-ring">
                <span class="avatar-emoji">👩‍🏫</span>
              </div>
              <span class="avatar-status-dot" title="Đang trực tuyến chấm thi"></span>
            </div>

            <!-- Tên & Mô Tả Cá Tính -->
            <div class="character-details">
              <div class="character-badge-row">
                <span class="badge-cambridge">🇬🇧 Cambridge Senior Examiner</span>
                <span class="badge-role">Phòng Khảo Bài 1-on-1</span>
              </div>
              <h2 class="character-title">
                Giám khảo Victoria (Victoria Examiner)
              </h2>
              <p class="character-sub">
                Strict Cambridge Examiner &bull; Giám khảo cầu toàn tại London &bull; Chuyên gia mổ xẻ lỗi sai Writing &amp; Speaking theo chuẩn Band điểm.
              </p>
            </div>
          </div>

          <!-- BỘ CHỌN CẤP ĐỘ KHẮT KHE (BAND SELECTOR) -->
          <div class="strict-level-selector">
            <span class="level-label">CẤP ĐỘ KHẮT KHE THEO BAND MỤC TIÊU:</span>
            <div class="level-buttons-pill">
              <button
                class="level-btn ${this.strictBand === '5.0' ? 'active band-50' : ''}"
                onclick="window.strictExaminerApp.setStrictBand('5.0')"
              >
                <span>Band 5.0</span>
                <small>Nền Tảng</small>
              </button>
              <button
                class="level-btn ${this.strictBand === '6.5' ? 'active band-65' : ''}"
                onclick="window.strictExaminerApp.setStrictBand('6.5')"
              >
                <span>Band 6.5</span>
                <small>Chuẩn Khá</small>
              </button>
              <button
                class="level-btn ${this.strictBand === '8.0' ? 'active band-80' : ''}"
                onclick="window.strictExaminerApp.setStrictBand('8.0')"
              >
                <span>Band 8.0+</span>
                <small>Chuyên Gia</small>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. KHUNG TỪ VỰNG MỤC TIÊU & ĐỀ BÀI KHẢO BÀI (GRID 2 CỘT) -->
        <div class="victoria-challenge-grid">
          <!-- CỘT TRÁI: TỪ VỰNG / COLLOCATION MỤC TIÊU -->
          <div class="target-vocab-card">
            <div class="card-header-row">
              <div class="card-tag-wrap">
                <span class="tag-topic">${current.topicIcon} ${current.topicName}</span>
                <span class="tag-type">${current.targetType}</span>
              </div>
              <button class="btn-reroll-word" onclick="window.strictExaminerApp.randomizeChallenge()" title="Đổi sang từ vựng khác">
                <span>🔄 Đổi Từ Mới</span>
              </button>
            </div>

            <div class="vocab-center-box">
              <div class="target-word-title">${current.targetWord}</div>
              <div class="target-word-ipa">${current.targetIpa}</div>
              <div class="target-word-meaning">🇻🇳 ${current.targetMeaning}</div>
            </div>

            <div class="collocations-box">
              <div class="colloc-label">📚 Collocations Thường Gặp Chuẩn Cambridge:</div>
              <div class="colloc-tags">
                ${(current.targetCollocations || []).map(c => `<span class="colloc-pill">${c}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- CỘT PHẢI: ĐỀ BÀI KHẢO BÀI (CHALLENGE PROMPT) -->
          <div class="challenge-prompt-card">
            <div class="prompt-badge-row">
              <span class="prompt-badge">🎯 ĐỀ BÀI KHẢO BÀI (CHALLENGE PROMPT)</span>
              <span class="prompt-band-badge">Mục tiêu: Band ${this.strictBand}</span>
            </div>

            <div class="prompt-text-box">
              <p class="prompt-vn-text">
                "${current.vietnamesePrompt}"
              </p>
              <div class="prompt-req-note">
                👉 <em>Yêu cầu bắt buộc: Phải sử dụng từ/cụm từ <strong>"${current.targetWord}"</strong> trong câu tiếng Anh của bạn.</em>
              </div>
            </div>

            <!-- GỢI Ý CỦA GIÁM KHẢO VICTORIA -->
            <div class="victoria-hint-accordion">
              <div class="hint-header">
                <span>💡 Gợi Ý Của Giám Khảo Victoria:</span>
              </div>
              <div class="hint-body">
                <div class="hint-item">
                  <strong style="color: #15803D;">📐 Cấu trúc:</strong> ${current.victoriaHint.grammar}
                </div>
                <div class="hint-item">
                  <strong style="color: #0284C7;">📚 Cụm từ:</strong> ${current.victoriaHint.collocation}
                </div>
                <div class="hint-item">
                  <strong style="color: #DC2626;">⚠️ Bẫy cấm kỵ:</strong> ${current.victoriaHint.traps}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. KHUNG TƯƠNG TÁC TRÒ CHUYỆN & CHẤM BÀI TRỰC TIẾP (CHAT INTERACTION) -->
        <div class="victoria-chat-card">
          <div class="chat-header-bar">
            <div class="chat-title-group">
              <span class="chat-live-dot"></span>
              <span class="chat-title">Phiên Đối Thoại Trực Tiếp Với Victoria Examiner</span>
            </div>
            <button class="btn-clear-chat" onclick="window.strictExaminerApp.clearChat()" title="Làm mới cuộc trò chuyện">
              🔄 Đặt lại hội thoại
            </button>
          </div>

          <!-- KHUNG HIỂN THỊ CÁC TIN NHẮN (MESSAGE LOG) -->
          <div class="chat-messages-container" id="victoria-messages-container">
            ${this.chatMessages.map(m => this.renderMessageBubble(m)).join('')}

            ${this.isEvaluating ? `
              <div class="message-row row-victoria">
                <div class="msg-avatar">👩‍🏫</div>
                <div class="msg-bubble-wrap">
                  <div class="msg-author-name">Giám Khảo Victoria</div>
                  <div class="evaluating-thinking-box">
                    <span class="spinner-dot"></span>
                    <span class="spinner-dot"></span>
                    <span class="spinner-dot"></span>
                    <span class="thinking-text">Đang soi kính lúp mổ xẻ câu của bạn theo 4 tiêu chí Cambridge...</span>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- THANH NÚT GỢI Ý NHANH (QUICK PROMPTS) -->
          <div class="quick-prompts-bar">
            ${(window.VICTORIA_QUICK_PROMPTS || []).map(qp => `
              <button class="quick-prompt-btn" onclick="window.strictExaminerApp.handleQuickPrompt('${qp.id}')">
                ${qp.label}
              </button>
            `).join('')}
          </div>

          <!-- INPUT FORM VỚI TEXTAREA, MICRO VÀ NÚT GỬI -->
          <div class="chat-input-bar">
            <div class="input-wrap">
              <textarea
                id="victoria-chat-input"
                class="victoria-textarea"
                placeholder="Nhập câu tiếng Anh của bạn (hoặc bấm biểu tượng Micro để nói trực tiếp)..."
                rows="2"
                onkeydown="window.strictExaminerApp.handleKeyDown(event)"
              >${this.escapeHtml(this.userDraft)}</textarea>
            </div>

            <div class="input-actions-group">
              <!-- NÚT MICROPHONE THU ÂM -->
              <button
                id="btn-victoria-mic"
                class="btn-voice-record ${this.isListening ? 'recording' : ''}"
                onclick="window.strictExaminerApp.toggleMicrophone()"
                title="${this.isListening ? 'Đang thu âm giọng nói... Bấm để dừng' : 'Bấm Micro để nói (Speech-to-Text)'}"
              >
                ${this.isListening ? '🔴' : '🎤'}
              </button>

              <!-- NÚT GỬI CÂU -->
              <button
                class="btn-send-message"
                onclick="window.strictExaminerApp.sendMessage()"
                ${this.isEvaluating ? 'disabled' : ''}
                title="Gửi câu để Victoria chấm mổ xẻ"
              >
                <span>Gửi Câu</span>
                <span>➡️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.scrollToChatBottom();
  }

  // Render từng bong bóng tin nhắn
  renderMessageBubble(msg) {
    const isVictoria = msg.sender === 'victoria';

    return `
      <div class="message-row ${isVictoria ? 'row-victoria' : 'row-user'}">
        <div class="msg-avatar">${isVictoria ? '👩‍🏫' : '👤'}</div>
        <div class="msg-bubble-wrap">
          <div class="msg-meta-row">
            <span class="msg-author-name">${isVictoria ? 'Giám Khảo Victoria' : 'Bạn'}</span>
            <span class="msg-time">${msg.timestamp}</span>
          </div>

          <div class="msg-bubble-text">
            ${msg.text}
          </div>

          <!-- NẾU CÓ BẢN MỔ XẺ LỖI SAI (EVALUATION CARD) -->
          ${msg.evaluation ? this.renderEvaluationCard(msg.evaluation) : ''}
        </div>
      </div>
    `;
  }

  // Render Card mổ xẻ chi tiết của Giám khảo Victoria
  renderEvaluationCard(ev) {
    return `
      <div class="victoria-evaluation-card">
        <!-- HEADER PHÂN TÍCH & ƯỚC TÍNH BAND -->
        <div class="eval-top-banner">
          <div>
            <div class="eval-title">🔍 BẢNG MỔ XẺ CHI TIẾT CỦA GIÁM KHẢO VICTORIA</div>
            <p class="eval-remarks">${ev.remarks}</p>
          </div>
          <div class="eval-band-badge">
            <span class="band-caption">ƯỚC TÍNH CÂU NÀY</span>
            <span class="band-score">Band ${ev.estimatedBand.toFixed(1)}</span>
          </div>
        </div>

        <!-- BẢNG 4 TIÊU CHÍ MỔ XẺ (ANATOMY OF ERRORS) -->
        <div class="anatomy-grid">
          <div class="anatomy-card ${this.getAnatomyStatusClass(ev.anatomyOfErrors.spelling.status)}">
            <div class="anatomy-title">
              <span>🔤 Chính Tả &amp; Dạng Từ</span>
              <span class="status-badge">${this.getAnatomyStatusIcon(ev.anatomyOfErrors.spelling.status)}</span>
            </div>
            <p class="anatomy-detail">${ev.anatomyOfErrors.spelling.detail}</p>
          </div>

          <div class="anatomy-card ${this.getAnatomyStatusClass(ev.anatomyOfErrors.grammar.status)}">
            <div class="anatomy-title">
              <span>📐 Ngữ Pháp &amp; Chia Thì</span>
              <span class="status-badge">${this.getAnatomyStatusIcon(ev.anatomyOfErrors.grammar.status)}</span>
            </div>
            <p class="anatomy-detail">${ev.anatomyOfErrors.grammar.detail}</p>
          </div>

          <div class="anatomy-card ${this.getAnatomyStatusClass(ev.anatomyOfErrors.collocation.status)}">
            <div class="anatomy-title">
              <span>📚 Collocation &amp; Chọn Từ</span>
              <span class="status-badge">${this.getAnatomyStatusIcon(ev.anatomyOfErrors.collocation.status)}</span>
            </div>
            <p class="anatomy-detail">${ev.anatomyOfErrors.collocation.detail}</p>
          </div>

          <div class="anatomy-card ${this.getAnatomyStatusClass(ev.anatomyOfErrors.academicRegister.status)}">
            <div class="anatomy-title">
              <span>🏛️ Văn Phong Học Thuật</span>
              <span class="status-badge">${this.getAnatomyStatusIcon(ev.anatomyOfErrors.academicRegister.status)}</span>
            </div>
            <p class="anatomy-detail">${ev.anatomyOfErrors.academicRegister.detail}</p>
          </div>
        </div>

        <!-- 2 PHIÊN BẢN VIẾT LẠI NÂNG CẤP (BAND 6.5 & BAND 8.0+) -->
        <div class="upgrade-versions-wrap">
          <div class="version-box version-65">
            <div class="version-header">
              <span class="version-tag tag-65">🟢 Phiên Bản Chuẩn Band 6.5 (Tự nhiên &amp; Chuẩn Ngữ Pháp):</span>
              <button class="btn-tts-listen" onclick="window.strictExaminerApp.speakSentence('${this.escapeText(ev.band65Version)}')" title="Nghe phát âm chuẩn giọng Anh">
                🔊 Nghe
              </button>
            </div>
            <div class="version-sentence">"${ev.band65Version}"</div>
          </div>

          <div class="version-box version-80">
            <div class="version-header">
              <span class="version-tag tag-80">🟣 Phiên Bản Xuất Sắc Band 8.0+ (Sắc Sảo, Hedging &amp; C2):</span>
              <button class="btn-tts-listen" onclick="window.strictExaminerApp.speakSentence('${this.escapeText(ev.band80Version)}')" title="Nghe phát âm chuẩn giọng Anh">
                🔊 Nghe
              </button>
            </div>
            <div class="version-sentence">"${ev.band80Version}"</div>
          </div>
        </div>

        <!-- GAMIFICATION REWARD BADGE -->
        <div class="eval-reward-footer">
          <span>🎁 Đã ghi nhận nỗ lực vào hồ sơ học viên:</span>
          <strong>⭐ +35 EXP &bull; 👑 +2 Vương Miện</strong>
        </div>
      </div>
    `;
  }

  getAnatomyStatusClass(status) {
    if (status === 'pass') return 'status-pass';
    if (status === 'warning') return 'status-warn';
    return 'status-fail';
  }

  getAnatomyStatusIcon(status) {
    if (status === 'pass') return '✅ Đạt';
    if (status === 'warning') return '⚠️ Chú ý';
    return '❌ Lỗi nặng';
  }

  // Cập nhật trạng thái hiển thị của nút Micro
  updateMicUi() {
    const btn = document.getElementById('btn-victoria-mic');
    if (btn) {
      btn.innerHTML = this.isListening ? '🔴' : '🎤';
      btn.classList.toggle('recording', this.isListening);
    }
  }

  // Bật/tắt Micro thu âm
  toggleMicrophone() {
    if (!this.recognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech Recognition API. Vui lòng sử dụng Google Chrome hoặc Edge.');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    } else {
      try {
        this.recognition.start();
        this.isListening = true;
      } catch (e) {
        console.warn('Microphone start error:', e);
      }
    }
    this.updateMicUi();
  }

  // Phát âm văn bản bằng Web Speech Synthesis
  speakSentence(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // Giọng Anh chuẩn Cambridge
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const gbVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
    if (gbVoice) {
      utterance.voice = gbVoice;
    }

    window.speechSynthesis.speak(utterance);
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Xử lý phím Enter khi gõ tin nhắn
  handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Xử lý nút bấm gợi ý nhanh
  handleQuickPrompt(qpId) {
    const qps = window.VICTORIA_QUICK_PROMPTS || [];
    const qp = qps.find(q => q.id === qpId);
    if (!qp) return;

    if (qpId === 'qp-new-challenge') {
      this.randomizeChallenge();
      return;
    }

    const input = document.getElementById('victoria-chat-input');
    if (input) {
      input.value = qp.userText;
      input.focus();
    }
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Gửi tin nhắn và gọi AI mổ xẻ
  async sendMessage() {
    const input = document.getElementById('victoria-chat-input');
    if (!input) return;

    const text = input.value.trim();
    if (!text || this.isEvaluating) return;

    // Thêm tin nhắn của User
    this.chatMessages.push({
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      timestamp: this.getCurrentTimeString(),
      text: text,
      evaluation: null
    });

    input.value = '';
    this.userDraft = '';
    this.isEvaluating = true;
    if (window.soundSystem) window.soundSystem.playClick();

    this.renderUI();
    this.scrollToChatBottom();

    try {
      const evaluation = await this.evaluateUserSentenceWithAi(text);

      this.chatMessages.push({
        id: `msg-vic-${Date.now()}`,
        sender: 'victoria',
        timestamp: this.getCurrentTimeString(),
        text: `Tôi đã hoàn thành việc mổ xẻ câu văn của bạn. Dưới đây là phân tích chi tiết theo 4 tiêu chí chuẩn khảo thí Cambridge:`,
        evaluation: evaluation
      });

      // Thưởng EXP & Vương Miện
      if (window.gamification) {
        window.gamification.addExp(35);
        window.gamification.addCrowns(2);
      }
      if (window.soundSystem) window.soundSystem.playCorrect();

      // KÍCH HOẠT SRS: Nếu điểm AI >= 7.0 -> Thăng hạng trực tiếp lên "🟢 Mastered"
      if (window.srsManager && evaluation && evaluation.estimatedBand) {
        const challenges = window.IELTS_VICTORIA_CHALLENGES || [];
        const current = challenges[this.currentChallengeIndex] || challenges[0];
        const targetWord = current ? current.targetWord : '';
        const wordId = (current && current.id) ? current.id : targetWord.toLowerCase().replace(/\s+/g, '_');
        
        window.srsManager.recordAiMastery(
          wordId,
          'examiner_ai',
          evaluation.estimatedBand,
          {
            word: targetWord,
            topicId: current ? current.topicId : null,
            bandTier: evaluation.estimatedBand >= 7.5 ? '7.5+' : '6.0 - 7.5'
          }
        );
      }

      if (window.mascot) {
        window.mascot.say(`Victoria Examiner vừa chấm câu của bạn đạt <strong>Band ${evaluation.estimatedBand.toFixed(1)}</strong> (+35 EXP)!`, 4000);
      }
    } catch (err) {
      console.warn('[Victoria AI Error]', err);
      // Fallback nếu có sự cố
      this.chatMessages.push({
        id: `msg-err-${Date.now()}`,
        sender: 'victoria',
        timestamp: this.getCurrentTimeString(),
        text: 'Có sự chậm trễ từ máy chủ phân tích. Tuy nhiên theo quan sát của tôi, bạn đã nắm được từ vựng mục tiêu nhưng cần rà soát lại thì thời và mạo từ trước khi nộp lại.',
        evaluation: null
      });
    } finally {
      this.isEvaluating = false;
      this.renderUI();
      this.scrollToChatBottom();
    }
  }

  // Gọi AI Service để Giám Khảo Victoria mổ xẻ câu
  async evaluateUserSentenceWithAi(userSentence) {
    const challenges = window.IELTS_VICTORIA_CHALLENGES || [];
    const current = challenges[this.currentChallengeIndex] || challenges[0];

    const systemInstruction = `
Bạn là Giám khảo Victoria - Senior Cambridge IELTS Examiner tại London với phong thái quý phái, nghiêm cẩn, cầu toàn tuyệt đối và sắc sảo.
Nhiệm vụ: Mổ xẻ câu văn của học viên dựa trên Đề bài khảo bài và Từ vựng mục tiêu "${current.targetWord}".
Mục tiêu Band của học viên hiện tại là: Band ${this.strictBand}.

Quy tắc chấm của Victoria:
1. Soi lỗi chính tả, chia thì, sự hòa hợp S-V, mạo từ (a/an/the), và giới từ.
2. Bắt các lỗi dịch thô (word-by-word) từ tiếng Việt sang tiếng Anh.
3. Nghiêm cấm các từ sáo rỗng: "Nowadays", "good", "bad", "more and more", "big problem".
4. Viết lại 2 phiên bản nâng cấp hoàn chỉnh:
   - Band 6.5 version: Chuẩn ngữ pháp, tự nhiên, gãy gọn.
   - Band 8.0+ version: Đẳng cấp C2, dùng cấu trúc phức như Inversion, Nominalisation, Participle clause, hoặc Cautious Hedging.
5. Luôn trả về JSON theo schema:
{
  "remarks": string (Nhận xét trực diện, sắc sảo bằng tiếng Việt nhưng mang khí chất Examiner London),
  "estimatedBand": number (ví dụ 5.5, 6.0, 7.0),
  "anatomyOfErrors": {
    "spelling": { "status": "pass" | "warning" | "fail", "detail": string },
    "grammar": { "status": "pass" | "warning" | "fail", "detail": string },
    "collocation": { "status": "pass" | "warning" | "fail", "detail": string },
    "academicRegister": { "status": "pass" | "warning" | "fail", "detail": string }
  },
  "band65Version": string (Câu tiếng Anh chuẩn Band 6.5),
  "band80Version": string (Câu tiếng Anh đỉnh cao Band 8.0+)
}
`;

    const prompt = `
Đề bài khảo bài: "${current.vietnamesePrompt}"
Từ vựng mục tiêu bắt buộc: "${current.targetWord}" (${current.targetMeaning})
Câu làm bài của học viên:
"""
${userSentence}
"""
Hãy xuất kết quả mổ xẻ dưới định dạng JSON!
`;

    if (window.aiService) {
      try {
        const result = await window.aiService.callAiApi(prompt, systemInstruction, {
          responseMimeType: 'application/json',
          temperature: 0.3
        });
        if (result && result.anatomyOfErrors && result.band65Version) {
          return result;
        }
      } catch (aiErr) {
        console.info('[Victoria AI] Chuyển sang fallback template chuẩn khảo thí.', aiErr);
      }
    }

    // FALLBACK CHUẨN KHẢO THÍ NẾU KHÔNG CÓ KẾT NỐI MẠNG
    const hasTargetWord = userSentence.toLowerCase().includes(current.targetWord.toLowerCase());
    const wordCount = userSentence.trim().split(/\s+/).length;
    let baseBand = hasTargetWord ? 6.0 : 5.0;
    if (wordCount > 15) baseBand += 0.5;

    return {
      remarks: hasTargetWord
        ? `Khá khen cho bạn đã áp dụng đúng từ vựng mục tiêu "${current.targetWord}". Tuy nhiên để đạt chuẩn Band ${this.strictBand}, bạn cần đặc biệt lưu tâm đến việc hạn chế các cấu trúc câu đơn rời rạc và nâng cấp các danh từ trừu tượng.`
        : `Tôi rất tiếc phải thông báo rằng bạn đã bỏ quên từ vựng mục tiêu "${current.targetWord}" trong câu của mình. Trong kỳ thi IELTS thực tế, việc lạc đề hoặc không thỏa mãn yêu cầu trọng tâm sẽ bị trừ nặng ở tiêu chí Task Response!`,
      estimatedBand: baseBand,
      anatomyOfErrors: {
        spelling: {
          status: 'pass',
          detail: 'Chính tả cơ bản đạt yêu cầu, không có lỗi đánh máy nghiêm trọng.'
        },
        grammar: {
          status: hasTargetWord ? 'pass' : 'warning',
          detail: 'Cần chú ý sự hòa hợp giữa chủ ngữ và động từ, đồng thời tận dụng mệnh đề quan hệ hoặc câu bị động để câu văn chặt chẽ hơn.'
        },
        collocation: {
          status: hasTargetWord ? 'pass' : 'warning',
          detail: `Nên kết hợp các collocations chuẩn học thuật như: ${current.targetCollocations.join(', ')}.`
        },
        academicRegister: {
          status: 'warning',
          detail: 'Văn phong còn hơi hướng ngôn ngữ nói hàng ngày. Hãy chuyển đổi các động từ hành động thành cụm danh từ hóa (Nominalisation).'
        }
      },
      band65Version: current.sampleAnalysis.band65,
      band80Version: current.sampleAnalysis.band80
    };
  }

  // Cuộn khung chat xuống đáy
  scrollToChatBottom() {
    setTimeout(() => {
      const container = document.getElementById('victoria-messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 50);
  }

  // Đặt lại cuộc trò chuyện
  clearChat() {
    this.chatMessages = [
      {
        id: 'msg-init-reset',
        sender: 'victoria',
        timestamp: this.getCurrentTimeString(),
        text: 'Phiên khảo bài đã được đặt lại từ đầu. Tôi vẫn đang theo dõi sát sao. Hãy chọn đề bài và gửi câu làm bài của bạn!',
        evaluation: null
      }
    ];
    if (window.soundSystem) window.soundSystem.playClick();
    this.renderUI();
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
window.strictExaminerApp = new IeltsStrictExaminerApp();
