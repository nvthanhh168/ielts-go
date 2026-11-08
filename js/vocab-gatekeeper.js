/**
 * IELTS GO! - Vocabulary Level-Gatekeeping Engine
 * Cơ chế tích lũy đủ từ vựng để vượt Band điểm (Vocabulary Pyramid 5 Tầng Chuẩn Cambridge)
 */

const IELTS_VOCAB_PYRAMID_LEVELS = [
  {
    level: 1,
    tierKey: 'Mất gốc',
    bandName: 'Band 0 - 3.5',
    cefr: 'A1 - A2',
    title: 'Mất Gốc Nền Tảng (Foundation)',
    icon: '🌱',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#F87171',
    accentGradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    incrementTarget: 300,
    cumulativeTarget: 300,
    realWorldEquiv: '1.500 từ vựng thực tế',
    lexicalFocus: '300 Core Everyday Words (Từ vựng giao tiếp & sinh hoạt căn bản)',
    description: 'Nắm vững 300 từ vựng cốt lõi thường gặp nhất trong sinh hoạt hàng ngày, phát âm chuẩn và các mẫu câu đơn để bứt phá khỏi vùng mất gốc.',
    unlockGoal: 'Mở khóa Level 2 (Band < 4.5)',
    nextBandName: 'Band < 4.5',
    rewards: {
      exp: 150,
      crowns: 15,
      badge: '🌱 Nền Tảng Vững Chắc (Foundation Master)',
      unlockedStage: 'Chặng 2: Sơ cấp (Band < 4.5)'
    }
  },
  {
    level: 2,
    tierKey: '< 4.5',
    bandName: 'Band < 4.5',
    cefr: 'A2 - B1',
    title: 'Sơ Cấp (Pre-Intermediate)',
    icon: '🥉',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    borderColor: '#FB923C',
    accentGradient: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)',
    incrementTarget: 500,
    cumulativeTarget: 800,
    realWorldEquiv: '2.500 từ vựng thực tế',
    lexicalFocus: '500 General Topic Words (Từ vựng 20 chủ điểm mở rộng)',
    description: 'Tích lũy thêm 500 từ vựng bao quát 20 chủ đề IELTS quen thuộc (Food, Shopping, Weather, Sports...), làm quen với dạng đề Cambridge Section 1 & 2.',
    unlockGoal: 'Mở khóa Level 3 (Band 4.5 - 6.0)',
    nextBandName: 'Band 4.5 - 6.0',
    rewards: {
      exp: 250,
      crowns: 25,
      badge: '🥉 Sơ Cấp Đột Phá (Elementary Striker)',
      unlockedStage: 'Chặng 3: Trung cấp (Band 4.5 - 6.0)'
    }
  },
  {
    level: 3,
    tierKey: '4.5 - 6.0',
    bandName: 'Band 4.5 - 6.0',
    cefr: 'B1 - B2',
    title: 'Trung Cấp (Intermediate)',
    icon: '🥈',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#60A5FA',
    accentGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    incrementTarget: 700,
    cumulativeTarget: 1500,
    realWorldEquiv: '4.000 từ vựng thực tế',
    lexicalFocus: '700 Academic Words (Từ vựng học thuật AWL & Task 1/2)',
    description: 'Chinh phục 700 từ vựng học thuật chuẩn Cambridge Academic Word List, từ ngữ mô tả xu hướng số liệu Task 1 và từ vựng lập luận Task 2.',
    unlockGoal: 'Mở khóa Level 4 (Band 6.0 - 7.5)',
    nextBandName: 'Band 6.0 - 7.5',
    rewards: {
      exp: 400,
      crowns: 40,
      badge: '🥈 Học Thuật Tiêu Chuẩn (Academic Standard)',
      unlockedStage: 'Chặng 4: Nâng cao (Band 6.0 - 7.5)'
    }
  },
  {
    level: 4,
    tierKey: '6.0 - 7.5',
    bandName: 'Band 6.0 - 7.5',
    cefr: 'B2 - C1',
    title: 'Nâng Cao (Upper-Intermediate - Chuẩn Du Học)',
    icon: '🥇',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#34D399',
    accentGradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    incrementTarget: 600,
    cumulativeTarget: 2100,
    realWorldEquiv: '6.000 từ vựng thực tế',
    lexicalFocus: '600 Collocations, Phrasal Verbs & Idioms',
    description: 'Làm chủ 600 cụm từ kết hợp tự nhiên (Collocations C1), thành ngữ và cụm động từ chuẩn Cambridge, giúp bài thi Speaking & Writing đạt độ tự nhiên bản xứ.',
    unlockGoal: 'Mở khóa Level 5 (Band 7.5 - 9.0)',
    nextBandName: 'Band 7.5+',
    rewards: {
      exp: 600,
      crowns: 60,
      badge: '🥇 Bản Lĩnh Du Học (Global Scholar)',
      unlockedStage: 'Chặng 5: Chuyên gia (Band 7.5+)'
    }
  },
  {
    level: 5,
    tierKey: '7.5+',
    bandName: 'Band 7.5 - 9.0',
    cefr: 'C1 - C2',
    title: 'Chuyên Gia (Advanced / Expert Master)',
    icon: '👑',
    color: '#7C3AED',
    bgColor: '#FAF5FF',
    borderColor: '#A78BFA',
    accentGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    incrementTarget: 400,
    cumulativeTarget: 2500,
    realWorldEquiv: '8.000 - 9.000+ từ vựng thực tế',
    lexicalFocus: '400 Advanced Lexical Items (Ngữ liệu tinh hoa C1/C2)',
    description: 'Chinh phục 400 từ vựng hiếm (Less Common Lexis), kiểm soát sắc thái biểu đạt học thuật tinh tế, tiệm cận bản xứ và chinh phục Band 8.0 - 9.0 tuyệt đối.',
    unlockGoal: 'Đạt Đỉnh Tháp Đại Sư (Mastery Complete)',
    nextBandName: 'Đỉnh Tháp Đại Sư',
    rewards: {
      exp: 1000,
      crowns: 100,
      badge: '👑 Đại Sư Ngôn Ngữ (Cambridge Lexical Master 9.0)',
      unlockedStage: 'Tốt nghiệp toàn diện IELTS GO!'
    }
  }
];

class IeltsVocabGatekeeperEngine {
  constructor() {
    this.levels = IELTS_VOCAB_PYRAMID_LEVELS;
    this.totalCourseTarget = 2500;
  }

  /**
   * Phân tích trạng thái tích lũy từ vựng qua 5 tầng Gatekeeping
   * @param {number} totalVocabCount - Số từ đã thuộc tích lũy
   * @returns {Object} Chi tiết trạng thái gatekeeper
   */
  getStatus(totalVocabCount = 0) {
    const totalMastered = Math.max(0, parseInt(totalVocabCount, 10) || 0);

    // Xác định số từ đã thuộc ở từng tầng
    const l1Learned = Math.min(300, totalMastered);
    const l2Learned = Math.min(500, Math.max(0, totalMastered - 300));
    const l3Learned = Math.min(700, Math.max(0, totalMastered - 800));
    const l4Learned = Math.min(600, Math.max(0, totalMastered - 1500));
    const l5Learned = Math.min(400, Math.max(0, totalMastered - 2100));

    // Xác định Level đang hoạt động (Active Level: 1 đến 5)
    let activeLevelIndex = 0;
    if (totalMastered >= 2100) {
      activeLevelIndex = 4; // Level 5
    } else if (totalMastered >= 1500) {
      activeLevelIndex = 3; // Level 4
    } else if (totalMastered >= 800) {
      activeLevelIndex = 2; // Level 3
    } else if (totalMastered >= 300) {
      activeLevelIndex = 1; // Level 2
    } else {
      activeLevelIndex = 0; // Level 1
    }

    const activeLevelConfig = this.levels[activeLevelIndex];

    // Số từ đã thuộc trong tầng hiện tại
    let currentLevelLearned = 0;
    if (activeLevelIndex === 0) currentLevelLearned = l1Learned;
    else if (activeLevelIndex === 1) currentLevelLearned = l2Learned;
    else if (activeLevelIndex === 2) currentLevelLearned = l3Learned;
    else if (activeLevelIndex === 3) currentLevelLearned = l4Learned;
    else currentLevelLearned = l5Learned;

    const currentLevelTarget = activeLevelConfig.incrementTarget;
    const currentLevelPercent = Math.min(100, Math.round((currentLevelLearned / currentLevelTarget) * 100));
    const wordsNeededToPass = Math.max(0, activeLevelConfig.cumulativeTarget - totalMastered);

    // Tính trạng thái từng tầng
    const tierStatuses = this.levels.map((lvl) => {
      let learned = 0;
      let status = 'LOCKED'; // 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED'

      if (lvl.level === 1) {
        learned = l1Learned;
        status = totalMastered >= 300 ? 'COMPLETED' : 'IN_PROGRESS';
      } else if (lvl.level === 2) {
        learned = l2Learned;
        status = totalMastered >= 800 ? 'COMPLETED' : totalMastered >= 300 ? 'IN_PROGRESS' : 'LOCKED';
      } else if (lvl.level === 3) {
        learned = l3Learned;
        status = totalMastered >= 1500 ? 'COMPLETED' : totalMastered >= 800 ? 'IN_PROGRESS' : 'LOCKED';
      } else if (lvl.level === 4) {
        learned = l4Learned;
        status = totalMastered >= 2100 ? 'COMPLETED' : totalMastered >= 1500 ? 'IN_PROGRESS' : 'LOCKED';
      } else if (lvl.level === 5) {
        learned = l5Learned;
        status = totalMastered >= 2500 ? 'COMPLETED' : totalMastered >= 2100 ? 'IN_PROGRESS' : 'LOCKED';
      }

      const percent = Math.min(100, Math.round((learned / lvl.incrementTarget) * 100));
      const needed = Math.max(0, lvl.cumulativeTarget - totalMastered);

      return {
        ...lvl,
        learnedInLevel: learned,
        percent,
        neededToPass: needed,
        isCompleted: status === 'COMPLETED',
        isInProgress: status === 'IN_PROGRESS',
        isLocked: status === 'LOCKED',
        status
      };
    });

    const isAllCompleted = totalMastered >= this.totalCourseTarget;
    const totalPercent = Math.min(100, Math.round((totalMastered / this.totalCourseTarget) * 100));

    // Ước tính vốn từ thực tế ngoài đời
    let estimatedRealVocab = 1200;
    if (totalMastered <= 300) {
      estimatedRealVocab = Math.round(500 + (totalMastered / 300) * 1000); // 500 - 1500
    } else if (totalMastered <= 800) {
      estimatedRealVocab = Math.round(1500 + ((totalMastered - 300) / 500) * 1000); // 1500 - 2500
    } else if (totalMastered <= 1500) {
      estimatedRealVocab = Math.round(2500 + ((totalMastered - 800) / 700) * 1500); // 2500 - 4000
    } else if (totalMastered <= 2100) {
      estimatedRealVocab = Math.round(4000 + ((totalMastered - 1500) / 600) * 2000); // 4000 - 6000
    } else {
      estimatedRealVocab = Math.round(6000 + (Math.min(400, totalMastered - 2100) / 400) * 3000); // 6000 - 9000+
    }

    return {
      totalMastered,
      totalCourseTarget: this.totalCourseTarget,
      totalPercent,
      isAllCompleted,
      activeLevel: activeLevelConfig,
      activeLevelIndex,
      currentLevelLearned,
      currentLevelTarget,
      currentLevelPercent,
      wordsNeededToPass,
      estimatedRealVocab,
      tierStatuses
    };
  }

  /**
   * Cập nhật hiển thị chỉ số tiến độ từ vựng lên Header HUD Ribbon
   * @param {number} totalVocabCount - Số từ đã thuộc tích lũy
   */
  renderHeaderHtml(totalVocabCount) {
    const status = this.getStatus(totalVocabCount);
    const active = status.activeLevel;

    if (status.isAllCompleted) {
      return `
        <span class="hud-vocab-wrap">
          <span class="hud-vocab-active-band" style="color: #7C3AED;">
            👑 <strong>Đạt Đỉnh Tháp Đại Sư!</strong> (400/400 từ C1/C2)
          </span>
          <span class="hud-vocab-total-badge" style="background: #FAF5FF; color: #6D28D9; border-color: #DDD6FE;">
            ${status.totalMastered}/${status.totalCourseTarget} Core Words (100%)
          </span>
        </span>
      `;
    }

    const canPromote = status.currentLevelLearned >= status.currentLevelTarget;

    return `
      <span class="hud-vocab-wrap">
        <span class="hud-vocab-active-band">
          ${active.icon} <strong>${active.bandName}</strong>: <span class="band-num">${status.currentLevelLearned}/${status.currentLevelTarget} từ</span> cần để lên <strong>${active.nextBandName}</strong>
        </span>
        ${
          canPromote
            ? `<button class="hud-promo-glow-pill" onclick="event.stopPropagation(); window.bandPromotionExam.openExam(${active.level})" title="Đã đủ định mức từ vựng! Nhấn để thi vượt cấp lên ${active.nextBandName} ngay!">
                🔥 THI LÊN ${active.nextBandName}!
               </button>`
            : ''
        }
        <span class="hud-vocab-total-badge" title="Tổng từ vựng cốt lõi đã thuộc trên toàn khóa 5 Level">
          ${status.totalMastered}/${status.totalCourseTarget} Core Words
        </span>
      </span>
    `;
  }

  /**
   * Mở Modal Tháp Từ Vựng IELTS (Vocabulary Pyramid)
   */
  openPyramidModal() {
    const modal = document.getElementById('vocab-pyramid-modal');
    if (!modal) return;

    if (window.soundSystem) window.soundSystem.playClick();
    this.renderPyramidModalContent();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Đóng Modal Tháp Từ Vựng
   */
  closePyramidModal() {
    const modal = document.getElementById('vocab-pyramid-modal');
    if (!modal) return;

    if (window.soundSystem) window.soundSystem.playClick();
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /**
   * Render toàn bộ giao diện Tháp Từ Vựng 5 Tầng bên trong Modal
   */
  renderPyramidModalContent() {
    const shell = document.querySelector('#vocab-pyramid-modal .modal-content-shell');
    if (!shell) return;

    const currentMastered = window.srsManager
      ? window.srsManager.getQualifiedCount()
      : (window.gamification ? window.gamification.state.vocabMastered || 0 : 0);
    const status = this.getStatus(currentMastered);

    // Render danh sách 5 tầng (từ đỉnh Level 5 xuống đáy Level 1)
    const reversedTiers = [...status.tierStatuses].reverse();

    const tiersHtml = reversedTiers
      .map((tier) => {
        let statusBadgeHtml = '';
        let cardClass = 'pyramid-tier-card';

        if (tier.isCompleted) {
          cardClass += ' tier-completed';
          statusBadgeHtml = `
            <span class="tier-status-pill completed" onclick="window.bandPromotionExam.openExam(${tier.level})" style="cursor: pointer;" title="Bấm để thi nâng điểm hoặc xem lại chứng chỉ">
              ✅ ĐÃ ĐẠT CHUẨN • ${tier.unlockGoal} (Xem Bài Thi)
            </span>
          `;
        } else if (tier.isInProgress) {
          cardClass += ' tier-in-progress';
          const isQuotaReached = tier.learnedInLevel >= tier.incrementTarget;
          if (isQuotaReached) {
            statusBadgeHtml = `
              <span class="tier-status-pill ready-promote active-glowing" onclick="window.bandPromotionExam.openExam(${tier.level})" style="cursor: pointer;" title="Đã đủ định mức! Bấm để thi thăng cấp ngay!">
                🔥 ĐÃ ĐẠT ĐỊNH MỨC (${tier.learnedInLevel}/${tier.incrementTarget} TỪ) • THI THĂNG CẤP NGAY!
              </span>
            `;
          } else {
            statusBadgeHtml = `
              <span class="tier-status-pill in-progress">
                ⚡ ĐANG CHINH PHỤC (${tier.learnedInLevel}/${tier.incrementTarget} TỪ) • CẦN THÊM ${tier.neededToPass} TỪ ĐỂ THI
              </span>
            `;
          }
        } else {
          cardClass += ' tier-locked';
          statusBadgeHtml = `
            <span class="tier-status-pill locked">
              🔒 CHƯA MỞ KHÓA • YÊU CẦU HOÀN THÀNH TẦNG DƯỚI
            </span>
          `;
        }

        return `
          <div class="${cardClass}" style="--tier-color: ${tier.color}; --tier-bg: ${tier.bgColor}; --tier-border: ${tier.borderColor};">
            <!-- HEADER TẦNG THÁP -->
            <div class="tier-card-header">
              <div class="tier-title-cluster">
                <span class="tier-number-tag">TẦNG ${tier.level}</span>
                <span class="tier-icon-big">${tier.icon}</span>
                <div class="tier-headings">
                  <h4 class="tier-name">${tier.title}</h4>
                  <div class="tier-band-meta">
                    <span class="band-tag">${tier.bandName}</span>
                    <span class="cefr-tag">CEFR: ${tier.cefr}</span>
                    <span class="equiv-tag">🌐 ~ ${tier.realWorldEquiv}</span>
                  </div>
                </div>
              </div>

              ${statusBadgeHtml}
            </div>

            <!-- TIẾN ĐỘ TẦNG NÀY (PROGRESS BAR) -->
            <div class="tier-progress-section">
              <div class="tier-progress-labels">
                <span class="p-focus">${tier.lexicalFocus}</span>
                <span class="p-numbers">
                  <strong>${tier.learnedInLevel}</strong> / ${tier.incrementTarget} từ
                  <span class="p-percent">(${tier.percent}%)</span>
                </span>
              </div>
              <div class="tier-bar-track">
                <div
                  class="tier-bar-fill"
                  style="width: ${tier.percent}%; background: ${tier.accentGradient};"
                ></div>
              </div>
              <div class="tier-progress-footnote">
                ${
                  tier.isCompleted
                    ? `🎉 <strong>Hoàn thành xuất sắc:</strong> Đã thuộc đủ ${tier.incrementTarget} từ của Tầng ${tier.level}. Tích lũy mốc ${tier.cumulativeTarget} Core Words!`
                    : tier.isInProgress
                    ? `🎯 <strong>Mục tiêu qua màn:</strong> Thuộc thêm <strong>${tier.neededToPass} từ</strong> nữa để chạm mốc ${tier.cumulativeTarget} từ và tự động vượt lên <strong>${tier.nextBandName}</strong>.`
                    : `🔒 Cần tích lũy đủ các mốc từ vựng ở tầng dưới để bắt đầu mở khóa tầng này.`
                }
              </div>
            </div>

            <!-- PHẦN THƯỞNG KHI THĂNG CẤP & MÔ TẢ -->
            <div class="tier-bottom-info">
              <p class="tier-desc">${tier.description}</p>
              <div class="tier-rewards-box">
                <span class="reward-title">🎁 Thưởng vượt Band:</span>
                <span class="reward-pill exp">+${tier.rewards.exp} EXP</span>
                <span class="reward-pill crowns">+${tier.rewards.crowns} 👑 Vương Miện</span>
                <span class="reward-pill badge" title="${tier.rewards.badge}">🎖️ ${tier.rewards.badge.split('(')[0].trim()}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    shell.innerHTML = `
      <div class="modal-header pyramid-modal-header" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #312E81 100%); color: #FFFFFF;">
        <div class="modal-title-wrap">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="background: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: var(--border-radius-full); text-transform: uppercase;">
              Mô-đun Độc Quyền &bull; Cambridge Lexical Standard
            </span>
            <span style="background: rgba(255, 255, 255, 0.15); color: #E0E7FF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: var(--border-radius-full);">
              🎯 Vocabulary Level-Gatekeeping Engine
            </span>
          </div>
          <h3 style="font-size: 22px; font-weight: 900; margin: 0; color: #FFFFFF; display: flex; align-items: center; gap: 8px;">
            <span>🏛️</span> Tháp Từ Vựng IELTS (Vocabulary Pyramid)
          </h3>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #C7D2FE;">
            Cơ chế tích lũy đủ vốn từ vựng học thuật để vượt ngưỡng 5 mốc Band điểm Cambridge từ Mất gốc (0-3.5) lên Chuyên gia (7.5-9.0).
          </p>
        </div>
        <button class="btn-close-modal" onclick="window.vocabGatekeeper.closePyramidModal()" title="Đóng" style="color: #FFFFFF; opacity: 0.85;">&times;</button>
      </div>

      <div class="modal-body-scroll pyramid-modal-body">
        <!-- BẢNG TỔNG QUAN 4 CHỈ SỐ KIM TỰ THÁP -->
        <div class="pyramid-summary-grid">
          <div class="summary-box">
            <span class="s-label">🎯 Tổng Vốn Từ Đã Thuộc</span>
            <span class="s-val" style="color: #10B981;">${status.totalMastered} / ${status.totalCourseTarget} từ</span>
            <span class="s-sub">Tiến độ toàn khóa: <strong>${status.totalPercent}%</strong></span>
          </div>

          <div class="summary-box">
            <span class="s-label">⚡ Cấp Độ Tháp Hiện Tại</span>
            <span class="s-val" style="color: ${status.activeLevel.color};">
              ${status.activeLevel.icon} Tầng ${status.activeLevel.level}
            </span>
            <span class="s-sub">${status.activeLevel.bandName} (${status.activeLevel.cefr})</span>
          </div>

          <div class="summary-box">
            <span class="s-label">🌐 Vốn Từ Thực Tế Ước Tính</span>
            <span class="s-val" style="color: #2563EB;">~ ${status.estimatedRealVocab.toLocaleString('vi-VN')} từ</span>
            <span class="s-sub">Tương đương khả năng dùng ngoài đời</span>
          </div>

          <div class="summary-box">
            <span class="s-label">🚪 Mục Tiêu Qua Band Tiếp Theo</span>
            <span class="s-val" style="color: #DC2626;">
              ${status.isAllCompleted ? 'Đã hoàn thành! 👑' : `Còn ${status.wordsNeededToPass} từ`}
            </span>
            <span class="s-sub">
              ${status.isAllCompleted ? 'Đại sư ngôn ngữ' : `Để mở khóa ${status.activeLevel.nextBandName}`}
            </span>
          </div>
        </div>

        <!-- BANNER QUY TẮC SRS & GATEKEEPING -->
        <div class="pyramid-srs-notice-banner" style="background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); border: 1px solid #93C5FD; border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 26px;">🧠</div>
          <div style="font-size: 12px; color: #1E3A8A; line-height: 1.5;">
            <strong style="color: #1D4ED8; font-size: 13px; display: block; margin-bottom: 2px;">Quy Tắc Gatekeeping &amp; Spaced Repetition (SRS):</strong>
            <span>Chỉ những từ vựng đạt trạng thái <strong style="color: #2563EB;">🔵 Đang ôn tập (Reviewing)</strong> hoặc <strong style="color: #16A34A;">🟢 Đã thành thạo (Mastered)</strong> mới được tính vào hạn ngạch qua màn để mở khóa Band tiếp theo. Các từ mới ⚪ Chưa học hoặc 🟡 Đang học cần vượt qua kiểm tra phản xạ Quiz / Lật thẻ trí nhớ hoặc bài tập AI đạt điểm &ge; 7.0!</span>
          </div>
        </div>

        <!-- BANNER BÀI THI THĂNG CẤP BAND ĐIỂM (PROMOTION EXAM ACTION) -->
        <div class="pyramid-promotion-banner" style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%); border: 1.5px solid #818CF8; border-radius: 14px; padding: 16px 20px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="background: #FEE2E2; color: #DC2626; font-size: 10.5px; font-weight: 900; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">
                🔥 BAND PROMOTION EXAM
              </span>
              <span style="font-size: 11px; color: #C7D2FE; font-weight: 700;">
                Sát Hạch 3 Vòng Liên Hoàn &bull; 10 Phút &bull; Chuẩn Cambridge
              </span>
            </div>
            <h4 style="font-size: 17px; font-weight: 900; color: #FFFFFF; margin: 0 0 4px 0;">
              Bài Thi Vượt Cấp Lên ${status.activeLevel.nextBandName}
            </h4>
            <p style="font-size: 12.5px; color: #E0E7FF; margin: 0; max-width: 580px;">
              Khi đạt đủ định mức ${status.currentLevelTarget} từ của Tầng ${status.activeLevel.level}, nút thi sẽ phát sáng rực rỡ để bạn bước vào kỳ thi thăng cấp chính thức.
            </p>
          </div>
          <div class="promo-banner-action-wrap">
            ${window.bandPromotionExam ? window.bandPromotionExam.renderPromotionButtonHtml(status.activeLevel.level) : ''}
          </div>
        </div>

        <!-- SƠ ĐỒ THÁP 5 TẦNG TÍCH LŨY (VISUAL PYRAMID STACK) -->
        <div class="pyramid-tiers-stack">
          ${tiersHtml}
        </div>

        <!-- THANH ĐIỀU HƯỚNG NHANH ĐẾN CÁC MÔ-ĐUN HỌC TẬP -->
        <div class="pyramid-quick-nav-bar">
          <span style="font-size: 13px; font-weight: 800; color: #0F172A;">🚀 Tích Lũy Từ Vựng Ngay Qua Các Chế Độ:</span>
          <div class="quick-nav-buttons">
            <button class="btn-p-nav" onclick="window.vocabGatekeeper.goToTab('vocab-vault')">
              <span>📖</span> Sổ Tay 20 Chủ Điểm
            </button>
            <button class="btn-p-nav" onclick="window.vocabGatekeeper.goToTab('flashcards')">
              <span>🃏</span> Flashcard 3D
            </button>
            <button class="btn-p-nav" onclick="window.vocabGatekeeper.goToTab('guess-word')">
              <span>🎮</span> Game Đoán Từ
            </button>
            <button class="btn-p-nav" onclick="window.vocabGatekeeper.goToTab('memory-match')">
              <span>🧩</span> Lật Thẻ Trí Nhớ
            </button>
          </div>
        </div>

        <!-- KHUNG THỬ NGHIỆM MÔ PHỎNG TÍCH LŨY TỪ (GATEKEEPER SIMULATOR) -->
        <div class="pyramid-simulator-card">
          <div class="sim-header">
            <span>🧪 BỘ THỬ NGHIỆM TÍCH LŨY TỪ (GATEKEEPER SIMULATOR)</span>
            <small>Dành cho kiểm thử viên &amp; học viên mô phỏng hiệu ứng vượt Band tức thì</small>
          </div>
          <div class="sim-buttons-wrap">
            <button class="btn-sim" onclick="window.vocabGatekeeper.simulateAddVocab(50)" title="Cộng thêm 50 từ thuộc">
              +50 Từ (Học bài mới)
            </button>
            <button class="btn-sim" onclick="window.vocabGatekeeper.simulateSetVocab(300)" title="Nhảy tới mốc hoàn thành Tầng 1">
              🌱 Đạt 300 từ (Lên Band &lt; 4.5)
            </button>
            <button class="btn-sim" onclick="window.vocabGatekeeper.simulateSetVocab(800)" title="Nhảy tới mốc hoàn thành Tầng 2">
              🥉 Đạt 800 từ (Lên Band 4.5 - 6.0)
            </button>
            <button class="btn-sim" onclick="window.vocabGatekeeper.simulateSetVocab(1500)" title="Nhảy tới mốc hoàn thành Tầng 3">
              🥈 Đạt 1.500 từ (Lên Band 6.0 - 7.5)
            </button>
            <button class="btn-sim" onclick="window.vocabGatekeeper.simulateSetVocab(2100)" title="Nhảy tới mốc hoàn thành Tầng 4">
              🥇 Đạt 2.100 từ (Lên Band 7.5+)
            </button>
            <button class="btn-sim" onclick="window.vocabGatekeeper.simulateSetVocab(2500)" title="Đạt đỉnh 2.500 từ">
              👑 Đạt Đỉnh 2.500 từ (Đại Sư)
            </button>
            <button class="btn-sim btn-sim-reset" onclick="window.vocabGatekeeper.simulateSetVocab(0)" title="Đặt lại về 0">
              🔄 Đặt lại 0 từ
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Chuyển tab học tập và đóng modal
   * @param {string} tabId 
   */
  goToTab(tabId) {
    this.closePyramidModal();
    if (window.app && typeof window.app.switchTab === 'function') {
      window.app.switchTab(tabId);
    }
  }

  /**
   * Mô phỏng cộng thêm số từ đã thuộc
   * @param {number} count 
   */
  simulateAddVocab(count = 50) {
    if (!window.gamification) return;

    const current = window.gamification.state.vocabMastered || 0;
    const nextVal = Math.min(this.totalCourseTarget, current + count);
    this.simulateSetVocab(nextVal);
  }

  /**
   * Mô phỏng đặt chính xác số từ đã thuộc
   * @param {number} total 
   */
  simulateSetVocab(total = 0) {
    if (!window.gamification) return;

    const clamped = Math.max(0, Math.min(this.totalCourseTarget, parseInt(total, 10) || 0));
    window.gamification.state.vocabMastered = clamped;
    window.gamification.state.totalVocabTarget = this.totalCourseTarget;

    // Kiểm tra và trao thưởng Gatekeeper nếu đạt mốc mới
    this.checkAndTriggerGatekeeperReward(clamped);

    window.gamification.saveState();

    if (window.soundSystem) window.soundSystem.playCorrect();
    this.renderPyramidModalContent();
  }

  /**
   * Kiểm tra và tự động kích hoạt phần thưởng khi học viên vượt qua các ngưỡng của Tháp Từ Vựng
   * @param {number} currentTotal - Tổng số từ đã thuộc
   */
  checkAndTriggerGatekeeperReward(currentTotal) {
    if (!window.gamification) return;

    if (!Array.isArray(window.gamification.state.claimedGatekeeperLevels)) {
      window.gamification.state.claimedGatekeeperLevels = [];
    }

    const claimed = window.gamification.state.claimedGatekeeperLevels;

    // Danh sách 5 ngưỡng Gatekeeper: 300, 800, 1500, 2100, 2500
    for (const lvl of this.levels) {
      if (currentTotal >= lvl.cumulativeTarget && !claimed.includes(lvl.level)) {
        claimed.push(lvl.level);

        // Thưởng EXP và Crowns
        window.gamification.addExp(lvl.rewards.exp);
        window.gamification.addCrowns(lvl.rewards.crowns);

        // Cập nhật Band Tier ước tính lên Header nếu phù hợp
        if (lvl.level === 1) window.gamification.setBandScore(4.0);
        else if (lvl.level === 2) window.gamification.setBandScore(5.0);
        else if (lvl.level === 3) window.gamification.setBandScore(6.5);
        else if (lvl.level === 4) window.gamification.setBandScore(7.5);
        else if (lvl.level === 5) window.gamification.setBandScore(8.5);

        // Phát âm thanh thăng cấp
        if (window.soundSystem) window.soundSystem.playLevelUp();

        // Victoria Mascot chúc mừng hoành tráng
        if (window.mascot) {
          window.mascot.say(
            `🏛️ VƯỢT THÀNH CÔNG TẦNG ${lvl.level}: ${lvl.title}! Chúc mừng bạn đã thuộc ${lvl.cumulativeTarget} Core Words, chính thức mở khóa ${lvl.unlockGoal}! Nhận thưởng +${lvl.rewards.exp} EXP & +${lvl.rewards.crowns} 👑!`,
            6000
          );
          window.mascot.setMood('happy');
        }
      }
    }
  }
}

// Khởi tạo Singleton Engine toàn cục
if (typeof window !== 'undefined') {
  window.vocabGatekeeper = new IeltsVocabGatekeeperEngine();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IELTS_VOCAB_PYRAMID_LEVELS,
    IeltsVocabGatekeeperEngine
  };
}
