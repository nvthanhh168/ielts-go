/**
 * IELTS GO! - IELTS Lexical Deep-Dive Database & Dynamic Analyzer
 * Thư viện dữ liệu phân tích từ vựng chuyên sâu chuẩn tiêu chí chấm thi Lexical Resource
 * Bao gồm:
 * 1. Thông tin cốt lõi (Headword, POS, Band, CEFR, UK/US IPA, Biểu đồ trọng âm Syllable Pitch Visualizer)
 * 2. 🔄 Thang Nâng Cấp Band (Band Upgrade / Paraphrase Ladder: Band 4.0 -> Band 6.0 -> Band 7.5+)
 * 3. 🧩 Gia Đình Từ & Collocations Thực Chiến (Word Family & Useful Collocations)
 * 4. 📜 Câu Ví Dụ Chuẩn IELTS Academic Context (Speaking Part 1/2/3 & Writing Task 2)
 */

const IELTS_LEXICAL_DEEP_DIVE_DATABASE = [
  // 1. ENVIRONMENT
  {
    id: 'dd-env-01',
    word: 'environment',
    partOfSpeech: 'noun',
    posLabel: 'Noun (Danh từ đếm được / không đếm được)',
    bandLevel: 'Band 7.0',
    cefr: 'C1',
    topicId: 'environment',
    topicName: 'Môi trường & Hệ sinh thái',
    topicIcon: '🌱',
    ipaUk: '/ɪnˈvaɪ.rən.mənt/',
    ipaUs: '/ɪnˈvaɪ.rən.mənt/',
    phoneticDetails: {
      syllables: [
        { text: 'en', type: 'unstressed', ipa: 'ɪn', pitch: 1 },
        { text: 'VI', type: 'primary', ipa: 'ˈvaɪ', pitch: 3, label: 'Nhấn chính' },
        { text: 'ron', type: 'unstressed', ipa: 'rən', pitch: 1 },
        { text: 'ment', type: 'unstressed', ipa: 'mənt', pitch: 1 }
      ],
      patternCode: '[o O o o]',
      primaryIndex: 1, // 0-indexed (âm tiết thứ 2)
      stressRule: 'Từ có 4 âm tiết, trọng âm rơi vào âm tiết thứ 2. Phát âm âm tiết "VI" /vaɪ/ to hơn, cao độ nâng lên và nguyên âm kéo dài gấp đôi các âm lân cận.',
      commonMistakes: 'Thí sinh Việt Nam thường quên âm đuôi /t/ ở đuôi "-ment" hoặc đọc nhầm trọng âm sang âm tiết thứ 3 (*en-vi-RON-ment).'
    },
    definitionVi: 'Môi trường tự nhiên (không khí, nước, đất đai nơi sinh vật sinh sống); hoặc môi trường xã hội, điều kiện xung quanh con người.',
    definitionEn: 'The natural world, including the land, water, air, plants, and animals; or the surroundings and conditions in which someone operates.',

    // BẢNG 1: THANG NÂNG CẤP BAND (BAND UPGRADE / PARAPHRASE LADDER)
    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['nature', 'surroundings', 'green things'],
        example: 'We must protect nature and surroundings.',
        examinerNote: 'Từ vựng đơn giản, nghĩa chung chung, lặp lại nhiều lần sẽ bị khóa điểm Lexical Resource ở Band 5.0.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['natural environment', 'ecological system', 'habitat'],
        example: 'Governments should enact laws to preserve the natural environment and fragile habitats.',
        examinerNote: 'Sử dụng danh từ học thuật chính xác, kết hợp tính từ tự nhiên đạt chuẩn đại học quốc tế.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['pristine ecosystem', 'biosphere', 'ecological equilibrium', 'ambient surroundings'],
        example: 'Rampant industrialization has disrupted the delicate ecological equilibrium of vulnerable biospheres.',
        examinerNote: 'Sắc thái tinh tế, kết hợp từ vựng chuyên sâu (collocation collocation density cao), diễn đạt sắc bén chuẩn C2.'
      }
    ],
    examinerTips: 'Khi làm Writing Task 2 về môi trường, hãy tránh lặp từ "environment" bằng cách luân chuyển linh hoạt giữa "natural habitat", "fragile ecosystem", "biosphere" và các cụm danh từ hóa (nominalisation).',

    // BẢNG 2: GIA ĐÌNH TỪ & COLLOCATIONS THỰC CHIẾN
    wordFamily: {
      noun: ['environment (môi trường)', 'environmentalist (nhà bảo vệ môi trường)', 'environmentalism (chủ nghĩa bảo vệ môi trường)'],
      verb: ['environmentalize (thích ứng theo môi trường)', 'preserve / safeguard the environment'],
      adjective: ['environmental (thuộc về môi trường)', 'environmentally-friendly (thân thiện môi trường)', 'environmentally-conscious (có ý thức môi trường)'],
      adverb: ['environmentally (về mặt môi trường)']
    },
    nominalisationExample: {
      basicSentence: 'Humans damage the environment rapidly because of factories.',
      academicSentence: 'The rapid environmental degradation stem from uncontrolled industrial emissions.',
      analysis: 'Biến đổi động từ "damage" + danh từ "environment" thành cụm danh từ học thuật "environmental degradation" giúp nâng điểm Grammatical Range & Lexical Resource từ Band 5.5 lên Band 7.5+.'
    },
    collocations: [
      {
        type: 'Verb + Noun',
        phrase: 'degrade the environment',
        meaning: 'làm suy thoái môi trường',
        example: 'Excessive reliance on fossil fuels inevitably degrades the environment.'
      },
      {
        type: 'Verb + Noun',
        phrase: 'safeguard the fragile environment',
        meaning: 'bảo vệ môi trường mong manh',
        example: 'Stringent international treaties are imperative to safeguard the fragile Arctic environment.'
      },
      {
        type: 'Adjective + Noun',
        phrase: 'adverse environmental impacts',
        meaning: 'những tác động tiêu cực đến môi trường',
        example: 'Deforestation yields catastrophic and irreversible environmental impacts.'
      },
      {
        type: 'Prepositional',
        phrase: 'detrimental to the environment',
        meaning: 'gây tổn hại nghiêm trọng đến môi trường',
        example: 'Single-use plastic packaging is undeniably detrimental to marine ecosystems.'
      },
      {
        type: 'Idiomatic / Advanced',
        phrase: 'minimize one\'s carbon footprint',
        meaning: 'giảm thiểu lượng phát thải khí nhà kính cá nhân',
        example: 'Commuters are incentivized to utilize public transit to minimize their carbon footprint.'
      }
    ],

    // BẢNG 3: CÂU VÍ DỤ CHUẨN IELTS (ACADEMIC CONTEXT)
    speakingContext: {
      part: 'Speaking Part 3',
      topic: 'Environmental Awareness & Youth',
      question: 'Why is it important for younger generations to be educated about the environment?',
      answer: 'Well, to be perfectly candid, fostering early awareness of the fragile environment is of paramount significance, as young people are the ones who will ultimately bear the brunt of ongoing climate catastrophes and spearhead sustainable innovations.',
      translation: 'Chà, nói một cách hoàn toàn thành thật, việc bồi dưỡng nhận thức sớm về môi trường mong manh có tầm quan trọng tối thượng, bởi vì giới trẻ chính là những người cuối cùng sẽ phải gánh chịu hậu quả nặng nề nhất của thảm họa khí hậu và dẫn đầu các sáng kiến phát triển bền vững.',
      keyVocabUsed: ['fragile environment', 'paramount significance', 'bear the brunt of', 'sustainable innovations'],
      examinerInsight: 'Thí sinh ghi điểm tuyệt đối nhờ sử dụng Collocation học thuật "bear the brunt of" kết hợp "paramount significance" thay vì nói "very important".'
    },
    writingContext: {
      task: 'Writing Task 2 (Opinion / Discussion Essay)',
      topic: 'Economic Growth vs Environmental Protection',
      prompt: 'Some people argue that economic development is more important than environmental protection. To what extent do you agree or disagree?',
      sentence: 'While unbridled economic expansion undeniably bolsters living standards, prioritizing fiscal gains at the expense of irreversible environmental degradation constitutes a short-sighted and fundamentally perilous policy.',
      translation: 'Dẫu cho sự tăng trưởng kinh tế không kiểm soát hiển nhiên giúp nâng cao mức sống, việc ưu tiên lợi ích tài chính mà phải trả giá bằng sự suy thoái môi trường không thể phục hồi cấu thành một chính sách thiển cận và hiểm họa khôn lường.',
      keyVocabUsed: ['unbridled economic expansion', 'at the expense of', 'irreversible environmental degradation', 'short-sighted and fundamentally perilous'],
      examinerInsight: 'Câu mẫu đạt Band 8.5+ với cấu trúc nhượng bộ tương phản (While clause), sử dụng thuật ngữ đắt giá "unbridled", "at the expense of", "irreversible degradation" chuẩn văn phong nghị luận Cambridge.'
    }
  },

  // 2. PARAMOUNT
  {
    id: 'dd-gen-02',
    word: 'paramount',
    partOfSpeech: 'adjective',
    posLabel: 'Adjective (Tính từ học thuật trang trọng)',
    bandLevel: 'Band 8.0',
    cefr: 'C2',
    topicId: 'study',
    topicName: 'Học thuật & Biện luận tổng quát',
    topicIcon: '👑',
    ipaUk: '/ˈpær.ə.maʊnt/',
    ipaUs: '/ˈpær.ə.maʊnt/',
    phoneticDetails: {
      syllables: [
        { text: 'PAR', type: 'primary', ipa: 'ˈpær', pitch: 3, label: 'Nhấn chính' },
        { text: 'a', type: 'unstressed', ipa: 'ə', pitch: 1 },
        { text: 'mount', type: 'unstressed', ipa: 'maʊnt', pitch: 1 }
      ],
      patternCode: '[O o o]',
      primaryIndex: 0,
      stressRule: 'Từ gồm 3 âm tiết, trọng âm rơi vào âm tiết đầu tiên "PAR" /ˈpær/. Âm "a" ở giữa biến thành âm Schwa /ə/ rất ngắn và nhẹ.',
      commonMistakes: 'Thí sinh hay nhầm nhấn vào âm thứ 3 (*pa-ra-MOUNT) do bị ảnh hưởng bởi từ "amount". Nhớ rằng: PA-ra-mount!'
    },
    definitionVi: 'Tối thượng, có tầm quan trọng tối cao, vượt trội hơn tất cả mọi thứ khác.',
    definitionEn: 'More important than anything else; supreme in rank, power, or authority.',

    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['very important', 'most needed', 'big thing'],
        example: 'Education is very important for every child.',
        examinerNote: 'Lạm dụng từ "very important" là lỗi phổ biến nhất khiến điểm Lexical Resource bị kẹt ở mức Band 5.0.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['crucial', 'essential', 'significant', 'play a vital role'],
        example: 'Early childhood education plays a crucial role in cognitive development.',
        examinerNote: 'Từ vựng học thuật tốt, tự nhiên và đạt chuẩn yêu cầu đầu vào đại học.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['of paramount importance', 'indispensable', 'imperative', 'cardinal', 'pre-eminent'],
        example: 'Safeguarding civic liberties is considered of paramount importance in any egalitarian society.',
        examinerNote: 'Cấu trúc "of paramount importance" hoặc "paramount significance" là collocation chuẩn C2 giúp gây ấn tượng mạnh với giám khảo chấm thi.'
      }
    ],
    examinerTips: 'Cấu trúc vàng trong Writing Task 2: "It is of paramount importance that [clause]" hoặc "[Subject] is of paramount significance to [Noun/V-ing]".',

    wordFamily: {
      noun: ['paramountcy (quyền lực tối cao, tầm quan trọng số một)'],
      verb: ['(Dùng cụm: prioritize above all else, hold paramount)'],
      adjective: ['paramount (tối thượng, tối quan trọng)'],
      adverb: ['paramountly (một cách tối thượng - ít dùng trong văn viết, khuyên dùng tính từ)']
    },
    nominalisationExample: {
      basicSentence: 'We must remember that safety is the most important thing.',
      academicSentence: 'The paramountcy of passenger safety necessitates rigorous compliance with aviation protocols.',
      analysis: 'Chuyển đổi sang danh từ hiếm "paramountcy" nâng tầm học thuật vượt trội cho câu mở đầu của đoạn thân bài.'
    },
    collocations: [
      {
        type: 'Collocation cấu trúc',
        phrase: 'of paramount importance / significance',
        meaning: 'có tầm quan trọng tối thượng',
        example: 'Maintaining intellectual integrity is of paramount importance in scientific research.'
      },
      {
        type: 'Verb + Collocation',
        phrase: 'hold something paramount',
        meaning: 'xem điều gì là quan trọng hàng đầu',
        example: 'Ethical healthcare providers hold patient well-being paramount above profit motives.'
      },
      {
        type: 'Adjective + Noun',
        phrase: 'paramount concern',
        meaning: 'mối quan tâm hàng đầu',
        example: 'Alleviating youth unemployment remains the government\'s paramount concern.'
      },
      {
        type: 'Prepositional',
        phrase: 'paramount to something',
        meaning: 'tối thượng đối với điều gì',
        example: 'Transparency is paramount to sustaining public trust in democratic institutions.'
      }
    ],

    speakingContext: {
      part: 'Speaking Part 1',
      topic: 'Work & Studies',
      question: 'What is the most crucial skill you need for your current career?',
      answer: 'Without a shadow of a doubt, effective time management is of paramount importance, particularly when juggling stringent project deadlines with client negotiations.',
      translation: 'Không còn chút nghi ngờ nào, việc quản lý thời gian hiệu quả có tầm quan trọng tối thượng, nhất là khi phải cân đối giữa những hạn chót dự án gắt gao với các buổi thương thảo cùng khách hàng.',
      keyVocabUsed: ['without a shadow of a doubt', 'of paramount importance', 'juggling stringent deadlines'],
      examinerInsight: 'Sử dụng idiom học thuật chuẩn xác "without a shadow of a doubt" kết hợp "of paramount importance" tạo nên ngữ điệu tự nhiên và chuẩn xác.'
    },
    writingContext: {
      task: 'Writing Task 2 (Problem & Solution Essay)',
      topic: 'Urban Traffic & Pollution',
      prompt: 'Traffic congestion in many major cities is worsening. What are the causes and what solutions can be proposed?',
      sentence: 'In addressing metropolitan gridlock, modernizing mass transit networks is of paramount urgency, as piecemeal road expansions fail to curtail automobile dependence.',
      translation: 'Để giải quyết tình trạng ùn tắc giao thông tại các đô thị, việc hiện đại hóa mạng lưới giao thông công cộng là điều khẩn cấp tối thượng, bởi lẽ các giải pháp mở rộng đường bộ chắp vá không thể làm giảm sự phụ thuộc vào xe hơi cá nhân.',
      keyVocabUsed: ['metropolitan gridlock', 'of paramount urgency', 'piecemeal road expansions', 'curtail automobile dependence'],
      examinerInsight: 'Cụm "of paramount urgency" kết hợp từ vựng chuyên ngành giao thông "metropolitan gridlock", "curtail dependence" khẳng định năng lực ngôn ngữ Band 8.5+.'
    }
  },

  // 3. SUSTAINABLE
  {
    id: 'dd-env-03',
    word: 'sustainable',
    partOfSpeech: 'adjective',
    posLabel: 'Adjective (Tính từ học thuật)',
    bandLevel: 'Band 7.0',
    cefr: 'C1',
    topicId: 'environment',
    topicName: 'Môi trường & Phát triển bền vững',
    topicIcon: '♻️',
    ipaUk: '/səˈsteɪ.nə.bəl/',
    ipaUs: '/səˈsteɪ.nə.bəl/',
    phoneticDetails: {
      syllables: [
        { text: 'sus', type: 'unstressed', ipa: 'sə', pitch: 1 },
        { text: 'TAIN', type: 'primary', ipa: 'ˈsteɪ', pitch: 3, label: 'Nhấn chính' },
        { text: 'a', type: 'unstressed', ipa: 'nə', pitch: 1 },
        { text: 'ble', type: 'unstressed', ipa: 'bəl', pitch: 1 }
      ],
      patternCode: '[o O o o]',
      primaryIndex: 1,
      stressRule: 'Từ gồm 4 âm tiết, trọng âm rơi vào âm tiết thứ 2 "TAIN" /steɪ/. Âm đầu là schwa /sə/, âm đuôi là /bəl/.',
      commonMistakes: 'Thí sinh hay phát âm nhầm âm đầu thành /sʌs/ nặng nề hoặc nhấn nhầm vào âm cuối (*sus-tain-ABLE).'
    },
    definitionVi: 'Bền vững, có khả năng duy trì lâu dài mà không gây cạn kiệt tài nguyên thiên nhiên hoặc hủy hoại sinh thái.',
    definitionEn: 'Able to be maintained at a certain rate or level; causing little or no damage to the environment and therefore able to continue for a long time.',

    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['can use long time', 'keep doing', 'green living'],
        example: 'We need methods that we can use for a long time.',
        examinerNote: 'Diễn giải vòng vo do thiếu từ vựng chuyên ngành, ngữ pháp đơn giản.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['long-term', 'eco-friendly', 'renewable', 'maintainable'],
        example: 'Adopting renewable energy sources ensures long-term economic growth.',
        examinerNote: 'Dùng từ chính xác, cấu trúc câu rõ nghĩa và mạch lạc.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['ecologically sustainable', 'viable in perpetuity', 'carbon-neutral practices', 'closed-loop sustainability'],
        example: 'Transitioning toward a circular economy represents the solely viable path to ecologically sustainable industrial production.',
        examinerNote: 'Collocation cấp cao: circular economy, viable in perpetuity, ecologically sustainable.'
      }
    ],
    examinerTips: 'Trong Writing Task 2, tránh dùng "sustainable" một mình quá nhiều lần. Hãy kết hợp với các danh từ đi kèm: sustainable agriculture, sustainable consumption, sustainable urban planning.',

    wordFamily: {
      noun: ['sustainability (sự bền vững, tính bền vững)', 'sustenance (chất dinh dưỡng, sự nuôi dưỡng)'],
      verb: ['sustain (duy trì, chống đỡ, chịu đựng)'],
      adjective: ['sustainable (bền vững)', 'sustained (kéo dài liên tục)', 'unsustainable (không bền vững)'],
      adverb: ['sustainably (một cách bền vững)']
    },
    nominalisationExample: {
      basicSentence: 'Companies need to act in ways that protect nature for a long time.',
      academicSentence: 'Corporate sustainability initiatives have shifted from peripheral public relations stunts to central governance imperatives.',
      analysis: 'Chuyển thành danh từ "sustainability initiatives" và kết hợp cụm "governance imperatives" tạo nên phong cách học thuật đỉnh cao.'
    },
    collocations: [
      {
        type: 'Adjective + Noun',
        phrase: 'sustainable development goals',
        meaning: 'các mục tiêu phát triển bền vững',
        example: 'Developing nations strive to meet the United Nations\' sustainable development goals.'
      },
      {
        type: 'Adverb + Adjective',
        phrase: 'ecologically sustainable',
        meaning: 'bền vững về mặt sinh thái',
        example: 'Organic farming is widely heralded as an ecologically sustainable alternative to monoculture.'
      },
      {
        type: 'Verb + Noun',
        phrase: 'promote sustainable practices',
        meaning: 'thúc đẩy các thực hành bền vững',
        example: 'Fiscal incentives can encourage manufacturers to adopt sustainable manufacturing practices.'
      },
      {
        type: 'Antonym Collocation',
        phrase: 'economically unsustainable',
        meaning: 'không bền vững về mặt kinh tế',
        example: 'Heavily subsidizing fossil fuels is both ecologically damaging and economically unsustainable.'
      }
    ],

    speakingContext: {
      part: 'Speaking Part 2',
      topic: 'Describe an environmental habit you have adopted',
      question: 'Describe an eco-friendly practice you do to protect the planet.',
      answer: 'I\'ve made a conscious effort to switch to sustainable consumer choices, such as carrying reusable fabric tote bags and patronizing zero-waste grocery stores to curb plastic refuse.',
      translation: 'Tôi đã nỗ lực có ý thức để chuyển sang các lựa chọn tiêu dùng bền vững, chẳng hạn như mang túi vải tái sử dụng và ủng hộ các cửa hàng tạp hóa không rác thải để cắt giảm rác nhựa.',
      keyVocabUsed: ['made a conscious effort', 'sustainable consumer choices', 'patronizing zero-waste stores', 'curb plastic refuse'],
      examinerInsight: 'Diễn đạt lưu loát với các cụm từ collocations đời sống hiện đại: conscious effort, curb plastic refuse.'
    },
    writingContext: {
      task: 'Writing Task 2 (Discussion Essay)',
      topic: 'Renewable Energy & Economy',
      prompt: 'Some believe investment in green energy harms economic productivity. Do you agree or disagree?',
      sentence: 'Far from undermining fiscal prosperity, investment in sustainable energy infrastructure generates millions of green-collar employment opportunities while insulating economies from volatile fossil fuel markets.',
      translation: 'Không hề làm suy giảm sự thịnh vượng tài chính, việc đầu tư vào cơ sở hạ tầng năng lượng bền vững còn tạo ra hàng triệu cơ hội việc làm xanh đồng thời bảo vệ các nền kinh tế trước sự biến động của thị trường nhiên liệu hóa thạch.',
      keyVocabUsed: ['far from undermining', 'sustainable energy infrastructure', 'green-collar employment', 'insulating economies from volatile markets'],
      examinerInsight: 'Sử dụng cấu trúc câu đòn bẩy "Far from doing X, Y generates Z" kết hợp vốn từ vựng kinh tế vĩ mô cực kỳ ấn tượng.'
    }
  },

  // 4. TERTIARY EDUCATION
  {
    id: 'dd-std-04',
    word: 'tertiary education',
    partOfSpeech: 'collocation',
    posLabel: 'Collocation / Cụm danh từ học thuật',
    bandLevel: 'Band 7.0',
    cefr: 'C1',
    topicId: 'study',
    topicName: 'Học tập & Giáo dục bậc cao',
    topicIcon: '🎓',
    ipaUk: '/ˈtɜː.ʃər.i ˌedʒ.ʊˈkeɪ.ʃən/',
    ipaUs: '/ˈtɜːr.ʃiˌer.i ˌedʒ.əˈkeɪ.ʃən/',
    phoneticDetails: {
      syllables: [
        { text: 'TER', type: 'primary', ipa: 'ˈtɜː', pitch: 3, label: 'Nhấn chính từ 1' },
        { text: 'tiar', type: 'unstressed', ipa: 'ʃər', pitch: 1 },
        { text: 'y', type: 'unstressed', ipa: 'i', pitch: 1 },
        { text: '•', type: 'separator', ipa: '', pitch: 0 },
        { text: 'ed', type: 'unstressed', ipa: 'edʒ', pitch: 1 },
        { text: 'u', type: 'secondary', ipa: 'ʊ', pitch: 2, label: 'Nhấn phụ' },
        { text: 'CA', type: 'primary', ipa: 'ˈkeɪ', pitch: 3, label: 'Nhấn chính từ 2' },
        { text: 'tion', type: 'unstressed', ipa: 'ʃən', pitch: 1 }
      ],
      patternCode: '[O o o] • [o • O o]',
      primaryIndex: 0,
      stressRule: 'Cụm gồm 2 từ: "tertiary" nhấn âm tiết 1 (/ˈtɜː.ʃər.i/), "education" có trọng âm chính rơi vào âm tiết thứ 3 (/ˌedʒ.ʊˈkeɪ.ʃən/).',
      commonMistakes: 'Thí sinh hay phát âm nhầm "tertiary" thành 4 âm tiết rườm rà. Trong tiếng Anh chuẩn, nó được phát âm gọn gàng là /ˈtɜː.ʃər.i/.'
    },
    definitionVi: 'Giáo dục bậc cao (bao gồm đại học, học viện nghiên cứu và trường cao đẳng nghề sau khi tốt nghiệp trung học phổ thông).',
    definitionEn: 'Education at college or university level, following secondary school.',

    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['studying after school', 'go to college', 'university study'],
        example: 'Many students want to study after school.',
        examinerNote: 'Diễn đạt vụng về, không phân biệt được các bậc học trong hệ thống giáo dục quốc tế.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['higher education', 'university education', 'post-secondary study'],
        example: 'Access to higher education has expanded considerably in recent decades.',
        examinerNote: 'Dùng từ chính xác, cấu trúc tự nhiên.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['tertiary education', 'academia', 'postgraduate matriculation', 'scholastic institutions of higher learning'],
        example: 'The democratization of tertiary education is indispensable for fostering a knowledge-based economy.',
        examinerNote: 'Thuật ngữ học thuật chính xác: tertiary education, knowledge-based economy, democratization.'
      }
    ],
    examinerTips: 'Trong đề thi IELTS Writing Task 2 về Education, việc luân chuyển giữa "higher education", "tertiary education" và "post-secondary schooling" giúp bạn đạt điểm tối đa ở tiêu chí Lexical Resource (tránh lặp từ "university").',

    wordFamily: {
      noun: ['tertiary education (giáo dục đại học)', 'educator (nhà giáo dục)', 'educationist (nhà nghiên cứu giáo dục)'],
      verb: ['educate (giáo dục, đào tạo)'],
      adjective: ['tertiary (bậc 3, bậc đại học)', 'educational (thuộc về giáo dục)', 'educated (có học thức)'],
      adverb: ['educationally (về mặt giáo dục)']
    },
    nominalisationExample: {
      basicSentence: 'More young people are entering universities today.',
      academicSentence: 'Surging enrollment in tertiary education reflects shifting labor market demands.',
      analysis: 'Cụm danh từ "Surging enrollment in tertiary education" thay thế hoàn hảo cho câu trần thuật thông thường.'
    },
    collocations: [
      {
        type: 'Verb + Noun',
        phrase: 'pursue tertiary education',
        meaning: 'theo đuổi việc học đại học',
        example: 'An increasing proportion of high school graduates aspire to pursue tertiary education abroad.'
      },
      {
        type: 'Verb + Noun',
        phrase: 'subsidize tertiary education',
        meaning: 'trợ cấp học phí đại học',
        example: 'Several Nordic countries generously subsidize tertiary education for all citizens.'
      },
      {
        type: 'Adjective + Noun',
        phrase: 'tertiary education sector',
        meaning: 'khối/ngành giáo dục đại học',
        example: 'Commercialization of the tertiary education sector has raised concerns regarding pedagogical quality.'
      },
      {
        type: 'Prepositional',
        phrase: 'prerequisite for tertiary education',
        meaning: 'điều kiện tiên quyết để vào đại học',
        example: 'Standardized examinations are frequently regarded as a prerequisite for tertiary education entry.'
      }
    ],

    speakingContext: {
      part: 'Speaking Part 3',
      topic: 'Education & Employment',
      question: 'Do you believe a university degree is still necessary for career success today?',
      answer: 'In all honesty, while practical experience and digital acumen are gaining traction, pursuing tertiary education remains indispensable for specialized professions like medicine and law, which demand rigorous theoretical grounding.',
      translation: 'Thành thực mà nói, dù kinh nghiệm thực tế và sự nhạy bén công nghệ đang lên ngôi, việc theo đuổi giáo dục bậc cao vẫn là điều không thể thiếu đối với các ngành nghề chuyên môn như y khoa hay luật học vốn đòi hỏi nền tảng lý thuyết nghiêm ngặt.',
      keyVocabUsed: ['gaining traction', 'pursuing tertiary education', 'indispensable for specialized professions', 'rigorous theoretical grounding'],
      examinerInsight: 'Sử dụng cấu trúc đối lập tương phản "while X, Y remains indispensable" cùng collocations đắt giá: "rigorous theoretical grounding".'
    },
    writingContext: {
      task: 'Writing Task 2 (Agree or Disagree)',
      topic: 'Tuition Fees for Higher Education',
      prompt: 'Some people believe that tertiary education should be fully funded by the government. To what extent do you agree or disagree?',
      sentence: 'Universal state funding for tertiary education guarantees meritocratic social mobility, ensuring that underprivileged yet intellectually gifted students are not precluded from scholastic attainment by prohibitive tuition fees.',
      translation: 'Việc nhà nước tài trợ toàn phần cho giáo dục bậc cao bảo đảm sự dịch chuyển xã hội theo năng lực thực chất, giúp cho các sinh viên có hoàn cảnh khó khăn nhưng tài năng về trí tuệ không bị tước đoạt cơ hội thành tựu học thuật bởi mức học phí đắt đỏ.',
      keyVocabUsed: ['universal state funding', 'meritocratic social mobility', 'underprivileged yet intellectually gifted', 'precluded from scholastic attainment by prohibitive fees'],
      examinerInsight: 'Câu văn mẫu đạt chuẩn Band 9.0 Lexical Resource với hàng loạt cụm từ học thuật đỉnh cao: "meritocratic social mobility", "precluded from", "prohibitive tuition fees".'
    }
  },

  // 5. ARTIFICIAL INTELLIGENCE
  {
    id: 'dd-tech-05',
    word: 'artificial intelligence',
    partOfSpeech: 'collocation',
    posLabel: 'Collocation / Thuật ngữ công nghệ',
    bandLevel: 'Band 7.0',
    cefr: 'C1',
    topicId: 'technology',
    topicName: 'Công nghệ & Trí tuệ nhân tạo',
    topicIcon: '🤖',
    ipaUk: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/',
    ipaUs: '/ˌɑːr.t̬əˈfɪʃ.əl ɪnˈtel.ə.dʒəns/',
    phoneticDetails: {
      syllables: [
        { text: 'ar', type: 'secondary', ipa: 'ɑː', pitch: 2, label: 'Nhấn phụ' },
        { text: 'ti', type: 'unstressed', ipa: 'tɪ', pitch: 1 },
        { text: 'FI', type: 'primary', ipa: 'ˈfɪʃ', pitch: 3, label: 'Nhấn chính từ 1' },
        { text: 'cial', type: 'unstressed', ipa: 'əl', pitch: 1 },
        { text: '•', type: 'separator', ipa: '', pitch: 0 },
        { text: 'in', type: 'unstressed', ipa: 'ɪn', pitch: 1 },
        { text: 'TEL', type: 'primary', ipa: 'ˈtel', pitch: 3, label: 'Nhấn chính từ 2' },
        { text: 'li', type: 'unstressed', ipa: 'ɪ', pitch: 1 },
        { text: 'gence', type: 'unstressed', ipa: 'dʒəns', pitch: 1 }
      ],
      patternCode: '[o o O o] • [o O o o]',
      primaryIndex: 2,
      stressRule: 'Trọng âm chính rơi vào âm tiết thứ 3 của "artificial" (/fɪʃ/) và âm tiết thứ 2 của "intelligence" (/tel/).',
      commonMistakes: 'Thí sinh hay nuốt âm /ʃ/ trong "artificial" hoặc đọc sai âm đuôi /dʒəns/ trong "intelligence".'
    },
    definitionVi: 'Trí tuệ nhân tạo (hệ thống mô phỏng trí thông minh của con người thông qua thuật toán máy tính, học máy và phân tích dữ liệu lớn).',
    definitionEn: 'The simulation of human intelligence processes by computer systems, encompassing machine learning, reasoning, and self-correction.',

    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['smart computers', 'robots doing work', 'computer brain'],
        example: 'Computers can do smart things now.',
        examinerNote: 'Cách diễn đạt trẻ con, thiếu tính chuyên môn và không phù hợp với bài luận học thuật.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['AI technology', 'automated systems', 'machine learning algorithms'],
        example: 'Automated systems and AI technology are changing modern workplaces.',
        examinerNote: 'Sử dụng thuật ngữ chính xác, truyền tải rõ ràng thông điệp.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['autonomous computational systems', 'generative neural networks', 'algorithmic automation', 'cognitive computing'],
        example: 'The rapid proliferation of algorithmic automation and cognitive computing is restructuring global labor paradigms.',
        examinerNote: 'Thuật ngữ công nghệ học thuật đỉnh cao: algorithmic automation, restructuring global labor paradigms.'
      }
    ],
    examinerTips: 'Trong chủ đề Technology, kết hợp "artificial intelligence" với các động từ mạnh như "revolutionize", "disrupt", "streamline", "augment human capabilities".',

    wordFamily: {
      noun: ['artificial intelligence (trí tuệ nhân tạo)', 'artifice (sự khéo léo, mưu mẹo)', 'intelligence (trí thông minh, thông tin tình báo)'],
      verb: ['automate (tự động hóa)', 'synthesize (tổng hợp)'],
      adjective: ['artificially-intelligent (có trí tuệ nhân tạo)', 'algorithmic (mang tính thuật toán)', 'autonomous (tự trị, tự động)'],
      adverb: ['artificially (một cách nhân tạo)', 'intelligently (một cách thông minh)']
    },
    nominalisationExample: {
      basicSentence: 'Computers are getting smarter and taking people\'s jobs.',
      academicSentence: 'The advent of cognitive computing has accelerated widespread workforce displacement across clerical sectors.',
      analysis: 'Biến câu nói đời thường thành cụm danh từ "workforce displacement across clerical sectors" chuẩn điểm C2.'
    },
    collocations: [
      {
        type: 'Verb + Noun',
        phrase: 'harness artificial intelligence',
        meaning: 'khai thác sức mạnh trí tuệ nhân tạo',
        example: 'Medical researchers harness artificial intelligence to expedite genomic sequencing.'
      },
      {
        type: 'Verb + Noun',
        phrase: 'regulate artificial intelligence',
        meaning: 'kiểm soát/ban hành luật quản lý AI',
        example: 'Policymakers face the daunting challenge of regulating artificial intelligence without stifling innovation.'
      },
      {
        type: 'Adjective + Noun',
        phrase: 'disruptive artificial intelligence',
        meaning: 'trí tuệ nhân tạo mang tính đột phá/thay đổi cuộc chơi',
        example: 'Disruptive artificial intelligence technologies are redefining diagnostic radiology.'
      },
      {
        type: 'Prepositional',
        phrase: 'integration of artificial intelligence into',
        meaning: 'sự tích hợp trí tuệ nhân tạo vào...',
        example: 'The seamless integration of artificial intelligence into logistics optimizes supply chains.'
      }
    ],

    speakingContext: {
      part: 'Speaking Part 3',
      topic: 'Technology in Daily Life',
      question: 'Will artificial intelligence replace human teachers in the future?',
      answer: 'Personally, I doubt it. While artificial intelligence can effortlessly customize rote exercises, it utterly lacks the emotional empathy and interpersonal mentoring that human educators uniquely provide.',
      translation: 'Cá nhân tôi hoài nghi điều đó. Dù trí tuệ nhân tạo có thể dễ dàng cá nhân hóa các bài tập rập khuôn, nó hoàn toàn thiếu đi sự thấu cảm cảm xúc và khả năng kèm cặp giữa con người với con người mà chỉ các nhà giáo dục mới có thể mang lại.',
      keyVocabUsed: ['effortlessly customize', 'rote exercises', 'utterly lacks', 'emotional empathy', 'interpersonal mentoring'],
      examinerInsight: 'Câu trả lời thể hiện tư duy phản biện sắc sảo cùng việc sử dụng collocations tự nhiên: emotional empathy, interpersonal mentoring.'
    },
    writingContext: {
      task: 'Writing Task 2 (Discussion & Opinion)',
      topic: 'Automation and Employment',
      prompt: 'Some fear that artificial intelligence will cause mass unemployment. Others argue it will create new opportunities. Discuss both views.',
      sentence: 'Although the unchecked deployment of artificial intelligence may induce transient frictional unemployment, it simultaneously spawns high-skilled vocations and liberates workers from hazardous, repetitive toil.',
      translation: 'Dù cho việc triển khai không kiểm soát trí tuệ nhân tạo có thể gây ra tình trạng thất nghiệp cọ xát mang tính nhất thời, nó đồng thời sản sinh ra các ngành nghề đòi hỏi kỹ năng cao và giải phóng người lao động khỏi những công việc nặng nhọc, nguy hiểm và lặp đi lặp lại.',
      keyVocabUsed: ['unchecked deployment', 'transient frictional unemployment', 'spawns high-skilled vocations', 'repetitive toil'],
      examinerInsight: 'Sử dụng chính xác thuật ngữ kinh tế học "frictional unemployment" cùng ngôn ngữ trang trọng "repetitive toil" thuyết phục tuyệt đối ban giám khảo.'
    }
  },

  // 6. PEDAGOGICAL METHODOLOGY
  {
    id: 'dd-std-06',
    word: 'pedagogical methodology',
    partOfSpeech: 'collocation',
    posLabel: 'Collocation / Cụm danh từ chuyên sâu',
    bandLevel: 'Band 8.0',
    cefr: 'C2',
    topicId: 'study',
    topicName: 'Học tập & Giáo dục học',
    topicIcon: '📚',
    ipaUk: '/ˌped.əˈɡɒdʒ.ɪ.kəl ˌmeθ.əˈdɒl.ə.dʒi/',
    ipaUs: '/ˌped.əˈɡɑː.dʒɪ.kəl ˌmeθ.əˈdɑː.lə.dʒi/',
    phoneticDetails: {
      syllables: [
        { text: 'ped', type: 'unstressed', ipa: 'ped', pitch: 1 },
        { text: 'a', type: 'unstressed', ipa: 'ə', pitch: 1 },
        { text: 'GO', type: 'primary', ipa: 'ˈɡɒdʒ', pitch: 3, label: 'Nhấn chính từ 1' },
        { text: 'i', type: 'unstressed', ipa: 'ɪ', pitch: 1 },
        { text: 'cal', type: 'unstressed', ipa: 'kəl', pitch: 1 },
        { text: '•', type: 'separator', ipa: '', pitch: 0 },
        { text: 'meth', type: 'secondary', ipa: 'meθ', pitch: 2, label: 'Nhấn phụ' },
        { text: 'o', type: 'unstressed', ipa: 'ə', pitch: 1 },
        { text: 'DO', type: 'primary', ipa: 'ˈdɒl', pitch: 3, label: 'Nhấn chính từ 2' },
        { text: 'o', type: 'unstressed', ipa: 'ə', pitch: 1 },
        { text: 'gy', type: 'unstressed', ipa: 'dʒi', pitch: 1 }
      ],
      patternCode: '[o o O o o] • [o o O o o]',
      primaryIndex: 2,
      stressRule: 'Cả 2 từ đều là từ đa âm tiết có trọng âm rơi vào âm tiết thứ 3: pe-da-GO-ji-cal và me-tho-DO-lo-gy.',
      commonMistakes: 'Thí sinh hay phát âm nhầm "pedagogical" thành âm /g/ cứng thay vì âm /dʒ/ mềm. Phiên âm chuẩn là /ˌped.əˈɡɒdʒ.ɪ.kəl/.'
    },
    definitionVi: 'Phương pháp luận sư phạm (hệ thống các nguyên tắc, lý thuyết và kỹ thuật giảng dạy khoa học trong giáo dục).',
    definitionEn: 'The systematic principles, theories, and instructional strategies employed by educators to impart knowledge effectively.',

    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['teaching ways', 'how teachers teach', 'teaching styles'],
        example: 'Good teaching ways help students understand better.',
        examinerNote: 'Từ ngữ sơ đẳng, văn phong nói bình dân không đạt tiêu chuẩn viết học thuật.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['teaching methods', 'instructional techniques', 'educational practices'],
        example: 'Innovative teaching methods can substantially improve student engagement.',
        examinerNote: 'Dùng từ chính xác, cấu trúc tự nhiên.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['pedagogical methodology', 'andragogical frameworks', 'epistemological instruction', 'differentiated pedagogy'],
        example: 'A modern pedagogical methodology emphasizes student-centric inquiry over didactic lecturing.',
        examinerNote: 'Cụm từ chuyên môn giáo dục học đỉnh cao: student-centric inquiry over didactic lecturing.'
      }
    ],
    examinerTips: 'Khi viết về giáo dục, hãy dùng "pedagogical methodology" để thay thế cho cụm "teaching style" hoặc "way of teaching".',

    wordFamily: {
      noun: ['pedagogy (ngành sư phạm, phương pháp giảng dạy)', 'pedagogue (nhà sư phạm)', 'methodology (phương pháp luận)'],
      verb: ['instruct (hướng dẫn)', 'impart (truyền đạt)'],
      adjective: ['pedagogical (thuộc về sư phạm)', 'methodological (thuộc về phương pháp luận)'],
      adverb: ['pedagogically (về mặt sư phạm)', 'methodologically (về mặt phương pháp luận)']
    },
    nominalisationExample: {
      basicSentence: 'Teachers should change how they teach to make students think critically.',
      academicSentence: 'The refinement of pedagogical methodology stimulates higher-order cognitive processing.',
      analysis: 'Cụm "higher-order cognitive processing" kết hợp "refinement of pedagogical methodology" thể hiện đẳng cấp văn phong Band 8.5+.'
    },
    collocations: [
      {
        type: 'Verb + Noun',
        phrase: 'overhaul pedagogical methodology',
        meaning: 'cải tổ toàn diện phương pháp luận sư phạm',
        example: 'Educational ministries must urgently overhaul outdated pedagogical methodologies.'
      },
      {
        type: 'Adjective + Noun',
        phrase: 'student-centered pedagogical methodology',
        meaning: 'phương pháp sư phạm lấy học viên làm trung tâm',
        example: 'Adopting a student-centered pedagogical methodology fosters creative problem-solving skills.'
      },
      {
        type: 'Prepositional',
        phrase: 'grounded in robust pedagogical methodology',
        meaning: 'được xây dựng trên nền tảng phương pháp sư phạm vững chắc',
        example: 'Digital learning platforms must be grounded in sound pedagogical methodology rather than superficial gamification.'
      }
    ],

    speakingContext: {
      part: 'Speaking Part 3',
      topic: 'Modern Education Methods',
      question: 'How have teaching methods changed in your country over recent years?',
      answer: 'Significantly so. Instructors have progressively discarded obsolete didactic rote-learning in favor of an interactive pedagogical methodology centered around collaborative projects and critical debate.',
      translation: 'Rất đáng kể. Các giảng viên đã dần dần loại bỏ phương pháp học vẹt giáo điều lỗi thời để chuyển sang phương pháp sư phạm tương tác tập trung vào các dự án hợp tác và thảo luận phản biện.',
      keyVocabUsed: ['progressively discarded', 'obsolete didactic rote-learning', 'interactive pedagogical methodology', 'collaborative projects'],
      examinerInsight: 'Sử dụng thành thạo chuỗi collocations đối lập giữa "didactic rote-learning" và "interactive pedagogical methodology".'
    },
    writingContext: {
      task: 'Writing Task 2 (Problem & Solution)',
      topic: 'Declining Academic Standards',
      prompt: 'In some nations, students show declining interest in science subjects. What causes this and what solutions can be implemented?',
      sentence: 'To rekindle adolescent enthusiasm for rigorous scientific disciplines, schools must overhaul archaic pedagogical methodologies and incorporate hands-on experiential laboratories.',
      translation: 'Nhằm thắp lại niềm say mê của thanh thiếu niên đối với các bộ môn khoa học nghiêm ngặt, các nhà trường buộc phải cải tổ các phương pháp luận sư phạm cổ hủ và tích hợp các phòng thí nghiệm trải nghiệm thực hành.',
      keyVocabUsed: ['rekindle adolescent enthusiasm', 'rigorous scientific disciplines', 'overhaul archaic pedagogical methodologies', 'hands-on experiential laboratories'],
      examinerInsight: 'Động từ "rekindle" kết hợp với tính từ "archaic pedagogical methodologies" tạo nên một câu văn đầy sức nặng học thuật.'
    }
  },

  // 7. SEDENTARY LIFESTYLE
  {
    id: 'dd-spt-07',
    word: 'sedentary lifestyle',
    partOfSpeech: 'collocation',
    posLabel: 'Collocation / Cụm danh từ y tế & đời sống',
    bandLevel: 'Band 6.5',
    cefr: 'B2/C1',
    topicId: 'sport',
    topicName: 'Thể thao & Lối sống ít vận động',
    topicIcon: '🛋️',
    ipaUk: '/ˈsed.ən.tər.i ˈlaɪf.staɪl/',
    ipaUs: '/ˈsed.ən.ter.i ˈlaɪf.staɪl/',
    phoneticDetails: {
      syllables: [
        { text: 'SED', type: 'primary', ipa: 'ˈsed', pitch: 3, label: 'Nhấn chính từ 1' },
        { text: 'en', type: 'unstressed', ipa: 'ən', pitch: 1 },
        { text: 'ta', type: 'unstressed', ipa: 'tər', pitch: 1 },
        { text: 'ry', type: 'unstressed', ipa: 'i', pitch: 1 },
        { text: '•', type: 'separator', ipa: '', pitch: 0 },
        { text: 'LIFE', type: 'primary', ipa: 'ˈlaɪf', pitch: 3, label: 'Nhấn chính từ 2' },
        { text: 'style', type: 'unstressed', ipa: 'staɪl', pitch: 1 }
      ],
      patternCode: '[O o o o] • [O o]',
      primaryIndex: 0,
      stressRule: '"sedentary" nhấn âm tiết 1 (/ˈsed.ən.tər.i/), "lifestyle" nhấn âm tiết 1 (/ˈlaɪf.staɪl/).',
      commonMistakes: 'Thí sinh hay nhấn nhầm vào âm 2 (*se-DEN-tary). Hãy nhớ trọng âm nằm ngay âm tiết đầu tiên: SED-en-tary.'
    },
    definitionVi: 'Lối sống lười vận động, ngồi nhiều (ít hoạt động thể chất, phổ biến ở nhân viên văn phòng và người nghiện màn hình điện tử).',
    definitionEn: 'A lifestyle characterized by much sitting and little physical exercise.',

    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['lazy life', 'sitting all day', 'not moving much'],
        example: 'Sitting all day is bad for human health.',
        examinerNote: 'Diễn đạt sơ cấp, thiếu vốn từ học thuật y tế.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['inactive lifestyle', 'lack of physical exercise', 'couch-potato habit'],
        example: 'An inactive lifestyle often leads to severe health complications.',
        examinerNote: 'Từ vựng chuẩn mực, diễn đạt gãy gọn.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['sedentary lifestyle', 'physical inertia', 'prolonged sitting habits', 'hypokinetic disease patterns'],
        example: 'The contemporary epidemic of sedentary lifestyles contributes directly to non-communicable lifestyle ailments.',
        examinerNote: 'Sử dụng cụm từ y tế công cộng đỉnh cao: physical inertia, non-communicable lifestyle ailments.'
      }
    ],
    examinerTips: 'Đây là collocation "tủ" trong các đề IELTS về Health, Sports, và Work-life balance. Luôn đi kèm với các danh từ như: obesity, cardiovascular disease, hypertension.',

    wordFamily: {
      noun: ['sedentariness (tình trạng ít vận động)', 'lifestyle (lối sống)'],
      verb: ['(Dùng cụm: lead / adopt a sedentary lifestyle)'],
      adjective: ['sedentary (ngồi nhiều, ít vận động)'],
      adverb: ['sedentarily (một cách thụ động, ít vận động)']
    },
    nominalisationExample: {
      basicSentence: 'People sit too much at work and get sick.',
      academicSentence: 'Prolonged occupational sedentariness is a statistically proven precursor to chronic cardiovascular morbidity.',
      analysis: 'Chuyển đổi sang cụm "occupational sedentariness" và "cardiovascular morbidity" thể hiện độ phong phú từ vựng Band 9.0.'
    },
    collocations: [
      {
        type: 'Verb + Noun',
        phrase: 'lead a sedentary lifestyle',
        meaning: 'duy trì lối sống ít vận động',
        example: 'Office workers who lead a sedentary lifestyle face heightened risks of musculoskeletal disorders.'
      },
      {
        type: 'Verb + Noun',
        phrase: 'counteract a sedentary lifestyle',
        meaning: 'chống lại/hóa giải tác hại của lối sống ngồi nhiều',
        example: 'Taking brisk thirty-minute daily walks helps counteract a sedentary lifestyle.'
      },
      {
        type: 'Adjective + Noun',
        phrase: 'predisposed to a sedentary lifestyle',
        meaning: 'dễ có khuynh hướng rơi vào lối sống thụ động',
        example: 'Urban residents surrounded by concrete sprawl are overwhelmingly predisposed to a sedentary lifestyle.'
      }
    ],

    speakingContext: {
      part: 'Speaking Part 1',
      topic: 'Daily Routine & Fitness',
      question: 'Do you get enough physical exercise every day?',
      answer: 'Frankly speaking, not nearly as much as I ought to. Because my job requires staring at computer screens for eight hours straight, I often succumb to a sedentary lifestyle on weekdays.',
      translation: 'Thành thực mà nói, gần như không nhiều như tôi đáng lẽ phải làm. Vì công việc của tôi đòi hỏi phải dán mắt vào màn hình máy tính 8 tiếng liên tục, tôi thường rơi vào lối sống ít vận động trong các ngày làm việc trong tuần.',
      keyVocabUsed: ['not nearly as much as I ought to', 'staring at screens straight', 'succumb to a sedentary lifestyle'],
      examinerInsight: 'Cụm từ "succumb to a sedentary lifestyle" diễn đạt tâm lý và thói quen một cách cực kỳ tự nhiên và giàu sắc thái.'
    },
    writingContext: {
      task: 'Writing Task 2 (Cause & Solution)',
      topic: 'Public Health and Modern Lifestyles',
      prompt: 'Modern lifestyles are causing serious health problems around the world. What are the main issues and how can governments tackle them?',
      sentence: 'The insidious entrenchment of sedentary lifestyles, fostered by desk-bound automation and ubiquitous digital entertainment, is burdening public healthcare infrastructures with unprecedented rates of diabetes and cardiovascular ailments.',
      translation: 'Sự ăn sâu âm thầm của lối sống ít vận động, được tiếp tay bởi sự tự động hóa nơi bàn làm việc và các hình thức giải trí kỹ thuật số tràn ngập khắp nơi, đang tạo gánh nặng lên cơ sở hạ tầng y tế công cộng với tỷ lệ mắc bệnh tiểu đường và tim mạch chưa từng có.',
      keyVocabUsed: ['insidious entrenchment of sedentary lifestyles', 'desk-bound automation', 'ubiquitous digital entertainment', 'cardiovascular ailments'],
      examinerInsight: 'Sử dụng từ vựng miêu tả đắt giá: "insidious entrenchment", "desk-bound", "unprecedented rates" đạt điểm tối đa Lexical Resource.'
    }
  },

  // 8. TRANSIT-ORIENTED DEVELOPMENT
  {
    id: 'dd-tra-08',
    word: 'transit-oriented development',
    partOfSpeech: 'collocation',
    posLabel: 'Collocation / Quy hoạch đô thị & Giao thông',
    bandLevel: 'Band 8.0',
    cefr: 'C2',
    topicId: 'transport',
    topicName: 'Giao thông & Quy hoạch đô thị',
    topicIcon: '🚆',
    ipaUk: '/ˈtræn.zɪt ˈɔː.ri.en.tɪd dɪˈvel.əp.mənt/',
    ipaUs: '/ˈtræn.sɪt ˈɔːr.i.en.t̬ɪd dɪˈvel.əp.mənt/',
    phoneticDetails: {
      syllables: [
        { text: 'TRAN', type: 'primary', ipa: 'ˈtræn', pitch: 3, label: 'Nhấn từ 1' },
        { text: 'sit', type: 'unstressed', ipa: 'zɪt', pitch: 1 },
        { text: '•', type: 'separator', ipa: '', pitch: 0 },
        { text: 'OR', type: 'primary', ipa: 'ˈɔː', pitch: 3, label: 'Nhấn từ 2' },
        { text: 'i', type: 'unstressed', ipa: 'ri', pitch: 1 },
        { text: 'en', type: 'unstressed', ipa: 'en', pitch: 1 },
        { text: 'ted', type: 'unstressed', ipa: 'tɪd', pitch: 1 },
        { text: '•', type: 'separator', ipa: '', pitch: 0 },
        { text: 'de', type: 'unstressed', ipa: 'dɪ', pitch: 1 },
        { text: 'VEL', type: 'primary', ipa: 'ˈvel', pitch: 3, label: 'Nhấn từ 3' },
        { text: 'op', type: 'unstressed', ipa: 'əp', pitch: 1 },
        { text: 'ment', type: 'unstressed', ipa: 'mənt', pitch: 1 }
      ],
      patternCode: '[O o] • [O o o o] • [o O o o]',
      primaryIndex: 0,
      stressRule: 'Cụm gồm 3 từ: TRAN-sit, OR-i-en-ted và de-VEL-op-ment (nhấn âm 2).',
      commonMistakes: 'Thí sinh hay quên phát âm âm đuôi /t/ trong "transit" và nuốt âm "-ment".'
    },
    definitionVi: 'Mô hình phát triển đô thị định hướng giao thông công cộng (TOD - tối đa hóa không gian cư trú, thương mại trong phạm vi đi bộ đến các ga tàu điện hoặc bến xe buýt).',
    definitionEn: 'An urban planning paradigm that maximizes residential, business, and leisure space within walking proximity of public transport hubs.',

    upgradeLadder: [
      {
        band: 'Band 4.0 - 5.0',
        levelLabel: 'Cơ bản (Foundation)',
        color: '#64748B',
        bgColor: '#F1F5F9',
        borderColor: '#CBD5E1',
        phrases: ['building near bus stops', 'city with buses', 'close to station'],
        example: 'Building houses near train stations helps people travel easily.',
        examinerNote: 'Từ ngữ mộc mạc, không dùng được thuật ngữ chuyên môn quy hoạch.'
      },
      {
        band: 'Band 6.0 - 6.5',
        levelLabel: 'Học thuật chuẩn (Academic)',
        color: '#059669',
        bgColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        phrases: ['public transport-friendly cities', 'integrated transport networks', 'compact city design'],
        example: 'Designing integrated transport networks reduces reliance on private vehicles.',
        examinerNote: 'Thuật ngữ rõ ràng, đạt chuẩn band điểm khá.'
      },
      {
        band: 'Band 7.5 - 9.0',
        levelLabel: 'Chuyên gia & Bản xứ (Expert)',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        phrases: ['transit-oriented development', 'pedestrian-centric urbanism', 'polycentric mobility corridors'],
        example: 'Pioneering transit-oriented development serves as an indispensable antidote to sprawling automobile dependency.',
        examinerNote: 'Collocation quy hoạch đô thị điểm 9.0: transit-oriented development, sprawling automobile dependency.'
      }
    ],
    examinerTips: 'Khi gặp đề bài Writing Task 2 về đô thị hóa (Urbanization) hoặc kẹt xe (Traffic Congestion), hãy dùng cụm từ "transit-oriented development (TOD)" làm giải pháp trọng tâm.',

    wordFamily: {
      noun: ['transit (giao thông vận tải, sự đi qua)', 'development (sự phát triển)', 'developer (nhà phát triển quy hoạch)'],
      verb: ['transit (đi qua)', 'orient (định hướng)', 'develop (phát triển)'],
      adjective: ['transit-oriented (định hướng giao thông)', 'transitory (tạm thời, ngắn ngủi)'],
      adverb: ['transitively (về mặt bắc cầu)']
    },
    nominalisationExample: {
      basicSentence: 'If we build apartments next to subway stations, fewer people will drive cars.',
      academicSentence: 'The widespread adoption of transit-oriented development directly curtails private vehicle dependency and mitigating carbon emissions.',
      analysis: 'Chuyển hóa cấu trúc điều kiện đơn giản thành mệnh đề chủ ngữ danh từ học thuật.'
    },
    collocations: [
      {
        type: 'Verb + Noun',
        phrase: 'implement transit-oriented development',
        meaning: 'triển khai mô hình phát triển đô thị định hướng giao thông',
        example: 'Metropolitan authorities should prioritize implementing transit-oriented development policies.'
      },
      {
        type: 'Adjective + Noun',
        phrase: 'sustainable transit-oriented development',
        meaning: 'mô hình TOD bền vững',
        example: 'Sustainable transit-oriented development harmonizes high-density housing with green pedestrian plazas.'
      },
      {
        type: 'Prepositional',
        phrase: 'at the core of transit-oriented development',
        meaning: 'nằm ở trọng tâm của mô hình TOD',
        example: 'Walkability and accessibility lie at the core of transit-oriented development.'
      }
    ],

    speakingContext: {
      part: 'Speaking Part 3',
      topic: 'Urban Living & Transport',
      question: 'How can cities encourage residents to use public transport more frequently?',
      answer: 'In my view, the most pragmatic approach is investing in transit-oriented development, so that commercial amenities, schools, and residences are situated right above metro terminals, making car ownership practically superfluous.',
      translation: 'Theo quan điểm của tôi, cách tiếp cận thực tế nhất là đầu tư vào mô hình phát triển định hướng giao thông công cộng, để các tiện ích thương mại, trường học và nhà ở tọa lạc ngay phía trên các ga tàu điện, khiến cho việc sở hữu xe hơi trở nên gần như không còn cần thiết.',
      keyVocabUsed: ['pragmatic approach', 'transit-oriented development', 'commercial amenities', 'practically superfluous'],
      examinerInsight: 'Sử dụng từ vựng cực kỳ tinh tế "practically superfluous" (gần như thừa thãi) thay cho "not necessary".'
    },
    writingContext: {
      task: 'Writing Task 2 (Problem & Solution)',
      topic: 'Traffic Jams & Urban Sprawl',
      prompt: 'Traffic congestion in major cities is an increasing problem. What are the causes and what measures can be taken to solve it?',
      sentence: 'Rather than continually constructing peripheral highways that merely induce demand, municipal planners should pioneer transit-oriented development, integrating high-density mixed-use zoning with rapid mass transit.',
      translation: 'Thay vì liên tục xây dựng các tuyến đường cao tốc vành đai vốn chỉ kích thích thêm nhu cầu đi lại, các nhà quy hoạch đô thị nên đi tiên phong trong việc phát triển định hướng giao thông công cộng, tích hợp các khu vực quy hoạch hỗn hợp mật độ cao với mạng lưới vận tải hành khách khối lượng lớn tốc độ cao.',
      keyVocabUsed: ['peripheral highways', 'induce demand', 'pioneer transit-oriented development', 'high-density mixed-use zoning', 'rapid mass transit'],
      examinerInsight: 'Một câu văn chuẩn Band 9.0 với dày đặc các thuật ngữ học thuật chuyên ngành kiến trúc quy hoạch và giao thông.'
    }
  }
];

// LỚP QUẢN LÝ DỮ LIỆU VÀ PHÂN TÍCH LEXICAL DEEP-DIVE
class IeltsLexicalDataHelper {
  static getDeepDiveData(wordOrId) {
    if (!wordOrId) return null;
    const query = String(wordOrId).trim().toLowerCase();

    // 0. Tìm ưu tiên trong Kho 10 Từ Cốt Lõi Benchmark Khảo Thí Cambridge (IELTS_BENCHMARK_DATASET)
    if (typeof IeltsBenchmarkDataService !== 'undefined') {
      const benchmarkItem = IeltsBenchmarkDataService.findWord(query);
      if (benchmarkItem) {
        return IeltsBenchmarkDataService.toDeepDiveFormat(benchmarkItem);
      }
    } else if (typeof window !== 'undefined' && window.IeltsBenchmarkDataService) {
      const benchmarkItem = window.IeltsBenchmarkDataService.findWord(query);
      if (benchmarkItem) {
        return window.IeltsBenchmarkDataService.toDeepDiveFormat(benchmarkItem);
      }
    }

    // 1. Tìm trực tiếp trong kho Deep-Dive đã biên soạn công phu
    const directMatch = IELTS_LEXICAL_DEEP_DIVE_DATABASE.find(
      (item) => item.id.toLowerCase() === query || item.word.toLowerCase() === query
    );
    if (directMatch) return directMatch;

    // 2. Tìm trong CSDL Ma Trận Từ Vựng (IELTS_VOCABULARY_MATRIX_DATABASE)
    let matrixWord = null;
    if (typeof IELTS_VOCABULARY_MATRIX_DATABASE !== 'undefined') {
      matrixWord = IELTS_VOCABULARY_MATRIX_DATABASE.find(
        (w) => w.id.toLowerCase() === query || w.word.toLowerCase() === query
      );
    }

    // 3. Tìm trong CSDL Vocab Database cũ (IELTS_VOCABULARY_DATABASE)
    if (!matrixWord && typeof IELTS_VOCABULARY_DATABASE !== 'undefined') {
      matrixWord = IELTS_VOCABULARY_DATABASE.find(
        (w) => w.id.toLowerCase() === query || w.word.toLowerCase() === query
      );
    }

    // 4. Nếu tìm thấy ở các kho khác, tự động sinh dữ liệu Deep-Dive hoàn chỉnh
    if (matrixWord) {
      return this.synthesizeDeepDiveFromMatrix(matrixWord);
    }

    // 5. Nếu hoàn toàn là từ mới bất kỳ, tạo Fallback thông minh
    return this.createGenericFallbackDeepDive(wordOrId);
  }

  /**
   * Tự động phân tích và tạo cấu trúc Deep-Dive từ một mục từ ma trận
   */
  static synthesizeDeepDiveFromMatrix(w) {
    const wordText = w.word;
    const syllablesParsed = this.parseSyllablesAndStress(wordText, w.stress || '', w.ipaUk || '');

    const synList = w.synonyms || ['academic equivalent', 'alternative expression'];
    const collocList = w.collocations || ['common academic collocation', 'key collocation'];

    return {
      id: w.id || `dd-synth-${Date.now()}`,
      word: wordText,
      partOfSpeech: w.partOfSpeech || 'vocabulary',
      posLabel: `${(w.partOfSpeech || 'word').toUpperCase()} (Học thuật IELTS)`,
      bandLevel: w.bandTier || 'Band 6.5 - 7.5',
      cefr: w.cefr || 'B2/C1',
      topicId: w.topicId || 'study',
      topicName: 'Từ vựng Học thuật Cambridge',
      topicIcon: '🎯',
      ipaUk: w.ipaUk || '/.../',
      ipaUs: w.ipaUs || w.ipaUk || '/.../',
      phoneticDetails: {
        syllables: syllablesParsed.syllables,
        patternCode: syllablesParsed.patternCode,
        primaryIndex: syllablesParsed.primaryIndex,
        stressRule: `Trọng âm chính rơi vào âm tiết: ${syllablesParsed.primaryText}. Hãy nhấn to hơn, cao hơn và ngân dài âm tiết này khi giao tiếp.`,
        commonMistakes: 'Lưu ý phát âm rõ các âm cuối (ending sounds) và không nuốt âm phụ.'
      },
      definitionVi: w.definitionVi || 'Định nghĩa học thuật tiếng Việt chuẩn IELTS.',
      definitionEn: w.definitionEn || 'Academic definition explaining core meaning and usage.',

      upgradeLadder: [
        {
          band: 'Band 4.0 - 5.0',
          levelLabel: 'Cơ bản (Foundation)',
          color: '#64748B',
          bgColor: '#F1F5F9',
          borderColor: '#CBD5E1',
          phrases: ['basic usage', 'common expression'],
          example: `In daily conversation, learners often use simple synonyms instead of "${wordText}".`,
          examinerNote: 'Cách diễn đạt cơ bản, dễ hiểu nhưng nếu lặp lại nhiều sẽ bị giới hạn ở Band 5.0.'
        },
        {
          band: 'Band 6.0 - 6.5',
          levelLabel: 'Học thuật chuẩn (Academic)',
          color: '#059669',
          bgColor: '#ECFDF5',
          borderColor: '#A7F3D0',
          phrases: synList.slice(0, 2),
          example: `Using terms like ${synList[0] || wordText} satisfies standard university entrance criteria.`,
          examinerNote: 'Đạt chuẩn tiêu chí Lexical Resource cho kỳ thi đại học quốc tế.'
        },
        {
          band: 'Band 7.5 - 9.0',
          levelLabel: 'Chuyên gia & Bản xứ (Expert)',
          color: '#7C3AED',
          bgColor: '#F5F3FF',
          borderColor: '#DDD6FE',
          phrases: [wordText, ...(synList.slice(1, 3))],
          example: w.exampleEn || `Academics frequently employ "${wordText}" to convey nuanced intellectual arguments.`,
          examinerNote: 'Từ vựng có sắc thái chính xác, tự nhiên, gây ấn tượng mạnh với giám khảo chấm thi.'
        }
      ],
      examinerTips: `Khi áp dụng "${wordText}" vào bài thi, hãy kết hợp cùng các collocations tự nhiên và tránh nhồi nhét từ ngữ khi chưa nắm vững sắc thái ngữ cảnh.`,

      wordFamily: {
        noun: [wordText.includes(' ') ? wordText : `${wordText} (danh từ/khái niệm cốt lõi)`],
        verb: [`utilize / deploy ${wordText}`],
        adjective: [`pertinent to ${wordText}`, 'academic'],
        adverb: ['comprehensively', 'fundamentally']
      },
      nominalisationExample: {
        basicSentence: `Students can use ${wordText} when they express academic ideas.`,
        academicSentence: `The proficient deployment of ${wordText} enriches the candidate's discourse coherence and lexical precision.`,
        analysis: 'Kỹ thuật danh từ hóa giúp biến đổi các ý kiến chủ quan thành văn phong nghị luận khách quan, học thuật chuẩn Band 8.0+.'
      },
      collocations: collocList.map((c, idx) => ({
        type: idx === 0 ? 'Verb + Collocation' : idx === 1 ? 'Adjective + Collocation' : 'Prepositional',
        phrase: c,
        meaning: `kết hợp từ tự nhiên chuẩn Cambridge của "${wordText}"`,
        example: `Candidates should practice incorporating "${c}" into their spoken and written repertoire.`
      })),

      speakingContext: {
        part: 'Speaking Part 2 / 3',
        topic: 'Academic & Daily Perspectives',
        question: `How significant is ${wordText} in contemporary society?`,
        answer: `To my mind, ${wordText} plays an indispensable role. When examining modern trends, one cannot overlook how it shapes public discourse and individual choices.`,
        translation: `Theo suy nghĩ của tôi, ${wordText} đóng một vai trò không thể thiếu. Khi xem xét các xu hướng hiện đại, người ta không thể bỏ qua cách nó định hình các cuộc thảo luận xã hội và những lựa chọn của mỗi cá nhân.`,
        keyVocabUsed: [wordText, 'indispensable role', 'public discourse'],
        examinerInsight: 'Sử dụng discourse markers tự nhiên cùng cụm từ học thuật mượt mà.'
      },
      writingContext: {
        task: 'Writing Task 2 (Academic Essay)',
        topic: 'Socio-economic & Educational Trends',
        prompt: `Discuss the implications of modern developments regarding ${wordText}.`,
        sentence: w.exampleEn || `The profound implications of ${wordText} necessitate a balanced, multi-faceted analytical approach.`,
        translation: w.exampleVi || `Những tác động sâu sắc của ${wordText} đòi hỏi một phương pháp tiếp cận phân tích đa chiều và cân bằng.`,
        keyVocabUsed: [wordText, 'profound implications', 'multi-faceted approach'],
        examinerInsight: 'Cấu trúc câu phức cân đối, thể hiện tư duy học thuật sắc sảo.'
      }
    };
  }

  /**
   * Tạo fallback cho một từ bất kỳ nhập vào
   */
  static createGenericFallbackDeepDive(wordText) {
    const cleanWord = String(wordText).trim();
    const syllablesParsed = this.parseSyllablesAndStress(cleanWord, '', '');

    return {
      id: `dd-gen-${Date.now()}`,
      word: cleanWord,
      partOfSpeech: 'lexical item',
      posLabel: 'Lexical Resource Item',
      bandLevel: 'Band 7.0+',
      cefr: 'C1',
      topicId: 'general',
      topicName: 'Chủ Điểm IELTS Tổng Quát',
      topicIcon: '📖',
      ipaUk: `/${cleanWord.toLowerCase()}/`,
      ipaUs: `/${cleanWord.toLowerCase()}/`,
      phoneticDetails: {
        syllables: syllablesParsed.syllables,
        patternCode: syllablesParsed.patternCode,
        primaryIndex: syllablesParsed.primaryIndex,
        stressRule: `Trọng âm rơi vào: ${syllablesParsed.primaryText}. Đọc to, rõ, giữ độ cao âm tiết ổn định.`,
        commonMistakes: 'Chú ý nhấn đúng trọng âm và phát âm các phụ âm cuối.'
      },
      definitionVi: `Khái niệm học thuật tương ứng với "${cleanWord}" trong bài thi IELTS.`,
      definitionEn: `Academic term and expression related to "${cleanWord}".`,

      upgradeLadder: [
        {
          band: 'Band 5.0',
          levelLabel: 'Cơ bản',
          color: '#64748B',
          bgColor: '#F1F5F9',
          borderColor: '#CBD5E1',
          phrases: ['basic equivalent'],
          example: `Learners at lower bands often struggle to express "${cleanWord}" accurately.`,
          examinerNote: 'Dễ bị lặp từ hoặc dùng sai ngữ cảnh.'
        },
        {
          band: 'Band 6.5',
          levelLabel: 'Học thuật',
          color: '#059669',
          bgColor: '#ECFDF5',
          borderColor: '#A7F3D0',
          phrases: ['standard collocation', 'academic phrasing'],
          example: `Employing "${cleanWord}" in context satisfies standard lexical criteria.`,
          examinerNote: 'Sử dụng đúng ngữ cảnh và ngữ pháp.'
        },
        {
          band: 'Band 8.0+',
          levelLabel: 'Chuyên gia',
          color: '#7C3AED',
          bgColor: '#F5F3FF',
          borderColor: '#DDD6FE',
          phrases: [`sophisticated ${cleanWord}`, 'nuanced academic register'],
          example: `Mastering "${cleanWord}" elevates the discourse to an authoritative academic register.`,
          examinerNote: 'Thể hiện năng lực ngôn ngữ bản xứ tự nhiên.'
        }
      ],
      examinerTips: `Hãy trau chuốt ngữ cảnh và ghi nhớ collocations đi kèm của "${cleanWord}".`,

      wordFamily: {
        noun: [cleanWord],
        verb: [`apply ${cleanWord}`],
        adjective: [`relevant ${cleanWord}`],
        adverb: ['appropriately']
      },
      nominalisationExample: {
        basicSentence: `We can use ${cleanWord} in essays.`,
        academicSentence: `The rigorous application of ${cleanWord} demonstrates sophisticated lexical mastery.`,
        analysis: 'Kỹ thuật danh từ hóa giúp câu văn học thuật và trang trọng hơn.'
      },
      collocations: [
        {
          type: 'Standard Collocation',
          phrase: `effective ${cleanWord}`,
          meaning: `cách kết hợp phổ biến của "${cleanWord}"`,
          example: `Educators stress the value of effective ${cleanWord}.`
        }
      ],

      speakingContext: {
        part: 'Speaking Part 3',
        topic: 'Discussion & Analysis',
        question: `What are your thoughts on ${cleanWord}?`,
        answer: `I strongly reckon that ${cleanWord} is an essential facet of modern developments.`,
        translation: `Tôi tin tưởng mạnh mẽ rằng ${cleanWord} là một khía cạnh thiết yếu của các bước phát triển hiện đại.`,
        keyVocabUsed: [cleanWord, 'essential facet'],
        examinerInsight: 'Phát âm tự nhiên và tự tin.'
      },
      writingContext: {
        task: 'Writing Task 2',
        topic: 'Academic Perspective',
        prompt: `Discuss the role of ${cleanWord} in contemporary society.`,
        sentence: `The significance of ${cleanWord} remains an indisputable cornerstone in contemporary academic research.`,
        translation: `Tầm quan trọng của ${cleanWord} vẫn là một nền tảng không thể tranh cãi trong nghiên cứu học thuật đương đại.`,
        keyVocabUsed: [cleanWord, 'indisputable cornerstone'],
        examinerInsight: 'Văn phong trang trọng chuẩn Cambridge.'
      }
    };
  }

  /**
   * Phân tích âm tiết và dấu nhấn từ chuỗi từ vựng, stress và IPA
   */
  static parseSyllablesAndStress(word, stressStr = '', ipa = '') {
    const cleanWord = String(word).trim();

    // Nếu là cụm nhiều từ (collocation)
    if (cleanWord.includes(' ')) {
      const parts = cleanWord.split(' ');
      const syllables = [];
      let patternArr = [];

      parts.forEach((p, idx) => {
        syllables.push({
          text: p.toUpperCase(),
          type: idx === 0 ? 'primary' : 'secondary',
          ipa: '',
          pitch: idx === 0 ? 3 : 2,
          label: idx === 0 ? 'Nhấn chính' : 'Nhấn phụ'
        });
        patternArr.push(idx === 0 ? 'O' : 'o');
      });

      return {
        syllables,
        patternCode: `[${patternArr.join(' ')}]`,
        primaryIndex: 0,
        primaryText: parts[0]
      };
    }

    // Tách âm tiết cơ bản cho từ đơn dựa vào nguyên âm và độ dài
    // Thuật toán chia âm tiết tiếng Anh thực tế
    const syllables = [];
    let primaryIndex = 0;

    // Kiểm tra xem có stress gợi ý dạng "en-VI-ron-ment" không
    if (stressStr && stressStr.includes('-')) {
      const tokens = stressStr.replace(/Âm \d+: /i, '').trim().split('-');
      tokens.forEach((tok, i) => {
        const isUpper = tok === tok.toUpperCase() && tok.length > 1;
        if (isUpper) primaryIndex = i;
        syllables.push({
          text: tok,
          type: isUpper ? 'primary' : 'unstressed',
          ipa: '',
          pitch: isUpper ? 3 : 1,
          label: isUpper ? 'Nhấn chính' : 'Không nhấn'
        });
      });
    } else {
      // Heuristic chia âm tiết thông thường
      const syllRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
      const matches = cleanWord.match(syllRegex) || [cleanWord];

      // Thường từ 2 âm tiết danh từ/tính từ nhấn âm 1, động từ nhấn âm 2
      // Từ dài 3-4 âm tiết thường nhấn âm 2 hoặc 1
      if (matches.length === 2) primaryIndex = 0;
      else if (matches.length >= 3) primaryIndex = 1;

      matches.forEach((s, i) => {
        const isPrimary = i === primaryIndex;
        syllables.push({
          text: isPrimary ? s.toUpperCase() : s.toLowerCase(),
          type: isPrimary ? 'primary' : 'unstressed',
          ipa: '',
          pitch: isPrimary ? 3 : 1,
          label: isPrimary ? 'Nhấn chính' : 'Không nhấn'
        });
      });
    }

    const patternCode = `[${syllables.map((s) => (s.type === 'primary' ? 'O' : 'o')).join(' ')}]`;
    const primaryText = syllables[primaryIndex] ? syllables[primaryIndex].text : cleanWord;

    return {
      syllables,
      patternCode,
      primaryIndex,
      primaryText
    };
  }
}

// Xuất toàn cục cho trình duyệt và Node.js
if (typeof window !== 'undefined') {
  window.IELTS_LEXICAL_DEEP_DIVE_DATABASE = IELTS_LEXICAL_DEEP_DIVE_DATABASE;
  window.IeltsLexicalDataHelper = IeltsLexicalDataHelper;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IELTS_LEXICAL_DEEP_DIVE_DATABASE,
    IeltsLexicalDataHelper
  };
}
