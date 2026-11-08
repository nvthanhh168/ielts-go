/**
 * IELTS GO! - Vocabulary Matrix Service & Database
 * Ma Trận Từ Vựng 20 Chủ Đề x 5 Cấp Độ Band Điểm Chuẩn Cambridge
 */

// 1. SIÊU DỮ LIỆU 20 CHỦ ĐỀ CHUẨN IELTS KÈM VECTOR SVG BIỂU TRƯNG
const IELTS_20_TOPICS_DETAILED = [
  {
    id: 'animals',
    nameEn: 'Animals & Wildlife',
    nameVi: 'Động vật & Thế giới hoang dã',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#34D399',
    icon: '🐾',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 6a3 3 0 0 1 3-3 3 3 0 0 1 3 3c0 2-2 3-2 3H10s-2-1-2-3a3 3 0 0 1 3-3Z"/><circle cx="5" cy="11" r="2"/><circle cx="19" cy="11" r="2"/><path d="M12 12c-4 0-7 2.5-7 6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3c0-3.5-3-6-7-6Z"/></svg>`,
    description: 'Từ vựng hệ sinh thái, đa dạng sinh học, bảo tồn động vật quý hiếm và bẫy săn trộm.'
  },
  {
    id: 'art',
    nameEn: 'Art & Aesthetics',
    nameVi: 'Nghệ thuật & Hội họa',
    color: '#DB2777',
    bgColor: '#FDF2F8',
    borderColor: '#F472B6',
    icon: '🎨',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2Z"/></svg>`,
    description: 'Trường phái mỹ thuật, cảm thụ thẩm mỹ, di sản văn hóa và các triển lãm thị giác.'
  },
  {
    id: 'celebrations',
    nameEn: 'Celebrations & Festivals',
    nameVi: 'Lễ kỷ niệm & Lễ hội',
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FBBF24',
    icon: '🎉',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 11 7 7-6 2 2-6L4 11Z"/><path d="M14 4c.5 2.5 2 4 4.5 4.5"/><path d="m11 2 2 2"/><path d="m20 11 2 2"/><path d="m18 2 1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4Z"/></svg>`,
    description: 'Lễ hội truyền thống, các dịp kỷ niệm trọng đại, phong tục đón năm mới và tiệc mừng.'
  },
  {
    id: 'clothes',
    nameEn: 'Clothes & Fashion',
    nameVi: 'Trang phục & Thời trang',
    color: '#7C3AED',
    bgColor: '#FAF5FF',
    borderColor: '#C084FC',
    icon: '👗',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z"/></svg>`,
    description: 'Phong cách ăn mặc, thời trang nhanh, quy chuẩn trang phục và ngành công nghiệp dệt may.'
  },
  {
    id: 'environment',
    nameEn: 'Environment & Climate',
    nameVi: 'Môi trường & Biến đổi khí hậu',
    color: '#15803D',
    bgColor: '#F0FDF4',
    borderColor: '#4ADE80',
    icon: '🌍',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><path d="M4 8c4 1 7 4 8 8"/></svg>`,
    description: 'Hiệu ứng nhà kính, dấu chân carbon, năng lượng tái tạo và khủng hoảng sinh thái.'
  },
  {
    id: 'famous_people',
    nameEn: 'Famous People & Figures',
    nameVi: 'Người nổi tiếng & Hình mẫu',
    color: '#B45309',
    bgColor: '#FEF3C7',
    borderColor: '#F59E0B',
    icon: '🌟',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    description: 'Hình mẫu truyền cảm hứng, trách nhiệm đạo đức trước công chúng và sự soi mói truyền thông.'
  },
  {
    id: 'food',
    nameEn: 'Food & Nutrition',
    nameVi: 'Ẩm thực & Dinh dưỡng',
    color: '#C2410C',
    bgColor: '#FFF7ED',
    borderColor: '#FB923C',
    icon: '🍲',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`,
    description: 'Chế độ ăn cân đối, di sản ẩm thực truyền thống, thực phẩm hữu cơ và an ninh lương thực.'
  },
  {
    id: 'friends',
    nameEn: 'Friends & Relationships',
    nameVi: 'Bạn bè & Mối quan hệ',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#60A5FA',
    icon: '🤝',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    description: 'Tình bạn tri kỷ, niềm tin tương hỗ, sự thấu cảm và chỗ dựa tinh thần qua năm tháng.'
  },
  {
    id: 'holidays',
    nameEn: 'Holidays & Tourism',
    nameVi: 'Kỳ nghỉ & Du lịch',
    color: '#0891B2',
    bgColor: '#ECFEFF',
    borderColor: '#22D3EE',
    icon: '🏖️',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/><path d="M10 12v.01"/><path d="M10 8h4"/></svg>`,
    description: 'Du lịch bền vững, khám phá văn hóa bản địa, kỳ nghỉ xả hơi và hành trình xa xôi.'
  },
  {
    id: 'music',
    nameEn: 'Music & Melodic Arts',
    nameVi: 'Âm nhạc & Nghệ thuật biểu diễn',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#818CF8',
    icon: '🎵',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    description: 'Giai điệu bắt tai, bản giao hưởng cổ điển, nhịp điệu gợi cảm và tài năng biểu diễn.'
  },
  {
    id: 'nation_culture',
    nameEn: 'Nation & Culture',
    nameVi: 'Quốc gia & Bản sắc văn hóa',
    color: '#92400E',
    bgColor: '#FEF3C7',
    borderColor: '#F59E0B',
    icon: '🏛️',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="2" y2="2"/><line x1="2" x2="22" y1="22" y2="22"/><polygon points="12 4 4 8 20 8 12 4"/><line x1="6" x2="6" y1="8" y2="18"/><line x1="10" x2="10" y1="8" y2="18"/><line x1="14" x2="14" y1="8" y2="18"/><line x1="18" x2="18" y1="8" y2="18"/></svg>`,
    description: 'Bản sắc dân tộc, giữ gìn phong tục ngàn đời, sự đồng hóa và hội nhập toàn cầu.'
  },
  {
    id: 'routines',
    nameEn: 'Routines & Daily Life',
    nameVi: 'Thói quen hằng ngày',
    color: '#475569',
    bgColor: '#F8FAFC',
    borderColor: '#94A3B8',
    icon: '⏰',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    description: 'Thời gian biểu, cân bằng công việc - cuộc sống, nhịp sinh học và nề nếp kỷ luật.'
  },
  {
    id: 'science',
    nameEn: 'Science & Research',
    nameVi: 'Khoa học & Nghiên cứu',
    color: '#1D4ED8',
    bgColor: '#EFF6FF',
    borderColor: '#3B82F6',
    icon: '🔬',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h12"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0-4 0"/><path d="M9 14h6"/><path d="M9 12a3 3 0 0 1 6 0"/><path d="M12 2v4"/><circle cx="12" cy="2" r="1"/></svg>`,
    description: 'Bằng chứng thực nghiệm, đột phá di truyền, giải mã bí ẩn vũ trụ và đạo đức khoa học.'
  },
  {
    id: 'shopping',
    nameEn: 'Shopping & Consumerism',
    nameVi: 'Mua sắm & Tiêu dùng',
    color: '#BE185D',
    bgColor: '#FDF2F8',
    borderColor: '#F472B6',
    icon: '🛍️',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    description: 'Thói quen mua sắm theo cảm tính, chủ nghĩa tiêu dùng, lòng trung thành với thương hiệu.'
  },
  {
    id: 'social_media',
    nameEn: 'Social Media & Networks',
    nameVi: 'Mạng xã hội & Truyền thông số',
    color: '#4338CA',
    bgColor: '#EEF2FF',
    borderColor: '#6366F1',
    icon: '📱',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
    description: 'Thuật toán mạng xã hội, phòng tiếng vọng (echo chambers), tương tác ảo và định danh số.'
  },
  {
    id: 'sport',
    nameEn: 'Sport & Physical Fitness',
    nameVi: 'Thể thao & Rèn luyện thể chất',
    color: '#16A34A',
    bgColor: '#F0FDF4',
    borderColor: '#22C55E',
    icon: '⚽',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>`,
    description: 'Sức bền thể lực, tinh thần thể thao công bằng, phòng tránh bệnh tim mạch và vận động.'
  },
  {
    id: 'technology',
    nameEn: 'Technology & Innovation',
    nameVi: 'Công nghệ & Đổi mới sáng tạo',
    color: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#38BDF8',
    icon: '💻',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    description: 'Trí tuệ nhân tạo, công nghệ đột phá, chuyển đổi số và tự động hóa quy trình sản xuất.'
  },
  {
    id: 'transport',
    nameEn: 'Transport & Urban Mobility',
    nameVi: 'Giao thông & Di chuyển đô thị',
    color: '#0E7490',
    bgColor: '#ECFEFF',
    borderColor: '#06B6D4',
    icon: '🚆',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>`,
    description: 'Ùn tắc giao thông, phương tiện công cộng thân thiện môi trường và quy hoạch đô thị.'
  },
  {
    id: 'weather',
    nameEn: 'Weather & Climate',
    nameVi: 'Thời tiết & Khí hậu cực đoan',
    color: '#0369A1',
    bgColor: '#F0F9FF',
    borderColor: '#0EA5E9',
    icon: '⛅',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M12 3v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/></svg>`,
    description: 'Hiện tượng thời tiết dị thường, nắng nóng kỷ lục, mưa bão lũ lụt và dự báo khí quyển.'
  },
  {
    id: 'study',
    nameEn: 'Study & Higher Education',
    nameVi: 'Học tập & Giáo dục đại học',
    color: '#6D28D9',
    bgColor: '#FAF5FF',
    borderColor: '#8B5CF6',
    icon: '📚',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
    description: 'Chương trình giảng dạy học thuật, nghiên cứu liên ngành, phương pháp sư phạm và đại học.'
  },
  {
    id: 'academic_task1',
    nameEn: 'Writing Task 1 (Trends & Data)',
    nameVi: 'Writing Task 1 (Xu hướng & Số liệu)',
    color: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#38BDF8',
    icon: '📈',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    description: 'Từ vựng miêu tả biểu đồ xu hướng (tăng/giảm/dao động), mức độ biến động, quy trình và bản đồ.'
  },
  {
    id: 'connectors',
    nameEn: 'Signpost Words & Connectors',
    nameVi: 'Từ nối Coherence & Cohesion',
    color: '#4338CA',
    bgColor: '#EEF2FF',
    borderColor: '#818CF8',
    icon: '🔗',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    description: 'Liên từ học thuật, từ nối chuyển đoạn, cấu trúc lập luận tương phản, nguyên nhân và kết luận ăn điểm Coherence.'
  }
];

// 2. SIÊU DỮ LIỆU 5 CẤP ĐỘ BAND ĐIỂM
const IELTS_5_BAND_TIERS_METADATA = [
  {
    tierKey: 'Mất gốc',
    bandLabel: 'Band 0 - 3.5',
    cefr: 'A1 - A2',
    nameVi: 'Mất Gốc Nền Tảng',
    nameEn: 'Foundation Level',
    icon: '🌱',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#F87171',
    gateQuota: 300,
    cumulative: 300,
    summary: '300 từ vựng cốt lõi sinh hoạt, nền tảng bắt buộc để thoát khỏi mức mất gốc.'
  },
  {
    tierKey: '< 4.5',
    bandLabel: 'Band < 4.5',
    cefr: 'A2 - B1',
    nameVi: 'Sơ Cấp Đột Phá',
    nameEn: 'Pre-Intermediate Level',
    icon: '🥉',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    borderColor: '#FB923C',
    gateQuota: 500,
    cumulative: 800,
    summary: 'Thuộc thêm 500 từ vựng mở rộng 20 chủ đề để làm quen cấu trúc đề thi IELTS.'
  },
  {
    tierKey: '4.5 - 6.0',
    bandLabel: 'Band 4.5 - 6.0',
    cefr: 'B1 - B2',
    nameVi: 'Trung Cấp Tiêu Chuẩn',
    nameEn: 'Intermediate Academic',
    icon: '🥈',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#60A5FA',
    gateQuota: 700,
    cumulative: 1500,
    summary: 'Thuộc thêm 700 từ vựng học thuật AWL phục vụ biểu đồ Task 1 & nghị luận Task 2.'
  },
  {
    tierKey: '6.0 - 7.5',
    bandLabel: 'Band 6.0 - 7.5',
    cefr: 'B2 - C1',
    nameVi: 'Nâng Cao Du Học',
    nameEn: 'Upper-Intermediate / Scholar',
    icon: '🥇',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#34D399',
    gateQuota: 600,
    cumulative: 2100,
    summary: 'Thuộc thêm 600 Collocations & Idioms C1, ngưỡng chuẩn tuyển sinh đại học quốc tế.'
  },
  {
    tierKey: '7.5+',
    bandLabel: 'Band 7.5 - 9.0',
    cefr: 'C1 - C2',
    nameVi: 'Chuyên Gia Xuất Sắc',
    nameEn: 'Advanced / Expert Master',
    icon: '👑',
    color: '#7C3AED',
    bgColor: '#FAF5FF',
    borderColor: '#A78BFA',
    gateQuota: 400,
    cumulative: 2500,
    summary: 'Thuộc thêm 400 từ vựng tinh hoa C1/C2 (Less Common Lexis) tiệm cận người bản xứ.'
  }
];

// 3. KHO DỮ LIỆU MA TRẬN 20 CHỦ ĐỀ x 5 CẤP ĐỘ BAND ĐIỂM
const IELTS_VOCABULARY_MATRIX_DATABASE = [
  // ==================== 20. STUDY & HIGHER EDUCATION ====================
  // Tier 1: Mất gốc
  {
    id: 'std-01',
    topicId: 'study',
    bandTier: 'Mất gốc',
    cefr: 'A1',
    word: 'school subjects',
    partOfSpeech: 'collocation',
    ipaUk: '/skuːl ˈsʌb.dʒekts/',
    ipaUs: '/skuːl ˈsʌb.dʒekts/',
    stress: 'Âm 1: SCHOOL SUB-jects',
    definitionVi: 'Các môn học ở trường',
    definitionEn: 'The various academic courses taught in school such as math, history and English.',
    synonyms: ['academic disciplines', 'courses', 'school curriculum'],
    collocations: ['favorite school subjects', 'study school subjects', 'compulsory school subjects'],
    exampleEn: 'My favorite school subjects in secondary school were history and geography.',
    exampleVi: 'Các môn học ở trường yêu thích của tôi thời trung học là lịch sử và địa lý.'
  },
  {
    id: 'std-02',
    topicId: 'study',
    bandTier: 'Mất gốc',
    cefr: 'A1',
    word: 'timetable',
    partOfSpeech: 'noun',
    ipaUk: '/ˈtaɪmˌteɪ.bəl/',
    ipaUs: '/ˈtaɪmˌteɪ.bəl/',
    stress: 'Âm 1: TIME-ta-ble',
    definitionVi: 'Thời khóa biểu, lịch học',
    definitionEn: 'A detailed plan showing the times at which subjects or classes take place.',
    synonyms: ['class schedule', 'study agenda', 'curriculum schedule'],
    collocations: ['follow a timetable', 'strict timetable', 'weekly timetable'],
    exampleEn: 'Students receive a new timetable at the beginning of each semester.',
    exampleVi: 'Học sinh nhận một thời khóa biểu mới vào đầu mỗi học kỳ.'
  },
  {
    id: 'std-03',
    topicId: 'study',
    bandTier: 'Mất gốc',
    cefr: 'A2',
    word: 'take an exam',
    partOfSpeech: 'collocation',
    ipaUk: '/teɪk ən ɪɡˈzæm/',
    ipaUs: '/teɪk ən ɪɡˈzæm/',
    stress: 'Trọng âm từ chính: take an ex-AM',
    definitionVi: 'Làm bài kiểm tra, đi thi',
    definitionEn: 'To complete a formal test that assesses one’s knowledge or proficiency in a subject.',
    synonyms: ['sit an examination', 'complete a test', 'be assessed'],
    collocations: ['take a final exam', 'prepare to take an exam', 'nervous before taking an exam'],
    exampleEn: 'All final-year students must take an exam before graduating.',
    exampleVi: 'Tất cả sinh viên năm cuối phải làm bài thi trước khi tốt nghiệp.'
  },
  {
    id: 'std-04',
    topicId: 'study',
    bandTier: 'Mất gốc',
    cefr: 'A2',
    word: 'homework assignment',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈhəʊm.wɜːk əˈsaɪn.mənt/',
    ipaUs: '/ˈhoʊm.wɝːk əˈsaɪn.mənt/',
    stress: 'HOME-work as-SIGN-ment',
    definitionVi: 'Bài tập về nhà được giao',
    definitionEn: 'School work that a teacher gives to students to do at home outside lesson hours.',
    synonyms: ['home study task', 'take-home project', 'school assignment'],
    collocations: ['hand in homework', 'complete homework assignment', 'difficult homework'],
    exampleEn: 'She spent three hours finishing her English homework assignment.',
    exampleVi: 'Cô ấy đã dành 3 tiếng đồng hồ để hoàn thành bài tập về nhà môn tiếng Anh.'
  },

  // Tier 2: Sơ cấp (< 4.5)
  {
    id: 'std-05',
    topicId: 'study',
    bandTier: '< 4.5',
    cefr: 'A2',
    word: 'high school student',
    partOfSpeech: 'collocation',
    ipaUk: '/haɪ skuːl ˈstjuː.dənt/',
    ipaUs: '/haɪ skuːl ˈstuː.dənt/',
    stress: 'HIGH school STU-dent',
    definitionVi: 'Học sinh trung học phổ thông',
    definitionEn: 'A teenager who attends an upper secondary school typically between ages 15 and 18.',
    synonyms: ['secondary pupil', 'adolescent learner', 'upper-secondary scholar'],
    collocations: ['senior high school student', 'prepare high school students', 'guidance for high school students'],
    exampleEn: 'As a high school student, he balanced academic revision with football training.',
    exampleVi: 'Khi là một học sinh cấp 3, cậu ấy vừa ôn bài vừa tham gia tập luyện bóng đá.'
  },
  {
    id: 'std-06',
    topicId: 'study',
    bandTier: '< 4.5',
    cefr: 'B1',
    word: 'revision notes',
    partOfSpeech: 'collocation',
    ipaUk: '/rɪˈvɪʒ.ən nəʊts/',
    ipaUs: '/rɪˈvɪʒ.ən noʊts/',
    stress: 're-VI-sion NOTES',
    definitionVi: 'Tài liệu, ghi chú ôn tập trước kỳ thi',
    definitionEn: 'Written summaries created by a student to review key concepts before an assessment.',
    synonyms: ['study notes', 'summary sheets', 'cheat sheets'],
    collocations: ['compile revision notes', 'read through revision notes', 'colorful revision notes'],
    exampleEn: 'Making concise revision notes helps students retain grammar rules much faster.',
    exampleVi: 'Việc làm ghi chú ôn tập ngắn gọn giúp học sinh nhớ các quy tắc ngữ pháp nhanh hơn nhiều.'
  },
  {
    id: 'std-07',
    topicId: 'study',
    bandTier: '< 4.5',
    cefr: 'B1',
    word: 'pass with flying colours',
    partOfSpeech: 'idiom',
    ipaUk: '/pɑːs wɪð ˈflaɪ.ɪŋ ˈkʌl.əz/',
    ipaUs: '/pæs wɪð ˈflaɪ.ɪŋ ˈkʌl.ɚz/',
    stress: 'PASS with FLY-ing COL-ours',
    definitionVi: 'Vượt qua kỳ thi với kết quả xuất sắc',
    definitionEn: 'To successfully pass an exam or challenge with a very high grade or score.',
    synonyms: ['excel in exams', 'pass triumphantly', 'achieve top marks'],
    collocations: ['pass the test with flying colours', 'expect to pass with flying colours'],
    exampleEn: 'After months of diligent practice, Lan passed her IELTS exam with flying colours.',
    exampleVi: 'Sau nhiều tháng chăm chỉ luyện tập, Lan đã vượt qua kỳ thi IELTS với kết quả xuất sắc.'
  },

  // Tier 3: Trung cấp (4.5 - 6.0)
  {
    id: 'std-08',
    topicId: 'study',
    bandTier: '4.5 - 6.0',
    cefr: 'B1',
    word: 'core subjects',
    partOfSpeech: 'collocation',
    ipaUk: '/kɔːr ˈsʌb.dʒekts/',
    ipaUs: '/kɔːr ˈsʌb.dʒekts/',
    stress: 'CORE SUB-jects',
    definitionVi: 'Các môn học bắt buộc cốt lõi',
    definitionEn: 'Mandatory academic courses that all students are required to complete.',
    synonyms: ['compulsory subjects', 'mandatory curriculum', 'foundational courses'],
    collocations: ['focus on core subjects', 'master core subjects', 'curriculum core subjects'],
    exampleEn: 'Mathematics, literature and a foreign language are considered core subjects in most national curricula.',
    exampleVi: 'Toán học, ngữ văn và ngoại ngữ được coi là các môn học cốt lõi trong hầu hết chương trình quốc gia.'
  },
  {
    id: 'std-09',
    topicId: 'study',
    bandTier: '4.5 - 6.0',
    cefr: 'B2',
    word: 'elective courses',
    partOfSpeech: 'collocation',
    ipaUk: '/iˈlek.tɪv kɔː.sɪz/',
    ipaUs: '/iˈlek.tɪv kɔːr.sɪz/',
    stress: 'e-LEC-tive COUR-ses',
    definitionVi: 'Các môn học tự chọn',
    definitionEn: 'Optional courses chosen by students according to their personal interests or career paths.',
    synonyms: ['optional modules', 'specialized electives', 'selective courses'],
    collocations: ['choose elective courses', 'offer a range of elective courses', 'popular elective courses'],
    exampleEn: 'Undergraduate degrees often permit students to select two elective courses per term.',
    exampleVi: 'Bậc đại học thường cho phép sinh viên lựa chọn hai môn học tự chọn mỗi kỳ.'
  },
  {
    id: 'std-10',
    topicId: 'study',
    bandTier: '4.5 - 6.0',
    cefr: 'B2',
    word: 'enrolled in',
    partOfSpeech: 'phrasal verb',
    ipaUk: '/ɪnˈrəʊld ɪn/',
    ipaUs: '/ɪnˈroʊld ɪn/',
    stress: 'en-ROLLED in',
    definitionVi: 'Ghi danh, theo học tại một khóa học/trường',
    definitionEn: 'To officially register as a participant in a course, program, or institution.',
    synonyms: ['matriculated at', 'registered for', 'admitted to'],
    collocations: ['enrolled in a university', 'enrolled in an online master program', 'newly enrolled in'],
    exampleEn: 'Over ten thousand overseas scholars are currently enrolled in Australian educational facilities.',
    exampleVi: 'Hơn mười nghìn học giả quốc tế hiện đang theo học tại các cơ sở giáo dục ở Úc.'
  },
  {
    id: 'std-11',
    topicId: 'study',
    bandTier: '4.5 - 6.0',
    cefr: 'B2',
    word: 'extracurricular activities',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌek.strə.kəˈrɪk.jə.lər ækˈtɪv.ə.tiz/',
    ipaUs: '/ˌek.strə.kəˈrɪk.jə.lɚ ækˈtɪv.ə.t̬iz/',
    stress: 'ex-tra-cur-RIC-u-lar ac-TIV-i-ties',
    definitionVi: 'Các hoạt động ngoại khóa ngoài giờ lên lớp',
    definitionEn: 'Non-academic activities pursued by students, such as sports, arts, or volunteer clubs.',
    synonyms: ['after-school clubs', 'co-curricular initiatives', 'leisure pursuits'],
    collocations: ['participate in extracurricular activities', 'engage in extracurricular activities', 'balance academics and extracurricular activities'],
    exampleEn: 'Participation in extracurricular activities cultivates essential soft skills and leadership qualities.',
    exampleVi: 'Việc tham gia vào các hoạt động ngoại khóa giúp trau dồi các kỹ năng mềm và tố chất lãnh đạo thiết yếu.'
  },

  // Tier 4: Nâng cao (6.0 - 7.5)
  {
    id: 'std-12',
    topicId: 'study',
    bandTier: '6.0 - 7.5',
    cefr: 'C1',
    word: 'tertiary education',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈtɜː.ʃər.i ˌedʒ.ʊˈkeɪ.ʃən/',
    ipaUs: '/ˈtɝː.ʃi.er.i ˌedʒ.əˈkeɪ.ʃən/',
    stress: 'TER-ti-a-ry ed-u-CA-tion',
    definitionVi: 'Bậc giáo dục đại học và sau đại học',
    definitionEn: 'Post-secondary education provided by universities, colleges, and polytechnic institutes.',
    synonyms: ['higher education', 'university-level schooling', 'post-secondary academia'],
    collocations: ['pursue tertiary education', 'access to tertiary education', 'subsidize tertiary education'],
    exampleEn: 'Government subsidies ensure that underprivileged youths have equitable access to tertiary education.',
    exampleVi: 'Các khoản trợ cấp của chính phủ đảm bảo thanh niên có hoàn cảnh khó khăn được tiếp cận bình đẳng với giáo dục đại học.'
  },
  {
    id: 'std-13',
    topicId: 'study',
    bandTier: '6.0 - 7.5',
    cefr: 'C1',
    word: 'comprehensive curriculum',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌkɒm.prɪˈhen.sɪv kəˈrɪk.jə.ləm/',
    ipaUs: '/ˌkɑːm.prəˈhen.sɪv kəˈrɪk.jə.ləm/',
    stress: 'com-pre-HEN-sive cur-RIC-u-lum',
    definitionVi: 'Khung chương trình đào tạo toàn diện',
    definitionEn: 'An academic program of study that thoroughly covers a broad array of disciplines.',
    synonyms: ['all-encompassing syllabus', 'well-rounded course of study', 'holistic academic framework'],
    collocations: ['deliver a comprehensive curriculum', 'design a comprehensive curriculum', 'implement a comprehensive curriculum'],
    exampleEn: 'The university redesigned its comprehensive curriculum to incorporate practical digital competencies.',
    exampleVi: 'Trường đại học đã thiết kế lại khung chương trình toàn diện để lồng ghép các năng lực số thực hành.'
  },
  {
    id: 'std-14',
    topicId: 'study',
    bandTier: '6.0 - 7.5',
    cefr: 'C1',
    word: 'intellectual curiosity',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌɪn.təlˈek.tʃu.əl ˌkjʊə.riˈɒs.ə.ti/',
    ipaUs: '/ˌɪn.t̬əlˈek.tʃu.əl ˌkjʊr.iˈɑː.sə.t̬i/',
    stress: 'in-tel-LEC-tu-al cu-ri-OS-i-ty',
    definitionVi: 'Tính ham học hỏi, óc tò mò tri thức sâu sắc',
    definitionEn: 'A deep intrinsic desire to invest effort in learning, understanding, and acquiring knowledge.',
    synonyms: ['thirst for knowledge', 'inquisitive mindset', 'academic drive'],
    collocations: ['foster intellectual curiosity', 'spark intellectual curiosity', 'driven by intellectual curiosity'],
    exampleEn: 'Passionate mentors strive to ignite intellectual curiosity rather than merely enforcing rote memorization.',
    exampleVi: 'Những người thầy tâm huyết luôn nỗ lực khơi dậy óc tò mò tri thức thay vì chỉ ép buộc học vẹt.'
  },
  {
    id: 'std-15',
    topicId: 'study',
    bandTier: '6.0 - 7.5',
    cefr: 'C1',
    word: 'holistic development',
    partOfSpeech: 'collocation',
    ipaUk: '/həʊˈlɪs.tɪk dɪˈvel.əp.mənt/',
    ipaUs: '/hoʊˈlɪs.tɪk dɪˈvel.əp.mənt/',
    stress: 'ho-LIS-tic de-VEL-op-ment',
    definitionVi: 'Sự phát triển toàn diện (văn - thể - mỹ - tư duy)',
    definitionEn: 'An educational philosophy emphasizing the complete growth of a student emotional, physical, and intellectual.',
    synonyms: ['well-rounded growth', 'all-inclusive personal development', 'harmonious development'],
    collocations: ['promote holistic development', 'crucial for holistic development', 'nurture holistic development'],
    exampleEn: 'Modern schools champion holistic development by balancing STEM rigor with performing arts.',
    exampleVi: 'Các trường học hiện đại đề cao sự phát triển toàn diện bằng cách cân bằng kiến thức STEM với nghệ thuật biểu diễn.'
  },

  // Tier 5: Chuyên gia (7.5+)
  {
    id: 'std-16',
    topicId: 'study',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'pedagogical methodology',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌped.əˈɡɒdʒ.ɪ.kəl ˌmeθ.əˈdɒl.ə.dʒi/',
    ipaUs: '/ˌped.əˈɡɑː.dʒɪ.kəl ˌmeθ.əˈdɑː.lə.dʒi/',
    stress: 'ped-a-GOG-i-cal meth-od-OL-o-gy',
    definitionVi: 'Phương pháp luận sư phạm giảng dạy',
    definitionEn: 'The theoretical principles and instructional methods employed in professional teaching.',
    synonyms: ['instructional doctrine', 'didactic paradigm', 'teaching epistemology'],
    collocations: ['reform pedagogical methodology', 'innovative pedagogical methodology', 'sound pedagogical methodology'],
    exampleEn: 'The reform advocated a learner-centric pedagogical methodology, shifting instructors from lecturing to facilitating.',
    exampleVi: 'Cuộc cải cách chủ trương áp dụng phương pháp luận sư phạm lấy người học làm trung tâm, chuyển giảng viên từ vị thế thuyết giảng sang điều phối.'
  },
  {
    id: 'std-17',
    topicId: 'study',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'cognitive assimilation',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈkɒɡ.nə.tɪv əˌsɪm.ɪˈleɪ.ʃən/',
    ipaUs: '/ˈkɑːɡ.nə.t̬ɪv əˌsɪm.əˈleɪ.ʃən/',
    stress: 'COG-ni-tive as-sim-i-LA-tion',
    definitionVi: 'Sự đồng hóa và tiếp thu tri thức sâu sắc trong não bộ',
    definitionEn: 'The psychological process whereby new conceptual information is integrated into existing cognitive frameworks.',
    synonyms: ['intellectual internalization', 'conceptual integration', 'deep knowledge absorption'],
    collocations: ['facilitate cognitive assimilation', 'impede cognitive assimilation', 'rapid cognitive assimilation'],
    exampleEn: 'Multimodal instructional tools significantly accelerate the cognitive assimilation of abstract theoretical constructs.',
    exampleVi: 'Các công cụ giảng dạy đa phương thức giúp đẩy nhanh đáng kể sự tiếp thu và đồng hóa các khái niệm lý thuyết trừu tượng.'
  },
  {
    id: 'std-18',
    topicId: 'study',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'interdisciplinary approach',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌɪn.təˈdɪs.ɪ.plɪ.nər.i əˈprəʊtʃ/',
    ipaUs: '/ˌɪn.t̬ɚˈdɪs.ə.plə.ner.i əˈproʊtʃ/',
    stress: 'in-ter-DIS-ci-pli-nar-y ap-PROACH',
    definitionVi: 'Cách tiếp cận liên ngành tích hợp',
    definitionEn: 'An academic perspective that blends concepts, methods, and insights from multiple distinct fields of study.',
    synonyms: ['cross-disciplinary perspective', 'multidisciplinary methodology', 'integrative paradigm'],
    collocations: ['adopt an interdisciplinary approach', 'require an interdisciplinary approach', 'pioneer an interdisciplinary approach'],
    exampleEn: 'Tackling climate migration necessitates an interdisciplinary approach coalescing environmental science, law, and economics.',
    exampleVi: 'Việc giải quyết nạn di cư do khí hậu đòi hỏi một cách tiếp cận liên ngành kết hợp khoa học môi trường, luật học và kinh tế học.'
  },
  {
    id: 'std-19',
    topicId: 'study',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'epistemological inquiry',
    partOfSpeech: 'collocation',
    ipaUk: '/ɪˌpɪs.tɪ.məˈlɒdʒ.ɪ.kəl ɪnˈkwaɪə.ri/',
    ipaUs: '/ɪˌpɪs.tə.məˈlɑː.dʒɪ.kəl ˈɪn.kwɚ.i/',
    stress: 'e-pis-te-mo-LOG-i-cal in-QUIR-y',
    definitionVi: 'Sự truy vấn nhận thức luận (Bản chất của tri thức)',
    definitionEn: 'The philosophical investigation concerning the origins, nature, methods, and limits of human knowledge.',
    synonyms: ['philosophical investigation', 'theoretical exploration', 'ontological critique'],
    collocations: ['rigorous epistemological inquiry', 'engage in epistemological inquiry', 'foundations of epistemological inquiry'],
    exampleEn: 'Doctoral dissertations should demonstrate rigorous epistemological inquiry alongside robust empirical evidence.',
    exampleVi: 'Luận án tiến sĩ cần thể hiện sự truy vấn nhận thức luận chuẩn xác cùng với các bằng chứng thực nghiệm vững chắc.'
  },

  {
  "id": "art-01-f",
  "topicId": "art",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "oil painting",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɔɪl ˈpeɪn.tɪŋ/",
  "ipaUs": "/ɔɪl ˈpeɪn.t̬ɪŋ/",
  "stress": "OIL paint-ing",
  "definitionVi": "Tranh sơn dầu nghệ thuật",
  "definitionEn": "A painting produced using pigments bound with medium of drying oil.",
  "synonyms": [
    "canvas artwork",
    "painted portrait",
    "fine art canvas"
  ],
  "collocations": [
    "admire an oil painting",
    "valuable oil painting",
    "exhibit oil paintings"
  ],
  "exampleEn": "The museum exhibits rare oil paintings dating back to the Renaissance.",
  "exampleVi": "Bảo tàng trưng bày những bức tranh sơn dầu quý hiếm từ thời kỳ Phục hưng."
},
  {
  "id": "art-02-f",
  "topicId": "art",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "art gallery",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɑːt ˈɡæl.ər.i/",
  "ipaUs": "/ɑːrt ˈɡæl.ɚ.i/",
  "stress": "ART gal-ler-y",
  "definitionVi": "Phòng tranh, triển lãm nghệ thuật",
  "definitionEn": "A room or building devoted to the exhibition of artistic works.",
  "synonyms": [
    "exhibition hall",
    "art museum",
    "creative showroom"
  ],
  "collocations": [
    "visit an art gallery",
    "modern art gallery",
    "art gallery curator"
  ],
  "exampleEn": "Tourists flocked to the local art gallery to view contemporary installations.",
  "exampleVi": "Du khách đổ xô tới phòng tranh địa phương để chiêm ngưỡng các tác phẩm nghệ thuật sắp đặt đương đại."
},
  {
  "id": "art-03-m",
  "topicId": "art",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "visual arts",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈvɪʒ.u.əl ɑːts/",
  "ipaUs": "/ˈvɪʒ.u.əl ɑːrts/",
  "stress": "VI-su-al ARTS",
  "definitionVi": "Nghệ thuật thị giác (Hội họa, điêu khắc, nhiếp ảnh)",
  "definitionEn": "Art forms appreciated primarily through sight, including ceramics, drawing, and photography.",
  "synonyms": [
    "fine arts",
    "graphic expressions",
    "plastic arts"
  ],
  "collocations": [
    "study visual arts",
    "appreciate visual arts",
    "visual arts discipline"
  ],
  "exampleEn": "Secondary schools should cultivate students appreciation for visual arts alongside sciences.",
  "exampleVi": "Các trường trung học nên bồi dưỡng cho học sinh niềm yêu thích nghệ thuật thị giác song hành cùng các môn khoa học."
},
  {
  "id": "art-04-u",
  "topicId": "art",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "aesthetic appreciation",
  "partOfSpeech": "collocation",
  "ipaUk": "/esˈθet.ɪk əˌpriː.ʃiˈeɪ.ʃən/",
  "ipaUs": "/esˈθet̬.ɪk əˌpriː.ʃiˈeɪ.ʃən/",
  "stress": "aes-THET-ic ap-pre-ci-A-tion",
  "definitionVi": "Sự cảm thụ và thấu hiểu cái đẹp thẩm mỹ",
  "definitionEn": "The cognitive and emotional capacity to perceive and savor artistic beauty.",
  "synonyms": [
    "artistic sensibility",
    "perception of beauty",
    "aesthetic discernment"
  ],
  "collocations": [
    "develop aesthetic appreciation",
    "foster aesthetic appreciation",
    "deep aesthetic appreciation"
  ],
  "exampleEn": "Viewing timeless sculptures enriches one’s capacity for aesthetic appreciation.",
  "exampleVi": "Chiêm ngưỡng những bức tượng điêu khắc vượt thời gian làm phong phú thêm năng lực cảm thụ thẩm mỹ của con người."
},
  {
  "id": "art-05-e",
  "topicId": "art",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "avant-garde movement",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌæv.ɑ̃ːˈɡɑːd ˈmuːv.mənt/",
  "ipaUs": "/ˌæv.ɑːntˈɡɑːrd ˈmuːv.mənt/",
  "stress": "a-vant-GARDE MOVE-ment",
  "definitionVi": "Trường phái nghệ thuật tiên phong, táo bạo phá cách",
  "definitionEn": "Radical and innovative concepts or artists ahead of their era, challenging conventional norms.",
  "synonyms": [
    "pioneering vanguard",
    "experimental trailblazers",
    "subversive artistic wave"
  ],
  "collocations": [
    "champion the avant-garde movement",
    "emerge from the avant-garde movement",
    "revolutionary avant-garde movement"
  ],
  "exampleEn": "The avant-garde movement subverted bourgeois conventions through audacious conceptual installations.",
  "exampleVi": "Trường phái nghệ thuật tiên phong đã lật đổ những quy ước tư sản thông qua các tác phẩm sắp đặt ý niệm đầy táo bạo."
},
  {
  "id": "cel-01-f",
  "topicId": "celebrations",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "birthday party",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈbɜːθ.deɪ ˌpɑː.ti/",
  "ipaUs": "/ˈbɝːθ.deɪ ˌpɑːr.t̬i/",
  "stress": "BIRTH-day par-ty",
  "definitionVi": "Bữa tiệc sinh nhật",
  "definitionEn": "A celebratory gathering organized to honor the anniversary of someone’s birth.",
  "synonyms": [
    "birthday celebration",
    "anniversary gathering"
  ],
  "collocations": [
    "throw a birthday party",
    "attend a birthday party",
    "host a birthday party"
  ],
  "exampleEn": "They threw a lively birthday party with cake and presents for their youngest daughter.",
  "exampleVi": "Họ đã tổ chức một bữa tiệc sinh nhật sôi động với bánh ngọt và quà cho con gái út."
},
  {
  "id": "cel-02-f",
  "topicId": "celebrations",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "fireworks display",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈfaɪə.wɜːks dɪˌspleɪ/",
  "ipaUs": "/ˈfaɪr.wɝːks dɪˌspleɪ/",
  "stress": "FIRE-works dis-PLAY",
  "definitionVi": "Màn trình diễn pháo hoa rực rỡ",
  "definitionEn": "A visual spectacle created by launching decorative explosive fireworks into the night sky.",
  "synonyms": [
    "pyrotechnic show",
    "pyrotechnics spectacle"
  ],
  "collocations": [
    "spectacular fireworks display",
    "watch the fireworks display",
    "New Year fireworks display"
  ],
  "exampleEn": "Thousands of spectators assembled by the riverbank to witness the spectacular fireworks display.",
  "exampleVi": "Hàng ngàn khán giả đã tập trung bên bờ sông để theo dõi màn trình diễn pháo hoa rực rỡ."
},
  {
  "id": "cel-03-m",
  "topicId": "celebrations",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "festive atmosphere",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈfes.tɪv ˈæt.məs.fɪər/",
  "ipaUs": "/ˈfes.tɪv ˈæt.məs.fɪr/",
  "stress": "FES-tive AT-mos-phere",
  "definitionVi": "Bầu không khí lễ hội rộn ràng, vui tươi",
  "definitionEn": "A joyful and enthusiastic mood prevailing among people during holiday festivities.",
  "synonyms": [
    "jubilant ambiance",
    "rejoicing mood",
    "carnival spirit"
  ],
  "collocations": [
    "soak in the festive atmosphere",
    "permeate festive atmosphere",
    "vibrant festive atmosphere"
  ],
  "exampleEn": "Colorful lantern decorations filled the historical quarter with an enchanting festive atmosphere.",
  "exampleVi": "Đèn lồng nhiều màu sắc trang hoàng khu phố cổ ngập tràn bầu không khí lễ hội mê hoặc."
},
  {
  "id": "cel-04-u",
  "topicId": "celebrations",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "commemorative ritual",
  "partOfSpeech": "collocation",
  "ipaUk": "/kəˈmem.ər.ə.tɪv ˈrɪtʃ.u.əl/",
  "ipaUs": "/kəˈmem.ɚ.ə.t̬ɪv ˈrɪtʃ.u.əl/",
  "stress": "com-MEM-o-ra-tive RIT-u-al",
  "definitionVi": "Nghi thức tưởng niệm trang trọng",
  "definitionEn": "A solemn formal observance executed to honor historical heroes or pivotal past events.",
  "synonyms": [
    "memorial ceremony",
    "solemn rite",
    "tribute observance"
  ],
  "collocations": [
    "participate in commemorative rituals",
    "annual commemorative ritual",
    "perform commemorative rituals"
  ],
  "exampleEn": "Citizens observe a moment of silence during the national commemorative ritual on Remembrance Day.",
  "exampleVi": "Người dân dành một phút mặc niệm trong nghi thức tưởng niệm quốc gia vào Ngày Tưởng niệm."
},
  {
  "id": "cel-05-e",
  "topicId": "celebrations",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "cultural tapestry",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈkʌl.tʃər.əl ˈtæp.ɪ.stri/",
  "ipaUs": "/ˈkʌl.tʃɚ.əl ˈtæp.ə.stri/",
  "stress": "CUL-tur-al TAP-es-try",
  "definitionVi": "Bức tranh phong phú dệt nên từ muôn màu văn hóa lễ hội",
  "definitionEn": "An intricate and rich amalgamation of traditions, folkways, and celebratory practices.",
  "synonyms": [
    "rich heritage mosaic",
    "variegated cultural fabric",
    "pluralistic folkloric continuum"
  ],
  "collocations": [
    "woven into the cultural tapestry",
    "vibrant cultural tapestry",
    "preserve the cultural tapestry"
  ],
  "exampleEn": "Centuries of indigenous and immigrant holidays have coalesced into a dazzling cultural tapestry.",
  "exampleVi": "Hàng thế kỷ lễ hội của người bản địa và người nhập cư đã kết tinh thành một bức tranh văn hóa rực rỡ muôn màu."
},
  {
  "id": "clo-01-f",
  "topicId": "clothes",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "warm jacket",
  "partOfSpeech": "collocation",
  "ipaUk": "/wɔːm ˈdʒæk.ɪt/",
  "ipaUs": "/wɔːrm ˈdʒæk.ɪt/",
  "stress": "WARM JACK-et",
  "definitionVi": "Áo khoác giữ ấm mùa lạnh",
  "definitionEn": "A waist- or hip-length outer garment worn to retain body heat in cold weather.",
  "synonyms": [
    "winter coat",
    "insulated outerwear"
  ],
  "collocations": [
    "zip up a warm jacket",
    "wear a warm jacket",
    "thick warm jacket"
  ],
  "exampleEn": "Remember to wear a warm jacket before venturing into the chilly mountain wind.",
  "exampleVi": "Nhớ mặc một chiếc áo khoác ấm trước khi bước ra ngoài gió lạnh vùng núi."
},
  {
  "id": "clo-02-f",
  "topicId": "clothes",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "casual wear",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈkæʒ.u.əl weər/",
  "ipaUs": "/ˈkæʒ.u.əl wer/",
  "stress": "CAS-u-al WEAR",
  "definitionVi": "Trang phục thường ngày, giản dị",
  "definitionEn": "Comfortable clothing designed for everyday informal occasions rather than black-tie events.",
  "synonyms": [
    "informal attire",
    "leisure garments",
    "everyday clothing"
  ],
  "collocations": [
    "dress in casual wear",
    "smart casual wear",
    "preference for casual wear"
  ],
  "exampleEn": "Tech startups frequently encourage casual wear such as jeans and T-shirts in the workplace.",
  "exampleVi": "Các công ty khởi nghiệp công nghệ thường khuyến khích mặc trang phục thường ngày như quần jean và áo phông tại nơi làm việc."
},
  {
  "id": "clo-03-m",
  "topicId": "clothes",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "dress code",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈdres ˌkəʊd/",
  "ipaUs": "/ˈdres ˌkoʊd/",
  "stress": "DRESS code",
  "definitionVi": "Quy chuẩn trang phục bắt buộc",
  "definitionEn": "A set of formal rules dictating which apparel is permissible in an institution or venue.",
  "synonyms": [
    "attire protocol",
    "wardrobe regulation",
    "sartorial guideline"
  ],
  "collocations": [
    "strictly enforce dress code",
    "formal dress code",
    "comply with dress code"
  ],
  "exampleEn": "Law firms maintain a conservative dress code requiring tailored suits and understated accessories.",
  "exampleVi": "Các công ty luật duy trì quy chuẩn trang phục bảo thủ yêu cầu âu phục may đo và phụ kiện trang nhã."
},
  {
  "id": "clo-04-u",
  "topicId": "clothes",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "sartorial elegance",
  "partOfSpeech": "collocation",
  "ipaUk": "/sɑːˈtɔː.ri.əl ˈel.ɪ.ɡəns/",
  "ipaUs": "/sɑːrˈtɔːr.i.əl ˈel.ə.ɡəns/",
  "stress": "sar-TO-ri-al EL-e-gance",
  "definitionVi": "Vẻ thanh lịch chỉn chu trong phục trang",
  "definitionEn": "Refined taste and impeccable style manifested in tailored clothing and grooming.",
  "synonyms": [
    "impeccable tailoring",
    "aesthetic sophistication",
    "sartorial refinement"
  ],
  "collocations": [
    "exude sartorial elegance",
    "epitome of sartorial elegance",
    "master sartorial elegance"
  ],
  "exampleEn": "The diplomat exuded sartorial elegance in bespoke wool suits paired with silk neckwear.",
  "exampleVi": "Vị nhà ngoại giao toát lên vẻ thanh lịch chỉn chu trong bộ âu phục len thượng hạng kết hợp cà vạt lụa."
},
  {
  "id": "clo-05-e",
  "topicId": "clothes",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "ephemeral runway trends",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɪˈfem.ər.əl ˈrʌn.weɪ trendz/",
  "ipaUs": "/əˈfem.ɚ.əl ˈrʌn.weɪ trendz/",
  "stress": "e-PHEM-er-al RUN-way trends",
  "definitionVi": "Những xu hướng thời trang sàn diễn chóng nở tối tàn",
  "definitionEn": "Fleeting and short-lived fashion crazes promoted by haute couture brands that quickly fade.",
  "synonyms": [
    "transient sartorial fads",
    "evanescent couture trends",
    "ephemeral fashion cycles"
  ],
  "collocations": [
    "critique ephemeral runway trends",
    "dictated by ephemeral runway trends",
    "eschew ephemeral runway trends"
  ],
  "exampleEn": "Conscious consumers eschew ephemeral runway trends in favor of durable, timeless wardrobe staples.",
  "exampleVi": "Người tiêu dùng có ý thức khước từ những xu hướng sàn diễn chóng tàn để ủng hộ các trang phục bền vững vượt thời gian."
},
  {
  "id": "fam-01-f",
  "topicId": "famous_people",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "popular singer",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈpɒp.jə.lər ˈsɪŋ.ər/",
  "ipaUs": "/ˈpɑː.pjə.lɚ ˈsɪŋ.ɚ/",
  "stress": "POP-u-lar SING-er",
  "definitionVi": "Ca sĩ được nhiều người hâm mộ",
  "definitionEn": "A musical artist who enjoys widespread admiration and commercial success.",
  "synonyms": [
    "celebrated vocalist",
    "chart-topping artist",
    "acclaimed performer"
  ],
  "collocations": [
    "admire a popular singer",
    "concert of a popular singer",
    "famous and popular singer"
  ],
  "exampleEn": "The popular singer performed to a sold-out stadium of fifty thousand enthusiastic fans.",
  "exampleVi": "Người ca sĩ nổi tiếng đã biểu diễn trước một sân vận động chật kín 50.000 người hâm mộ cuồng nhiệt."
},
  {
  "id": "fam-02-f",
  "topicId": "famous_people",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "role model",
  "partOfSpeech": "noun",
  "ipaUk": "/ˈrəʊl ˌmɒd.əl/",
  "ipaUs": "/ˈroʊl ˌmɑː.dəl/",
  "stress": "ROLE mod-el",
  "definitionVi": "Tấm gương, hình mẫu tích cực noi theo",
  "definitionEn": "A person whose behavior, example, or success can be emulated by others, especially by younger people.",
  "synonyms": [
    "inspirational figure",
    "moral beacon",
    "exemplary mentor"
  ],
  "collocations": [
    "positive role model",
    "act as a role model",
    "serve as a role model"
  ],
  "exampleEn": "Athletes should conduct themselves honorably because millions of adolescents view them as role models.",
  "exampleVi": "Các vận động viên nên cư xử đứng đắn vì hàng triệu thanh thiếu niên coi họ là những tấm gương noi theo."
},
  {
  "id": "fam-03-m",
  "topicId": "famous_people",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "public figure",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈpʌb.lɪk ˈfɪɡ.ər/",
  "ipaUs": "/ˈpʌb.lɪk ˈfɪɡ.jɚ/",
  "stress": "PUB-lic FIG-ure",
  "definitionVi": "Nhân vật của công chúng",
  "definitionEn": "An individual with fame or celebrity status who influences opinions in public affairs.",
  "synonyms": [
    "prominent celebrity",
    "notable personality",
    "influential dignitary"
  ],
  "collocations": [
    "scrutiny of public figures",
    "influential public figure",
    "responsibilities of public figures"
  ],
  "exampleEn": "Being a prominent public figure entails sacrificing a substantial degree of private confidentiality.",
  "exampleVi": "Là một nhân vật của công chúng đồng nghĩa với việc phải hy sinh một mức độ đáng kể sự riêng tư cá nhân."
},
  {
  "id": "fam-04-u",
  "topicId": "famous_people",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "scrutiny of the press",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈskruː.tɪ.ni əv ðə pres/",
  "ipaUs": "/ˈskruː.t̬ən.i əv ðə pres/",
  "stress": "SCRU-ti-ny of the PRESS",
  "definitionVi": "Sự soi mói, giám sát chặt chẽ từ truyền thông báo giới",
  "definitionEn": "Close and relentless examination of an individual’s personal life conducted by investigative journalism.",
  "synonyms": [
    "media surveillance",
    "journalistic inspection",
    "incessant tabloid focus"
  ],
  "collocations": [
    "subject to the scrutiny of the press",
    "intense scrutiny of the press",
    "endure scrutiny of the press"
  ],
  "exampleEn": "Celebrities struggle with psychological distress when their families endure harsh scrutiny of the press.",
  "exampleVi": "Những người nổi tiếng phải vật lộn với những bất ổn tâm lý khi gia đình họ chịu sự soi mói gay gắt từ báo giới."
},
  {
  "id": "fam-05-e",
  "topicId": "famous_people",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "unwarranted adulation",
  "partOfSpeech": "collocation",
  "ipaUk": "/ʌnˈwɒr.ən.tɪd ˌædʒ.əˈleɪ.ʃən/",
  "ipaUs": "/ʌnˈwɔːr.ən.t̬ɪd ˌædʒ.əˈleɪ.ʃən/",
  "stress": "un-WAR-ran-ted ad-u-LA-tion",
  "definitionVi": "Sự tôn sùng, tâng bốc thần tượng quá mức thiếu căn cứ",
  "definitionEn": "Excessive and uncritical praise or worship directed towards celebrities without justifiable merit.",
  "synonyms": [
    "blind idolatry",
    "hyperbolic glorification",
    "sycophantic hero-worship"
  ],
  "collocations": [
    "showered with unwarranted adulation",
    "rebuke unwarranted adulation",
    "object of unwarranted adulation"
  ],
  "exampleEn": "Critics argue that society bestows unwarranted adulation upon social media influencers at the expense of genuine scientists.",
  "exampleVi": "Các nhà phê bình cho rằng xã hội đang dành sự tung hô quá mức cho những người có tầm ảnh hưởng mạng xã hội mà xem nhẹ các nhà khoa học chân chính."
},
  {
  "id": "fri-01-f",
  "topicId": "friends",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "best friend",
  "partOfSpeech": "collocation",
  "ipaUk": "/best frend/",
  "ipaUs": "/best frend/",
  "stress": "BEST friend",
  "definitionVi": "Người bạn thân nhất",
  "definitionEn": "The person one knows best and regards with the greatest mutual affection.",
  "synonyms": [
    "closest companion",
    "dearest pal",
    "trusted confidant"
  ],
  "collocations": [
    "my childhood best friend",
    "hang out with best friends",
    "trust my best friend"
  ],
  "exampleEn": "I always confide in my best friend whenever I encounter challenges at university.",
  "exampleVi": "Tôi luôn tâm sự với người bạn thân nhất của mình mỗi khi gặp khó khăn ở trường đại học."
},
  {
  "id": "fri-02-f",
  "topicId": "friends",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "common interests",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈkɒm.ən ˈɪn.trəsts/",
  "ipaUs": "/ˈkɑː.mən ˈɪn.trɪsts/",
  "stress": "COM-mon IN-ter-ests",
  "definitionVi": "Những sở thích và mối quan tâm chung",
  "definitionEn": "Shared hobbies, passions, or activities that bring individuals together.",
  "synonyms": [
    "mutual pursuits",
    "shared affinities",
    "collective hobbies"
  ],
  "collocations": [
    "bond over common interests",
    "share common interests",
    "discover common interests"
  ],
  "exampleEn": "Joining campus sports clubs makes it easy to discover peers who share common interests.",
  "exampleVi": "Tham gia các câu lạc bộ thể thao trong trường giúp dễ dàng tìm thấy những người bạn có chung sở thích."
},
  {
  "id": "fri-03-m",
  "topicId": "friends",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "lifelong friendship",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈlaɪf.lɒŋ ˈfrend.ʃɪp/",
  "ipaUs": "/ˈlaɪf.lɑːŋ ˈfrend.ʃɪp/",
  "stress": "LIFE-long FRIEND-ship",
  "definitionVi": "Tình bạn gắn bó bền chặt trọn đời",
  "definitionEn": "A deep platonic bond of companionship that endures throughout an entire lifetime.",
  "synonyms": [
    "enduring camaraderie",
    "everlasting bond",
    "permanent friendship"
  ],
  "collocations": [
    "forge a lifelong friendship",
    "cherish lifelong friendships",
    "testament to lifelong friendship"
  ],
  "exampleEn": "Living in university dormitories often paves the way for forging treasured lifelong friendships.",
  "exampleVi": "Sống trong ký túc xá đại học thường mở đường cho việc xây dựng những tình bạn gắn bó trọn đời vô giá."
},
  {
  "id": "fri-04-u",
  "topicId": "friends",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "forge deep bonds",
  "partOfSpeech": "collocation",
  "ipaUk": "/fɔːdʒ diːp bɒndz/",
  "ipaUs": "/fɔːrdʒ diːp bɑːndz/",
  "stress": "FORGE deep BONDS",
  "definitionVi": "Xây đắp nên những sợi dây liên kết tình cảm sâu sắc",
  "definitionEn": "To gradually establish strong, resilient, and profound interpersonal connections.",
  "synonyms": [
    "cement intimate ties",
    "cultivate profound affinity",
    "solidify relationships"
  ],
  "collocations": [
    "forge deep bonds of empathy",
    "strive to forge deep bonds",
    "shared adversity forges deep bonds"
  ],
  "exampleEn": "Navigating adversity side by side enables teammates to forge deep bonds that withstand future pressures.",
  "exampleVi": "Cùng nhau vượt qua nghịch cảnh giúp các đồng đội xây đắp nên những mối liên kết sâu sắc vững vàng trước mọi áp lực."
},
  {
  "id": "fri-05-e",
  "topicId": "friends",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "camaraderie and kinship",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌkæm.əˈrɑː.dər.i ænd ˈkɪn.ʃɪp/",
  "ipaUs": "/ˌkɑːm.əˈrɑː.dɚ.i ænd ˈkɪn.ʃɪp/",
  "stress": "cam-a-RA-de-rie and KIN-ship",
  "definitionVi": "Tình bằng hữu keo sơn gắn bó thắm thiết như ruột thịt",
  "definitionEn": "Mutual trust, playful sociability, and profound fraternal warmth shared between close comrades.",
  "synonyms": [
    "fraternal solidarity",
    "unshakable affinity",
    "platonic devotion"
  ],
  "collocations": [
    "imbued with camaraderie and kinship",
    "spirit of camaraderie and kinship",
    "foster camaraderie and kinship"
  ],
  "exampleEn": "The expedition team returned with a profound sense of camaraderie and kinship forged in polar isolation.",
  "exampleVi": "Đội thám hiểm trở về với tinh thần bằng hữu keo sơn thắm thiết được hun đúc giữa sự biệt lập nơi vùng cực băng giá."
},
  {
  "id": "hol-01-f",
  "topicId": "holidays",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "beach vacation",
  "partOfSpeech": "collocation",
  "ipaUk": "/biːtʃ vəˈkeɪ.ʃən/",
  "ipaUs": "/biːtʃ veɪˈkeɪ.ʃən/",
  "stress": "BEACH va-ca-tion",
  "definitionVi": "Kỳ nghỉ mát ở bãi biển",
  "definitionEn": "A holiday spent relaxing by the seashore enjoying sun, sand, and swimming.",
  "synonyms": [
    "seaside holiday",
    "coastal getaway"
  ],
  "collocations": [
    "enjoy a beach vacation",
    "annual beach vacation",
    "sunny beach vacation"
  ],
  "exampleEn": "Our family embarked on a refreshing beach vacation in Da Nang last summer.",
  "exampleVi": "Gia đình chúng tôi đã có một kỳ nghỉ bãi biển sảng khoái tại Đà Nẵng vào mùa hè năm ngoái."
},
  {
  "id": "hol-02-f",
  "topicId": "holidays",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "tourist attraction",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈtʊə.rɪst əˈtræk.ʃən/",
  "ipaUs": "/ˈtʊr.ɪst əˈtræk.ʃən/",
  "stress": "TOUR-ist at-TRAC-tion",
  "definitionVi": "Điểm thu hút khách du lịch nổi tiếng",
  "definitionEn": "A place of cultural interest or natural beauty visited extensively by leisure travelers.",
  "synonyms": [
    "sightseeing hotspot",
    "visitor destination",
    "landmark site"
  ],
  "collocations": [
    "bustling tourist attraction",
    "top tourist attraction",
    "famous tourist attraction"
  ],
  "exampleEn": "Ha Long Bay is internationally celebrated as Vietnam’s most breathtaking tourist attraction.",
  "exampleVi": "Vịnh Hạ Long được quốc tế ca ngợi là điểm thu hút khách du lịch ngoạn mục nhất của Việt Nam."
},
  {
  "id": "hol-03-m",
  "topicId": "holidays",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "broaden horizons",
  "partOfSpeech": "idiom",
  "ipaUk": "/ˈbrɔː.dən həˈraɪ.zənz/",
  "ipaUs": "/ˈbrɑː.dən həˈraɪ.zənz/",
  "stress": "BROAD-en ho-RI-zons",
  "definitionVi": "Mở rộng tầm mắt và hiểu biết thế giới quan",
  "definitionEn": "To enrich one’s outlook and knowledge by experiencing distinct ways of life.",
  "synonyms": [
    "expand perspectives",
    "enrich worldviews",
    "broaden one’s mind"
  ],
  "collocations": [
    "travel broadens horizons",
    "immensely broadens horizons",
    "desire to broaden horizons"
  ],
  "exampleEn": "Solo travel across foreign continents broadens horizons by dismantling preconceived stereotypes.",
  "exampleVi": "Du lịch bụi một mình qua các châu lục xa xôi giúp mở rộng tầm nhìn bằng cách xóa tan những định kiến có sẵn."
},
  {
  "id": "hol-04-u",
  "topicId": "holidays",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "off the beaten track",
  "partOfSpeech": "idiom",
  "ipaUk": "/ɒf ðə ˈbiː.tən træk/",
  "ipaUs": "/ɑːf ðə ˈbiː.t̬ən træk/",
  "stress": "off the BEAT-en TRACK",
  "definitionVi": "Điểm đến hoang sơ, ít người đặt chân tới",
  "definitionEn": "In or into isolated places where few people travel, far from commercial tourist hubs.",
  "synonyms": [
    "secluded wilderness",
    "unfrequented territory",
    "untamed destination"
  ],
  "collocations": [
    "travel off the beaten track",
    "explore off the beaten track",
    "hidden gem off the beaten track"
  ],
  "exampleEn": "Adventurous backpackers prefer trekking off the beaten track to discover authentic ethnic villages.",
  "exampleVi": "Những phượt thủ ưa mạo hiểm thích đi tới những vùng đất hoang sơ ít người tới để khám phá các bản làng dân tộc đích thực."
},
  {
  "id": "hol-05-e",
  "topicId": "holidays",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "wanderlust escapism",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈwɒn.də.lʌst ɪˈskeɪ.pɪ.zəm/",
  "ipaUs": "/ˈwɑːn.dɚ.lʌst ɪˈskeɪ.pɪ.zəm/",
  "stress": "WAN-der-lust es-CAP-i-sm",
  "definitionVi": "Niềm khát khao xê dịch thoát ly thực tại đô thị",
  "definitionEn": "An intense, instinctual yearning to travel and wander in order to escape mundane daily routine.",
  "synonyms": [
    "restless peregrination",
    "liberating sojourn",
    "roving romanticism"
  ],
  "collocations": [
    "succumb to wanderlust escapism",
    "allure of wanderlust escapism",
    "fuel wanderlust escapism"
  ],
  "exampleEn": "Urban professionals frequently succumb to wanderlust escapism, booking flights into pristine wilderness to recuperate.",
  "exampleVi": "Dân văn phòng đô thị thường đắm chìm vào niềm khát khao xê dịch thoát ly thực tại, đặt vé đến các vùng hoang dã nguyên sơ để hồi phục sức khỏe."
},
  {
  "id": "mus-01-f",
  "topicId": "music",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "play guitar",
  "partOfSpeech": "collocation",
  "ipaUk": "/pleɪ ɡɪˈtɑːr/",
  "ipaUs": "/pleɪ ɡɪˈtɑːr/",
  "stress": "PLAY gui-TAR",
  "definitionVi": "Chơi đàn ghi-ta",
  "definitionEn": "To produce music by strumming or plucking the strings of an acoustic or electric guitar.",
  "synonyms": [
    "strum guitar strings",
    "perform on guitar"
  ],
  "collocations": [
    "learn to play guitar",
    "play acoustic guitar",
    "skillfully play guitar"
  ],
  "exampleEn": "He learned to play guitar during the summer break to join the school music band.",
  "exampleVi": "Cậu ấy đã học chơi đàn guitar trong kỳ nghỉ hè để tham gia ban nhạc của trường."
},
  {
  "id": "mus-02-f",
  "topicId": "music",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "live performance",
  "partOfSpeech": "collocation",
  "ipaUk": "/laɪv pəˈfɔː.məns/",
  "ipaUs": "/laɪv pɚˈfɔːr.məns/",
  "stress": "LIVE per-FOR-mance",
  "definitionVi": "Buổi biểu diễn nhạc sống trên sân khấu",
  "definitionEn": "A musical or theatrical act executed in real time directly before a physical audience.",
  "synonyms": [
    "stage concert",
    "live gig",
    "in-person recital"
  ],
  "collocations": [
    "attend a live performance",
    "electrifying live performance",
    "stunning live performance"
  ],
  "exampleEn": "Experiencing an electrifying live performance in an arena is far more thrilling than streaming audio.",
  "exampleVi": "Trải nghiệm một buổi biểu diễn nhạc sống bùng nổ tại sân vận động phấn khích hơn nhiều so với việc nghe nhạc trực tuyến."
},
  {
  "id": "mus-03-m",
  "topicId": "music",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "catchy melody",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈkætʃ.i ˈmel.ə.di/",
  "ipaUs": "/ˈkætʃ.i ˈmel.ə.di/",
  "stress": "CATCH-y MEL-o-dy",
  "definitionVi": "Giai điệu bắt tai, dễ nhớ",
  "definitionEn": "A musical tune that is pleasant, memorable, and effortlessly remembered after one hearing.",
  "synonyms": [
    "infectious tune",
    "memorable refrain",
    "hooky cadence"
  ],
  "collocations": [
    "hum a catchy melody",
    "boast a catchy melody",
    "composed with a catchy melody"
  ],
  "exampleEn": "The pop single achieved chart dominance largely owing to its irresistibly catchy melody.",
  "exampleVi": "Đĩa đơn nhạc pop thống trị các bảng xếp hạng phần lớn nhờ vào giai điệu bắt tai khó cưỡng của nó."
},
  {
  "id": "mus-04-u",
  "topicId": "music",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "transcend language barriers",
  "partOfSpeech": "collocation",
  "ipaUk": "/trænˈsend ˈlæŋ.ɡwɪdʒ ˈbær.i.əz/",
  "ipaUs": "/trænˈsend ˈlæŋ.ɡwɪdʒ ˈber.i.ɚz/",
  "stress": "tran-SCEND LAN-guage BAR-ri-ers",
  "definitionVi": "Vượt qua mọi rào cản ngôn ngữ và biên giới",
  "definitionEn": "To be universally intelligible and emotionally resonant regardless of linguistic differences.",
  "synonyms": [
    "cross cultural boundaries",
    "unite diverse linguistic groups",
    "universal appeal"
  ],
  "collocations": [
    "music transcends language barriers",
    "ability to transcend language barriers",
    "power to transcend language barriers"
  ],
  "exampleEn": "Orchestral symphonies transcend language barriers by communicating universal human passions directly to the soul.",
  "exampleVi": "Các bản nhạc giao hưởng vượt qua mọi rào cản ngôn ngữ bằng cách truyền tải những cung bậc cảm xúc phổ quát thẳng tới tâm hồn."
},
  {
  "id": "mus-05-e",
  "topicId": "music",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "polyphonic intricacy",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌpɒl.iˈfɒn.ɪk ˈɪn.trɪ.kə.si/",
  "ipaUs": "/ˌpɑː.liˈfɑː.nɪk ˈɪn.trə.kə.si/",
  "stress": "pol-y-PHON-ic IN-tri-ca-cy",
  "definitionVi": "Sự phức hợp đa âm trong hòa âm phối khí",
  "definitionEn": "Complex musical texture consisting of two or more simultaneous lines of independent melody.",
  "synonyms": [
    "contrapuntal complexity",
    "orchestral counterpoint",
    "melodic sophistication"
  ],
  "collocations": [
    "master polyphonic intricacy",
    "marvel at polyphonic intricacy",
    "admire polyphonic intricacy"
  ],
  "exampleEn": "Musicologists revere Bach’s fugues for their unparalleled polyphonic intricacy and mathematical equilibrium.",
  "exampleVi": "Các nhà âm nhạc học tôn sùng các bản fuga của Bach bởi sự phức hợp đa âm vô song và sự cân bằng toán học chuẩn xác."
},
  {
  "id": "nat-01-f",
  "topicId": "nation_culture",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "national flag",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈnæʃ.ən.əl flæɡ/",
  "ipaUs": "/ˈnæʃ.nəl flæɡ/",
  "stress": "NA-tion-al FLAG",
  "definitionVi": "Lá cờ tổ quốc, quốc kỳ",
  "definitionEn": "The official patterned fabric emblem representing a sovereign state.",
  "synonyms": [
    "state banner",
    "national emblem"
  ],
  "collocations": [
    "raise the national flag",
    "salute the national flag",
    "proud of the national flag"
  ],
  "exampleEn": "Citizens proudly hoisted the national flag outside their doorsteps on Independence Day.",
  "exampleVi": "Người dân tự hào treo lá cờ tổ quốc trước hiên nhà vào ngày Lễ Độc lập."
},
  {
  "id": "nat-02-f",
  "topicId": "nation_culture",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "cultural festival",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈkʌl.tʃər.əl ˈfes.tɪ.vəl/",
  "ipaUs": "/ˈkʌl.tʃɚ.əl ˈfes.tə.vəl/",
  "stress": "CUL-tur-al FES-ti-val",
  "definitionVi": "Lễ hội văn hóa dân gian truyền thống",
  "definitionEn": "A public celebration celebrating the arts, customs, or heritage of a specific group.",
  "synonyms": [
    "heritage carnival",
    "folklore celebration",
    "cultural fair"
  ],
  "collocations": [
    "annual cultural festival",
    "celebrate at a cultural festival",
    "participate in cultural festivals"
  ],
  "exampleEn": "The annual cultural festival attracts travelers eager to observe authentic ethnic dances.",
  "exampleVi": "Lễ hội văn hóa thường niên thu hút du khách háo hức muốn chiêm ngưỡng các điệu múa dân tộc nguyên bản."
},
  {
  "id": "nat-03-m",
  "topicId": "nation_culture",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "cultural identity",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈkʌl.tʃər.əl aɪˈden.tə.ti/",
  "ipaUs": "/ˈkʌl.tʃɚ.əl aɪˈden.t̬ə.t̬i/",
  "stress": "CUL-tur-al i-DEN-ti-ty",
  "definitionVi": "Bản sắc văn hóa đặc trưng của dân tộc",
  "definitionEn": "The sense of belonging to a distinct cultural collective, shaped by shared heritage and language.",
  "synonyms": [
    "national uniqueness",
    "communal heritage identity",
    "cultural distinctiveness"
  ],
  "collocations": [
    "preserve cultural identity",
    "threaten cultural identity",
    "strong cultural identity"
  ],
  "exampleEn": "Teaching indigenous folklore in primary curricula fortifies students’ sense of cultural identity.",
  "exampleVi": "Dạy văn học dân gian bản địa trong chương trình tiểu học giúp củng cố ý thức về bản sắc văn hóa của học sinh."
},
  {
  "id": "nat-04-u",
  "topicId": "nation_culture",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "indigenous heritage",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɪnˈdɪdʒ.ɪ.nəs ˈher.ɪ.tɪdʒ/",
  "ipaUs": "/ɪnˈdɪdʒ.ə.nəs ˈher.ə.t̬ɪdʒ/",
  "stress": "in-DIG-e-nous HER-i-tage",
  "definitionVi": "Di sản văn hóa bản địa nguyên bản",
  "definitionEn": "The inherited historical customs, lore, and lands of native aboriginal peoples.",
  "synonyms": [
    "ancestral patrimony",
    "native historical legacy",
    "aboriginal customs"
  ],
  "collocations": [
    "safeguard indigenous heritage",
    "honor indigenous heritage",
    "rich indigenous heritage"
  ],
  "exampleEn": "UNESCO initiatives endeavor to safeguard endangered indigenous heritage from rampant commercialization.",
  "exampleVi": "Các sáng kiến của UNESCO nỗ lực bảo vệ di sản bản địa đang gặp nguy cơ mai một trước làn sóng thương mại hóa tràn lan."
},
  {
  "id": "nat-05-e",
  "topicId": "nation_culture",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "dialectical continuum",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌdaɪ.əˈlek.tɪ.kəl kənˈtɪn.ju.əm/",
  "ipaUs": "/ˌdaɪ.əˈlek.tɪ.kəl kənˈtɪn.ju.əm/",
  "stress": "di-a-LEC-ti-cal con-TIN-u-um",
  "definitionVi": "Dòng chảy biện chứng tiếp nối của nền văn hóa lịch sử",
  "definitionEn": "A continuous, evolving sequence of reciprocal cultural interactions where traditions adapt without rupture.",
  "synonyms": [
    "dynamic cultural synthesis",
    "unbroken historical evolution",
    "adaptive heritage progression"
  ],
  "collocations": [
    "represent a dialectical continuum",
    "view history as a dialectical continuum",
    "engage in a dialectical continuum"
  ],
  "exampleEn": "Globalization represents a dialectical continuum; commercial forces pressure regional vernaculars while enabling them to broadcast globally.",
  "exampleVi": "Toàn cầu hóa đại diện cho một dòng chảy biện chứng tiếp nối; trong khi các áp lực thương mại đè nặng lên tiếng địa phương, nó đồng thời trang bị phương tiện để quảng bá chúng ra toàn cầu."
},
  {
  "id": "rou-01-f",
  "topicId": "routines",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "wake up early",
  "partOfSpeech": "collocation",
  "ipaUk": "/weɪk ʌp ˈɜː.li/",
  "ipaUs": "/weɪk ʌp ˈɝː.li/",
  "stress": "WAKE up EAR-ly",
  "definitionVi": "Thức dậy sớm vào buổi sáng",
  "definitionEn": "To stop sleeping and rise from bed before or at dawn.",
  "synonyms": [
    "rise at dawn",
    "get up early"
  ],
  "collocations": [
    "habit of waking up early",
    "struggle to wake up early",
    "wake up early for work"
  ],
  "exampleEn": "I always wake up early at 6 AM to review my vocabulary lessons before breakfast.",
  "exampleVi": "Tôi luôn thức dậy sớm lúc 6 giờ sáng để ôn bài từ vựng trước bữa ăn sáng."
},
  {
  "id": "rou-02-f",
  "topicId": "routines",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "morning routine",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈmɔː.nɪŋ ruːˈtiːn/",
  "ipaUs": "/ˈmɔːr.nɪŋ ruːˈtiːn/",
  "stress": "MORN-ing rou-TINE",
  "definitionVi": "Nề nếp thói quen sinh hoạt mỗi sáng",
  "definitionEn": "A sequence of regular actions systematically followed each morning.",
  "synonyms": [
    "daily morning regimen",
    "dawn schedule"
  ],
  "collocations": [
    "healthy morning routine",
    "stick to a morning routine",
    "establish a morning routine"
  ],
  "exampleEn": "A disciplined morning routine consisting of meditation and exercise boosts productivity all day.",
  "exampleVi": "Một thói quen buổi sáng kỷ luật bao gồm thiền và tập thể dục giúp gia tăng năng suất làm việc cả ngày."
},
  {
  "id": "rou-03-m",
  "topicId": "routines",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "strike a work-life balance",
  "partOfSpeech": "idiom",
  "ipaUk": "/straɪk ə wɜːk laɪf ˈbæl.əns/",
  "ipaUs": "/straɪk ə wɝːk laɪf ˈbæl.əns/",
  "stress": "STRAIKE a WORK LIFE BAL-ance",
  "definitionVi": "Tạo lập sự cân bằng giữa công việc và đời sống cá nhân",
  "definitionEn": "To successfully apportion time between career duties and personal/domestic rejuvenation.",
  "synonyms": [
    "achieve equilibrium",
    "harmonize career and leisure"
  ],
  "collocations": [
    "strive to strike a work-life balance",
    "difficult to strike a work-life balance",
    "vital to strike a work-life balance"
  ],
  "exampleEn": "Telecommuting empowers office workers to strike a healthy work-life balance and spend quality time with relatives.",
  "exampleVi": "Làm việc từ xa trao quyền cho nhân viên văn phòng thiết lập sự cân bằng lành mạnh giữa công việc và cuộc sống."
},
  {
  "id": "rou-04-u",
  "topicId": "routines",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "sedentary lifestyle",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈsed.ən.tər.i ˈlaɪf.staɪl/",
  "ipaUs": "/ˈsed.ən.ter.i ˈlaɪf.staɪl/",
  "stress": "SED-en-tar-y LIFE-style",
  "definitionVi": "Lối sống thụ động ít vận động thể chất",
  "definitionEn": "A way of living characterized by excessive sitting and minimal bodily exertion.",
  "synonyms": [
    "inactive routine",
    "desk-bound existence",
    "physically inert lifestyle"
  ],
  "collocations": [
    "combat a sedentary lifestyle",
    "consequences of a sedentary lifestyle",
    "lead a sedentary lifestyle"
  ],
  "exampleEn": "Leading a sedentary lifestyle behind office monitors drastically escalates the likelihood of cardiovascular disorders.",
  "exampleVi": "Lối sống thụ động suốt ngày ngồi trước màn hình làm gia tăng mạnh mẽ nguy cơ mắc các bệnh tim mạch."
},
  {
  "id": "rou-05-e",
  "topicId": "routines",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "circadian rhythm",
  "partOfSpeech": "noun",
  "ipaUk": "/sɜːˈkeɪ.di.ən ˈrɪð.əm/",
  "ipaUs": "/sɝːˈkeɪ.di.ən ˈrɪð.əm/",
  "stress": "cir-CA-di-an RHYTHM",
  "definitionVi": "Nhịp sinh học tự nhiên 24 giờ của cơ thể",
  "definitionEn": "The natural, internal 24-hour cycle of physiological, biochemical, and behavioral processes.",
  "synonyms": [
    "biological internal clock",
    "diurnal metabolic cycle",
    "endogenous bio-rhythm"
  ],
  "collocations": [
    "disrupt the circadian rhythm",
    "align with the circadian rhythm",
    "entrain circadian rhythms"
  ],
  "exampleEn": "Nocturnal exposure to blue monitor glare severely deranges the circadian rhythm, impairing deep cellular restoration.",
  "exampleVi": "Tiếp xúc với ánh sáng xanh vào ban đêm làm rối loạn nghiêm trọng nhịp sinh học, cản trở sự phục hồi tế bào sâu."
},
  {
  "id": "sci-01-f",
  "topicId": "science",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "science lesson",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈsaɪ.əns ˈles.ən/",
  "ipaUs": "/ˈsaɪ.əns ˈles.ən/",
  "stress": "SCI-ence LES-son",
  "definitionVi": "Tiết học khoa học tự nhiên",
  "definitionEn": "A school class focused on physics, chemistry, biology, or earth sciences.",
  "synonyms": [
    "science class",
    "laboratory period"
  ],
  "collocations": [
    "attend a science lesson",
    "interesting science lesson",
    "primary science lesson"
  ],
  "exampleEn": "Children were thrilled during their weekly science lesson when the teacher demonstrated magnetism.",
  "exampleVi": "Các bạn nhỏ rất phấn khích trong tiết học khoa học hàng tuần khi giáo viên biểu diễn từ tính."
},
  {
  "id": "sci-02-f",
  "topicId": "science",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "medical research",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈmed.ɪ.kəl rɪˈsɜːtʃ/",
  "ipaUs": "/ˈmed.ə.kəl ˈriː.sɝːtʃ/",
  "stress": "MED-i-cal re-SEARCH",
  "definitionVi": "Nghiên cứu y học điều trị bệnh tật",
  "definitionEn": "Scientific investigations dedicated to developing medicines, therapies, and clinical solutions.",
  "synonyms": [
    "biomedical exploration",
    "clinical research",
    "therapeutic trials"
  ],
  "collocations": [
    "fund medical research",
    "breakthrough in medical research",
    "conduct medical research"
  ],
  "exampleEn": "Generous philanthropy allocates millions to medical research aimed at curing rare pediatric diseases.",
  "exampleVi": "Nguồn từ thiện hào phóng đã phân bổ hàng triệu đô la cho nghiên cứu y học nhằm chữa trị các bệnh nhi hiếm gặp."
},
  {
  "id": "sci-03-m",
  "topicId": "science",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "empirical evidence",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɪmˈpɪr.ɪ.kəl ˈev.ɪ.dəns/",
  "ipaUs": "/ɪmˈpɪr.ɪ.kəl ˈev.ə.dəns/",
  "stress": "em-PIR-i-cal EV-i-dence",
  "definitionVi": "Bằng chứng thực nghiệm thu thập từ quan sát",
  "definitionEn": "Factual information verifiable by observation or experiment rather than mere conjecture.",
  "synonyms": [
    "observable data",
    "substantiated proof",
    "experimental verification"
  ],
  "collocations": [
    "backed by empirical evidence",
    "gather empirical evidence",
    "lack empirical evidence"
  ],
  "exampleEn": "Scientific hypotheses must be substantiated by repeatable empirical evidence before broad scientific acceptance.",
  "exampleVi": "Các giả thuyết khoa học phải được chứng minh bằng bằng chứng thực nghiệm lặp lại được trước khi được công nhận rộng rãi."
},
  {
  "id": "sci-04-u",
  "topicId": "science",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "unravel mysteries",
  "partOfSpeech": "collocation",
  "ipaUk": "/ʌnˈræv.əl ˈmɪs.tər.iz/",
  "ipaUs": "/ʌnˈræv.əl ˈmɪs.tɚ.iz/",
  "stress": "un-RAV-el MYS-ter-ies",
  "definitionVi": "Giải mã những bí ẩn hóc búa của tự nhiên",
  "definitionEn": "To systematically investigate and decipher enigmatic scientific questions.",
  "synonyms": [
    "decode enigmas",
    "demystify puzzles",
    "shed light on obscurities"
  ],
  "collocations": [
    "seek to unravel mysteries",
    "unravel the mysteries of DNA",
    "unravel cosmos mysteries"
  ],
  "exampleEn": "Astrophysicists harness deep-space observatories to unravel the mysteries of dark matter.",
  "exampleVi": "Các nhà vật lý thiên văn sử dụng đài quan sát không gian sâu để giải mã những bí ẩn của vật chất tối."
},
  {
  "id": "sci-05-e",
  "topicId": "science",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "epistemological paradigm",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɪˌpɪs.tɪ.məˈlɒdʒ.ɪ.kəl ˈpær.ə.daɪm/",
  "ipaUs": "/ɪˌpɪs.tə.məˈlɑː.dʒɪ.kəl ˈper.ə.daɪm/",
  "stress": "e-pis-te-mo-LOG-i-cal PAR-a-digm",
  "definitionVi": "Mô hình hệ biến hóa nhận thức luận",
  "definitionEn": "The overarching philosophical framework governing how knowledge is conceived, validated, and categorized.",
  "synonyms": [
    "conceptual knowledge framework",
    "foundational heuristic construct",
    "philosophical worldview"
  ],
  "collocations": [
    "shift in epistemological paradigm",
    "subvert the epistemological paradigm",
    "reframe the epistemological paradigm"
  ],
  "exampleEn": "Quantum mechanics incited a tectonic shift in the epistemological paradigm of deterministic physics.",
  "exampleVi": "Cơ học lượng tử đã gây ra một sự biến chuyển sâu rộng trong mô hình nhận thức luận của vật lý tất định."
},
  {
  "id": "shp-01-f",
  "topicId": "shopping",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "price tag",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈpraɪs ˌtæɡ/",
  "ipaUs": "/ˈpraɪs ˌtæɡ/",
  "stress": "PRICE tag",
  "definitionVi": "Mác ghi giá tiền niêm yết",
  "definitionEn": "A piece of paper or plastic affixed to merchandise indicating its retail cost.",
  "synonyms": [
    "cost label",
    "retail sticker"
  ],
  "collocations": [
    "check the price tag",
    "hefty price tag",
    "look at price tags"
  ],
  "exampleEn": "Always check the price tag before heading to the checkout counter to prevent surprises.",
  "exampleVi": "Luôn kiểm tra mác giá trước khi ra quầy thanh toán để tránh bất ngờ về giá cả."
},
  {
  "id": "shp-02-f",
  "topicId": "shopping",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "online shopping",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈɒn.laɪn ˈʃɒp.ɪŋ/",
  "ipaUs": "/ˈɑːn.laɪn ˈʃɑː.pɪŋ/",
  "stress": "ON-line SHOP-ping",
  "definitionVi": "Mua sắm qua mạng Internet",
  "definitionEn": "The activity of buying products or services over the internet using e-commerce platforms.",
  "synonyms": [
    "e-commerce purchasing",
    "digital retail buying",
    "web shopping"
  ],
  "collocations": [
    "convenience of online shopping",
    "surge in online shopping",
    "engage in online shopping"
  ],
  "exampleEn": "The explosion of e-commerce platforms has made online shopping the default habit for millions.",
  "exampleVi": "Sự bùng nổ của các nền tảng thương mại điện tử đã khiến việc mua sắm trực tuyến trở thành thói quen mặc định của hàng triệu người."
},
  {
  "id": "shp-03-m",
  "topicId": "shopping",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "impulsive buying",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɪmˈpʌl.sɪv ˈbaɪ.ɪŋ/",
  "ipaUs": "/ɪmˈpʌl.sɪv ˈbaɪ.ɪŋ/",
  "stress": "im-PUL-sive BUY-ing",
  "definitionVi": "Hành vi mua sắm bốc đồng theo cảm xúc",
  "definitionEn": "Purchasing items spontaneously without premeditation or genuine necessity.",
  "synonyms": [
    "unplanned purchasing",
    "knee-jerk shopping",
    "spontaneous consumerism"
  ],
  "collocations": [
    "curb impulsive buying",
    "prone to impulsive buying",
    "trigger impulsive buying"
  ],
  "exampleEn": "Flash sales on digital marketplaces are intentionally architected to stimulate impulsive buying.",
  "exampleVi": "Các chương trình giảm giá chớp nhoáng trên sàn thương mại điện tử được chủ đích thiết kế để kích thích hành vi mua sắm bốc đồng."
},
  {
  "id": "shp-04-u",
  "topicId": "shopping",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "consumerist society",
  "partOfSpeech": "collocation",
  "ipaUk": "/kənˈsjuː.mər.ɪst səˈsaɪ.ə.ti/",
  "ipaUs": "/kənˈsuː.mɚ.ɪst səˈsaɪ.ə.t̬i/",
  "stress": "con-SUM-er-ist so-CI-e-ty",
  "definitionVi": "Xã hội sùng bái tiêu dùng vật chất",
  "definitionEn": "A culture that preaches personal happiness and social status stem from relentless commodity consumption.",
  "synonyms": [
    "materialistic society",
    "hyper-consumer culture",
    "acquisition-driven community"
  ],
  "collocations": [
    "trapped in a consumerist society",
    "critique of consumerist society",
    "hallmark of consumerist society"
  ],
  "exampleEn": "Sociologists critique modern consumerist society for conflating material accumulation with spiritual fulfillment.",
  "exampleVi": "Các nhà xã hội học chỉ trích xã hội chuộng tiêu dùng hiện đại vì đã đánh đồng việc tích lũy vật chất với sự mãn nguyện về mặt tinh thần."
},
  {
  "id": "shp-05-e",
  "topicId": "shopping",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "conspicuous consumption",
  "partOfSpeech": "collocation",
  "ipaUk": "/kənˈspɪk.ju.əs kənˈsʌmp.ʃən/",
  "ipaUs": "/kənˈspɪk.ju.əs kənˈsʌmp.ʃən/",
  "stress": "con-SPIC-u-ous con-SUMP-tion",
  "definitionVi": "Hành vi tiêu xài phô trương xa hoa để khoe mẽ đẳng cấp",
  "definitionEn": "Spending on luxury merchandise primarily to ostentatiously flaunt wealth and prestige.",
  "synonyms": [
    "ostentatious expenditure",
    "hyperbolic display of affluence",
    "vain extravagance"
  ],
  "collocations": [
    "epitome of conspicuous consumption",
    "fuel conspicuous consumption",
    "renounce conspicuous consumption"
  ],
  "exampleEn": "Purchasing gold-plated accessories represents conspicuous consumption designed solely for superficial peer validation.",
  "exampleVi": "Mua sắm phụ kiện mạ vàng đại diện cho hành vi tiêu xài phô trương chỉ nhằm mục đích tìm kiếm sự công nhận hời hợt từ bạn bè."
},
  {
  "id": "soc-01-f",
  "topicId": "social_media",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "smart phone",
  "partOfSpeech": "collocation",
  "ipaUk": "/smɑːt fəʊn/",
  "ipaUs": "/smɑːrt foʊn/",
  "stress": "SMART phone",
  "definitionVi": "Điện thoại thông minh",
  "definitionEn": "A mobile cellular telephone with computing capability and touch-screen interface.",
  "synonyms": [
    "handheld device",
    "mobile handset"
  ],
  "collocations": [
    "check a smart phone",
    "stare at a smart phone",
    "smart phone addiction"
  ],
  "exampleEn": "Most people unlock their smart phone dozens of times each day to browse updates.",
  "exampleVi": "Hầu hết mọi người mở khóa điện thoại thông minh hàng chục lần mỗi ngày để lướt tin tức."
},
  {
  "id": "soc-02-f",
  "topicId": "social_media",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "follow accounts",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈfɒl.əʊ əˈkaʊnts/",
  "ipaUs": "/ˈfɑː.loʊ əˈkaʊnts/",
  "stress": "FOL-low ac-COUNTS",
  "definitionVi": "Theo dõi các tài khoản trên mạng xã hội",
  "definitionEn": "To subscribe to another user’s profile to view their uploaded broadcasts and stories.",
  "synonyms": [
    "subscribe to profiles",
    "monitor feeds"
  ],
  "collocations": [
    "follow verified accounts",
    "choose to follow accounts",
    "follow educational accounts"
  ],
  "exampleEn": "Young learners often follow accounts dedicated to English idioms and pronunciation tips.",
  "exampleVi": "Người học trẻ tuổi thường theo dõi các tài khoản chuyên về thành ngữ tiếng Anh và mẹo phát âm."
},
  {
  "id": "soc-03-m",
  "topicId": "social_media",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "virtual interaction",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈvɜː.tʃu.əl ˌɪn.təˈræk.ʃən/",
  "ipaUs": "/ˈvɝː.tʃu.əl ˌɪn.t̬ɚˈræk.ʃən/",
  "stress": "VIR-tu-al in-ter-AC-tion",
  "definitionVi": "Sự tương tác ảo qua màn hình mạng xã hội",
  "definitionEn": "Communication conducted between people mediated exclusively through digital networking interfaces.",
  "synonyms": [
    "online socializing",
    "digital dialogue",
    "mediated communication"
  ],
  "collocations": [
    "substitute for virtual interaction",
    "rely on virtual interaction",
    "frequent virtual interaction"
  ],
  "exampleEn": "Excessive reliance on virtual interaction may atrophy adolescent skills in conducting face-to-face discourse.",
  "exampleVi": "Việc phụ thuộc quá mức vào tương tác ảo có thể làm thui chột kỹ năng giao tiếp trực tiếp của thanh thiếu niên."
},
  {
  "id": "soc-04-u",
  "topicId": "social_media",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "echo chambers",
  "partOfSpeech": "noun",
  "ipaUk": "/ˈek.əʊ ˌtʃeɪm.bəz/",
  "ipaUs": "/ˈek.oʊ ˌtʃeɪm.bɚz/",
  "stress": "ECH-o cham-bers",
  "definitionVi": "Hiệu ứng phòng tiếng vọng (Chỉ nghe ý kiến cùng chiều)",
  "definitionEn": "Digital environments where individuals only encounter opinions that reinforce existing ideological biases.",
  "synonyms": [
    "ideological bubbles",
    "insular consensus",
    "information siloing"
  ],
  "collocations": [
    "trapped in echo chambers",
    "algorithm creates echo chambers",
    "polarizing echo chambers"
  ],
  "exampleEn": "Social algorithms herd consumers into partisan echo chambers, intensifying sociocultural hostility.",
  "exampleVi": "Thuật toán mạng xã hội dồn người dùng vào những căn phòng tiếng vọng bè phái, làm gia tăng sự đối địch xã hội."
},
  {
  "id": "soc-05-e",
  "topicId": "social_media",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "algorithmic polarization",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌæl.ɡəˈrɪð.mɪk ˌpəʊ.lə.raɪˈzeɪ.ʃən/",
  "ipaUs": "/ˌæl.ɡəˈrɪð.mɪk ˌpoʊ.lə.rəˈzeɪ.ʃən/",
  "stress": "al-go-RITH-mic po-la-ri-ZA-tion",
  "definitionVi": "Sự phân cực tư tưởng do thuật toán định hướng",
  "definitionEn": "The deliberate radicalization of public sentiment engineered by engagement-maximizing recommendation systems.",
  "synonyms": [
    "computational radicalization",
    "systemic ideological splintering",
    "digital tribalization"
  ],
  "collocations": [
    "combat algorithmic polarization",
    "catalyze algorithmic polarization",
    "nefarious algorithmic polarization"
  ],
  "exampleEn": "Democracies confront existential destabilization generated by algorithmic polarization prioritizing provocative falsehoods.",
  "exampleVi": "Các nền dân chủ đối mặt với sự bất ổn mang tính sống còn bắt nguồn từ sự phân cực do thuật toán ưu tiên những tin giả gây phẫn nộ."
},
  {
  "id": "spo-01-f",
  "topicId": "sport",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "running shoes",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈrʌn.ɪŋ ʃuːz/",
  "ipaUs": "/ˈrʌn.ɪŋ ʃuːz/",
  "stress": "RUN-ning SHOES",
  "definitionVi": "Giày thể thao chạy bộ",
  "definitionEn": "Specially engineered athletic footwear crafted to cushion joints during distance running.",
  "synonyms": [
    "jogging trainers",
    "athletic sneakers"
  ],
  "collocations": [
    "lace up running shoes",
    "cushioned running shoes",
    "pair of running shoes"
  ],
  "exampleEn": "Investing in comfortable running shoes prevents shin splints when training on asphalt.",
  "exampleVi": "Đầu tư vào một đôi giày chạy bộ êm ái sẽ giúp ngăn ngừa chấn thương khi tập luyện trên đường nhựa."
},
  {
  "id": "spo-02-f",
  "topicId": "sport",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "physical exercise",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈfɪz.ɪ.kəl ˈek.sə.saɪz/",
  "ipaUs": "/ˈfɪz.ɪ.kəl ˈek.sɚ.saɪz/",
  "stress": "PHYS-i-cal EX-er-cise",
  "definitionVi": "Hoạt động rèn luyện thể chất",
  "definitionEn": "Bodily exertion undertaken to improve or sustain health and fitness.",
  "synonyms": [
    "bodily workout",
    "fitness routine",
    "physical conditioning"
  ],
  "collocations": [
    "engage in physical exercise",
    "regular physical exercise",
    "vigorous physical exercise"
  ],
  "exampleEn": "Engaging in thirty minutes of physical exercise every morning mitigates work stress.",
  "exampleVi": "Tập thể dục 30 phút mỗi sáng giúp giảm bớt căng thẳng công việc."
},
  {
  "id": "spo-03-m",
  "topicId": "sport",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "cardiovascular health",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌkɑː.di.əʊˈvæs.kjə.lər helθ/",
  "ipaUs": "/ˌkɑːr.di.oʊˈvæs.kjə.lɚ helθ/",
  "stress": "car-di-o-VAS-cu-lar HEALTH",
  "definitionVi": "Sức khỏe hệ tim mạch và tuần hoàn",
  "definitionEn": "The functional well-being of the heart, veins, arteries, and blood circulation.",
  "synonyms": [
    "heart and circulatory fitness",
    "cardiac well-being",
    "vascular stamina"
  ],
  "collocations": [
    "boost cardiovascular health",
    "optimize cardiovascular health",
    "vital for cardiovascular health"
  ],
  "exampleEn": "Aerobic sports such as swimming and cycling markedly enhance cardiovascular health over time.",
  "exampleVi": "Các môn thể thao hiếu khí như bơi lội và đạp xe giúp cải thiện rõ rệt sức khỏe tim mạch theo thời gian."
},
  {
  "id": "spo-04-u",
  "topicId": "sport",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "athletic prowess",
  "partOfSpeech": "collocation",
  "ipaUk": "/æθˈlet.ɪk ˈpraʊ.es/",
  "ipaUs": "/æθˈlet̬.ɪk ˈpraʊ.es/",
  "stress": "ath-LET-ic PROW-ess",
  "definitionVi": "Năng lực, phong độ thi đấu thể thao xuất chúng",
  "definitionEn": "Exceptional skill, strength, agility, and mastery displayed in competitive sports.",
  "synonyms": [
    "sporting supremacy",
    "physical mastery",
    "superb athleticism"
  ],
  "collocations": [
    "display athletic prowess",
    "celebrate athletic prowess",
    "pinnacle of athletic prowess"
  ],
  "exampleEn": "Olympic medalists combine rigorous biometric conditioning with unrivaled athletic prowess.",
  "exampleVi": "Những người đoạt huy chương Olympic kết hợp chế độ điều hòa sinh học khắt khe với năng lực thể thao vô song."
},
  {
  "id": "spo-05-e",
  "topicId": "sport",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "unflinching resilience",
  "partOfSpeech": "collocation",
  "ipaUk": "/ʌnˈflɪn.tʃɪŋ rɪˈzɪl.jəns/",
  "ipaUs": "/ʌnˈflɪn.tʃɪŋ rɪˈzɪl.jəns/",
  "stress": "un-FLINCH-ing re-SIL-ience",
  "definitionVi": "Ý chí kiên cường bền bỉ không hề nao núng",
  "definitionEn": "The resolute psychological fortitude to persevere through agonizing physical exhaustion and defeat.",
  "synonyms": [
    "indomitable perseverance",
    "unyielding grit",
    "ironclad fortitude"
  ],
  "collocations": [
    "exhibit unflinching resilience",
    "hallmark of unflinching resilience",
    "unflinching resilience under pressure"
  ],
  "exampleEn": "The marathon champion exhibited unflinching resilience, surging ahead despite debilitating muscle cramps.",
  "exampleVi": "Nhà vô địch marathon đã thể hiện ý chí kiên cường không hề nao núng, bứt phá tiến lên bất chấp những cơn chuột rút đau đớn."
},
  {
  "id": "wea-01-f",
  "topicId": "weather",
  "bandTier": "Mất gốc",
  "cefr": "A1",
  "word": "sunny day",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈsʌn.i deɪ/",
  "ipaUs": "/ˈsʌn.i deɪ/",
  "stress": "SUN-ny DAY",
  "definitionVi": "Ngày trời nắng ráo đẹp đẽ",
  "definitionEn": "A day illuminated with plentiful direct bright sunlight and minimal cloud cover.",
  "synonyms": [
    "fine weather day",
    "clear bright day"
  ],
  "collocations": [
    "warm sunny day",
    "enjoy a sunny day",
    "spend a sunny day outdoors"
  ],
  "exampleEn": "Families packed picnic baskets to spend a glorious sunny day at the municipal park.",
  "exampleVi": "Các gia đình chuẩn bị giỏ đồ dã ngoại để tận hưởng một ngày nắng đẹp tại công viên thành phố."
},
  {
  "id": "wea-02-f",
  "topicId": "weather",
  "bandTier": "< 4.5",
  "cefr": "A2",
  "word": "weather forecast",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˈweð.ər ˈfɔː.kɑːst/",
  "ipaUs": "/ˈweð.ɚ ˈfɔːr.kæst/",
  "stress": "WEATH-er FORE-cast",
  "definitionVi": "Bản tin dự báo thời tiết khí tượng",
  "definitionEn": "A prediction of forthcoming meteorological conditions issued by atmospheric scientists.",
  "synonyms": [
    "meteorological projection",
    "climate prediction"
  ],
  "collocations": [
    "check the weather forecast",
    "accurate weather forecast",
    "according to the weather forecast"
  ],
  "exampleEn": "According to the evening weather forecast, a fierce cold front will sweep through the province tomorrow.",
  "exampleVi": "Theo bản tin dự báo thời tiết buổi tối, một đợt không khí lạnh dữ dội sẽ quét qua toàn tỉnh vào ngày mai."
},
  {
  "id": "wea-03-m",
  "topicId": "weather",
  "bandTier": "4.5 - 6.0",
  "cefr": "B1",
  "word": "unpredictable climate",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌʌn.prɪˈdɪk.tə.bəl ˈklaɪ.mət/",
  "ipaUs": "/ˌʌn.prɪˈdɪk.tə.bəl ˈklaɪ.mət/",
  "stress": "un-pre-DICT-a-ble CLI-mate",
  "definitionVi": "Khí hậu thời tiết diễn biến thất thường khó lường",
  "definitionEn": "Weather conditions that fluctuate erratic and resist reliable short-term forecasting.",
  "synonyms": [
    "erratic weather patterns",
    "volatile meteorological conditions",
    "capricious climate"
  ],
  "collocations": [
    "cope with unpredictable climate",
    "suffer from unpredictable climate",
    "consequence of unpredictable climate"
  ],
  "exampleEn": "Farmers face harvest devastation when an unpredictable climate unleashes unseasonal frost.",
  "exampleVi": "Nông dân đối mặt với mùa màng bị tàn phá khi khí hậu diễn biến thất thường gây ra những đợt sương giá trái mùa."
},
  {
  "id": "wea-04-u",
  "topicId": "weather",
  "bandTier": "6.0 - 7.5",
  "cefr": "B2",
  "word": "extreme weather events",
  "partOfSpeech": "collocation",
  "ipaUk": "/ɪkˈstriːm ˈweð.ər ɪˈvents/",
  "ipaUs": "/ɪkˈstriːm ˈweð.ɚ əˈvents/",
  "stress": "ex-TREME WEATH-er e-VENTS",
  "definitionVi": "Các hiện tượng thời tiết cực đoan (Bão, hạn hán, lũ lụt)",
  "definitionEn": "Unexpected, unusual, or unseasonal severe meteorological occurrences exceeding historical limits.",
  "synonyms": [
    "severe climatic disruptions",
    "meteorological catastrophes",
    "climatic anomalies"
  ],
  "collocations": [
    "frequency of extreme weather events",
    "brace for extreme weather events",
    "mitigate extreme weather events"
  ],
  "exampleEn": "Climatologists document that global warming multiplies the frequency and intensity of extreme weather events.",
  "exampleVi": "Các nhà khí hậu học ghi nhận rằng sự nóng lên toàn cầu làm gia tăng tần suất và cường độ của các hiện tượng thời tiết cực đoan."
},
  {
  "id": "wea-05-e",
  "topicId": "weather",
  "bandTier": "7.5+",
  "cefr": "C2",
  "word": "cataclysmic deluge",
  "partOfSpeech": "collocation",
  "ipaUk": "/ˌkæt.əˈklɪz.mɪk ˈdel.juːdʒ/",
  "ipaUs": "/ˌkæt̬.əˈklɪz.mɪk ˈdel.juːdʒ/",
  "stress": "cat-a-CLYZ-mic DEL-uge",
  "definitionVi": "Trận đại hồng thủy mưa lũ kinh hoàng mang tính hủy diệt",
  "definitionEn": "A torrential, catastrophic inundation of torrential rainfall and flash floods causing immense destruction.",
  "synonyms": [
    "devastating flash-flood",
    "apocalyptic rainstorm",
    "torrential inundation"
  ],
  "collocations": [
    "submerged by a cataclysmic deluge",
    "survive the cataclysmic deluge",
    "unprecedented cataclysmic deluge"
  ],
  "exampleEn": "The provincial capital was entirely paralyzed after an unprecedented cataclysmic deluge breached aging flood barriers.",
  "exampleVi": "Thủ phủ của tỉnh đã hoàn toàn tê liệt sau khi một trận đại hồng thủy mưa lũ chưa từng có phá vỡ các bờ đê ngăn lũ lâu năm."
},
  // ==================== 1. ANIMALS & WILDLIFE ====================
  {
    id: 'anim-01-f',
    topicId: 'animals',
    bandTier: 'Mất gốc',
    cefr: 'A1',
    word: 'wild animals',
    partOfSpeech: 'collocation',
    ipaUk: '/waɪld ˈæn.ɪ.məlz/',
    ipaUs: '/waɪld ˈæn.ə.məlz/',
    stress: 'WILD AN-i-mals',
    definitionVi: 'Động vật hoang dã',
    definitionEn: 'Animals that live in natural conditions and are not domesticated by humans.',
    synonyms: ['untamed creatures', 'fauna in the wild', 'beasts of nature'],
    collocations: ['protect wild animals', 'hunt wild animals', 'spot wild animals in the forest'],
    exampleEn: 'National parks provide safe sanctuaries where wild animals can roam freely.',
    exampleVi: 'Các vườn quốc gia cung cấp khu bảo tồn an toàn nơi động vật hoang dã có thể tự do sinh sống.'
  },
  {
    id: 'anim-02-f',
    topicId: 'animals',
    bandTier: '< 4.5',
    cefr: 'A2',
    word: 'animal welfare',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈæn.ɪ.məl ˈwel.feər/',
    ipaUs: '/ˈæn.ə.məl ˈwel.fer/',
    stress: 'AN-i-mal WEL-fare',
    definitionVi: 'Phúc lợi và quyền của động vật',
    definitionEn: 'The well-being and humane treatment of animals, especially those kept by humans.',
    synonyms: ['humane animal care', 'animal rights protection', 'ethical treatment of fauna'],
    collocations: ['promote animal welfare', 'animal welfare charity', 'strict animal welfare laws'],
    exampleEn: 'Non-profit groups campaign tirelessly for higher standards of animal welfare in zoos.',
    exampleVi: 'Các tổ chức phi lợi nhuận không ngừng vận động cho các tiêu chuẩn phúc lợi động vật cao hơn trong các vườn thú.'
  },
  {
    id: 'anim-03-m',
    topicId: 'animals',
    bandTier: '4.5 - 6.0',
    cefr: 'B1',
    word: 'natural habitat',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌnætʃ.ər.əl ˈhæb.ɪ.tæt/',
    ipaUs: '/ˌnætʃ.ɚ.əl ˈhæb.ə.tæt/',
    stress: 'NAT-u-ral HAB-i-tat',
    definitionVi: 'Môi trường sống tự nhiên',
    definitionEn: 'The natural environment in which a particular species normally flourishes.',
    synonyms: ['wild ecosystem', 'native territory', 'original habitat'],
    collocations: ['destroy natural habitat', 'in its natural habitat', 'preserve natural habitat'],
    exampleEn: 'Deforestation deprives primates of their natural habitat, leading to population decline.',
    exampleVi: 'Nạn phá rừng tước đi môi trường sống tự nhiên của loài linh trưởng, dẫn tới sự sụt giảm số lượng cá thể.'
  },
  {
    id: 'anim-04-u',
    topicId: 'animals',
    bandTier: '6.0 - 7.5',
    cefr: 'B2',
    word: 'biodiversity hotspot',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti ˈhɒt.spɒt/',
    ipaUs: '/ˌbaɪ.oʊ.dɪˈvɝː.sə.t̬i ˈhɑːt.spɑːt/',
    stress: 'bi-o-di-VER-si-ty HOT-spot',
    definitionVi: 'Điểm nóng đa dạng sinh học',
    definitionEn: 'A biogeographic region characterized by exceptional reservoir of plant and animal species.',
    synonyms: ['ecological sanctuary', 'species-rich ecosystem', 'vital bio-reserve'],
    collocations: ['protect biodiversity hotspots', 'threatened biodiversity hotspot', 'marine biodiversity hotspot'],
    exampleEn: 'The tropical rainforest is a recognized biodiversity hotspot harboring thousands of endemic creatures.',
    exampleVi: 'Rừng nhiệt đới là một điểm nóng đa dạng sinh học đã được công nhận, lưu giữ hàng ngàn loài sinh vật đặc hữu.'
  },
  {
    id: 'anim-05-e',
    topicId: 'animals',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'poaching and trafficking',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈpəʊ.tʃɪŋ ænd ˈtræf.ɪ.kɪŋ/',
    ipaUs: '/ˈpoʊ.tʃɪŋ ænd ˈtræf.ɪ.kɪŋ/',
    stress: 'POACH-ing and TRAFF-ick-ing',
    definitionVi: 'Nạn săn trộm và buôn bán trái phép động vật quý hiếm',
    definitionEn: 'The illegal hunting, capturing, and illicit commercial trade of endangered wildlife parts.',
    synonyms: ['illicit wildlife trade', 'covert fauna exploitation', 'black-market wildlife trading'],
    collocations: ['combat poaching and trafficking', 'rampant poaching and trafficking', 'lucrative poaching and trafficking syndicates'],
    exampleEn: 'Stringent international sanctions have been enacted to eradicate cross-border poaching and trafficking of pangolins.',
    exampleVi: 'Các lệnh trừng phạt quốc tế nghiêm ngặt đã được ban hành nhằm xóa bỏ đường dây săn trộm và buôn bán tê tê xuyên biên giới.'
  },

  // ==================== 5. ENVIRONMENT & CLIMATE ====================
  {
    id: 'env-01-f',
    topicId: 'environment',
    bandTier: 'Mất gốc',
    cefr: 'A1',
    word: 'clean water',
    partOfSpeech: 'collocation',
    ipaUk: '/kliːn ˈwɔː.tər/',
    ipaUs: '/kliːn ˈwɑː.t̬ɚ/',
    stress: 'CLEAN WA-ter',
    definitionVi: 'Nguồn nước sạch sinh hoạt',
    definitionEn: 'Purified water that is safe for drinking, domestic use, and agricultural irrigation.',
    synonyms: ['potable water', 'fresh water supplies', 'safe drinking water'],
    collocations: ['access to clean water', 'provide clean water', 'scarcity of clean water'],
    exampleEn: 'Every citizen deserves universal access to clean water and adequate sanitation.',
    exampleVi: 'Mọi công dân đều xứng đáng được tiếp cận nguồn nước sạch và điều kiện vệ sinh đầy đủ.'
  },
  {
    id: 'env-02-f',
    topicId: 'environment',
    bandTier: '< 4.5',
    cefr: 'A2',
    word: 'air pollution',
    partOfSpeech: 'collocation',
    ipaUk: '/eər pəˈluː.ʃən/',
    ipaUs: '/er pəˈluː.ʃən/',
    stress: 'AIR pol-LU-tion',
    definitionVi: 'Ô nhiễm không khí khói bụi',
    definitionEn: 'Contamination of the indoor or outdoor environment by chemical or particulate matter.',
    synonyms: ['atmospheric smog', 'airborne pollutants', 'toxic emissions'],
    collocations: ['tackle air pollution', 'choking air pollution', 'alleviate air pollution'],
    exampleEn: 'Heavy traffic congestion is the predominant contributor to urban air pollution.',
    exampleVi: 'Ùn tắc giao thông nghiêm trọng là nguyên nhân chính gây ra ô nhiễm không khí tại các đô thị.'
  },
  {
    id: 'env-03-m',
    topicId: 'environment',
    bandTier: '4.5 - 6.0',
    cefr: 'B1',
    word: 'carbon footprint',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌkɑː.bən ˈfʊt.prɪnt/',
    ipaUs: '/ˌkɑːr.bən ˈfʊt.prɪnt/',
    stress: 'CAR-bon FOOT-print',
    definitionVi: 'Dấu chân carbon (Lượng khí thải gây hiệu ứng nhà kính)',
    definitionEn: 'The total amount of greenhouse gases generated by our individual or collective actions.',
    synonyms: ['greenhouse emission impact', 'ecological carbon tally', 'carbon emissions quota'],
    collocations: ['reduce carbon footprint', 'calculate carbon footprint', 'offset carbon footprint'],
    exampleEn: 'Opting for public commuting significantly curtails a commuter’s annual carbon footprint.',
    exampleVi: 'Lựa chọn phương tiện giao thông công cộng giúp giảm đáng kể lượng dấu chân carbon hàng năm của một người đi lại.'
  },
  {
    id: 'env-04-u',
    topicId: 'environment',
    bandTier: '6.0 - 7.5',
    cefr: 'B2',
    word: 'ecological fallout',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌiː.kəˈlɒdʒ.ɪ.kəl ˈfɔːl.aʊt/',
    ipaUs: '/ˌiː.kəˈlɑː.dʒɪ.kəl ˈfɑːl.aʊt/',
    stress: 'e-co-LOG-i-cal FALL-out',
    definitionVi: 'Hậu quả suy thoái sinh thái nghiêm trọng',
    definitionEn: 'The adverse and unintended secondary consequences of human industry upon ecosystems.',
    synonyms: ['environmental repercussions', 'ecological catastrophe', 'biosphere damage'],
    collocations: ['brace for ecological fallout', 'severe ecological fallout', 'mitigate ecological fallout'],
    exampleEn: 'Unregulated offshore drilling risks cataclysmic ecological fallout for adjacent coral reefs.',
    exampleVi: 'Việc khoan dầu ngoài khơi không được kiểm soát có nguy cơ gây ra hậu quả suy thoái sinh thái nghiêm trọng cho các rạn san hô lân cận.'
  },
  {
    id: 'env-05-e',
    topicId: 'environment',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'anthropogenic disturbance',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌæn.θrə.pəˈdʒen.ɪk dɪˈstɜː.bəns/',
    ipaUs: '/ˌæn.θroʊ.pəˈdʒen.ɪk dɪˈstɝː.bəns/',
    stress: 'an-thro-po-GEN-ic dis-TUR-bance',
    definitionVi: 'Sự xáo trộn sinh thái do tác động của con người',
    definitionEn: 'Environmental alterations or degradation originating specifically from human activity.',
    synonyms: ['human-induced degradation', 'artificial ecological disruption', 'man-made biosphere stress'],
    collocations: ['vulnerable to anthropogenic disturbance', 'assess anthropogenic disturbance', 'minimize anthropogenic disturbance'],
    exampleEn: 'Subalpine biomes exhibit profound vulnerability to even minor anthropogenic disturbance caused by tourism.',
    exampleVi: 'Các quần xã sinh vật dưới núi cao bộc lộ tính tổn thương sâu sắc trước ngay cả những xáo trộn nhỏ do tác động của con người từ hoạt động du lịch.'
  },

  // ==================== 17. TECHNOLOGY & AI ====================
  {
    id: 'tech-01-f',
    topicId: 'technology',
    bandTier: 'Mất gốc',
    cefr: 'A1',
    word: 'smart devices',
    partOfSpeech: 'collocation',
    ipaUk: '/smɑːt dɪˈvaɪ.sɪz/',
    ipaUs: '/smɑːrt dɪˈvaɪ.sɪz/',
    stress: 'SMART de-VI-ces',
    definitionVi: 'Thiết bị công nghệ thông minh',
    definitionEn: 'Electronic gadgets that connect wirelessly to the internet to perform automated tasks.',
    synonyms: ['connected gadgets', 'digital appliances', 'intelligent hardware'],
    collocations: ['use smart devices', 'ubiquitous smart devices', 'rely on smart devices'],
    exampleEn: 'Smart devices have transformed how households monitor electricity consumption.',
    exampleVi: 'Các thiết bị thông minh đã làm thay đổi cách thức các hộ gia đình theo dõi lượng điện năng tiêu thụ.'
  },
  {
    id: 'tech-02-f',
    topicId: 'technology',
    bandTier: '< 4.5',
    cefr: 'A2',
    word: 'internet access',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈɪn.tə.net ˈæk.ses/',
    ipaUs: '/ˈɪn.t̬ɚ.net ˈæk.ses/',
    stress: 'IN-ter-net AC-cess',
    definitionVi: 'Khả năng truy cập mạng Internet',
    definitionEn: 'The ability of individuals or organizations to connect to the worldwide web.',
    synonyms: ['online connectivity', 'web access', 'broadband connection'],
    collocations: ['high-speed internet access', 'provide internet access', 'lack of internet access'],
    exampleEn: 'Reliable internet access empowers remote students to study university curricula from home.',
    exampleVi: 'Khả năng truy cập internet ổn định giúp sinh viên vùng xa có thể theo học chương trình đại học từ nhà.'
  },
  {
    id: 'tech-03-m',
    topicId: 'technology',
    bandTier: '4.5 - 6.0',
    cefr: 'B1',
    word: 'artificial intelligence',
    partOfSpeech: 'noun',
    ipaUk: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/',
    ipaUs: '/ˌɑːr.t̬əˈfɪʃ.əl ɪnˈtel.ə.dʒəns/',
    stress: 'ar-ti-FI-cial in-TEL-li-gence',
    definitionVi: 'Trí tuệ nhân tạo (AI)',
    definitionEn: 'The simulation of human intelligence processes by computer algorithms and machines.',
    synonyms: ['machine cognition', 'automated intelligence', 'synthetic intellect'],
    collocations: ['advance of artificial intelligence', 'powered by artificial intelligence', 'artificial intelligence algorithms'],
    exampleEn: 'Medical diagnostics have been revolutionized by artificial intelligence detecting anomalies with high precision.',
    exampleVi: 'Chẩn đoán y khoa đã được cách mạng hóa nhờ trí tuệ nhân tạo phát hiện các bất thường với độ chuẩn xác cao.'
  },
  {
    id: 'tech-04-u',
    topicId: 'technology',
    bandTier: '6.0 - 7.5',
    cefr: 'B2',
    word: 'disruptive innovation',
    partOfSpeech: 'collocation',
    ipaUk: '/dɪsˈrʌp.tɪv ˌɪn.əˈveɪ.ʃən/',
    ipaUs: '/dɪsˈrʌp.tɪv ˌɪn.əˈveɪ.ʃən/',
    stress: 'dis-RUP-tive in-no-VA-tion',
    definitionVi: 'Sự đổi mới mang tính đột phá, phá vỡ lối mòn',
    definitionEn: 'An innovation that significantly alters the way a market or industry operates.',
    synonyms: ['groundbreaking breakthrough', 'transformative technology', 'radical leap'],
    collocations: ['spawn disruptive innovation', 'drive disruptive innovation', 'herald disruptive innovation'],
    exampleEn: 'Ride-sharing applications represent a disruptive innovation that radically unseated conventional taxi monopolies.',
    exampleVi: 'Các ứng dụng gọi xe đại diện cho một sự đổi mới đột phá đã thay thế căn bản các doanh nghiệp taxi truyền thống độc quyền.'
  },
  {
    id: 'tech-05-e',
    topicId: 'technology',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'algorithmic hegemony',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌæl.ɡəˈrɪð.mɪk hɪˈɡem.ə.ni/',
    ipaUs: '/ˌæl.ɡəˈrɪð.mɪk hɪˈdʒem.ə.ni/',
    stress: 'al-go-RITH-mic he-GEM-o-ny',
    definitionVi: 'Sự thống trị và chi phối của thuật toán trong đời sống',
    definitionEn: 'The overwhelming dominance of computational algorithms in shaping socioeconomic reality and public opinion.',
    synonyms: ['technological dominance', 'digital supremacy', 'computational governance'],
    collocations: ['subject to algorithmic hegemony', 'dismantle algorithmic hegemony', 'subtle algorithmic hegemony'],
    exampleEn: 'Philosophers warn of algorithmic hegemony where automated recommendation engines dictate human cultural preferences.',
    exampleVi: 'Các nhà triết học cảnh báo về sự thống trị của thuật toán khi các công cụ đề xuất tự động định hình thị hiếu văn hóa của con người.'
  },

  // ==================== 7. FOOD & NUTRITION ====================
  {
    id: 'food-01-f',
    topicId: 'food',
    bandTier: 'Mất gốc',
    cefr: 'A1',
    word: 'healthy diet',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈhel.θi ˈdaɪ.ət/',
    ipaUs: '/ˈhel.θi ˈdaɪ.ət/',
    stress: 'HEALTH-y DI-et',
    definitionVi: 'Chế độ ăn uống lành mạnh',
    definitionEn: 'A diet that maintains or improves overall health by providing essential nutrition.',
    synonyms: ['nutritious eating habits', 'balanced food intake', 'wholesome nutrition'],
    collocations: ['maintain a healthy diet', 'adopt a healthy diet', 'benefits of a healthy diet'],
    exampleEn: 'Eating plenty of fresh vegetables is fundamental to a healthy diet.',
    exampleVi: 'Ăn nhiều rau tươi là điều cốt lõi cho một chế độ ăn uống lành mạnh.'
  },
  {
    id: 'food-02-f',
    topicId: 'food',
    bandTier: '< 4.5',
    cefr: 'A2',
    word: 'traditional dishes',
    partOfSpeech: 'collocation',
    ipaUk: '/trəˈdɪʃ.ən.əl ˈdɪʃ.ɪz/',
    ipaUs: '/trəˈdɪʃ.ən.əl ˈdɪʃ.ɪz/',
    stress: 'tra-DI-tion-al DISH-es',
    definitionVi: 'Các món ăn truyền thống dân tộc',
    definitionEn: 'Foods and recipes passed down through generations within a specific region or heritage.',
    synonyms: ['local culinary specialties', 'indigenous delicacies', 'heritage meals'],
    collocations: ['sample traditional dishes', 'cook traditional dishes', 'famous traditional dishes'],
    exampleEn: 'Tourists enjoy sampling authentic traditional dishes when visiting coastal towns.',
    exampleVi: 'Khách du lịch thích thưởng thức các món ăn truyền thống đích thực khi ghé thăm các thị trấn ven biển.'
  },
  {
    id: 'food-03-m',
    topicId: 'food',
    bandTier: '4.5 - 6.0',
    cefr: 'B1',
    word: 'nutritional value',
    partOfSpeech: 'collocation',
    ipaUk: '/njuːˈtrɪʃ.ən.əl ˈvæl.juː/',
    ipaUs: '/nuːˈtrɪʃ.ən.əl ˈvæl.juː/',
    stress: 'nu-TRI-tion-al VAL-ue',
    definitionVi: 'Giá trị dinh dưỡng của thực phẩm',
    definitionEn: 'The measure of essential vitamins, minerals, and calories that food delivers.',
    synonyms: ['dietary worth', 'nutritive content', 'health-giving properties'],
    collocations: ['high nutritional value', 'retain nutritional value', 'label with nutritional value'],
    exampleEn: 'Steaming vegetables preserves their nutritional value far better than boiling them in water.',
    exampleVi: 'Hấp rau củ giữ lại giá trị dinh dưỡng tốt hơn nhiều so với việc luộc trong nước.'
  },
  {
    id: 'food-04-u',
    topicId: 'food',
    bandTier: '6.0 - 7.5',
    cefr: 'B2',
    word: 'gastronomic delight',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌɡæs.trəˈnɒm.ɪk dɪˈlaɪt/',
    ipaUs: '/ˌɡæs.trəˈnɑː.mɪk dɪˈlaɪt/',
    stress: 'gas-tro-NOM-ic de-LIGHT',
    definitionVi: 'Trải nghiệm ẩm thực tuyệt đỉnh tinh tế',
    definitionEn: 'An exceptionally pleasurable and sophisticated dining or tasting experience.',
    synonyms: ['culinary bliss', 'epicurean masterpiece', 'sensory gastronomic treat'],
    collocations: ['savor gastronomic delight', 'treat of gastronomic delight', 'celebrate gastronomic delight'],
    exampleEn: 'The Michelin-starred restaurant provided an unforgettable gastronomic delight for international connoisseurs.',
    exampleVi: 'Nhà hàng đạt sao Michelin đã mang lại một trải nghiệm ẩm thực tuyệt đỉnh khó quên cho các chuyên gia sành ăn quốc tế.'
  },
  {
    id: 'food-05-e',
    topicId: 'food',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'epicurean pleasure',
    partOfSpeech: 'collocation',
    ipaUk: '/ˌep.ɪ.kjʊəˈriː.ən ˈpleʒ.ər/',
    ipaUs: '/ˌep.ə.kjʊˈriː.ən ˈpleʒ.ɚ/',
    stress: 'ep-i-cu-RE-an PLEA-sure',
    definitionVi: 'Thú vui ẩm thực tao nhã sành điệu',
    definitionEn: 'Refined pleasure and sensory appreciation derived specifically from luxurious gourmet cuisine and wine.',
    synonyms: ['refined culinary indulgence', 'gourmet appreciation', 'aesthetic sensory indulgence'],
    collocations: ['indulge in epicurean pleasure', 'height of epicurean pleasure', 'sublime epicurean pleasure'],
    exampleEn: 'The gala dinner coalesced fine vintages and seasonal truffles into an unparalleled epicurean pleasure.',
    exampleVi: 'Bữa tiệc tối hội tụ các loại rượu hảo hạng cùng nấm cục theo mùa tạo nên một thú vui ẩm thực tao nhã không gì sánh kịp.'
  },

  // ==================== 18. TRANSPORT & URBAN MOBILITY ====================
  {
    id: 'trans-01-f',
    topicId: 'transport',
    bandTier: 'Mất gốc',
    cefr: 'A1',
    word: 'public bus',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈpʌb.lɪk bʌs/',
    ipaUs: '/ˈpʌb.lɪk bʌs/',
    stress: 'PUB-lic BUS',
    definitionVi: 'Xe buýt công cộng',
    definitionEn: 'A passenger vehicle operating along fixed routes available to all citizens for a modest fare.',
    synonyms: ['city bus service', 'mass transit bus', 'commuter coach'],
    collocations: ['catch a public bus', 'wait for a public bus', 'public bus network'],
    exampleEn: 'Many commuters prefer taking the public bus to reduce gasoline expenses.',
    exampleVi: 'Nhiều người đi làm thích đi xe buýt công cộng để giảm bớt chi phí xăng dầu.'
  },
  {
    id: 'trans-02-f',
    topicId: 'transport',
    bandTier: '< 4.5',
    cefr: 'A2',
    word: 'traffic jam',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈtræf.ɪk dʒæm/',
    ipaUs: '/ˈtræf.ɪk dʒæm/',
    stress: 'TRAF-fic JAM',
    definitionVi: 'Tắc đường, kẹt xe vào giờ cao điểm',
    definitionEn: 'A long line of stationary or very slow-moving motor vehicles on a road.',
    synonyms: ['gridlock', 'traffic bottleneck', 'congestion backlog'],
    collocations: ['stuck in a traffic jam', 'cause a traffic jam', 'avoid traffic jams'],
    exampleEn: 'Commuters regularly waste up to an hour trapped in traffic jams during morning rush hours.',
    exampleVi: 'Người đi làm thường xuyên lãng phí đến một giờ bị kẹt trong cảnh tắc đường vào giờ cao điểm buổi sáng.'
  },
  {
    id: 'trans-03-m',
    topicId: 'transport',
    bandTier: '4.5 - 6.0',
    cefr: 'B1',
    word: 'alleviate congestion',
    partOfSpeech: 'collocation',
    ipaUk: '/əˈliː.vi.eɪt kənˈdʒes.tʃən/',
    ipaUs: '/əˈliː.vi.eɪt kənˈdʒes.tʃən/',
    stress: 'al-LE-vi-ate con-GES-tion',
    definitionVi: 'Làm giảm thiểu tình trạng ùn tắc giao thông',
    definitionEn: 'To lessen or relieve the severity of vehicular overcrowding on urban roads.',
    synonyms: ['ease traffic delays', 'relieve bottlenecks', 'diminish gridlock'],
    collocations: ['measures to alleviate congestion', 'alleviate highway congestion', 'subway alleviates congestion'],
    exampleEn: 'Constructing elevated expressways is aimed at alleviating congestion in metropolitan centers.',
    exampleVi: 'Xây dựng đường cao tốc trên cao nhằm mục tiêu giảm thiểu ùn tắc tại các trung tâm vùng đô thị.'
  },
  {
    id: 'trans-04-u',
    topicId: 'transport',
    bandTier: '6.0 - 7.5',
    cefr: 'B2',
    word: 'integrated transit system',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈɪn.tɪ.ɡreɪ.tɪd ˈtræn.zɪt ˈsɪs.təm/',
    ipaUs: '/ˈɪn.t̬ə.ɡreɪ.t̬ɪd ˈtræn.zɪt ˈsɪs.təm/',
    stress: 'IN-te-gra-ted TRAN-sit SYS-tem',
    definitionVi: 'Hệ thống giao thông công cộng tích hợp đa phương thức',
    definitionEn: 'A coordinated transportation framework enabling frictionless interchanging across bus, metro, and rail.',
    synonyms: ['multimodal transport network', 'unified public transit', 'seamless transit infrastructure'],
    collocations: ['develop an integrated transit system', 'rely on an integrated transit system', 'invest in integrated transit systems'],
    exampleEn: 'Metropolises like Tokyo boast an integrated transit system that operates with extraordinary punctuality.',
    exampleVi: 'Các đại đô thị như Tokyo sở hữu hệ thống giao thông công cộng tích hợp vận hành với độ đúng giờ phi thường.'
  },
  {
    id: 'trans-05-e',
    topicId: 'transport',
    bandTier: '7.5+',
    cefr: 'C2',
    word: 'transit-oriented development',
    partOfSpeech: 'collocation',
    ipaUk: '/ˈtræn.zɪt ˌɔː.ri.en.tɪd dɪˈvel.əp.mənt/',
    ipaUs: '/ˈtræn.zɪt ˌɔːr.i.en.t̬ɪd dɪˈvel.əp.mənt/',
    stress: 'TRAN-sit OR-i-ent-ed de-VEL-op-ment',
    definitionVi: 'Mô hình phát triển đô thị định hướng giao thông công cộng (TOD)',
    definitionEn: 'An urban planning model maximizing residential, business, and leisure space within walking proximity of public transit.',
    synonyms: ['TOD urbanism', 'pedestrian-centric transit planning', 'compact transport-led design'],
    collocations: ['pioneer transit-oriented development', 'principles of transit-oriented development', 'sustainable transit-oriented development'],
    exampleEn: 'Urbanists laud transit-oriented development as an indispensable antidote to sprawling automobile dependency.',
    exampleVi: 'Các nhà quy hoạch đô thị ca ngợi mô hình phát triển định hướng giao thông công cộng như liều thuốc giải không thể thiếu đối với sự lệ thuộc vào xe hơi.'
  }
];

// DỊCH VỤ QUẢN LÝ MA TRẬN TỪ VỰNG 20 CHỦ ĐỀ x 5 BAND
class IeltsVocabMatrixService {
  constructor() {
    this.topics = IELTS_20_TOPICS_DETAILED;
    this.bandTiers = IELTS_5_BAND_TIERS_METADATA;
    this.matrixWords = IELTS_VOCABULARY_MATRIX_DATABASE;
  }

  getTopics() {
    return this.topics;
  }

  getTopicById(topicId) {
    return this.topics.find((t) => t.id === topicId) || this.topics[0];
  }

  getBandTiers() {
    return this.bandTiers;
  }

  getBandTierByKey(tierKey) {
    return this.bandTiers.find((b) => b.tierKey === tierKey) || this.bandTiers[0];
  }

  getAllWords() {
    return this.matrixWords;
  }

  /**
   * Tính tiến độ học của một chủ đề cụ thể
   */
  getTopicProgress(topicId, masteredIds = []) {
    const topicWords = this.matrixWords.filter((w) => w.topicId === topicId);
    const total = topicWords.length;
    const mastered = topicWords.filter((w) => masteredIds.includes(w.id)).length;
    const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { total, mastered, percentage };
  }

  /**
   * Tính tiến độ học của một Band điểm cụ thể
   */
  getBandProgress(bandTier, masteredIds = []) {
    const bandWords = this.matrixWords.filter((w) => w.bandTier === bandTier);
    const total = bandWords.length;
    const mastered = bandWords.filter((w) => masteredIds.includes(w.id)).length;
    const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { total, mastered, percentage };
  }

  /**
   * Lấy danh sách từ theo bộ lọc ma trận thông minh
   */
  filterMatrix({
    viewMode = 'TOPIC_VIEW', // 'TOPIC_VIEW' hoặc 'PROGRESSION_VIEW'
    selectedTopicId = 'study',
    selectedBandTier = '4.5 - 6.0',
    keyword = '',
    status = 'all', // 'all' | 'mastered' | 'review' | 'unlearned'
    masteredIds = [],
    reviewIds = []
  }) {
    let result = this.matrixWords;

    if (viewMode === 'TOPIC_VIEW') {
      if (selectedTopicId && selectedTopicId !== 'all') {
        result = result.filter((w) => w.topicId === selectedTopicId);
      }
      if (selectedBandTier && selectedBandTier !== 'all') {
        result = result.filter((w) => w.bandTier === selectedBandTier);
      }
    } else if (viewMode === 'PROGRESSION_VIEW') {
      // Ở chế độ cày vượt band: Lọc trước theo Band điểm
      if (selectedBandTier && selectedBandTier !== 'all') {
        result = result.filter((w) => w.bandTier === selectedBandTier);
      }
      if (selectedTopicId && selectedTopicId !== 'all') {
        result = result.filter((w) => w.topicId === selectedTopicId);
      }
    }

    // Lọc theo trạng thái đã thuộc / cần ôn & Spaced Repetition (SRS)
    if (status === 'mastered') {
      result = result.filter((w) => window.srsManager ? window.srsManager.isMastered(w.id) : masteredIds.includes(w.id));
    } else if (status === 'review' || status === 'reviewing') {
      result = result.filter((w) => window.srsManager ? window.srsManager.isReviewing(w.id) : reviewIds.includes(w.id));
    } else if (status === 'learning') {
      result = result.filter((w) => window.srsManager ? window.srsManager.isLearning(w.id) : false);
    } else if (status === 'new') {
      result = result.filter((w) => window.srsManager ? window.srsManager.isNew(w.id) : !masteredIds.includes(w.id));
    } else if (status === 'due_srs') {
      result = result.filter((w) => window.srsManager ? window.srsManager.isDueForReview(w.id) : reviewIds.includes(w.id));
    } else if (status === 'unlearned') {
      result = result.filter((w) => window.srsManager ? !window.srsManager.isMastered(w.id) : !masteredIds.includes(w.id));
    }

    // Lọc theo từ khóa tìm kiếm
    if (keyword && keyword.trim().length > 0) {
      const q = keyword.trim().toLowerCase();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.definitionVi.toLowerCase().includes(q) ||
          w.definitionEn.toLowerCase().includes(q) ||
          (w.synonyms && w.synonyms.some((s) => s.toLowerCase().includes(q))) ||
          (w.collocations && w.collocations.some((c) => c.toLowerCase().includes(q))) ||
          (w.exampleEn && w.exampleEn.toLowerCase().includes(q))
      );
    }

    return result;
  }
}

// Khởi tạo Singleton Service toàn cục
if (typeof window !== 'undefined') {
  window.vocabMatrixService = new IeltsVocabMatrixService();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IELTS_20_TOPICS_DETAILED,
    IELTS_5_BAND_TIERS_METADATA,
    IELTS_VOCABULARY_MATRIX_DATABASE,
    IeltsVocabMatrixService
  };
}
