import { BandLevel, SkillType } from '../types/ielts';

export interface StudyMaterialItem {
  id: string;
  title: string;
  series: string;
  authorOrPublisher: string;
  targetSkill: SkillType | 'ALL';
  tierLevel: BandLevel;
  targetBandRange: string;
  type: 'BOOK' | 'AUDIO' | 'WORKBOOK' | 'MOCK_TEST' | 'RESOURCE_DOC';
  description: string;
  keyFeatures: string[];
  localAvailablePath?: string; // Tích hợp trực tiếp file/folder có sẵn trong máy tính người dùng
}

/**
 * Kho dữ liệu học liệu chuẩn hóa theo 5 cấp độ Band điểm
 */
export const IELTS_STUDY_MATERIALS: Record<BandLevel, StudyMaterialItem[]> = {
  // 1. Mức "Mất gốc" (0 - 3.0)
  [BandLevel.ZERO_FOUNDATION]: [
    {
      id: 'matgoc-01',
      title: 'Basic Tactics for Listening (3rd Edition)',
      series: 'Tactics for Listening',
      authorOrPublisher: 'Jack C. Richards - Oxford University Press',
      targetSkill: SkillType.LISTENING,
      tierLevel: BandLevel.ZERO_FOUNDATION,
      targetBandRange: '0 - 3.0',
      type: 'BOOK',
      description: 'Giáo trình luyện nghe căn bản nhất từ phát âm bảng chữ cái, nhận diện số đếm, tên riêng đến các hội thoại ngắn hàng ngày.',
      keyFeatures: [
        '24 bài học thực tế với ngữ điệu chuẩn Mỹ dễ nghe',
        'Luyện nghe chính tả con số, ngày tháng, giá tiền, địa chỉ',
        'Có file Audio & Answer key đầy đủ',
      ],
    },
    {
      id: 'matgoc-02',
      title: 'Listen Carefully',
      series: 'Oxford English Practice',
      authorOrPublisher: 'Jack C. Richards - Oxford',
      targetSkill: SkillType.LISTENING,
      tierLevel: BandLevel.ZERO_FOUNDATION,
      targetBandRange: '0 - 3.0',
      type: 'BOOK',
      description: '15 bài thực hành nghe cơ bản tập trung vào phân biệt âm, nhận diện các thông tin cụ thể trong cuộc sống sinh hoạt.',
      keyFeatures: ['Bài tập nghe ngắn, điền từ đơn', 'Giọng đọc chậm rãi, phát âm rõ ràng'],
    },
    {
      id: 'matgoc-03',
      title: 'English Unlimited A1 / A2 (Starter - Elementary)',
      series: 'English Unlimited',
      authorOrPublisher: 'Cambridge University Press',
      targetSkill: 'ALL',
      tierLevel: BandLevel.ZERO_FOUNDATION,
      targetBandRange: '0 - 3.0',
      type: 'BOOK',
      description: 'Bộ sách xây dựng nền móng ngữ pháp, từ vựng thông dụng và phản xạ giao tiếp quốc tế từ con số 0.',
      keyFeatures: [
        'Xây dựng 8 thì cơ bản và cấu trúc câu đơn',
        'Cung cấp hơn 800 từ vựng cốt lõi A1/A2',
        'Hình ảnh minh họa trực quan sinh động',
      ],
    },
    {
      id: 'matgoc-04',
      title: 'English Pronunciation in Use (Elementary)',
      series: 'In Use Series',
      authorOrPublisher: 'Cambridge University Press',
      targetSkill: SkillType.SPEAKING,
      tierLevel: BandLevel.ZERO_FOUNDATION,
      targetBandRange: '0 - 3.0',
      type: 'BOOK',
      description: 'Chuẩn hóa 44 âm quốc tế IPA, nguyên âm đơn, nguyên âm đôi và phụ âm bật hơi cơ bản.',
      keyFeatures: ['Sửa triệt để tật nuốt âm đuôi /s/, /z/, /ed/', 'Hướng dẫn khẩu hình miệng chuẩn'],
    },
  ],

  // 2. Mức "< 4.5" (3.5 - 4.0)
  [BandLevel.BELOW_4_5]: [
    {
      id: 'below-01',
      title: 'Basic IELTS Series (Listening, Reading, Speaking, Writing)',
      series: 'Basic IELTS',
      authorOrPublisher: 'Li Ya Bin - Beijing Language & Culture University',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BELOW_4_5,
      targetBandRange: '3.0 - 4.5',
      type: 'BOOK',
      description: 'Bộ sách vỡ lòng IELTS được thiết kế theo cấu trúc bài thi IELTS nhưng ở mức độ từ vựng và câu đơn giản.',
      keyFeatures: [
        'Làm quen định dạng Section 1 Listening và Part 1 Speaking',
        'Chiến thuật đọc hiểu đoạn văn ngắn và nhận biết từ khóa',
      ],
      localAvailablePath: 'Basic IELTS-20261107T184331Z-1-001',
    },
    {
      id: 'below-02',
      title: 'Bridge to IELTS 3.5 - 4.5',
      series: 'Bridge to IELTS',
      authorOrPublisher: 'National Geographic Learning / Cengage',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BELOW_4_5,
      targetBandRange: '3.5 - 4.5',
      type: 'BOOK',
      description: 'Chiếc cầu nối vững chắc đưa học viên từ trình độ sơ cấp tiếp cận với format đề thi IELTS 4 kỹ năng.',
      keyFeatures: [
        'Chủ đề gắn liền thực tế: Văn hóa, Du lịch, Môi trường',
        'Ngữ pháp trọng tâm cho bài thi IELTS cơ bản',
      ],
    },
    {
      id: 'below-03',
      title: 'Get Ready for IELTS (4 Kỹ Năng)',
      series: 'Collins English for Exams',
      authorOrPublisher: 'Collins COBUILD',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BELOW_4_5,
      targetBandRange: '3.5 - 4.5',
      type: 'BOOK',
      description: 'Bộ 4 cuốn cẩm nang kinh điển của Collins dành riêng cho người bắt đầu luyện đề IELTS từ con số nhỏ.',
      keyFeatures: [
        'Mỗi cuốn có 12 units kèm bài ôn tập Exam Practice',
        'Chỉ dẫn mẹo làm bài (Exam tips) và lỗi hay gặp (Exam watch)',
      ],
    },
    {
      id: 'below-04',
      title: 'Developing Tactics for Listening',
      series: 'Tactics for Listening',
      authorOrPublisher: 'Jack C. Richards - Oxford',
      targetSkill: SkillType.LISTENING,
      tierLevel: BandLevel.BELOW_4_5,
      targetBandRange: '3.5 - 4.5',
      type: 'BOOK',
      description: 'Nâng cao tốc độ nghe hiểu thông tin chi tiết, bẫy đổi ý và số liệu giao dịch.',
      keyFeatures: ['Luyện nghe hội thoại nơi làm việc, sân bay, nhà hàng'],
    },
    {
      id: 'below-05',
      title: 'Succeed in IELTS Speaking',
      series: 'Succeed in IELTS',
      authorOrPublisher: 'Andrew Betsis & Lawrence Mamas',
      targetSkill: SkillType.SPEAKING,
      tierLevel: BandLevel.BELOW_4_5,
      targetBandRange: '3.5 - 4.5',
      type: 'BOOK',
      description: '10 chủ đề nói thông dụng nhất kèm bài mẫu Part 1 và từ vựng mở rộng câu trả lời.',
      keyFeatures: ['Bài mẫu âm thanh và hướng dẫn triển khai ý tưởng'],
    },
  ],

  // 3. Mức "4.5 - 6.0" (4.5 - 6.0)
  [BandLevel.BAND_4_5_TO_6_0]: [
    {
      id: 'mid-01',
      title: 'Cambridge Practice Tests for IELTS (Tập 3, 4, 5, 6, 7, 8, 9)',
      series: 'Cambridge IELTS Authentic Examination Papers',
      authorOrPublisher: 'Cambridge University Press & UCLES',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_4_5_TO_6_0,
      targetBandRange: '4.5 - 6.0',
      type: 'MOCK_TEST',
      description: 'Bộ đề thi chuẩn xác thực tế nhất từ chính đơn vị ra đề thi Cambridge. Nguồn tài liệu luyện đề bắt buộc.',
      keyFeatures: [
        'Đề thi thật 4 kỹ năng có Answer Key & Tapescript',
        'Có sẵn trong máy tính với trọn bộ PDF và Audio từng Section',
      ],
      localAvailablePath: 'Cambridge IELTS 3 - 9 & MP3 Audio',
    },
    {
      id: 'mid-02',
      title: 'Complete IELTS Bands 4.0 - 5.0',
      series: 'Complete IELTS',
      authorOrPublisher: 'Guy Brook-Hart & Vanessa Jakeman - Cambridge',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_4_5_TO_6_0,
      targetBandRange: '4.5 - 5.5',
      type: 'BOOK',
      description: 'Giáo trình toàn diện kết hợp luyện kỹ năng và nâng cấp từ vựng học thuật theo chủ điểm bài thi.',
      keyFeatures: [
        '10 units chuyên sâu với bài tập chuẩn đề thi',
        'Language reference giải thích ngữ pháp chi tiết',
      ],
    },
    {
      id: 'mid-03',
      title: 'Mindset for IELTS Level 1',
      series: 'Mindset for IELTS',
      authorOrPublisher: 'Cambridge University Press',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_4_5_TO_6_0,
      targetBandRange: '5.0 - 5.5',
      type: 'BOOK',
      description: 'Bộ giáo trình hiện đại kết hợp rèn luyện tư duy làm bài thi và làm quen công nghệ thi trên máy.',
      keyFeatures: ['Học chiến thuật Skimming/Scanning, xử lý bài nghe Section 2'],
    },
    {
      id: 'mid-04',
      title: 'Collins for IELTS Series (Reading, Writing, Listening, Speaking 5.0-6.0)',
      series: 'Collins English for Exams',
      authorOrPublisher: 'Collins COBUILD',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_4_5_TO_6_0,
      targetBandRange: '5.0 - 6.0',
      type: 'BOOK',
      description: 'Bộ sách trứ danh giúp thí sinh phá vỡ rào cản band 5.0 để tiến thẳng lên 6.0 vững vàng.',
      keyFeatures: [
        'Phân đoạn bài viết Task 1 & Task 2 chuẩn mẫu',
        'Các bài tập từ vựng Collocations theo chủ đề quen thuộc',
      ],
    },
    {
      id: 'mid-05',
      title: 'Hackers IELTS (Listening & Reading)',
      series: 'Hackers Language Research Institute',
      authorOrPublisher: 'David Cho - Hackers',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_4_5_TO_6_0,
      targetBandRange: '5.0 - 6.0',
      type: 'BOOK',
      description: 'Cực kỳ nổi tiếng tại Châu Á với phương pháp giải nghĩa bẫy đề thi và hệ thống từ vựng cực kỳ logic.',
      keyFeatures: ['Bảng tổng hợp từ đồng nghĩa Paraphrase trong đề thi'],
    },
  ],

  // 4. Mức "6.0 - 7.5" (6.0 - 7.5 - Đạt Ngưỡng Vàng Du Học)
  [BandLevel.BAND_6_0_TO_7_5]: [
    {
      id: 'adv-01',
      title: 'IELTS Advantage: Writing / Speaking / Reading Skills',
      series: 'IELTS Advantage',
      authorOrPublisher: 'Richard Brown, Lewis Richards - Delta Publishing',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_6_0_TO_7_5,
      targetBandRange: '6.5 - 7.5',
      type: 'BOOK',
      description: 'Giáo trình bậc thầy hướng dẫn từng bước viết bài luận Task 2 đạt band 7.0+ và triển khai Part 3 Speaking.',
      keyFeatures: [
        'Tuyển tập các bài viết mẫu band 7.5-8.0 kèm phân tích của giám khảo',
        'Cung cấp cấu trúc câu phức, câu chẻ, mệnh đề danh từ học thuật',
      ],
    },
    {
      id: 'adv-02',
      title: 'Complete IELTS Bands 5.0 - 6.5 & 6.5 - 7.5',
      series: 'Complete IELTS',
      authorOrPublisher: 'Cambridge University Press',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_6_0_TO_7_5,
      targetBandRange: '6.0 - 7.5',
      type: 'BOOK',
      description: 'Nâng tầm kỹ năng học thuật cho học viên có nguyện vọng học đại học hoặc cao học quốc tế.',
      keyFeatures: ['Chiến thuật xử lý Section 4 bài giảng đại học', 'Matching Headings hóc búa'],
    },
    {
      id: 'adv-03',
      title: 'Mindset for IELTS Level 2',
      series: 'Mindset for IELTS',
      authorOrPublisher: 'Cambridge University Press',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_6_0_TO_7_5,
      targetBandRange: '6.5',
      type: 'BOOK',
      description: 'Tối ưu hóa phản xạ tư duy phản biện, làm chủ kỹ năng tự đánh giá và sửa lỗi (Self-correction).',
      keyFeatures: ['Đề bài mang tính thời sự, khoa học và triết lý xã hội'],
    },
    {
      id: 'adv-04',
      title: 'Target Band 7: IELTS Academic Module - How to Maximize Your Score',
      series: 'IELTS-Blog',
      authorOrPublisher: 'Simone Braverman',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_6_0_TO_7_5,
      targetBandRange: '7.0',
      type: 'BOOK',
      description: 'Chiến lược quản lý thời gian cực kỳ hiệu quả để thí sinh bứt phá từ 6.0 chạm mốc 7.0+.',
      keyFeatures: ['Kinh nghiệm thực chiến, giải quyết áp lực phòng thi'],
    },
    {
      id: 'adv-05',
      title: 'Cambridge IELTS Trainer (1 & 2)',
      series: 'IELTS Trainer Practice Tests',
      authorOrPublisher: 'Louise Hashemi, Barbara Thomas - Cambridge',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_6_0_TO_7_5,
      targetBandRange: '6.5 - 7.5',
      type: 'MOCK_TEST',
      description: '6 bài test hoàn chỉnh với 2 bài đầu tiên có giáo viên hướng dẫn từng bước (Step-by-step guidance).',
      keyFeatures: ['Độ khó tương đương hoặc nhỉnh hơn đề thi thật một chút'],
    },
    {
      id: 'adv-06',
      title: 'IELTS Practice Tests Plus (Series 1, 2, 3)',
      series: 'Longman Pearson IELTS Practice Tests Plus',
      authorOrPublisher: 'Vanessa Jakeman, Clare McDowell - Pearson',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_6_0_TO_7_5,
      targetBandRange: '6.5 - 7.5',
      type: 'MOCK_TEST',
      description: 'Bộ sách luyện đề có độ khó cao, giải thích đáp án chi tiết và chỉ rõ tại sao các đáp án khác bị sai.',
      keyFeatures: ['Bộ bẫy đề thi Reading và Listening cực kỳ tinh tế'],
    },
  ],

  // 5. Mức "7.5+" (7.5 - 9.0 - Trình độ Master)
  [BandLevel.BAND_7_5_PLUS]: [
    {
      id: 'mast-01',
      title: 'Mindset for IELTS Level 3',
      series: 'Mindset for IELTS',
      authorOrPublisher: 'Cambridge University Press',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_7_5_PLUS,
      targetBandRange: '7.5+',
      type: 'BOOK',
      description: 'Cấp độ cao nhất của dòng sách Mindset, đưa học viên tiếp cận bài thi với phong thái của người bản xứ.',
      keyFeatures: [
        'Văn bản nghiên cứu học thuật phức tạp từ Nature, The Economist',
        'Phát triển tư duy phản biện (Critical Thinking) đỉnh cao',
      ],
    },
    {
      id: 'mast-02',
      title: 'Mission IELTS 2 Academic',
      series: 'Mission IELTS',
      authorOrPublisher: 'Mary Spratt, Bob Obee - Express Publishing',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_7_5_PLUS,
      targetBandRange: '7.5 - 8.5',
      type: 'BOOK',
      description: 'Giáo trình luyện thi nâng cao dành cho thí sinh nhắm tới band 8.0-9.0 để giảng dạy hoặc nghiên cứu.',
      keyFeatures: ['Đòi hỏi vốn từ vựng C1/C2 rộng và khả năng viết luận học thuật'],
    },
    {
      id: 'mast-03',
      title: 'English Unlimited C1 (Advanced)',
      series: 'English Unlimited',
      authorOrPublisher: 'Adrian Doff, Ben Goldstein - Cambridge',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_7_5_PLUS,
      targetBandRange: '7.5 - 8.5',
      type: 'BOOK',
      description: 'Phát triển sự tinh tế trong ngôn ngữ (Nuance), thành ngữ tự nhiên (Idiomatic expressions) và phong thái bản xứ.',
      keyFeatures: ['Tranh luận các chủ đề xã hội, kinh tế vĩ mô và đạo đức'],
    },
    {
      id: 'mast-04',
      title: 'Objective IELTS Advanced',
      series: 'Objective Series',
      authorOrPublisher: 'Michael Black, Annette Capel - Cambridge',
      targetSkill: 'ALL',
      tierLevel: BandLevel.BAND_7_5_PLUS,
      targetBandRange: '7.5 - 8.5',
      type: 'BOOK',
      description: 'Khóa học IELTS chuyên sâu nhất của Cambridge, phân tích tường tận ngữ liệu Cambridge Learner Corpus.',
      keyFeatures: ['Loại bỏ 100% lỗi dùng từ gượng gạo và collocations thiếu tự nhiên'],
    },
  ],
};

/**
 * Thuật toán tự động phân bổ kho học liệu và bài tập theo Band điểm học viên
 */
export function getRecommendedMaterialsByBand(
  bandScore: number,
  preferredSkill?: SkillType
): {
  tier: BandLevel;
  materials: StudyMaterialItem[];
  primaryRoadmapBook: StudyMaterialItem;
  practiceTestBook: StudyMaterialItem | undefined;
} {
  // 1. Xác định cấp độ phân tầng từ Band Score
  let tier: BandLevel;
  if (bandScore <= 3.0) {
    tier = BandLevel.ZERO_FOUNDATION;
  } else if (bandScore < 4.5) {
    tier = BandLevel.BELOW_4_5;
  } else if (bandScore <= 6.0) {
    tier = BandLevel.BAND_4_5_TO_6_0;
  } else if (bandScore < 7.5) {
    tier = BandLevel.BAND_6_0_TO_7_5;
  } else {
    tier = BandLevel.BAND_7_5_PLUS;
  }

  const allInTier = IELTS_STUDY_MATERIALS[tier] || [];

  // Lọc theo kỹ năng nếu người dùng chọn kỹ năng cụ thể
  const filtered = preferredSkill
    ? allInTier.filter((m) => m.targetSkill === 'ALL' || m.targetSkill === preferredSkill)
    : allInTier;

  const primaryRoadmapBook = filtered[0] || allInTier[0];
  const practiceTestBook = allInTier.find((m) => m.type === 'MOCK_TEST') || allInTier[allInTier.length - 1];

  return {
    tier,
    materials: filtered,
    primaryRoadmapBook,
    practiceTestBook,
  };
}
