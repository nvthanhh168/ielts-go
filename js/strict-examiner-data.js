/**
 * IELTS GO! - Dữ Liệu Đề Bài & Khảo Bài 1-on-1 Cùng Giám Khảo Victoria AI
 * Chế Độ 8: "👩‍🏫 Giám Khảo Victoria AI - Strict Cambridge Examiner"
 * Lấy cảm hứng từ phong cách "Cô giáo Tanaka" trên NIHONGO GO!
 */

const IELTS_VICTORIA_CHALLENGES = [
  {
    id: 'vic-ch-01',
    topicId: 'environment',
    topicName: 'Environment & Climate',
    topicIcon: '🌍',
    targetWord: 'mitigate',
    targetType: 'verb',
    targetIpa: '/ˈmɪt.ɪ.ɡeɪt/',
    targetMeaning: 'Làm giảm nhẹ, xoa dịu (mức độ nghiêm trọng của vấn đề)',
    targetCollocations: ['mitigate the adverse effects', 'mitigate climate change', 'mitigate environmental damage'],
    targetBand: '6.5',
    vietnamesePrompt: 'Chính phủ các nước cần áp dụng các biện pháp quyết liệt nhằm giảm thiểu những tác động tiêu cực của biến đổi khí hậu lên các cộng đồng ven biển.',
    victoriaHint: {
      grammar: 'Hãy thử áp dụng câu bị động khách quan ("Urgent measures must be instituted") hoặc câu chẻ ("It is governmental intervention that...") để đạt điểm Grammatical Range cao.',
      collocation: 'Kết hợp "mitigate the adverse impacts of climate change" đi kèm "coastal communities / coastal habitations".',
      traps: 'Cấm tiệt dùng văn nói như "bad effects", "stop climate change" hay "big problem". Không mở đầu câu bằng "Nowadays" sáo rỗng!'
    },
    sampleAnalysis: {
      band50: 'Government must do something to mitigate bad climate change for people living near the sea.',
      band65: 'Governments should implement stringent measures to mitigate the negative impacts of climate change on coastal communities.',
      band80: 'It is imperative that national administrations institute decisive legislative frameworks to mitigate the catastrophic ramifications of climate change on vulnerable coastal populations.',
      anatomy: {
        spelling: 'Chuẩn xác, không mắc lỗi chính tả cơ bản.',
        grammar: 'Cần chú ý chia thì hiện tại và sử dụng động từ khuyết thiếu mang tính khuyến nghị trang trọng (should/must/is imperative that).',
        collocation: 'Tránh "bad climate change" -> Nâng cấp thành "adverse impacts of climate change".',
        register: 'Loại bỏ từ xưng hô không trang trọng và các liên từ văn nói rời rạc.'
      }
    }
  },

  {
    id: 'vic-ch-02',
    topicId: 'technology',
    topicName: 'Technology & Artificial Intelligence',
    topicIcon: '💻',
    targetWord: 'proliferation',
    targetType: 'noun (uncountable)',
    targetIpa: '/prəˌlɪf.əˈreɪ.ʃən/',
    targetMeaning: 'Sự gia tăng / bùng nổ nhanh chóng về số lượng',
    targetCollocations: ['the proliferation of smartphones', 'nuclear proliferation', 'curb the proliferation of'],
    targetBand: '8.0',
    vietnamesePrompt: 'Sự bùng nổ nhanh chóng của các thiết bị thông minh đã làm thay đổi sâu sắc cách thức mà thế hệ trẻ tương tác với thế giới xung quanh.',
    victoriaHint: {
      grammar: 'Áp dụng kỹ thuật Danh từ hóa (Nominalisation) làm chủ ngữ: "The proliferation of smart gadgets has transformed...". Tránh dùng liên từ chỉ thời gian văn nói "When people have more phones".',
      collocation: 'Dùng cụm "profoundly transformed", "the younger generation", "interact with the external world".',
      traps: 'Tránh viết "more and more smartphones" hay "very big change". Từ "proliferation" là danh từ không đếm được, cấm thêm số nhiều!'
    },
    sampleAnalysis: {
      band50: 'Smartphones proliferate very fast and make young people change how they talk to each other.',
      band65: 'The rapid proliferation of smart devices has significantly altered the way the younger generation interacts with the surrounding world.',
      band80: 'The relentless proliferation of intelligent handheld devices has profoundly reshaped how adolescents engage with their external environment.',
      anatomy: {
        spelling: 'Chú ý cách viết "proliferation" (chữ "o" sau "l", kết thúc bằng "tion").',
        grammar: 'Chủ ngữ "The proliferation" là số ít, do đó động từ chính phải chia "has altered/reshaped", không được dùng "have".',
        collocation: 'Thay thế cụm văn nói "talk to each other" bằng "engage with their external environment".',
        register: 'Đạt chuẩn văn phong học thuật Cambridge C2.'
      }
    }
  },

  {
    id: 'vic-ch-03',
    topicId: 'study',
    topicName: 'Study & Higher Education',
    topicIcon: '📚',
    targetWord: 'critical thinking',
    targetType: 'noun phrase (collocation)',
    targetIpa: '/ˌkrɪt.ɪ.kəl ˈθɪŋ.kɪŋ/',
    targetMeaning: 'Tư duy phản biện, khả năng phân tích và đánh giá logic',
    targetCollocations: ['cultivate critical thinking', 'foster critical thinking skills', 'diminish critical thinking'],
    targetBand: '6.5',
    vietnamesePrompt: 'Các trường đại học không chỉ nên truyền thụ kiến thức lý thuyết mà còn phải bồi dưỡng tư duy phản biện cho sinh viên.',
    victoriaHint: {
      grammar: 'Đây là cơ hội hoàn hảo để bạn biểu diễn cấu trúc đảo ngữ: "Not only should universities impart theoretical knowledge, but they must also cultivate critical thinking...".',
      collocation: 'Dùng "impart theoretical knowledge" (truyền thụ kiến thức) kết hợp "foster/cultivate critical thinking skills".',
      traps: 'Tránh dùng cụm từ thô ráp "teach theory" hoặc "give information". Cấm viết tắt như "univ" hay "can\'t".'
    },
    sampleAnalysis: {
      band50: 'Universities should not only teach theory but also help students think critically.',
      band65: 'Higher education institutions should not merely impart theoretical knowledge but also actively foster students’ critical thinking skills.',
      band80: 'Not only should tertiary academic institutions impart empirical knowledge, but they are also duty-bound to cultivate rigorous critical thinking faculties among undergraduates.',
      anatomy: {
        spelling: 'Đúng chính tả "critical" và "thinking".',
        grammar: 'Cấu trúc cân đối "not only... but also..." phải có hai động từ song song ("impart... but also cultivate...").',
        collocation: 'Nâng cấp từ "help students think critically" lên "foster students\' critical thinking skills".',
        register: 'Học thuật và cô đọng.'
      }
    }
  },

  {
    id: 'vic-ch-04',
    topicId: 'routines',
    topicName: 'Routines & Daily Life',
    topicIcon: '⏰',
    targetWord: 'sedentary lifestyle',
    targetType: 'collocation',
    targetIpa: '/ˈsed.ən.tər.i ˈlaɪf.staɪl/',
    targetMeaning: 'Lối sống ít vận động, thụ động ngồi một chỗ nhiều giờ',
    targetCollocations: ['lead a sedentary lifestyle', 'adopt a sedentary lifestyle', 'consequences of a sedentary lifestyle'],
    targetBand: '6.5',
    vietnamesePrompt: 'Việc duy trì một lối sống ít vận động trong thời gian dài là nguyên nhân chính dẫn đến các bệnh mãn tính như béo phì và tiểu đường.',
    victoriaHint: {
      grammar: 'Dùng danh động từ làm chủ ngữ: "Leading a sedentary lifestyle for extended periods serves as a primary catalyst for...".',
      collocation: 'Dùng "chronic health ailments" (bệnh mãn tính), "obesity and diabetes mellitus", "primary catalyst / major contributor".',
      traps: 'Không dùng "sitting too much makes people sick" - đó là tiếng Anh tiểu học! Tránh lỗi chính tả với từ "sedentary" (e-d-e-n-t-a-r-y).'
    },
    sampleAnalysis: {
      band50: 'Sitting too much in sedentary lifestyle causes chronic diseases like fat and diabetes.',
      band65: 'Leading a sedentary lifestyle over prolonged periods is a major contributor to chronic ailments such as obesity and cardiovascular disease.',
      band80: 'Sustained adherence to a sedentary lifestyle serves as a primary determinant of chronic physiological conditions, most notably acute obesity and cardiovascular dysfunction.',
      anatomy: {
        spelling: 'Cẩn thận với "sedentary" (đuôi -ary, không phải -ery).',
        grammar: 'Chủ ngữ danh động từ "Leading..." chia động từ số ít "is / serves".',
        collocation: '"chronic ailments" chuẩn xác hơn "chronic diseases".',
        register: 'Tránh từ mang tính miệt thị "fat", dùng "obesity".'
      }
    }
  },

  {
    id: 'vic-ch-05',
    topicId: 'transport',
    topicName: 'Transport & Urban Mobility',
    topicIcon: '🚆',
    targetWord: 'traffic gridlock',
    targetType: 'noun (collocation)',
    targetIpa: '/ˈtræf.ɪk ˈɡrɪd.lɒk/',
    targetMeaning: 'Tình trạng tắc nghẽn giao thông toàn diện, tê liệt hoàn toàn',
    targetCollocations: ['cause traffic gridlock', 'alleviate traffic gridlock', 'perpetual traffic gridlock'],
    targetBand: '8.0',
    vietnamesePrompt: 'Nếu các nhà quy hoạch đô thị không đầu tư thỏa đáng vào mạng lưới tàu điện ngầm, thì tình trạng tắc nghẽn giao thông tại thủ đô sẽ trở nên không thể cứu vãn.',
    victoriaHint: {
      grammar: 'Hãy thử sức với đảo ngữ câu điều kiện loại 2: "Were urban planners to fail to invest adequately in subway networks, traffic gridlock in the capital would become irreversible."',
      collocation: 'Dùng "urban planners", "allocate adequate capital to underground rail networks", "alleviate / exacerbate traffic gridlock".',
      traps: 'Đừng dùng "traffic jam" quá quen thuộc. Hãy dùng "traffic congestion" hoặc "metropolitan gridlock".'
    },
    sampleAnalysis: {
      band50: 'If city planners do not spend money on subway, traffic gridlock in capital will be very terrible.',
      band65: 'Unless urban planners invest adequately in underground subway networks, traffic gridlock across the capital will become irreversible.',
      band80: 'Were municipal planners to neglect substantial investments in mass rapid transit infrastructures, metropolitan traffic gridlock would deteriorate beyond remediation.',
      anatomy: {
        spelling: '"gridlock" là một từ đơn liền, không tách rời.',
        grammar: 'Cấu trúc đảo ngữ "Were municipal planners to neglect..." khẳng định phong cách Band 8.5+.',
        collocation: '"deteriorate beyond remediation" thay thế xuất sắc cho "become very terrible".',
        register: 'Văn phong quy hoạch và chính sách công cực kỳ uyên bác.'
      }
    }
  },

  {
    id: 'vic-ch-06',
    topicId: 'food',
    topicName: 'Food & Nutrition',
    topicIcon: '🍲',
    targetWord: 'nutritional value',
    targetType: 'noun phrase (collocation)',
    targetIpa: '/njuːˈtrɪʃ.ən.əl ˈvæl.juː/',
    targetMeaning: 'Giá trị dinh dưỡng của thực phẩm',
    targetCollocations: ['devoid of nutritional value', 'high nutritional value', 'compromise nutritional value'],
    targetBand: '5.0',
    vietnamesePrompt: 'Đồ ăn nhanh thường chứa hàm lượng calo cao nhưng lại hầu như không có bất kỳ giá trị dinh dưỡng thiết yếu nào.',
    victoriaHint: {
      grammar: 'Dùng cấu trúc tương phản: "While fast food is dense in calories, it is virtually devoid of essential nutritional value."',
      collocation: 'Cụm từ C1 đắt giá: "dense in calories" và "devoid of essential nutrients / nutritional value".',
      traps: 'Tránh dùng "fast food has no nutrition". Không dùng liên từ "While" đi đôi với "but".'
    },
    sampleAnalysis: {
      band50: 'Fast food has high calories but does not have any good nutritional value.',
      band65: 'Fast food is typically calorie-dense yet practically devoid of essential nutritional value.',
      band80: 'While commercially processed fast food is exceptionally energy-dense, it remains utterly bereft of essential nutritional micronutrients.',
      anatomy: {
        spelling: '"nutritional" có 2 chữ "i" và kết thúc bằng "-al".',
        grammar: 'Sử dụng trạng từ bổ nghĩa tính từ "exceptionally energy-dense", "utterly bereft of".',
        collocation: '"devoid of" hoặc "bereft of" thay vì "has no".',
        register: 'Chính xác theo văn phong khoa học dinh dưỡng.'
      }
    }
  },

  {
    id: 'vic-ch-07',
    topicId: 'art',
    topicName: 'Art & Aesthetics',
    topicIcon: '🎨',
    targetWord: 'cultural heritage',
    targetType: 'noun (uncountable)',
    targetIpa: '/ˌkʌl.tʃər.əl ˈher.ɪ.tɪdʒ/',
    targetMeaning: 'Di sản văn hóa (vật thể và phi vật thể)',
    targetCollocations: ['preserve cultural heritage', 'tangible cultural heritage', 'rich cultural heritage'],
    targetBand: '6.5',
    vietnamesePrompt: 'Chính phủ cần dành một phần ngân sách quốc gia để trùng tu các di tích lịch sử và bảo tồn di sản văn hóa truyền thống.',
    victoriaHint: {
      grammar: 'Cấu trúc thức giả định: "It is imperative that the government allocate a proportion of national revenue to refurbishing historical relics..."',
      collocation: 'Dùng "allocate public funds", "restore historic landmarks", "safeguard traditional cultural heritage".',
      traps: '"heritage" không đếm được, không thêm "-s". Động từ đi kèm là "preserve / safeguard", không dùng "keep".'
    },
    sampleAnalysis: {
      band50: 'Government needs to spend money to fix old monuments and keep cultural heritage.',
      band65: 'The government should allocate a portion of the national budget to restoring historical relics and preserving cultural heritage.',
      band80: 'State authorities ought to designate substantial fiscal resources toward the painstaking restoration of historic landmarks and the preservation of intangible cultural heritage.',
      anatomy: {
        spelling: '"heritage" bắt đầu bằng "heri-", kết thúc bằng "-tage".',
        grammar: '"allocate... to V-ing" đòi hỏi sau giới từ "to" phải là danh động từ "restoring".',
        collocation: '"safeguard cultural heritage" sắc sảo hơn "keep cultural heritage".',
        register: 'Bảo tồn văn hóa chuẩn mực theo thuật ngữ của UNESCO.'
      }
    }
  },

  {
    id: 'vic-ch-08',
    topicId: 'social_media',
    topicName: 'Social Media & Networking',
    topicIcon: '📱',
    targetWord: 'distracting',
    targetType: 'adj',
    targetIpa: '/dɪˈstræk.tɪŋ/',
    targetMeaning: 'Gây phân tâm, làm xao nhãng sự tập trung',
    targetCollocations: ['highly distracting', 'prove distracting', 'distracting environments'],
    targetBand: '6.5',
    vietnamesePrompt: 'Những thông báo liên tục từ mạng xã hội có thể cực kỳ gây phân tâm, làm suy giảm hiệu suất học tập của học sinh trong giờ học.',
    victoriaHint: {
      grammar: 'Dùng mệnh đề phân từ chỉ kết quả ở vế sau: "Constant notifications... prove highly distracting, thereby compromising students\' academic focus."',
      collocation: 'Dùng "ceaseless / persistent smartphone alerts", "prove highly distracting", "diminish academic productivity".',
      traps: 'LỖI CỰC KỲ NẶNG: Không bao giờ được dùng từ "distractive" - đây là từ sai ngữ pháp! Phải dùng "distracting".'
    },
    sampleAnalysis: {
      band50: 'Continuous notifications on phone are very distractive and make students learn worse in classes.',
      band65: 'Persistent notifications from social media platforms prove highly distracting, severely diminishing students’ concentration during lectures.',
      band80: 'Incessant notifications generated by social networking applications are exceptionally distracting, thereby precipitating a perceptible decline in students’ cognitive engagement within lecture environments.',
      anatomy: {
        spelling: 'Dùng đúng tính từ "distracting", tuyệt đối tránh lỗi tự chế từ "distractive".',
        grammar: 'Mệnh đề phân từ "thereby precipitating..." liên kết nhân quả trơn tru.',
        collocation: '"cognitive engagement" thay thế cho "learn worse".',
        register: 'Học thuật và phân tích tâm lý giáo dục.'
      }
    }
  }
];

const VICTORIA_QUICK_PROMPTS = [
  {
    id: 'qp-hint-vocab',
    label: '💡 Xin gợi ý từ vựng',
    userText: 'Thưa Giám khảo Victoria, xin cô cho em một vài Collocations hoặc cụm từ học thuật C1 phù hợp với đề bài này.'
  },
  {
    id: 'qp-hint-grammar',
    label: '📐 Giải thích cấu trúc nên dùng',
    userText: 'Thưa cô, với ý tưởng này thì nên áp dụng cấu trúc ngữ pháp nào (bị động, câu chẻ, đảo ngữ...) để bứt phá lên Band 7.5+ ạ?'
  },
  {
    id: 'qp-new-challenge',
    label: '🔄 Đổi đề khảo bài mới',
    userText: 'Thưa Giám khảo Victoria, em muốn đổi sang một đề bài khảo bài khác để luyện tập thêm.'
  },
  {
    id: 'qp-custom-check',
    label: '📝 Chấm thử đoạn văn Writing',
    userText: 'Em muốn gửi cô mổ xẻ một câu văn tự viết: '
  }
];

if (typeof window !== 'undefined') {
  window.IELTS_VICTORIA_CHALLENGES = IELTS_VICTORIA_CHALLENGES;
  window.VICTORIA_QUICK_PROMPTS = VICTORIA_QUICK_PROMPTS;
}
