/**
 * IELTS GO! - Thư viện 25 Chủ Điểm Ngữ Pháp Trọng Tâm & Game Ghép Câu Học Thuật
 * Phân chia theo 2 Band điểm:
 * 1. Band < 4.5 & 4.5 - 6.0: Foundation & Intermediate (Các thì cơ bản, Bị động quy trình, Mệnh đề quan hệ, Câu điều kiện, v.v.)
 * 2. Band 6.0 - 7.5 & 7.5+: Advanced & Expert (Câu phức, Đảo ngữ, Mệnh đề phân từ, Cấu trúc giả định, Danh từ hóa, v.v.)
 */

const IELTS_GRAMMAR_TOPICS = [
  // ================= BAND < 4.5 & 4.5 - 6.0 (FOUNDATION & INTERMEDIATE) =================
  {
    id: 'topic-01',
    num: 1,
    title: 'Thì Quá Khứ Đơn vs. Hiện Tại Hoàn Thành',
    titleEn: 'Past Simple vs. Present Perfect in IELTS',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Thì & Nền Tảng',
    formula: 'Past Simple: S + V2/ed (Mốc thời gian cố định) | Present Perfect: S + have/has + V3/ed (Kéo dài đến nay)',
    application: {
      writing: 'Writing Task 1: Dùng Quá khứ đơn khi mốc thời gian đã kết thúc (Between 2000 and 2010). Dùng Hiện tại hoàn thành khi xu hướng bắt đầu trong quá khứ và kéo dài đến thời điểm hiện tại (Since 2010, the figure has increased).',
      speaking: 'Speaking Part 1 & 2: Quá khứ đơn dùng kể trải nghiệm thời thơ ấu (When I was a child, I played...). Hiện tại hoàn thành dùng nói về sở thích hoặc kinh nghiệm tích lũy (I have lived in Hanoi for five years).'
    },
    commonMistakes: [
      {
        incorrect: 'In 2015, the percentage of car owners has increased sharply to 45%.',
        correct: 'In 2015, the percentage of car owners increased sharply to 45%.',
        explanation: 'Có mốc năm xác định trong quá khứ ("In 2015") bắt buộc chia Quá khứ đơn (increased), không dùng Hiện tại hoàn thành.'
      },
      {
        incorrect: 'Since 2020, people stopped using single-use plastic bags.',
        correct: 'Since 2020, people have stopped using single-use plastic bags.',
        explanation: 'Cụm thời gian bắt đầu với "Since" chỉ hành động kéo dài đến nay, phải chia Hiện tại hoàn thành (have stopped).'
      }
    ],
    examples: [
      {
        en: 'The proportion of international graduates increased by 12% between 2015 and 2020.',
        vi: 'Tỷ lệ sinh viên quốc tế tốt nghiệp đã tăng 12% trong giai đoạn từ năm 2015 đến 2020.',
        analysis: 'Hành động xảy ra và kết thúc hoàn toàn trong quá khứ -> Dùng "increased".'
      },
      {
        en: 'Advances in artificial intelligence have profoundly altered modern diagnostic medicine.',
        vi: 'Những tiến bộ trong trí tuệ nhân tạo đã làm thay đổi sâu sắc nền y học chẩn đoán hiện đại.',
        analysis: 'Hành động bắt đầu trong quá khứ và hệ quả vẫn đang tiếp diễn ở hiện tại -> Dùng "have profoundly altered".'
      }
    ],
    examinerTip: 'Giám khảo Writing Task 1 luôn kiểm tra tính nhất quán của thì thời. Nếu trục hoành dừng ở năm 2020, hãy viết toàn bộ bài bằng thì Quá khứ đơn!'
  },

  {
    id: 'topic-02',
    num: 2,
    title: 'Câu Bị Động Trong Miêu Tả Quy Trình Task 1',
    titleEn: 'Passive Voice in Process Diagrams',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Cấu Trúc Cơ Bản',
    formula: 'Active: People/Workers + V + O  ==>  Passive: S (Object) + be + V3/ed (+ by/with Agent)',
    application: {
      writing: 'Cốt lõi tuyệt đối của Writing Task 1 Process Diagram (sản xuất cà phê, tái chế nhựa, lọc nước...). Vì con người trong quy trình chỉ là tác nhân phụ, trọng tâm phải đặt vào nguyên vật liệu và sản phẩm.',
      speaking: 'Speaking Part 3: Bày tỏ chính sách và giải pháp chung mà không cần chỉ định đích danh cá nhân (Renewable energy should be subsidised by the government).'
    },
    commonMistakes: [
      {
        incorrect: 'In the next stage, workers wash the plastic bottles with clean water.',
        correct: 'In the subsequent stage, plastic bottles are washed with purified water.',
        explanation: 'Trong Academic Task 1, tránh đưa "workers" làm chủ ngữ chính. Hãy chuyển thành thể bị động để tăng tính khách quan.'
      },
      {
        incorrect: 'The tea leaves are collect and dry under the sunlight.',
        correct: 'The tea leaves are collected and dried under direct sunlight.',
        explanation: 'Động từ bị động phải ở dạng V3/ed (collected, dried), không được giữ nguyên thể.'
      }
    ],
    examples: [
      {
        en: 'Once the raw tea leaves are harvested, they are transported to the processing plant where they are steamed.',
        vi: 'Ngay sau khi lá trà tươi được thu hoạch, chúng được vận chuyển đến nhà máy chế biến nơi chúng được hấp chín.',
        analysis: 'Chuỗi 3 động từ bị động liên hoàn: "are harvested", "are transported", "are steamed" tạo văn phong khoa học chuẩn mực.'
      }
    ],
    examinerTip: 'Kết hợp linh hoạt các liên từ chỉ thứ tự quy trình (Initially, Subsequently, Following this, Prior to being V3/ed) với thể bị động để tối ưu điểm Coherence.'
  },

  {
    id: 'topic-03',
    num: 3,
    title: 'Mệnh Đề Quan Hệ Xác Định & Không Xác Định',
    titleEn: 'Defining & Non-defining Relative Clauses',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Mệnh Đề Nối',
    formula: 'Defining: S + who/which/that + V + O | Non-defining: S, who/which + V, + Main Verb',
    application: {
      writing: 'Nối các câu đơn ngắn thành câu ghép logic. Mệnh đề không xác định (có 2 dấu phẩy) giúp cung cấp thêm thông tin giải thích chuyên sâu cho thuật ngữ trong Task 2.',
      speaking: 'Mô tả người, địa điểm hoặc sự kiện trong Speaking Part 2 (My high school teacher, who inspired me to study literature,...).'
    },
    commonMistakes: [
      {
        incorrect: 'Greenhouse gases, that are emitted by factories, trap heat in the atmosphere.',
        correct: 'Greenhouse gases, which are emitted by factories, trap heat in the atmosphere.',
        explanation: 'Tuyệt đối KHÔNG dùng đại từ quan hệ "that" sau dấu phẩy trong mệnh đề quan hệ không xác định. Phải dùng "which".'
      },
      {
        incorrect: 'Students study abroad they often face cultural shock.',
        correct: 'Students who study abroad often face cultural shock.',
        explanation: 'Lỗi câu chạy nối thiếu liên từ (Run-on sentence). Cần đại từ quan hệ "who" kết nối mệnh đề phụ với động từ chính.'
      }
    ],
    examples: [
      {
        en: 'Telecommuting, which has gained immense traction worldwide, allows employees to strike a better work-life balance.',
        vi: 'Làm việc từ xa, xu hướng đã nhận được sự quan tâm rộng rãi toàn cầu, cho phép nhân viên cân bằng công việc và cuộc sống tốt hơn.',
        analysis: 'Mệnh đề không xác định ", which has gained..." bổ nghĩa cho "Telecommuting" và đứng giữa 2 dấu phẩy.'
      }
    ],
    examinerTip: 'Rút gọn đại từ quan hệ bằng V-ing (chủ động) hoặc V-ed (bị động) là bước đệm tuyệt vời để nâng từ Band 6.0 lên Band 7.5+!'
  },

  {
    id: 'topic-04',
    num: 4,
    title: 'Câu Điều Kiện Loại 1, 2, 3 & Hỗn Hợp',
    titleEn: 'Conditionals in IELTS Writing & Speaking',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Cấu Trúc Cơ Bản',
    formula: 'Type 1: If + S + V(s/es), S + will/can + V | Type 2: If + S + V2/were, S + would/could + V | Type 3: If + S + had + V3, S + would have + V3',
    application: {
      writing: 'Writing Task 2: Câu điều kiện loại 1 & 2 thường dùng trong phần đề xuất giải pháp (Body 2 hoặc Kết bài): "If strict legislation is enacted, pollution levels will dwindle".',
      speaking: 'Speaking Part 2 & 3: Thảo luận về những điều ước hoặc giả định trái với thực tế (If I had more leisure time, I would pursue photography).'
    },
    commonMistakes: [
      {
        incorrect: 'If governments will impose higher taxes on sugar, obesity rates will drop.',
        correct: 'If governments impose higher taxes on sugar, obesity rates will drop.',
        explanation: 'Trong mệnh đề "If" của câu điều kiện loại 1, không dùng "will", chỉ dùng thì Hiện tại đơn.'
      },
      {
        incorrect: 'If individuals were more conscious about electricity consumption, they could have saved money now.',
        correct: 'If individuals were more conscious about electricity consumption, they could save money now.',
        explanation: 'Giả định trái với hiện tại dùng điều kiện loại 2: Mệnh đề chính dùng "could save", không dùng "could have saved".'
      }
    ],
    examples: [
      {
        en: 'If public transportation were completely free of charge, a substantial number of motorists would relinquish private car usage.',
        vi: 'Nếu giao thông công cộng hoàn toàn miễn phí, một số lượng đáng kể tài xế sẽ từ bỏ việc sử dụng xe cá nhân.',
        analysis: 'Điều kiện loại 2 giả định tình huống khó xảy ra ở hiện tại: "were" + "would relinquish".'
      }
    ],
    examinerTip: 'Để đạt Band 7.0+, hãy thay thế liên từ "If" bằng các cụm học thuật như "Provided that", "On condition that", hoặc dùng đảo ngữ!'
  },

  {
    id: 'topic-05',
    num: 5,
    title: 'So Sánh Trong Phân Tích Dữ Liệu Task 1',
    titleEn: 'Comparatives & Superlatives in Data Comparison',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Task 1 Phân Tích',
    formula: 'Far/Significantly + more/less + Adj/Adv than | Twice/Three times + as much/many as | By far the most + Adj',
    application: {
      writing: 'Tiêu chuẩn bắt buộc của Task Achievement: "Make comparisons where relevant". Bạn không được chỉ liệt kê số liệu đơn thuần mà phải so sánh chênh lệch giữa các đối tượng.',
      speaking: 'Speaking Part 3: So sánh thói quen giữa thế hệ trẻ và thế hệ đi trước (Younger generations are far more tech-savvy than their forebears).'
    },
    commonMistakes: [
      {
        incorrect: 'The figure for coal consumption was more higher than that of nuclear energy.',
        correct: 'The figure for coal consumption was significantly higher than that of nuclear energy.',
        explanation: 'Không dùng "more higher" (lỗi double comparative). Dùng trạng từ "significantly / substantially" để bổ nghĩa cho tính từ so sánh hơn "higher".'
      },
      {
        incorrect: 'Sweden consumed twice as many oil as Denmark.',
        correct: 'Sweden consumed twice as much oil as Denmark.',
        explanation: '"Oil" là danh từ không đếm được, phải dùng "twice as much as", không dùng "twice as many as".'
      }
    ],
    examples: [
      {
        en: 'Car ownership in rural areas was roughly three times as high as that in metropolitan districts.',
        vi: 'Tỷ lệ sở hữu ô tô ở vùng nông thôn cao gấp khoảng ba lần so với tỷ lệ đó ở các quận vùng đô thị lớn.',
        analysis: 'Dùng cấu trúc "three times as high as that in..." kết hợp đại từ thay thế "that" để tránh lặp từ "car ownership".'
      }
    ],
    examinerTip: 'Luôn dùng "that of" hoặc "those of" để đại diện cho danh từ số ít hoặc số nhiều đứng trước nhằm tránh lỗi lặp từ và câu què quặt.'
  },

  {
    id: 'topic-06',
    num: 6,
    title: 'Động Từ Khuyết Thiếu & Kỹ Thuật Dự Đoán (Modals)',
    titleEn: 'Modals for Hedging & Future Projections',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Văn Phong Học Thuật',
    formula: 'S + may/might/could/should + V bare | S + is/are projected/predicted to + V',
    application: {
      writing: 'Writing Task 1 mô tả dự báo tương lai (Past 2030, figures are projected to surge). Writing Task 2 dùng để làm dịu phát ngôn (Hedging), tránh thái độ tuyệt đối hóa.',
      speaking: 'Speaking Part 3: Dự đoán viễn cảnh 20-50 năm tới (In the foreseeable future, autonomous vehicles might replace conventional taxis).'
    },
    commonMistakes: [
      {
        incorrect: 'Cutting corporate taxes will definitely eradicate poverty completely.',
        correct: 'Cutting corporate taxes may potentially alleviate poverty to a certain extent.',
        explanation: 'Khẳng định 100% "will definitely eradicate completely" là lỗi văn phong thiếu tính học thuật (overgeneralisation). Hãy dùng "may potentially alleviate".'
      },
      {
        incorrect: 'In 2035, the population will rise to 9 billion.',
        correct: 'By 2035, the global population is projected to reach approximately 9 billion.',
        explanation: 'Dữ liệu tương lai trong Task 1 không thể khẳng định như một sự thật hiển nhiên. Phải dùng "is projected / estimated / anticipated to".'
      }
    ],
    examples: [
      {
        en: 'The solar energy output is estimated to surpass conventional thermal power by the year 2040.',
        vi: 'Sản lượng năng lượng mặt trời được ước tính sẽ vượt qua nhiệt điện truyền thống vào năm 2040.',
        analysis: 'Cấu trúc "is estimated to surpass" diễn đạt dự báo khoa học khách quan.'
      }
    ],
    examinerTip: 'Sử dụng các động từ "tend to", "appear to", "could potentially" là bí quyết ăn điểm Lexical Resource và Grammatical Accuracy trong Task 2.'
  },

  {
    id: 'topic-07',
    num: 7,
    title: 'Sự Hòa Hợp Giữa Chủ Ngữ & Động Từ',
    titleEn: 'Subject-Verb Agreement in Complex Subjects',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Độ Chính Xác Ngữ Pháp',
    formula: 'The number of + N(plural) + V(singular) | A number of + N(plural) + V(plural) | S1 as well as S2 + V(theo S1)',
    application: {
      writing: 'Xuất hiện liên tục trong mọi bài viết Writing Task 1 và Task 2 khi chủ ngữ dài có chứa các cụm giới từ chêm vào giữa.',
      speaking: 'Tránh lỗi phản xạ thiếu âm đuôi "-s/-es" khi chủ ngữ là ngôi thứ ba số ít trong Speaking Part 1.'
    },
    commonMistakes: [
      {
        incorrect: 'The number of unemployed young adults have escalated substantially.',
        correct: 'The number of unemployed young adults has escalated substantially.',
        explanation: '"The number of" (số lượng) luôn đi với động từ số ít ("has escalated"), trong khi "A number of" (nhiều) mới đi với động từ số nhiều.'
      },
      {
        incorrect: 'The excessive consumption of carbonated beverages and junk food lead to heart disease.',
        correct: 'The excessive consumption of carbonated beverages and junk food leads to heart disease.',
        explanation: 'Chủ ngữ chính là danh từ số ít "The excessive consumption", không phải là các danh từ trong cụm phụ "beverages and junk food", do đó động từ phải chia số ít "leads".'
      }
    ],
    examples: [
      {
        en: 'The quality of tertiary education facilities in regional universities plays a pivotal role in retaining local talent.',
        vi: 'Chất lượng của các cơ sở giáo dục đại học tại các trường đại học vùng đóng vai trò then chốt trong việc giữ chân nhân tài địa phương.',
        analysis: 'Chủ ngữ "The quality" (số ít) quyết định động từ "plays", bỏ qua các danh từ số nhiều xen giữa.'
      }
    ],
    examinerTip: 'Khi viết câu dài, hãy dùng bút gạch chân Chủ ngữ cốt lõi (Head Noun) để đảm bảo động từ chính được chia đúng số ít hoặc số nhiều!'
  },

  {
    id: 'topic-08',
    num: 8,
    title: 'Danh Từ Đếm Được & Không Đếm Được Học Thuật',
    titleEn: 'Countable vs. Uncountable Nouns & Traps',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Từ Vựng & Ngữ Pháp',
    formula: 'Uncountable: Research, Information, Equipment, Advice, Knowledge, Traffic, Accommodation (KHÔNG có mạo từ a/an và KHÔNG thêm đuôi -s)',
    application: {
      writing: 'Các danh từ trừu tượng học thuật xuất hiện liên tục trong Writing Task 2. Thêm đuôi "-s" vào danh từ không đếm được là lỗi cơ bản khiến bài thi bị kẹt dưới Band 6.0.',
      speaking: 'Speaking Part 2 & 3: Miêu tả kiến thức và trải nghiệm học tập.'
    },
    commonMistakes: [
      {
        incorrect: 'Scientific researches have demonstrated that smoking causes lung cancer.',
        correct: 'Scientific research has demonstrated that smoking causes lung cancer.',
        explanation: '"Research" là danh từ không đếm được trong tiếng Anh chuẩn, không có dạng số nhiều "researches". Nếu muốn đếm, dùng "research studies / projects".'
      },
      {
        incorrect: 'The government should invest in modern equipments for public hospitals.',
        correct: 'The government should invest in modern equipment for public hospitals.',
        explanation: '"Equipment" không bao giờ thêm đuôi số nhiều "-s". Dùng "pieces of equipment" nếu muốn đếm số lượng.'
      }
    ],
    examples: [
      {
        en: 'Empirical research indicates that early childhood immersion in bilingual settings accelerates cognitive dexterity.',
        vi: 'Nghiên cứu thực nghiệm chỉ ra rằng việc trẻ nhỏ được hòa mình vào môi trường song ngữ sớm sẽ thúc đẩy sự linh hoạt về mặt nhận thức.',
        analysis: '"Research" đi với động từ số ít "indicates" mà không dùng mạo từ "a".'
      }
    ],
    examinerTip: 'Ghi nhớ ngay 5 từ không đếm được dễ sai nhất trong IELTS: research, equipment, information, accommodation, traffic!'
  },

  {
    id: 'topic-09',
    num: 9,
    title: 'Quy Tắc Sử Dụng Mạo Từ (A, An, The & Zero Article)',
    titleEn: 'Articles in Academic Writing Contexts',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Độ Chính Xác Ngữ Pháp',
    formula: 'The + cụ thể / duy nhất / cơ quan chính thống (the government, the Internet, the environment, the media) | Zero article: Danh từ số nhiều / trừu tượng nói chung',
    application: {
      writing: 'Lỗi mạo từ là lỗi ngữ pháp phổ biến nhất của người học Việt Nam trong bài thi Writing. Thiếu "the" trước "government", "environment", "Internet" lập tức làm giảm điểm Grammatical Accuracy.',
      speaking: 'Nói tự nhiên trong Speaking Part 1 và Part 3.'
    },
    commonMistakes: [
      {
        incorrect: 'Government should take urgent measures to safeguard environment.',
        correct: 'The government should take urgent measures to safeguard the environment.',
        explanation: '"Government" và "environment" là các danh từ xác định cụ thể trong xã hội, bắt buộc phải có mạo từ xác định "the".'
      },
      {
        incorrect: 'The education is the most crucial asset for any developing nation.',
        correct: 'Education is the most crucial asset for any developing nation.',
        explanation: 'Khái niệm trừu tượng chung chung ("Education" nói chung) thì KHÔNG dùng mạo từ "the".'
      }
    ],
    examples: [
      {
        en: 'The advent of the Internet has democratised access to tertiary educational resources.',
        vi: 'Sự ra đời của Internet đã bình đẳng hóa việc tiếp cận các nguồn học liệu giáo dục đại học.',
        analysis: '"The advent" (sự ra đời cụ thể) và "the Internet" (thực thể duy nhất) đều cần mạo từ "the".'
      }
    ],
    examinerTip: 'Quy tắc vàng: Nếu nói về một nhóm đối tượng chung chung số nhiều (Students, Children, Scientists), không dùng "The". Nếu nói về chính phủ, môi trường, truyền thông: Luôn dùng "The"!'
  },

  {
    id: 'topic-10',
    num: 10,
    title: 'Giới Từ Chỉ Xu Hướng & Dữ Liệu Task 1 (By, To, At, Of)',
    titleEn: 'Prepositions of Trends & Figures in Task 1',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Task 1 Phân Tích',
    formula: 'Increase BY + biên độ chênh lệch (10%) | Increase TO + mốc đích chạm tới (75%) | Stand AT + mốc tĩnh | An increase OF + số lượng',
    application: {
      writing: 'Cực kỳ quan trọng trong Academic Writing Task 1. Dùng sai giới từ "by" và "to" sẽ làm sai lệch toàn bộ thông tin số liệu thực tế của biểu đồ, dẫn đến bị trừ nặng điểm Task Achievement.',
      speaking: 'Ít dùng trong Speaking, chủ yếu dùng khi cần trích dẫn số liệu trong Part 3.'
    },
    commonMistakes: [
      {
        incorrect: 'The unemployment rate surged to 5% from 20% in the previous year.',
        correct: 'The unemployment rate surged by 5%, from 20% to 25% in the previous year.',
        explanation: '"Surged to 5%" nghĩa là tỷ lệ giảm tụt xuống còn 5%! Muốn diễn đạt mức tăng thêm 5%, bắt buộc phải dùng giới từ "surged by 5%".'
      },
      {
        incorrect: 'In 2010, the figure of solar power production reached 50 gigawatts.',
        correct: 'In 2010, the figure for solar power production reached 50 gigawatts.',
        explanation: 'Cụm từ chuẩn xác luôn là "the figure for + category", không dùng "the figure of".'
      }
    ],
    examples: [
      {
        en: 'Oil prices escalated dramatically by $15 per barrel, ultimately plateauing at $95 in December.',
        vi: 'Giá dầu leo thang đáng kể thêm 15 USD mỗi thùng, cuối cùng chững lại ở mức 95 USD vào tháng 12.',
        analysis: '"escalated by $15" (tăng thêm 15 USD) và "plateauing at $95" (giữ nguyên tại mốc 95 USD).'
      }
    ],
    examinerTip: 'Học thuộc công thức: V + BY + chênh lệch (difference); V + TO + điểm đến (finish point); V + AT + mốc thời điểm (status quo).'
  },

  {
    id: 'topic-11',
    num: 11,
    title: 'Liên Từ Nối Đẳng Lập, Phụ Thuộc & Tránh Lỗi Run-on',
    titleEn: 'Conjunctions & Run-on Sentence Fixes',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Cấu Trúc Cơ Bản',
    formula: 'Subordinating: Although / While / Whereas + Clause 1, Clause 2 | Coordinating: FANBOYS (for, and, nor, but, or, yet, so) sau dấu phẩy',
    application: {
      writing: 'Writing Task 1 & Task 2: Dùng While / Whereas để so sánh đối chiếu số liệu hoặc quan điểm giữa 2 nhóm đối tượng.',
      speaking: 'Mở rộng câu trả lời tự nhiên trong Speaking Part 1 & 2.'
    },
    commonMistakes: [
      {
        incorrect: 'Although electric vehicles are eco-friendly, but their battery replacement costs remain exorbitant.',
        correct: 'Although electric vehicles are eco-friendly, their battery replacement costs remain exorbitant.',
        explanation: 'Trong tiếng Anh, đã dùng "Although" ở mệnh đề đầu thì KHÔNG dùng "but" ở mệnh đề sau (lỗi dịch từ tiếng Việt "Mặc dù... nhưng...").'
      },
      {
        incorrect: 'Because public transport is affordable so many residents prefer it.',
        correct: 'Because public transport is affordable, many residents prefer it.',
        explanation: 'Đã có "Because" thì KHÔNG dùng "so" ở mệnh đề chính tiếp theo.'
      }
    ],
    examples: [
      {
        en: 'While domestic production experienced a mild downturn, foreign exports exhibited a notable upward trajectory.',
        vi: 'Trong khi sản lượng trong nước trải qua một đợt suy giảm nhẹ, xuất khẩu ra nước ngoài lại thể hiện một quỹ đạo đi lên đáng chú ý.',
        analysis: 'Liên từ "While" ở đầu câu tạo nên sự tương phản hai chiều sắc nét giữa hai mệnh đề độc lập.'
      }
    ],
    examinerTip: 'Tuyệt đối không bắt đầu câu bằng "Because" nếu câu đó không có mệnh đề chính đi kèm (Fragment Sentence).'
  },

  {
    id: 'topic-12',
    num: 12,
    title: 'Danh Động Từ (Gerunds) & Động Từ Đi Kèm Giới Từ',
    titleEn: 'Gerunds & Prepositional Verb Combinations',
    bandTier: '4.5-6.0',
    bandBadge: 'Band 4.5 - 6.0',
    category: 'Cấu Trúc Cơ Bản',
    formula: 'Lead to + V-ing | Contribute to + V-ing | Be committed to + V-ing | Aim at + V-ing | In addition to + V-ing',
    application: {
      writing: 'Writing Task 2: Dùng danh động từ đứng đầu câu làm chủ ngữ (Gerund as Subject) để tăng tính học thuật: "Implementing stringent fines can mitigate littering".',
      speaking: 'Speaking Part 1 & 2: Diễn đạt sở thích, thói quen và mục tiêu tương lai.'
    },
    commonMistakes: [
      {
        incorrect: 'Urban sprawl directly leads to destroy natural habitats of local wildlife.',
        correct: 'Urban sprawl directly leads to destroying natural habitats of local wildlife.',
        explanation: 'Trong cụm "lead to", "to" là giới từ (preposition), do đó động từ theo sau bắt buộc phải ở dạng V-ing ("lead to destroying"), không dùng động từ nguyên thể.'
      },
      {
        incorrect: 'Governments should commit to invest heavily in renewable infrastructure.',
        correct: 'Governments should commit to investing heavily in renewable infrastructure.',
        explanation: '"Commit to" là cụm động từ đi với giới từ, theo sau phải là danh động từ "investing".'
      }
    ],
    examples: [
      {
        en: 'Investing in subsidized vocational training plays a central role in mitigating youth unemployment.',
        vi: 'Việc đầu tư vào các khóa đào tạo nghề có trợ cấp đóng vai trò trọng tâm trong việc giảm thiểu tình trạng thất nghiệp ở thanh niên.',
        analysis: 'Danh động từ "Investing in..." làm chủ ngữ số ít, kéo theo động từ chính chia "plays".'
      }
    ],
    examinerTip: 'Các cụm "lead to", "contribute to", "object to", "look forward to", "with a view to" đều bắt buộc đi kèm V-ing!'
  },

  // ================= BAND 6.0 - 7.5 & 7.5+ (ADVANCED & EXPERT) =================
  {
    id: 'topic-13',
    num: 13,
    title: 'Câu Đảo Ngữ Tăng Cường Tính Học Thuật (Inversion)',
    titleEn: 'Negative & Restrictive Inversion for Band 7.5+',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.0 - 8.5+',
    category: 'Cấu Trúc Nâng Cao',
    formula: 'Not only + Trợ động từ (do/does/did/is/are) + S + V, but S + also + V | Under no circumstances + Trợ động từ + S + V | Only by + V-ing + Trợ động từ + S + V',
    application: {
      writing: 'Writing Task 2: Dùng trong câu luận đề (Thesis statement), mở đầu thân bài hoặc kết luận nhằm nhấn mạnh sự cấp bách hoặc tầm quan trọng của giải pháp.',
      speaking: 'Speaking Part 3: Tạo ấn tượng cực mạnh với giám khảo khi bàn luận về các vấn đề xã hội có tính triết lý sâu sắc.'
    },
    commonMistakes: [
      {
        incorrect: 'Not only renewable energy curbs greenhouse emissions, but it also creates green jobs.',
        correct: 'Not only does renewable energy curb greenhouse gas emissions, but it also creates green jobs.',
        explanation: 'Khi cụm từ phủ định "Not only" đứng đầu câu, BẮT BUỘC phải đảo trợ động từ ("does") lên trước chủ ngữ ("renewable energy") và động từ chính trở về nguyên thể ("curb").'
      },
      {
        incorrect: 'Only by educating the young generation, we can overcome racial discrimination.',
        correct: 'Only by educating the younger generation can we overcome racial discrimination.',
        explanation: 'Bắt đầu bằng "Only by + V-ing" đòi hỏi mệnh đề chính phải đảo ngữ trợ động từ "can" lên trước chủ ngữ "we".'
      }
    ],
    examples: [
      {
        en: 'Not only does excessive urbanization exacerbate environmental degradation, but it also strains metropolitan public health infrastructures.',
        vi: 'Không những quá trình đô thị hóa quá mức làm trầm trọng thêm sự suy thoái môi trường, mà nó còn tạo áp lực nặng nề lên hạ tầng y tế công cộng đô thị.',
        analysis: 'Cấu trúc đảo ngữ "Not only does S + V, but it also..." biến câu văn thành một nhận định học thuật sắc sảo chuẩn Band 8.0.'
      },
      {
        en: 'Under no circumstances should confidential personal data be disseminated without explicit user consent.',
        vi: 'Dưới bất kỳ hoàn cảnh nào, dữ liệu cá nhân bảo mật cũng không được phép phát tán nếu không có sự đồng thuận rõ ràng từ người dùng.',
        analysis: '"Under no circumstances should S + be V3" là cấu trúc đảo ngữ mang tính pháp lý và học thuật cao nhất.'
      }
    ],
    examinerTip: 'Chỉ cần sử dụng chính xác 1-2 câu đảo ngữ trong bài luận Task 2, bạn đã chứng minh được tiêu chí Grammatical Range ở đẳng cấp Band 8.0!'
  },

  {
    id: 'topic-14',
    num: 14,
    title: 'Mệnh Đề Phân Từ Rút Gọn (Participle Clauses)',
    titleEn: 'Present, Past & Perfect Participle Clauses',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.0 - 8.5+',
    category: 'Cấu Trúc Nâng Cao',
    formula: 'Active: V-ing + O, Main Clause | Passive: V3/ed + by/with..., Main Clause | Prior action: Having + V3/ed, Main Clause',
    application: {
      writing: 'Writing Task 1 & Task 2: Cô đọng câu văn, tránh lặp lại liên từ "Because", "When", "After". Thể hiện khả năng kiểm soát cú pháp học thuật thượng thừa.',
      speaking: 'Speaking Part 2 & 3: Kể chuỗi hành động một cách mượt mà và lưu loát.'
    },
    commonMistakes: [
      {
        incorrect: 'Walking down the city streets, the traffic noise was unbearable. (Dangling Modifier)',
        correct: 'Walking down the city streets, pedestrians found the traffic noise unbearable.',
        explanation: 'Lỗi lơ lửng chủ ngữ (Dangling participle): Chủ ngữ của hành động "Walking" phải là "pedestrians", không thể là "traffic noise" (tiếng ồn không biết đi bộ!).'
      },
      {
        incorrect: 'Constructing in the 19th century, the historic museum requires substantial restoration.',
        correct: 'Constructed in the 19th century, the historic museum requires substantial restoration.',
        explanation: 'Bảo tàng được xây dựng (mang nghĩa bị động), do đó phải dùng Quá khứ phân từ "Constructed", không dùng Hiện tại phân từ "Constructing".'
      }
    ],
    examples: [
      {
        en: 'Having acknowledged the catastrophic perils of climate change, several industrialized nations committed to attaining net-zero carbon emissions.',
        vi: 'Sau khi đã nhận thức rõ những hiểm họa thảm khốc của biến đổi khí hậu, nhiều quốc gia công nghiệp phát triển đã cam kết đạt mức phát thải ròng bằng không.',
        analysis: '"Having acknowledged..." (Phân từ hoàn thành) diễn tả hành động nhận thức đã xảy ra trước khi đưa ra cam kết.'
      },
      {
        en: 'Industrial wastewater is frequently discharged into adjacent rivers, severely depleting aquatic biodiversity.',
        vi: 'Nước thải công nghiệp thường xuyên bị xả thẳng vào các con sông lân cận, làm suy giảm nghiêm trọng sự đa dạng sinh học thủy sinh.',
        analysis: 'Mệnh đề phân từ "severely depleting..." ở vế sau diễn đạt kết quả trực tiếp của hành động trước đó.'
      }
    ],
    examinerTip: 'Dùng V-ing ở đuôi câu để chỉ hệ quả ("leading to...", "resulting in...", "causing...") là vũ khí ghi điểm Cohesion & Grammatical Range cực kỳ thông dụng.'
  },

  {
    id: 'topic-15',
    num: 15,
    title: 'Hiện Tượng Danh Từ Hóa (Nominalisation)',
    titleEn: 'Nominalisation: Transforming Verbs to Academic Noun Phrases',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.5 - 9.0',
    category: 'Văn Phong Học Thuật',
    formula: 'Informal/Spoken (S + V + O) ==> Formal/Academic: [The + Adjective + Noun] + has led to / sparked / necessitated + [Noun Phrase]',
    application: {
      writing: 'Tiêu chuẩn vàng phân biệt văn nói (Spoken English) và văn bản học thuật (Academic Register). Thay vì viết "People consume too much fast food so they get fat", ta danh từ hóa thành "The excessive consumption of processed foods has contributed to escalating obesity rates".',
      speaking: 'Speaking Part 3: Nâng cấp câu trả lời trừu tượng theo phong cách bình luận viên học thuật.'
    },
    commonMistakes: [
      {
        incorrect: 'Because the population grew very fast, cities became overcrowded.',
        correct: 'Rapid demographic growth precipitated acute urban overcrowding.',
        explanation: 'Câu trước mang nặng cấu trúc văn nói. Câu sau áp dụng danh từ hóa ("demographic growth", "urban overcrowding") và động từ học thuật ("precipitated") đạt chuẩn Band 8.5+.'
      },
      {
        incorrect: 'Students are easily distractive by mobile devices in classrooms.',
        correct: 'Mobile devices cause significant cognitive distraction among students in classroom settings.',
        explanation: '"distractive" là lỗi dùng từ sai ngữ pháp. Áp dụng danh từ hóa "cognitive distraction" biến câu văn thành một luận điểm vững chắc.'
      }
    ],
    examples: [
      {
        en: 'The proliferation of digital communication platforms has revolutionized collaborative working environments.',
        vi: 'Sự phổ biến nhanh chóng của các nền tảng truyền thông kỹ thuật số đã cách mạng hóa môi trường làm việc hợp tác.',
        analysis: 'Chuyển hóa từ "Digital platforms proliferate rapidly" thành cụm danh từ "The proliferation of..." cô đọng và trang trọng.'
      }
    ],
    examinerTip: 'Hãy chuyển đổi các tính từ và động từ phổ biến thành danh từ: develop -> development, consume -> consumption, innovate -> innovation, urbanize -> urbanization.'
  },

  {
    id: 'topic-16',
    num: 16,
    title: 'Câu Chẻ Nhấn Mạnh (Cleft Sentences)',
    titleEn: 'Cleft Sentences (It is/was... that / What... is...)',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.0 - 8.5+',
    category: 'Cấu Trúc Nâng Cao',
    formula: 'It is/was + Thành phần cần nhấn mạnh + that + Mệnh đề còn lại | What + S + V + is/was + Noun/Clause',
    application: {
      writing: 'Writing Task 2: Dùng để làm nổi bật tác nhân mấu chốt gây ra vấn đề hoặc giải pháp mang tính đột phá nhất trong bài luận.',
      speaking: 'Speaking Part 2 & Part 3: Khẳng định quan điểm cá nhân một cách dứt khoát.'
    },
    commonMistakes: [
      {
        incorrect: 'It is governmental intervention which plays a decisive role in curbing air pollution.',
        correct: 'It is governmental intervention that plays a decisive role in curbing air pollution.',
        explanation: 'Trong cấu trúc câu chẻ "It is... that", liên từ chuẩn mực là "that", không dùng "which" dù đối tượng được nhấn mạnh là sự vật.'
      },
      {
        incorrect: 'What society needs is more strict laws.',
        correct: 'What contemporary society urgently requires is more stringent legislative enforcement.',
        explanation: 'Nâng cấp từ ngữ đi kèm để phát huy tối đa sức mạnh của câu chẻ Band 8.0.'
      }
    ],
    examples: [
      {
        en: 'It is parental guidance that predominantly shapes an adolescent’s moral compass and civic responsibility.',
        vi: 'Chính sự định hướng của cha mẹ mới là yếu tố chủ đạo định hình nên chuẩn mực đạo đức và trách nhiệm công dân của một thiếu niên.',
        analysis: 'Nhấn mạnh cụm "parental guidance" bằng cấu trúc "It is... that...".'
      },
      {
        en: 'What distinguishes outstanding academic institutions from mediocre ones is their unwavering commitment to empirical research.',
        vi: 'Điều phân biệt các cơ sở học thuật xuất sắc với những nơi tầm thường chính là sự cam kết kiên định của họ đối với nghiên cứu thực nghiệm.',
        analysis: 'Câu chẻ bắt đầu bằng mệnh đề danh từ "What distinguishes... is...".'
      }
    ],
    examinerTip: 'Sử dụng một câu chẻ ở câu đầu đoạn Thân bài 2 để tạo sự chú ý thị giác và nhấn mạnh lập luận trọng tâm của bạn.'
  },

  {
    id: 'topic-17',
    num: 17,
    title: 'Cấu Trúc So Sánh Kép (Double Comparatives)',
    titleEn: 'Double Comparatives: The more..., the more...',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.0 - 8.5+',
    category: 'Cấu Trúc Nâng Cao',
    formula: 'The + comparative (more/less/-er) + S + V, the + comparative (more/less/-er) + S + V',
    application: {
      writing: 'Writing Task 2: Miêu tả mối quan hệ tỷ lệ thuận hoặc tỷ lệ nghịch giữa hai hiện tượng xã hội (kinh tế và môi trường, công nghệ và việc làm).',
      speaking: 'Speaking Part 3: Diễn đạt quy luật nhân quả tinh tế.'
    },
    commonMistakes: [
      {
        incorrect: 'The more society industrialises, the environment gets worse.',
        correct: 'The more society industrialises, the more degraded the natural environment becomes.',
        explanation: 'Vế sau thiếu cấu trúc so sánh đối ứng "the more degraded... becomes". Cả hai vế phải tuân theo cấu trúc song song chặt chẽ.'
      },
      {
        incorrect: 'The higher the unemployment rate, higher the crime rate.',
        correct: 'The higher the unemployment rate, the higher the incidence of street crime becomes.',
        explanation: 'Bỏ quên mạo từ "the" ở vế thứ hai và thiếu động từ vị ngữ "becomes".'
      }
    ],
    examples: [
      {
        en: 'The more technologically sophisticated artificial intelligence becomes, the more urgent the need for ethical regulatory frameworks appears.',
        vi: 'Trí tuệ nhân tạo càng trở nên tinh vi về mặt công nghệ, thì nhu cầu thiết lập các khuôn khổ pháp lý đạo đức càng trở nên cấp bách.',
        analysis: 'Cấu trúc cân xứng tuyệt đối: "The more technologically sophisticated S becomes, the more urgent S appears".'
      }
    ],
    examinerTip: 'Đảm bảo mỗi vế đều có đầy đủ Chủ ngữ và Động từ (thường dùng động từ chỉ sự thay đổi như becomes, grows, appears).'
  },

  {
    id: 'topic-18',
    num: 18,
    title: 'Cấu Trúc Giả Định Thức (Subjunctive Mood)',
    titleEn: 'Subjunctive Mood in Recommendations & Policy Mandates',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.5 - 9.0',
    category: 'Văn Phong Học Thuật',
    formula: 'It is imperative / crucial / vital / essential that + S + (should) + V bare (Động từ nguyên thể không chia)',
    application: {
      writing: 'Writing Task 2: Thường dùng trong đoạn đề xuất giải pháp ở phần Thân bài hoặc Kết bài: "It is imperative that authorities regulate...".',
      speaking: 'Speaking Part 3: Đưa ra lời khuyên hoặc biện pháp cấp bách cho chính phủ và cộng đồng.'
    },
    commonMistakes: [
      {
        incorrect: 'It is crucial that the ministry enforces stricter emission standards on heavy industries.',
        correct: 'It is crucial that the ministry enforce stricter emission standards on heavy industries.',
        explanation: 'Sau tính từ mệnh lệnh "crucial that", động từ theo sau bắt buộc ở dạng nguyên thể không chia ("enforce", không chia "-s" dù chủ ngữ là ngôi thứ ba số ít "the ministry").'
      },
      {
        incorrect: 'It is recommended that every citizen is provided with free healthcare.',
        correct: 'It is recommended that every citizen be provided with universal healthcare.',
        explanation: 'Ở thể bị động, động từ "be" phải giữ nguyên mẫu ("be provided"), không dùng "is provided".'
      }
    ],
    examples: [
      {
        en: 'It is imperative that municipal authorities allocate substantial budgetary resources to expanding sustainable green spaces.',
        vi: 'Điều tối quan trọng là các nhà chức trách đô thị phải phân bổ các nguồn lực ngân sách đáng kể để mở rộng các không gian xanh bền vững.',
        analysis: 'Động từ "allocate" giữ nguyên thể không chia sau cấu trúc giả định thức "It is imperative that S + V bare".'
      }
    ],
    examinerTip: 'Các tính từ kích hoạt thức giả định: imperative, essential, vital, crucial, indispensable, paramount, recommended.'
  },

  {
    id: 'topic-19',
    num: 19,
    title: 'Kỹ Thuật Hedging Học Thuật Cấp Cao (Cautious Stance)',
    titleEn: 'Academic Hedging: Epistemic Modality & Nuanced Claims',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.5 - 9.0',
    category: 'Văn Phong Học Thuật',
    formula: 'It is plausible that... | S + tends to / appears to / is inclined to + V | S + can be tentatively attributed to...',
    application: {
      writing: 'Trọng tâm đánh giá tiêu chí Task Response ở Band 8.0 - 9.0. Bài viết học thuật không bao giờ dùng các từ cực đoan (always, never, proves, completely). Bạn cần dùng ngôn ngữ thận trọng (Cautious Language / Hedging).',
      speaking: 'Speaking Part 3: Trả lời thông minh, thể hiện góc nhìn học thuật khách quan.'
    },
    commonMistakes: [
      {
        incorrect: 'Social media unconditionally destroys face-to-face communication skills among adolescents.',
        correct: 'Excessive reliance on social networking platforms tends to impede interpersonal communication competence among youth.',
        explanation: 'Khẳng định "unconditionally destroys" (phá hủy hoàn toàn vô điều kiện) mang tính chủ quan phiến diện. Thay bằng "tends to impede" để đảm bảo tính khách quan khoa học.'
      },
      {
        incorrect: 'This data indisputably proves that capitalism failed.',
        correct: 'These preliminary findings suggest that unrestricted market mechanisms may exacerbate socioeconomic disparities.',
        explanation: 'Tránh dùng "indisputably proves". Thay bằng "findings suggest that... may exacerbate".'
      }
    ],
    examples: [
      {
        en: 'It is widely contended that sustained early childhood exposure to screen devices may correlate with diminished attentional focus.',
        vi: 'Nhiều quan điểm cho rằng việc trẻ nhỏ tiếp xúc liên tục với các thiết bị màn hình có thể có mối tương quan với sự suy giảm khả năng tập trung.',
        analysis: 'Sử dụng cụm "It is widely contended that..." kết hợp "may correlate with" tạo nên lập luận thận trọng và khách quan.'
      }
    ],
    examinerTip: 'Thay thế các từ khẳng định tuyệt đối (proves, will certainly, completely) bằng: suggests, indicates, tends to, appears to be, arguably.'
  },

  {
    id: 'topic-20',
    num: 20,
    title: 'Đảo Ngữ Trong Câu Điều Kiện Bỏ "If" (Inverted Conditionals)',
    titleEn: 'Conditionals Inversion (Were S to / Had S V3 / Should S V)',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.5 - 9.0',
    category: 'Cấu Trúc Nâng Cao',
    formula: 'Type 1: Should + S + V, S + will + V | Type 2: Were + S + to-V, S + would + V | Type 3: Had + S + V3/ed, S + would have + V3/ed',
    application: {
      writing: 'Writing Task 2: Dùng để thay thế câu điều kiện thông thường, tạo điểm nhấn cú pháp trang trọng và học thuật đỉnh cao.',
      speaking: 'Speaking Part 3: Bàn luận về các kịch bản chính sách giả định.'
    },
    commonMistakes: [
      {
        incorrect: 'Were governments impose strict carbon taxes, corporations would comply immediately.',
        correct: 'Were governments to impose stringent carbon taxes, corporations would comply immediately.',
        explanation: 'Trong đảo ngữ điều kiện loại 2, nếu động từ là động từ thường, bắt buộc phải dùng cấu trúc "Were + S + TO-V" ("Were governments to impose").'
      },
      {
        incorrect: 'Had the government invested earlier, the current crisis could be avoided.',
        correct: 'Had the government invested earlier, the current crisis could have been avoided.',
        explanation: 'Đảo ngữ điều kiện loại 3 cho hành động quá khứ thì mệnh đề sau phải dùng "could have been avoided", không dùng "could be avoided".'
      }
    ],
    examples: [
      {
        en: 'Were authorities to enforce more rigorous anti-monopoly regulations, tech conglomerates would be compelled to operate transparently.',
        vi: 'Nếu các nhà chức trách thực thi các quy định chống độc quyền nghiêm ngặt hơn, các tập đoàn công nghệ sẽ bị buộc phải vận hành một cách minh bạch.',
        analysis: '"Were authorities to enforce..." là cấu trúc đảo ngữ điều kiện loại 2 đạt chuẩn Band 8.5+.'
      },
      {
        en: 'Had decisive intervention measures been instituted a decade ago, global deforestation rates would not have escalated to such an alarming degree.',
        vi: 'Giá như các biện pháp can thiệp quyết liệt được triển khai từ một thập kỷ trước, tỷ lệ phá rừng toàn cầu đã không leo thang đến mức đáng báo động như hiện nay.',
        analysis: '"Had decisive intervention measures been instituted..." đảo ngữ điều kiện loại 3 thể bị động.'
      }
    ],
    examinerTip: 'Học thuộc lòng mẫu câu: "Were governments to subsidise [Giải pháp], [Kết quả tích cực] would materialize."'
  },

  {
    id: 'topic-21',
    num: 21,
    title: 'Mệnh Đề Nhượng Bộ Nâng Cao (Advanced Concession)',
    titleEn: 'Concession Structures: Notwithstanding, Albeit, In spite of the fact that',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.5 - 9.0',
    category: 'Văn Phong Học Thuật',
    formula: 'Notwithstanding + Noun Phrase / the fact that + Clause | Albeit + Adjective / Adverb Phrase | In spite of + Noun Phrase',
    application: {
      writing: 'Writing Task 2: Bắt buộc dùng trong các bài luận thảo luận hai chiều (Discuss both views) hoặc dạng nhượng bộ để thừa nhận quan điểm đối lập trước khi phản biện.',
      speaking: 'Speaking Part 3: Phân tích góc nhìn đa chiều của vấn đề.'
    },
    commonMistakes: [
      {
        incorrect: 'Notwithstanding it generates economic revenue, tourism can cause environmental degradation.',
        correct: 'Notwithstanding its substantial economic revenues, tourism can trigger catastrophic environmental degradation.',
        explanation: '"Notwithstanding" là một giới từ học thuật, theo sau phải là Cụm danh từ (Noun Phrase), không thể đi trực tiếp với mệnh đề "S + V" trừ khi có "the fact that".'
      },
      {
        incorrect: 'The project was successful, albeit it cost too much.',
        correct: 'The project was deemed a success, albeit exorbitantly expensive.',
        explanation: '"Albeit" thường đi kèm trực tiếp với tính từ hoặc cụm trạng từ ("albeit exorbitantly expensive"), không dùng với mệnh đề hoàn chỉnh "S + V".'
      }
    ],
    examples: [
      {
        en: 'Notwithstanding the evident financial advantages of automation, its destabilizing impact on blue-collar employment cannot be overlooked.',
        vi: 'Mặc dù những lợi ích tài chính rõ ràng của tự động hóa là không thể phủ nhận, tác động gây mất ổn định của nó đối với lực lượng lao động phổ thông không thể bị xem nhẹ.',
        analysis: '"Notwithstanding the evident financial advantages..." tạo thế cân bằng học thuật vững chắc cho bài luận Task 2.'
      }
    ],
    examinerTip: 'Thay thế các từ nối quen thuộc như "Although / Despite" bằng "Notwithstanding" hoặc "Albeit" để nâng điểm Lexical Resource và Cohesion.'
  },

  {
    id: 'topic-22',
    num: 22,
    title: 'Đại Từ Quan Hệ Kết Hợp Giới Từ (Preposition + Relative Pronouns)',
    titleEn: 'Preposition Placement in Relative Clauses (in which, through which, to whom)',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.0 - 8.5+',
    category: 'Cấu Trúc Nâng Cao',
    formula: 'Noun + Preposition (in / on / at / through / with / upon) + which/whom + S + V',
    application: {
      writing: 'Tránh lỗi để giới từ trôi nổi lơ lửng ở cuối câu (Dangling Preposition) - một lỗi văn nói rất kỵ trong văn phong học thuật Cambridge.',
      speaking: 'Speaking Part 3: Diễn đạt chuẩn xác các mối quan hệ nguyên nhân - bối cảnh.'
    },
    commonMistakes: [
      {
        incorrect: 'The technological framework that modern e-commerce relies on is vulnerable.',
        correct: 'The technological framework upon which modern e-commerce relies is highly vulnerable.',
        explanation: 'Trong văn phong học thuật trang trọng, thay vì để giới từ "on" ở cuối câu, ta đưa lên trước đại từ quan hệ: "upon which modern e-commerce relies".'
      },
      {
        incorrect: 'A collaborative workplace is an environment where employees can flourish in.',
        correct: 'A collaborative workplace is an environment in which employees can flourish.',
        explanation: 'Đã dùng "where" thì không còn giới từ "in" ở cuối câu. Hoặc tốt nhất dùng "in which" để tăng tính học thuật.'
      }
    ],
    examples: [
      {
        en: 'Equitable public education provides the foundational bedrock upon which a meritocratic society is constructed.',
        vi: 'Giáo dục công lập công bằng cung cấp nền tảng vững chắc mà dựa vào đó một xã hội trọng nhân tài được xây dựng.',
        analysis: 'Cụm "upon which a meritocratic society is constructed" thể hiện sự chuẩn xác tuyệt đối về mặt cú pháp học thuật.'
      }
    ],
    examinerTip: 'Các cặp giới từ + đại từ quan hệ ăn điểm nhất: in which (nơi mà/trong đó), through which (thông qua đó), upon which (dựa trên đó), by means of which (bằng phương tiện đó).'
  },

  {
    id: 'topic-23',
    num: 23,
    title: 'Cấu Trúc Song Song & Cân Đối (Parallelism)',
    titleEn: 'Parallel Structure in Complex Lists & Coordinated Elements',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.0 - 8.5+',
    category: 'Độ Chính Xác Ngữ Pháp',
    formula: 'Both X and Y | Either X or Y | Neither X nor Y | Not only X but also Y (X và Y bắt buộc phải cùng dạng ngữ pháp: cùng là Noun, cùng là V-ing, hoặc cùng là Clause)',
    application: {
      writing: 'Khi liệt kê nhiều nguyên nhân, hệ quả hoặc giải pháp trong một câu phức ở Task 2. Mất cấu trúc song song sẽ làm câu văn trở nên vụng về và luộm thuộm.',
      speaking: 'Giúp câu nói có nhịp điệu (Rhythm) và ngữ điệu tự nhiên.'
    },
    commonMistakes: [
      {
        incorrect: 'The government should focus on developing infrastructure, to create jobs, and pollution reduction.',
        correct: 'The government should focus on developing infrastructure, creating jobs, and reducing pollution.',
        explanation: 'Lỗi mất tính song song: "developing" (V-ing), "to create" (to-V) và "pollution reduction" (Noun). Phải đồng nhất tất cả về dạng V-ing ("developing, creating, and reducing").'
      },
      {
        incorrect: 'Physical exercise not only enhances cardiovascular health but also it boosts mental acuity.',
        correct: 'Physical exercise not only enhances cardiovascular health but also boosts mental acuity.',
        explanation: 'Hai vế sau "not only" và "but also" phải cân xứng về động từ ("enhances..." và "boosts..."), bỏ đại từ "it" thừa thãi.'
      }
    ],
    examples: [
      {
        en: 'Effective leadership entails inspiring collaborative teams, navigating organizational crises, and championing ethical standards.',
        vi: 'Khả năng lãnh đạo hiệu quả bao gồm việc truyền cảm hứng cho các đội nhóm hợp tác, điều hướng các cuộc khủng hoảng tổ chức, và bảo vệ các chuẩn mực đạo đức.',
        analysis: 'Bộ ba danh động từ song song hoàn hảo: "inspiring...", "navigating...", "championing...".'
      }
    ],
    examinerTip: 'Khi dùng liên từ "and" hoặc "or" để nối từ ba thành phần trở lên, hãy rà soát lại xem tất cả các thành phần có cùng đuôi từ loại (V-ing, Adj, Noun phrase) hay không.'
  },

  {
    id: 'topic-24',
    num: 24,
    title: 'Lựa Chọn Từ Học Thuật & Bẫy Dùng Sai Dạng Từ',
    titleEn: 'Academic Collocation Selection & Form Traps (big noise, distractive...)',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.0 - 8.5+',
    category: 'Văn Phong & Collocation',
    formula: 'Tránh dịch từng chữ từ tiếng Việt (Word-by-word Translation) ==> Sử dụng đúng Collocations học thuật C1/C2',
    application: {
      writing: 'Tránh các lỗi dịch thô làm mất điểm Lexical Resource như dùng "big noise" thay vì "high ambient noise levels", "distractive" thay vì "distracting", "make a damage" thay vì "inflict/cause damage", "open your mind" thay vì "broaden one’s horizons".',
      speaking: 'Sử dụng từ vựng tự nhiên và chuẩn xác trong Speaking Part 2 và Part 3.'
    },
    commonMistakes: [
      {
        incorrect: 'Urban dwellers are constantly exposed to big noise from industrial factories.',
        correct: 'Urban dwellers are persistently subjected to elevated ambient noise levels from industrial operations.',
        explanation: 'Trong tiếng Anh học thuật không ai dùng "big noise". Phải dùng "elevated ambient noise levels" hoặc "severe noise pollution".'
      },
      {
        incorrect: 'Constant smartphone notifications are extremely distractive to students.',
        correct: 'Constant smartphone notifications are extremely distracting to students.',
        explanation: '"distractive" là lỗi tự chế từ sai ngữ pháp. Tính từ chuẩn xác diễn tả tính chất gây phân tâm là "distracting".'
      },
      {
        incorrect: 'Oil spills make great damages to marine ecosystems.',
        correct: 'Oil spills inflict catastrophic damage on marine ecosystems.',
        explanation: 'Động từ đi với "damage" là "cause / inflict damage on", không dùng "make damage". Ngoài ra "damage" mang nghĩa thiệt hại là danh từ không đếm được.'
      }
    ],
    examples: [
      {
        en: 'Persistent exposure to excessive noise pollution exerts detrimental ramifications on psychological well-being.',
        vi: 'Việc tiếp xúc dai dẳng với mức độ ô nhiễm tiếng ồn quá mức gây ra những hệ lụy tiêu cực đối với sức khỏe tâm lý.',
        analysis: 'Kết hợp các cụm từ học thuật chuẩn xác: "persistent exposure to...", "exerts detrimental ramifications on...".'
      }
    ],
    examinerTip: 'Không cố gắng ghép những từ đơn lẻ mang nghĩa "to tát" nếu chưa chắc chắn về Collocation đi kèm với nó!'
  },

  {
    id: 'topic-25',
    num: 25,
    title: 'Mệnh Đề Tuyệt Đối & Tương Phản Đối Lập (Far from being...)',
    titleEn: 'Absolute & Antithetical Clauses: Far from being / Rather than',
    bandTier: '6.0-7.5+',
    bandBadge: 'Band 7.5 - 9.0',
    category: 'Cấu Trúc Nâng Cao',
    formula: 'Far from being + Adj/Noun, S + actually / in fact + V | Rather than + V-ing / V bare, S + V',
    application: {
      writing: 'Writing Task 2: Dùng để bác bỏ dứt khoát một quan niệm sai lầm phổ biến trong xã hội và khẳng định một thực tế hoàn toàn trái ngược.',
      speaking: 'Speaking Part 3: Phản biện luận điểm đối thủ một cách tinh tế và đĩnh đạc.'
    },
    commonMistakes: [
      {
        incorrect: 'Far from be an obstacle, technological disruption fosters economic dynamism.',
        correct: 'Far from being an impediment, technological disruption fosters immense economic dynamism.',
        explanation: 'Sau cụm giới từ "Far from", động từ bắt buộc phải ở dạng V-ing: "Far from being...".'
      },
      {
        incorrect: 'Rather than to invest in obsolete fossil fuels, governments should transition to solar power.',
        correct: 'Rather than investing in obsolete fossil fuels, governments should accelerate the transition to solar energy.',
        explanation: 'Sau "Rather than" đứng đầu câu, dùng danh động từ "investing" (hoặc động từ nguyên mẫu không to "invest"), không dùng "to invest".'
      }
    ],
    examples: [
      {
        en: 'Far from being a fiscal burden, targeted investments in renewable infrastructure generate substantial long-term economic dividends.',
        vi: 'Xa rời khỏi việc trở thành một gánh nặng tài chính, các khoản đầu tư có mục tiêu vào cơ sở hạ tầng tái tạo tạo ra những lợi tức kinh tế lâu dài to lớn.',
        analysis: 'Cấu trúc "Far from being a fiscal burden, S + V..." là mẫu câu tương phản kinh điển thường thấy ở các bài luận Band 9.0.'
      }
    ],
    examinerTip: 'Cấu trúc này cực kỳ thích hợp để mở đầu đoạn Thân bài phản biện (Counter-argument paragraph) trong Writing Task 2.'
  }
];

// ================= GAME "GHÉP CÂU HỌC THUẬT (SENTENCE SCRAMBLE)" =================
const IELTS_SCRAMBLE_CHALLENGES = [
  {
    id: 'scramble-01',
    vietnamesePrompt: 'Không những năng lượng tái tạo giúp cắt giảm khí thải nhà kính, mà nó còn tạo ra hàng triệu việc làm bền vững.',
    scrambledTokens: [
      'Not only',
      'does',
      'renewable energy',
      'curb',
      'greenhouse gas emissions,',
      'but',
      'it also',
      'generates',
      'millions of',
      'sustainable jobs.'
    ],
    correctOrder: [
      'Not only',
      'does',
      'renewable energy',
      'curb',
      'greenhouse gas emissions,',
      'but',
      'it also',
      'generates',
      'millions of',
      'sustainable jobs.'
    ],
    targetBand: 'Band 7.5+',
    grammarPoint: 'Đảo Ngữ Phủ Định (Negative Inversion: Not only does + S + V)',
    explanation: 'Cấu trúc đảo ngữ: "Not only" đứng đầu câu đòi hỏi trợ động từ "does" đảo lên trước chủ ngữ "renewable energy", động từ chính trở về nguyên mẫu "curb". Vế thứ hai cân xứng với "but it also generates...".',
    vocabularyHighlights: [
      { word: 'curb', type: 'verb', meaning: 'kiểm soát, kìm hãm (thay thế cho cut down on / reduce)' },
      { word: 'sustainable jobs', type: 'collocation', meaning: 'việc làm bền vững' }
    ],
    taskContext: 'Writing Task 2 (Environment & Economy)'
  },

  {
    id: 'scramble-02',
    vietnamesePrompt: 'Sự suy giảm nhanh chóng của các khu rừng nhiệt đới đã dẫn đến sự mất mát môi trường sống nghiêm trọng cho vô số loài động vật.',
    scrambledTokens: [
      'The rapid depletion',
      'of tropical rainforests',
      'has precipitated',
      'catastrophic habitat loss',
      'for innumerable',
      'wildlife species.'
    ],
    correctOrder: [
      'The rapid depletion',
      'of tropical rainforests',
      'has precipitated',
      'catastrophic habitat loss',
      'for innumerable',
      'wildlife species.'
    ],
    targetBand: 'Band 8.0+',
    grammarPoint: 'Hiện Tượng Danh Từ Hóa (Nominalisation: The rapid depletion of...)',
    explanation: 'Chuyển hóa từ câu văn nói "Tropical rainforests are depleting rapidly so animals lose their habitats" thành cấu trúc danh từ hóa cô đọng "The rapid depletion... has precipitated catastrophic habitat loss".',
    vocabularyHighlights: [
      { word: 'depletion', type: 'noun', meaning: 'sự cạn kiệt, suy giảm' },
      { word: 'precipitated', type: 'verb', meaning: 'châm ngòi, dẫn tới hậu quả nhanh chóng' },
      { word: 'innumerable', type: 'adj', meaning: 'vô số, không đếm xuể (C2)' }
    ],
    taskContext: 'Writing Task 2 (Biodiversity & Climate)'
  },

  {
    id: 'scramble-03',
    vietnamesePrompt: 'Được xây dựng vào đầu thế kỷ 20, cơ sở hạ tầng giao thông này hiện không thể đáp ứng nhu cầu đi lại ngày càng tăng.',
    scrambledTokens: [
      'Constructed',
      'in the early 20th century,',
      'this transport infrastructure',
      'is currently incapable of',
      'accommodating',
      'the burgeoning commute demand.'
    ],
    correctOrder: [
      'Constructed',
      'in the early 20th century,',
      'this transport infrastructure',
      'is currently incapable of',
      'accommodating',
      'the burgeoning commute demand.'
    ],
    targetBand: 'Band 7.5+',
    grammarPoint: 'Mệnh Đề Phân Từ Quá Khứ (Past Participle Clause: Constructed in...)',
    explanation: 'Mệnh đề phân từ rút gọn dạng bị động "Constructed in..." bổ nghĩa trực tiếp cho chủ ngữ chính "this transport infrastructure", thay thế cho liên từ dài "Because it was constructed...".',
    vocabularyHighlights: [
      { word: 'incapable of accommodating', type: 'collocation', meaning: 'không thể dung nạp/đáp ứng' },
      { word: 'burgeoning', type: 'adj', meaning: 'đang tăng trưởng/bùng nổ nhanh chóng' }
    ],
    taskContext: 'Writing Task 2 (Urban Infrastructure)'
  },

  {
    id: 'scramble-04',
    vietnamesePrompt: 'Chính sự can thiệp kịp thời của chính phủ mới là nhân tố quyết định trong việc giảm thiểu ô nhiễm không khí tại các đô thị.',
    scrambledTokens: [
      'It is',
      'timely governmental intervention',
      'that plays',
      'a decisive role',
      'in mitigating',
      'urban air pollution.'
    ],
    correctOrder: [
      'It is',
      'timely governmental intervention',
      'that plays',
      'a decisive role',
      'in mitigating',
      'urban air pollution.'
    ],
    targetBand: 'Band 7.5+',
    grammarPoint: 'Câu Chẻ Nhấn Mạnh (Cleft Sentence: It is... that...)',
    explanation: 'Cấu trúc câu chẻ "It is [Yếu tố nhấn mạnh] that [Hành động]" giúp làm nổi bật vai trò không thể thay thế của chính phủ ("timely governmental intervention"). Giới từ "in" đi với danh động từ "mitigating".',
    vocabularyHighlights: [
      { word: 'timely intervention', type: 'collocation', meaning: 'sự can thiệp kịp thời' },
      { word: 'mitigating', type: 'verb', meaning: 'giảm nhẹ, xoa dịu' }
    ],
    taskContext: 'Writing Task 2 (Government Responsibilities)'
  },

  {
    id: 'scramble-05',
    vietnamesePrompt: 'Tỷ lệ dân số già càng gia tăng, thì áp lực tài chính đè nặng lên hệ thống y tế quốc gia càng trở nên trầm trọng.',
    scrambledTokens: [
      'The more',
      'the elderly population expands,',
      'the heavier',
      'the fiscal burden',
      'on the national healthcare system',
      'becomes.'
    ],
    correctOrder: [
      'The more',
      'the elderly population expands,',
      'the heavier',
      'the fiscal burden',
      'on the national healthcare system',
      'becomes.'
    ],
    targetBand: 'Band 7.5+',
    grammarPoint: 'So Sánh Kép (Double Comparative: The more..., the heavier...)',
    explanation: 'Cấu trúc so sánh kép diễn tả sự tương quan thuận: "The more + S + V, the heavier + S + becomes". Cả hai vế đều có đầy đủ chủ ngữ và động từ vị ngữ cân đối.',
    vocabularyHighlights: [
      { word: 'fiscal burden', type: 'collocation', meaning: 'gánh nặng tài khóa / ngân sách' },
      { word: 'elderly population', type: 'noun phrase', meaning: 'dân số cao tuổi' }
    ],
    taskContext: 'Writing Task 2 (Demographic Shift)'
  },

  {
    id: 'scramble-06',
    vietnamesePrompt: 'Nếu các nhà chức trách thực thi các quy định nghiêm ngặt hơn, thì mức độ vi phạm bản quyền trên không gian mạng sẽ giảm đáng kể.',
    scrambledTokens: [
      'Were authorities to enforce',
      'more stringent regulations,',
      'the incidence of',
      'online copyright infringement',
      'would decrease',
      'substantially.'
    ],
    correctOrder: [
      'Were authorities to enforce',
      'more stringent regulations,',
      'the incidence of',
      'online copyright infringement',
      'would decrease',
      'substantially.'
    ],
    targetBand: 'Band 8.0+',
    grammarPoint: 'Đảo Ngữ Điều Kiện Loại 2 (Conditionals Inversion: Were S to-V...)',
    explanation: 'Thay vì dùng "If authorities enforced...", câu đảo ngữ "Were authorities to enforce..." nâng tầm học thuật vượt trội. Mệnh đề chính dùng "would decrease substantially".',
    vocabularyHighlights: [
      { word: 'stringent regulations', type: 'collocation', meaning: 'các quy định nghiêm ngặt' },
      { word: 'copyright infringement', type: 'collocation', meaning: 'hành vi vi phạm bản quyền' }
    ],
    taskContext: 'Writing Task 2 (Intellectual Property & Internet)'
  },

  {
    id: 'scramble-07',
    vietnamesePrompt: 'Sau khi được thu hoạch từ các đồn điền, hạt cà phê được phân loại tỉ mỉ trước khi trải qua công đoạn rang xay.',
    scrambledTokens: [
      'After being harvested',
      'from plantations,',
      'the coffee beans',
      'are meticulously sorted',
      'prior to undergoing',
      'the roasting stage.'
    ],
    correctOrder: [
      'After being harvested',
      'from plantations,',
      'the coffee beans',
      'are meticulously sorted',
      'prior to undergoing',
      'the roasting stage.'
    ],
    targetBand: 'Band 7.0+',
    grammarPoint: 'Thể Bị Động & Giới Từ Trong Quy Trình Task 1 (Passive Process)',
    explanation: 'Sử dụng bị động dạng rút gọn với giới từ "After being harvested" và bị động chính "are meticulously sorted". Cụm "prior to undergoing" thay thế cho "before they undergo".',
    vocabularyHighlights: [
      { word: 'meticulously sorted', type: 'collocation', meaning: 'được phân loại tỉ mỉ/kỹ lưỡng' },
      { word: 'prior to undergoing', type: 'prepositional phrase', meaning: 'trước khi trải qua' }
    ],
    taskContext: 'Writing Task 1 (Process Diagram)'
  },

  {
    id: 'scramble-08',
    vietnamesePrompt: 'Môi trường học tập hòa nhập là nền tảng mà dựa vào đó học sinh có thể phát triển toàn diện cả tư duy lẫn nhân cách.',
    scrambledTokens: [
      'An inclusive educational environment',
      'serves as the bedrock',
      'upon which',
      'students can holistically cultivate',
      'both critical intellect',
      'and moral character.'
    ],
    correctOrder: [
      'An inclusive educational environment',
      'serves as the bedrock',
      'upon which',
      'students can holistically cultivate',
      'both critical intellect',
      'and moral character.'
    ],
    targetBand: 'Band 8.0+',
    grammarPoint: 'Đại Từ Quan Hệ Đi Kèm Giới Từ (upon which) & Tính Song Song (both... and...)',
    explanation: 'Giới từ "upon" được đặt trước đại từ quan hệ "which" thay vì để lơ lửng ở đuôi câu. Cụm cân đối "both critical intellect and moral character" áp dụng cấu trúc song song.',
    vocabularyHighlights: [
      { word: 'bedrock', type: 'noun', meaning: 'nền tảng cốt lõi vững chắc' },
      { word: 'holistically cultivate', type: 'collocation', meaning: 'bồi dưỡng một cách toàn diện' }
    ],
    taskContext: 'Writing Task 2 & Speaking Part 3 (Education)'
  },

  {
    id: 'scramble-09',
    vietnamesePrompt: 'Điều cấp thiết là bộ giáo dục phải tích hợp kỹ năng số vào chương trình giảng dạy phổ thông một cách đồng bộ.',
    scrambledTokens: [
      'It is imperative',
      'that the education ministry',
      'integrate',
      'digital literacy',
      'into the core curriculum',
      'in a systematic manner.'
    ],
    correctOrder: [
      'It is imperative',
      'that the education ministry',
      'integrate',
      'digital literacy',
      'into the core curriculum',
      'in a systematic manner.'
    ],
    targetBand: 'Band 8.0+',
    grammarPoint: 'Thức Giả Định (Subjunctive Mood: It is imperative that S + V bare)',
    explanation: 'Sau "It is imperative that", động từ "integrate" bắt buộc giữ nguyên thể không chia (không thêm đuôi -s), dù chủ ngữ là "the education ministry".',
    vocabularyHighlights: [
      { word: 'imperative', type: 'adj', meaning: 'tối quan trọng, có tính bắt buộc' },
      { word: 'digital literacy', type: 'noun phrase', meaning: 'năng lực/kỹ năng kỹ thuật số' }
    ],
    taskContext: 'Writing Task 2 (Policy Recommendations)'
  },

  {
    id: 'scramble-10',
    vietnamesePrompt: 'Mặc dù mang lại nhiều lợi ích kinh tế ngắn hạn, việc khai thác tài nguyên quá mức sẽ để lại hậu quả sinh thái khôn lường.',
    scrambledTokens: [
      'Notwithstanding',
      'its immediate economic gains,',
      'the excessive exploitation',
      'of natural resources',
      'will inevitably trigger',
      'grave ecological repercussions.'
    ],
    correctOrder: [
      'Notwithstanding',
      'its immediate economic gains,',
      'the excessive exploitation',
      'of natural resources',
      'will inevitably trigger',
      'grave ecological repercussions.'
    ],
    targetBand: 'Band 8.5+',
    grammarPoint: 'Mệnh Đề Nhượng Bộ Học Thuật Cấp Cao (Notwithstanding + Noun Phrase)',
    explanation: '"Notwithstanding" là liên từ/giới từ nhượng bộ trang trọng đỉnh cao trong các văn bản học thuật quốc tế. Vế chính sử dụng động từ trạng từ mạnh "will inevitably trigger".',
    vocabularyHighlights: [
      { word: 'excessive exploitation', type: 'collocation', meaning: 'việc khai thác quá mức' },
      { word: 'grave ecological repercussions', type: 'collocation', meaning: 'những hệ lụy sinh thái nghiêm trọng' }
    ],
    taskContext: 'Writing Task 2 (Environment vs Economic Development)'
  },

  {
    id: 'scramble-11',
    vietnamesePrompt: 'Dưới bất kỳ hoàn cảnh nào, các dữ liệu cá nhân nhạy cảm của người dùng cũng không được phép chia sẻ cho bên thứ ba.',
    scrambledTokens: [
      'Under no circumstances',
      'should',
      'sensitive personal data',
      'be disclosed',
      'to unauthorized third parties',
      'without explicit consent.'
    ],
    correctOrder: [
      'Under no circumstances',
      'should',
      'sensitive personal data',
      'be disclosed',
      'to unauthorized third parties',
      'without explicit consent.'
    ],
    targetBand: 'Band 8.0+',
    grammarPoint: 'Đảo Ngữ Phủ Định Tuyệt Đối (Under no circumstances should S + be V3)',
    explanation: '"Under no circumstances" đứng đầu câu đảo trợ động từ "should" lên trước chủ ngữ "sensitive personal data". Động từ chính chia ở thể bị động "be disclosed".',
    vocabularyHighlights: [
      { word: 'disclosed', type: 'verb', meaning: 'tiết lộ, phát tán' },
      { word: 'explicit consent', type: 'collocation', meaning: 'sự chấp thuận rõ ràng bằng văn bản' }
    ],
    taskContext: 'Writing Task 2 (Data Privacy & Technology)'
  },

  {
    id: 'scramble-12',
    vietnamesePrompt: 'Tiếng ồn môi trường mức độ cao không chỉ gây mất tập trung cho nhân viên mà còn làm giảm đáng kể hiệu suất lao động.',
    scrambledTokens: [
      'Elevated ambient noise levels',
      'not only prove',
      'highly distracting to employees,',
      'but they also',
      'compromise',
      'overall workplace productivity',
      'substantially.'
    ],
    correctOrder: [
      'Elevated ambient noise levels',
      'not only prove',
      'highly distracting to employees,',
      'but they also',
      'compromise',
      'overall workplace productivity',
      'substantially.'
    ],
    targetBand: 'Band 7.5+',
    grammarPoint: 'Tránh Lỗi "Big Noise" & "Distractive" (Academic Precision)',
    explanation: 'Thay vì dùng lỗi dịch thô "big noise" và "distractive", câu sử dụng "Elevated ambient noise levels" và tính từ chuẩn "highly distracting". Động từ "compromise" mang nghĩa làm tổn hại.',
    vocabularyHighlights: [
      { word: 'ambient noise', type: 'collocation', meaning: 'tiếng ồn môi trường xung quanh (thay vì big noise)' },
      { word: 'distracting', type: 'adj', meaning: 'gây phân tâm (thay vì từ sai distractive)' },
      { word: 'compromise', type: 'verb', meaning: 'làm suy giảm, tổn hại' }
    ],
    taskContext: 'Writing Task 2 (Workplace Ergonomics)'
  },

  {
    id: 'scramble-13',
    vietnamesePrompt: 'Nếu chính phủ đã đầu tư sớm hơn vào hệ thống tàu điện ngầm, thì cuộc khủng hoảng tắc nghẽn giao thông hiện nay đã có thể được ngăn chặn.',
    scrambledTokens: [
      'Had the government invested',
      'in high-speed subway networks',
      'earlier,',
      'the contemporary traffic gridlock',
      'could have been',
      'averted successfully.'
    ],
    correctOrder: [
      'Had the government invested',
      'in high-speed subway networks',
      'earlier,',
      'the contemporary traffic gridlock',
      'could have been',
      'averted successfully.'
    ],
    targetBand: 'Band 8.0+',
    grammarPoint: 'Đảo Ngữ Điều Kiện Loại 3 (Conditionals Inversion: Had S + V3...)',
    explanation: 'Đảo ngữ loại 3 giả định điều trái ngược trong quá khứ: "Had the government invested...". Mệnh đề kết quả dùng thể bị động hoàn thành "could have been averted".',
    vocabularyHighlights: [
      { word: 'contemporary traffic gridlock', type: 'collocation', meaning: 'tình trạng ùn tắc giao thông nghiêm trọng thời hiện đại' },
      { word: 'averted', type: 'verb', meaning: 'ngăn chặn, đẩy lùi (nguy cơ)' }
    ],
    taskContext: 'Writing Task 2 (Urban Mobility)'
  },

  {
    id: 'scramble-14',
    vietnamesePrompt: 'Xa rời khỏi việc trở thành một gánh nặng tài chính, các khoản đầu tư vào cơ sở hạ tầng tái tạo tạo ra những lợi tức kinh tế lâu dài to lớn.',
    scrambledTokens: [
      'Far from being',
      'a fiscal liability,',
      'targeted investments',
      'in renewable infrastructure',
      'yield substantial',
      'long-term economic dividends.'
    ],
    correctOrder: [
      'Far from being',
      'a fiscal liability,',
      'targeted investments',
      'in renewable infrastructure',
      'yield substantial',
      'long-term economic dividends.'
    ],
    targetBand: 'Band 8.5+',
    grammarPoint: 'Mệnh Đề Tương Phản Đối Lập (Far from being a fiscal liability...)',
    explanation: '"Far from being..." bác bỏ trực tiếp một quan niệm sai lầm phổ biến và khẳng định thực tế tích cực ở vế sau. Động từ "yield" đi với cụm tân ngữ "economic dividends".',
    vocabularyHighlights: [
      { word: 'fiscal liability', type: 'collocation', meaning: 'gánh nặng/trách nhiệm tài chính (thay thế cho burden)' },
      { word: 'yield economic dividends', type: 'collocation', meaning: 'mang lại những lợi tức/hoa trái kinh tế' }
    ],
    taskContext: 'Writing Task 2 (Counter-argument & Refutation)'
  },

  {
    id: 'scramble-15',
    vietnamesePrompt: 'Lượng khí thải công nghiệp đã gia tăng đột biến, dẫn đến sự suy giảm nghiêm trọng chất lượng không khí đô thị.',
    scrambledTokens: [
      'Industrial emissions',
      'have escalated exponentially,',
      'thereby precipitating',
      'a drastic deterioration',
      'in urban atmospheric quality.'
    ],
    correctOrder: [
      'Industrial emissions',
      'have escalated exponentially,',
      'thereby precipitating',
      'a drastic deterioration',
      'in urban atmospheric quality.'
    ],
    targetBand: 'Band 8.0+',
    grammarPoint: 'Mệnh Đề Phân Từ Chỉ Hệ Quả (Resulting Participle Clause: thereby precipitating...)',
    explanation: 'Cụm trạng từ liên kết "thereby" đi kèm phân từ hiện tại "precipitating" giúp nối kết quả trực tiếp của hành động trước đó mà không cần tách thành 2 câu đơn vụn vặt.',
    vocabularyHighlights: [
      { word: 'escalated exponentially', type: 'collocation', meaning: 'tăng đột biến theo cấp số nhân' },
      { word: 'drastic deterioration', type: 'collocation', meaning: 'sự xuống cấp / suy giảm trầm trọng' }
    ],
    taskContext: 'Writing Task 1 & Task 2 (Pollution & Trends)'
  }
];

if (typeof window !== 'undefined') {
  window.IELTS_GRAMMAR_TOPICS = IELTS_GRAMMAR_TOPICS;
  window.IELTS_SCRAMBLE_CHALLENGES = IELTS_SCRAMBLE_CHALLENGES;
}
