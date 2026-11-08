export * from '../../../shared/constants/ielts-levels';

/**
 * UI Badges và màu sắc đại diện cho 5 cấp độ phân tầng học tập
 */
export const BAND_TIER_UI_META = {
  ZERO_FOUNDATION: {
    label: 'Mất gốc',
    badgeColor: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300',
    colorHex: '#EF4444',
    iconName: 'Sprout',
    targetScore: '0 - 3.0',
    tagline: 'Xây lại nền tảng từ số 0: Ngữ âm IPA, 8 Thì cơ bản & Từ vựng sinh hoạt',
  },
  BELOW_4_5: {
    label: '< 4.5',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300',
    colorHex: '#F59E0B',
    iconName: 'Footprints',
    targetScore: '3.5 - 4.0',
    tagline: 'Làm quen đề thi IELTS: Section 1 nghe điền từ, Part 1 nói câu đơn & Skimming',
  },
  BAND_4_5_TO_6_0: {
    label: '4.5 - 6.0',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300',
    colorHex: '#3B82F6',
    iconName: 'Compass',
    targetScore: '4.5 - 6.0',
    tagline: 'Bứt phá kỹ năng chiến thuật: Map Labelling, Part 2 Speaking & Writing 4 đoạn',
  },
  BAND_6_0_TO_7_5: {
    label: '6.0 - 7.5',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300',
    colorHex: '#6366F1',
    iconName: 'Award',
    targetScore: '6.0 - 7.5',
    tagline: 'Nâng cấp tư duy học thuật: Collocations chuyên sâu, Part 3 phản biện & Đảo ngữ',
  },
  BAND_7_5_PLUS: {
    label: '7.5+',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
    colorHex: '#10B981',
    iconName: 'Crown',
    targetScore: '7.5 - 9.0',
    tagline: 'Làm chủ trình độ bản xứ (Mastery): Tốc độ 1.25x, phản xạ tự nhiên & bài viết chuẩn xuất bản',
  },
} as const;

/**
 * UI Metadata cho 2 hình thức thi
 */
export const EXAM_TYPE_UI_META = {
  ACADEMIC: {
    title: 'IELTS Academic',
    subtitle: 'Đại học, Sau đại học & Chứng chỉ chuyên môn quốc tế',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
  },
  GENERAL_TRAINING: {
    title: 'IELTS General Training',
    subtitle: 'Định cư, Việc làm & Đào tạo nghề quốc tế',
    badgeColor: 'bg-teal-100 text-teal-700 border-teal-300',
  },
} as const;
