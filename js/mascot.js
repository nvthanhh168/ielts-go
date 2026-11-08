/**
 * IELTS GO! - Mascot & Virtual Companion Engine
 * Nhân vật trợ lý đồng hành:
 * 1. Barnaby Sensei (Chú chó Corgi Hoàng gia Anh 🐕) - Đáng yêu, lịch thiệp, cổ vũ người học
 * 2. Giám khảo Victoria AI (Senior Cambridge Examiner 👩‍🏫) - Khắt khe, học thuật, chuẩn mực Oxford
 */

const IELTS_TIPS_DATABASE = [
  // Tips Listening
  { category: 'Listening', tip: '💡 Chú ý giới hạn từ (ví dụ "NO MORE THAN TWO WORDS"). Viết thừa một mạo từ như "the" là mất trọn 1 điểm!' },
  { category: 'Listening', tip: '💡 Kiểm tra đuôi số nhiều "-s" cẩn thận khi nghe Section 1 và Section 4. Đây là bẫy phổ biến nhất của đề Cambridge.' },
  { category: 'Listening', tip: '💡 Tận dụng 30-45 giây trước mỗi Section để gạch chân từ khóa (keywords) và đoán trước loại từ cần điền (danh từ, số tiền, ngày tháng).' },
  // Tips Reading
  { category: 'Reading', tip: '💡 FALSE khác NOT GIVEN: FALSE là thông tin mâu thuẫn trực tiếp với bài đọc; NOT GIVEN là bài đọc hoàn toàn không khẳng định hay phủ định.' },
  { category: 'Reading', tip: '💡 Đừng đọc từng chữ từ đầu đến cuối! Hãy Skim 2-3 phút để nắm ý chính của từng đoạn và vị trí Topic Sentence.' },
  { category: 'Reading', tip: '💡 Khi gặp câu hỏi Headings, hãy đọc lướt câu đầu và câu cuối đoạn văn trước, vì đó thường là luận điểm chính.' },
  // Tips Writing
  { category: 'Writing', tip: '💡 Tuyệt đối không dùng từ viết tắt trong IELTS Academic Writing! Hãy viết "do not", "cannot" thay vì "don\'t", "can\'t".' },
  { category: 'Writing', tip: '💡 Ở Task 1, luôn viết một đoạn Tổng quan (Overview) rõ ràng nêu bật 2-3 xu hướng chính, nếu không bài viết khó vượt qua Band 5.0.' },
  { category: 'Writing', tip: '💡 Task 2 chiếm 2/3 tổng điểm Writing! Hãy dành trọn 40 phút và viết tối thiểu 250 từ để tránh bị trừ điểm Task Response.' },
  // Tips Speaking
  { category: 'Speaking', tip: '💡 Đừng im lặng quá 3 giây! Nếu cần suy nghĩ, hãy dùng các cụm câu giờ tự nhiên: "That\'s quite a thought-provoking question, let me see..."' },
  { category: 'Speaking', tip: '💡 Ở Part 2, hãy tận dụng trọn vẹn 1 phút chuẩn bị để ghi chép 4-5 từ khóa quan trọng cho từng bullet point trên Cue Card.' },
  { category: 'Speaking', tip: '💡 Để đạt Band 7.0+ Lexical Resource, hãy dùng các cụm từ kết hợp tự nhiên (collocations) như "bitterly disappointed" thay vì từ hoa mỹ gượng gạo.' },
  // Tips Gamification & Focus
  { category: 'Motivation', tip: '✨ Học đều đặn 20 phút mỗi ngày hiệu quả gấp 5 lần so với việc dồn 4 tiếng học một buổi cuối tuần!' },
  { category: 'Motivation', tip: '👑 Tích lũy Vương Miện 👑 qua mỗi bài học để mở khóa các phân tích mẹo thi nâng cao từ Giám khảo Victoria!' }
];

class IeltsMascotEngine {
  constructor(containerId = 'mascot-container') {
    this.container = document.getElementById(containerId);
    this.character = 'barnaby'; // 'barnaby' (Corgi) hoặc 'victoria' (Giám khảo)
    this.currentMood = 'idle';
    this.speechTimeout = null;
    this.tipInterval = null;
    this.render();
    this.startPeriodicTips();
    setTimeout(() => this.checkSrsDueReviewsAndNotify(), 1200);
  }

  // Khởi tạo và vẽ SVG giao diện
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="mascot-wrapper" id="mascot-wrapper">
        <!-- Nút chuyển đổi nhân vật: Barnaby Sensei vs Giám khảo Victoria -->
        <div class="mascot-char-switcher">
          <button class="char-pill-btn ${this.character === 'barnaby' ? 'active' : ''}" id="char-btn-barnaby" onclick="window.mascot.setCharacter('barnaby')" title="Trợ lý Barnaby Corgi">
            🐕 Barnaby
          </button>
          <button class="char-pill-btn ${this.character === 'victoria' ? 'active' : ''}" id="char-btn-victoria" onclick="window.mascot.setCharacter('victoria')" title="Giám khảo Victoria AI">
            👩‍🏫 Victoria
          </button>
        </div>

        <!-- Bong bóng lời thoại (Speech Bubble) -->
        <div class="mascot-bubble" id="mascot-bubble" onclick="window.mascot.giveRandomTip()" title="Nhấn để nghe thêm mẹo thi IELTS!">
          <div class="bubble-tag" id="mascot-bubble-tag">IELTS Tip</div>
          <span id="mascot-text">Cheerio! Tôi là Barnaby Sensei. Hãy cùng chinh phục tấm vé du học với Band 7.5+ nhé! 🇬🇧 🐾</span>
        </div>

        <!-- Khung chứa Vector SVG nhân vật hoạt hình -->
        <div class="mascot-body-container anim-idle" id="mascot-avatar" onclick="window.mascot.onMascotClick()">
          
          <!-- ================= NHÂN VẬT 1: BARNABY SENSEI (CORGI HOÀNG GIA ANH) ================= -->
          <div id="barnaby-svg-wrap" class="mascot-char-wrap" style="display: ${this.character === 'barnaby' ? 'block' : 'none'};">
            <svg class="mascot-svg" viewBox="0 0 200 200" width="165" height="165">
              <defs>
                <linearGradient id="corgiFur" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFA94D" />
                  <stop offset="100%" stop-color="#E8590C" />
                </linearGradient>
                <linearGradient id="corgiWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFFFFF" />
                  <stop offset="100%" stop-color="#FFF4E6" />
                </linearGradient>
                <linearGradient id="royalGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFD43B" />
                  <stop offset="100%" stop-color="#F59F00" />
                </linearGradient>
                <linearGradient id="royalRuby" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FA5252" />
                  <stop offset="100%" stop-color="#C92A2A" />
                </linearGradient>
              </defs>

              <!-- Vương miện hoàng gia nhỏ trên đỉnh đầu -->
              <g class="corgi-crown" transform="translate(75, 20)">
                <path d="M0,20 L10,5 L25,18 L40,5 L50,20 Z" fill="url(#royalGold)" stroke="#D97706" stroke-width="2" />
                <circle cx="10" cy="5" r="3" fill="url(#royalRuby)" />
                <circle cx="25" cy="18" r="3" fill="#4DABF7" />
                <circle cx="40" cy="5" r="3" fill="url(#royalRuby)" />
                <rect x="0" y="20" width="50" height="5" rx="2" fill="url(#royalGold)" />
              </g>

              <!-- Tai Corgi to hình tam giác vểnh đặc trưng -->
              <g class="corgi-ears">
                <!-- Tai trái -->
                <path d="M45,80 C30,30 55,25 75,55 Z" fill="url(#corgiFur)" />
                <path d="M52,70 C42,40 58,35 68,55 Z" fill="#FFA8A8" opacity="0.75" />
                <!-- Tai phải -->
                <path d="M155,80 C170,30 145,25 125,55 Z" fill="url(#corgiFur)" />
                <path d="M148,70 C158,40 142,35 132,55 Z" fill="#FFA8A8" opacity="0.75" />
              </g>

              <!-- Đầu tròn của Corgi -->
              <ellipse cx="100" cy="100" rx="55" ry="48" fill="url(#corgiFur)" />

              <!-- Mảng lông trắng ở trán kéo xuống mõm -->
              <path d="M92,60 C96,80 80,105 70,120 C85,130 115,130 130,120 C120,105 104,80 108,60 Z" fill="url(#corgiWhite)" />

              <!-- Mắt đen tròn long lanh chớp mắt -->
              <g class="corgi-eyes">
                <circle cx="75" cy="95" r="7.5" fill="#2B2D42" />
                <circle cx="72.5" cy="92.5" r="2.5" fill="#FFFFFF" />
                <circle cx="125" cy="95" r="7.5" fill="#2B2D42" />
                <circle cx="122.5" cy="92.5" r="2.5" fill="#FFFFFF" />
              </g>

              <!-- Mũi đen nhỏ hình tam giác bo tròn -->
              <path d="M93,110 Q100,106 107,110 Q100,118 93,110 Z" fill="#2B2D42" />

              <!-- Miệng cười hình chữ W -->
              <path d="M90,118 Q95,124 100,119 Q105,124 110,118" fill="none" stroke="#2B2D42" stroke-width="2.5" stroke-linecap="round" />

              <!-- Lưỡi hồng thè ra khi vui vẻ -->
              <path id="corgi-tongue" d="M96,120 C96,128 104,128 104,120 Z" fill="#FF8787" />

              <!-- Má hồng kawaii -->
              <ellipse cx="62" cy="108" rx="8" ry="5" fill="#FFA8A8" opacity="0.6" />
              <ellipse cx="138" cy="108" rx="8" ry="5" fill="#FFA8A8" opacity="0.6" />

              <!-- Nơ cổ cờ Hoàng gia Anh (Union Jack Bowtie) -->
              <g class="corgi-bowtie" transform="translate(78, 142)">
                <path d="M0,5 L20,12 L0,20 Z" fill="#1864AB" />
                <path d="M44,5 L24,12 L44,20 Z" fill="#1864AB" />
                <circle cx="22" cy="12" r="6" fill="#C92A2A" stroke="#FFFFFF" stroke-width="1.5" />
              </g>

              <!-- Chân trước nhỏ mập mạp bám mép -->
              <ellipse cx="70" cy="170" rx="14" ry="12" fill="url(#corgiWhite)" stroke="#E8590C" stroke-width="1" />
              <ellipse cx="130" cy="170" rx="14" ry="12" fill="url(#corgiWhite)" stroke="#E8590C" stroke-width="1" />
            </svg>
          </div>

          <!-- ================= NHÂN VẬT 2: GIÁM KHẢO VICTORIA AI ================= -->
          <div id="victoria-svg-wrap" class="mascot-char-wrap" style="display: ${this.character === 'victoria' ? 'block' : 'none'};">
            <svg class="mascot-svg" viewBox="0 0 200 200" width="165" height="165">
              <defs>
                <linearGradient id="blazerNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#1E293B" />
                  <stop offset="100%" stop-color="#0F172A" />
                </linearGradient>
                <linearGradient id="hairBrunette" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#78350F" />
                  <stop offset="100%" stop-color="#451A03" />
                </linearGradient>
              </defs>

              <!-- Búi tóc Oxford trang nhã phía sau -->
              <circle cx="100" cy="45" r="24" fill="url(#hairBrunette)" />
              <circle cx="100" cy="45" r="26" fill="none" stroke="#D97706" stroke-width="2" stroke-dasharray="4 2" />

              <!-- Thân áo Blazer giám khảo trang trọng -->
              <path d="M60,195 L65,145 L100,165 L135,145 L140,195 Z" fill="url(#blazerNavy)" />
              <path d="M85,150 L100,180 L115,150 Z" fill="#FFFFFF" /> <!-- Cổ áo sơ mi trắng -->
              <path d="M96,160 L100,195 L104,160 Z" fill="#991B1B" /> <!-- Cà vạt đỏ đậm -->

              <!-- Cổ & Khuôn mặt thanh tú -->
              <rect x="90" y="125" width="20" height="22" fill="#FDE68A" />
              <ellipse cx="100" cy="95" rx="42" ry="45" fill="#FEF3C7" />

              <!-- Mái tóc rẽ ngôi thanh lịch -->
              <path d="M58,85 C65,55 90,50 100,58 C110,50 135,55 142,85 C140,70 120,55 100,60 C80,55 60,70 58,85 Z" fill="url(#hairBrunette)" />

              <!-- Kính gọng vàng Oxford trí thức -->
              <g class="victoria-glasses">
                <rect x="68" y="85" width="26" height="18" rx="4" fill="rgba(255,255,255,0.4)" stroke="#B45309" stroke-width="2.5" />
                <rect x="106" y="85" width="26" height="18" rx="4" fill="rgba(255,255,255,0.4)" stroke="#B45309" stroke-width="2.5" />
                <line x1="94" y1="94" x2="106" y2="94" stroke="#B45309" stroke-width="2.5" />
                <!-- Mắt tinh anh sắc sảo -->
                <circle cx="81" cy="94" r="4" fill="#1E293B" />
                <circle cx="119" cy="94" r="4" fill="#1E293B" />
              </g>

              <!-- Miệng cười điềm đạm -->
              <path d="M92,122 Q100,128 108,122" fill="none" stroke="#991B1B" stroke-width="2" stroke-linecap="round" />

              <!-- Bút máy vàng và Bảng điểm Cambridge (Clipboard) -->
              <g transform="translate(140, 130) rotate(-15)">
                <rect x="0" y="0" width="28" height="42" rx="3" fill="#D97706" stroke="#92400E" stroke-width="1.5" />
                <rect x="4" y="4" width="20" height="34" rx="2" fill="#FFFFFF" />
                <line x1="7" y1="10" x2="21" y2="10" stroke="#E11D48" stroke-width="1.5" />
                <line x1="7" y1="16" x2="18" y2="16" stroke="#64748B" stroke-width="1" />
                <line x1="7" y1="22" x2="20" y2="22" stroke="#64748B" stroke-width="1" />
              </g>
            </svg>
          </div>
        </div>

        <div class="mascot-info">
          <div class="mascot-name" id="mascot-name">Barnaby Sensei 🐕</div>
          <div class="mascot-role" id="mascot-role">Trợ lý Corgi Hoàng gia Anh</div>
        </div>
      </div>
    `;
  }

  // Chuyển đổi giữa 2 nhân vật Barnaby và Victoria
  setCharacter(name) {
    if (name !== 'barnaby' && name !== 'victoria') return;
    this.character = name;

    const btnBarnaby = document.getElementById('char-btn-barnaby');
    const btnVictoria = document.getElementById('char-btn-victoria');
    if (btnBarnaby && btnVictoria) {
      btnBarnaby.classList.toggle('active', name === 'barnaby');
      btnVictoria.classList.toggle('active', name === 'victoria');
    }

    const barnabySvg = document.getElementById('barnaby-svg-wrap');
    const victoriaSvg = document.getElementById('victoria-svg-wrap');
    if (barnabySvg && victoriaSvg) {
      barnabySvg.style.display = name === 'barnaby' ? 'block' : 'none';
      victoriaSvg.style.display = name === 'victoria' ? 'block' : 'none';
    }

    const nameEl = document.getElementById('mascot-name');
    const roleEl = document.getElementById('mascot-role');
    const tagEl = document.getElementById('mascot-bubble-tag');

    if (name === 'barnaby') {
      if (nameEl) nameEl.textContent = 'Barnaby Sensei 🐕';
      if (roleEl) roleEl.textContent = 'Trợ lý Corgi Hoàng gia Anh';
      if (tagEl) tagEl.textContent = 'Barnaby Cheerio!';
      this.say('Splendid! Tôi là Barnaby. Cứ tự tin làm bài, tôi luôn ở cạnh bạn! 🐾', 3500);
      this.setMood('happy');
    } else {
      if (nameEl) nameEl.textContent = 'Victoria AI 👩‍🏫';
      if (roleEl) roleEl.textContent = 'Senior Cambridge Examiner';
      if (tagEl) tagEl.textContent = 'Examiner Feedback';
      this.say('Chào bạn. Tôi là Victoria. Hãy tập trung chuẩn xác từng từ vựng và cấu trúc ngữ pháp nhé.', 4000);
      this.setMood('strict');
    }
  }

  // Thiết lập tâm trạng hoạt hình
  setMood(mood) {
    this.currentMood = mood;
    const avatar = document.getElementById('mascot-avatar');
    if (!avatar) return;

    avatar.classList.remove('anim-idle', 'anim-happy', 'anim-strict', 'anim-thinking', 'anim-encouraging');
    switch (mood) {
      case 'happy':
        avatar.classList.add('anim-happy');
        break;
      case 'strict':
        avatar.classList.add('anim-strict');
        break;
      case 'thinking':
        avatar.classList.add('anim-thinking');
        break;
      case 'encouraging':
        avatar.classList.add('anim-encouraging');
        break;
      default:
        avatar.classList.add('anim-idle');
    }

    // Tự động trở về trạng thái idle sau 3.5 giây
    if (mood !== 'idle') {
      setTimeout(() => {
        if (avatar && this.currentMood === mood) {
          avatar.classList.remove('anim-happy', 'anim-strict', 'anim-thinking', 'anim-encouraging');
          avatar.classList.add('anim-idle');
          this.currentMood = 'idle';
        }
      }, 3500);
    }
  }

  // Hiển thị lời thoại lên Speech Bubble
  say(text, duration = 4000) {
    const textEl = document.getElementById('mascot-text');
    const bubble = document.getElementById('mascot-bubble');
    if (!textEl || !bubble) return;

    textEl.innerHTML = text;
    bubble.classList.remove('pop-anim');
    void bubble.offsetWidth; // trigger reflow
    bubble.classList.add('pop-anim');

    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    if (duration > 0) {
      this.speechTimeout = setTimeout(() => {
        // Sau duration, có thể để nguyên hoặc đổi tip ngẫu nhiên
      }, duration);
    }
  }

  // Đưa ra một mẹo thi IELTS ngẫu nhiên
  giveRandomTip() {
    const item = IELTS_TIPS_DATABASE[Math.floor(Math.random() * IELTS_TIPS_DATABASE.length)];
    const tagEl = document.getElementById('mascot-bubble-tag');
    if (tagEl) tagEl.textContent = `${item.category} Tip`;

    this.say(item.tip, 6000);
    this.setMood('encouraging');
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Khi click vào Mascot
  onMascotClick() {
    if (this.character === 'barnaby') {
      const compliments = [
        'Woof! Bạn đang tiến bộ rõ rệt từng ngày đấy! 🐾',
        'Brilliant! Hãy giữ vững ngọn lửa học tập nhé! 🔥',
        'Corgi gửi bạn một vương miện may mắn nè! 👑',
        'Đừng lo lắng về điểm số ban đầu, quan trọng là tính kỷ luật mỗi ngày!',
      ];
      this.say(compliments[Math.floor(Math.random() * compliments.length)], 3500);
      this.setMood('happy');
    } else {
      const examinerRemarks = [
        'Victoria nhắc nhở: Hãy kiểm soát chặt chẽ thời gian làm bài, đặc biệt là Reading Passage 3.',
        'Chú ý các từ nối (linking devices) phải thật tự nhiên, tránh lạm dụng rập khuôn.',
        'Tuyệt đối không bỏ trống bất kỳ câu trả lời nào trong bài thi Listening & Reading!',
      ];
      this.say(examinerRemarks[Math.floor(Math.random() * examinerRemarks.length)], 4000);
      this.setMood('strict');
    }
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Cổ vũ khi đạt chuỗi combo đúng liên tiếp
  celebrateCombo(count) {
    if (count >= 3) {
      this.say(`🔥 TUYỆT VỜI! Bạn đã trả lời đúng ${count} câu liên tiếp! Giữ vững phong độ nào!`, 4000);
      this.setMood('happy');
      if (window.soundSystem) window.soundSystem.playCorrect();
    }
  }

  // Chúc mừng khi duy trì streak
  celebrateStreak(days) {
    this.say(`👑 CHÚC MỪNG! Chuỗi ${days} ngày học liên tục được thắp sáng rực rỡ! Thưởng +5 👑!`, 5000);
    this.setMood('happy');
    if (window.soundSystem) window.soundSystem.playLevelUp();
  }

  // Kiểm tra lịch nhắc Spaced Repetition tự động và thông báo qua Corgi Barnaby ở Sidebar
  checkSrsDueReviewsAndNotify() {
    if (!window.srsManager) return;

    const dueByBand = window.srsManager.getDueReviewsGroupedByBand();
    let totalDue = 0;
    let maxBand = '6.0 - 7.5';
    let maxCount = 0;

    Object.entries(dueByBand).forEach(([band, count]) => {
      totalDue += count;
      if (count > maxCount) {
        maxCount = count;
        maxBand = band;
      }
    });

    const tagEl = document.getElementById('mascot-bubble-tag');

    if (totalDue > 0) {
      if (tagEl) tagEl.textContent = 'Spaced Repetition Radar ⏰';
      // Đảm bảo nhân vật Barnaby được kích hoạt khi nhắc học từ vựng
      if (this.character !== 'barnaby') {
        this.setCharacter('barnaby');
      }

      const bandDisplay = maxBand === '6.0 - 7.5' ? 'Band 6.0' : `Band ${maxBand}`;
      const msg = `🐾 Woof! Hôm nay bạn có <strong>${maxCount || totalDue} từ thuộc ${bandDisplay}</strong> cần ôn lại để không bị quên nhé! Hãy vào Flashcard hoặc Quiz ngay nào!<div style="margin-top:8px;"><button class="btn-bubble-quick-srs" onclick="event.stopPropagation(); window.app && window.app.openSrsDueReview ? window.app.openSrsDueReview('${maxBand}') : (window.app && window.app.switchTab('flashcard'))">⚡ Ôn Ngay (${totalDue} từ)</button></div>`;
      this.say(msg, 12000);
      this.setMood('encouraging');
    } else {
      if (tagEl) tagEl.textContent = 'Spaced Repetition 🌟';
      this.say('🐾 Woof! Thật tuyệt vời! Toàn bộ từ vựng đã được ôn tập đúng hạn hôm nay. Hãy học thêm từ mới để nâng Band nhé! 👑', 5000);
      this.setMood('happy');
    }
  }

  // Đổi tip định kỳ mỗi 45 giây nếu người dùng không tương tác
  startPeriodicTips() {
    this.tipInterval = setInterval(() => {
      if (this.currentMood === 'idle') {
        const item = IELTS_TIPS_DATABASE[Math.floor(Math.random() * IELTS_TIPS_DATABASE.length)];
        const tagEl = document.getElementById('mascot-bubble-tag');
        if (tagEl) tagEl.textContent = `${item.category} Tip`;
        this.say(item.tip, 7000);
      }
    }, 45000);
  }
}

if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', () => {
    window.mascot = new IeltsMascotEngine('mascot-container');
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IeltsMascotEngine,
    IELTS_TIPS_DATABASE,
  };
}
