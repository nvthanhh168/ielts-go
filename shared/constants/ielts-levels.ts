import { ExamType, ExamTypeMetadata, BandLevel, BandTierConfig, SkillType } from '../types/ielts';

/**
 * Metadata chuẩn cho 2 hình thức thi IELTS
 */
export const EXAM_TYPE_DEFINITIONS: Record<ExamType, ExamTypeMetadata> = {
  [ExamType.ACADEMIC]: {
    code: ExamType.ACADEMIC,
    name: 'IELTS Academic',
    targetAudience: 'Dành cho bậc đại học, sau đại học hoặc mục đích hành nghề chuyên môn quốc tế (Y khoa, Luật, Giảng dạy...)',
    description: 'Đánh giá mức độ thông thạo ngôn ngữ học thuật cần thiết trong môi trường đại học và nghiên cứu khoa học.',
    readingFormat: '3 bài đọc học thuật dài trích từ sách báo chuyên khảo, tạp chí khoa học; từ vựng chuyên ngành cao, yêu cầu phân tích suy luận luận điểm.',
    writingTask1Format: 'Mô tả, so sánh hoặc giải thích dữ liệu từ biểu đồ (Line, Bar, Pie, Table), quy trình (Process) hoặc bản đồ (Map) trong tối thiểu 150 từ.',
  },
  [ExamType.GENERAL_TRAINING]: {
    code: ExamType.GENERAL_TRAINING,
    name: 'IELTS General Training',
    targetAudience: 'Dành cho đào tạo nghề, trung học, định cư hoặc làm việc trong môi trường đa văn hóa (Canada, Úc, New Zealand, UK...)',
    description: 'Đánh giá kỹ năng giao tiếp tiếng Anh thực tế trong đời sống hàng ngày, công sở và cộng đồng xã hội.',
    readingFormat: '3 phần: Phần 1 (thông tin xã hội đời thường: tờ rơi, quảng cáo), Phần 2 (ngữ cảnh nơi làm việc: hợp đồng, đào tạo), Phần 3 (đoạn văn phức tạp mang tính thông tin chung).',
    writingTask1Format: 'Viết một lá thư (Letter: Thân mật - Informal, Bán trang trọng - Semi-formal, hoặc Trang trọng - Formal) để giải quyết tình huống thực tế trong tối thiểu 150 từ.',
  },
};

/**
 * Ma trận 5 Cấp độ Phân tầng theo Band điểm tương ứng 4 Kỹ năng (Listening, Speaking, Reading, Writing)
 */
export const BAND_TIER_CONFIGS: Record<BandLevel, BandTierConfig> = {
  [BandLevel.ZERO_FOUNDATION]: {
    level: BandLevel.ZERO_FOUNDATION,
    displayLabel: 'Mất gốc',
    cefrEquivalent: 'Pre-A1 / A1',
    targetScoreRange: '0 - 3.0',
    description: 'Người học chưa có nền tảng tiếng Anh hoặc đã quên gần như toàn bộ ngữ pháp, từ vựng và quy tắc phát âm cơ bản.',
    keyFocusAreas: {
      [SkillType.LISTENING]: {
        objective: 'Nhận diện bảng chữ cái tiếng Anh, số đếm, đánh vần tên riêng và các từ đơn lẻ thường gặp trong đời sống.',
        coreSkills: [
          'Phân biệt bảng chữ cái và các cặp âm dễ gây nhầm lẫn (B-P, S-Z, T-D)',
          'Nhận diện số đếm, số điện thoại, ngày tháng năm, giá tiền',
          'Nghe hiểu các mẫu câu chào hỏi, chỉ dẫn lớp học đơn giản',
        ],
        recommendedHours: 40,
      },
      [SkillType.SPEAKING]: {
        objective: 'Học phát âm chuẩn 44 âm quốc tế IPA, nói các cụm từ giới thiệu bản thân đơn giản.',
        coreSkills: [
          'Luyện bảng ngữ âm quốc tế IPA (Nguyên âm đơn, nguyên âm đôi, phụ âm)',
          'Tập thói quen bật âm đuôi (Ending sounds) cơ bản: /s/, /z/, /t/, /d/',
          'Mẫu câu giới thiệu: Tên, tuổi, quê quán, nghề nghiệp, sở thích cơ bản',
        ],
        recommendedHours: 35,
      },
      [SkillType.READING]: {
        objective: 'Xây dựng vốn 500-800 từ vựng cốt lõi thường gặp và cấu trúc ngữ pháp câu đơn cơ bản.',
        coreSkills: [
          '8 Thì cơ bản nhất trong tiếng Anh (Hiện tại đơn, Quá khứ đơn, Tương lai đơn, Hiện tại hoàn thành...)',
          'Nhận biết thành phần câu: Subject, Verb, Object, Adjective, Adverb',
          'Đọc hiểu biển báo, danh sách thông tin ngắn và mẩu tin tức đơn giản',
        ],
        recommendedHours: 35,
      },
      [SkillType.WRITING]: {
        objective: 'Viết đúng chính tả, viết đúng cấu trúc câu đơn không mắc lỗi ngữ pháp nghiêm trọng.',
        coreSkills: [
          'Quy tắc viết hoa, chấm câu, chia động từ số ít/số nhiều cơ bản',
          'Viết câu đơn (S + V + O) hoàn chỉnh mô tả bản thân hoặc sự vật',
          'Ghép nối câu bằng các liên từ đơn giản: and, but, so, because',
        ],
        recommendedHours: 30,
      },
    },
  },

  [BandLevel.BELOW_4_5]: {
    level: BandLevel.BELOW_4_5,
    displayLabel: '< 4.5',
    cefrEquivalent: 'A2 / B1 Low',
    targetScoreRange: '3.5 - 4.0',
    description: 'Người học đã có kiến thức căn bản nhưng phản xạ còn chậm, vốn từ hạn hẹp và chưa nắm rõ định dạng bài thi IELTS.',
    keyFocusAreas: {
      [SkillType.LISTENING]: {
        objective: 'Làm quen với format IELTS Section 1 / Part 1 (hội thoại giao dịch thường ngày).',
        coreSkills: [
          'Chiến thuật Form/Note/Table Completion trong Section 1',
          'Luyện thói quen đọc đề trước (Prediction) và gạch chân từ khóa (Keywords)',
          'Nhận biết bẫy đổi ý kiến (Self-correction distractor) của người nói',
        ],
        recommendedHours: 45,
      },
      [SkillType.SPEAKING]: {
        objective: 'Trả lời Part 1 với độ dài 2-3 câu, cải thiện sự trôi chảy và giảm độ ngập ngừng.',
        coreSkills: [
          'Cấu trúc trả lời Part 1: Trực diện (Direct Answer) + Mở rộng (Reason/Detail)',
          'Quy tắc trọng âm từ (Word Stress) và ngữ điệu câu hỏi/câu trần thuật cơ bản',
          'Mở rộng chủ đề quen thuộc: Family, Hobbies, Daily routine, Hometown',
        ],
        recommendedHours: 40,
      },
      [SkillType.READING]: {
        objective: 'Rèn luyện kỹ năng đọc lướt (Skimming) nắm ý chính và đọc quét (Scanning) tìm dữ liệu cụ thể.',
        coreSkills: [
          'Kỹ thuật Skimming tiêu đề và câu chủ đề (Topic sentence)',
          'Kỹ thuật Scanning tìm con số, tên riêng, thuật ngữ kỹ thuật',
          'Làm quen dạng bài Completion (Sentence/Summary) và True/False/Not Given cơ bản',
        ],
        recommendedHours: 45,
      },
      [SkillType.WRITING]: {
        objective: 'Nắm cấu trúc đoạn văn chuẩn (PEEL) và viết câu ghép (Compound sentences).',
        coreSkills: [
          'Sử dụng mệnh đề quan hệ (who, which, that) và câu phức cơ bản',
          'Academic: Làm quen cách viết đoạn Mở bài (Paraphrase) và Tổng quan (Overview) cho Task 1',
          'General: Học cấu trúc mở đầu và kết thúc thư Task 1 theo văn phong phù hợp',
        ],
        recommendedHours: 40,
      },
    },
  },

  [BandLevel.BAND_4_5_TO_6_0]: {
    level: BandLevel.BAND_4_5_TO_6_0,
    displayLabel: '4.5 - 6.0',
    cefrEquivalent: 'B1 / B2',
    targetScoreRange: '4.5 - 6.0',
    description: 'Giai đoạn bứt phá kỹ năng làm bài có chiến thuật, kiểm soát tốt thời gian và nâng cao độ chính xác.',
    keyFocusAreas: {
      [SkillType.LISTENING]: {
        objective: 'Chinh phục IELTS Section 2 & 3 (Độc thoại địa điểm/du lịch & Thảo luận học thuật nhóm).',
        coreSkills: [
          'Dạng bài Multiple Choice và Map/Plan Labelling (Định hướng không gian, chỉ đường)',
          'Nhận diện các từ đồng nghĩa (Synonyms) và Paraphrasing trong băng ghi âm',
          'Kỹ năng duy trì tập trung khi băng nói nhanh và có nhiều giọng điệu (Accents)',
        ],
        recommendedHours: 50,
      },
      [SkillType.SPEAKING]: {
        objective: 'Nói liền mạch 2 phút trong Part 2 và bắt đầu phân tích đa chiều trong Part 3.',
        coreSkills: [
          'Phương pháp Take notes hiệu quả trong 1 phút chuẩn bị Part 2',
          'Khung tư duy triển khai ý: Past - Present - Future / Storytelling method',
          'Sử dụng các từ nối tự nhiên (Connectors & Discourse markers): Actually, To be honest, However',
        ],
        recommendedHours: 45,
      },
      [SkillType.READING]: {
        objective: 'Làm chủ các dạng bài hóc búa: Matching Headings, Matching Information, Yes/No/Not Given.',
        coreSkills: [
          'Phân biệt rõ ràng giữa True/False/Not Given và Yes/No/Not Given',
          'Kỹ thuật đọc phân tích đoạn văn để giải quyết dạng Matching Headings nhanh chóng',
          'Quản lý thời gian phân bổ: 17 phút - 20 phút - 23 phút cho 3 Passages',
        ],
        recommendedHours: 50,
      },
      [SkillType.WRITING]: {
        objective: 'Hoàn thiện bài luận Task 2 (250 từ) đủ 4 đoạn và Task 1 (150 từ) mạch lạc.',
        coreSkills: [
          'Cấu trúc chuẩn 4 đoạn Task 2: Intro - Body 1 - Body 2 - Conclusion',
          'Các dạng đề Task 2: Opinion, Discussion, Problem & Solution, Two-part questions',
          'Academic: Viết Body Task 1 chọn lọc số liệu nổi bật (Key features) và so sánh logic',
          'General: Sử dụng từ ngữ đúng văn phong (Formal vs Informal tone) trong thư Task 1',
        ],
        recommendedHours: 55,
      },
    },
  },

  [BandLevel.BAND_6_0_TO_7_5]: {
    level: BandLevel.BAND_6_0_TO_7_5,
    displayLabel: '6.0 - 7.5',
    cefrEquivalent: 'B2 / C1',
    targetScoreRange: '6.0 - 7.5',
    description: 'Chuyên sâu ngôn ngữ học thuật, mở rộng vốn từ vựng Collocations, thành thạo lập luận và phát âm tự nhiên.',
    keyFocusAreas: {
      [SkillType.LISTENING]: {
        objective: 'Đạt điểm tối đa Section 4 (Bài giảng học thuật đại học tốc độ cao, từ vựng học thuật).',
        coreSkills: [
          'Dự đoán loại từ (Noun, Verb, Adj) và ngữ cảnh chuyên ngành trong Section 4',
          'Bắt kịp nhịp nói liên tục và nhận diện tín hiệu chuyển ý (Signposting words)',
          'Luyện nghe các accent đa dạng: British, Australian, American, New Zealand, Canadian',
        ],
        recommendedHours: 50,
      },
      [SkillType.SPEAKING]: {
        objective: 'Phát triển ý sâu sắc trong Part 3, dùng Idiomatic expressions và ngữ điệu tự nhiên.',
        coreSkills: [
          'Kỹ thuật trả lời câu hỏi trừu tượng Part 3 (Social trends, government policies, ethics)',
          'Nối âm (Connected speech), nuốt âm (Elision), và ngữ điệu cảm xúc (Intonation)',
          'Sử dụng linh hoạt từ vựng C1-C2 và Collocations theo chủ đề nâng cao',
        ],
        recommendedHours: 50,
      },
      [SkillType.READING]: {
        objective: 'Đọc hiểu sâu các bài nghiên cứu phức tạp, đạt tốc độ 40 câu trong 50 phút.',
        coreSkills: [
          'Xử lý từ mới thông qua ngữ cảnh (Contextual clues) mà không cần từ điển',
          'Phân tích quan điểm, thái độ ngầm hiểu của tác giả (Writer’s attitude & Tone)',
          'Rèn luyện độ chính xác 34-37/40 câu cho cả Academic và General Training',
        ],
        recommendedHours: 50,
      },
      [SkillType.WRITING]: {
        objective: 'Đạt điểm cao ở Lexical Resource & Grammatical Range, bài viết sắc bén, lập luận logic.',
        coreSkills: [
          'Sử dụng cấu trúc câu nâng cao: Đảo ngữ (Inversion), câu chẻ (Cleft sentences), phân từ hoàn thành',
          'Sử dụng Collocations học thuật tự nhiên, tránh dùng từ hoa mỹ gượng gạo',
          'Mạch lạc tuyệt đối (Coherence & Cohesion): Cách phát triển luận điểm chặt chẽ với dẫn chứng sắc sảo',
        ],
        recommendedHours: 60,
      },
    },
  },

  [BandLevel.BAND_7_5_PLUS]: {
    level: BandLevel.BAND_7_5_PLUS,
    displayLabel: '7.5+',
    cefrEquivalent: 'C1 / C2 (Mastery)',
    targetScoreRange: '7.5 - 9.0',
    description: 'Làm chủ ngôn ngữ toàn diện tương đương người bản xứ có học thức, tư duy phản biện sắc bén và độ chuẩn xác tối đa.',
    keyFocusAreas: {
      [SkillType.LISTENING]: {
        objective: 'Đạt 38-40/40 câu Listening, phản xạ tức thì với mọi bẫy đề thi tinh vi.',
        coreSkills: [
          'Xử lý tốc độ nói 1.25x - 1.5x của các bài thuyết trình TED Talk, Oxford Union',
          'Khắc phục 100% lỗi chính tả (Spelling mistakes) và số ít/số nhiều danh từ (-s/-es)',
          'Làm chủ toàn bộ vốn từ học thuật chuyên sâu xuất hiện trong bài giảng',
        ],
        recommendedHours: 40,
      },
      [SkillType.SPEAKING]: {
        objective: 'Nói lưu loát như người bản xứ, biến đổi nhịp điệu phong phú, trả lời thuyết phục mọi vấn đề.',
        coreSkills: [
          'Tư duy phản biện (Critical thinking) đỉnh cao với kỹ năng phản biện đa chiều',
          'Sử dụng ngôn ngữ tự nhiên không gượng ép, giàu biểu cảm và dí dỏm chuẩn mực',
          'Không ngập ngừng vì thiếu từ vựng, tự sửa lỗi (Self-correction) tinh tế',
        ],
        recommendedHours: 40,
      },
      [SkillType.READING]: {
        objective: 'Đạt điểm tuyệt đối 8.5 - 9.0 Reading (38-40 câu) trong thời gian dưới 50 phút.',
        coreSkills: [
          'Phân tích những bẫy tinh vi nhất của Cambridge trong các câu hỏi Matching & Yes/No/Not Given',
          'Đọc hiểu tài liệu khoa học tự nhiên, triết học, tâm lý học và kinh tế học phức tạp',
          'Tối ưu hóa chiến thuật kiểm tra lại bài thi để loại bỏ mọi sai sót do sơ suất',
        ],
        recommendedHours: 40,
      },
      [SkillType.WRITING]: {
        objective: 'Bài viết đạt chuẩn xuất bản báo chí/học thuật quốc tế, Band 8.0+ cho cả 4 tiêu chí chấm.',
        coreSkills: [
          'Lập luận sắc bén, phong thái tự tin (Nuanced arguments & Academic voice)',
          'Kiểm soát toàn diện Task Achievement / Response: Ý tưởng sâu sắc, dẫn chứng cụ thể thực tế',
          'Không còn bất kỳ lỗi ngữ pháp hoặc dùng sai collocations nào',
        ],
        recommendedHours: 50,
      },
    },
  },
};
