/**
 * IELTS GO! - IELTS Speaking 20 Topics & Pronunciation Drills Database
 * Phủ trọn 20 chủ đề thông dụng chuẩn Cambridge:
 * Part 1, Part 2 (Cue Card), Part 3, Pronunciation Drills (IPA & Stress),
 * Natural Opening Phrases và Bài mẫu đa tầng Band điểm (Band 6.0 vs Band 8.0+)
 */

const IELTS_SPEAKING_20_DATA = [
  // 1. Animals & Wildlife
  {
    id: 'animals',
    name: 'Animals & Wildlife',
    vietnameseName: 'Động vật & Thế giới hoang dã',
    icon: '🐾',
    color: '#10B981',
    pronunciationDrills: [
      { text: 'natural habitat', ipa: '/ˌnætʃ.ər.əl ˈhæb.ɪ.tæt/', stress: 'NAT-u-ral HAB-i-tat (Âm tiết 1)', tip: 'Nhấn mạnh âm đầu tiên của cả hai từ, hạ giọng ở đuôi -tat.' },
      { text: 'biodiversity', ipa: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', stress: 'bi-o-di-VER-si-ty (Âm tiết 4)', tip: 'Trọng âm chính rơi vào VER, lướt nhanh 3 âm tiết đầu.' },
      { text: 'endangered species', ipa: '/ɪnˈdeɪn.dʒəd ˈspiː.ʃiːz/', stress: 'en-DAN-gered SPE-cies', tip: 'Âm /eɪn/ ngân dài, species có âm /ʃiːz/ kéo dài.' },
      { text: 'poaching and trafficking', ipa: '/ˈpəʊ.tʃɪŋ ænd ˈtræf.ɪ.kɪŋ/', stress: 'POACH-ing and TRAFF-ick-ing', tip: 'Nhấn mạnh POACH và TRAFF, phát âm rõ âm đuôi /tʃ/.' },
    ],
    part1Questions: [
      {
        id: 1,
        question: 'Do you have a pet at home or did you have one when you were a child?',
        ipa: '/duː juː hæv ə pet æt həʊm/',
        intonation: 'Lên giọng ở cuối câu hỏi Yes/No (home ↗)',
        suggestedPhrases: [
          'To be completely candid, I have always had a soft spot for...',
          'As far back as I can remember, our family shared a household with...',
          'I currently keep a rescue cat who serves as an indispensable companion.'
        ],
        sampleBand6: 'Yes, I have a cute little dog at home. I play with it every afternoon after school. It makes me feel very relaxed and happy.',
        sampleBand8: 'Without a shadow of a doubt, I am an avid animal lover. In fact, I share my apartment with a rescue ginger cat who has become an indispensable companion, offering immense therapeutic comfort during demanding workdays.',
        sampleTranslationVi: 'Chắc chắn rồi, tôi là một người rất yêu động vật. Hiện tại tôi đang nuôi một chú mèo mướp cứu hộ trong căn hộ, nó là người bạn đồng hành không thể thiếu giúp xoa dịu áp lực sau những ngày làm việc căng thẳng.'
      },
      {
        id: 2,
        question: 'What is your favourite wild animal and why?',
        ipa: '/wɒt ɪz jɔː ˈfeɪ.vər.ɪt waɪld ˈæn.ɪ.məl ænd waɪ/',
        intonation: 'Xuống giọng ở cuối câu hỏi Wh- (why ↘)',
        suggestedPhrases: [
          'If I were to single out one magnificent creature, it would definitely be...',
          'I have always been deeply captivated by the sheer resilience of...',
          'From an aesthetic and behavioral standpoint, nothing rivals the...'
        ],
        sampleBand6: 'I really like tigers because they are very strong, fast, and have beautiful orange fur with black stripes. They look very powerful.',
        sampleBand8: 'If I had to single out one creature, I would unhesitatingly choose the snow leopard, renowed as the "ghost of the mountains". Inhabiting harsh alpine ridges, this solitary apex predator symbolizes untamed resilience and aesthetic grace.',
        sampleTranslationVi: 'Nếu phải chọn một loài động vật, tôi sẽ không ngần ngại chọn loài báo tuyết - được mệnh danh là bóng ma của núi rừng. Chúng sinh sống ở những triền núi băng giá hiểm trở, biểu trưng cho sức sống kiên cường và vẻ đẹp thanh thoát.'
      }
    ],
    part2CueCard: {
      topicTitle: 'Describe an interesting wild animal you have seen or read about',
      instruction: 'You should say:\n- What animal it is and where it lives\n- What it looks like\n- How it behaves\n- And explain why you find this animal fascinating',
      bulletPoints: ['What animal it is and where it lives', 'What it looks like', 'How it behaves', 'Why you find it fascinating'],
      usefulCollocations: ['natural habitat', 'apex predator', 'camouflage against rocky crags', 'ecological equilibrium', 'threatened with extinction'],
      sampleBand6: 'I would like to describe the polar bear. It lives in the Arctic where it is very cold. It has white fur and is very big. It eats fish and seals. I find it fascinating because it can swim in freezing water and survive very hard weather.',
      sampleBand8: 'Today I would like to recount my deep fascination with the majestic polar bear, a colossal marine mammal inhabiting the hyper-frigid Arctic ice sheets. Possessing a dense, water-repellent translucent pelt and a formidable layer of blubber, this apex predator is marvelously adapted to survive in sub-zero extremities. What renders this creature profoundly awe-inspiring is its astounding endurance—capable of swimming continuously across hundreds of miles of open sea. Regrettably, their precarious reliance on receding sea ice serves as a poignant barometer of global climate change.',
      sampleTranslationVi: 'Hôm nay tôi xin chia sẻ về sự say mê sâu sắc với loài gấu bắc cực hùng vĩ sinh sống trên các tảng băng lạnh giá vùng Bắc Cực. Loài dã thú đầu bảng này có lớp mỡ và bộ lông cách nhiệt hoàn hảo, có khả năng bơi liên tục hàng trăm dặm trên biển lạnh. Đáng tiếc, sự suy giảm diện tích băng biển do biến đổi khí hậu đang đe dọa trực tiếp sự sinh tồn của chúng.'
    },
    part3Questions: [
      {
        id: 1,
        question: 'Why are zoos becoming increasingly controversial in contemporary society?',
        analyticalAngle: 'Cân bằng giữa phúc lợi động vật (Animal welfare) và chức năng bảo tồn nhân giống giáo dục (Conservation & Captive breeding).',
        suggestedPhrases: [
          'From an ethical standpoint, confining sentient beings in artificial enclosures is increasingly viewed as obsolete...',
          'Conversely, proponents argue that reputable zoological sanctuaries play an indispensable role in captive breeding programs...'
        ],
        sampleBand8: 'Zoos have ignited fierce public controversy primarily because modern society has cultivated a heightened ethical awareness regarding animal welfare. Critics legitimately argue that confining wide-ranging species in cramped concrete enclosures induces psychological distress, known as zoochosis. Nonetheless, a nuanced perspective acknowledges that accredited sanctuaries contribute indispensably to global gene-pool preservation and captive breeding of critically endangered fauna.',
        sampleTranslationVi: 'Sở thú gây tranh cãi gay gắt vì xã hội ngày nay đã nâng cao nhận thức đạo đức về quyền động vật. Việc nhốt thú trong chuồng hẹp gây căng thẳng tâm lý, tuy nhiên các khu bảo tồn đạt chuẩn vẫn đóng vai trò quan trọng trong việc nhân giống và bảo tồn nguồn gen các loài nguy cấp.'
      }
    ]
  },

  // 2. Art & Aesthetics
  {
    id: 'art',
    name: 'Art & Aesthetics',
    vietnameseName: 'Nghệ thuật & Hội họa',
    icon: '🎨',
    color: '#EC4899',
    pronunciationDrills: [
      { text: 'aesthetic appreciation', ipa: '/esˈθet.ɪk əˌpriː.ʃiˈeɪ.ʃən/', stress: 'aes-THET-ic ap-pre-ci-A-tion', tip: 'Nhấn âm THET và A-tion, phát âm chuẩn âm /θ/ vô thanh.' },
      { text: 'avant-garde', ipa: '/ˌæv.ɑ̃ːˈɡɑːd/', stress: 'a-vant-GARDE (Âm tiết 2)', tip: 'Từ gốc Pháp, nhấn mạnh âm cuối GARDE với âm /ɑːd/ sâu.' },
      { text: 'contemporary exhibition', ipa: '/kənˈtem.pər.ər.i ˌek.sɪˈbɪʃ.ən/', stress: 'con-TEM-po-rar-y ex-hi-BI-tion', tip: 'Nhấn TEM và BI, lướt nhẹ các âm tiết trung gian.' },
    ],
    part1Questions: [
      {
        id: 1,
        question: 'Do you enjoy visiting art galleries or museums?',
        ipa: '/duː juː ɪnˈdʒɔɪ ˈvɪz.ɪ.tɪŋ ɑːt ˈɡæl.ər.iz ɔː mjuːˈziː.əmz/',
        intonation: 'Lên giọng ở galleries ↗ và xuống giọng ở museums ↘',
        suggestedPhrases: [
          'Without a doubt, I find immersing myself in art galleries deeply therapeutic...',
          'Whenever I visit a new metropolitan city, art museums are top of my itinerary...',
          'I am particularly drawn to impressionist masterpieces that capture fleeting light.'
        ],
        sampleBand6: 'Yes, I like going to art museums when I have free time on the weekend. Looking at beautiful paintings makes me feel calm and helps me learn about history.',
        sampleBand8: 'Without a shadow of a doubt, strolling through contemporary art galleries is one of my cherished pastimes. I find the serene ambiance profoundly cathartic, as it allows me to disconnect from digital noise and contemplate the artist’s visual narrative.',
        sampleTranslationVi: 'Chắc chắn rồi, dạo bước qua các phòng triển lãm nghệ thuật đương đại là một trong những sở thích yêu thích của tôi. Không gian tĩnh lặng giúp tôi giải tỏa căng thẳng và suy ngẫm về thông điệp thị giác của họa sĩ.'
      }
    ],
    part2CueCard: {
      topicTitle: 'Describe a piece of art (painting, sculpture, or craft) that you like',
      instruction: 'You should say:\n- What it is and who created it\n- What it looks like\n- Where you saw it\n- And explain why you admire this work of art',
      bulletPoints: ['What it is and who created it', 'What it looks like', 'Where you saw it', 'Why you admire it'],
      usefulCollocations: ['aesthetic appreciation', 'visual narrative', 'evocative brushstrokes', 'timeless masterpiece', 'profound resonance'],
      sampleBand6: 'I want to talk about The Starry Night by Vincent van Gogh. It shows a night sky with lots of yellow stars and blue swirls over a small village. I saw it on the internet and in an art book. I admire it because the colors are very bright and emotional.',
      sampleBand8: 'I would like to articulate my admiration for "The Starry Night", an evocative masterpiece created by the post-impressionist Dutch virtuoso Vincent van Gogh. Characterized by tumultuous, swirling indigo skies punctuated by radiant celestial orbs and a towering cypress tree, the canvas conveys an intoxicating fusion of celestial tranquility and inner turbulence. What resonates most profoundly with me is Van Gogh’s uncanny ability to externalize raw human vulnerability through dynamic, impasto brushwork.',
      sampleTranslationVi: 'Tôi muốn bày tỏ sự ngưỡng mộ của mình đối với tuyệt phẩm "Đêm đầy sao" của danh họa hậu ấn tượng Vincent van Gogh. Bức tranh nổi bật với bầu trời xoáy cuộn màu chàm điểm xuyết những quầng sao rực rỡ, thể hiện sự hòa quyện giữa vẻ đẹp vũ trụ và những giằng xé nội tâm sâu sắc.'
    },
    part3Questions: [
      {
        id: 1,
        question: 'Should governments allocate public funds to support artistic endeavors instead of healthcare?',
        analyticalAngle: 'So sánh lợi ích thiết yếu trước mắt (Essential public goods) với sự phong phú tâm hồn và bản sắc dân tộc dài hạn (Cultural legacy).',
        suggestedPhrases: [
          'While healthcare is indisputably a non-negotiable fundamental priority...',
          'Art and culture constitute the spiritual soul of a civilization, fostering innovation and social cohesion...'
        ],
        sampleBand8: 'While safeguarding public healthcare is unquestionably a non-negotiable imperative, I contend that state funding for the arts should not be viewed as mutually exclusive. Artistic expressions and cultural institutions encapsulate a nation’s soul, cultivate critical thinking, and fuel creative economies. A balanced budgetary framework must sustain both biological survival and intellectual enrichment.',
        sampleTranslationVi: 'Mặc dù y tế là ưu tiên không thể thỏa hiệp, tôi cho rằng ngân sách cho nghệ thuật không hề bài trừ y tế. Nghệ thuật hun đúc tâm hồn dân tộc, nuôi dưỡng tư duy sáng tạo và thúc đẩy kinh tế. Một quốc gia thịnh vượng cần chăm lo cho cả thể chất lẫn tinh thần.'
      }
    ]
  },

  // 3. Celebrations & Festivals
  {
    id: 'celebrations',
    name: 'Celebrations & Festivals',
    vietnameseName: 'Lễ hội & Sự kiện',
    icon: '🎉',
    color: '#F59E0B',
    pronunciationDrills: [
      { text: 'festive atmosphere', ipa: '/ˈfes.tɪv ˈæt.məs.fɪər/', stress: 'FES-tive AT-mos-phere', tip: 'Âm FES rõ ràng, atmosphere nhấn âm đầu.' },
      { text: 'commemorate', ipa: '/kəˈmem.ə.reɪt/', stress: 'com-MEM-o-rate (Âm tiết 2)', tip: 'Âm MEM nhấn mạnh, đuôi -rate đọc rõ /reɪt/.' },
      { text: 'cultural tapestry', ipa: '/ˈkʌl.tʃər.əl ˈtæp.ɪ.stri/', stress: 'CUL-tur-al TAP-es-try', tip: 'Phát âm /tʃ/ mềm mại trong cultural, TAP nhấn mạnh.' },
    ],
    part1Questions: [
      {
        id: 1,
        question: 'What is the most important traditional celebration in your country?',
        ipa: '/wɒt ɪz ðə məʊst ɪmˈpɔː.tənt trəˈdɪʃ.ən.əl ˌsel.ɪˈbreɪ.ʃən/',
        intonation: 'Xuống giọng ở cuối câu (celebration ↘)',
        suggestedPhrases: [
          'Without a shadow of a doubt, the quintessential festival is...',
          'It marks a momentous occasion when families congregate from all corners...',
          'The entire nation is immersed in an exuberant festive ambiance.'
        ],
        sampleBand6: 'The most important celebration in Vietnam is Tet, the Lunar New Year. Families gather together, eat traditional food like Chung cake, and give lucky money to children.',
        sampleBand8: 'Without a shadow of a doubt, the Lunar New Year, locally revered as Tet, is the preeminent cultural milestone in Vietnam. It symbolizes rebirth and renewal, prompting dispersed family members to reunite, pay homage to ancestral spirits, and partake in time-honored customs.',
        sampleTranslationVi: 'Chắc chắn rồi, Tết Nguyên Đán là dấu mốc văn hóa trang trọng và thiêng liêng nhất tại Việt Nam. Dịp này tượng trưng cho sự khởi đầu mới, gắn kết mọi thành viên gia đình sum họp và tưởng nhớ cội nguồn.'
      }
    ],
    part2CueCard: {
      topicTitle: 'Describe an unforgettable festival or celebration you participated in',
      instruction: 'You should say:\n- What festival it was and when it occurred\n- Where it took place and who you were with\n- What activities occurred\n- And explain why this celebration was memorable to you',
      bulletPoints: ['What festival it was', 'Where it took place and who was there', 'What activities occurred', 'Why it was memorable'],
      usefulCollocations: ['exuberant festive atmosphere', 'time-honored traditions', 'ancestral veneration', 'culinary delicacies', 'communal solidarity'],
      sampleBand6: 'I want to talk about Tet holiday last year. I celebrated it in Hanoi with my parents and grandparents. We decorated the house with peach blossoms, cooked Chung cake, and watched fireworks on New Year Eve. It was memorable because the whole family was very happy.',
      sampleBand8: 'I would like to recount my experience during the Mid-Autumn Festival in Hoi An ancient town last September. The entire riverside promenade was bathed in the warm, ethereal glow of thousands of floating silk lanterns, completely devoid of motorized traffic. Wandering through the bustling alleyways alongside close friends, we savored delicate mooncakes and observed spellbinding lion dance troupes. The intoxicating blend of folklore authenticity and collective euphoria etched an indelible impression on my psyche.',
      sampleTranslationVi: 'Tôi muốn kể về trải nghiệm Tết Trung Thu tại phố cổ Hội An vào tháng 9 năm ngoái. Toàn bộ con phố ven sông lung linh dưới ánh sáng của hàng nghìn ngọn đèn lồng lụa bồng bềnh, không hề có tiếng còi xe cơ giới. Không khí lễ hội vừa hoài cổ vừa rộn ràng đã để lại ấn tượng sâu đậm trong tôi.'
    },
    part3Questions: [
      {
        id: 1,
        question: 'Do you think commercialization is diminishing the true spirit of traditional festivals?',
        analyticalAngle: 'Thương mại hóa kích cầu tiêu dùng và du lịch vs sự xói mòn các giá trị tinh thần thiêng liêng cội nguồn.',
        suggestedPhrases: [
          'There is a pervasive concern that relentless commercialism has commodified sacred rituals...',
          'On the other hand, commercial viability provides the financial impetus required to preserve heritage...'
        ],
        sampleBand8: 'To a considerable extent, excessive commercialization has commodified the authentic sanctity of indigenous celebrations. Festivals that once prioritized spiritual introspection and communal solidarity are increasingly reduced to consumerist spending sprees driven by corporate advertising. While commerce fuels regional tourism, governments must implement cultural preservation policies to safeguard the intangible soul of these heritage rituals.',
        sampleTranslationVi: 'Ở mức độ lớn, việc thương mại hóa quá mức đã biến các nghi lễ thiêng liêng thành các cơ hội tiêu dùng thương mại. Cần có chính sách cân bằng để vừa phát triển du lịch vừa bảo vệ linh hồn phi vật thể của lễ hội truyền thống.'
      }
    ]
  },

  // 4. Environment & Climate
  {
    id: 'environment',
    name: 'Environment & Climate',
    vietnameseName: 'Môi trường & Biến đổi khí hậu',
    icon: '🌍',
    color: '#059669',
    pronunciationDrills: [
      { text: 'greenhouse gas emissions', ipa: '/ˈɡriːn.haʊs ɡæs ɪˈmɪʃ.ənz/', stress: 'GREEN-house gas e-MIS-sions', tip: 'Nhấn GREEN và MIS, không nuốt âm s trong emissions.' },
      { text: 'ecological footprint', ipa: '/ˌiː.kəˈlɒdʒ.ɪ.kəl ˈfʊt.prɪnt/', stress: 'e-co-LOG-i-cal FOOT-print', tip: 'Trọng âm chính ở LOG, phụ ở E.' },
      { text: 'irreversible degradation', ipa: '/ˌɪr.ɪˈvɜː.sə.bəl ˌdeɡ.rəˈdeɪ.ʃən/', stress: 'ir-re-VER-si-ble deg-ra-DA-tion', tip: 'Nhấn VER và DA-tion, phát âm chuẩn các nguyên âm đôi.' },
    ],
    part1Questions: [
      {
        id: 1,
        question: 'What do you do personally to protect the local environment?',
        ipa: '/wɒt duː juː duː ˈpɜː.sən.əl.i tuː prəˈtekt ðə ˈləʊ.kəl ɪnˈvaɪ.rən.mənt/',
        intonation: 'Xuống giọng ở cuối câu (environment ↘)',
        suggestedPhrases: [
          'In my daily routine, I make a conscious effort to minimize my plastic footprint by...',
          'I religiously adhere to waste sorting and opt for public transit whenever feasible...',
          'Simple habits like conserving electricity yield cumulative eco-friendly impacts.'
        ],
        sampleBand6: 'I always bring my own reusable bag when I go shopping, and I try to turn off the lights when leaving my room to save electricity.',
        sampleBand8: 'In my daily existence, I make a conscientious effort to curtail my ecological footprint. Specifically, I have eradicated single-use plastics from my household, religiously segregate organic waste, and rely predominantly on public mass transit for daily commuting.',
        sampleTranslationVi: 'Trong cuộc sống hàng ngày, tôi luôn có ý thức giảm thiểu dấu chân sinh thái của mình. Tôi đã loại bỏ hoàn toàn đồ nhựa dùng một lần, phân loại rác thải tại nguồn và ưu tiên sử dụng xe buýt công cộng để đi lại.'
      }
    ],
    part2CueCard: {
      topicTitle: 'Describe an environmental problem that causes you concern',
      instruction: 'You should say:\n- What the problem is and what causes it\n- How it affects human health and society\n- What measures can be taken to mitigate it\n- And explain why you feel concerned about this issue',
      bulletPoints: ['What the problem is and causes', 'How it affects health and society', 'Measures to mitigate it', 'Why you feel concerned'],
      usefulCollocations: ['airborne particulate matter', 'respiratory ailments', 'fossil fuel combustion', 'stringent emission caps', 'sustainable energy transition'],
      sampleBand6: 'I want to talk about air pollution in big cities. It is caused by smoke from motorbikes, cars, and factories. It makes many people cough and get sick. Governments should plant more trees and encourage electric bikes to improve air quality.',
      sampleBand8: 'I feel deeply perturbed by the exacerbation of metropolitan air pollution, predominantly driven by unconstrained vehicular emissions and industrial fossil fuel combustion. Fine particulate matter, commonly designated as PM2.5, penetrates deep into pulmonary tissues, precipitating severe cardiovascular and respiratory morbidity. To mitigate this escalating crisis, municipal authorities must enforce stringent emission standards, invest aggressively in electric public transportation, and establish low-emission urban zones.',
      sampleTranslationVi: 'Tôi cảm thấy vô cùng lo ngại về tình trạng ô nhiễm không khí tại các đô thị lớn, chủ yếu do khí thải phương tiện giao thông và đốt nhiên liệu hóa thạch. Bụi mịn PM2.5 xâm nhập sâu vào phổi gây ra các bệnh tim mạch và hô hấp hiểm nghèo. Chính quyền cần áp dụng quy chuẩn khí thải khắt khe và đầu tư mạnh vào giao thông xanh.'
    },
    part3Questions: [
      {
        id: 1,
        question: 'Should environmental protection be the sole responsibility of governments, or must individuals take charge?',
        analyticalAngle: 'Sức mạnh lập pháp vĩ mô của nhà nước (Top-down policy & taxation) kết hợp với ý thức hành vi tiêu dùng vi mô của người dân (Bottom-up civic action).',
        suggestedPhrases: [
          'A symbiotic relationship is indispensable: governments possess legislative leverage, while individuals dictate market demand...',
          'Without state-mandated carbon taxation and green subsidies, civic efforts remain largely cosmetic...'
        ],
        sampleBand8: 'I firmly advocate for a collaborative paradigm where state regulation and civic responsibility reinforce one another. Governments possess the sovereign power to enact binding carbon legislation, subsidize renewable infrastructure, and penalize corporate polluters. Conversely, grassroots consumer choices drive market trends. Only when top-down regulatory frameworks harmonize with bottom-up sustainable habits can we realistically avert ecological catastrophe.',
        sampleTranslationVi: 'Tôi kiên định ủng hộ mô hình hợp tác đa phương giữa quy định của nhà nước và trách nhiệm công dân. Chính phủ có thẩm quyền ban hành luật và chế tài, trong khi hành vi tiêu dùng của người dân định hình thị trường. Chỉ khi cả hai cùng chung tay mới có thể ngăn chặn thảm họa sinh thái.'
      }
    ]
  },

  // 5. Technology & AI
  {
    id: 'technology',
    name: 'Technology & Artificial Intelligence',
    vietnameseName: 'Công nghệ & Trí tuệ nhân tạo',
    icon: '💻',
    color: '#0284C7',
    pronunciationDrills: [
      { text: 'cutting-edge technology', ipa: '/ˌkʌt.ɪŋˈedʒ tekˈnɒl.ə.dʒi/', stress: 'CUT-ting EDGE tech-NOL-o-gy', tip: 'Nhấn mạnh CUTTING EDGE và NOL trong technology.' },
      { text: 'technological singularity', ipa: '/ˌtek.nəˈlɒdʒ.ɪ.kəl ˌsɪŋ.ɡjəˈlær.ə.ti/', stress: 'tech-no-LOG-i-cal sin-gu-LAR-i-ty', tip: 'Nhấn LOG và LAR, phát âm chuẩn /ŋɡj/.' },
      { text: 'algorithm', ipa: '/ˈæl.ɡə.rɪ.ðəm/', stress: 'AL-go-rithm (Âm tiết 1)', tip: 'Nhấn âm AL, âm cuối /ðəm/ phát âm chuẩn âm lưỡi răng.' },
    ],
    part1Questions: [
      {
        id: 1,
        question: 'How often do you use Artificial Intelligence tools in your daily study or work?',
        ipa: '/haʊ ˈɒf.ən duː juː juːz ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns tuːlz/',
        intonation: 'Xuống giọng ở cuối câu (work ↘)',
        suggestedPhrases: [
          'On a daily basis, I integrate generative AI platforms to streamline my research...',
          'It has fundamentally revolutionized my workflow, serving as a virtual brainstorming mentor...',
          'While I leverage AI for productivity, I exercise critical thinking to avoid over-reliance.'
        ],
        sampleBand6: 'I use ChatGPT almost every day to help me look up new English vocabulary, fix grammar errors, and write emails faster.',
        sampleBand8: 'On an almost daily basis, I harness generative AI applications to optimize my cognitive output. Whether it involves summarizing voluminous research papers, drafting code snippets, or refining academic prose, AI serves as an indispensable virtual sounding board that exponentially amplifies my productivity.',
        sampleTranslationVi: 'Hầu như mỗi ngày tôi đều ứng dụng trí tuệ nhân tạo để tối ưu hóa năng suất làm việc. Từ việc tóm tắt tài liệu nghiên cứu đến tinh chỉnh câu chữ học thuật, AI hoạt động như một trợ lý ảo đắc lực giúp nâng cao hiệu quả công việc vượt bậc.'
      }
    ],
    part2CueCard: {
      topicTitle: 'Describe a technological device or app that you find extremely useful',
      instruction: 'You should say:\n- What it is and how long you have used it\n- What features it possesses\n- How it benefits your life\n- And explain why you consider it indispensable',
      bulletPoints: ['What it is and how long you have used it', 'What features it possesses', 'How it benefits your life', 'Why you consider it indispensable'],
      usefulCollocations: ['user-friendly interface', 'seamless synchronization', 'exponential productivity boost', 'cognitive augmentation', 'indispensable asset'],
      sampleBand6: 'I want to talk about my tablet. I bought it two years ago for studying. It has a stylus pen, a sharp screen, and long battery life. I use it to take notes and read ebooks. It is very useful because I do not need to carry heavy paper books anymore.',
      sampleBand8: 'I would like to highlight my noise-cancelling wireless headphones, an indispensable peripheral I have utilized daily for over three years. Equipped with active acoustic sensors and intelligent ambient filtering, this device effortlessly creates an oasis of absolute auditory tranquility even within chaotic coffee shops. For a knowledge worker prone to cognitive fatigue, its capacity to induce unbroken deep focus is genuinely priceless.',
      sampleTranslationVi: 'Tôi muốn chia sẻ về chiếc tai nghe chống ồn không dây - một thiết bị không thể thiếu mà tôi dùng mỗi ngày suốt hơn 3 năm qua. Nhờ công nghệ cảm biến âm học thông minh lọc tạp âm, nó mang lại một không gian tĩnh lặng tuyệt đối giúp tôi tập trung sâu vào học tập và làm việc.'
    },
    part3Questions: [
      {
        id: 1,
        question: 'Will Artificial Intelligence eventually render human educators and translators obsolete?',
        analyticalAngle: 'Khả năng xử lý dữ liệu và thuật toán của máy tính vs trí tuệ cảm xúc (Emotional intelligence), sự thấu cảm (Empathy) và truyền cảm hứng nhân văn.',
        suggestedPhrases: [
          'While AI effortlessly outclasses humans in computational linguistics and rote data processing...',
          'Pedagogy is fundamentally a humanistic pursuit anchored in moral mentorship, empathy, and emotional resonance...'
        ],
        sampleBand8: 'I strongly maintain that while AI will radically automate administrative and diagnostic tasks in education, it will never entirely supplant human pedagogues. Teaching is inherently an empathetic, humanistic endeavor. An algorithm can synthesize information with flawless precision, but it cannot discern a student’s unspoken anxieties, instill moral integrity, or spark genuine intellectual curiosity through shared human vulnerability.',
        sampleTranslationVi: 'Tôi tin chắc rằng dù AI sẽ tự động hóa các tác vụ lặp đi lặp lại trong giáo dục, nó không bao giờ có thể thay thế hoàn toàn người thầy. Giảng dạy là một hành trình nhân văn đòi hỏi sự thấu cảm và truyền cảm hứng mà thuật toán máy móc không thể nào có được.'
      }
    ]
  },

  // 6. Study & Higher Education
  {
    id: 'study',
    name: 'Study & Higher Education',
    vietnameseName: 'Học tập & Giáo dục đại học',
    icon: '📚',
    color: '#7C3AED',
    pronunciationDrills: [
      { text: 'academic qualification', ipa: '/ˌæk.əˈdem.ɪk ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/', stress: 'ac-a-DEM-ic qual-i-fi-CA-tion', tip: 'Nhấn DEM và CA-tion, phát âm chuẩn các âm bật hơi.' },
      { text: 'critical thinking skills', ipa: '/ˈkrɪt.ɪ.kəl ˈθɪŋ.kɪŋ skɪlz/', stress: 'CRIT-i-cal THINK-ing SKILLS', tip: 'Nhấn CRIT và THINK, âm /θ/ trong thinking phát âm rõ ràng.' },
      { text: 'rigorous academic scrutiny', ipa: '/ˈrɪɡ.ər.əs ˌæk.əˈdem.ɪk ˈskruː.tɪ.ni/', stress: 'RIG-or-ous ac-a-DEM-ic SCRU-ti-ny', tip: 'Nhấn RIG, DEM và SCRU, các âm phụ lướt nhẹ nhàng.' },
    ],
    part1Questions: [
      {
        id: 1,
        question: 'Do you prefer studying alone or in a study group with friends?',
        ipa: '/duː juː prɪˈfɜː ˈstʌd.i.ɪŋ əˈləʊn ɔːr ɪn ə ˈstʌd.i ɡruːp/',
        intonation: 'Lên giọng ở alone ↗ và xuống giọng ở group ↘',
        suggestedPhrases: [
          'Generally speaking, I gravitate toward solitary study when tackling demanding theory...',
          'However, when preparing for collaborative projects, brainstorming in a group is invaluable...',
          'A quiet environment allows for deep concentration without peer distractions.'
        ],
        sampleBand6: 'I prefer studying alone in a library because it is very quiet and I can concentrate on my books without being distracted by friends talking.',
        sampleBand8: 'By and large, I gravitate toward solitary study sessions whenever I must digest complex scholarly literature. Working in isolation fosters unbroken concentration and allows me to regulate my cognitive pace without the inevitable social digressions common to group study.',
        sampleTranslationVi: 'Nhìn chung, tôi có xu hướng thích học một mình khi phải tiếp thu các kiến thức lý thuyết phức tạp. Không gian yên tĩnh giúp tôi duy trì sự tập trung cao độ mà không bị xao nhãng bởi những cuộc trò chuyện ngoài lề.'
      }
    ],
    part2CueCard: {
      topicTitle: 'Describe an educational subject you found challenging yet rewarding',
      instruction: 'You should say:\n- What subject it was and when you studied it\n- Who taught you and how they explained difficult concepts\n- Why it was difficult for you\n- And explain why mastering it gave you immense satisfaction',
      bulletPoints: ['What subject it was', 'Who taught you and how', 'Why it was difficult', 'Why mastering it was rewarding'],
      usefulCollocations: ['steep learning curve', 'intellectual breakthrough', 'rigorous academic discipline', 'deductive reasoning', 'sense of accomplishment'],
      sampleBand6: 'I want to talk about Advanced Mathematics in high school. My teacher was very strict but good at explaining formulas. It was very difficult because the problems were long and complex. When I finally solved them and got a high score on the exam, I felt very proud.',
      sampleBand8: 'I would like to recount my intellectual journey with Econometrics during my penultimate year at university. The discipline presented a notoriously steep learning curve, requiring an intricate synthesis of multivariable calculus, statistical regression, and empirical economic theory. Initially, I felt thoroughly overwhelmed by stochastic modeling. However, guided by an exceptional professor who illuminated practical applications, I spent countless nights debugging statistical packages. Achieving an intellectual breakthrough in that subject fundamentally sharpened my analytical faculties.',
      sampleTranslationVi: 'Tôi muốn chia sẻ về hành trình chinh phục môn Kinh tế lượng vào năm áp chót đại học. Môn học này đòi hỏi sự kết hợp phức tạp giữa giải tích đa biến và xác suất thống kê. Dù ban đầu vô cùng gian nan, nhưng việc kiên trì giải mã các mô hình đã giúp tôi rèn luyện tư duy phân tích sâu sắc.'
    },
    part3Questions: [
      {
        id: 1,
        question: 'Is a traditional university degree becoming less relevant in an era of online micro-credentials?',
        analyticalAngle: 'Giá trị thực tế của kỹ năng nghề ngắn hạn vs giá trị nền tảng học thuật, tư duy phản biện và mạng lưới cựu sinh viên của đại học chính quy.',
        suggestedPhrases: [
          'While specialized online bootcamps offer agile vocational upskilling...',
          'Prestigious universities cultivate foundational philosophical thinking, research rigor, and elite alumni networks...'
        ],
        sampleBand8: 'While targeted micro-credentials offer indisputable agility for rapid technical upskilling, I do not believe tertiary institutions are obsolete. Higher education is not merely a pipeline for workplace vocational training; it is an intellectual incubator that cultivates philosophical inquiry, rigorous debate, and holistic worldviews. Furthermore, the institutional pedigree and collaborative alumni ecosystems of reputable universities remain formidable career catalysts.',
        sampleTranslationVi: 'Dù các chứng chỉ trực tuyến ngắn hạn mang lại sự linh hoạt để nâng cao kỹ năng nhanh chóng, giáo dục đại học vẫn giữ nguyên vị thế cốt lõi. Đại học không chỉ dạy nghề mà còn là cái nôi nuôi dưỡng tư duy triết học, năng lực phản biện và mạng lưới cựu sinh viên tinh hoa.'
      }
    ]
  }
];

// Helper truy xuất cơ sở dữ liệu Speaking
class IeltsSpeakingDatabaseManager {
  constructor() {
    this.topics = IELTS_SPEAKING_20_DATA;
  }

  getAllTopics() {
    return this.topics;
  }

  getTopicById(id) {
    return this.topics.find((t) => t.id === id) || this.topics[0];
  }
}

window.speakingDb = new IeltsSpeakingDatabaseManager();
