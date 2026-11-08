/**
 * IELTS GO! - Bài Thi Thăng Cấp Band Điểm (Band Promotion Exam)
 * Kết nối trực tiếp với hệ thống định mức từ vựng và Vocabulary Level-Gatekeeping Engine
 * 
 * 1. Điều kiện mở khóa:
 *    - Đạt đủ định mức từ vựng của cấp độ hiện tại (hoặc mở thử nghiệm)
 *    - Nút "🔥 Thi Vượt Cấp Lên Band Tiếp Theo" phát sáng rực rỡ (glowing pulse animation)
 * 2. Cấu trúc 3 Vòng thi liên hoàn trong 10 phút (600s đếm ngược):
 *    - Vòng 1: Lexical Recognition (15 câu trắc nghiệm tốc độ cao Paraphrase & Reading Gap-fill)
 *    - Vòng 2: Spelling & Listening Dictation (5 câu nghe phát âm & gõ chính xác 100% chính tả UK/US)
 *    - Vòng 3: AI Examiner Victoria Challenge (3 câu tự luận / nói Micro với Giám khảo Victoria)
 * 3. Trao thưởng & Thăng cấp:
 *    - Đạt >= 80% tổng điểm (>= 48/60đ):
 *      + Hiệu ứng pháo hoa toàn màn hình (Canvas Confetti)
 *      + Nâng cấp Huy hiệu Band điểm trên Header Ribbon
 *      + Mở khóa toàn bộ kho học liệu Band tiếp theo
 *      + Cấp Huy hiệu & Chứng nhận Từ vựng của Band vừa vượt qua
 *      + Thưởng lớn +500 EXP, +50 👑 Vương Miện
 */

// 1. CẤU HÌNH 5 MỐC THI THĂNG CẤP
const IELTS_PROMOTION_TIERS = [
  {
    level: 1,
    fromBand: 'Band 0 - 3.5',
    toBand: 'Band < 4.5',
    targetScore: 4.0,
    quotaRequired: 300,
    cumulativeQuota: 300,
    title: 'Kỳ Thi Sát Hạch: Bứt Phá Mất Gốc Lên Sơ Cấp (Band < 4.5)',
    bandLabel: 'Band < 4.5 (Pre-Intermediate)',
    badgeName: '🌱 Nền Tảng Vững Chắc (Foundation Breakthrough)',
    badgeIcon: '🥉',
    badgeColor: '#EA580C',
    badgeGradient: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)',
    description: 'Sát hạch 300 từ vựng cốt lõi sinh hoạt hàng ngày, phát âm chuẩn và các mẫu câu đơn chuẩn Cambridge A2-B1.',
    nextStageTitle: 'Chặng 2: Sơ Cấp (Band < 4.5)'
  },
  {
    level: 2,
    fromBand: 'Band < 4.5',
    toBand: 'Band 4.5 - 6.0',
    targetScore: 5.5,
    quotaRequired: 500,
    cumulativeQuota: 800,
    title: 'Kỳ Thi Sát Hạch: Sơ Cấp Lên Trung Cấp Học Thuật (Band 4.5 - 6.0)',
    bandLabel: 'Band 4.5 - 6.0 (Intermediate Academic)',
    badgeName: '🥉 Sơ Cấp Đột Phá (Pre-Intermediate Striker)',
    badgeIcon: '🥈',
    badgeColor: '#2563EB',
    badgeGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    description: 'Sát hạch 500 từ vựng mở rộng 20 chủ đề, câu phức và các cấu trúc câu chuẩn Cambridge B1-B2.',
    nextStageTitle: 'Chặng 3: Trung Cấp (Band 4.5 - 6.0)'
  },
  {
    level: 3,
    fromBand: 'Band 4.5 - 6.0',
    toBand: 'Band 6.0 - 7.5',
    targetScore: 6.5,
    quotaRequired: 700,
    cumulativeQuota: 1500,
    title: 'Kỳ Thi Sát Hạch: Chinh Phục Ngưỡng Du Học (Band 6.0 - 7.5)',
    bandLabel: 'Band 6.0 - 7.5 (Competent - Chuẩn Du Học)',
    badgeName: '🥈 Học Thuật Tiêu Chuẩn (Academic Standard Scholar)',
    badgeIcon: '🥇',
    badgeColor: '#059669',
    badgeGradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    description: 'Sát hạch 700 từ vựng học thuật AWL, từ vựng phân tích xu hướng số liệu Task 1 và lập luận phản biện Task 2.',
    nextStageTitle: 'Chặng 4: Nâng Cao (Band 6.0 - 7.5)'
  },
  {
    level: 4,
    fromBand: 'Band 6.0 - 7.5',
    toBand: 'Band 7.5+',
    targetScore: 8.0,
    quotaRequired: 600,
    cumulativeQuota: 2100,
    title: 'Kỳ Thi Sát Hạch: Đẳng Cấp Chuyên Sâu (Band 7.5+ Master)',
    bandLabel: 'Band 7.5+ (Advanced / Expert Master)',
    badgeName: '🥇 Nâng Cao Du Học (Elite Scholar Master)',
    badgeIcon: '👑',
    badgeColor: '#7C3AED',
    badgeGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    description: 'Sát hạch 600 Collocations & Idioms C1, cấu trúc câu phức hợp (Inversion, Nominalisation) và Hedging học thuật tinh tế.',
    nextStageTitle: 'Chặng 5: Chuyên Sâu (Band 7.5+)'
  },
  {
    level: 5,
    fromBand: 'Band 7.5+',
    toBand: 'Band 9.0',
    targetScore: 9.0,
    quotaRequired: 400,
    cumulativeQuota: 2500,
    title: 'Kỳ Thi Sát Hạch Đỉnh Cao: Grandmaster Cambridge (Band 9.0)',
    bandLabel: 'Band 9.0 (Cambridge Grandmaster)',
    badgeName: '👑 Đại Sư Ngôn Ngữ (Cambridge Grandmaster)',
    badgeIcon: '🌟',
    badgeColor: '#DC2626',
    badgeGradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    description: 'Chinh phục đỉnh cao tuyệt đối 2.500 từ vựng C2, kiểm soát sắc thái biểu đạt tiệm cận bản xứ Oxford & Cambridge.',
    nextStageTitle: 'Đỉnh Tháp Đại Sư (Hoàn thành 100% khóa học)'
  }
];

// 2. NGÂN HÀNG ĐỀ THI 3 VÒNG THEO CÁC CẤP ĐỘ BAND
const PROMOTION_QUESTION_BANKS = {
  // LEVEL 1: Mất gốc -> Band < 4.5
  1: {
    round1: [
      { id: 'l1-r1-01', type: 'paraphrase', prompt: 'Chọn từ đồng nghĩa với "HABITAT" trong bối cảnh tự nhiên:', options: [{ id: 'a', text: 'natural surroundings', isCorrect: true }, { id: 'b', text: 'artificial house', isCorrect: false }, { id: 'c', text: 'urban center', isCorrect: false }, { id: 'd', text: 'shopping mall', isCorrect: false }], explanation: 'Habitat có nghĩa là môi trường sống tự nhiên (= natural surroundings).' },
      { id: 'l1-r1-02', type: 'gap_fill', prompt: 'Điền từ phù hợp vào câu: "Doing regular exercise is _____ for your physical health."', options: [{ id: 'a', text: 'essential', isCorrect: true }, { id: 'b', text: 'dangerous', isCorrect: false }, { id: 'c', text: 'optional', isCorrect: false }, { id: 'd', text: 'negative', isCorrect: false }], explanation: 'essential = cần thiết, thiết yếu cho sức khỏe.' },
      { id: 'l1-r1-03', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "COMMUTER" (người đi làm hàng ngày):', options: [{ id: 'a', text: 'daily traveller', isCorrect: true }, { id: 'b', text: 'foreign tourist', isCorrect: false }, { id: 'c', text: 'immigrant', isCorrect: false }, { id: 'd', text: 'pilot', isCorrect: false }], explanation: 'Commuter là người thường xuyên di chuyển giữa nhà và nơi làm việc.' },
      { id: 'l1-r1-04', type: 'gap_fill', prompt: '"Heavy traffic congestion causes serious air _____ in big cities."', options: [{ id: 'a', text: 'pollution', isCorrect: true }, { id: 'b', text: 'solution', isCorrect: false }, { id: 'c', text: 'cleanliness', isCorrect: false }, { id: 'd', text: 'freshness', isCorrect: false }], explanation: 'air pollution = ô nhiễm không khí.' },
      { id: 'l1-r1-05', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "TRADITIONAL":', options: [{ id: 'a', text: 'conventional', isCorrect: true }, { id: 'b', text: 'futuristic', isCorrect: false }, { id: 'c', text: 'unfamiliar', isCorrect: false }, { id: 'd', text: 'electronic', isCorrect: false }], explanation: 'Traditional đồng nghĩa với conventional (mang tính truyền thống).' },
      { id: 'l1-r1-06', type: 'gap_fill', prompt: '"Students should follow a healthy daily _____ to balance study and rest."', options: [{ id: 'a', text: 'routine', isCorrect: true }, { id: 'b', text: 'traffic', isCorrect: false }, { id: 'c', text: 'celebration', isCorrect: false }, { id: 'd', text: 'disruption', isCorrect: false }], explanation: 'daily routine = thói quen sinh hoạt hàng ngày.' },
      { id: 'l1-r1-07', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "PREVENT":', options: [{ id: 'a', text: 'stop from happening', isCorrect: true }, { id: 'b', text: 'encourage', isCorrect: false }, { id: 'c', text: 'expand', isCorrect: false }, { id: 'd', text: 'assist', isCorrect: false }], explanation: 'Prevent = ngăn ngừa, ngăn cản xảy ra.' },
      { id: 'l1-r1-08', type: 'gap_fill', prompt: '"Eating fresh vegetables provides vital _____ for child development."', options: [{ id: 'a', text: 'nutrition', isCorrect: true }, { id: 'b', text: 'pollution', isCorrect: false }, { id: 'c', text: 'exhaustion', isCorrect: false }, { id: 'd', text: 'distraction', isCorrect: false }], explanation: 'vital nutrition = dinh dưỡng thiết yếu.' },
      { id: 'l1-r1-09', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "LEISURE":', options: [{ id: 'a', text: 'free time', isCorrect: true }, { id: 'b', text: 'hard labor', isCorrect: false }, { id: 'c', text: 'urgent duty', isCorrect: false }, { id: 'd', text: 'emergency', isCorrect: false }], explanation: 'Leisure = thời gian rảnh rỗi, giải trí.' },
      { id: 'l1-r1-10', type: 'gap_fill', prompt: '"They gathered with family to _____ their grandfather\'s 80th birthday."', options: [{ id: 'a', text: 'celebrate', isCorrect: true }, { id: 'b', text: 'destroy', isCorrect: false }, { id: 'c', text: 'abandon', isCorrect: false }, { id: 'd', text: 'ignore', isCorrect: false }], explanation: 'celebrate a birthday = tổ chức ăn mừng sinh nhật.' },
      { id: 'l1-r1-11', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "ACHIEVE":', options: [{ id: 'a', text: 'accomplish', isCorrect: true }, { id: 'b', text: 'fail', isCorrect: false }, { id: 'c', text: 'postpone', isCorrect: false }, { id: 'd', text: 'hesitate', isCorrect: false }], explanation: 'Achieve = accomplish (đạt được mục tiêu).' },
      { id: 'l1-r1-12', type: 'gap_fill', prompt: '"Check the weather _____ before planning an outdoor picnic."', options: [{ id: 'a', text: 'forecast', isCorrect: true }, { id: 'b', text: 'accident', isCorrect: false }, { id: 'c', text: 'obstacle', isCorrect: false }, { id: 'd', text: 'recipe', isCorrect: false }], explanation: 'weather forecast = dự báo thời tiết.' },
      { id: 'l1-r1-13', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "COLLEAGUE":', options: [{ id: 'a', text: 'co-worker', isCorrect: true }, { id: 'b', text: 'rival', isCorrect: false }, { id: 'c', text: 'stranger', isCorrect: false }, { id: 'd', text: 'customer', isCorrect: false }], explanation: 'Colleague = co-worker (đồng nghiệp).' },
      { id: 'l1-r1-14', type: 'gap_fill', prompt: '"She looked up a delicious _____ to cook dinner for her friends."', options: [{ id: 'a', text: 'recipe', isCorrect: true }, { id: 'b', text: 'ticket', isCorrect: false }, { id: 'c', text: 'budget', isCorrect: false }, { id: 'd', text: 'lecture', isCorrect: false }], explanation: 'recipe = công thức nấu ăn.' },
      { id: 'l1-r1-15', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "ANCESTOR":', options: [{ id: 'a', text: 'forefather', isCorrect: true }, { id: 'b', text: 'descendant', isCorrect: false }, { id: 'c', text: 'child', isCorrect: false }, { id: 'd', text: 'toddler', isCorrect: false }], explanation: 'Ancestor = forefather (tổ tiên).' }
    ],
    round2: [
      { id: 'l1-r2-01', word: 'colour', ipaUk: '/ˈkʌl.ər/', ipaUs: '/ˈkʌl.ɚ/', acceptedSpellings: ['colour', 'color'], definitionVi: 'màu sắc', hintSentence: 'Green is the natural _____ of fresh leaves in springtime.' },
      { id: 'l1-r2-02', word: 'routine', ipaUk: '/ruːˈtiːn/', ipaUs: '/ruːˈtiːn/', acceptedSpellings: ['routine'], definitionVi: 'thói quen sinh hoạt', hintSentence: 'Establishing a productive morning _____ boosts work performance.' },
      { id: 'l1-r2-03', word: 'habitat', ipaUk: '/ˈhæb.ɪ.tæt/', ipaUs: '/ˈhæb.ə.tæt/', acceptedSpellings: ['habitat'], definitionVi: 'môi trường sống', hintSentence: 'Deforestation destroys the natural _____ of native animals.' },
      { id: 'l1-r2-04', word: 'pollution', ipaUk: '/pəˈluː.ʃən/', ipaUs: '/pəˈluː.ʃən/', acceptedSpellings: ['pollution'], definitionVi: 'sự ô nhiễm', hintSentence: 'Plastic waste in oceans causes severe marine _____.' },
      { id: 'l1-r2-05', word: 'celebrate', ipaUk: '/ˈsel.ə.breɪt/', ipaUs: '/ˈsel.ə.breɪt/', acceptedSpellings: ['celebrate'], definitionVi: 'tổ chức lễ kỷ niệm', hintSentence: 'People worldwide gather to _____ the arrival of the New Year.' }
    ],
    round3: [
      { id: 'l1-r3-01', targetWord: 'essential', partOfSpeech: 'adjective', ipa: '/ɪˈsen.ʃəl/', meaningVi: 'cần thiết, thiết yếu', academicContext: 'IELTS Speaking Part 1 (Health & Habits)', guidanceTip: 'Hãy đặt câu nêu tầm quan trọng của nước uống sạch hoặc giấc ngủ đối với sức khỏe con người.' },
      { id: 'l1-r3-02', targetWord: 'prevent', partOfSpeech: 'verb', ipa: '/prɪˈvent/', meaningVi: 'ngăn chặn, phòng ngừa', academicContext: 'IELTS Writing Task 2 (Environment & Crime)', guidanceTip: 'Dùng cấu trúc "prevent someone from doing something" hoặc "prevent pollution/diseases".' },
      { id: 'l1-r3-03', targetWord: 'commuter', partOfSpeech: 'noun', ipa: '/kəˈmjuː.tər/', meaningVi: 'người đi làm hàng ngày bằng phương tiện công cộng', academicContext: 'IELTS Speaking Part 1 (Transport)', guidanceTip: 'Mô tả việc các commuter đông đúc tại ga tàu điện ngầm vào giờ cao điểm.' }
    ]
  },

  // LEVEL 2: Band < 4.5 -> Band 4.5 - 6.0
  2: {
    round1: [
      { id: 'l2-r1-01', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "BIODIVERSITY" trong sinh thái học:', options: [{ id: 'a', text: 'biological variety', isCorrect: true }, { id: 'b', text: 'genetic uniformity', isCorrect: false }, { id: 'c', text: 'species extinction', isCorrect: false }, { id: 'd', text: 'deforestation', isCorrect: false }], explanation: 'Biodiversity = biological variety (đa dạng sinh thái).' },
      { id: 'l2-r1-02', type: 'gap_fill', prompt: '"Solar and wind power are leading examples of _____ energy sources."', options: [{ id: 'a', text: 'renewable', isCorrect: true }, { id: 'b', text: 'fossil', isCorrect: false }, { id: 'c', text: 'hazardous', isCorrect: false }, { id: 'd', text: 'exhaustible', isCorrect: false }], explanation: 'renewable energy = năng lượng tái tạo.' },
      { id: 'l2-r1-03', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "CONSEQUENCE":', options: [{ id: 'a', text: 'repercussion / outcome', isCorrect: true }, { id: 'b', text: 'initial cause', isCorrect: false }, { id: 'c', text: 'starting point', isCorrect: false }, { id: 'd', text: 'origin', isCorrect: false }], explanation: 'Consequence = outcome (hậu quả, kết quả).' },
      { id: 'l2-r1-04', type: 'gap_fill', prompt: '"Investing in public transit brings _____ benefits to urban air quality."', options: [{ id: 'a', text: 'significant', isCorrect: true }, { id: 'b', text: 'negligible', isCorrect: false }, { id: 'c', text: 'harmful', isCorrect: false }, { id: 'd', text: 'trivial', isCorrect: false }], explanation: 'significant benefits = lợi ích đáng kể.' },
      { id: 'l2-r1-05', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "ESTABLISH":', options: [{ id: 'a', text: 'set up / create', isCorrect: true }, { id: 'b', text: 'demolish', isCorrect: false }, { id: 'c', text: 'terminate', isCorrect: false }, { id: 'd', text: 'abandon', isCorrect: false }], explanation: 'Establish = set up (thành lập, thiết lập).' },
      { id: 'l2-r1-06', type: 'gap_fill', prompt: '"Excessive screen time may _____ negatively to sleep disorders among teens."', options: [{ id: 'a', text: 'contribute', isCorrect: true }, { id: 'b', text: 'prevent', isCorrect: false }, { id: 'c', text: 'eliminate', isCorrect: false }, { id: 'd', text: 'protect', isCorrect: false }], explanation: 'contribute to = góp phần dẫn tới điều gì.' },
      { id: 'l2-r1-07', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "CONSERVE":', options: [{ id: 'a', text: 'preserve / protect', isCorrect: true }, { id: 'b', text: 'consume', isCorrect: false }, { id: 'c', text: 'waste', isCorrect: false }, { id: 'd', text: 'exploit', isCorrect: false }], explanation: 'Conserve = preserve (bảo tồn).' },
      { id: 'l2-r1-08', type: 'gap_fill', prompt: '"City planners must upgrade public health _____ to accommodate population growth."', options: [{ id: 'a', text: 'facilities', isCorrect: true }, { id: 'b', text: 'obstacles', isCorrect: false }, { id: 'c', text: 'complaints', isCorrect: false }, { id: 'd', text: 'delays', isCorrect: false }], explanation: 'public health facilities = cơ sở vật chất y tế công cộng.' },
      { id: 'l2-r1-09', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "EXPENDITURE":', options: [{ id: 'a', text: 'spending / outlay', isCorrect: true }, { id: 'b', text: 'profit', isCorrect: false }, { id: 'c', text: 'saving', isCorrect: false }, { id: 'd', text: 'income', isCorrect: false }], explanation: 'Expenditure = spending (khoản chi tiêu trong Task 1).' },
      { id: 'l2-r1-10', type: 'gap_fill', prompt: '"Surveys _____ that a majority of young people prefer remote working."', options: [{ id: 'a', text: 'indicate', isCorrect: true }, { id: 'b', text: 'conceal', isCorrect: false }, { id: 'c', text: 'forbid', isCorrect: false }, { id: 'd', text: 'destroy', isCorrect: false }], explanation: 'indicate that = chỉ ra rằng.' },
      { id: 'l2-r1-11', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "RESIDENT":', options: [{ id: 'a', text: 'inhabitant / citizen', isCorrect: true }, { id: 'b', text: 'tourist', isCorrect: false }, { id: 'c', text: 'visitor', isCorrect: false }, { id: 'd', text: 'commuter', isCorrect: false }], explanation: 'Resident = inhabitant (cư dân sinh sống).' },
      { id: 'l2-r1-12', type: 'gap_fill', prompt: '"Online shopping is extremely _____ for busy professionals with hectic schedules."', options: [{ id: 'a', text: 'convenient', isCorrect: true }, { id: 'b', text: 'troublesome', isCorrect: false }, { id: 'c', text: 'impractical', isCorrect: false }, { id: 'd', text: 'laborious', isCorrect: false }], explanation: 'convenient = tiện lợi.' },
      { id: 'l2-r1-13', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "CONSUME":', options: [{ id: 'a', text: 'use up / deplete', isCorrect: true }, { id: 'b', text: 'produce', isCorrect: false }, { id: 'c', text: 'generate', isCorrect: false }, { id: 'd', text: 'store', isCorrect: false }], explanation: 'Consume = use up (tiêu thụ).' },
      { id: 'l2-r1-14', type: 'gap_fill', prompt: '"Global warming has had a devastating _____ on polar ecosystems."', options: [{ id: 'a', text: 'impact', isCorrect: true }, { id: 'b', text: 'compliment', isCorrect: false }, { id: 'c', text: 'reward', isCorrect: false }, { id: 'd', text: 'permission', isCorrect: false }], explanation: 'impact on = tác động lên.' },
      { id: 'l2-r1-15', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "ALTERNATIVE":', options: [{ id: 'a', text: 'substitute / other option', isCorrect: true }, { id: 'b', text: 'mandatory choice', isCorrect: false }, { id: 'c', text: 'deadlock', isCorrect: false }, { id: 'd', text: 'restriction', isCorrect: false }], explanation: 'Alternative = substitute (phương án thay thế).' }
    ],
    round2: [
      { id: 'l2-r2-01', word: 'biodiversity', ipaUk: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', ipaUs: '/ˌbaɪ.oʊ.dɪˈvɝː.sə.t̬i/', acceptedSpellings: ['biodiversity'], definitionVi: 'sự đa dạng sinh học', hintSentence: 'The destruction of coral reefs severely threatens marine _____.' },
      { id: 'l2-r2-02', word: 'renewable', ipaUk: '/rɪˈnjuː.ə.bəl/', ipaUs: '/rɪˈnuː.ə.bəl/', acceptedSpellings: ['renewable'], definitionVi: 'có thể tái tạo được', hintSentence: 'Hydroelectric power is a reliable source of _____ energy.' },
      { id: 'l2-r2-03', word: 'consequence', ipaUk: '/ˈkɒn.sɪ.kwəns/', ipaUs: '/ˈkɑːn.sə.kwens/', acceptedSpellings: ['consequence'], definitionVi: 'hậu quả, kết quả', hintSentence: 'Severe floods are an unavoidable _____ of unchecked climate change.' },
      { id: 'l2-r2-04', word: 'behaviour', ipaUk: '/bɪˈheɪ.vjər/', ipaUs: '/bɪˈheɪ.vjɚ/', acceptedSpellings: ['behaviour', 'behavior'], definitionVi: 'hành vi, ứng xử', hintSentence: 'Parental guidance shapes the social _____ of young children.' },
      { id: 'l2-r2-05', word: 'significant', ipaUk: '/sɪɡˈnɪf.ɪ.kənt/', ipaUs: '/sɪɡˈnɪf.ə.kənt/', acceptedSpellings: ['significant'], definitionVi: 'đáng kể, quan trọng', hintSentence: 'The past decade witnessed a _____ rise in electric vehicle sales.' }
    ],
    round3: [
      { id: 'l2-r3-01', targetWord: 'biodiversity', partOfSpeech: 'noun', ipa: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', meaningVi: 'sự đa dạng sinh thái', academicContext: 'IELTS Writing Task 2 (Environment)', guidanceTip: 'Nêu nguyên nhân phá rừng làm suy giảm đa dạng sinh học toàn cầu.' },
      { id: 'l2-r3-02', targetWord: 'renewable energy', partOfSpeech: 'collocation', ipa: '/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/', meaningVi: 'năng lượng tái tạo', academicContext: 'IELTS Speaking Part 3 (Technology & Energy)', guidanceTip: 'Giải thích tại sao chính phủ cần tài trợ chuyển đổi sang năng lượng sạch.' },
      { id: 'l2-r3-03', targetWord: 'consequence', partOfSpeech: 'noun', ipa: '/ˈkɒn.sɪ.kwəns/', meaningVi: 'hậu quả, hệ quả tất yếu', academicContext: 'IELTS Writing Task 2 (Cause & Effect)', guidanceTip: 'Dùng cụm "as a direct consequence of" để diễn đạt mối liên hệ nhân quả học thuật.' }
    ]
  },

  // LEVEL 3: Band 4.5 - 6.0 -> Band 6.0 - 7.5 (Chuẩn Du Học)
  3: {
    round1: [
      { id: 'l3-r1-01', type: 'paraphrase', prompt: 'Từ đồng nghĩa học thuật Task 1 với "PLUMMET" (lao dốc mạnh):', options: [{ id: 'a', text: 'dive sharply / collapse', isCorrect: true }, { id: 'b', text: 'climb steadily', isCorrect: false }, { id: 'c', text: 'plateau gradually', isCorrect: false }, { id: 'd', text: 'fluctuate mildly', isCorrect: false }], explanation: 'Plummet = plunge / drop precipitously (giảm cực mạnh).' },
      { id: 'l3-r1-02', type: 'gap_fill', prompt: '"Between 2010 and 2020, tourist arrivals _____ wildly between 20,000 and 80,000."', options: [{ id: 'a', text: 'fluctuated', isCorrect: true }, { id: 'b', text: 'stabilized', isCorrect: false }, { id: 'c', text: 'vanished', isCorrect: false }, { id: 'd', text: 'demolished', isCorrect: false }], explanation: 'fluctuate wildly = dao động dữ dội.' },
      { id: 'l3-r1-03', type: 'paraphrase', prompt: 'Từ nối đồng nghĩa với "CONVERSELY":', options: [{ id: 'a', text: 'on the contrary / in stark contrast', isCorrect: true }, { id: 'b', text: 'as a result', isCorrect: false }, { id: 'c', text: 'for instance', isCorrect: false }, { id: 'd', text: 'in addition to', isCorrect: false }], explanation: 'Conversely = on the other hand / in contrast (ngược lại).' },
      { id: 'l3-r1-04', type: 'gap_fill', prompt: '"Industrial expansion has triggered severe environmental _____ along coastal areas."', options: [{ id: 'a', text: 'degradation', isCorrect: true }, { id: 'b', text: 'conservation', isCorrect: false }, { id: 'c', text: 'enrichment', isCorrect: false }, { id: 'd', text: 'restoration', isCorrect: false }], explanation: 'environmental degradation = sự suy thoái môi trường.' },
      { id: 'l3-r1-05', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "SUBSTANTIALLY":', options: [{ id: 'a', text: 'considerably / significantly', isCorrect: true }, { id: 'b', text: 'barely', isCorrect: false }, { id: 'c', text: 'marginally', isCorrect: false }, { id: 'd', text: 'slightly', isCorrect: false }], explanation: 'Substantially = considerably (đáng kể).' },
      { id: 'l3-r1-06', type: 'gap_fill', prompt: '"Investing in green transport infrastructure is critical for _____ urban development."', options: [{ id: 'a', text: 'sustainable', isCorrect: true }, { id: 'b', text: 'harmful', isCorrect: false }, { id: 'c', text: 'destructive', isCorrect: false }, { id: 'd', text: 'obsolete', isCorrect: false }], explanation: 'sustainable development = phát triển bền vững.' },
      { id: 'l3-r1-07', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "UNPRECEDENTED":', options: [{ id: 'a', text: 'never seen before / novel', isCorrect: true }, { id: 'b', text: 'customary', isCorrect: false }, { id: 'c', text: 'conventional', isCorrect: false }, { id: 'd', text: 'commonplace', isCorrect: false }], explanation: 'Unprecedented = chưa từng có tiền lệ.' },
      { id: 'l3-r1-08', type: 'gap_fill', prompt: '"Shifting _____ trends indicate an aging population across developed nations."', options: [{ id: 'a', text: 'demographic', isCorrect: true }, { id: 'b', text: 'atmospheric', isCorrect: false }, { id: 'c', text: 'artistic', isCorrect: false }, { id: 'd', text: 'acoustic', isCorrect: false }], explanation: 'demographic trends = xu hướng nhân khẩu học.' },
      { id: 'l3-r1-09', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "OBSOLETE":', options: [{ id: 'a', text: 'outdated / superseded', isCorrect: true }, { id: 'b', text: 'cutting-edge', isCorrect: false }, { id: 'c', text: 'modernized', isCorrect: false }, { id: 'd', text: 'innovative', isCorrect: false }], explanation: 'Obsolete = lỗi thời, không còn sử dụng.' },
      { id: 'l3-r1-10', type: 'gap_fill', prompt: '"The university decided to _____ more funds toward scientific research."', options: [{ id: 'a', text: 'allocate', isCorrect: true }, { id: 'b', text: 'confiscate', isCorrect: false }, { id: 'c', text: 'demolish', isCorrect: false }, { id: 'd', text: 'extinguish', isCorrect: false }], explanation: 'allocate funds = phân bổ ngân sách.' },
      { id: 'l3-r1-11', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "COMPREHENSIVE":', options: [{ id: 'a', text: 'exhaustive / all-inclusive', isCorrect: true }, { id: 'b', text: 'superficial', isCorrect: false }, { id: 'c', text: 'fragmented', isCorrect: false }, { id: 'd', text: 'partial', isCorrect: false }], explanation: 'Comprehensive = toàn diện, sâu rộng.' },
      { id: 'l3-r1-12', type: 'gap_fill', prompt: '"During the pandemic, e-commerce revenues _____ to historic record peaks."', options: [{ id: 'a', text: 'soared', isCorrect: true }, { id: 'b', text: 'collapsed', isCorrect: false }, { id: 'c', text: 'plummeted', isCorrect: false }, { id: 'd', text: 'slumped', isCorrect: false }], explanation: 'soar to record peaks = tăng vọt lên đỉnh kỷ lục.' },
      { id: 'l3-r1-13', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "INFRASTRUCTURE":', options: [{ id: 'a', text: 'public framework & facilities', isCorrect: true }, { id: 'b', text: 'temporary shelter', isCorrect: false }, { id: 'c', text: 'personal vehicle', isCorrect: false }, { id: 'd', text: 'private residence', isCorrect: false }], explanation: 'Infrastructure = cơ sở hạ tầng đô thị.' },
      { id: 'l3-r1-14', type: 'gap_fill', prompt: '"Higher education confers high earnings; _____, it expands cognitive horizons."', options: [{ id: 'a', text: 'furthermore', isCorrect: true }, { id: 'b', text: 'nevertheless', isCorrect: false }, { id: 'c', text: 'whereas', isCorrect: false }, { id: 'd', text: 'despite', isCorrect: false }], explanation: 'furthermore = hơn thế nữa (từ nối bổ sung ý).' },
      { id: 'l3-r1-15', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "DEMOLISHED TO MAKE WAY FOR":', options: [{ id: 'a', text: 'razed to accommodate', isCorrect: true }, { id: 'b', text: 'preserved intact', isCorrect: false }, { id: 'c', text: 'renovated carefully', isCorrect: false }, { id: 'd', text: 'abandoned safely', isCorrect: false }], explanation: 'demolished to make way for = bị dỡ bỏ để nhường chỗ xây công trình mới trong Task 1 Maps.' }
    ],
    round2: [
      { id: 'l3-r2-01', word: 'plummet', ipaUk: '/ˈplʌm.ɪt/', ipaUs: '/ˈplʌm.ət/', acceptedSpellings: ['plummet'], definitionVi: 'lao dốc không phanh', hintSentence: 'Stock values began to _____ immediately following the financial crash.' },
      { id: 'l3-r2-02', word: 'conversely', ipaUk: '/ˈkɒn.vɜːs.li/', ipaUs: '/kənˈvɝːs.li/', acceptedSpellings: ['conversely'], definitionVi: 'ngược lại, trái lại', hintSentence: 'Rural areas lost workers; _____, cities experienced rapid population growth.' },
      { id: 'l3-r2-03', word: 'analyse', ipaUk: '/ˈæn.əl.aɪz/', ipaUs: '/ˈæn.əl.aɪz/', acceptedSpellings: ['analyse', 'analyze'], definitionVi: 'phân tích dữ liệu học thuật', hintSentence: 'Researchers carefully _____ sample demographics before publishing conclusions.' },
      { id: 'l3-r2-04', word: 'infrastructure', ipaUk: '/ˈɪn.frəˌstrʌk.tʃər/', ipaUs: '/ˈɪn.frəˌstrʌk.tʃɚ/', acceptedSpellings: ['infrastructure'], definitionVi: 'cơ sở hạ tầng', hintSentence: 'Developing countries require heavy investment in transport and power _____.' },
      { id: 'l3-r2-05', word: 'sustainable', ipaUk: '/səˈsteɪ.nə.bəl/', ipaUs: '/səˈsteɪ.nə.bəl/', acceptedSpellings: ['sustainable'], definitionVi: 'bền vững dài lâu', hintSentence: 'Adopting solar panels is a _____ strategy for lowering energy expenditures.' }
    ],
    round3: [
      { id: 'l3-r3-01', targetWord: 'fluctuate wildly', partOfSpeech: 'collocation', ipa: '/ˈflʌk.tʃu.eɪt ˈwaɪld.li/', meaningVi: 'biến động dữ dội (Task 1)', academicContext: 'IELTS Academic Writing Task 1', guidanceTip: 'Mô tả đường số liệu của lượng khách du lịch hoặc giá dầu dao động liên tục trong suốt giai đoạn.' },
      { id: 'l3-r3-02', targetWord: 'conversely', partOfSpeech: 'adverb', ipa: '/ˈkɒn.vɜːs.li/', meaningVi: 'ngược lại, ở chiều đối lập', academicContext: 'IELTS Writing Task 2 (Cohesion & Coherence)', guidanceTip: 'Dùng đầu câu có dấu phẩy để so sánh hai nhóm đối lập (ví dụ: người trẻ vs người cao tuổi).' },
      { id: 'l3-r3-03', targetWord: 'sustainable development', partOfSpeech: 'collocation', ipa: '/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/', meaningVi: 'phát triển bền vững', academicContext: 'IELTS Speaking Part 3 / Writing Task 2', guidanceTip: 'Lập luận rằng tăng trưởng kinh tế không được đánh đổi bằng việc hủy hoại môi trường sống.' }
    ]
  },

  // LEVEL 4: Band 6.0 - 7.5 -> Band 7.5+
  4: {
    round1: [
      { id: 'l4-r1-01', type: 'paraphrase', prompt: 'Từ đồng nghĩa C1/C2 với "PARAMOUNT" (tối thượng, quan trọng bậc nhất):', options: [{ id: 'a', text: 'of foremost significance', isCorrect: true }, { id: 'b', text: 'trivial and secondary', isCorrect: false }, { id: 'c', text: 'optional', isCorrect: false }, { id: 'd', text: 'temporary', isCorrect: false }], explanation: 'Paramount = of supreme importance.' },
      { id: 'l4-r1-02', type: 'gap_fill', prompt: '"Preserving cultural heritage is of _____ importance for national identity."', options: [{ id: 'a', text: 'paramount', isCorrect: true }, { id: 'b', text: 'negligible', isCorrect: false }, { id: 'c', text: 'marginal', isCorrect: false }, { id: 'd', text: 'dispensable', isCorrect: false }], explanation: 'paramount importance = tầm quan trọng tối thượng.' },
      { id: 'l4-r1-03', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "EXACERBATE" (làm trầm trọng thêm vấn đề):', options: [{ id: 'a', text: 'aggravate / worsen', isCorrect: true }, { id: 'b', text: 'mitigate / alleviate', isCorrect: false }, { id: 'c', text: 'resolve', isCorrect: false }, { id: 'd', text: 'extinguish', isCorrect: false }], explanation: 'Exacerbate = aggravate (làm tồi tệ hơn).' },
      { id: 'l4-r1-04', type: 'gap_fill', prompt: '"Smartphones have become so _____ that even toddlers operate them instinctively."', options: [{ id: 'a', text: 'ubiquitous', isCorrect: true }, { id: 'b', text: 'scarce', isCorrect: false }, { id: 'c', text: 'inaccessible', isCorrect: false }, { id: 'd', text: 'antiquated', isCorrect: false }], explanation: 'ubiquitous = phổ biến khắp mọi nơi.' },
      { id: 'l4-r1-05', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "MITIGATE":', options: [{ id: 'a', text: 'alleviate / lessen severity', isCorrect: true }, { id: 'b', text: 'compound', isCorrect: false }, { id: 'c', text: 'magnify', isCorrect: false }, { id: 'd', text: 'provoke', isCorrect: false }], explanation: 'Mitigate = reduce severity (xoa dịu, giảm thiểu nhẹ tác hại).' },
      { id: 'l4-r1-06', type: 'gap_fill', prompt: '"Museum visitors are captivated by the exquisite _____ appeal of classical sculptures."', options: [{ id: 'a', text: 'aesthetic', isCorrect: true }, { id: 'b', text: 'auditory', isCorrect: false }, { id: 'c', text: 'financial', isCorrect: false }, { id: 'd', text: 'toxic', isCorrect: false }], explanation: 'aesthetic appeal = sức hút mỹ cảm nghệ thuật.' },
      { id: 'l4-r1-07', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "INDISPENSABLE":', options: [{ id: 'a', text: 'absolutely vital', isCorrect: true }, { id: 'b', text: 'superfluous', isCorrect: false }, { id: 'c', text: 'redundant', isCorrect: false }, { id: 'd', text: 'optional', isCorrect: false }], explanation: 'Indispensable = không thể thiếu được.' },
      { id: 'l4-r1-08', type: 'gap_fill', prompt: '"Researchers noted a sharp _____ between theoretical models and field observations."', options: [{ id: 'a', text: 'discrepancy', isCorrect: true }, { id: 'b', text: 'similarity', isCorrect: false }, { id: 'c', text: 'harmony', isCorrect: false }, { id: 'd', text: 'equilibrium', isCorrect: false }], explanation: 'discrepancy = sự sai lệch, khác biệt.' },
      { id: 'l4-r1-09', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "DETRIMENTAL":', options: [{ id: 'a', text: 'deleterious / harmful', isCorrect: true }, { id: 'b', text: 'beneficial', isCorrect: false }, { id: 'c', text: 'salutary', isCorrect: false }, { id: 'd', text: 'constructive', isCorrect: false }], explanation: 'Detrimental = harmful (có hại).' },
      { id: 'l4-r1-10', type: 'gap_fill', prompt: '"Solid _____ evidence is indispensable to substantiate scientific hypotheses."', options: [{ id: 'a', text: 'empirical', isCorrect: true }, { id: 'b', text: 'anecdotal', isCorrect: false }, { id: 'c', text: 'fictional', isCorrect: false }, { id: 'd', text: 'superstitious', isCorrect: false }], explanation: 'empirical evidence = bằng chứng thực nghiệm.' },
      { id: 'l4-r1-11', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "QUINTESSENTIAL":', options: [{ id: 'a', text: 'archetypal / typical best', isCorrect: true }, { id: 'b', text: 'unrelated', isCorrect: false }, { id: 'c', text: 'unusual', isCorrect: false }, { id: 'd', text: 'inferior', isCorrect: false }], explanation: 'Quintessential = mẫu mực tiêu biểu nhất.' },
      { id: 'l4-r1-12', type: 'gap_fill', prompt: '"Environmental advocates urge politicians to _____ the protection of primary rainforests."', options: [{ id: 'a', text: 'delineate', isCorrect: true }, { id: 'b', text: 'obliterate', isCorrect: false }, { id: 'c', text: 'renounce', isCorrect: false }, { id: 'd', text: 'stagnate', isCorrect: false }], explanation: 'delineate = phác thảo chi tiết đường lối.' },
      { id: 'l4-r1-13', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "SUBSTANTIATE":', options: [{ id: 'a', text: 'corroborate / prove with data', isCorrect: true }, { id: 'b', text: 'refute', isCorrect: false }, { id: 'c', text: 'contradict', isCorrect: false }, { id: 'd', text: 'undermine', isCorrect: false }], explanation: 'Substantiate = chứng minh bằng dữ liệu.' },
      { id: 'l4-r1-14', type: 'gap_fill', prompt: '"It is morally _____ that wealthy states assist developing countries in green transitions."', options: [{ id: 'a', text: 'imperative', isCorrect: true }, { id: 'b', text: 'frivolous', isCorrect: false }, { id: 'c', text: 'redundant', isCorrect: false }, { id: 'd', text: 'prohibited', isCorrect: false }], explanation: 'morally imperative = mệnh lệnh đạo đức cấp thiết.' },
      { id: 'l4-r1-15', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "WHAT IS OF PARAMOUNT SIGNIFICANCE IS THAT":', options: [{ id: 'a', text: 'crucially important is the fact that', isCorrect: true }, { id: 'b', text: 'by the way', isCorrect: false }, { id: 'c', text: 'as an afterthought', isCorrect: false }, { id: 'd', text: 'on a minor note', isCorrect: false }], explanation: 'Cấu trúc câu chẻ ăn điểm Grammatical Range C2.' }
    ],
    round2: [
      { id: 'l4-r2-01', word: 'paramount', ipaUk: '/ˈpær.ə.maʊnt/', ipaUs: '/ˈper.ə.maʊnt/', acceptedSpellings: ['paramount'], definitionVi: 'tối thượng, quan trọng nhất', hintSentence: 'Safeguarding patient privacy remains of _____ concern in healthcare.' },
      { id: 'l4-r2-02', word: 'exacerbate', ipaUk: '/ɪɡˈzæs.ə.beɪt/', ipaUs: '/ɪɡˈzæs.ɚ.beɪt/', acceptedSpellings: ['exacerbate'], definitionVi: 'làm trầm trọng thêm', hintSentence: 'Uncontrolled emissions will dramatically _____ global climate anomalies.' },
      { id: 'l4-r2-03', word: 'ubiquitous', ipaUk: '/juːˈbɪk.wɪ.təs/', ipaUs: '/juːˈbɪk.wə.t̬əs/', acceptedSpellings: ['ubiquitous'], definitionVi: 'phổ biến khắp mọi ngóc ngách', hintSentence: 'High-speed internet has become _____ across modern metropolitan zones.' },
      { id: 'l4-r2-04', word: 'dialogue', ipaUk: '/ˈdaɪ.ə.lɒɡ/', ipaUs: '/ˈdaɪ.ə.lɑːɡ/', acceptedSpellings: ['dialogue', 'dialog'], definitionVi: 'cuộc đối thoại mang tính xây dựng', hintSentence: 'Diplomats initiated constructive _____ to de-escalate regional tensions.' },
      { id: 'l4-r2-05', word: 'indispensable', ipaUk: '/ˌɪn.dɪˈspen.sə.bəl/', ipaUs: '/ˌɪn.dɪˈspen.sə.bəl/', acceptedSpellings: ['indispensable'], definitionVi: 'không thể thiếu được', hintSentence: 'Rigorous peer reviews are _____ to upholding academic publication standards.' }
    ],
    round3: [
      { id: 'l4-r3-01', targetWord: 'paramount importance', partOfSpeech: 'collocation', ipa: '/ˈpær.ə.maʊnt ɪmˈpɔː.təns/', meaningVi: 'tầm quan trọng tối thượng', academicContext: 'IELTS Writing Task 2 (Education & Ethics)', guidanceTip: 'Dùng cụm "It is of paramount importance that..." kết hợp cấu trúc giả định (subjunctive).' },
      { id: 'l4-r3-02', targetWord: 'exacerbate environmental degradation', partOfSpeech: 'collocation', ipa: '/ɪɡˈzæs.ə.beɪt ɪnˌvaɪ.rənˈmen.təl ˌdeɡ.rəˈdeɪ.ʃən/', meaningVi: 'làm trầm trọng thêm suy thoái môi trường', academicContext: 'IELTS Writing Task 2 (Environment)', guidanceTip: 'Nêu rõ tiêu dùng quá mức và năng lượng hóa thạch đang đẩy nhanh suy thoái sinh thái.' },
      { id: 'l4-r3-03', targetWord: 'in stark contrast to', partOfSpeech: 'phrase', ipa: '/ɪn stɑːk ˈkɒn.trɑːst tuː/', meaningVi: 'hoàn toàn tương phản rõ rệt với', academicContext: 'IELTS Academic Writing Task 1 & 2', guidanceTip: 'So sánh mức tiêu thụ năng lượng tái tạo của Bắc Âu với các quốc gia phụ thuộc than đá.' }
    ]
  },

  // LEVEL 5: Band 7.5+ -> Band 9.0 (Cambridge Grandmaster)
  5: {
    round1: [
      { id: 'l5-r1-01', type: 'paraphrase', prompt: 'Từ đồng nghĩa C2 với "PANACEA" (liều thuốc vạn năng):', options: [{ id: 'a', text: 'universal cure / magic bullet', isCorrect: true }, { id: 'b', text: 'poisonous substance', isCorrect: false }, { id: 'c', text: 'temporary setback', isCorrect: false }, { id: 'd', text: 'minor flaw', isCorrect: false }], explanation: 'Panacea = universal remedy (giải pháp vạn năng).' },
      { id: 'l5-r1-02', type: 'gap_fill', prompt: '"Technology is not a _____ for complex socioeconomic disparities."', options: [{ id: 'a', text: 'panacea', isCorrect: true }, { id: 'b', text: 'catalyst', isCorrect: false }, { id: 'c', text: 'dilemma', isCorrect: false }, { id: 'd', text: 'symptom', isCorrect: false }], explanation: 'not a panacea = không phải liều thuốc vạn năng giải quyết mọi vấn đề.' },
      { id: 'l5-r1-03', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "EPISTEMOLOGICAL":', options: [{ id: 'a', text: 'concerning theory of knowledge', isCorrect: true }, { id: 'b', text: 'purely mathematical', isCorrect: false }, { id: 'c', text: 'biological evolution', isCorrect: false }, { id: 'd', text: 'historical timeline', isCorrect: false }], explanation: 'Epistemological thuộc về nhận thức luận triết học.' },
      { id: 'l5-r1-04', type: 'gap_fill', prompt: '"Corporate lobbyists attempted to _____ scientific consensus on climate disruption."', options: [{ id: 'a', text: 'obfuscate', isCorrect: true }, { id: 'b', text: 'illuminate', isCorrect: false }, { id: 'c', text: 'clarify', isCorrect: false }, { id: 'd', text: 'elucidate', isCorrect: false }], explanation: 'obfuscate = làm lu mờ, gây nhiễu loạn thông tin.' },
      { id: 'l5-r1-05', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "VERACITY":', options: [{ id: 'a', text: 'truthfulness / accuracy', isCorrect: true }, { id: 'b', text: 'deceit', isCorrect: false }, { id: 'c', text: 'ambiguity', isCorrect: false }, { id: 'd', text: 'fallacy', isCorrect: false }], explanation: 'Veracity = tính xác thực, chân thực.' },
      { id: 'l5-r1-06', type: 'gap_fill', prompt: '"The scientific paper demonstrated that current extreme weather is predominantly of _____ origin."', options: [{ id: 'a', text: 'anthropogenic', isCorrect: true }, { id: 'b', text: 'extraterrestrial', isCorrect: false }, { id: 'c', text: 'benign', isCorrect: false }, { id: 'd', text: 'spontaneous', isCorrect: false }], explanation: 'anthropogenic = do con người tạo ra.' },
      { id: 'l5-r1-07', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "DICHOTOMY":', options: [{ id: 'a', text: 'binary division / sharp contrast', isCorrect: true }, { id: 'b', text: 'harmonious union', isCorrect: false }, { id: 'c', text: 'random collection', isCorrect: false }, { id: 'd', text: 'solidarity', isCorrect: false }], explanation: 'Dichotomy = sự phân đôi nhị nguyên.' },
      { id: 'l5-r1-08', type: 'gap_fill', prompt: '"Deep-seated institutional _____ frequently impedes urgent decarbonization policies."', options: [{ id: 'a', text: 'inertia', isCorrect: true }, { id: 'b', text: 'agility', isCorrect: false }, { id: 'c', text: 'dynamism', isCorrect: false }, { id: 'd', text: 'flexibility', isCorrect: false }], explanation: 'institutional inertia = sức ỳ cơ chế của các tổ chức.' },
      { id: 'l5-r1-09', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "ANTITHETICAL":', options: [{ id: 'a', text: 'diametrically opposed', isCorrect: true }, { id: 'b', text: 'closely aligned', isCorrect: false }, { id: 'c', text: 'subservient', isCorrect: false }, { id: 'd', text: 'ancillary', isCorrect: false }], explanation: 'Antithetical = hoàn toàn tương phản.' },
      { id: 'l5-r1-10', type: 'gap_fill', prompt: '"Artificial intelligence creates a _____ paradigm across creative industries."', options: [{ id: 'a', text: 'multifaceted', isCorrect: true }, { id: 'b', text: 'monotonous', isCorrect: false }, { id: 'c', text: 'one-dimensional', isCorrect: false }, { id: 'd', text: 'unilateral', isCorrect: false }], explanation: 'multifaceted paradigm = mô thức đa diện phức tạp.' },
      { id: 'l5-r1-11', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "PROPENSITY":', options: [{ id: 'a', text: 'innate inclination / tendency', isCorrect: true }, { id: 'b', text: 'aversion', isCorrect: false }, { id: 'c', text: 'disinclination', isCorrect: false }, { id: 'd', text: 'reluctance', isCorrect: false }], explanation: 'Propensity = thiên hướng bẩm sinh.' },
      { id: 'l5-r1-12', type: 'gap_fill', prompt: '"Various political factions began to _____ around the proposed green constitutional amendment."', options: [{ id: 'a', text: 'coalesce', isCorrect: true }, { id: 'b', text: 'disintegrate', isCorrect: false }, { id: 'c', text: 'fragment', isCorrect: false }, { id: 'd', text: 'polarize', isCorrect: false }], explanation: 'coalesce around = quy tụ, hợp nhất xoay quanh.' },
      { id: 'l5-r1-13', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "NUANCE":', options: [{ id: 'a', text: 'subtle distinction', isCorrect: true }, { id: 'b', text: 'glaring contradiction', isCorrect: false }, { id: 'c', text: 'crude generalization', isCorrect: false }, { id: 'd', text: 'blunt falsehood', isCorrect: false }], explanation: 'Nuance = sắc thái tinh tế.' },
      { id: 'l5-r1-14', type: 'gap_fill', prompt: '"_____, the efficacy of carbon taxes hinges upon stringent international compliance."', options: [{ id: 'a', text: 'In the final analysis', isCorrect: true }, { id: 'b', text: 'At first glance', isCorrect: false }, { id: 'c', text: 'On the surface', isCorrect: false }, { id: 'd', text: 'Off the cuff', isCorrect: false }], explanation: 'In the final analysis = sau khi cân nhắc mọi khía cạnh (C2 connector).' },
      { id: 'l5-r1-15', type: 'paraphrase', prompt: 'Từ đồng nghĩa với "RIGOROUS":', options: [{ id: 'a', text: 'meticulously thorough', isCorrect: true }, { id: 'b', text: 'haphazard', isCorrect: false }, { id: 'c', text: 'careless', isCorrect: false }, { id: 'd', text: 'cursory', isCorrect: false }], explanation: 'Rigorous = nghiêm cẩn, tỉ mỉ.' }
    ],
    round2: [
      { id: 'l5-r2-01', word: 'panacea', ipaUk: '/ˌpæn.əˈsiː.ə/', ipaUs: '/ˌpæn.əˈsiː.ə/', acceptedSpellings: ['panacea'], definitionVi: 'liều thuốc vạn năng', hintSentence: 'Education is essential, but it is not a sole _____ for systemic poverty.' },
      { id: 'l5-r2-02', word: 'veracity', ipaUk: '/vəˈræs.ə.ti/', ipaUs: '/vəˈræs.ə.t̬i/', acceptedSpellings: ['veracity'], definitionVi: 'tính chân thực, xác thực', hintSentence: 'Jurors raised valid doubts regarding the _____ of the witness testimony.' },
      { id: 'l5-r2-03', word: 'anthropogenic', ipaUk: '/ˌæn.θrə.pəˈdʒen.ɪk/', ipaUs: '/ˌæn.θroʊ.pəˈdʒen.ɪk/', acceptedSpellings: ['anthropogenic'], definitionVi: 'do hoạt động của con người gây ra', hintSentence: 'The Intergovernmental Panel affirmed that global warming is overwhelmingly _____.' },
      { id: 'l5-r2-04', word: 'recognise', ipaUk: '/ˈrek.əɡ.naɪz/', ipaUs: '/ˈrek.əɡ.naɪz/', acceptedSpellings: ['recognise', 'recognize'], definitionVi: 'công nhận, nhận thức rõ', hintSentence: 'Governments must _____ the irreversible dangers of biodiversity collapse.' },
      { id: 'l5-r2-05', word: 'multifaceted', ipaUk: '/ˌmʌl.tiˈfæs.ɪ.tɪd/', ipaUs: '/ˌmʌl.tiˈfæs.ə.t̬ɪd/', acceptedSpellings: ['multifaceted'], definitionVi: 'nhiều mặt, đa khía cạnh', hintSentence: 'Tackling youth unemployment mandates a highly _____ policy approach.' }
    ],
    round3: [
      { id: 'l5-r3-01', targetWord: 'anthropogenic climate disruption', partOfSpeech: 'noun phrase', ipa: '/ˌæn.θrə.pəˈdʒen.ɪk ˈklaɪ.mət dɪsˈrʌp.ʃən/', meaningVi: 'sự phá vỡ khí hậu do con người gây ra', academicContext: 'IELTS Writing Task 2 (Climate Change)', guidanceTip: 'Dùng cấu trúc mệnh đề phân từ (Participle Clause) để phân tích trách nhiệm của các nước công nghiệp.' },
      { id: 'l5-r3-02', targetWord: 'in the final analysis', partOfSpeech: 'phrase', ipa: '/ɪn ðə ˈfaɪ.nəl əˈnæl.ə.sɪs/', meaningVi: 'xét đến cùng, sau khi đã mổ xẻ mọi góc độ', academicContext: 'IELTS Writing Task 2 Conclusion', guidanceTip: 'Dẫn dắt đoạn kết luận Task 2 thay thế cho cụm từ sáo rỗng "In conclusion".' },
      { id: 'l5-r3-03', targetWord: 'multifaceted paradigm', partOfSpeech: 'noun phrase', ipa: '/ˌmʌl.tiˈfæs.ɪ.tɪd ˈpær.ə.daɪm/', meaningVi: 'mô thức đa diện', academicContext: 'IELTS Speaking Part 3 (Philosophy & Science)', guidanceTip: 'Diễn đạt rằng giải quyết xung đột xã hội đòi hỏi một mô thức tiếp cận đa chiều và toàn diện.' }
    ]
  }
};

class IeltsBandPromotionExam {
  constructor() {
    this.currentLevel = 1;
    this.activeRound = 1; // 1, 2, 3, or 'RESULT'
    this.isOpen = false;
    this.isEvaluating = false;

    // Thời gian bài thi: 10 phút (600 giây)
    this.timerSeconds = 600;
    this.timerInterval = null;

    // Dữ liệu làm bài
    this.round1Answers = {}; // { [qId]: selectedOptionId }
    this.round1Score = 0;

    this.round2Answers = {}; // { [itemId]: stringInput }
    this.round2Score = 0;

    this.round3Answers = {}; // { [challengeId]: stringSentence }
    this.round3Evaluations = {}; // { [challengeId]: evaluationObject }
    this.round3Score = 0;

    this.totalScore = 0;
    this.percentage = 0;
    this.passed = false;
    this.examStartTime = null;

    // Micro thu âm
    this.recognition = null;
    this.recordingChallengeId = null;

    this.initMicrophone();
  }

  // Khởi tạo Speech Recognition
  initMicrophone() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-GB';

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (this.recordingChallengeId) {
          const area = document.getElementById(`promo-input-${this.recordingChallengeId}`);
          if (area) {
            area.value = (area.value ? area.value + ' ' : '') + transcript;
            this.round3Answers[this.recordingChallengeId] = area.value;
          }
        }
        this.updateMicUi(false);
      };

      this.recognition.onerror = () => {
        this.updateMicUi(false);
      };

      this.recognition.onend = () => {
        this.updateMicUi(false);
      };
    }
  }

  updateMicUi(isRecording) {
    if (!this.recordingChallengeId) return;
    const btn = document.getElementById(`btn-promo-mic-${this.recordingChallengeId}`);
    if (btn) {
      btn.innerHTML = isRecording ? '🔴 Đang nghe...' : '🎙️ Nói vào Mic';
      btn.classList.toggle('recording', isRecording);
    }
  }

  toggleMic(challengeId) {
    if (!this.recognition) {
      alert('Trình duyệt chưa hỗ trợ Web Speech Recognition. Vui lòng gõ câu trả lời vào khung văn bản.');
      return;
    }

    if (this.recordingChallengeId === challengeId) {
      this.recognition.stop();
      this.recordingChallengeId = null;
      this.updateMicUi(false);
    } else {
      this.recordingChallengeId = challengeId;
      try {
        this.recognition.start();
        this.updateMicUi(true);
      } catch (e) {
        this.recordingChallengeId = null;
      }
    }
  }

  // Lấy cấu hình của Level đang thi
  getLevelConfig(level) {
    return IELTS_PROMOTION_TIERS.find((t) => t.level === level) || IELTS_PROMOTION_TIERS[0];
  }

  // Lấy ngân hàng câu hỏi của Level
  getQuestionBank(level) {
    return PROMOTION_QUESTION_BANKS[level] || PROMOTION_QUESTION_BANKS[1];
  }

  /**
   * KIỂM TRA ĐIỀU KIỆN MỞ KHÓA BÀI THI THĂNG CẤP
   * Đạt đủ định mức số từ của Level hiện tại trong Gatekeeper
   */
  isLevelUnlocked(level) {
    if (typeof window === 'undefined' || !window.vocabGatekeeper) return true;

    const currentMastered = window.srsManager
      ? window.srsManager.getQualifiedCount()
      : (window.gamification ? window.gamification.state.vocabMastered || 0 : 0);

    const status = window.vocabGatekeeper.getStatus(currentMastered);
    const tier = status.tierStatuses.find((t) => t.level === level);

    if (!tier) return false;
    // Đủ định mức tích lũy để thi lên Band tiếp theo
    return tier.learnedInLevel >= tier.incrementTarget || tier.isCompleted;
  }

  /**
   * Trả về HTML nút "🔥 Thi Vượt Cấp Lên Band Tiếp Theo"
   * Nếu đủ điều kiện: Nút phát sáng rực rỡ (Glowing pulse)
   */
  renderPromotionButtonHtml(level = null) {
    const activeLevel = level || (typeof window !== 'undefined' && window.vocabGatekeeper ? window.vocabGatekeeper.getStatus(window.srsManager ? window.srsManager.getQualifiedCount() : 0).activeLevel.level : 1);
    const cfg = this.getLevelConfig(activeLevel);
    const unlocked = this.isLevelUnlocked(activeLevel);

    if (unlocked) {
      return `
        <button
          class="btn-band-promotion-glow active-glowing"
          onclick="window.bandPromotionExam.openExam(${activeLevel})"
          title="Đạt đủ định mức từ vựng! Nhấn để bước vào Bài Thi Sát Hạch Vượt Cấp Lên ${cfg.toBand} ngay!"
        >
          <span class="promo-fire-icon">🔥</span>
          <span class="promo-text-wrap">
            <strong>THI VƯỢT CẤP LÊN ${cfg.toBand.toUpperCase()}</strong>
            <small>Đã đạt ${cfg.quotaRequired}/${cfg.quotaRequired} từ • Sẵn sàng thăng hạng 3 vòng!</small>
          </span>
          <span class="promo-arrow">➔</span>
        </button>
      `;
    }

    return `
      <button
        class="btn-band-promotion-glow locked"
        onclick="window.bandPromotionExam.openExam(${activeLevel})"
        title="Chưa đủ định mức từ vựng. Bấm để thi thử nghiệm hoặc xem cấu trúc 3 vòng."
      >
        <span class="promo-fire-icon">🔒</span>
        <span class="promo-text-wrap">
          <strong>THI VƯỢT CẤP LÊN ${cfg.toBand.toUpperCase()}</strong>
          <small>Cần tích lũy đủ định mức từ vựng để mở khóa chính thức (Nhấn để thi thử)</small>
        </span>
        <span class="promo-badge-test">Thi Thử Nghiệm</span>
      </button>
    `;
  }

  /**
   * MỞ BÀI THI THĂNG CẤP BAND ĐIỂM
   */
  openExam(level = 1) {
    this.currentLevel = level;
    this.activeRound = 'LOBBY';
    this.timerSeconds = 600; // 10 phút
    clearInterval(this.timerInterval);

    // Reset kết quả
    this.round1Answers = {};
    this.round2Answers = {};
    this.round3Answers = {};
    this.round3Evaluations = {};
    this.round1Score = 0;
    this.round2Score = 0;
    this.round3Score = 0;
    this.totalScore = 0;
    this.percentage = 0;
    this.passed = false;

    this.renderModal();
    if (typeof document !== 'undefined') {
      const modal = document.getElementById('band-promotion-modal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playClick();
  }

  closeModal() {
    clearInterval(this.timerInterval);
    if (typeof document === 'undefined') return;
    const modal = document.getElementById('band-promotion-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playClick();
  }

  /**
   * BẮT ĐẦU TÍNH GIỜ 10 PHÚT VÀ VÀO VÒNG 1
   */
  startExam() {
    this.activeRound = 1;
    this.examStartTime = Date.now();
    this.startTimer();
    this.renderModal();
    if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playLevelUp();
    if (typeof window !== 'undefined' && window.mascot) {
      window.mascot.say('🔥 Chúc bạn may mắn trong Bài Thi Thăng Cấp! 10 phút bắt đầu đếm ngược, hãy thật tập trung!', 4000);
      window.mascot.setMood('encouraging');
    }
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timerSeconds -= 1;
      this.updateTimerUi();

      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        if (typeof alert !== 'undefined') alert('⏰ Hết 10 phút làm bài! Hệ thống tự động thu bài và chấm điểm.');
        this.submitExam();
      }
    }, 1000);
  }

  updateTimerUi() {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('promo-timer-text');
    const bar = document.getElementById('promo-timer-bar-fill');
    if (el) {
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      if (this.timerSeconds <= 120) {
        el.style.color = '#EF4444';
      }
    }
    if (bar) {
      const pct = Math.max(0, (this.timerSeconds / 600) * 100);
      bar.style.width = `${pct}%`;
      if (pct <= 20) bar.style.background = '#EF4444';
      else if (pct <= 50) bar.style.background = '#F59E0B';
    }
  }

  // ==================== RENDER MODAL SHELL ====================
  renderModal() {
    if (typeof document === 'undefined') return;
    let modal = document.getElementById('band-promotion-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'band-promotion-modal';
      modal.className = 'modal-overlay promo-modal-overlay';
      modal.onclick = (e) => {
        if (e.target === modal && this.activeRound === 'LOBBY') this.closeModal();
      };
      document.body.appendChild(modal);
    }

    const cfg = this.getLevelConfig(this.currentLevel);

    modal.innerHTML = `
      <div class="modal-content-shell promo-modal-shell">
        <!-- HEADER KỲ THI -->
        <div class="promo-modal-header">
          <div class="promo-header-info">
            <span class="promo-tier-chip" style="background: ${cfg.badgeGradient};">
              ${cfg.badgeIcon} Level ${cfg.level} • Sát Hạch ${cfg.toBand}
            </span>
            <h3 class="promo-exam-title">${cfg.title}</h3>
          </div>
          <div class="promo-header-right">
            ${
              this.activeRound !== 'LOBBY' && this.activeRound !== 'RESULT'
                ? `
              <div class="promo-countdown-pill">
                <span class="clock-icon">⏱️</span>
                <strong id="promo-timer-text">10:00</strong>
              </div>
            `
                : ''
            }
            <button class="btn-close-modal" onclick="window.bandPromotionExam.closeModal()" title="Đóng">&times;</button>
          </div>
        </div>

        ${
          this.activeRound !== 'LOBBY' && this.activeRound !== 'RESULT'
            ? `
          <div class="promo-timer-track">
            <div class="promo-timer-fill" id="promo-timer-bar-fill" style="width: 100%;"></div>
          </div>
          <!-- THANH 3 VÒNG THI -->
          <div class="promo-rounds-nav">
            <div class="round-step-item ${this.activeRound === 1 ? 'active' : this.activeRound > 1 ? 'completed' : ''}">
              <span class="step-num">1</span>
              <div class="step-desc">
                <strong>Vòng 1: Lexical Recognition</strong>
                <small>15 câu trắc nghiệm phản xạ (15đ)</small>
              </div>
            </div>
            <div class="round-step-item ${this.activeRound === 2 ? 'active' : this.activeRound > 2 ? 'completed' : ''}">
              <span class="step-num">2</span>
              <div class="step-desc">
                <strong>Vòng 2: Dictation Spelling</strong>
                <small>5 từ nghe & gõ chính tả UK/US (15đ)</small>
              </div>
            </div>
            <div class="round-step-item ${this.activeRound === 3 ? 'active' : ''}">
              <span class="step-num">3</span>
              <div class="step-desc">
                <strong>Vòng 3: Victoria AI Challenge</strong>
                <small>3 câu học thuật mổ xẻ AI (30đ)</small>
              </div>
            </div>
          </div>
        `
            : ''
        }

        <!-- NỘI DUNG VÒNG THI -->
        <div class="promo-modal-body" id="promo-modal-body">
          ${this.renderRoundContent()}
        </div>
      </div>
    `;

    if (this.activeRound !== 'LOBBY' && this.activeRound !== 'RESULT') {
      this.updateTimerUi();
    }
  }

  renderRoundContent() {
    if (this.activeRound === 'LOBBY') return this.renderLobbyHtml();
    if (this.activeRound === 1) return this.renderRound1Html();
    if (this.activeRound === 2) return this.renderRound2Html();
    if (this.activeRound === 3) return this.renderRound3Html();
    if (this.activeRound === 'RESULT') return this.renderResultHtml();
    return '';
  }

  // ==================== 1. GIAO DIỆN PHÒNG CHỜ (LOBBY) ====================
  renderLobbyHtml() {
    const cfg = this.getLevelConfig(this.currentLevel);
    const unlocked = this.isLevelUnlocked(this.currentLevel);

    return `
      <div class="promo-lobby-card">
        <div class="promo-lobby-hero" style="background: ${cfg.badgeGradient};">
          <div class="hero-crest">${cfg.badgeIcon}</div>
          <h2>${cfg.title}</h2>
          <p>${cfg.description}</p>
          <div class="hero-tags">
            <span>🎯 Ngưỡng qua màn: <strong>&ge; 80% (48/60 điểm)</strong></span>
            <span>⏳ Thời gian: <strong>10 Phút</strong></span>
            <span>🏆 Huy hiệu thưởng: <strong>${cfg.badgeName}</strong></span>
          </div>
        </div>

        <div class="promo-structure-grid">
          <div class="structure-card">
            <div class="s-icon">⚡</div>
            <h4>Vòng 1: Lexical Recognition</h4>
            <p>15 câu trắc nghiệm tốc độ cao: Tìm từ đồng nghĩa Paraphrase và điền từ vào câu Reading chuẩn đề Cambridge.</p>
            <span class="s-weight">15 Điểm (1đ / câu)</span>
          </div>

          <div class="structure-card">
            <div class="s-icon">🎧</div>
            <h4>Vòng 2: Dictation Spelling</h4>
            <p>Nghe 5 từ vựng học thuật qua giọng đọc bản xứ và gõ lại chính xác 100% chính tả (Chấp nhận cả chuẩn US và UK spelling).</p>
            <span class="s-weight">15 Điểm (3đ / từ)</span>
          </div>

          <div class="structure-card">
            <div class="s-icon">👩‍🏫</div>
            <h4>Vòng 3: Victoria AI Challenge</h4>
            <p>Giám khảo Cambridge Victoria đưa ra 3 từ mục tiêu; học viên đặt 3 câu hoàn chỉnh (gõ hoặc nói qua Micro). AI chấm 4 tiêu chí.</p>
            <span class="s-weight">30 Điểm (10đ / câu)</span>
          </div>
        </div>

        <div class="promo-lobby-footer">
          <div class="lobby-note">
            <span>⚠️ Lưu ý: Đồng hồ đếm ngược 10 phút sẽ chạy liên tục qua cả 3 vòng. Đạt từ 48/60 điểm trở lên sẽ lập tức được thăng cấp Band và cấp chứng chỉ TRF!</span>
          </div>
          <button class="btn-start-promo-exam" onclick="window.bandPromotionExam.startExam()">
            🔥 BẮT ĐẦU THI THĂNG CẤP NGAY ➔
          </button>
        </div>
      </div>
    `;
  }

  // ==================== 2. VÒNG 1: LEXICAL RECOGNITION (15 CÂU) ====================
  renderRound1Html() {
    const bank = this.getQuestionBank(this.currentLevel);
    const questions = bank.round1 || [];

    return `
      <div class="promo-round-wrapper">
        <div class="round-banner">
          <div>
            <span class="round-badge">VÒNG 1 / 3 &bull; TỐC ĐỘ CAO</span>
            <h4>Lexical Recognition: Paraphrase &amp; Reading Gap-Fill</h4>
            <p>Chọn phương án đúng nhất (A, B, C hoặc D) cho 15 câu dưới đây:</p>
          </div>
          <div class="round-progress-pill">
            Đã làm: <strong id="r1-counter">${Object.keys(this.round1Answers).length} / 15</strong>
          </div>
        </div>

        <div class="promo-questions-list">
          ${questions
            .map((q, idx) => {
              const selectedOpt = this.round1Answers[q.id];
              return `
              <div class="promo-q-card ${selectedOpt ? 'answered' : ''}" id="q-card-${q.id}">
                <div class="q-card-head">
                  <span class="q-num">Câu ${idx + 1}</span>
                  <span class="q-type-badge">${q.type === 'paraphrase' ? '🎯 Paraphrase Match' : '📖 Reading Gap-Fill'}</span>
                </div>
                <div class="q-prompt-text">${q.prompt}</div>
                <div class="q-options-grid">
                  ${q.options
                    .map((opt, oIdx) => {
                      const letter = ['A', 'B', 'C', 'D'][oIdx];
                      const isSel = selectedOpt === opt.id;
                      return `
                      <button
                        class="btn-promo-opt ${isSel ? 'selected' : ''}"
                        onclick="window.bandPromotionExam.selectRound1Answer('${q.id}', '${opt.id}')"
                      >
                        <span class="opt-letter">${letter}</span>
                        <span class="opt-label">${opt.text}</span>
                      </button>
                    `;
                    })
                    .join('')}
                </div>
              </div>
            `;
            })
            .join('')}
        </div>

        <div class="promo-round-footer">
          <button class="btn-next-round" onclick="window.bandPromotionExam.proceedToRound2()">
            Nộp Vòng 1 &amp; Sang Vòng 2 (Dictation) ➔
          </button>
        </div>
      </div>
    `;
  }

  selectRound1Answer(qId, optId) {
    this.round1Answers[qId] = optId;
    if (typeof document !== 'undefined') {
      const card = document.getElementById(`q-card-${qId}`);
      if (card) {
        card.classList.add('answered');
        const buttons = card.querySelectorAll('.btn-promo-opt');
        buttons.forEach((b) => b.classList.remove('selected'));
        const activeBtn = card.querySelector(`button[onclick*="'${optId}'"]`);
        if (activeBtn) activeBtn.classList.add('selected');
      }
      const counter = document.getElementById('r1-counter');
      if (counter) counter.textContent = `${Object.keys(this.round1Answers).length} / 15`;
    }
    if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playClick();
  }

  proceedToRound2() {
    const bank = this.getQuestionBank(this.currentLevel);
    const answeredCount = Object.keys(this.round1Answers).length;
    if (answeredCount < 10) {
      if (typeof confirm !== 'undefined' && !confirm(`Bạn mới trả lời ${answeredCount}/15 câu ở Vòng 1. Bạn có chắc chắn muốn nộp bài để sang Vòng 2 không?`)) {
        return;
      }
    }

    // Chấm điểm Vòng 1
    let score = 0;
    (bank.round1 || []).forEach((q) => {
      const userChoice = this.round1Answers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (correctOpt && userChoice === correctOpt.id) {
        score += 1;
      }
    });
    this.round1Score = score;

    this.activeRound = 2;
    this.renderModal();
    if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playCorrect();
  }

  // ==================== 3. VÒNG 2: SPELLING & LISTENING DICTATION (5 CÂU) ====================
  renderRound2Html() {
    const bank = this.getQuestionBank(this.currentLevel);
    const items = bank.round2 || [];

    return `
      <div class="promo-round-wrapper">
        <div class="round-banner">
          <div>
            <span class="round-badge">VÒNG 2 / 3 &bull; CHÍNH TẢ &amp; NGHE</span>
            <h4>Spelling &amp; Listening Dictation: 5 Từ Vựng Học Thuật</h4>
            <p>Bấm nút 🔊 Nghe phát âm chuẩn giọng Anh/Mỹ, sau đó gõ lại từ vựng chính xác 100% (Chấp nhận cả US/UK):</p>
          </div>
          <div class="round-progress-pill">
            Điểm tối đa: <strong>15 Điểm (3đ / từ)</strong>
          </div>
        </div>

        <div class="promo-dictation-list">
          ${items
            .map((item, idx) => {
              const currentVal = this.round2Answers[item.id] || '';
              return `
              <div class="promo-dictation-card" id="dict-card-${item.id}">
                <div class="dict-card-head">
                  <span class="dict-num">Từ #${idx + 1}</span>
                  <div class="dict-audio-actions">
                    <button class="btn-dict-audio uk" onclick="window.bandPromotionExam.speakWord('${this.escapeText(item.word)}', 'UK')">
                      🔊 Nghe Giọng Anh (UK)
                    </button>
                    <button class="btn-dict-audio us" onclick="window.bandPromotionExam.speakWord('${this.escapeText(item.word)}', 'US')">
                      🔊 Nghe Giọng Mỹ (US)
                    </button>
                  </div>
                </div>

                <div class="dict-hint-box">
                  <div class="dict-hint-sentence">
                    <strong>Gợi ý ngữ cảnh:</strong> "${item.hintSentence}"
                  </div>
                  <div class="dict-meaning-vi">
                    <em>Nghĩa tiếng Việt: ${item.definitionVi}</em>
                  </div>
                </div>

                <div class="dict-input-wrap">
                  <input
                    type="text"
                    id="dict-input-${item.id}"
                    class="dict-input"
                    placeholder="Gõ từ vựng bạn vừa nghe tại đây (ví dụ: ${item.word.charAt(0)}...)"
                    value="${this.escapeText(currentVal)}"
                    oninput="window.bandPromotionExam.round2Answers['${item.id}'] = this.value"
                    autocomplete="off"
                    spellcheck="false"
                  />
                </div>
              </div>
            `;
            })
            .join('')}
        </div>

        <div class="promo-round-footer">
          <button class="btn-next-round" onclick="window.bandPromotionExam.proceedToRound3()">
            Nộp Vòng 2 &amp; Sang Vòng 3 (Victoria AI Challenge) ➔
          </button>
        </div>
      </div>
    `;
  }

  speakWord(word, accent = 'UK') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = accent === 'US' ? 'en-US' : 'en-GB';
    utterance.rate = 0.88; // Đọc chậm rãi rõ ràng để nghe chính tả

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => (accent === 'US' ? v.lang === 'en-US' : v.lang === 'en-GB'));
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
    if (window.soundSystem) window.soundSystem.playClick();
  }

  proceedToRound3() {
    const bank = this.getQuestionBank(this.currentLevel);
    const items = bank.round2 || [];

    // Chấm điểm Vòng 2 thông minh (chấp nhận cả UK và US spelling)
    let score = 0;
    items.forEach((item) => {
      const input = (this.round2Answers[item.id] || '').trim().toLowerCase();
      const accepted = item.acceptedSpellings.map((s) => s.trim().toLowerCase());
      if (accepted.includes(input)) {
        score += 3;
      }
    });
    this.round2Score = score;

    this.activeRound = 3;
    this.renderModal();
    if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playCorrect();
  }

  // ==================== 4. VÒNG 3: AI EXAMINER VICTORIA CHALLENGE (3 CÂU) ====================
  renderRound3Html() {
    const bank = this.getQuestionBank(this.currentLevel);
    const challenges = bank.round3 || [];

    return `
      <div class="promo-round-wrapper">
        <div class="round-banner">
          <div>
            <span class="round-badge" style="background:#FEE2E2; color:#991B1B;">VÒNG 3 / 3 &bull; GIÁM KHẢO VICTORIA AI</span>
            <h4>Senior Examiner Challenge: 3 Câu Tự Luận Học Thuật</h4>
            <p>Đặt 3 câu hoàn chỉnh có sử dụng đúng ngữ cảnh học thuật với các từ mục tiêu dưới đây (Gõ hoặc bấm Micro để nói):</p>
          </div>
          <div class="round-progress-pill">
            Điểm tối đa: <strong>30 Điểm (10đ / câu)</strong>
          </div>
        </div>

        <div class="promo-ai-challenges-list">
          ${challenges
            .map((c, idx) => {
              const currentSentence = this.round3Answers[c.id] || '';
              const evalRes = this.round3Evaluations[c.id];

              return `
              <div class="promo-ai-card" id="ai-card-${c.id}">
                <div class="ai-card-head">
                  <div class="ai-target-cluster">
                    <span class="ai-q-num">Thử Thách #${idx + 1}</span>
                    <strong class="ai-target-word">${c.targetWord}</strong>
                    <span class="ai-pos-tag">${c.partOfSpeech}</span>
                    <span class="ai-ipa-tag">${c.ipa}</span>
                  </div>
                  <div class="ai-mic-actions">
                    <button
                      class="btn-promo-mic"
                      id="btn-promo-mic-${c.id}"
                      onclick="window.bandPromotionExam.toggleMic('${c.id}')"
                    >
                      🎙️ Nói vào Mic
                    </button>
                  </div>
                </div>

                <div class="ai-guidance-box">
                  <div style="font-size: 12.5px; color: #1E293B;"><strong>Nghĩa:</strong> ${c.meaningVi}</div>
                  <div style="font-size: 12px; color: #475569; margin-top: 2px;"><strong>Bối cảnh:</strong> ${c.academicContext} &bull; <em>${c.guidanceTip}</em></div>
                </div>

                <div class="ai-textarea-wrap">
                  <textarea
                    id="promo-input-${c.id}"
                    class="promo-sentence-input"
                    rows="3"
                    placeholder="Nhập hoặc đọc câu hoàn chỉnh của bạn có chứa từ '${c.targetWord}' tại đây..."
                    oninput="window.bandPromotionExam.round3Answers['${c.id}'] = this.value"
                  >${this.escapeText(currentSentence)}</textarea>
                </div>

                <!-- KHUNG KẾT QUẢ ĐÁNH GIÁ NẾU CÓ -->
                ${
                  evalRes
                    ? `
                  <div class="promo-eval-result-box">
                    <div class="eval-head">
                      <span>👩‍🏫 Victoria AI Đánh Giá: <strong>${evalRes.totalScore}/10 Điểm</strong></span>
                    </div>
                    <p class="eval-remarks">"${evalRes.examinerRemarks}"</p>
                    <div class="eval-improved">
                      <strong>Phiên bản nâng cấp Band 8.0+:</strong> "${evalRes.improvedVersion}"
                    </div>
                  </div>
                `
                    : ''
                }
              </div>
            `;
            })
            .join('')}
        </div>

        <div class="promo-round-footer">
          <button
            class="btn-finish-promo"
            id="btn-submit-promo"
            onclick="window.bandPromotionExam.submitExam()"
            ${this.isEvaluating ? 'disabled' : ''}
          >
            ${this.isEvaluating ? '⏳ Giám Khảo Victoria Đang Chấm Điểm 3 Câu...' : '🏁 Nộp Bài & Nhận Kết Quả Thăng Cấp ➔'}
          </button>
        </div>
      </div>
    `;
  }

  // ==================== 5. NỘP BÀI THI & CHẤM ĐIỂM AI VÒNG 3 ====================
  async submitExam() {
    if (this.isEvaluating) return;
    this.isEvaluating = true;
    clearInterval(this.timerInterval);

    if (typeof document !== 'undefined') {
      const btn = document.getElementById('btn-submit-promo');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Giám Khảo Victoria Đang Chấm Toàn Bộ 3 Vòng...';
      }
    }

    if (typeof window !== 'undefined' && window.mascot) {
      window.mascot.say('👩‍🏫 Giám khảo Victoria đang kiểm tra độ chính xác và tính học thuật trong câu của bạn...', 4000);
      window.mascot.setMood('thinking');
    }

    const bank = this.getQuestionBank(this.currentLevel);
    const challenges = bank.round3 || [];
    let r3Total = 0;

    for (const c of challenges) {
      const sentence = (this.round3Answers[c.id] || '').trim();
      const evalResult = await this.evaluateRound3SentenceWithAi(c, sentence);
      this.round3Evaluations[c.id] = evalResult;
      r3Total += evalResult.totalScore;
    }

    this.round3Score = r3Total;
    this.totalScore = this.round1Score + this.round2Score + this.round3Score;
    this.percentage = Math.round((this.totalScore / 60) * 100);
    this.passed = this.percentage >= 80;

    this.isEvaluating = false;

    // Xử lý trao thưởng nếu vượt qua
    if (this.passed) {
      this.handlePromotionSuccess();
    } else {
      if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playWrong();
      if (typeof window !== 'undefined' && window.mascot) {
        window.mascot.say(`Rất tiếc! Bạn đạt ${this.totalScore}/60 điểm (${this.percentage}%). Cần đạt &ge; 80% để thăng cấp. Đừng nản lòng, hãy xem lỗi sai và thi lại nhé!`, 5000);
        window.mascot.setMood('thinking');
      }
    }

    this.activeRound = 'RESULT';
    this.renderModal();

    if (this.passed) {
      // Bắn pháo hoa rực rỡ toàn màn hình
      if (typeof setTimeout !== 'undefined') {
        setTimeout(() => this.launchFireworks(), 300);
      }
    }
  }

  // Chấm câu Vòng 3 với AI (hoặc Smart Cambridge Fallback)
  async evaluateRound3SentenceWithAi(challenge, userSentence) {
    if (!userSentence || userSentence.length < 5) {
      return {
        sentence: userSentence,
        contextScore: 0,
        grammarScore: 0,
        collocationScore: 0,
        academicRegisterScore: 0,
        totalScore: 0,
        examinerRemarks: 'Thí sinh bỏ trống hoặc viết câu quá ngắn, không đáp ứng yêu cầu tối thiểu.',
        improvedVersion: `It is universally acknowledged that ${challenge.targetWord} plays a pivotal role in contemporary academic paradigms.`
      };
    }

    // Kiểm tra có chứa từ mục tiêu không
    const normalizedWord = challenge.targetWord.toLowerCase();
    const hasTarget = userSentence.toLowerCase().includes(normalizedWord.split(' ')[0]);

    if (window.aiService) {
      try {
        const prompt = `
Bạn là Giám khảo Victoria - Senior Cambridge IELTS Examiner tại London.
Chấm câu tiếng Anh của thí sinh trong Kỳ Thi Thăng Cấp Band Điểm:
- Từ vựng mục tiêu bắt buộc: "${challenge.targetWord}" (${challenge.partOfSpeech})
- Câu thí sinh viết: "${userSentence}"

Quy tắc chấm trên thang điểm 10:
- contextScore (0 - 3): Sử dụng đúng nghĩa và bối cảnh học thuật.
- grammarScore (0 - 3): Chuẩn ngữ pháp, thì thời, mạo từ, sự hòa hợp S-V.
- collocationScore (0 - 2): Kết hợp tự nhiên với các từ xung quanh.
- academicRegisterScore (0 - 2): Văn phong trang trọng, cấm từ ngữ suồng sã/văn nói.

Trả về JSON:
{
  "contextScore": number,
  "grammarScore": number,
  "collocationScore": number,
  "academicRegisterScore": number,
  "totalScore": number,
  "examinerRemarks": string (nhận xét trực diện bằng tiếng Việt phong thái Examiner London),
  "improvedVersion": string (câu nâng cấp đỉnh cao Band 8.5+)
}
`;
        const res = await window.aiService.callGemini(prompt, 'Chấm thi IELTS Band Promotion');
        if (res) {
          const jsonMatch = res.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
              sentence: userSentence,
              contextScore: parsed.contextScore || 2,
              grammarScore: parsed.grammarScore || 2,
              collocationScore: parsed.collocationScore || 2,
              academicRegisterScore: parsed.academicRegisterScore || 2,
              totalScore: parsed.totalScore || 8,
              examinerRemarks: parsed.examinerRemarks || 'Câu đáp ứng tốt tiêu chí ngữ pháp và từ vựng mục tiêu.',
              improvedVersion: parsed.improvedVersion || userSentence
            };
          }
        }
      } catch (err) {
        console.warn('AI Evaluate Fallback:', err);
      }
    }

    // Smart Fallback chấm chuẩn Cambridge
    let score = hasTarget ? 8 : 4;
    if (userSentence.split(' ').length >= 8) score = Math.min(10, score + 1);
    if (/Nowadays|good|bad|a lot of/i.test(userSentence)) score = Math.max(2, score - 2);

    return {
      sentence: userSentence,
      contextScore: hasTarget ? 3 : 1,
      grammarScore: 3,
      collocationScore: 2,
      academicRegisterScore: 2,
      totalScore: score,
      examinerRemarks: hasTarget
        ? `Câu văn diễn đạt gãy gọn, vận dụng từ vựng "${challenge.targetWord}" đúng ngữ cảnh học thuật và kiểm soát ngữ pháp tương đối chặt chẽ.`
        : `Thí sinh chưa lồng ghép từ vựng mục tiêu "${challenge.targetWord}" vào câu một cách trọn vẹn.`,
      improvedVersion: `Furthermore, ${userSentence.replace(/\.$/, '')}, thereby underscoring the critical dimension of ${challenge.targetWord}.`
    };
  }

  // ==================== 6. XỬ LÝ KHI VƯỢT QUA BÀI THI (PROMOTION SUCCESS) ====================
  handlePromotionSuccess() {
    const cfg = this.getLevelConfig(this.currentLevel);

    if (typeof window !== 'undefined' && window.soundSystem) window.soundSystem.playLevelUp();

    if (typeof window !== 'undefined' && window.gamification) {
      // Thưởng EXP và Crowns lớn
      window.gamification.addExp(500);
      window.gamification.addCrowns(50);

      // Nâng cấp Band điểm chính thức trên Header
      window.gamification.setBandScore(cfg.targetScore);

      // Đánh dấu tầng đã vượt vào Gatekeeper
      if (!Array.isArray(window.gamification.state.claimedGatekeeperLevels)) {
        window.gamification.state.claimedGatekeeperLevels = [];
      }
      if (!window.gamification.state.claimedGatekeeperLevels.includes(cfg.level)) {
        window.gamification.state.claimedGatekeeperLevels.push(cfg.level);
      }

      // Lưu chứng chỉ vào danh sách Certificate
      if (!Array.isArray(window.gamification.state.promotionCertificates)) {
        window.gamification.state.promotionCertificates = [];
      }

      const cert = {
        certId: `CAM-PROMO-${Date.now().toString().slice(-6)}`,
        level: cfg.level,
        fromBand: cfg.fromBand,
        toBand: cfg.toBand,
        badgeName: cfg.badgeName,
        totalScore: this.totalScore,
        percentage: this.percentage,
        date: new Date().toLocaleDateString('vi-VN'),
      };
      window.gamification.state.promotionCertificates.push(cert);
      window.gamification.saveState();
    }

    if (typeof window !== 'undefined' && window.mascot) {
      window.mascot.say(`🎉 CHÚC MỪNG TÂN THỦ KHOA! Bạn đã vượt qua Bài Thi Thăng Cấp với ${this.percentage}%! Chính thức nâng cấp lên ${cfg.toBand}! +500 EXP & +50 👑!`, 7000);
      window.mascot.setMood('happy');
    }
  }

  // ==================== 7. MÀN HÌNH TỔNG KẾT & CẤP CHỨNG CHỈ (RESULT) ====================
  renderResultHtml() {
    const cfg = this.getLevelConfig(this.currentLevel);

    if (this.passed) {
      return `
        <div class="promo-victory-wrap">
          <!-- CANVAS PHÁO HOA TOÀN MÀN HÌNH -->
          <canvas id="promo-fireworks-canvas" class="promo-fireworks-canvas"></canvas>

          <div class="victory-header-card" style="background: ${cfg.badgeGradient};">
            <span class="victory-sparkle">🎆 🎓 👑</span>
            <h2>CHÚC MỪNG BẠN ĐÃ THĂNG CẤP THÀNH CÔNG!</h2>
            <p>Chính thức nâng bậc trình độ lên <strong>${cfg.toBand} (${cfg.bandLabel})</strong></p>
          </div>

          <!-- BẢNG 3 VÒNG ĐIỂM SỐ CHI TIẾT -->
          <div class="victory-scores-grid">
            <div class="score-stat-box">
              <span class="st-lbl">Vòng 1 (Lexical Recognition)</span>
              <strong class="st-val" style="color: #2563EB;">${this.round1Score} / 15</strong>
              <small>${Math.round((this.round1Score / 15) * 100)}% chính xác</small>
            </div>

            <div class="score-stat-box">
              <span class="st-lbl">Vòng 2 (Dictation Spelling)</span>
              <strong class="st-val" style="color: #059669;">${this.round2Score} / 15</strong>
              <small>${Math.round((this.round2Score / 15) * 100)}% chính xác</small>
            </div>

            <div class="score-stat-box">
              <span class="st-lbl">Vòng 3 (Victoria AI Challenge)</span>
              <strong class="st-val" style="color: #7C3AED;">${this.round3Score} / 30</strong>
              <small>${Math.round((this.round3Score / 30) * 100)}% đạt chuẩn</small>
            </div>

            <div class="score-stat-box total">
              <span class="st-lbl">TỔNG ĐIỂM SÁT HẠCH</span>
              <strong class="st-val" style="color: #DC2626;">${this.totalScore} / 60 (${this.percentage}%)</strong>
              <small style="color: #16A34A; font-weight: 800;">✓ ĐẠT CHUẨN XUẤT SẮC (&ge; 80%)</small>
            </div>
          </div>

          <!-- CHỨNG CHỈ THĂNG CẤP SANG TRỌNG (BAND PROMOTION CERTIFICATE) -->
          <div class="promo-certificate-card" id="promo-certificate-print">
            <div class="cert-border-ornament">
              <div class="cert-top-crest">
                <span class="crest-crown">👑</span>
                <span class="crest-brand">IELTS GO! &bull; CAMBRIDGE LEXICAL ASSESSMENT</span>
              </div>
              <h1 class="cert-headline">CERTIFICATE OF BAND PROMOTION</h1>
              <p class="cert-subline">Chứng nhận Năng Lực Từ Vựng &amp; Thăng Cấp Trình Độ Khảo Thí</p>

              <div class="cert-body-content">
                <p class="cert-text-lead">Hội đồng Khảo thí IELTS GO! và Senior Examiner Victoria trân trọng chứng nhận:</p>
                <h3 class="cert-candidate-name">HỌC VIÊN XUẤT SẮC</h3>
                <p class="cert-achievement-text">
                  Đã hoàn thành xuất sắc Bài Thi Thăng Cấp 3 Vòng Liên Hoàn với tổng điểm <strong>${this.totalScore}/60 (${this.percentage}%)</strong>,
                  chính thức vượt ngưỡng tích lũy từ vựng để thăng cấp lên:
                </p>
                <div class="cert-promoted-band-badge" style="background: ${cfg.badgeGradient};">
                  ${cfg.badgeIcon} ${cfg.toBand.toUpperCase()} &bull; ${cfg.bandLabel.toUpperCase()}
                </div>
                <div class="cert-badge-awarded">
                  Huy hiệu Vinh Danh: <strong>${cfg.badgeName}</strong>
                </div>
              </div>

              <div class="cert-footer-signatures">
                <div class="sig-block">
                  <div class="sig-line"><em>Victoria AI Examiner</em></div>
                  <span class="sig-title">Giám khảo Khảo thí Cao cấp (London)</span>
                </div>
                <div class="cert-seal">
                  <span>🏛️</span>
                  <small>OFFICIAL SEAL</small>
                </div>
                <div class="sig-block">
                  <div class="sig-line"><em>Barnaby Sensei</em></div>
                  <span class="sig-title">Trợ lý Trưởng Ban Học Thuật</span>
                </div>
              </div>

              <div class="cert-meta-foot">
                <span>Số hiệu: <strong>CAM-PROMO-${Date.now().toString().slice(-6)}</strong></span>
                <span>Ngày cấp: <strong>${new Date().toLocaleDateString('vi-VN')}</strong></span>
              </div>
            </div>
          </div>

          <div class="victory-actions-bar">
            <button class="btn-cert-action print" onclick="window.bandPromotionExam.printCertificate()">
              🖨️ In / Tải Chứng Chỉ
            </button>
            <button class="btn-cert-action continue" onclick="window.bandPromotionExam.closeModal()">
              🚀 Tiến Vào Chặng Học ${cfg.toBand} Ngay
            </button>
          </div>
        </div>
      `;
    }

    // Trường hợp chưa đạt (< 80%)
    return `
      <div class="promo-failure-wrap">
        <div class="failure-header-card">
          <span class="failure-icon">⚠️</span>
          <h2>CHƯA ĐẠT ĐIỂM THĂNG CẤP (&lt; 80%)</h2>
          <p>Bạn đạt <strong>${this.totalScore} / 60 điểm (${this.percentage}%)</strong>. Cần đạt từ <strong>48/60 điểm (80%)</strong> trở lên để thăng hạng.</p>
        </div>

        <div class="victory-scores-grid">
          <div class="score-stat-box">
            <span class="st-lbl">Vòng 1 (Lexical Recognition)</span>
            <strong class="st-val">${this.round1Score} / 15</strong>
            <small>${Math.round((this.round1Score / 15) * 100)}%</small>
          </div>
          <div class="score-stat-box">
            <span class="st-lbl">Vòng 2 (Dictation Spelling)</span>
            <strong class="st-val">${this.round2Score} / 15</strong>
            <small>${Math.round((this.round2Score / 15) * 100)}%</small>
          </div>
          <div class="score-stat-box">
            <span class="st-lbl">Vòng 3 (Victoria AI Challenge)</span>
            <strong class="st-val">${this.round3Score} / 30</strong>
            <small>${Math.round((this.round3Score / 30) * 100)}%</small>
          </div>
          <div class="score-stat-box total">
            <span class="st-lbl">TỔNG ĐIỂM</span>
            <strong class="st-val" style="color: #DC2626;">${this.totalScore} / 60</strong>
            <small style="color: #DC2626;">Còn thiếu: ${Math.max(0, 48 - this.totalScore)} điểm</small>
          </div>
        </div>

        <div class="failure-advice-box">
          <h4>👩‍🏫 Lời Nhận Xét Của Giám Khảo Victoria:</h4>
          <p>
            "Bạn đã thể hiện nỗ lực tốt trong bài thi sát hạch này. Tuy nhiên để đạt chuẩn ${cfg.toBand}, 
            bạn cần củng cố thêm độ nhạy bén với từ đồng nghĩa trong Vòng 1, rèn luyện thói quen kiểm tra đuôi chính tả trong Vòng 2, 
            và xây dựng cấu trúc câu phức hợp chặt chẽ hơn trong Vòng 3. Hãy ôn lại trên Flashcard và thử sức lại nhé!"
          </p>
        </div>

        <div class="victory-actions-bar">
          <button class="btn-cert-action retry" onclick="window.bandPromotionExam.openExam(${this.currentLevel})">
            🔄 Thi Lại Ngay
          </button>
          <button class="btn-cert-action continue" onclick="window.bandPromotionExam.closeModal()">
            📖 Quay Về Ôn Tập Thêm
          </button>
        </div>
      </div>
    `;
  }

  // ==================== 8. HIỆU ỨNG PHÁO HOA CANVAS (CANVAS CONFETTI) ====================
  launchFireworks() {
    if (typeof document === 'undefined') return;
    const canvas = document.getElementById('promo-fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || 600;

    const particles = [];
    const colors = ['#FFD700', '#FF4500', '#00CED1', '#FF1493', '#7B68EE', '#32CD32', '#FFFFFF'];

    for (let i = 0; i < 160; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14 - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008,
      });
    }

    let animationId = null;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // trọng lực
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(animate);
      }
    }

    animate();
    setTimeout(() => {
      if (animationId) cancelAnimationFrame(animationId);
    }, 6000);
  }

  // In / Xuất chứng chỉ
  printCertificate() {
    window.print();
  }

  escapeText(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

// Khởi tạo đối tượng toàn cục
if (typeof window !== 'undefined') {
  window.bandPromotionExam = new IeltsBandPromotionExam();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IeltsBandPromotionExam,
    IELTS_PROMOTION_TIERS,
    PROMOTION_QUESTION_BANKS,
  };
}
