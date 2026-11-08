/**
 * IELTS GO! - Lộ Trình 5 Band Điểm & Kho Giáo Trình Chuẩn (Mode 1)
 * 1. 5 Chặng Đường (Unlockable Stages) từ Mất gốc lên 7.5+
 * 2. 20 Bài học mở khóa theo 20 Chủ điểm thông dụng
 * 3. 3 Nhiệm vụ mỗi bài (Học từ vựng, Luyện câu, Kiểm tra AI)
 * 4. Kho Giáo Trình Chuẩn theo từng chặng và 4 kỹ năng
 */

const ROADMAP_STORAGE_KEY = 'ielts_go_roadmap_progress_v1';

// BẢNG 5 CHẶNG ĐƯỜNG
const ROADMAP_STAGES = [
  {
    id: 1,
    name: 'Chặng 1: Mất Gốc (Foundation)',
    bandTarget: 'Band 0 - 3.5 (A1/A2)',
    icon: '🌱',
    color: '#E03131',
    bgGradient: 'linear-gradient(135deg, #FFF5F5 0%, #FFE3E3 100%)',
    desc: 'Xây dựng phát âm chuẩn 44 âm IPA, 800 từ vựng cốt lõi A1/A2 và các cấu trúc câu đơn giản.',
    lessonRange: [1, 4],
    curriculumTier: 'ZERO_FOUNDATION',
  },
  {
    id: 2,
    name: 'Chặng 2: Sơ Cấp (Pre-Intermediate)',
    bandTarget: 'Band < 4.5 (B1 Pre)',
    icon: '🥉',
    color: '#F08C00',
    bgGradient: 'linear-gradient(135deg, #FFF9DB 0%, #FFF3BF 100%)',
    desc: 'Làm quen cấu trúc đề thi IELTS 4 kỹ năng, nhận diện bẫy Section 1 và nâng vốn từ lên 1500 từ.',
    lessonRange: [5, 8],
    curriculumTier: 'BELOW_4_5',
  },
  {
    id: 3,
    name: 'Chặng 3: Trung Cấp (Intermediate)',
    bandTarget: 'Band 4.5 - 6.0 (B1/B2)',
    icon: '🥈',
    color: '#1971C2',
    bgGradient: 'linear-gradient(135deg, #E7F5FF 0%, #D0EBFF 100%)',
    desc: 'Phương pháp Skimming/Scanning, xử lý bài nghe Section 2-3, viết Task 1 có Overview và câu phức.',
    lessonRange: [9, 12],
    curriculumTier: 'BAND_4_5_TO_6_0',
  },
  {
    id: 4,
    name: 'Chặng 4: Nâng Cao (Upper-Intermediate - Chuẩn Du Học)',
    bandTarget: 'Band 6.0 - 7.5 (B2/C1)',
    icon: '🥇',
    color: '#087F5B',
    bgGradient: 'linear-gradient(135deg, #E6FCF5 0%, #C3FAE8 100%)',
    desc: 'Chinh phục Matching Headings hóc búa, viết Task 2 lập luận đa chiều, Collocations C1 và Part 3.',
    lessonRange: [13, 16],
    curriculumTier: 'BAND_6_0_TO_7_5',
  },
  {
    id: 5,
    name: 'Chặng 5: Chuyên Sâu (Advanced / Expert Master)',
    bandTarget: 'Band 7.5+ (C1/C2)',
    icon: '👑',
    color: '#7048E8',
    bgGradient: 'linear-gradient(135deg, #F3F0FF 0%, #E5DBFF 100%)',
    desc: 'Làm chủ sắc thái ngôn ngữ tinh tế của người bản xứ, giải quyết đề thi thực tế khó nhất Cambridge.',
    lessonRange: [17, 20],
    curriculumTier: 'BAND_7_5_PLUS',
  },
];

// DANH SÁCH 20 BÀI HỌC THEO 20 CHỦ ĐIỂM
const ROADMAP_LESSONS = [
  // CHẶNG 1: MẤT GỐC (BÀI 1 - 4)
  {
    id: 1,
    stageId: 1,
    topicKey: 'routines',
    title: 'Daily Routines & Habits',
    vietnameseTitle: 'Thói Quen Hàng Ngày',
    icon: '⏰',
    bandLevel: 'Band 0 - 3.5',
    vocabItems: [
      { word: 'wake up early', ipa: '/weɪk ʌp ˈɜːli/', meaning: 'Thức dậy sớm', example: 'I always wake up early at 6 AM to review my lessons.' },
      { word: 'daily schedule', ipa: '/ˈdeɪli ˈʃedjuːl/', meaning: 'Lịch trình hàng ngày', example: 'Having a balanced daily schedule helps reduce stress.' },
      { word: 'unwind', ipa: '/ʌnˈwaɪnd/', meaning: 'Thư giãn, xả hơi sau giờ làm', example: 'Listening to soft music is the best way to unwind.' },
      { word: 'punctual', ipa: '/ˈpʌŋktʃuəl/', meaning: 'Đúng giờ', example: 'He is known for being extremely punctual to work.' }
    ],
    grammarTask: {
      instruction: 'Ghép các từ sau thành câu chuẩn ngữ pháp (Thì Hiện Tại Đơn & Trạng từ tần suất):',
      jumbled: ['She', 'usually', 'her', 'reviews', 'vocabulary', 'before', 'breakfast'],
      correctSentence: 'She usually reviews her vocabulary before breakfast',
      explanation: 'Trạng từ tần suất "usually" đứng trước động từ thường "reviews".'
    },
    aiExamTask: {
      question: 'Victoria asks: "What is the very first thing you do when you wake up in the morning?"',
      hint: 'Hãy trả lời 2-3 câu trực tiếp, dùng động từ chỉ thói quen và giải thích lý do.',
      sampleAnswer: 'To be honest, the first thing I do upon waking is drink a tall glass of warm water, which immediately rehydrates my body and prepares my mind for study.'
    }
  },
  {
    id: 2,
    stageId: 1,
    topicKey: 'food',
    title: 'Food & Culinary Traditions',
    vietnameseTitle: 'Ẩm Thực & Bữa Ăn Gia Đình',
    icon: '🍜',
    bandLevel: 'Band 0 - 3.5',
    vocabItems: [
      { word: 'nutritious', ipa: '/njuːˈtrɪʃəs/', meaning: 'Bổ dưỡng, giàu dinh dưỡng', example: 'Home-cooked meals are far more nutritious than fast food.' },
      { word: 'staple food', ipa: '/ˈsteɪpl fuːd/', meaning: 'Lương thực chính', example: 'Rice is the essential staple food across Southeast Asia.' },
      { word: 'dining out', ipa: '/ˈdaɪnɪŋ aʊt/', meaning: 'Đi ăn tiệm, ăn ngoài', example: 'We enjoy dining out at local restaurants on weekends.' },
      { word: 'mouth-watering', ipa: '/ˈmaʊθˌwɔːtərɪŋ/', meaning: 'Ngon chảy nước miếng', example: 'The sizzling beef steak looked absolutely mouth-watering.' }
    ],
    grammarTask: {
      instruction: 'Chọn từ đúng để hoàn thành câu miêu tả ẩm thực:',
      jumbled: ['Traditional', 'Vietnamese', 'Pho', 'is', 'simmered', 'with', 'aromatic', 'spices'],
      correctSentence: 'Traditional Vietnamese Pho is simmered with aromatic spices',
      explanation: 'Câu bị động Hiện tại đơn "is simmered with" dùng để miêu tả quy trình nấu ăn.'
    },
    aiExamTask: {
      question: 'Victoria asks: "Do you prefer eating at home or eating at restaurants? Why?"',
      hint: 'Nêu rõ sở thích và so sánh giữa dinh dưỡng gia đình và sự tiện lợi của nhà hàng.',
      sampleAnswer: 'I definitely prefer home-cooked dishes because they allow me to control fresh ingredients and relish quiet moments with my family.'
    }
  },
  {
    id: 3,
    stageId: 1,
    topicKey: 'friends',
    title: 'Friends & Companionship',
    vietnameseTitle: 'Bạn Bè & Tri Kỷ',
    icon: '🤝',
    bandLevel: 'Band 0 - 3.5',
    vocabItems: [
      { word: 'trustworthy', ipa: '/ˈtrʌstˌwɜːði/', meaning: 'Đáng tin cậy', example: 'A trustworthy friend will always keep your secrets safe.' },
      { word: 'share common interests', ipa: '/ʃeər ˈkɒmən ˈɪntrəsts/', meaning: 'Có chung sở thích', example: 'We bonded immediately because we share common interests in coding.' },
      { word: 'lifelong companion', ipa: '/ˈlaɪflɒŋ kəmˈpænjən/', meaning: 'Người bạn đồng hành cả đời', example: 'My childhood classmate has remained my lifelong companion.' }
    ],
    grammarTask: {
      instruction: 'Sắp xếp lại câu miêu tả tính cách bạn bè:',
      jumbled: ['True', 'friends', 'always', 'support', 'each', 'other', 'through', 'hardships'],
      correctSentence: 'True friends always support each other through hardships',
      explanation: 'Cụm từ "support each other through hardships" diễn đạt sự hỗ trợ lẫn nhau qua gian khó.'
    },
    aiExamTask: {
      question: 'Victoria asks: "What qualities do you value most in a close friend?"',
      hint: 'Đề cập đến lòng trung thực (honesty) và sự thấu hiểu (empathy).',
      sampleAnswer: 'Above all, I value sincerity and empathy because an authentic companion stands by you through both triumphs and tribulations.'
    }
  },
  {
    id: 4,
    stageId: 1,
    topicKey: 'animals',
    title: 'Animals & Wildlife',
    vietnameseTitle: 'Động Vật & Thế Giới Tự Nhiên',
    icon: '🐾',
    bandLevel: 'Band 0 - 3.5',
    vocabItems: [
      { word: 'natural habitat', ipa: '/ˈnætʃrəl ˈhæbɪtæt/', meaning: 'Môi trường sống tự nhiên', example: 'Deforestation destroys the natural habitat of wild primates.' },
      { word: 'endangered species', ipa: '/ɪnˈdeɪndʒəd ˈspiːʃiːz/', meaning: 'Loài có nguy cơ tuyệt chủng', example: 'Giant pandas are protected as an endangered species.' },
      { word: 'affectionate', ipa: '/əˈfekʃənət/', meaning: 'Giàu tình cảm, quấn chủ', example: 'Rescue dogs often become remarkably affectionate.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu so sánh cao nhất về động vật hoang dã:',
      jumbled: ['The', 'blue', 'whale', 'is', 'the', 'largest', 'creature', 'on', 'Earth'],
      correctSentence: 'The blue whale is the largest creature on Earth',
      explanation: 'Cấu trúc so sánh nhất: "the + short adjective + -est".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Why is it crucial for mankind to protect wild animals?"',
      hint: 'Nhắc đến cân bằng sinh thái (ecological balance) và chuỗi thức ăn (food chain).',
      sampleAnswer: 'Protecting wild creatures is vital because apex predators maintain the delicate ecological balance that sustains our entire biosphere.'
    }
  },

  // CHẶNG 2: SƠ CẤP PRE-INTERMEDIATE (BÀI 5 - 8)
  {
    id: 5,
    stageId: 2,
    topicKey: 'shopping',
    title: 'Shopping & Consumer Habits',
    vietnameseTitle: 'Mua Sắm & Tiêu Dùng',
    icon: '🛍️',
    bandLevel: 'Band < 4.5',
    vocabItems: [
      { word: 'impulse purchase', ipa: '/ˈɪmpʌls ˈpɜːtʃəs/', meaning: 'Mua sắm bốc đồng', example: 'Targeted flash sales often lure young buyers into impulse purchases.' },
      { word: 'bargain hunter', ipa: '/ˈbɑːɡɪn ˈhʌntər/', meaning: 'Người săn hàng giảm giá', example: 'She is a savvy bargain hunter who always compares prices.' },
      { word: 'retail therapy', ipa: '/ˈriːteɪl ˈθerəpi/', meaning: 'Mua sắm để giải tỏa tâm lý', example: 'Some people view weekend mall visits as a form of retail therapy.' }
    ],
    grammarTask: {
      instruction: 'Sắp xếp câu điều kiện loại 1 trong tiêu dùng:',
      jumbled: ['If', 'the', 'discount', 'is', 'attractive', 'I', 'will', 'order', 'online'],
      correctSentence: 'If the discount is attractive I will order online',
      explanation: 'Mệnh đề If hiện tại đơn, mệnh đề chính dùng will + V-nguyên thể.'
    },
    aiExamTask: {
      question: 'Victoria asks: "How has e-commerce transformed shopping habits in your country?"',
      hint: 'So sánh giữa tiện lợi khi mua sắm online và trải nghiệm thử đồ trực tiếp tại cửa hàng.',
      sampleAnswer: 'E-commerce platforms like Shopee have made doorstep deliveries ubiquitous, though brick-and-mortar stores still retain value for tactile inspection.'
    }
  },
  {
    id: 6,
    stageId: 2,
    topicKey: 'clothes',
    title: 'Clothes & Personal Style',
    vietnameseTitle: 'Trang Phục & Phong Cách',
    icon: '👗',
    bandLevel: 'Band < 4.5',
    vocabItems: [
      { word: 'casual attire', ipa: '/ˈkæʒuəl əˈtaɪər/', meaning: 'Trang phục thường ngày', example: 'Our company permits smart casual attire on Fridays.' },
      { word: 'bespoke', ipa: '/bɪˈspəʊk/', meaning: 'May đo thủ công riêng', example: 'He wore a bespoke navy suit for his graduation.' },
      { word: 'timeless elegance', ipa: '/ˈtaɪmləs ˈelɪɡəns/', meaning: 'Vẻ thanh lịch vượt thời gian', example: 'A traditional silk Ao Dai radiates timeless elegance.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu chỉ mục đích với "in order to":',
      jumbled: ['People', 'wear', 'formal', 'clothes', 'in', 'order', 'to', 'show', 'respect'],
      correctSentence: 'People wear formal clothes in order to show respect',
      explanation: 'Cấu trúc chỉ mục đích: "in order to + V".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Do you believe traditional attire should still be preserved?"',
      hint: 'Khẳng định giá trị bản sắc văn hóa dân tộc và niềm tự hào truyền thống.',
      sampleAnswer: 'Without doubt, traditional garments embody centuries of craftsmanship and serve as an unmistakable badge of national pride.'
    }
  },
  {
    id: 7,
    stageId: 2,
    topicKey: 'weather',
    title: 'Weather & Seasons',
    vietnameseTitle: 'Thời Tiết & Khí Hậu',
    icon: '🌦️',
    bandLevel: 'Band < 4.5',
    vocabItems: [
      { word: 'torrential downpour', ipa: '/təˈrenʃl ˈdaʊnpɔːr/', meaning: 'Cơn mưa xối xả', example: 'A sudden torrential downpour caused severe localized flooding.' },
      { word: 'crisp autumn breeze', ipa: '/krɪsp ˈɔːtəm briːz/', meaning: 'Làn gió thu se lạnh mát mẻ', example: 'Walking under the crisp autumn breeze invigorates my spirit.' },
      { word: 'meteorological forecast', ipa: '/ˌmiːtiərəˈlɒdʒɪkl ˈfɔːkɑːst/', meaning: 'Dự báo khí tượng', example: 'Farmers rely heavily on accurate meteorological forecasts.' }
    ],
    grammarTask: {
      instruction: 'Sắp xếp câu điều kiện chỉ nguyên nhân thời tiết:',
      jumbled: ['When', 'it', 'rains', 'heavily', 'traffic', 'jams', 'occur', 'frequently'],
      correctSentence: 'When it rains heavily traffic jams occur frequently',
      explanation: 'Mệnh đề trạng ngữ chỉ thời gian với "When".'
    },
    aiExamTask: {
      question: 'Victoria asks: "What is your favorite type of weather and how does it affect your mood?"',
      hint: 'Miêu tả thời tiết mát mẻ mùa thu hoặc nắng ấm mùa xuân và tác động tích cực đến tâm trạng.',
      sampleAnswer: 'I have a profound fondness for crisp, sunlit autumn days, as the gentle temperature creates an ideal ambience for reflective reading.'
    }
  },
  {
    id: 8,
    stageId: 2,
    topicKey: 'sport',
    title: 'Sport & Physical Fitness',
    vietnameseTitle: 'Thể Thao & Rèn Luyện Sức Khỏe',
    icon: '⚽',
    bandLevel: 'Band < 4.5',
    vocabItems: [
      { word: 'cardiovascular stamina', ipa: '/ˌkɑːdiəʊˈvæskjələr ˈstæmɪnə/', meaning: 'Sức bền tim mạch', example: 'Regular swimming significantly enhances cardiovascular stamina.' },
      { word: 'sedentary lifestyle', ipa: '/ˈsedntri ˈlaɪfstaɪl/', meaning: 'Lối sống thụ động lười vận động', example: 'Desk workers must combat the risks of a sedentary lifestyle.' },
      { word: 'sportsmanship', ipa: '/ˈspɔːtsmənʃɪp/', meaning: 'Tinh thần thể thao thượng võ', example: 'True champions display gracious sportsmanship in defeat.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu với động từ khuyết thiếu Modals:',
      jumbled: ['Students', 'should', 'exercise', 'regularly', 'to', 'maintain', 'optimal', 'health'],
      correctSentence: 'Students should exercise regularly to maintain optimal health',
      explanation: 'Khuyên bảo với "should + V-nguyên thể".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Why do some people struggle to maintain an exercise routine?"',
      hint: 'Đề cập đến áp lực công việc, thiếu kỷ luật tự giác và sự cám dỗ của màn hình số.',
      sampleAnswer: 'Most individuals falter due to punishing work schedules and instant digital gratification, which erode long-term self-discipline.'
    }
  },

  // CHẶNG 3: TRUNG CẤP INTERMEDIATE (BÀI 9 - 12)
  {
    id: 9,
    stageId: 3,
    topicKey: 'holidays',
    title: 'Holidays & Travel',
    vietnameseTitle: 'Kỳ Nghỉ & Du Lịch Khám Phá',
    icon: '✈️',
    bandLevel: 'Band 4.5 - 6.0',
    vocabItems: [
      { word: 'broaden horizons', ipa: '/ˈbrɔːdn həˈraɪznz/', meaning: 'Mở rộng tầm mắt', example: 'Immersing oneself in foreign cultures unfailingly broadens horizons.' },
      { word: 'off-the-beaten-track', ipa: '/ˌɒf ðə ˈbiːtn ˈtræk/', meaning: 'Hoang sơ, ít người đặt chân đến', example: 'We ventured off-the-beaten-track to discover pristine mountain hamlets.' },
      { word: 'overtourism', ipa: '/ˌəʊvəˈtʊərɪzəm/', meaning: 'Vấn nạn quá tải du lịch', example: 'Historic cities are enforcing visitor quotas to mitigate overtourism.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu Hiện tại hoàn thành diễn tả trải nghiệm:',
      jumbled: ['I', 'have', 'traveled', 'to', 'numerous', 'heritage', 'sites', 'across', 'Vietnam'],
      correctSentence: 'I have traveled to numerous heritage sites across Vietnam',
      explanation: 'Hiện tại hoàn thành "have + V3" diễn tả trải nghiệm cho đến hiện tại.'
    },
    aiExamTask: {
      question: 'Victoria asks: "What are the negative ramifications of mass tourism on local communities?"',
      hint: 'Phân tích áp lực rác thải, biến dạng văn hóa bản địa và giá sinh hoạt tăng cao.',
      sampleAnswer: 'Mass tourism frequently inflates local living costs, commercializes sacred folk traditions, and strains municipal infrastructure beyond its capacity.'
    }
  },
  {
    id: 10,
    stageId: 3,
    topicKey: 'celebrations',
    title: 'Celebrations & Festivals',
    vietnameseTitle: 'Lễ Hội & Ngày Kỷ Niệm',
    icon: '🎉',
    bandLevel: 'Band 4.5 - 6.0',
    vocabItems: [
      { word: 'reaffirm cultural roots', ipa: '/ˌriːəˈfɜːm ˈkʌltʃərəl ruːts/', meaning: 'Gắn kết lại cội nguồn văn hóa', example: 'Annual festivals allow overseas citizens to reaffirm cultural roots.' },
      { word: 'festive ambience', ipa: '/ˈfestɪv ˈæmbiəns/', meaning: 'Không khí lễ hội náo nức', example: 'The illuminated street lanterns generated an exhilarating festive ambience.' },
      { word: 'ancestral veneration', ipa: '/ænˈsestrəl ˌvenəˈreɪʃn/', meaning: 'Sự tôn kính tổ tiên', example: 'Tet holiday centers upon deep ancestral veneration and filial piety.' }
    ],
    grammarTask: {
      instruction: 'Sắp xếp câu bị động trong văn hóa:',
      jumbled: ['Traditional', 'rituals', 'are', 'faithfully', 'preserved', 'by', 'indigenous', 'elders'],
      correctSentence: 'Traditional rituals are faithfully preserved by indigenous elders',
      explanation: 'Bị động Hiện tại đơn "are preserved by" nhấn mạnh hành động bảo tồn.'
    },
    aiExamTask: {
      question: 'Victoria asks: "Has the commercialization of modern holidays compromised their genuine spirit?"',
      hint: 'Phân tích áp lực chi tiêu quà tặng so với giá trị gắn kết tâm linh và tình thân.',
      sampleAnswer: 'Undeniably, aggressive retail marketing has shifted the focus toward conspicuous consumption, somewhat overshadowing heartfelt familial introspection.'
    }
  },
  {
    id: 11,
    stageId: 3,
    topicKey: 'music',
    title: 'Music & Melodic Harmony',
    vietnameseTitle: 'Âm Nhạc & Giai Điệu',
    icon: '🎵',
    bandLevel: 'Band 4.5 - 6.0',
    vocabItems: [
      { word: 'therapeutic catharsis', ipa: '/ˌθerəˈpjuːtɪk kəˈθɑːsɪs/', meaning: 'Sự giải tỏa cảm xúc trị liệu', example: 'Listening to classical sonatas provides immense therapeutic catharsis.' },
      { word: 'melodic harmony', ipa: '/məˈlɒdɪk ˈhɑːməni/', meaning: 'Sự hòa hợp giai điệu', example: 'The string quartet mesmerized the auditorium with melodic harmony.' },
      { word: 'resonate with', ipa: '/ˈrezəneɪt wɪð/', meaning: 'Tạo được tiếng vang, đồng cảm', example: 'Poignant folk ballads deeply resonate with working-class nostalgia.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu với Mệnh đề quan hệ xác định:',
      jumbled: ['The', 'melody', 'which', 'he', 'composed', 'brought', 'listeners', 'to', 'tears'],
      correctSentence: 'The melody which he composed brought listeners to tears',
      explanation: 'Mệnh đề quan hệ "which he composed" bổ nghĩa cho danh từ "melody".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Can algorithmic AI ever replicate the profound emotional depth of human composers?"',
      hint: 'Khẳng định AI tổng hợp được cấu trúc âm học nhưng thiếu vắng trải nghiệm vui buồn nhân sinh.',
      sampleAnswer: 'While algorithms mimic acoustic syntax proficiently, they lack lived vulnerability and grief—the very wellsprings of transcendent artistic resonance.'
    }
  },
  {
    id: 12,
    stageId: 3,
    topicKey: 'transport',
    title: 'Transport & Urban Mobility',
    vietnameseTitle: 'Giao Thông & Di Chuyển Đô Thị',
    icon: '🚆',
    bandLevel: 'Band 4.5 - 6.0',
    vocabItems: [
      { word: 'vehicular gridlock', ipa: '/viˈhɪkjələr ˈɡrɪdlɒk/', meaning: 'Ùn tắc giao thông tê liệt', example: 'Metropolitan centers face crippling vehicular gridlock during peak hours.' },
      { word: 'sustainable urban mobility', ipa: '/səˈsteɪnəbl ˈɜːbən məʊˈbɪləti/', meaning: 'Giao thông đô thị bền vững', example: 'Prioritizing electric rail transit is essential for sustainable urban mobility.' },
      { word: 'punctual departure', ipa: '/ˈpʌŋktʃuəl dɪˈpɑːtʃər/', meaning: 'Khởi hành đúng giờ', example: 'Commuters praise the elevated metro for its punctual departures.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu so sánh kép "The more... the more":',
      jumbled: ['The', 'more', 'people', 'use', 'subways', 'the', 'less', 'traffic', 'clogs', 'streets'],
      correctSentence: 'The more people use subways the less traffic clogs streets',
      explanation: 'Cấu trúc so sánh lũy tiến: "The more + S + V, the less + S + V".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Should municipal governments levy congestion taxes on private vehicles entering city centers?"',
      hint: 'Phân tích bài học từ London/Singapore: Giảm ô nhiễm và tạo ngân sách tài trợ xe buýt điện.',
      sampleAnswer: 'Implementing cordon congestion pricing disincentivizes unnecessary car trips while generating ring-fenced revenues to upgrade green public transit.'
    }
  },

  // CHẶNG 4: NÂNG CAO UPPER-INTERMEDIATE (BÀI 13 - 16 - ĐẠT CHUẨN DU HỌC)
  {
    id: 13,
    stageId: 4,
    topicKey: 'technology',
    title: 'Technology & Digital Innovation',
    vietnameseTitle: 'Công Nghệ & Đổi Mới Số',
    icon: '💻',
    bandLevel: 'Band 6.0 - 7.5',
    vocabItems: [
      { word: 'cutting-edge technology', ipa: '/ˌkʌtɪŋ ˈedʒ tekˈnɒlədʒi/', meaning: 'Công nghệ tiên tiến mũi nhọn', example: 'Researchers apply cutting-edge technology to diagnose rare oncological pathologies.' },
      { word: 'digital divide', ipa: '/ˈdɪdʒɪtl dɪˈvaɪd/', meaning: 'Khoảng cách công nghệ số', example: 'Targeted subsidies are imperative to bridge the educational digital divide.' },
      { word: 'technostress', ipa: '/ˈteknəʊstres/', meaning: 'Áp lực căng thẳng do thiết bị công nghệ', example: 'Incessant email notifications induce severe workplace technostress.' },
      { word: 'paradigm shift', ipa: '/ˈpærədaɪm ʃɪft/', meaning: 'Sự thay đổi mô thức căn bản', example: 'Generative AI heralds a monumental paradigm shift in software development.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu chẻ Cleft Sentence nhấn mạnh chủ ngữ:',
      jumbled: ['It', 'is', 'technological', 'innovation', 'that', 'accelerates', 'societal', 'evolution'],
      correctSentence: 'It is technological innovation that accelerates societal evolution',
      explanation: 'Câu chẻ nhấn mạnh: "It is + X + that + V...".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Will autonomous AI systems render human cognitive labor redundant?"',
      hint: 'Bàn về việc tự động hóa các tác vụ lặp đi lặp lại nhưng tăng cường vai trò sáng tạo và tư duy đạo đức.',
      sampleAnswer: 'Rather than outright replacement, AI serves as an augmentative amplifier—automating procedural tasks while elevating the premium on human ethics, critical inquiry and empathy.'
    }
  },
  {
    id: 14,
    stageId: 4,
    topicKey: 'environment',
    title: 'Environment & Ecological Fallout',
    vietnameseTitle: 'Môi Trường & Biến Đổi Khí Hậu',
    icon: '🌿',
    bandLevel: 'Band 6.0 - 7.5',
    vocabItems: [
      { word: 'catastrophic ecological fallout', ipa: '/ˌkætəˈstrɒfɪk ˌiːkəˈlɒdʒɪkl ˈfɔːlaʊt/', meaning: 'Hậu quả sinh thái thảm khốc', example: 'Failing to curb carbon emissions will induce catastrophic ecological fallout.' },
      { word: 'carbon footprint', ipa: '/ˈkɑːbən ˈfʊtprɪnt/', meaning: 'Dấu chân carbon', example: 'Adopting plant-based diets drastically shrinks one’s personal carbon footprint.' },
      { word: 'environmental stewardship', ipa: '/ɪnˌvaɪrənˈmentl ˈstjuːədʃɪp/', meaning: 'Trách nhiệm quản lý và bảo vệ môi trường', example: 'Corporations must embed environmental stewardship into corporate governance.' }
    ],
    grammarTask: {
      instruction: 'Sắp xếp câu điều kiện loại 3 diễn tả tiếc nuối trong quá khứ:',
      jumbled: ['Had', 'governments', 'acted', 'sooner', 'biodiversity', 'loss', 'would', 'have', 'been', 'lessened'],
      correctSentence: 'Had governments acted sooner biodiversity loss would have been lessened',
      explanation: 'Đảo ngữ câu điều kiện loại 3: "Had + S + V3, S + would have + V3".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Should ecological mitigation rest on individual habits or corporate accountability?"',
      hint: 'Phân tích số liệu 100 tập đoàn phát thải 70% khí nhà kính; kết luận vai trò quyết định của luật pháp.',
      sampleAnswer: 'While civic conservation matters, genuine decarbonization requires holding fossil fuel conglomerates accountable through stringent carbon pricing and mandatory renewable transition targets.'
    }
  },
  {
    id: 15,
    stageId: 4,
    topicKey: 'social_media',
    title: 'Social Media & Echo Chambers',
    vietnameseTitle: 'Mạng Xã Hội & Phân Hóa Dư Luận',
    icon: '📱',
    bandLevel: 'Band 6.0 - 7.5',
    vocabItems: [
      { word: 'algorithmic echo chamber', ipa: '/ˌælɡəˈrɪðmɪk ˈekəʊ ˈtʃeɪmbər/', meaning: 'Buồng vang thông tin thuật toán', example: 'Recommendation feeds trap citizens within ideological algorithmic echo chambers.' },
      { word: 'surveillance capitalism', ipa: '/sɜːˈveɪləns ˈkæpɪtəlɪzəm/', meaning: 'Chủ nghĩa tư bản giám sát', example: 'Platforms monetize user attention loops under the tenets of surveillance capitalism.' },
      { word: 'information literacy', ipa: '/ˌɪnfəˈmeɪʃn ˈlɪtərəsi/', meaning: 'Năng lực thẩm định thông tin', example: 'Schools must cultivate robust information literacy to combat disinformation.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu với Mệnh đề phân từ (Participle Clause):',
      jumbled: ['Consuming', 'unfiltered', 'sensational', 'news', 'users', 'become', 'increasingly', 'polarized'],
      correctSentence: 'Consuming unfiltered sensational news users become increasingly polarized',
      explanation: 'Mệnh đề phân từ V-ing rút gọn trạng ngữ chỉ thời gian/nguyên nhân.'
    },
    aiExamTask: {
      question: 'Victoria asks: "How do social platforms weaponize outrage to maximize screen engagement?"',
      hint: 'Phân tích cơ chế thuật toán ưu tiên nội dung gây tranh cãi vì kích thích tương tác bình luận cao.',
      sampleAnswer: 'Algorithms are deliberately calibrated to amplify emotionally incendiary rhetoric because moral outrage generates prolonged dwell times and lucrative advertising impressions.'
    }
  },
  {
    id: 16,
    stageId: 4,
    topicKey: 'art',
    title: 'Art, Aesthetics & Society',
    vietnameseTitle: 'Nghệ Thuật & Tư Tưởng Thẩm Mỹ',
    icon: '🎨',
    bandLevel: 'Band 6.0 - 7.5',
    vocabItems: [
      { word: 'aesthetic appreciation', ipa: '/iːsˈθetɪk əˌpriːʃiˈeɪʃn/', meaning: 'Sự trân trọng thẩm mỹ', example: 'Art galleries provide a contemplative sanctuary for aesthetic appreciation.' },
      { word: 'evoke profound emotion', ipa: '/ɪˈvəʊk prəˈfaʊnd ɪˈməʊʃn/', meaning: 'Gợi lên cảm xúc sâu lắng', example: 'Picasso’s Guernica continues to evoke profound emotion regarding war horrors.' },
      { word: 'subsidize fine arts', ipa: '/ˈsʌbsɪdaɪz faɪn ɑːts/', meaning: 'Trợ cấp tài chính cho nghệ thuật', example: 'Democratic societies ought to subsidize fine arts to ensure universal cultural access.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu Đảo ngữ với "Not only... but also":',
      jumbled: ['Not', 'only', 'does', 'art', 'inspire', 'creativity', 'but', 'it', 'also', 'heals', 'trauma'],
      correctSentence: 'Not only does art inspire creativity but it also heals trauma',
      explanation: 'Đảo ngữ phủ định: "Not only + trợ động từ + S + V, but S + also + V".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Should public tax revenues fund avant-garde art during fiscal austerity?"',
      hint: 'Khẳng định nghệ thuật không phải là xa xỉ phẩm mà là tấm gương phản chiếu tâm hồn và sự tự do của quốc gia.',
      sampleAnswer: 'Art is not a dispensable luxury; public funding preserves cultural heritage and nurtures the critical, non-conformist thinking indispensable for societal innovation.'
    }
  },

  // CHẶNG 5: CHUYÊN SÂU ADVANCED / EXPERT (BÀI 17 - 20)
  {
    id: 17,
    stageId: 5,
    topicKey: 'science',
    title: 'Science, Ethics & Genetic Frontiers',
    vietnameseTitle: 'Khoa Học Đột Phá & Giới Hạn Đạo Đức',
    icon: '🔬',
    bandLevel: 'Band 7.5+',
    vocabItems: [
      { word: 'bioethical dilemmas', ipa: '/ˌbaɪəʊˈeθɪkl daɪˈleməz/', meaning: 'Những tình thế tiến thoái lưỡng nan sinh đạo đức', example: 'CRISPR germline editing generates unprecedented bioethical dilemmas.' },
      { word: 'empirical corroboration', ipa: '/ɪmˈpɪrɪkl kəˌrɒbəˈreɪʃn/', meaning: 'Sự kiểm chứng thực nghiệm chặt chẽ', example: 'Scientific hypotheses require rigorous empirical corroboration before peer acceptance.' },
      { word: 'unravel mysteries', ipa: '/ʌnˈrævl ˈmɪstriz/', meaning: 'Giải mã những bí ẩn hóc búa', example: 'Quantum computing unlocks the potential to unravel mysteries of molecular folding.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu Danh từ hóa học thuật (Nominalization):',
      jumbled: ['The', 'unprecedented', 'acceleration', 'of', 'genetic', 'engineering', 'warrants', 'global', 'regulation'],
      correctSentence: 'The unprecedented acceleration of genetic engineering warrants global regulation',
      explanation: 'Sử dụng danh từ hóa "The unprecedented acceleration of..." thay vì mệnh đề câu thường.'
    },
    aiExamTask: {
      question: 'Victoria asks: "Should the scientific pursuit of human genetic enhancement be strictly outlawed globally?"',
      hint: 'Phân tích nguy cơ tạo ra sự bất bình đẳng sinh học giai cấp (genetic caste system) đối lập tiềm năng chữa bệnh nan y.',
      sampleAnswer: 'Unfettered genetic enhancement threatens to entrench socio-economic stratification into permanent biological castes, demanding stringent international oversight while preserving therapeutic gene therapies.'
    }
  },
  {
    id: 18,
    stageId: 5,
    topicKey: 'nation_culture',
    title: 'Nationhood, Heritage & Globalization',
    vietnameseTitle: 'Bản Sắc Văn Hóa & Toàn Cầu Hóa',
    icon: '🏛️',
    bandLevel: 'Band 7.5+',
    vocabItems: [
      { word: 'cultural homogenization', ipa: '/ˈkʌltʃərəl həˌmɒdʒənaɪˈzeɪʃn/', meaning: 'Sự đồng nhất hóa văn hóa', example: 'Transnational corporate brands induce rapid cultural homogenization worldwide.' },
      { word: 'indigenous folklore', ipa: '/ɪnˈdɪdʒənəs ˈfəʊklɔːr/', meaning: 'Văn hóa dân gian bản địa', example: 'Digitizing oral histories safeguards fragile indigenous folklore from oblivion.' },
      { word: 'unyielding resilience', ipa: '/ʌnˈjiːldɪŋ rɪˈzɪliəns/', meaning: 'Sức bền bỉ quật cường không lay chuyển', example: 'Generations of highlanders display unyielding resilience in the face of climatic adversity.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu Thức giả định Subjunctive:',
      jumbled: ['It', 'is', 'imperative', 'that', 'cultural', 'heritage', 'be', 'preserved', 'for', 'posterity'],
      correctSentence: 'It is imperative that cultural heritage be preserved for posterity',
      explanation: 'Thức giả định: "It is imperative that + S + (should) V-bare".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Does globalization inexorably dismantle national identity, or synthesize richer hybrid cultures?"',
      hint: 'Luận điểm cân bằng: Vừa có rủi ro lu mờ ngôn ngữ thiểu số, vừa mở ra cơ hội giao thoa và quảng bá văn hóa bản sắc.',
      sampleAnswer: 'Globalization represents a dialectical continuum; while commercial pressures risk diluting regional vernaculars, it simultaneously equips marginalized communities to project their distinct heritage onto a global stage.'
    }
  },
  {
    id: 19,
    stageId: 5,
    topicKey: 'famous_people',
    title: 'Public Figures & Moral Responsibility',
    vietnameseTitle: 'Người Nổi Tiếng & Trách Nhiệm Xã Hội',
    icon: '🌟',
    bandLevel: 'Band 7.5+',
    vocabItems: [
      { word: 'paragon of integrity', ipa: '/ˈpærəɡən əv ɪnˈteɡrəti/', meaning: 'Hình mẫu mực thước của sự liêm chính', example: 'Nelson Mandela is internationally revered as a timeless paragon of integrity.' },
      { word: 'scrutinize conduct', ipa: '/ˈskruːtənaɪz ˈkɒndʌkt/', meaning: 'Soi xét nghiêm khắc hành vi đạo đức', example: 'The press tirelessly scrutinizes the public conduct of prominent political leaders.' },
      { word: 'philanthropic stewardship', ipa: '/ˌfɪlənˈθrɒpɪk ˈstjuːədʃɪp/', meaning: 'Trách nhiệm từ thiện bác ái', example: 'Tech billionaires should channel capital into philanthropic stewardship to eradicate endemic diseases.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu Đảo ngữ điều kiện loại 2:',
      jumbled: ['Were', 'celebrities', 'to', 'champion', 'ecological', 'causes', 'youth', 'would', 'swiftly', 'emulate'],
      correctSentence: 'Were celebrities to champion ecological causes youth would swiftly emulate',
      explanation: 'Đảo ngữ câu điều kiện loại 2: "Were + S + to-V, S + would + V".'
    },
    aiExamTask: {
      question: 'Victoria asks: "Do celebrities possess an inherent ethical obligation to leverage their influence for public welfare?"',
      hint: 'Phân tích mối tương quan giữa quyền lực truyền thông to lớn và trách nhiệm xã hội tương xứng.',
      sampleAnswer: 'Given that public prominence is bestowed by collective societal attention, prominent figures possess a moral imperative not to remain aloof from the pressing existential challenges of their era.'
    }
  },
  {
    id: 20,
    stageId: 5,
    topicKey: 'study',
    title: 'Epistemology & Academic Inquiry',
    vietnameseTitle: 'Học Thuật Đại Học & Tư Duy Đỉnh Cao',
    icon: '🎓',
    bandLevel: 'Band 7.5+',
    vocabItems: [
      { word: 'intellectual rigor', ipa: '/ˌɪntəˈlektʃuəl ˈrɪɡər/', meaning: 'Sự nghiêm cẩn về mặt học thuật', example: 'Doctoral dissertations demand uncompromising intellectual rigor and original synthesis.' },
      { word: 'deconstruct cognitive biases', ipa: '/ˌdiːkənˈstrʌkt ˈkɒɡnətɪv ˈbaɪəsɪz/', meaning: 'Giải cấu trúc các thiên kiến nhận thức', example: 'Critical philosophy trains students to deconstruct cognitive biases in empirical arguments.' },
      { word: 'interdisciplinary synthesis', ipa: '/ˌɪntədɪsəˈplɪnəri ˈsɪnθəsɪs/', meaning: 'Sự tổng hợp liên ngành sâu sắc', example: 'Breakthrough innovations emerge from interdisciplinary synthesis between computer science and ethics.' }
    ],
    grammarTask: {
      instruction: 'Ghép câu lập luận nâng cao với Mệnh đề nhượng bộ phức hợp:',
      jumbled: ['Notwithstanding', 'technological', 'disruption', 'foundational', 'critical', 'inquiry', 'remains', 'irreplaceable'],
      correctSentence: 'Notwithstanding technological disruption foundational critical inquiry remains irreplaceable',
      explanation: 'Giới từ học thuật "Notwithstanding" = Mặc dù, bất chấp.'
    },
    aiExamTask: {
      question: 'Victoria asks: "What constitutes the ultimate raison d\'être of higher tertiary education in an age of automated cognition?"',
      hint: 'Khẳng định giáo dục đại học không chỉ là trường đào tạo nghề mà là nơi khai phóng tư duy đạo đức và tinh thần truy cầu chân lý.',
      sampleAnswer: 'The ultimate purpose of higher education transcends vocational preparation; it is the sacred crucible for cultivating ethical reasoning, intellectual humility, and the courageous pursuit of truth.'
    }
  }
];

// DANH MỤC GIÁO TRÌNH CHUẨN ĐƯỢC PHÂN THEO 5 CHẶNG & 4 KỸ NĂNG
const CURRICULUM_DATABASE = {
  ZERO_FOUNDATION: [
    { title: 'Basic Tactics for Listening (3rd Ed)', skill: 'LISTENING', author: 'Jack C. Richards - Oxford', desc: 'Giáo trình luyện nghe căn bản nhất từ phát âm chữ cái, số đếm đến các hội thoại ngắn hàng ngày.', key: '24 bài học thực tế, luyện nghe chính tả số điện thoại, giá tiền, ngày tháng.' },
    { title: 'Listen Carefully', skill: 'LISTENING', author: 'Jack C. Richards - Oxford', desc: '15 bài thực hành nghe cơ bản tập trung phân biệt âm và nhận diện thông tin sinh hoạt.', key: 'Bài tập ngắn, điền từ đơn, giọng đọc chậm rãi phát âm cực chuẩn.' },
    { title: 'English Unlimited A1 / A2 (Starter)', skill: 'ALL', author: 'Cambridge University Press', desc: 'Xây dựng nền móng ngữ pháp 8 thì cơ bản, 800 từ vựng cốt lõi và phản xạ giao tiếp quốc tế từ số 0.', key: 'Hình ảnh minh họa trực quan sinh động, giải thích ngữ pháp vỡ lòng.' },
    { title: 'English Pronunciation in Use (Elementary)', skill: 'SPEAKING', author: 'Cambridge University Press', desc: 'Chuẩn hóa 44 âm quốc tế IPA, nguyên âm đơn, nguyên âm đôi và phụ âm bật hơi.', key: 'Sửa triệt để tật nuốt âm đuôi /s/, /z/, /ed/, chỉ dẫn khẩu hình chuẩn.' }
  ],
  BELOW_4_5: [
    { title: 'Developing Tactics for Listening', skill: 'LISTENING', author: 'Jack C. Richards - Oxford', desc: 'Nâng cao tốc độ nghe hiểu thông tin chi tiết, bẫy đổi ý và số liệu giao dịch.', key: 'Nghe hội thoại nơi làm việc, sân bay, đặt phòng khách sạn.' },
    { title: 'Intensive Listening for IELTS', skill: 'LISTENING', author: 'Beijing Language & Culture Univ', desc: 'Luyện nghe sâu các dạng bài chính tả, điền biểu bảng và bản đồ Section 1 & 2.', key: 'Có audio chi tiết từng dạng câu hỏi Cambridge.' },
    { title: 'Basic IELTS Series (4 Kỹ Năng)', skill: 'ALL', author: 'Li Ya Bin - BLCU', desc: 'Bộ sách vỡ lòng được thiết kế theo cấu trúc bài thi IELTS nhưng ở mức độ câu đơn giản.', key: 'Làm quen định dạng Section 1 Listening và Part 1 Speaking.' },
    { title: 'Bridge to IELTS 3.5 - 4.5', skill: 'ALL', author: 'National Geographic / Cengage', desc: 'Cầu nối vững chắc đưa học viên từ sơ cấp tiếp cận với format đề thi IELTS 4 kỹ năng.', key: 'Chủ đề gắn liền thực tế: Văn hóa, Du lịch, Môi trường.' },
    { title: 'Get Ready for IELTS (4 Kỹ Năng)', skill: 'ALL', author: 'Collins English for Exams', desc: 'Bộ 4 cuốn cẩm nang kinh điển của Collins dành riêng cho người bắt đầu luyện đề.', key: 'Chỉ dẫn mẹo làm bài Exam tips và bóc tách lỗi Exam watch.' },
    { title: 'Succeed in IELTS Speaking', skill: 'SPEAKING', author: 'Andrew Betsis & Lawrence Mamas', desc: '10 chủ đề nói thông dụng nhất kèm bài mẫu Part 1 và từ vựng mở rộng câu trả lời.', key: 'Bài mẫu âm thanh và hướng dẫn triển khai ý tưởng bám sát tiêu chí.' }
  ],
  BAND_4_5_TO_6_0: [
    { title: 'Focus On Academic Skills for IELTS', skill: 'ALL', author: 'Terry Morgan - Longman Pearson', desc: 'Rèn luyện các kỹ năng học thuật trọng tâm cho môi trường đại học.', key: 'Phân tích đồ thị, lập luận đoạn văn và kỹ thuật Note-taking.' },
    { title: 'Complete IELTS Bands 4.0 - 5.0', skill: 'ALL', author: 'Guy Brook-Hart - Cambridge', desc: 'Giáo trình toàn diện kết hợp luyện kỹ năng và nâng cấp từ vựng học thuật theo chủ điểm.', key: '10 units chuyên sâu với bài tập chuẩn đề thi thật.' },
    { title: 'The Official Cambridge Guide to IELTS', skill: 'ALL', author: 'Cambridge English', desc: 'Cuốn cẩm nang chính thức toàn diện nhất từ chính đơn vị khảo thí Cambridge.', key: 'Chiến thuật giải quyết mọi dạng câu hỏi 4 kỹ năng kèm 8 bài Test đầy đủ.' },
    { title: 'Mindset for IELTS Level 1', skill: 'ALL', author: 'Cambridge University Press', desc: 'Rèn luyện tư duy làm bài thi và làm quen công nghệ thi trên máy tính.', key: 'Học chiến thuật Skimming/Scanning, xử lý bài nghe Section 2.' },
    { title: 'Collins for IELTS Series (Reading, Writing, Listening, Speaking)', skill: 'ALL', author: 'Collins COBUILD', desc: 'Bộ sách trứ danh giúp thí sinh phá vỡ rào cản band 5.0 để tiến thẳng lên 6.0.', key: 'Phân đoạn bài viết Task 1 & 2 chuẩn mẫu, bài tập Collocations theo chủ đề.' },
    { title: 'Hackers IELTS (Listening & Reading)', skill: 'ALL', author: 'David Cho - Hackers', desc: 'Giải nghĩa bẫy đề thi và hệ thống từ vựng cực kỳ logic rất nổi tiếng tại Châu Á.', key: 'Bảng tổng hợp từ đồng nghĩa Paraphrase bẫy trong đề thi.' },
    { title: 'Barron\'s Writing for IELTS', skill: 'WRITING', author: 'Lin Lougheed - Barron\'s', desc: 'Hướng dẫn cấu trúc câu mạch lạc và cách tổ chức ý tưởng bài viết mạch lạc.', key: 'Chiến lược phát triển luận điểm Task 2 logic, tránh lỗi cụt ý.' },
    { title: 'Marvellous Techniques for IELTS Writing', skill: 'WRITING', author: 'Yang Fan', desc: 'Tuyển tập các phương pháp viết câu đa dạng và các cụm từ nối ăn điểm.', key: 'Cách dùng liên từ linh hoạt và các mẫu câu so sánh số liệu Task 1 đỉnh cao.' }
  ],
  BAND_6_0_TO_7_5: [
    { title: 'IELTS Advantage (Writing, Reading, Speaking & Listening)', skill: 'ALL', author: 'Richard Brown, Lewis Richards - Delta', desc: 'Giáo trình bậc thầy hướng dẫn từng bước viết bài luận Task 2 đạt band 7.0+ và Part 3 Speaking.', key: 'Tuyển tập bài mẫu band 7.5-8.0 kèm phân tích của giám khảo Cambridge.' },
    { title: 'Complete IELTS Bands 5.0 - 6.5', skill: 'ALL', author: 'Cambridge University Press', desc: 'Nâng tầm kỹ năng học thuật cho học viên có nguyện vọng du học đại học hoặc thạc sĩ.', key: 'Chiến thuật xử lý Section 4 bài giảng đại học và Matching Headings hóc búa.' },
    { title: 'Mission IELTS 1 Academic', skill: 'ALL', author: 'Bob Obee - Express Publishing', desc: 'Giáo trình học thuật cao cấp cung cấp kiến thức ngôn ngữ học và các bài tập tổng hợp.', key: 'Phát triển tư duy phản biện và vốn từ vựng học thuật C1.' },
    { title: 'Mindset for IELTS Level 2', skill: 'ALL', author: 'Cambridge University Press', desc: 'Tối ưu hóa phản xạ tư duy phản biện, làm chủ kỹ năng tự đánh giá và sửa lỗi.', key: 'Đề bài mang tính thời sự, khoa học và triết lý xã hội sâu sắc.' },
    { title: 'Target Band 7: How to Maximize Your Score', skill: 'ALL', author: 'Simone Braverman - IELTS-Blog', desc: 'Chiến lược quản lý thời gian cực kỳ hiệu quả để bứt phá từ 6.0 chạm mốc 7.0+.', key: 'Kinh nghiệm thực chiến, giải quyết áp lực thời gian trong phòng thi.' },
    { title: 'Cambridge IELTS Trainer (1 & 2)', skill: 'ALL', author: 'Louise Hashemi - Cambridge', desc: '6 bài test hoàn chỉnh với 2 bài đầu tiên có giáo viên hướng dẫn từng bước.', key: 'Độ khó tương đương hoặc nhỉnh hơn đề thi thật một chút.' },
    { title: 'IELTS Practice Tests Plus (Series 1, 2, 3)', skill: 'ALL', author: 'Vanessa Jakeman - Pearson', desc: 'Bộ sách luyện đề có độ khó cao, giải thích đáp án chi tiết và chỉ rõ bẫy.', key: 'Bẫy đề thi Reading và Listening cực kỳ tinh tế và sắc bén.' },
    { title: '31 High-scoring Formulas for IELTS Speaking', skill: 'SPEAKING', author: 'Oliver Davies', desc: '31 công thức ăn điểm Part 1, 2, 3 với cấu trúc diễn đạt tự nhiên chuẩn bản xứ.', key: 'Các cấu trúc mở đầu, kéo dài câu trả lời và từ nối ăn điểm Fluency.' }
  ],
  BAND_7_5_PLUS: [
    { title: 'Complete IELTS Bands 6.5 - 7.5', skill: 'ALL', author: 'Guy Brook-Hart - Cambridge', desc: 'Cấp độ cao nhất đưa học viên tiếp cận bài thi với phong thái chuyên gia.', key: 'Phân tích các bài luận Task 2 đạt chuẩn Band 8.5-9.0.' },
    { title: 'Mindset for IELTS Level 3', skill: 'ALL', author: 'Cambridge University Press', desc: 'Giáo trình tinh hoa của Cambridge cho học viên săn học bổng toàn phần.', key: 'Kho từ vựng C2 chuyên sâu về Triết học, Trí tuệ nhân tạo, Kinh tế vĩ mô.' },
    { title: 'Mission IELTS 2 Academic', skill: 'ALL', author: 'Bob Obee - Express Publishing', desc: 'Đòi hỏi sự am hiểu sâu rộng về các luận đề học thuật phức tạp.', key: 'Luyện kỹ năng tổng hợp và viết phê bình học thuật.' },
    { title: 'English Unlimited C1 Advanced', skill: 'ALL', author: 'Adrian Doff - Cambridge', desc: 'Trau dồi năng lực sử dụng tiếng Anh linh hoạt, tự nhiên như ngôn ngữ thứ nhất.', key: 'Làm chủ các sắc thái biểu cảm tinh tế và cấu trúc đảo ngữ phức tạp.' },
    { title: 'Objective IELTS Advanced', skill: 'ALL', author: 'Michael Black & Annette Capel - Cambridge', desc: 'Giáo trình luyện thi đỉnh cao dành riêng cho mục tiêu Band 8.0 - 9.0.', key: 'Phân tích chuyên sâu ngữ pháp cao cấp, danh từ hóa và câu chẻ.' },
    { title: 'Cambridge IELTS Practice Tests 15 - 19', skill: 'ALL', author: 'Cambridge UCLES', desc: 'Bộ đề thi thật cập nhật nhất theo xu hướng ra đề mới của Hội đồng Khảo thí.', key: 'Bộ đề chuẩn mực nhất cho giai đoạn nước rút trước khi thi.' }
  ]
};

class IeltsRoadmapModule {
  constructor() {
    this.container = document.getElementById('roadmap-container');
    this.activeLessonId = null;
    this.currentMissionStep = 1; // 1: Vocab, 2: Grammar, 3: AI Challenge
    this.loadProgress();
    this.render();
  }

  // Tải trạng thái tiến độ các bài học
  loadProgress() {
    try {
      const saved = localStorage.getItem(ROADMAP_STORAGE_KEY);
      if (saved) {
        this.progress = JSON.parse(saved);
      } else {
        // Mặc định: Bài 1 mở khóa, các bài khác khóa
        this.progress = {
          completedLessons: [], // Danh sách id bài đã hoàn thành
          currentLessonId: 1,   // Bài đang mở khóa làm tiếp
          unlockedLessons: [1], // Danh sách id bài đã được mở khóa
          missionProgress: {}   // { [lessonId]: { step1: true, step2: false, step3: false } }
        };
        this.saveProgress();
      }
    } catch (e) {
      this.progress = { completedLessons: [], currentLessonId: 1, unlockedLessons: [1], missionProgress: {} };
    }
  }

  saveProgress() {
    try {
      localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(this.progress));
    } catch (e) {}
  }

  // Render toàn bộ giao diện Lộ Trình 5 Chặng
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="roadmap-module-wrap">
        <!-- Banner Tổng Quan Lộ Trình -->
        <div class="roadmap-header-hero">
          <div class="hero-text">
            <span class="hero-badge">🗺️ Cambridge Master Roadmap</span>
            <h2>Bản Đồ 5 Chặng Đường &amp; 20 Chủ Điểm Khảo Thí</h2>
            <p>Hệ thống mở khóa bài học lũy tiến: Hoàn thành 3 nhiệm vụ (Học từ vựng, Luyện câu, Khảo bài AI) để nhận EXP, Vương Miện 👑 và mở khóa bài tiếp theo!</p>
          </div>
          <div class="hero-action">
            <button class="btn-curriculum-all" onclick="window.roadmapModule.openCurriculumModal('ALL')">
              📚 Tra Cứu Toàn Bộ Kho Giáo Trình
            </button>
          </div>
        </div>

        <!-- Danh sách 5 Accordion Stages -->
        <div class="roadmap-stages-list">
          ${ROADMAP_STAGES.map((stage) => this.renderStageAccordion(stage)).join('')}
        </div>
      </div>

      <!-- MISSION MODAL (BẢNG NHIỆM VỤ VƯỢT ẢI 3 BƯỚC) -->
      <div class="modal-overlay" id="mission-modal" onclick="if(event.target===this) window.roadmapModule.closeMissionModal()">
        <div class="modal-content-shell mission-modal-shell" id="mission-modal-content">
          <!-- Render động qua renderMissionModalBody() -->
        </div>
      </div>

      <!-- CURRICULUM MODAL (KHO GIÁO TRÌNH CHUẨN) -->
      <div class="modal-overlay" id="curriculum-modal" onclick="if(event.target===this) window.roadmapModule.closeCurriculumModal()">
        <div class="modal-content-shell curriculum-modal-shell">
          <div class="modal-header">
            <div class="modal-title-wrap">
              <h3 id="curriculum-modal-title"><span>📚</span> Kho Giáo Trình Tuyển Chọn Chuẩn Cambridge</h3>
              <p>Phân tầng theo 5 mốc Band điểm &amp; 4 kỹ năng Listening, Speaking, Reading, Writing</p>
            </div>
            <button class="btn-close-modal" onclick="window.roadmapModule.closeCurriculumModal()">&times;</button>
          </div>

          <!-- Thanh lọc kỹ năng -->
          <div class="curriculum-skill-filter">
            <button class="skill-filter-chip active" onclick="window.roadmapModule.filterCurriculumSkill('ALL')">Tất Cả Sách</button>
            <button class="skill-filter-chip" onclick="window.roadmapModule.filterCurriculumSkill('LISTENING')">🎧 Listening</button>
            <button class="skill-filter-chip" onclick="window.roadmapModule.filterCurriculumSkill('READING')">📖 Reading</button>
            <button class="skill-filter-chip" onclick="window.roadmapModule.filterCurriculumSkill('WRITING')">✍️ Writing</button>
            <button class="skill-filter-chip" onclick="window.roadmapModule.filterCurriculumSkill('SPEAKING')">🗣️ Speaking</button>
          </div>

          <div class="modal-body-scroll">
            <div class="curriculum-cards-grid" id="curriculum-cards-container">
              <!-- Render động bằng JavaScript -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render một Chặng Accordion
  renderStageAccordion(stage) {
    const stageLessons = ROADMAP_LESSONS.filter((l) => l.stageId === stage.id);
    const completedCount = stageLessons.filter((l) => this.progress.completedLessons.includes(l.id)).length;
    const percent = Math.round((completedCount / stageLessons.length) * 100);
    const isStageCurrent = stageLessons.some((l) => l.id === this.progress.currentLessonId);

    return `
      <div class="stage-accordion-card ${isStageCurrent ? 'is-active-stage' : ''}" id="stage-card-${stage.id}">
        <!-- Header Chặng (Click để đóng mở Accordion) -->
        <div class="stage-accordion-header" onclick="window.roadmapModule.toggleStageAccordion(${stage.id})">
          <div class="stage-header-left">
            <span class="stage-icon-badge" style="background:${stage.color}15; color:${stage.color}; border: 1.5px solid ${stage.color}40;">
              ${stage.icon}
            </span>
            <div class="stage-header-title">
              <div class="stage-tag-row">
                <span class="stage-band-tag" style="background:${stage.color}; color:#FFF;">${stage.bandTarget}</span>
                <span class="stage-progress-tag">${completedCount}/${stageLessons.length} bài hoàn thành (${percent}%)</span>
              </div>
              <h3>${stage.name}</h3>
              <p class="stage-desc-text">${stage.desc}</p>
            </div>
          </div>

          <div class="stage-header-right">
            <!-- Nút mở Kho Giáo Trình của riêng chặng này -->
            <button class="btn-stage-curriculum" onclick="event.stopPropagation(); window.roadmapModule.openCurriculumModal('${stage.curriculumTier}', '${stage.name}')" title="Xem giáo trình khuyên dùng cho chặng này">
              📖 Sách Khuyên Dùng
            </button>
            <span class="accordion-arrow" id="accordion-arrow-${stage.id}">▼</span>
          </div>
        </div>

        <!-- Body Chặng: Lưới các Bài Học Nodes -->
        <div class="stage-accordion-body" id="stage-body-${stage.id}">
          <div class="lessons-nodes-grid">
            ${stageLessons.map((lesson) => this.renderLessonNode(lesson)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Render một Thẻ Bài Học (Lesson Node)
  renderLessonNode(lesson) {
    const isCompleted = this.progress.completedLessons.includes(lesson.id);
    const isUnlocked = this.progress.unlockedLessons.includes(lesson.id) || isCompleted;
    const isCurrent = lesson.id === this.progress.currentLessonId && !isCompleted;

    let statusClass = 'locked';
    let statusLabel = '🔒 Đang Khóa';
    if (isCompleted) {
      statusClass = 'completed';
      statusLabel = '✅ Đã Hoàn Thành (3/3)';
    } else if (isCurrent) {
      statusClass = 'current';
      statusLabel = '🎯 Sẵn Sàng Vào Học';
    }

    const missionInfo = this.progress.missionProgress[lesson.id] || { step1: false, step2: false, step3: false };
    const stepCount = [missionInfo.step1, missionInfo.step2, missionInfo.step3].filter(Boolean).length;

    return `
      <div class="lesson-node-card ${statusClass}" onclick="window.roadmapModule.handleLessonClick(${lesson.id})">
        <div class="lesson-node-top">
          <span class="lesson-icon-circle">${lesson.icon}</span>
          <span class="lesson-number-tag">Bài #${lesson.id.toString().padStart(2, '0')}</span>
        </div>

        <div class="lesson-node-info">
          <h4 class="lesson-title-en">${lesson.title}</h4>
          <p class="lesson-title-vi">${lesson.vietnameseTitle}</p>
        </div>

        <div class="lesson-node-bottom">
          <div class="mission-checklist-indicator">
            <span class="step-dot ${missionInfo.step1 || isCompleted ? 'done' : ''}" title="Nhiệm vụ 1: Từ vựng">1</span>
            <span class="step-dot ${missionInfo.step2 || isCompleted ? 'done' : ''}" title="Nhiệm vụ 2: Luyện câu">2</span>
            <span class="step-dot ${missionInfo.step3 || isCompleted ? 'done' : ''}" title="Nhiệm vụ 3: Khảo bài AI">3</span>
          </div>

          ${
            isUnlocked
              ? `<span class="lesson-status-pill ${statusClass}">${statusLabel}</span>`
              : `<button class="btn-unlock-crowns" onclick="event.stopPropagation(); window.roadmapModule.unlockWithCrowns(${lesson.id})">
                   Mở khóa (10 👑)
                 </button>`
          }
        </div>
      </div>
    `;
  }

  // Thu gọn / Mở rộng Accordion của Chặng
  toggleStageAccordion(stageId) {
    const body = document.getElementById(`stage-body-${stageId}`);
    const arrow = document.getElementById(`accordion-arrow-${stageId}`);
    if (!body || !arrow) return;

    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Xử lý khi click vào Thẻ Bài Học
  handleLessonClick(lessonId) {
    const isUnlocked = this.progress.unlockedLessons.includes(lessonId) || this.progress.completedLessons.includes(lessonId);

    if (!isUnlocked) {
      if (window.soundSystem) window.soundSystem.playWrong();
      if (window.mascot) {
        window.mascot.say('Bài học này đang bị khóa! Hãy hoàn thành các bài trước hoặc dùng 10 👑 Vương Miện để mở khóa sớm nhé.', 4000);
      }
      return;
    }

    this.openMissionModal(lessonId);
  }

  // Mở khóa bài học bằng Vương Miện
  unlockWithCrowns(lessonId) {
    if (!window.gamification) return;

    if (window.gamification.spendCrowns(10)) {
      if (!this.progress.unlockedLessons.includes(lessonId)) {
        this.progress.unlockedLessons.push(lessonId);
        this.saveProgress();
      }
      if (window.soundSystem) window.soundSystem.playLevelUp();
      if (window.mascot) {
        window.mascot.say('✨ Tuyệt vời! Bạn đã dùng 10 👑 để mở khóa sớm bài học!', 3500);
        window.mascot.setMood('happy');
      }
      this.render();
      this.openMissionModal(lessonId);
    }
  }

  // Mở Mission Modal cho 1 bài học
  openMissionModal(lessonId) {
    this.activeLessonId = lessonId;
    this.currentMissionStep = 1;
    const lesson = ROADMAP_LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return;

    const modal = document.getElementById('mission-modal');
    this.renderMissionModalContent(lesson);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.soundSystem) window.soundSystem.playClick();
  }

  closeMissionModal() {
    const modal = document.getElementById('mission-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  // Render nội dung bên trong Mission Modal (3 Nhiệm Vụ)
  renderMissionModalContent(lesson) {
    const shell = document.getElementById('mission-modal-content');
    if (!shell) return;

    const missionProgress = this.progress.missionProgress[lesson.id] || { step1: false, step2: false, step3: false };
    const isCompleted = this.progress.completedLessons.includes(lesson.id);

    shell.innerHTML = `
      <div class="modal-header mission-header">
        <div class="modal-title-wrap">
          <div class="mission-breadcrumbs">
            <span>Bài #${lesson.id}</span> • <span>${lesson.bandLevel}</span>
          </div>
          <h3>${lesson.icon} ${lesson.title} (${lesson.vietnameseTitle})</h3>
        </div>
        <button class="btn-close-modal" onclick="window.roadmapModule.closeMissionModal()">&times;</button>
      </div>

      <!-- Thanh chọn 3 Nhiệm Vụ Vượt Ải -->
      <div class="mission-steps-bar">
        <button class="mission-step-tab ${this.currentMissionStep === 1 ? 'active' : ''} ${missionProgress.step1 || isCompleted ? 'done' : ''}" onclick="window.roadmapModule.setMissionStep(1)">
          <span>1. 💎 Từ Vựng</span> ${missionProgress.step1 || isCompleted ? '✓' : ''}
        </button>
        <button class="mission-step-tab ${this.currentMissionStep === 2 ? 'active' : ''} ${missionProgress.step2 || isCompleted ? 'done' : ''}" onclick="window.roadmapModule.setMissionStep(2)">
          <span>2. 📐 Luyện Câu</span> ${missionProgress.step2 || isCompleted ? '✓' : ''}
        </button>
        <button class="mission-step-tab ${this.currentMissionStep === 3 ? 'active' : ''} ${missionProgress.step3 || isCompleted ? 'done' : ''}" onclick="window.roadmapModule.setMissionStep(3)">
          <span>3. 👩‍🏫 Khảo Bài AI</span> ${missionProgress.step3 || isCompleted ? '✓' : ''}
        </button>
      </div>

      <div class="modal-body-scroll mission-step-content">
        ${this.renderCurrentMissionStepBody(lesson)}
      </div>
    `;
  }

  setMissionStep(step) {
    this.currentMissionStep = step;
    const lesson = ROADMAP_LESSONS.find((l) => l.id === this.activeLessonId);
    if (lesson) {
      this.renderMissionModalContent(lesson);
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  // Render nội dung của Bước Nhiệm Vụ Hiện Tại
  renderCurrentMissionStepBody(lesson) {
    // NHIỆM VỤ 1: HỌC TỪ VỰNG
    if (this.currentMissionStep === 1) {
      return `
        <div class="mission-task-section">
          <div class="task-intro-banner">
            <h4>💎 Nhiệm vụ 1: Làm Chủ Vốn Từ Vựng C1/C2</h4>
            <p>Học kỹ phát âm chuẩn IPA, nghĩa tiếng Việt và câu ví dụ ngữ cảnh trước khi làm bài tập.</p>
          </div>

          <div class="vocab-cards-grid">
            ${lesson.vocabItems.map((item, idx) => `
              <div class="vocab-learn-card">
                <div class="vocab-learn-header">
                  <span class="vocab-word">${item.word}</span>
                  <button class="btn-listen-audio" onclick="window.roadmapModule.speakText('${item.word.replace(/'/g, "\\'")}')" title="Nghe phát âm">
                    🔊
                  </button>
                </div>
                <div class="vocab-ipa">${item.ipa}</div>
                <div class="vocab-meaning">Nghĩa: <strong>${item.meaning}</strong></div>
                <div class="vocab-example">"${item.example}"</div>
              </div>
            `).join('')}
          </div>

          <div class="mission-action-bar">
            <button class="btn-complete-step" onclick="window.roadmapModule.completeStep(1)">
              ✓ Đã Thuộc Từ Vựng &rarr; Chuyển Sang Luyện Câu (+25 EXP)
            </button>
          </div>
        </div>
      `;
    }

    // NHIỆM VỤ 2: LUYỆN CẤU TRÚC CÂU
    if (this.currentMissionStep === 2) {
      const g = lesson.grammarTask;
      return `
        <div class="mission-task-section">
          <div class="task-intro-banner">
            <h4>📐 Nhiệm vụ 2: Rèn Luyện Cấu Trúc Ngữ Pháp Học Thuật</h4>
            <p>${g.instruction}</p>
          </div>

          <div class="grammar-puzzle-box">
            <div class="jumbled-chips-pool" id="jumbled-pool">
              ${g.jumbled.map((word) => `
                <button class="grammar-word-chip" onclick="window.roadmapModule.pickWordChip(this, '${word}')">${word}</button>
              `).join('')}
            </div>

            <div class="grammar-target-dropzone" id="grammar-dropzone">
              <span class="dropzone-placeholder" id="dropzone-hint">Bấm các từ khóa ở trên theo đúng thứ tự ngữ pháp...</span>
            </div>

            <div class="grammar-feedback-alert" id="grammar-feedback-alert" style="display:none;"></div>
          </div>

          <div class="mission-action-bar">
            <button class="btn-clear-chips" onclick="window.roadmapModule.resetGrammarPuzzle()">
              🔄 Xếp Lại
            </button>
            <button class="btn-check-grammar" onclick="window.roadmapModule.checkGrammarPuzzle()">
              Kiểm Tra Cấu Trúc
            </button>
          </div>
        </div>
      `;
    }

    // NHIỆM VỤ 3: KIỂM TRA & KHẢO BÀI AI (GIÁM KHẢO VICTORIA)
    if (this.currentMissionStep === 3) {
      const a = lesson.aiExamTask;
      return `
        <div class="mission-task-section">
          <div class="task-intro-banner" style="background:#FFF0F6; border-color:#FFDEEB;">
            <h4 style="color:#D6336C;">👩‍🏫 Nhiệm vụ 3: Khảo Bài Cùng Giám Khảo Victoria AI</h4>
            <p style="color:#A61E4D;">Victoria sẽ đặt một câu hỏi phỏng vấn chuẩn Cambridge Part 3. Hãy đưa ra câu trả lời lập luận sắc bén!</p>
          </div>

          <div class="ai-challenge-box">
            <div class="ai-question-bubble">
              <span class="ai-speaker-badge">Senior Examiner Victoria:</span>
              <p class="ai-question-text">"${a.question}"</p>
              <div class="ai-hint-tip">💡 Gợi ý tư duy: ${a.hint}</div>
            </div>

            <div class="student-input-wrap">
              <label>Câu trả lời của bạn (Nhập tiếng Anh tối thiểu 15-20 từ):</label>
              <textarea id="ai-exam-student-input" placeholder="Ví dụ: From my perspective, it is imperative to...">${a.sampleAnswer}</textarea>
            </div>

            <div class="ai-feedback-response" id="ai-exam-feedback" style="display:none;"></div>
          </div>

          <div class="mission-action-bar">
            <button class="btn-submit-ai-exam" id="btn-submit-ai" onclick="window.roadmapModule.submitAiExam()">
              <span>⚖️</span> Giám Khảo Victoria Thẩm Định &amp; Vượt Ải (+50 EXP, +5 👑)
            </button>
          </div>
        </div>
      `;
    }
  }

  // Phát âm từ vựng qua Speech Synthesis
  speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    }
    if (window.soundSystem) window.soundSystem.playClick();
  }

  // Hoàn thành Bước 1
  completeStep(step) {
    const lessonId = this.activeLessonId;
    if (!this.progress.missionProgress[lessonId]) {
      this.progress.missionProgress[lessonId] = { step1: false, step2: false, step3: false };
    }
    this.progress.missionProgress[lessonId][`step${step}`] = true;
    this.saveProgress();

    if (window.gamification) {
      window.gamification.addExp(25);
      window.gamification.recordVocabLearned(3);
    }
    if (window.soundSystem) window.soundSystem.playCorrect();

    // Chuyển sang bước kế tiếp
    this.setMissionStep(step + 1);
  }

  // Logic Game Ghép Câu Ngữ Pháp (Bước 2)
  pickWordChip(btn, word) {
    if (btn.classList.contains('used')) return;
    btn.classList.add('used');

    const dropzone = document.getElementById('grammar-dropzone');
    const hint = document.getElementById('dropzone-hint');
    if (hint) hint.style.display = 'none';

    const placedChip = document.createElement('span');
    placedChip.className = 'placed-chip';
    placedChip.textContent = word;
    placedChip.onclick = () => {
      placedChip.remove();
      btn.classList.remove('used');
      if (dropzone.children.length === 0 && hint) {
        hint.style.display = 'inline';
      }
    };
    dropzone.appendChild(placedChip);
    if (window.soundSystem) window.soundSystem.playClick();
  }

  resetGrammarPuzzle() {
    const lesson = ROADMAP_LESSONS.find((l) => l.id === this.activeLessonId);
    if (!lesson) return;
    this.setMissionStep(2);
  }

  checkGrammarPuzzle() {
    const lesson = ROADMAP_LESSONS.find((l) => l.id === this.activeLessonId);
    if (!lesson) return;

    const dropzone = document.getElementById('grammar-dropzone');
    const placedChips = dropzone.querySelectorAll('.placed-chip');
    const studentSentence = Array.from(placedChips).map((c) => c.textContent.trim()).join(' ');

    const alertBox = document.getElementById('grammar-feedback-alert');
    alertBox.style.display = 'block';

    const isMatch = studentSentence.toLowerCase() === lesson.grammarTask.correctSentence.toLowerCase();

    if (isMatch) {
      alertBox.className = 'grammar-feedback-alert success';
      alertBox.innerHTML = `
        <strong>✓ CHÍNH XÁC!</strong> Cấu trúc câu chuẩn mực.<br>
        <small>${lesson.grammarTask.explanation}</small>
      `;
      if (window.soundSystem) window.soundSystem.playCorrect();

      // Đánh dấu hoàn thành bước 2
      if (!this.progress.missionProgress[lesson.id]) {
        this.progress.missionProgress[lesson.id] = { step1: false, step2: false, step3: false };
      }
      this.progress.missionProgress[lesson.id].step2 = true;
      this.saveProgress();
      if (window.gamification) window.gamification.addExp(25);

      setTimeout(() => {
        this.setMissionStep(3);
      }, 1500);
    } else {
      alertBox.className = 'grammar-feedback-alert error';
      alertBox.innerHTML = `
        <strong>⚠️ Chưa chính xác.</strong> Bạn đã ghép: "${studentSentence || '(Trống)'}".<br>
        <small>Gợi ý: Hãy bấm "Xếp Lại" và chú ý trật tự từ vựng.</small>
      `;
      if (window.soundSystem) window.soundSystem.playWrong();
    }
  }

  // Khảo bài AI & Vượt Ải Bài Học (Bước 3)
  async submitAiExam() {
    const lesson = ROADMAP_LESSONS.find((l) => l.id === this.activeLessonId);
    if (!lesson) return;

    const studentInput = document.getElementById('ai-exam-student-input').value.trim();
    if (!studentInput || studentInput.split(/\s+/).length < 5) {
      alert('Vui lòng trả lời câu hỏi bằng tiếng Anh tối thiểu 5 từ!');
      return;
    }

    const btn = document.getElementById('btn-submit-ai');
    btn.innerHTML = '<span>⏳</span> Giám Khảo Victoria Đang Thẩm Định...';
    btn.disabled = true;

    const feedbackBox = document.getElementById('ai-exam-feedback');
    feedbackBox.style.display = 'block';
    feedbackBox.innerHTML = 'Đang phân tích cấu trúc lập luận và vốn từ vựng học thuật...';

    try {
      let evaluation = null;
      if (window.ieltsAiService) {
        evaluation = await window.ieltsAiService.interrogateStudent({
          currentBand: lesson.bandLevel,
          topic: lesson.title,
          studentMessage: studentInput
        });
      }

      feedbackBox.className = 'ai-feedback-response success';
      feedbackBox.innerHTML = `
        <div class="victoria-comment-header">
          <strong>👩‍🏫 Nhận Xét Của Giám Khảo Victoria:</strong>
        </div>
        <p class="victoria-feedback-text">"${evaluation?.victoriaResponse || 'Well done! Câu trả lời của bạn có cấu trúc lập luận mạch lạc, đáp ứng trọn vẹn yêu cầu câu hỏi.'}"</p>
        ${evaluation?.vocabTip ? `<div class="victoria-vocab-tip">💡 C1 Tip: ${evaluation.vocabTip}</div>` : ''}
      `;

      // Hoàn thành trọn vẹn cả bài học!
      this.finalizeLessonCompletion(lesson.id);
    } catch (e) {
      // Fallback
      feedbackBox.className = 'ai-feedback-response success';
      feedbackBox.innerHTML = `
        <strong>👩‍🏫 Nhận Xét Của Giám Khảo Victoria:</strong>
        <p>"Câu trả lời xuất sắc! Bạn đã triển khai luận điểm mạch lạc và kết hợp tốt các từ vựng học thuật chủ đề ${lesson.vietnameseTitle}."</p>
      `;
      this.finalizeLessonCompletion(lesson.id);
    } finally {
      btn.innerHTML = '<span>🎉</span> ĐÃ VƯỢT ẢI THÀNH CÔNG!';
    }
  }

  // Xử lý sau khi hoàn thành cả 3 nhiệm vụ của bài học
  finalizeLessonCompletion(lessonId) {
    if (!this.progress.completedLessons.includes(lessonId)) {
      this.progress.completedLessons.push(lessonId);
    }

    // Mở khóa bài tiếp theo (N+1)
    const nextLessonId = lessonId + 1;
    if (nextLessonId <= 20 && !this.progress.unlockedLessons.includes(nextLessonId)) {
      this.progress.unlockedLessons.push(nextLessonId);
      this.progress.currentLessonId = nextLessonId;
    }

    this.saveProgress();

    // Thưởng Gamification
    if (window.gamification) {
      window.gamification.addExp(50);
      window.gamification.addCrowns(5);
    }
    if (window.soundSystem) {
      window.soundSystem.playLevelUp();
    }
    if (window.mascot) {
      window.mascot.say(`🎉 HOAN HÔ! Bạn đã hoàn thành xuất sắc Bài #${lessonId}! Thưởng +100 EXP & +5 👑 Vương Miện!`, 5000);
      window.mascot.setMood('happy');
    }

    setTimeout(() => {
      this.closeMissionModal();
      this.render();
    }, 2800);
  }

  // ================= KHO GIÁO TRÌNH CHUẨN (CURRICULUM) =================
  openCurriculumModal(tierKey = 'ALL', stageTitle = '') {
    this.activeCurriculumTier = tierKey;
    this.activeCurriculumSkill = 'ALL';

    const titleEl = document.getElementById('curriculum-modal-title');
    if (titleEl) {
      titleEl.innerHTML = stageTitle
        ? `<span>📚</span> Kho Giáo Trình Chuẩn: ${stageTitle}`
        : `<span>📚</span> Toàn Bộ Kho Giáo Trình IELTS Chuẩn Cambridge`;
    }

    this.renderCurriculumCards();
    const modal = document.getElementById('curriculum-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.soundSystem) window.soundSystem.playClick();
  }

  closeCurriculumModal() {
    const modal = document.getElementById('curriculum-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (window.soundSystem) window.soundSystem.playClick();
    }
  }

  filterCurriculumSkill(skill) {
    this.activeCurriculumSkill = skill;
    const chips = document.querySelectorAll('.skill-filter-chip');
    chips.forEach((c) => {
      c.classList.toggle('active', c.textContent.includes(skill) || (skill === 'ALL' && c.textContent.includes('Tất Cả')));
    });
    this.renderCurriculumCards();
    if (window.soundSystem) window.soundSystem.playClick();
  }

  renderCurriculumCards() {
    const container = document.getElementById('curriculum-cards-container');
    if (!container) return;

    let books = [];
    if (this.activeCurriculumTier && this.activeCurriculumTier !== 'ALL' && CURRICULUM_DATABASE[this.activeCurriculumTier]) {
      books = CURRICULUM_DATABASE[this.activeCurriculumTier];
    } else {
      // Gộp tất cả các tầng
      books = Object.values(CURRICULUM_DATABASE).flat();
    }

    if (this.activeCurriculumSkill && this.activeCurriculumSkill !== 'ALL') {
      books = books.filter((b) => b.skill === this.activeCurriculumSkill || b.skill === 'ALL');
    }

    container.innerHTML = books.map((book) => `
      <div class="curriculum-book-card">
        <div class="book-card-header">
          <span class="book-skill-badge skill-${book.skill.toLowerCase()}">${book.skill}</span>
          <span class="book-author">${book.author}</span>
        </div>
        <h4 class="book-title">${book.title}</h4>
        <p class="book-desc">${book.desc}</p>
        <div class="book-key-feature">
          <strong>Điểm nổi bật:</strong> ${book.key}
        </div>
        <div class="book-card-footer">
          <button class="btn-open-book" onclick="alert('Đã sẵn sàng học liệu: ${book.title.replace(/'/g, "\\'")}')">
            📖 Mở Giáo Trình
          </button>
        </div>
      </div>
    `).join('');
  }
}

// Khởi tạo Module khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  window.roadmapModule = new IeltsRoadmapModule();
});
