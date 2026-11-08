/**
 * IELTS GO! - IELTS Academic Vocabulary & Collocations Database
 * Phân loại theo 20 Chủ đề IELTS và phân tầng theo 3 mốc Band: 4.5-6.0, 6.0-7.5, 7.5+
 * Mỗi mục từ gồm: Phiên âm UK/US, dấu nhấn trọng âm, từ loại, nghĩa, từ đồng nghĩa, câu ví dụ chuẩn Cambridge và hình SVG minh họa
 */

const IELTS_20_TOPICS_METADATA = [
  { id: 'animals', name: 'Animals & Wildlife', viName: 'Động vật & Thế giới hoang dã', icon: '🐾', color: '#10B981' },
  { id: 'art', name: 'Art & Aesthetics', viName: 'Nghệ thuật & Hội họa', icon: '🎨', color: '#EC4899' },
  { id: 'celebrations', name: 'Celebrations & Festivals', viName: 'Lễ hội & Sự kiện', icon: '🎉', color: '#F59E0B' },
  { id: 'clothes', name: 'Clothes & Fashion', viName: 'Trang phục & Thời trang', icon: '👗', color: '#8B5CF6' },
  { id: 'environment', name: 'Environment & Climate', viName: 'Môi trường & Biến đổi khí hậu', icon: '🌍', color: '#059669' },
  { id: 'famous_people', name: 'Famous People & Role Models', viName: 'Người nổi tiếng & Hình mẫu', icon: '🌟', color: '#D97706' },
  { id: 'food', name: 'Food & Nutrition', viName: 'Ẩm thực & Dinh dưỡng', icon: '🍲', color: '#EA580C' },
  { id: 'friends', name: 'Friends & Relationships', viName: 'Bạn bè & Mối quan hệ', icon: '🤝', color: '#3B82F6' },
  { id: 'holidays', name: 'Holidays & Tourism', viName: 'Kỳ nghỉ & Du lịch', icon: '🏖️', color: '#06B6D4' },
  { id: 'music', name: 'Music & Performing Arts', viName: 'Âm nhạc & Nghệ thuật biểu diễn', icon: '🎵', color: '#6366F1' },
  { id: 'nation_culture', name: 'Nation & Culture', viName: 'Quốc gia & Bản sắc văn hóa', icon: '🏛️', color: '#B45309' },
  { id: 'routines', name: 'Routines & Daily Life', viName: 'Thói quen & Lối sống hàng ngày', icon: '⏰', color: '#64748B' },
  { id: 'science', name: 'Science & Research', viName: 'Khoa học & Nghiên cứu học thuật', icon: '🔬', color: '#2563EB' },
  { id: 'shopping', name: 'Shopping & Consumerism', viName: 'Mua sắm & Tiêu dùng', icon: '🛍️', color: '#DB2777' },
  { id: 'social_media', name: 'Social Media & Networking', viName: 'Mạng xã hội & Truyền thông số', icon: '📱', color: '#4F46E5' },
  { id: 'sport', name: 'Sport & Physical Fitness', viName: 'Thể thao & Rèn luyện thể chất', icon: '⚽', color: '#16A34A' },
  { id: 'technology', name: 'Technology & Artificial Intelligence', viName: 'Công nghệ & Trí tuệ nhân tạo', icon: '💻', color: '#0284C7' },
  { id: 'transport', name: 'Transport & Urban Mobility', viName: 'Giao thông & Đô thị', icon: '🚆', color: '#0891B2' },
  { id: 'weather', name: 'Weather & Extreme Climate', viName: 'Thời tiết & Hiện tượng khí hậu', icon: '⛅', color: '#0284C7' },
  { id: 'study', name: 'Study & Higher Education', viName: 'Học tập & Giáo dục đại học', icon: '📚', color: '#7C3AED' }
];

const IELTS_VOCABULARY_DATABASE = [
  // ================= 1. ANIMALS & WILDLIFE =================
  {
    id: 'anim-01',
    word: 'natural habitat',
    partOfSpeech: 'collocation',
    topicId: 'animals',
    topicName: 'Animals & Wildlife',
    topicIcon: '🐾',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌnætʃ.ər.əl ˈhæb.ɪ.tæt/',
    ipaUs: '/ˌnætʃ.ɚ.əl ˈhæb.ə.tæt/',
    stress: 'Âm 1 cho cả hai từ: NAT-u-ral HAB-i-tat',
    definitionVi: 'Môi trường sống tự nhiên của sinh vật',
    definitionEn: 'The natural environment in which a particular species of animal or plant normally lives.',
    synonyms: ['native territory', 'wild ecosystem', 'natural surroundings'],
    collocations: ['destroy natural habitat', 'in its natural habitat', 'preserve natural habitat'],
    exampleEn: 'Urbanization has encroached upon the natural habitat of many rare species, pushing them towards extinction.',
    exampleVi: 'Sự đô thị hóa đã xâm lấn môi trường sống tự nhiên của nhiều loài quý hiếm, đẩy chúng tới bờ vực tuyệt chủng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFDF5"/><path d="M50 20 C35 35 25 50 30 70 C35 85 65 85 70 70 C75 50 65 35 50 20 Z" fill="#10B981"/><path d="M50 30 L50 75" stroke="#047857" stroke-width="3" stroke-linecap="round"/><circle cx="38" cy="48" r="4" fill="#34D399"/><circle cx="62" cy="52" r="5" fill="#34D399"/></svg>`
  },
  {
    id: 'anim-02',
    word: 'biodiversity',
    partOfSpeech: 'noun',
    topicId: 'animals',
    topicName: 'Animals & Wildlife',
    topicIcon: '🐾',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/',
    ipaUs: '/ˌbaɪ.oʊ.dɪˈvɝː.sə.t̬i/',
    stress: 'Trọng âm chính âm tiết 4: bi-o-di-VER-si-ty',
    definitionVi: 'Sự đa dạng sinh học',
    definitionEn: 'The variety of plant and animal life in the world or in a particular ecosystem.',
    synonyms: ['biological diversity', 'ecological variety', 'flora and fauna'],
    collocations: ['rich biodiversity', 'loss of biodiversity', 'marine biodiversity'],
    exampleEn: 'Deforestation in the Amazon poses a catastrophic threat to global biodiversity.',
    exampleVi: 'Việc phá rừng ở Amazon tạo ra mối đe dọa thảm khốc đối với sự đa dạng sinh học toàn cầu.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFDF5"/><path d="M30 65 Q50 30 70 65" stroke="#059669" stroke-width="4" fill="none"/><circle cx="35" cy="55" r="8" fill="#10B981"/><circle cx="65" cy="55" r="8" fill="#34D399"/><circle cx="50" cy="40" r="10" fill="#047857"/></svg>`
  },
  {
    id: 'anim-03',
    word: 'poaching and trafficking',
    partOfSpeech: 'collocation',
    topicId: 'animals',
    topicName: 'Animals & Wildlife',
    topicIcon: '🐾',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˈpəʊ.tʃɪŋ ænd ˈtræf.ɪ.kɪŋ/',
    ipaUs: '/ˈpoʊ.tʃɪŋ ænd ˈtræf.ɪ.kɪŋ/',
    stress: 'Âm 1: POACH-ing & TRAFF-ick-ing',
    definitionVi: 'Hành vi săn trộm và buôn lậu động vật hoang dã',
    definitionEn: 'The illegal hunting, capturing, and trade of wild animals and animal products.',
    synonyms: ['illicit wildlife trade', 'illegal game hunting', 'black market smuggling'],
    collocations: ['combat poaching and trafficking', 'rampant poaching', 'wildlife trafficking network'],
    exampleEn: 'International enforcement agencies must cooperate rigorously to dismantle illicit networks engaging in wildlife poaching and trafficking.',
    exampleVi: 'Các cơ quan thực thi pháp luật quốc tế phải phối hợp chặt chẽ để triệt phá các đường dây săn trộm và buôn lậu động vật hoang dã bất hợp pháp.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF2F2"/><path d="M30 40 L50 25 L70 40 L70 68 C70 75 50 85 50 85 C50 85 30 75 30 68 Z" fill="#EF4444"/><path d="M50 40 L50 62" stroke="#FFF" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="70" r="2.5" fill="#FFF"/></svg>`
  },

  // ================= 2. ART & AESTHETICS =================
  {
    id: 'art-01',
    word: 'exhibition',
    partOfSpeech: 'noun',
    topicId: 'art',
    topicName: 'Art & Aesthetics',
    topicIcon: '🎨',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌek.sɪˈbɪʃ.ən/',
    ipaUs: '/ˌek.səˈbɪʃ.ən/',
    stress: 'Trọng âm âm tiết 3: ex-hi-BI-tion',
    definitionVi: 'Buổi triển lãm / Cuộc trưng bày tác phẩm nghệ thuật',
    definitionEn: 'A public display of works of art, industrial products, or items of interest.',
    synonyms: ['art display', 'showcase', 'exposition', 'gallery display'],
    collocations: ['art exhibition', 'hold an exhibition', 'attend an exhibition'],
    exampleEn: 'The contemporary art exhibition attracted thousands of domestic and foreign visitors over the weekend.',
    exampleVi: 'Buổi triển lãm nghệ thuật đương đại đã thu hút hàng nghìn khách tham quan trong và ngoài nước vào dịp cuối tuần.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FDF2F8"/><rect x="25" y="30" width="50" height="40" rx="4" fill="none" stroke="#DB2777" stroke-width="4"/><circle cx="40" cy="45" r="5" fill="#F472B6"/><path d="M30 65 L45 50 L58 60 L68 48 L70 65 Z" fill="#EC4899"/></svg>`
  },
  {
    id: 'art-02',
    word: 'aesthetic appreciation',
    partOfSpeech: 'collocation',
    topicId: 'art',
    topicName: 'Art & Aesthetics',
    topicIcon: '🎨',
    band: '6.0 - 7.5',
    level: 'C1',
    ipaUk: '/esˈθet.ɪk əˌpriː.ʃiˈeɪ.ʃən/',
    ipaUs: '/esˈθet̬.ɪk əˌpriː.ʃiˈeɪ.ʃən/',
    stress: 'aes-THET-ic / ap-pre-ci-A-tion',
    definitionVi: 'Khả năng cảm thụ và đánh giá cái đẹp nghệ thuật',
    definitionEn: 'The capacity to perceive, enjoy, and evaluate artistic beauty and style.',
    synonyms: ['artistic sensibility', 'cultural discernment', 'sense of beauty'],
    collocations: ['foster aesthetic appreciation', 'cultivate aesthetic appreciation', 'refined aesthetic appreciation'],
    exampleEn: 'Introducing children to classical paintings fosters their aesthetic appreciation and fuels creative thinking.',
    exampleVi: 'Cho trẻ em tiếp xúc với các bức họa cổ điển giúp nuôi dưỡng khả năng cảm thụ cái đẹp và kích thích tư duy sáng tạo.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FDF2F8"/><path d="M35 35 C35 25 65 25 65 35 C65 50 50 65 50 75" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="82" r="3" fill="#DB2777"/><circle cx="42" cy="38" r="4" fill="#F43F5E"/><circle cx="58" cy="38" r="4" fill="#8B5CF6"/></svg>`
  },
  {
    id: 'art-03',
    word: 'avant-garde',
    partOfSpeech: 'adjective',
    topicId: 'art',
    topicName: 'Art & Aesthetics',
    topicIcon: '🎨',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌæv.ɑ̃ːˈɡɑːd/',
    ipaUs: '/ˌæv.ɑːntˈɡɑːrd/',
    stress: 'Trọng âm âm tiết 2: a-vant-GARDE',
    definitionVi: 'Tiên phong, mang tính cách tân đột phá (nghệ thuật)',
    definitionEn: 'Favouring or introducing new, unusual, and experimental ideas and methods in art or literature.',
    synonyms: ['groundbreaking', 'innovative', 'experimental', 'trailblazing'],
    collocations: ['avant-garde movement', 'avant-garde architecture', 'avant-garde style'],
    exampleEn: 'Her avant-garde sculpture fundamentally challenged the conventional paradigms of modern aesthetic theory.',
    exampleVi: 'Tác phẩm điêu khắc tiên phong của cô ấy đã thách thức một cách căn bản những chuẩn mực truyền thống của lý thuyết thẩm mỹ hiện đại.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FFF1F2"/><polygon points="50,18 62,40 85,42 68,58 73,82 50,68 27,82 32,58 15,42 38,40" fill="#E11D48"/><circle cx="50" cy="50" r="8" fill="#FFF"/></svg>`
  },

  // ================= 3. CELEBRATIONS & FESTIVALS =================
  {
    id: 'cel-01',
    word: 'festive atmosphere',
    partOfSpeech: 'collocation',
    topicId: 'celebrations',
    topicName: 'Celebrations & Festivals',
    topicIcon: '🎉',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈfes.tɪv ˈæt.məs.fɪər/',
    ipaUs: '/ˈfes.tɪv ˈæt.məs.fɪr/',
    stress: 'Âm 1: FES-tive AT-mos-phere',
    definitionVi: 'Không khí lễ hội rộn ràng, vui tươi',
    definitionEn: 'A joyful and celebratory mood or environment typical of a holiday or carnival.',
    synonyms: ['jubilant mood', 'celebratory mood', 'vibrant spirit'],
    collocations: ['soak up the festive atmosphere', 'create a festive atmosphere', 'bustling festive atmosphere'],
    exampleEn: 'During the Lunar New Year, the entire city is adorned with red lanterns, creating an exhilarating festive atmosphere.',
    exampleVi: 'Suốt dịp Tết Nguyên Đán, cả thành phố được trang hoàng lồng đèn đỏ, tạo nên bầu không khí lễ hội rộn ràng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FFFBEB"/><path d="M30 70 L50 25 L70 70 Z" fill="#F59E0B"/><circle cx="50" cy="20" r="5" fill="#EF4444"/><circle cx="35" cy="50" r="3" fill="#10B981"/><circle cx="65" cy="50" r="3" fill="#3B82F6"/><path d="M25 35 Q40 25 50 35" stroke="#F59E0B" stroke-width="2" fill="none"/></svg>`
  },
  {
    id: 'cel-02',
    word: 'commemorate',
    partOfSpeech: 'verb',
    topicId: 'celebrations',
    topicName: 'Celebrations & Festivals',
    topicIcon: '🎉',
    band: '6.0 - 7.5',
    level: 'C1',
    ipaUk: '/kəˈmem.ə.reɪt/',
    ipaUs: '/kəˈmem.ə.reɪt/',
    stress: 'Trọng âm âm tiết 2: com-MEM-o-rate',
    definitionVi: 'Kỷ niệm, tưởng nhớ (nhân vật, sự kiện lịch sử trọng đại)',
    definitionEn: 'To recall and show respect for someone or something in a ceremony.',
    synonyms: ['memorialize', 'pay tribute to', 'celebrate the anniversary of'],
    collocations: ['commemorate national heroes', 'commemorate historical milestones', 'ceremony to commemorate'],
    exampleEn: 'A grand monument was erected in the central square to commemorate those who sacrificed their lives for national liberation.',
    exampleVi: 'Một tượng đài uy nghi đã được dựng lên ở quảng trường trung tâm để tưởng nhớ những người đã hy sinh cho sự nghiệp giải phóng dân tộc.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF3C7"/><path d="M40 75 L60 75 L55 35 L45 35 Z" fill="#D97706"/><rect x="35" y="75" width="30" height="8" rx="2" fill="#B45309"/><circle cx="50" cy="25" r="6" fill="#F59E0B"/></svg>`
  },
  {
    id: 'cel-03',
    word: 'cultural tapestry',
    partOfSpeech: 'idiom / phrase',
    topicId: 'celebrations',
    topicName: 'Celebrations & Festivals',
    topicIcon: '🎉',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˈkʌl.tʃər.əl ˈtæp.ɪ.stri/',
    ipaUs: '/ˈkʌl.tʃɚ.əl ˈtæp.ə.stri/',
    stress: 'CUL-tur-al TAP-es-try',
    definitionVi: 'Bức tranh văn hóa muôn màu, phong phú đa dạng',
    definitionEn: 'An intricate, vibrant combination of diverse cultural traditions, rituals, and heritages.',
    synonyms: ['cultural mosaic', 'multicultural richness', 'rich heritage'],
    collocations: ['enrich the cultural tapestry', 'part of our cultural tapestry', 'weave into the cultural tapestry'],
    exampleEn: 'Traditional folklore rituals are interwoven seamlessly into the rich cultural tapestry of the nation.',
    exampleVi: 'Các nghi lễ dân gian truyền thống đan xen hài hòa vào bức tranh văn hóa đa dạng và giàu bản sắc của đất nước.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF3C7"/><path d="M25 30 H75 V70 H25 Z" fill="none" stroke="#D97706" stroke-width="3"/><path d="M35 30 V70 M50 30 V70 M65 30 V70" stroke="#F59E0B" stroke-width="2"/><path d="M25 42 H75 M25 58 H75" stroke="#F59E0B" stroke-width="2"/></svg>`
  },

  // ================= 4. CLOTHES & FASHION =================
  {
    id: 'clo-01',
    word: 'dress code',
    partOfSpeech: 'noun',
    topicId: 'clothes',
    topicName: 'Clothes & Fashion',
    topicIcon: '👗',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈdres ˌkəʊd/',
    ipaUs: '/ˈdres ˌkoʊd/',
    stress: 'DRESS code',
    definitionVi: 'Quy định về trang phục',
    definitionEn: 'A set of rules, often written, stating what kind of clothing is acceptable in a particular place.',
    synonyms: ['attire regulations', 'clothing policy', 'dress etiquette'],
    collocations: ['strict dress code', 'adhere to the dress code', 'casual dress code'],
    exampleEn: 'Most multinational corporations enforce a formal dress code to maintain corporate professionalism.',
    exampleVi: 'Phần lớn các tập đoàn đa quốc gia áp dụng quy định trang phục nghiêm ngặt nhằm duy trì phong thái chuyên nghiệp.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F5F3FF"/><path d="M35 30 L50 42 L65 30 L72 38 L65 72 L35 72 L28 38 Z" fill="#8B5CF6"/><polygon points="50,42 46,65 54,65" fill="#DDD6FE"/></svg>`
  },
  {
    id: 'clo-02',
    word: 'fast fashion epidemic',
    partOfSpeech: 'collocation',
    topicId: 'clothes',
    topicName: 'Clothes & Fashion',
    topicIcon: '👗',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/fɑːst ˈfæʃ.ən ˌep.ɪˈdem.ɪk/',
    ipaUs: '/fæst ˈfæʃ.ən ˌep.əˈdem.ɪk/',
    stress: 'FAST FASH-ion ep-i-DEM-ic',
    definitionVi: 'Vấn nạn thời trang ăn liền (sản xuất ồ ạt, mau lỗi thời)',
    definitionEn: 'The widespread proliferation of inexpensive clothing produced rapidly by mass-market retailers.',
    synonyms: ['disposable fashion trend', 'mass clothing overproduction'],
    collocations: ['combat fast fashion', 'environmental toll of fast fashion', 'victim of fast fashion'],
    exampleEn: 'The fast fashion epidemic has spurred excessive textile waste and worsened water pollution in developing nations.',
    exampleVi: 'Vấn nạn thời trang ăn liền đã kích động rác thải dệt may tràn lan và làm trầm trọng thêm ô nhiễm nguồn nước tại các quốc gia đang phát triển.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F5F3FF"/><path d="M40 30 C40 22 60 22 60 30 L75 42 L25 42 Z" fill="#7C3AED"/><path d="M28 42 L72 42 L66 75 L34 75 Z" fill="#A78BFA"/><path d="M45 52 L55 62 M55 52 L45 62" stroke="#FFF" stroke-width="3"/></svg>`
  },
  {
    id: 'clo-03',
    word: 'sartorial elegance',
    partOfSpeech: 'collocation',
    topicId: 'clothes',
    topicName: 'Clothes & Fashion',
    topicIcon: '👗',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/sɑːˈtɔː.ri.əl ˈel.ɪ.ɡəns/',
    ipaUs: '/sɑːrˈtɔːr.i.əl ˈel.ə.ɡəns/',
    stress: 'sar-TOR-i-al EL-e-gance',
    definitionVi: 'Phong thái ăn mặc thanh lịch, tinh tế và chuẩn mực',
    definitionEn: 'Exquisite, refined taste and superior quality in personal clothing and styling.',
    synonyms: ['impeccable attire', 'refined style', 'bespoke sophistication'],
    collocations: ['exude sartorial elegance', 'epitome of sartorial elegance', 'masterclass in sartorial elegance'],
    exampleEn: 'The British diplomat was widely acclaimed for his sartorial elegance and dignified demeanor at global summits.',
    exampleVi: 'Nhà ngoại giao người Anh được tán dương rộng rãi nhờ phong thái ăn mặc lịch lãm, tinh tế cùng cử chỉ trang trọng tại các hội nghị thượng đỉnh.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FAF5FF"/><path d="M35 25 L50 40 L65 25 L80 80 L50 72 L20 80 Z" fill="#6D28D9"/><polygon points="50,42 45,55 55,55" fill="#F59E0B"/><circle cx="50" cy="62" r="2" fill="#FFF"/></svg>`
  },

  // ================= 5. ENVIRONMENT & CLIMATE =================
  {
    id: 'env-01',
    word: 'greenhouse gas emissions',
    partOfSpeech: 'collocation',
    topicId: 'environment',
    topicName: 'Environment & Climate',
    topicIcon: '🌍',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈɡriːn.haʊs ɡæs ɪˈmɪʃ.ənz/',
    ipaUs: '/ˈɡriːn.haʊs ɡæs iˈmɪʃ.ənz/',
    stress: 'GREEN-house gas e-MIS-sions',
    definitionVi: 'Khí thải nhà kính gây hiệu ứng ấm lên toàn cầu',
    definitionEn: 'Gases that trap heat in the atmosphere, predominantly carbon dioxide and methane.',
    synonyms: ['carbon footprint', 'pollutant discharge', 'carbon emissions'],
    collocations: ['curb greenhouse gas emissions', 'slash greenhouse gas emissions', 'drastic reduction in emissions'],
    exampleEn: 'Governments worldwide must implement stringent carbon caps to curb greenhouse gas emissions by 2030.',
    exampleVi: 'Các chính phủ trên khắp thế giới phải ban hành hạn ngạch carbon khắt khe để cắt giảm lượng phát thải khí nhà kính trước năm 2030.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFDF5"/><path d="M50 20 A30 30 0 1 0 50 80 A30 30 0 1 0 50 20 Z" fill="#10B981"/><path d="M38 35 Q45 28 55 35 Q65 42 70 32" stroke="#FFF" stroke-width="3" fill="none"/></svg>`
  },
  {
    id: 'env-02',
    word: 'ecological footprint',
    partOfSpeech: 'collocation',
    topicId: 'environment',
    topicName: 'Environment & Climate',
    topicIcon: '🌍',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˌiː.kəˈlɒdʒ.ɪ.kəl ˈfʊt.prɪnt/',
    ipaUs: '/ˌiː.kəˈlɑː.dʒɪ.kəl ˈfʊt.prɪnt/',
    stress: 'e-co-LOG-i-cal FOOT-print',
    definitionVi: 'Dấu chân sinh thái (mức độ tiêu thụ tài nguyên thiên nhiên)',
    definitionEn: 'The impact of human activities measured in terms of the area of biologically productive land and water required.',
    synonyms: ['environmental toll', 'resource depletion index', 'carbon footprint'],
    collocations: ['minimize ecological footprint', 'calculate ecological footprint', 'heavy ecological footprint'],
    exampleEn: 'Transitioning to renewable energy sources significantly diminishes our collective ecological footprint on the planet.',
    exampleVi: 'Chuyển đổi sang các nguồn năng lượng tái tạo giúp giảm thiểu đáng kể dấu chân sinh thái chung của chúng ta trên hành tinh.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFDF5"/><ellipse cx="50" cy="55" rx="14" ry="20" fill="#059669"/><circle cx="42" cy="30" r="4" fill="#047857"/><circle cx="50" cy="27" r="4.5" fill="#047857"/><circle cx="58" cy="30" r="4" fill="#047857"/></svg>`
  },
  {
    id: 'env-03',
    word: 'irreversible degradation',
    partOfSpeech: 'collocation',
    topicId: 'environment',
    topicName: 'Environment & Climate',
    topicIcon: '🌍',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌɪr.ɪˈvɜː.sə.bəl ˌdeɡ.rəˈdeɪ.ʃən/',
    ipaUs: '/ˌɪr.əˈvɝː.sə.bəl ˌdeɡ.rəˈdeɪ.ʃən/',
    stress: 'ir-re-VER-si-ble deg-ra-DA-tion',
    definitionVi: 'Sự suy thoái môi trường không thể vãn hồi / đảo ngược',
    definitionEn: 'Deterioration of environmental ecosystems to a degree that cannot be repaired or restored.',
    synonyms: ['permanent ecological ruin', 'irremediable decay', 'unalterable destruction'],
    collocations: ['cause irreversible degradation', 'suffer irreversible degradation', 'verge of irreversible degradation'],
    exampleEn: 'Unmitigated industrial discharge into ocean waterways threatens to trigger irreversible environmental degradation.',
    exampleVi: 'Việc xả thải công nghiệp không qua xử lý ra các dòng biển có nguy cơ gây ra sự suy thoái môi trường không thể cứu vãn.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF2F2"/><path d="M50 20 L80 75 H20 Z" fill="#EF4444"/><rect x="47" y="42" width="6" height="18" rx="2" fill="#FFF"/><circle cx="50" cy="68" r="3.5" fill="#FFF"/></svg>`
  },

  // ================= 6. FAMOUS PEOPLE & ROLE MODELS =================
  {
    id: 'fam-01',
    word: 'role model',
    partOfSpeech: 'noun',
    topicId: 'famous_people',
    topicName: 'Famous People & Role Models',
    topicIcon: '🌟',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈrəʊl ˌmɒd.əl/',
    ipaUs: '/ˈroʊl ˌmɑː.dəl/',
    stress: 'ROLE mod-el',
    definitionVi: 'Tấm gương sáng, hình mẫu lý tưởng để noi theo',
    definitionEn: 'A person whose behavior, example, or success is emulated by others, especially by younger people.',
    synonyms: ['exemplar', 'paragon of virtue', 'mentor', 'guiding beacon'],
    collocations: ['positive role model', 'serve as a role model', 'aspire to be a role model'],
    exampleEn: 'Public figures have a moral obligation to serve as positive role models for the impressionable youth.',
    exampleVi: 'Những người của công chúng có nghĩa vụ đạo đức phải làm tấm gương tích cực cho thế hệ thanh thiếu niên dễ bị ảnh hưởng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FFFBEB"/><polygon points="50,18 61,38 84,41 67,57 71,80 50,69 29,80 33,57 16,41 39,38" fill="#F59E0B"/></svg>`
  },
  {
    id: 'fam-02',
    word: 'scrutiny of the media',
    partOfSpeech: 'collocation',
    topicId: 'famous_people',
    topicName: 'Famous People & Role Models',
    topicIcon: '🌟',
    band: '6.0 - 7.5',
    level: 'C1',
    ipaUk: '/ˈskruː.tɪ.ni əv ðə ˈmiː.di.ə/',
    ipaUs: '/ˈskruː.tən.i əv ðə ˈmiː.di.ə/',
    stress: 'SCRU-ti-ny / ME-di-a',
    definitionVi: 'Sự soi mói, theo dõi sát sao của giới truyền thông',
    definitionEn: 'Critical observation, continuous examination, or intense surveillance by journalists and tabloids.',
    synonyms: ['media spotlight', 'press inspection', 'public inquest'],
    collocations: ['under intense scrutiny', 'withstand intense media scrutiny', 'subject to intense scrutiny'],
    exampleEn: 'Living under the relentless scrutiny of the media often takes a grave psychological toll on prominent celebrities.',
    exampleVi: 'Sống dưới sự soi mói không ngừng của giới truyền thông thường gây tổn hại tâm lý nặng nề cho các ngôi sao nổi tiếng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF3C7"/><circle cx="45" cy="45" r="18" fill="none" stroke="#D97706" stroke-width="5"/><line x1="58" y1="58" x2="78" y2="78" stroke="#B45309" stroke-width="6" stroke-linecap="round"/><circle cx="45" cy="45" r="6" fill="#F59E0B"/></svg>`
  },
  {
    id: 'fam-03',
    word: 'philanthropic endeavors',
    partOfSpeech: 'collocation',
    topicId: 'famous_people',
    topicName: 'Famous People & Role Models',
    topicIcon: '🌟',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌfɪl.ənˈθrɒp.ɪk ɪnˈdev.əz/',
    ipaUs: '/ˌfɪl.ænˈθrɑː.pɪk enˈdev.ɚz/',
    stress: 'phil-an-THROP-ic en-DEV-ors',
    definitionVi: 'Những cống hiến thiện nguyện / hoạt động nhân đạo cao cả',
    definitionEn: 'Dedicated efforts to promote the welfare of others, especially by the generous donation of money or time.',
    synonyms: ['humanitarian undertakings', 'charitable deeds', 'benevolent initiatives'],
    collocations: ['engage in philanthropic endeavors', 'commit wealth to philanthropic endeavors', 'legacy of philanthropic endeavors'],
    exampleEn: 'Beyond his tech fortune, Bill Gates is renowned for his extensive philanthropic endeavors targeting infectious disease eradication.',
    exampleVi: 'Ngoài gia tài công nghệ đồ sộ, Bill Gates còn nổi danh nhờ những nỗ lực từ thiện sâu rộng hướng tới xóa bỏ các bệnh truyền nhiễm.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FFFBEB"/><path d="M50 72 C50 72 25 55 25 38 C25 28 35 20 45 28 C50 32 50 32 50 32 C50 32 50 32 55 28 C65 20 75 28 75 38 C75 55 50 72 50 72 Z" fill="#F59E0B"/><polygon points="50,38 52,44 58,44 53,48 55,54 50,50 45,54 47,48 42,44 48,44" fill="#FFF"/></svg>`
  },

  // ================= 7. FOOD & NUTRITION =================
  {
    id: 'foo-01',
    word: 'balanced diet',
    partOfSpeech: 'collocation',
    topicId: 'food',
    topicName: 'Food & Nutrition',
    topicIcon: '🍲',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌbæl.ənst ˈdaɪ.ət/',
    ipaUs: '/ˌbæl.ənst ˈdaɪ.ət/',
    stress: 'BAL-anced DI-et',
    definitionVi: 'Chế độ ăn uống cân bằng dinh dưỡng',
    definitionEn: 'A diet that contains the proper proportions of nutrients necessary for health and growth.',
    synonyms: ['nutritious eating plan', 'wholesome diet', 'healthy regimen'],
    collocations: ['maintain a balanced diet', 'adopt a balanced diet', 'essential for a balanced diet'],
    exampleEn: 'Nutritionists stress that maintaining a balanced diet rich in leafy greens is vital for longevity.',
    exampleVi: 'Các chuyên gia dinh dưỡng nhấn mạnh rằng việc duy trì chế độ ăn cân bằng giàu rau xanh là tối quan trọng cho tuổi thọ.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FFF7ED"/><circle cx="50" cy="50" r="30" fill="#EA580C"/><circle cx="50" cy="50" r="22" fill="#FFF"/><path d="M50 28 A22 22 0 0 1 72 50 L50 50 Z" fill="#10B981"/><path d="M72 50 A22 22 0 0 1 50 72 L50 50 Z" fill="#F59E0B"/></svg>`
  },
  {
    id: 'foo-02',
    word: 'culinary heritage',
    partOfSpeech: 'collocation',
    topicId: 'food',
    topicName: 'Food & Nutrition',
    topicIcon: '🍲',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˈkʌl.ɪ.nər.i ˈher.ɪ.tɪdʒ/',
    ipaUs: '/ˈkʌl.ə.ner.i ˈher.ə.t̬ɪdʒ/',
    stress: 'CUL-i-nar-y HER-i-tage',
    definitionVi: 'Di sản ẩm thực truyền thống',
    definitionEn: 'The traditional recipes, food culture, and culinary practices inherited by a civilization.',
    synonyms: ['gastronomic traditions', 'traditional culinary arts', 'indigenous cuisine'],
    collocations: ['preserve culinary heritage', 'celebrate culinary heritage', 'distinct culinary heritage'],
    exampleEn: 'Street food culture constitutes an indispensable facet of Vietnam’s profound culinary heritage.',
    exampleVi: 'Văn hóa ẩm thực đường phố tạo nên một khía cạnh không thể tách rời trong di sản ẩm thực sâu sắc của Việt Nam.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FFF7ED"/><path d="M25 50 Q50 80 75 50 Z" fill="#EA580C"/><path d="M30 45 Q50 35 70 45" stroke="#F97316" stroke-width="4" stroke-linecap="round"/><circle cx="45" cy="52" r="3" fill="#FFF"/><circle cx="55" cy="55" r="3" fill="#FFF"/></svg>`
  },
  {
    id: 'foo-03',
    word: 'gastronomic delicacies',
    partOfSpeech: 'collocation',
    topicId: 'food',
    topicName: 'Food & Nutrition',
    topicIcon: '🍲',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌɡæs.trəˈnɒm.ɪk ˈdel.ɪ.kə.siz/',
    ipaUs: '/ˌɡæs.trəˈnɑː.mɪk ˈdel.ə.kə.siz/',
    stress: 'gas-tro-NOM-ic DEL-i-ca-cies',
    definitionVi: 'Mỹ vị ẩm thực tinh tế, sơn hào hải vị',
    definitionEn: 'Exquisite, highly prized culinary creations prepared with utmost craftsmanship.',
    synonyms: ['epicurean specialties', 'gourmet treats', 'haute cuisine dishes'],
    collocations: ['savor gastronomic delicacies', 'array of gastronomic delicacies', 'acclaimed gastronomic delicacies'],
    exampleEn: 'Connoisseurs journey across the globe to partake in the finest gastronomic delicacies at three-Michelin-starred venues.',
    exampleVi: 'Những người sành ăn đi khắp thế giới để thưởng thức những mỹ vị ẩm thực tinh tế bậc nhất tại các nhà hàng đạt ba sao Michelin.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FFF7ED"/><path d="M30 65 L70 65 Q70 35 50 35 Q30 35 30 65 Z" fill="#C2410C"/><rect x="25" y="65" width="50" height="6" rx="3" fill="#EA580C"/><circle cx="50" cy="30" r="4" fill="#F97316"/></svg>`
  },

  // ================= 8. FRIENDS & RELATIONSHIPS =================
  {
    id: 'fri-01',
    word: 'mutual trust',
    partOfSpeech: 'collocation',
    topicId: 'friends',
    topicName: 'Friends & Relationships',
    topicIcon: '🤝',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈmjuː.tʃu.əl trʌst/',
    ipaUs: '/ˈmjuː.tʃu.əl trʌst/',
    stress: 'MU-tu-al TRUST',
    definitionVi: 'Sự tin tưởng lẫn nhau giữa hai bên',
    definitionEn: 'Confidence and belief placed in one another reciprocally by two or more parties.',
    synonyms: ['reciprocal trust', 'shared confidence', 'bilateral faith'],
    collocations: ['built on mutual trust', 'foster mutual trust', 'erode mutual trust'],
    exampleEn: 'Enduring friendships are invariably anchored in unwavering mutual trust and empathy.',
    exampleVi: 'Tình bạn bền chặt luôn được neo đậu trên nền tảng của sự tin tưởng lẫn nhau kiên định và lòng thấu cảm.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EFF6FF"/><path d="M30 45 L45 55 L70 35" stroke="#2563EB" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`
  },
  {
    id: 'fri-02',
    word: 'solidarity',
    partOfSpeech: 'noun',
    topicId: 'friends',
    topicName: 'Friends & Relationships',
    topicIcon: '🤝',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˌsɒl.ɪˈdær.ə.ti/',
    ipaUs: '/ˌsɑː.ləˈder.ə.t̬i/',
    stress: 'Trọng âm âm tiết 3: sol-i-DAR-i-ty',
    definitionVi: 'Sự đoàn kết, tinh thần gắn kết tương trợ',
    definitionEn: 'Unity or agreement of feeling or action, especially among individuals with a common interest.',
    synonyms: ['cohesion', 'camaraderie', 'unity of purpose', 'fellowship'],
    collocations: ['stand in solidarity', 'sense of solidarity', 'foster social solidarity'],
    exampleEn: 'During times of national adversity, the community exhibited extraordinary solidarity by assisting the vulnerable.',
    exampleVi: 'Trong những thời khắc gian nan của quốc gia, cộng đồng đã thể hiện tinh thần đoàn kết phi thường qua việc giúp đỡ người yếu thế.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EFF6FF"/><circle cx="35" cy="40" r="10" fill="#3B82F6"/><circle cx="65" cy="40" r="10" fill="#60A5FA"/><path d="M25 65 C25 55 45 55 45 65" fill="#2563EB"/><path d="M55 65 C55 55 75 55 75 65" fill="#1D4ED8"/></svg>`
  },
  {
    id: 'fri-03',
    word: 'interpersonal dynamics',
    partOfSpeech: 'collocation',
    topicId: 'friends',
    topicName: 'Friends & Relationships',
    topicIcon: '🤝',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌɪn.təˈpɜː.sən.əl daɪˈnæm.ɪks/',
    ipaUs: '/ˌɪn.t̬ɚˈpɝː.sən.əl daɪˈnæm.ɪks/',
    stress: 'in-ter-PER-son-al dy-NAM-ics',
    definitionVi: 'Các biến động và tương tác tâm lý giữa các cá nhân',
    definitionEn: 'The complex patterns of psychological and emotional interaction occurring between people.',
    synonyms: ['relational patterns', 'social chemistry', 'group dynamics'],
    collocations: ['navigate interpersonal dynamics', 'subtle interpersonal dynamics', 'complex interpersonal dynamics'],
    exampleEn: 'Skilled corporate leaders must master the art of navigating multifaceted interpersonal dynamics within heterogeneous teams.',
    exampleVi: 'Những nhà lãnh đạo doanh nghiệp tài ba cần thành thạo nghệ thuật xử lý các tương tác liên cá nhân phức tạp trong các nhóm làm việc đa dạng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EFF6FF"/><circle cx="35" cy="50" r="12" fill="#1D4ED8"/><circle cx="65" cy="50" r="12" fill="#3B82F6"/><path d="M35 50 Q50 30 65 50 Q50 70 35 50" fill="#60A5FA" opacity="0.8"/></svg>`
  },

  // ================= 9. HOLIDAYS & TOURISM =================
  {
    id: 'hol-01',
    word: 'tourist attraction',
    partOfSpeech: 'collocation',
    topicId: 'holidays',
    topicName: 'Holidays & Tourism',
    topicIcon: '🏖️',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈtʊə.rɪst əˈtræk.ʃən/',
    ipaUs: '/ˈtʊr.ɪst əˈtræk.ʃən/',
    stress: 'TOUR-ist at-TRAC-tion',
    definitionVi: 'Điểm thu hút khách du lịch',
    definitionEn: 'A place of interest that tourists visit, typically for its inherent or exhibited cultural value or beauty.',
    synonyms: ['sightseeing destination', 'tourist hotspot', 'landmark'],
    collocations: ['major tourist attraction', 'crowded tourist attraction', 'unspoiled tourist attraction'],
    exampleEn: 'The ancient citadel remains the premier tourist attraction of the central province.',
    exampleVi: 'Khu hoàng thành cổ kính vẫn là điểm thu hút khách du lịch hàng đầu của tỉnh miền Trung.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFEFF"/><path d="M25 70 Q50 65 75 70 L75 80 L25 80 Z" fill="#F59E0B"/><path d="M45 40 L50 25 L55 40 Z" fill="#06B6D4"/><circle cx="65" cy="30" r="8" fill="#F59E0B"/></svg>`
  },
  {
    id: 'hol-02',
    word: 'eco-tourism',
    partOfSpeech: 'noun',
    topicId: 'holidays',
    topicName: 'Holidays & Tourism',
    topicIcon: '🏖️',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˈiː.kəʊˌtʊə.rɪ.zəm/',
    ipaUs: '/ˈiː.koʊˌtʊr.ɪ.zəm/',
    stress: 'E-co-tour-ism',
    definitionVi: 'Du lịch sinh thái (bảo vệ môi trường tự nhiên)',
    definitionEn: 'Tourism directed toward exotic natural environments, intended to support conservation efforts.',
    synonyms: ['sustainable tourism', 'green travel', 'nature-based travel'],
    collocations: ['promote eco-tourism', 'eco-tourism venture', 'benefits of eco-tourism'],
    exampleEn: 'Developing community-based eco-tourism provides indigenous tribes with sustainable income while safeguarding biodiversity.',
    exampleVi: 'Phát triển du lịch sinh thái cộng đồng mang lại thu nhập bền vững cho các bộ tộc bản địa đồng thời bảo vệ đa dạng sinh học.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFEFF"/><path d="M50 25 C40 38 30 50 35 65 C40 75 60 75 65 65 C70 50 60 38 50 25 Z" fill="#0891B2"/><circle cx="50" cy="45" r="4" fill="#FFF"/></svg>`
  },
  {
    id: 'hol-03',
    word: 'overtourism and saturation',
    partOfSpeech: 'collocation',
    topicId: 'holidays',
    topicName: 'Holidays & Tourism',
    topicIcon: '🏖️',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌəʊ.vəˈtʊə.rɪ.zəm ænd ˌsætʃ.ərˈeɪ.ʃən/',
    ipaUs: '/ˌoʊ.vɚˈtʊr.ɪ.zəm ænd ˌsætʃ.əˈreɪ.ʃən/',
    stress: 'o-ver-TOUR-ism and sat-u-RA-tion',
    definitionVi: 'Nạn quá tải du lịch và sự bão hòa hạ tầng đô thị',
    definitionEn: 'The excessive influx of tourists that strains local infrastructure, degrades cultural sites, and irritates residents.',
    synonyms: ['mass tourist congestion', 'carrying capacity strain', 'hyper-tourism'],
    collocations: ['suffer from overtourism', 'measures to curb overtourism', 'tourist saturation point'],
    exampleEn: 'Historical European cities like Venice are imposing visitor levies to counteract the devastating consequences of overtourism and infrastructure saturation.',
    exampleVi: 'Các thành phố lịch sử châu Âu như Venice đang áp dụng thuế tham quan nhằm đối phó với hệ quả tàn phá của nạn quá tải du lịch và bão hòa hạ tầng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFEFF"/><rect x="30" y="30" width="40" height="40" rx="4" fill="#0E7490"/><circle cx="38" cy="45" r="3" fill="#FFF"/><circle cx="50" cy="45" r="3" fill="#FFF"/><circle cx="62" cy="45" r="3" fill="#FFF"/><circle cx="44" cy="58" r="3" fill="#FFF"/><circle cx="56" cy="58" r="3" fill="#FFF"/></svg>`
  },

  // ================= 10. MUSIC & PERFORMING ARTS =================
  {
    id: 'mus-01',
    word: 'catchy melody',
    partOfSpeech: 'collocation',
    topicId: 'music',
    topicName: 'Music & Performing Arts',
    topicIcon: '🎵',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈkætʃ.i ˈmel.ə.di/',
    ipaUs: '/ˈkætʃ.i ˈmel.ə.di/',
    stress: 'CATCH-y MEL-o-dy',
    definitionVi: 'Giai điệu bắt tai, dễ nhớ',
    definitionEn: 'A pleasing, memorable musical phrase that is easy to remember and sing along with.',
    synonyms: ['memorable tune', 'infectious hook', 'earworm'],
    collocations: ['boast a catchy melody', 'hum a catchy melody', 'written with a catchy melody'],
    exampleEn: 'The song soared to number one on the charts due to its upbeat rhythm and undeniably catchy melody.',
    exampleVi: 'Bài hát đã vươn lên vị trí quán quân trên các bảng xếp hạng nhờ tiết tấu sôi động và giai điệu bắt tai không thể chối từ.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EEF2FF"/><ellipse cx="40" cy="65" rx="8" ry="6" fill="#4F46E5"/><ellipse cx="70" cy="55" rx="8" ry="6" fill="#4F46E5"/><path d="M48 65 L48 30 L78 20 L78 55" stroke="#4F46E5" stroke-width="4" fill="none"/></svg>`
  },
  {
    id: 'mus-02',
    word: 'therapeutic power',
    partOfSpeech: 'collocation',
    topicId: 'music',
    topicName: 'Music & Performing Arts',
    topicIcon: '🎵',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˌθer.əˈpjuː.tɪk ˈpaʊ.ər/',
    ipaUs: '/ˌθer.əˈpjuː.t̬ɪk ˈpaʊ.ɚ/',
    stress: 'ther-a-PEU-tic POW-er',
    definitionVi: 'Sức mạnh trị liệu chữa lành (tâm hồn, cảm xúc)',
    definitionEn: 'The restorative or curative capacity of music to alleviate emotional distress and stress.',
    synonyms: ['healing efficacy', 'restorative attribute', 'cathartic effect'],
    collocations: ['harness therapeutic power', 'testify to therapeutic power', 'remarkable therapeutic power'],
    exampleEn: 'Neurologists emphasize the therapeutic power of acoustic melodies in mitigating acute anxiety and enhancing cognitive recall.',
    exampleVi: 'Các nhà thần kinh học nhấn mạnh sức mạnh trị liệu của những giai điệu mộc trong việc làm dịu lo âu trầm trọng và tăng cường trí nhớ.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EEF2FF"/><path d="M50 30 C40 18 20 28 30 48 L50 72 L70 48 C80 28 60 18 50 30 Z" fill="#6366F1"/><path d="M50 38 L50 56 M41 47 L59 47" stroke="#FFF" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'mus-03',
    word: 'orchestral virtuosity',
    partOfSpeech: 'collocation',
    topicId: 'music',
    topicName: 'Music & Performing Arts',
    topicIcon: '🎵',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ɔːˈkes.trəl ˌvɜː.tʃuˈɒs.ə.ti/',
    ipaUs: '/ɔːrˈkes.trəl ˌvɝː.tʃuˈɑː.sə.t̬i/',
    stress: 'or-CHES-tral vir-tu-OS-i-ty',
    definitionVi: 'Kỹ nghệ diễn tấu dàn nhạc bậc thầy đỉnh cao',
    definitionEn: 'Great technical skill and mastery displayed by a symphonic orchestra or classical performer.',
    synonyms: ['masterful musicianship', 'consummate artistry', 'symphonic brilliance'],
    collocations: ['dazzling orchestral virtuosity', 'display orchestral virtuosity', 'hallmark of orchestral virtuosity'],
    exampleEn: 'The Philharmonic Orchestra delivered a masterclass in orchestral virtuosity, culminating in a thunderous standing ovation.',
    exampleVi: 'Dàn nhạc Giao hưởng Philharmonic đã mang đến một màn trình diễn đỉnh cao về kỹ nghệ diễn tấu điêu luyện, khép lại bằng những tràng pháo tay tán thưởng vang dội.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EEF2FF"/><path d="M30 40 Q50 15 70 40 Q50 65 30 40 Z" fill="#4338CA"/><circle cx="50" cy="40" r="6" fill="#A5B4FC"/><line x1="20" y1="75" x2="80" y2="75" stroke="#4338CA" stroke-width="3"/></svg>`
  },

  // ================= 11. NATION & CULTURE =================
  {
    id: 'nat-01',
    word: 'cultural identity',
    partOfSpeech: 'collocation',
    topicId: 'nation_culture',
    topicName: 'Nation & Culture',
    topicIcon: '🏛️',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈkʌl.tʃər.əl aɪˈden.tə.ti/',
    ipaUs: '/ˈkʌl.tʃɚ.əl aɪˈden.t̬ə.t̬i/',
    stress: 'CUL-tur-al i-DEN-ti-ty',
    definitionVi: 'Bản sắc văn hóa dân tộc',
    definitionEn: 'The identity or feeling of belonging to a specific culture, nation, or ethnic group.',
    synonyms: ['national identity', 'cultural distinctiveness', 'heritage roots'],
    collocations: ['preserve cultural identity', 'loss of cultural identity', 'affirm cultural identity'],
    exampleEn: 'Globalization should not come at the expense of diluting a nation’s cherished cultural identity.',
    exampleVi: 'Toàn cầu hóa không được đánh đổi bằng việc làm xói mòn bản sắc văn hóa đáng trân quý của một quốc gia.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF3C7"/><path d="M25 40 L50 20 L75 40 H25 Z" fill="#B45309"/><rect x="30" y="40" width="8" height="30" fill="#D97706"/><rect x="46" y="40" width="8" height="30" fill="#D97706"/><rect x="62" y="40" width="8" height="30" fill="#D97706"/><rect x="22" y="70" width="56" height="8" rx="2" fill="#B45309"/></svg>`
  },
  {
    id: 'nat-02',
    word: 'cultural assimilation',
    partOfSpeech: 'collocation',
    topicId: 'nation_culture',
    topicName: 'Nation & Culture',
    topicIcon: '🏛️',
    band: '6.0 - 7.5',
    level: 'C1',
    ipaUk: '/ˈkʌl.tʃər.əl əˌsɪm.ɪˈleɪ.ʃən/',
    ipaUs: '/ˈkʌl.tʃɚ.əl əˌsɪm.əˈleɪ.ʃən/',
    stress: 'CUL-tur-al as-sim-i-LA-tion',
    definitionVi: 'Sự đồng hóa văn hóa',
    definitionEn: 'The process by which a minority group comes to resemble the dominant society’s culture.',
    synonyms: ['cultural integration', 'acculturation', 'social absorption'],
    collocations: ['resist cultural assimilation', 'rate of cultural assimilation', 'pressured into cultural assimilation'],
    exampleEn: 'Immigrant families frequently grapple with the delicate equilibrium between cultural assimilation and indigenous heritage preservation.',
    exampleVi: 'Các gia đình nhập cư thường xuyên phải đối mặt với trạng thái cân bằng mong manh giữa sự đồng hóa văn hóa và việc gìn giữ bản sắc cội nguồn.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF3C7"/><circle cx="40" cy="50" r="16" fill="#F59E0B" opacity="0.7"/><circle cx="60" cy="50" r="16" fill="#D97706" opacity="0.7"/></svg>`
  },
  {
    id: 'nat-03',
    word: 'intangible heritage',
    partOfSpeech: 'collocation',
    topicId: 'nation_culture',
    topicName: 'Nation & Culture',
    topicIcon: '🏛️',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ɪnˈtæn.dʒə.bəl ˈher.ɪ.tɪdʒ/',
    ipaUs: '/ɪnˈtæn.dʒə.bəl ˈher.ə.t̬ɪdʒ/',
    stress: 'in-TAN-gi-ble HER-i-tage',
    definitionVi: 'Di sản phi vật thể (truyền thống khẩu truyền, lễ hội, bí quyết nghề)',
    definitionEn: 'Traditions, oral expressions, rituals, and knowledge passed down through generations.',
    synonyms: ['living cultural legacy', 'ancestral folklore', 'oral tradition'],
    collocations: ['safeguard intangible heritage', 'inscribe as intangible heritage', 'UNESCO intangible heritage'],
    exampleEn: 'UNESCO has formally designated Quan Ho folk singing as humanity’s priceless intangible heritage requiring vigilant safeguarding.',
    exampleVi: 'UNESCO đã chính thức công nhận dân ca Quan họ là di sản phi vật thể vô giá của nhân loại cần được bảo tồn nghiêm cẩn.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FEF3C7"/><path d="M50 20 C30 35 25 60 50 80 C75 60 70 35 50 20 Z" fill="#B45309"/><circle cx="50" cy="45" r="8" fill="#FDE68A"/></svg>`
  },

  // ================= 12. ROUTINES & DAILY LIFE =================
  {
    id: 'rou-01',
    word: 'daily routine',
    partOfSpeech: 'collocation',
    topicId: 'routines',
    topicName: 'Routines & Daily Life',
    topicIcon: '⏰',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈdeɪ.li ruːˈtiːn/',
    ipaUs: '/ˈdeɪ.li ruːˈtiːn/',
    stress: 'DAY-ly rou-TINE',
    definitionVi: 'Lịch trình / Thói quen sinh hoạt hàng ngày',
    definitionEn: 'A standard sequence of activities that you perform consistently every day.',
    synonyms: ['daily regimen', 'day-to-day schedule', 'established habit'],
    collocations: ['disrupt daily routine', 'establish a daily routine', 'rigid daily routine'],
    exampleEn: 'Incorporating thirty minutes of brisk morning walking into one’s daily routine yields remarkable cardiovascular advantages.',
    exampleVi: 'Đưa 30 phút đi bộ nhanh vào buổi sáng vào lịch trình sinh hoạt hàng ngày mang lại những lợi ích tim mạch đáng kể.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F1F5F9"/><circle cx="50" cy="50" r="30" fill="none" stroke="#64748B" stroke-width="4"/><line x1="50" y1="50" x2="50" y2="30" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="50" x2="65" y2="50" stroke="#E11D48" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'rou-02',
    word: 'circadian rhythm',
    partOfSpeech: 'noun',
    topicId: 'routines',
    topicName: 'Routines & Daily Life',
    topicIcon: '⏰',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/sɜːˈkeɪ.di.ən ˈrɪð.əm/',
    ipaUs: '/sɝːˈkeɪ.di.ən ˈrɪð.əm/',
    stress: 'cir-CA-di-an RHYTHM',
    definitionVi: 'Nhịp sinh học 24 giờ của cơ thể',
    definitionEn: 'Physical, mental, and behavioral changes that follow a 24-hour internal clock in living beings.',
    synonyms: ['biological clock', 'internal sleep-wake cycle', 'biorhythm'],
    collocations: ['synchronize circadian rhythm', 'disrupt circadian rhythm', 'healthy circadian rhythm'],
    exampleEn: 'Exposure to smartphone blue light late at night violently derails your natural circadian rhythm.',
    exampleVi: 'Việc tiếp xúc với ánh sáng xanh từ điện thoại vào ban đêm làm rối loạn trầm trọng nhịp sinh học tự nhiên của bạn.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F1F5F9"/><path d="M50 25 A25 25 0 0 0 50 75 A25 25 0 0 1 50 25 Z" fill="#475569"/><circle cx="50" cy="50" r="25" fill="none" stroke="#94A3B8" stroke-width="2"/></svg>`
  },
  {
    id: 'rou-03',
    word: 'sedentary lifestyle',
    partOfSpeech: 'collocation',
    topicId: 'routines',
    topicName: 'Routines & Daily Life',
    topicIcon: '⏰',
    band: '7.5+',
    level: 'C1',
    ipaUk: '/ˈsed.ən.tər.i ˈlaɪf.staɪl/',
    ipaUs: '/ˈsed.ən.ter.i ˈlaɪf.staɪl/',
    stress: 'SED-en-tar-y LIFE-style',
    definitionVi: 'Lối sống lười vận động, ngồi nhiều một chỗ',
    definitionEn: 'A way of life involving little or no physical activity and prolonged sitting.',
    synonyms: ['inactive routine', 'desk-bound habits', 'lethargic way of living'],
    collocations: ['lead a sedentary lifestyle', 'perils of a sedentary lifestyle', 'break away from a sedentary lifestyle'],
    exampleEn: 'Leading an unremittingly sedentary lifestyle significantly predisposes modern office workers to metabolic dysfunctions.',
    exampleVi: 'Duy trì lối sống ít vận động kéo dài làm gia tăng đáng kể nguy cơ mắc các rối loạn chuyển hóa ở giới nhân viên văn phòng hiện đại.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F1F5F9"/><path d="M35 70 L35 45 L55 45 L65 70" stroke="#334155" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="45" cy="30" r="8" fill="#64748B"/></svg>`
  },

  // ================= 13. SCIENCE & RESEARCH =================
  {
    id: 'sci-01',
    word: 'scientific discovery',
    partOfSpeech: 'collocation',
    topicId: 'science',
    topicName: 'Science & Research',
    topicIcon: '🔬',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌsaɪənˈtɪf.ɪk dɪˈskʌv.ər.i/',
    ipaUs: '/ˌsaɪənˈtɪf.ɪk dɪˈskʌv.ɚ.i/',
    stress: 'sci-en-TIF-ic dis-COV-er-y',
    definitionVi: 'Phát minh / Khám phá khoa học',
    definitionEn: 'The act of finding something new or acquiring knowledge through rigorous empirical inquiry.',
    synonyms: ['breakthrough finding', 'empirical revelation', 'scientific advance'],
    collocations: ['monumental scientific discovery', 'herald a scientific discovery', 'catalyst for scientific discovery'],
    exampleEn: 'The development of mRNA vaccines was hailed as the most consequential scientific discovery of the decade.',
    exampleVi: 'Sự phát triển của vắc-xin mRNA được ca ngợi là khám phá khoa học mang tính bước ngoặt nhất của thập kỷ.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EFF6FF"/><path d="M42 25 H58 M50 25 V45 L35 75 H65 L50 45" stroke="#2563EB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="50" cy="62" r="3" fill="#60A5FA"/></svg>`
  },
  {
    id: 'sci-02',
    word: 'empirical evidence',
    partOfSpeech: 'collocation',
    topicId: 'science',
    topicName: 'Science & Research',
    topicIcon: '🔬',
    band: '6.0 - 7.5',
    level: 'C1',
    ipaUk: '/ɪmˈpɪr.ɪ.kəl ˈev.ɪ.dəns/',
    ipaUs: '/ɪmˈpɪr.ɪ.kəl ˈev.ə.dəns/',
    stress: 'em-PIR-i-cal EV-i-dence',
    definitionVi: 'Bằng chứng thực nghiệm (có kiểm chứng từ dữ liệu thực tế)',
    definitionEn: 'Information acquired by means of observation, experimentation, or measurement.',
    synonyms: ['verifiable proof', 'hard scientific data', 'experimental validation'],
    collocations: ['substantiated by empirical evidence', 'lack empirical evidence', 'gather empirical evidence'],
    exampleEn: 'Theoretical hypotheses remain unpersuasive until rigorously substantiated by repeatable empirical evidence.',
    exampleVi: 'Các giả thuyết lý thuyết vẫn chưa đủ sức thuyết phục chừng nào chưa được củng cố nghiêm ngặt bởi những bằng chứng thực nghiệm có thể lặp lại.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EFF6FF"/><rect x="30" y="25" width="40" height="50" rx="4" fill="none" stroke="#1D4ED8" stroke-width="4"/><line x1="40" y1="40" x2="60" y2="40" stroke="#3B82F6" stroke-width="3"/><line x1="40" y1="50" x2="60" y2="50" stroke="#3B82F6" stroke-width="3"/><path d="M40 60 L46 65 L60 55" stroke="#10B981" stroke-width="3" fill="none"/></svg>`
  },
  {
    id: 'sci-03',
    word: 'paradigm shift',
    partOfSpeech: 'noun / idiom',
    topicId: 'science',
    topicName: 'Science & Research',
    topicIcon: '🔬',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˈpær.ə.daɪm ˌʃɪft/',
    ipaUs: '/ˈper.ə.daɪm ˌʃɪft/',
    stress: 'PAR-a-digm SHIFT',
    definitionVi: 'Sự thay đổi căn bản về mô thức tư duy / Bước chuyển hệ hình',
    definitionEn: 'A fundamental change in approach, fundamental concepts, or the underlying assumptions of a discipline.',
    synonyms: ['revolutionary transformation', 'conceptual overhaul', 'fundamental turning point'],
    collocations: ['trigger a paradigm shift', 'represent a paradigm shift', 'monumental paradigm shift'],
    exampleEn: 'Einstein’s general relativity precipitated a profound paradigm shift that permanently overturned Newtonian physics.',
    exampleVi: 'Thuyết tương đối rộng của Einstein đã tạo nên một bước chuyển hệ hình sâu sắc làm thay đổi vĩnh viễn nền tảng vật lý học Newton.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EFF6FF"/><path d="M30 40 A22 22 0 0 1 70 40 L65 35 M70 40 L65 45" stroke="#1E40AF" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M70 60 A22 22 0 0 1 30 60 L35 55 M30 60 L35 65" stroke="#1E40AF" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`
  },

  // ================= 14. SHOPPING & CONSUMERISM =================
  {
    id: 'sho-01',
    word: 'impulse buying',
    partOfSpeech: 'collocation',
    topicId: 'shopping',
    topicName: 'Shopping & Consumerism',
    topicIcon: '🛍️',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈɪm.pʌls ˌbaɪ.ɪŋ/',
    ipaUs: '/ˈɪm.pʌls ˌbaɪ.ɪŋ/',
    stress: 'IM-pulse BUY-ing',
    definitionVi: 'Hành vi mua sắm bốc đồng theo cảm tính',
    definitionEn: 'The buying of goods without planning to do so in advance, as a result of a sudden whim.',
    synonyms: ['spontaneous purchasing', 'unplanned expenditure', 'compulsive shopping'],
    collocations: ['curb impulse buying', 'prone to impulse buying', 'triggered by impulse buying'],
    exampleEn: 'Flash sales and limited-time coupons are psychologically engineered to stimulate impulse buying among shoppers.',
    exampleVi: 'Các đợt giảm giá chớp nhoáng và mã ưu đãi có thời hạn được thiết kế theo tâm lý học nhằm kích thích hành vi mua sắm bốc đồng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FDF2F8"/><path d="M30 40 L70 40 L65 75 L35 75 Z" fill="#EC4899"/><path d="M40 40 C40 28 60 28 60 40" stroke="#BE185D" stroke-width="4" fill="none"/><line x1="50" y1="50" x2="50" y2="65" stroke="#FFF" stroke-width="3"/></svg>`
  },
  {
    id: 'sho-02',
    word: 'consumerism',
    partOfSpeech: 'noun',
    topicId: 'shopping',
    topicName: 'Shopping & Consumerism',
    topicIcon: '🛍️',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/kənˈsjuː.mə.rɪ.zəm/',
    ipaUs: '/kənˈsuː.mɚ.ɪ.zəm/',
    stress: 'Trọng âm âm tiết 2: con-SU-mer-ism',
    definitionVi: 'Chủ nghĩa tiêu dùng quá mức',
    definitionEn: 'The preoccupation of society with the acquisition of consumer goods.',
    synonyms: ['materialism', 'hyper-commercialism', 'consumption culture'],
    collocations: ['rampant consumerism', 'critique of consumerism', 'fuel consumerism'],
    exampleEn: 'Unchecked consumerism accelerates natural resource depletion while leaving individuals caught in a cycle of debt.',
    exampleVi: 'Chủ nghĩa tiêu dùng không kiểm soát đẩy nhanh cạn kiệt tài nguyên thiên nhiên trong khi khiến con người mắc kẹt vào vòng xoáy nợ nần.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FDF2F8"/><circle cx="40" cy="70" r="4" fill="#9D174D"/><circle cx="65" cy="70" r="4" fill="#9D174D"/><path d="M25 35 H35 L45 60 H70 L78 42 H38" stroke="#DB2777" stroke-width="4" fill="none"/></svg>`
  },
  {
    id: 'sho-03',
    word: 'conspicuous consumption',
    partOfSpeech: 'collocation',
    topicId: 'shopping',
    topicName: 'Shopping & Consumerism',
    topicIcon: '🛍️',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/kənˈspɪk.ju.əs kənˈsʌmp.ʃən/',
    ipaUs: '/kənˈspɪk.ju.əs kənˈsʌmp.ʃən/',
    stress: 'con-SPIC-u-ous con-SUMP-tion',
    definitionVi: 'Tiêu dùng phô trương (nhằm khoe mẽ đẳng cấp giàu sang)',
    definitionEn: 'Expenditure on or consumption of luxuries on a lavish scale in an attempt to enhance one’s prestige.',
    synonyms: ['ostentatious display of wealth', 'flamboyant spending', 'status-driven spending'],
    collocations: ['hallmark of conspicuous consumption', 'fuel conspicuous consumption', 'renounce conspicuous consumption'],
    exampleEn: 'Purchasing bespoke luxury supercars is frequently criticized as a prime manifestation of conspicuous consumption in unequal societies.',
    exampleVi: 'Việc tậu siêu xe xa xỉ đặt may riêng thường bị chỉ trích là biểu hiện điển hình của lối tiêu dùng phô trương trong các xã hội còn nhiều bất bình đẳng.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#FDF2F8"/><polygon points="50,20 62,35 80,38 66,52 70,72 50,60 30,72 34,52 20,38 38,35" fill="#BE185D"/><circle cx="50" cy="45" r="6" fill="#FCE7F3"/></svg>`
  },

  // ================= 15. SOCIAL MEDIA & NETWORKING =================
  {
    id: 'soc-01',
    word: 'digital footprint',
    partOfSpeech: 'collocation',
    topicId: 'social_media',
    topicName: 'Social Media & Networking',
    topicIcon: '📱',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌdɪdʒ.ɪ.təl ˈfʊt.prɪnt/',
    ipaUs: '/ˌdɪdʒ.ə.t̬əl ˈfʊt.prɪnt/',
    stress: 'DIG-i-tal FOOT-print',
    definitionVi: 'Dấu chân kỹ thuật số (dữ liệu để lại trên không gian mạng)',
    definitionEn: 'The record of a person’s interactions online, such as visits to websites, emails, and social media posts.',
    synonyms: ['online trail', 'cyber shadow', 'electronic data track'],
    collocations: ['protect digital footprint', 'permanent digital footprint', 'minimize digital footprint'],
    exampleEn: 'Recruiters routinely inspect candidates’ digital footprints prior to extending formal employment offers.',
    exampleVi: 'Các nhà tuyển dụng thường xuyên kiểm tra dấu chân kỹ thuật số của ứng viên trước khi gửi thư mời làm việc chính thức.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EEF2FF"/><rect x="35" y="20" width="30" height="60" rx="6" fill="#4F46E5"/><circle cx="50" cy="72" r="3" fill="#FFF"/><rect x="40" y="28" width="20" height="36" rx="2" fill="#818CF8"/></svg>`
  },
  {
    id: 'soc-02',
    word: 'echo chamber effect',
    partOfSpeech: 'collocation',
    topicId: 'social_media',
    topicName: 'Social Media & Networking',
    topicIcon: '📱',
    band: '6.0 - 7.5',
    level: 'C1',
    ipaUk: '/ˈek.əʊ ˌtʃeɪm.bər ɪˈfekt/',
    ipaUs: '/ˈek.oʊ ˌtʃeɪm.bɚ əˈfekt/',
    stress: 'ECH-o CHAM-ber ef-FECT',
    definitionVi: 'Hiệu ứng buồng vang thông tin (chỉ tiếp xúc ý kiến tương đồng)',
    definitionEn: 'An environment where a person only encounters information or opinions that reflect and reinforce their own.',
    synonyms: ['filter bubble', 'ideological insularity', 'confirmation bias trap'],
    collocations: ['trapped in an echo chamber', 'perpetuate the echo chamber', 'break out of echo chambers'],
    exampleEn: 'Algorithmic curation confines internet users to echo chambers, polarizing societal discourse on controversial issues.',
    exampleVi: 'Thuật toán điều phối nội dung giam giữ người dùng vào các buồng vang thông tin, gây phân cực sâu sắc đối thoại xã hội về các vấn đề tranh cãi.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EEF2FF"/><path d="M35 50 Q50 30 65 50 Q50 70 35 50" stroke="#4338CA" stroke-width="4" fill="none"/><circle cx="35" cy="50" r="5" fill="#6366F1"/><circle cx="65" cy="50" r="5" fill="#6366F1"/></svg>`
  },
  {
    id: 'soc-03',
    word: 'disinformation campaigns',
    partOfSpeech: 'collocation',
    topicId: 'social_media',
    topicName: 'Social Media & Networking',
    topicIcon: '📱',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌdɪs.ɪn.fəˈmeɪ.ʃən kæmˈpeɪnz/',
    ipaUs: '/ˌdɪs.ɪn.fɚˈmeɪ.ʃən kæmˈpeɪnz/',
    stress: 'dis-in-for-MA-tion cam-PAIGNS',
    definitionVi: 'Chiến dịch lan truyền tin giả có chủ đích hiểm độc',
    definitionEn: 'Coordinated strategies designed to deliberately spread false or misleading information to deceive public opinion.',
    synonyms: ['malicious propaganda', 'coordinated fake news warfare', 'subversive information manipulation'],
    collocations: ['orchestrate disinformation campaigns', 'combat hostile disinformation', 'victim of disinformation campaigns'],
    exampleEn: 'State intelligence agencies warned that malign foreign actors orchestrate disinformation campaigns to undermine public faith in democratic institutions.',
    exampleVi: 'Cơ quan tình báo quốc gia đã cảnh báo rằng các thế lực thù địch bên ngoài đang dàn dựng những chiến dịch truyền bá thông tin sai lệch nhằm làm suy giảm niềm tin của công chúng vào các thể chế dân chủ.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#EEF2FF"/><path d="M50 20 L80 75 H20 Z" fill="#4338CA"/><text x="50" y="65" font-size="28" font-weight="900" fill="#FFF" text-anchor="middle">!</text></svg>`
  },

  // ================= 16. SPORT & PHYSICAL FITNESS =================
  {
    id: 'spo-01',
    word: 'cardiovascular health',
    partOfSpeech: 'collocation',
    topicId: 'sport',
    topicName: 'Sport & Physical Fitness',
    topicIcon: '⚽',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌkɑː.di.əʊˈvæs.kjə.lər helθ/',
    ipaUs: '/ˌkɑːr.di.oʊˈvæs.kjə.lɚ helθ/',
    stress: 'car-di-o-VAS-cu-lar HEALTH',
    definitionVi: 'Sức khỏe hệ tim mạch',
    definitionEn: 'The health and proper physiological function of the heart and blood vessels.',
    synonyms: ['heart fitness', 'circulatory wellness', 'aerobic health'],
    collocations: ['bolster cardiovascular health', 'improve cardiovascular health', 'risk to cardiovascular health'],
    exampleEn: 'Engaging in swimming three times per week drastically optimizes cardiovascular health and strengthens respiratory endurance.',
    exampleVi: 'Tập bơi ba lần mỗi tuần giúp tối ưu hóa rõ rệt sức khỏe hệ tim mạch và tăng cường sức bền của hệ hô hấp.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0FDF4"/><path d="M50 68 C50 68 25 50 25 35 C25 24 36 18 45 26 C50 30 50 30 50 30 C50 30 50 30 55 26 C64 18 75 24 75 35 C75 50 50 68 50 68 Z" fill="#16A34A"/><path d="M35 42 H45 L48 35 L52 48 L55 42 H65" stroke="#FFF" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`
  },
  {
    id: 'spo-02',
    word: 'sportsmanship',
    partOfSpeech: 'noun',
    topicId: 'sport',
    topicName: 'Sport & Physical Fitness',
    topicIcon: '⚽',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˈspɔːts.mən.ʃɪp/',
    ipaUs: '/ˈspɔːrts.mən.ʃɪp/',
    stress: 'SPORTS-man-ship',
    definitionVi: 'Tinh thần thể thao thượng võ, công bằng và tôn trọng đối thủ',
    definitionEn: 'Fair, generous, and polite behavior, respect for rules, and courtesy toward opponents.',
    synonyms: ['fair play', 'ethical conduct', 'integrity in sports', 'chivalry'],
    collocations: ['display exemplary sportsmanship', 'spirit of true sportsmanship', 'lack of sportsmanship'],
    exampleEn: 'Despite suffering a heartbreaking defeat in the finals, the tennis athlete demonstrated exemplary sportsmanship toward his rival.',
    exampleVi: 'Dù phải chịu thất bại đau đớn trong trận chung kết, tay vợt tennis vẫn thể hiện tinh thần thượng võ mẫu mực đối với đối thủ của mình.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0FDF4"/><circle cx="50" cy="50" r="30" fill="none" stroke="#16A34A" stroke-width="4"/><path d="M35 50 Q50 35 65 50 Q50 65 35 50" fill="#22C55E"/></svg>`
  },
  {
    id: 'spo-03',
    word: 'pediatric obesity',
    partOfSpeech: 'collocation',
    topicId: 'sport',
    topicName: 'Sport & Physical Fitness',
    topicIcon: '⚽',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌpiː.diˈæt.rɪk əʊˈbiː.sə.ti/',
    ipaUs: '/ˌpiː.diˈæt.rɪk oʊˈbiː.sə.t̬i/',
    stress: 'pe-di-AT-ric o-BE-si-ty',
    definitionVi: 'Bệnh béo phì ở trẻ em (hậu quả của lối sống lười vận động)',
    definitionEn: 'A serious medical condition in children characterized by excess body fat negatively affecting health.',
    synonyms: ['childhood adiposity', 'juvenile weight epidemic', 'infantile obesity'],
    collocations: ['curb pediatric obesity', 'alarming surge in pediatric obesity', 'combat pediatric obesity'],
    exampleEn: 'Mandatory physical education curricula in primary schools serve as an indispensable defense against the alarming surge in pediatric obesity.',
    exampleVi: 'Chương trình giáo dục thể chất bắt buộc tại các trường tiểu học đóng vai trò như bức tường phòng thủ thiết yếu chống lại sự gia tăng đáng báo động của bệnh béo phì ở trẻ em.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0FDF4"/><circle cx="50" cy="35" r="12" fill="#15803D"/><path d="M28 75 C28 55 72 55 72 75 Z" fill="#16A34A"/></svg>`
  },

  // ================= 17. TECHNOLOGY & AI =================
  {
    id: 'tec-01',
    word: 'cutting-edge technology',
    partOfSpeech: 'collocation',
    topicId: 'technology',
    topicName: 'Technology & Artificial Intelligence',
    topicIcon: '💻',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌkʌt.ɪŋˈedʒ tekˈnɒl.ə.dʒi/',
    ipaUs: '/ˌkʌt̬.ɪŋˈedʒ tekˈnɑː.lə.dʒi/',
    stress: 'CUT-ting EDGE tech-NOL-o-gy',
    definitionVi: 'Công nghệ tiên tiến, hiện đại bậc nhất',
    definitionEn: 'The most advanced and pioneering stage in the technological development of an industry.',
    synonyms: ['state-of-the-art tech', 'advanced innovations', 'pioneering systems'],
    collocations: ['harness cutting-edge technology', 'invest in cutting-edge technology', 'utilize cutting-edge technology'],
    exampleEn: 'Autonomous electric vehicles rely on cutting-edge sensor technology and lidar to navigate congested urban corridors.',
    exampleVi: 'Các phương tiện xe điện tự hành dựa vào công nghệ cảm biến tối tân cùng lidar để định vị qua các hành lang đô thị đông đúc.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0F9FF"/><rect x="25" y="28" width="50" height="35" rx="3" fill="#0284C7"/><path d="M20 68 H80 L75 75 H25 Z" fill="#0369A1"/><line x1="45" y1="63" x2="55" y2="63" stroke="#FFF" stroke-width="2"/></svg>`
  },
  {
    id: 'tec-02',
    word: 'algorithm',
    partOfSpeech: 'noun',
    topicId: 'technology',
    topicName: 'Technology & Artificial Intelligence',
    topicIcon: '💻',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˈæl.ɡə.rɪ.ðəm/',
    ipaUs: '/ˈæl.ɡə.rɪ.ðəm/',
    stress: 'AL-go-rithm',
    definitionVi: 'Thuật toán máy tính',
    definitionEn: 'A process or set of rules to be followed in calculations or problem-solving operations by a computer.',
    synonyms: ['computational formula', 'procedural logic', 'processing model'],
    collocations: ['recommendation algorithm', 'machine learning algorithm', 'flawed algorithm'],
    exampleEn: 'Streaming platforms leverage predictive algorithms to anticipate user preferences with extraordinary precision.',
    exampleVi: 'Các nền tảng phát nội dung trực tuyến tận dụng các thuật toán dự đoán để đón trước sở thích của người dùng với độ chuẩn xác phi thường.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0F9FF"/><path d="M30 40 L50 25 L70 40 L70 65 L50 80 L30 65 Z" stroke="#0284C7" stroke-width="4" fill="none"/><circle cx="50" cy="52" r="8" fill="#38BDF8"/></svg>`
  },
  {
    id: 'tec-03',
    word: 'technological singularity',
    partOfSpeech: 'collocation',
    topicId: 'technology',
    topicName: 'Technology & Artificial Intelligence',
    topicIcon: '💻',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌtek.nəˈlɒdʒ.ɪ.kəl ˌsɪŋ.ɡjəˈlær.ə.ti/',
    ipaUs: '/ˌtek.nəˈlɑː.dʒɪ.kəl ˌsɪŋ.ɡjəˈler.ə.t̬i/',
    stress: 'tech-no-LOG-i-cal sin-gu-LAR-i-ty',
    definitionVi: 'Điểm kỳ dị công nghệ (thời điểm AI vượt xa toàn bộ trí tuệ loài người)',
    definitionEn: 'A hypothetical future point in time at which artificial intelligence surpasses all human cognitive capability.',
    synonyms: ['superintelligent AI horizon', 'cognitive transcendence point', 'post-human intelligence epoch'],
    collocations: ['advent of the technological singularity', 'verge of technological singularity', 'post-singularity landscape'],
    exampleEn: 'Prominent philosophers debate whether humanity possesses sufficient ethical frameworks to govern society once the technological singularity materializes.',
    exampleVi: 'Các triết gia lỗi lạc tranh luận liệu nhân loại có sở hữu đủ các khung chuẩn mực đạo đức để quản trị xã hội một khi điểm kỳ dị công nghệ trở thành hiện thực.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0F9FF"/><circle cx="50" cy="50" r="32" fill="none" stroke="#0369A1" stroke-width="3" stroke-dasharray="6,4"/><circle cx="50" cy="50" r="12" fill="#0284C7"/><circle cx="50" cy="50" r="4" fill="#FFF"/></svg>`
  },

  // ================= 18. TRANSPORT & URBAN MOBILITY =================
  {
    id: 'tra-01',
    word: 'traffic congestion',
    partOfSpeech: 'collocation',
    topicId: 'transport',
    topicName: 'Transport & Urban Mobility',
    topicIcon: '🚆',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˈtræf.ɪk kənˈdʒes.tʃən/',
    ipaUs: '/ˈtræf.ɪk kənˈdʒes.tʃən/',
    stress: 'TRAF-fic con-GES-tion',
    definitionVi: 'Sự tắc nghẽn, ùn tắc giao thông',
    definitionEn: 'A condition on transport networks that occurs as use increases, characterized by slower speeds and vehicular queues.',
    synonyms: ['gridlock', 'traffic jam', 'vehicular bottleneck'],
    collocations: ['ease traffic congestion', 'chronic traffic congestion', 'alleviate traffic congestion'],
    exampleEn: 'Investing in high-speed rapid transit networks is the most sustainable strategy to alleviate chronic urban traffic congestion.',
    exampleVi: 'Đầu tư vào mạng lưới giao thông công cộng tốc độ cao là chiến lược bền vững nhất để giải tỏa tình trạng ùn tắc giao thông đô thị kinh niên.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFEFF"/><rect x="25" y="42" width="22" height="16" rx="3" fill="#0891B2"/><rect x="52" y="42" width="22" height="16" rx="3" fill="#06B6D4"/><circle cx="31" cy="58" r="3" fill="#FFF"/><circle cx="41" cy="58" r="3" fill="#FFF"/><circle cx="58" cy="58" r="3" fill="#FFF"/><circle cx="68" cy="58" r="3" fill="#FFF"/></svg>`
  },
  {
    id: 'tra-02',
    word: 'pedestrianized zones',
    partOfSpeech: 'collocation',
    topicId: 'transport',
    topicName: 'Transport & Urban Mobility',
    topicIcon: '🚆',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/pəˈdes.tri.ə.naɪzd zəʊnz/',
    ipaUs: '/pəˈdes.tri.ə.naɪzd zoʊnz/',
    stress: 'pe-DES-tri-an-ized ZONES',
    definitionVi: 'Khu phố đi bộ (cấm xe cơ giới lưu thông)',
    definitionEn: 'Areas in a town or city designated solely for pedestrians, where motor vehicles are prohibited.',
    synonyms: ['car-free precincts', 'walkable promenades', 'pedestrian boulevards'],
    collocations: ['designate pedestrianized zones', 'expand pedestrianized zones', 'bustling pedestrianized zones'],
    exampleEn: 'Converting historical thoroughfares into pedestrianized zones revitalizes local commerce and curtails carbon emissions.',
    exampleVi: 'Chuyển đổi các tuyến phố lịch sử thành khu phố đi bộ giúp hồi sinh thương mại địa phương và cắt giảm khí thải carbon.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFEFF"/><circle cx="50" cy="30" r="7" fill="#0891B2"/><path d="M45 42 L55 42 L50 65 L40 75" stroke="#0891B2" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`
  },
  {
    id: 'tra-03',
    word: 'sustainable mobility paradigm',
    partOfSpeech: 'collocation',
    topicId: 'transport',
    topicName: 'Transport & Urban Mobility',
    topicIcon: '🚆',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/səˈsteɪ.nə.bəl məʊˈbɪl.ə.ti ˈpær.ə.daɪm/',
    ipaUs: '/səˈsteɪ.nə.bəl moʊˈbɪl.ə.t̬i ˈper.ə.daɪm/',
    stress: 'sus-TAIN-a-ble mo-BIL-i-ty PAR-a-digm',
    definitionVi: 'Mô hình giao thông di chuyển bền vững và thân thiện môi trường',
    definitionEn: 'An integrated transportation framework prioritizing carbon-neutral, multimodal, and accessible mass transit solutions.',
    synonyms: ['green transit matrix', 'eco-friendly transport infrastructure', 'low-emission mobility model'],
    collocations: ['transition to a sustainable mobility paradigm', 'architects of sustainable mobility', 'champion sustainable mobility'],
    exampleEn: 'Progressive metropolis planners are pioneering a sustainable mobility paradigm by integrating electric light-rail networks with ubiquitous cycle-sharing infrastructures.',
    exampleVi: 'Các nhà quy hoạch đô thị tiên tiến đang tiên phong thiết lập mô hình giao thông bền vững bằng cách tích hợp mạng lưới đường sắt nhẹ chạy điện với hạ tầng chia sẻ xe đạp hiện diện khắp nơi.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#ECFEFF"/><path d="M30 65 L45 35 H65 L70 65 Z" fill="#0E7490"/><circle cx="40" cy="65" r="7" fill="#FFF"/><circle cx="60" cy="65" r="7" fill="#FFF"/><line x1="20" y1="75" x2="80" y2="75" stroke="#0891B2" stroke-width="4"/></svg>`
  },

  // ================= 19. WEATHER & EXTREME CLIMATE =================
  {
    id: 'wea-01',
    word: 'unpredictable weather',
    partOfSpeech: 'collocation',
    topicId: 'weather',
    topicName: 'Weather & Extreme Climate',
    topicIcon: '⛅',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌʌn.prɪˈdɪk.tə.bəl ˈweð.ər/',
    ipaUs: '/ˌʌn.prɪˈdɪk.tə.bəl ˈweð.ɚ/',
    stress: 'un-pre-DICT-a-ble WEATH-er',
    definitionVi: 'Thời tiết thất thường, khó lường trước',
    definitionEn: 'Atmospheric conditions that fluctuate rapidly and defy accurate forecasting.',
    synonyms: ['erratic climate', 'volatile weather patterns', 'changeable conditions'],
    collocations: ['plagued by unpredictable weather', 'cope with unpredictable weather', 'symptom of unpredictable weather'],
    exampleEn: 'Farmers suffer heavy financial losses when unpredictable weather triggers premature droughts during the sowing season.',
    exampleVi: 'Nông dân chịu tổn thất tài chính nặng nề khi thời tiết thất thường gây ra hạn hán sớm trong mùa gieo hạt.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0F9FF"/><path d="M35 55 Q20 55 20 45 Q20 35 32 35 Q35 20 50 20 Q65 20 68 35 Q80 35 80 45 Q80 55 65 55 Z" fill="#0284C7"/><path d="M42 62 L38 72 M52 62 L48 72 M62 62 L58 72" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'wea-02',
    word: 'torrential downpour',
    partOfSpeech: 'collocation',
    topicId: 'weather',
    topicName: 'Weather & Extreme Climate',
    topicIcon: '⛅',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/təˈren.ʃəl ˈdaʊn.pɔːr/',
    ipaUs: '/təˈren.ʃəl ˈdaʊn.pɔːr/',
    stress: 'tor-REN-tial DOWN-pour',
    definitionVi: 'Trận mưa như trút nước, mưa xối xả',
    definitionEn: 'An exceptionally heavy and unrelenting fall of rain.',
    synonyms: ['deluge', 'incessant cloudburst', 'monsoonal deluge'],
    collocations: ['lashed by a torrential downpour', 'trigger flash floods after torrential downpour', 'caught in a torrential downpour'],
    exampleEn: 'A sudden torrential downpour overwhelmed the antiquated drainage channels, inundating metropolitan districts within hours.',
    exampleVi: 'Một trận mưa như trút nước bất ngờ đã làm tê liệt các kênh thoát nước cũ kỹ, làm ngập các quận đô thị chỉ trong vài giờ.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0F9FF"/><path d="M30 45 Q50 30 70 45" stroke="#0369A1" stroke-width="8" stroke-linecap="round" fill="none"/><line x1="38" y1="55" x2="30" y2="75" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="55" x2="42" y2="75" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/><line x1="62" y1="55" x2="54" y2="75" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'wea-03',
    word: 'meteorological anomalies',
    partOfSpeech: 'collocation',
    topicId: 'weather',
    topicName: 'Weather & Extreme Climate',
    topicIcon: '⛅',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˌmiː.ti.ər.əˈlɒdʒ.ɪ.kəl əˈnɒm.ə.liz/',
    ipaUs: '/ˌmiː.t̬i.ɚ.əˈlɑː.dʒɪ.kəl əˈnɑː.mə.liz/',
    stress: 'me-te-or-o-LOG-i-cal a-NOM-a-lies',
    definitionVi: 'Những dị thường khí tượng / hiện tượng thời tiết cực đoan khác thường',
    definitionEn: 'Deviations from standard atmospheric norms or severe unseasonal climatic events.',
    synonyms: ['climatic aberrations', 'atmospheric eccentricities', 'freak weather events'],
    collocations: ['witness unprecedented meteorological anomalies', 'frequency of meteorological anomalies', 'driven by meteorological anomalies'],
    exampleEn: 'Climatologists document that the alarming proliferation of severe meteorological anomalies is directly correlated with accelerated polar ice cap melting.',
    exampleVi: 'Các nhà khí hậu học ghi nhận rằng sự gia tăng đáng báo động của các dị thường khí tượng cực đoan tương quan trực tiếp với tốc độ tan nhanh của các chỏm băng vùng cực.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F0F9FF"/><path d="M48 20 L35 48 H52 L45 80 L65 42 H48 Z" fill="#0284C7"/><circle cx="50" cy="50" r="40" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,6"/></svg>`
  },

  // ================= 20. STUDY & HIGHER EDUCATION =================
  {
    id: 'stu-01',
    word: 'academic qualification',
    partOfSpeech: 'collocation',
    topicId: 'study',
    topicName: 'Study & Higher Education',
    topicIcon: '📚',
    band: '4.5 - 6.0',
    level: 'B1',
    ipaUk: '/ˌæk.əˈdem.ɪk ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/',
    ipaUs: '/ˌæk.əˈdem.ɪk ˌkwɑː.lə.fəˈkeɪ.ʃən/',
    stress: 'ac-a-DEM-ic qual-i-fi-CA-tion',
    definitionVi: 'Bằng cấp học thuật / Trình độ học vấn chính quy',
    definitionEn: 'An official certificate or degree confirming successful completion of a program of educational study.',
    synonyms: ['scholarly credential', 'university degree', 'educational certificate'],
    collocations: ['acquire academic qualifications', 'prestigious academic qualification', 'requisite academic qualifications'],
    exampleEn: 'Obtaining an internationally recognized academic qualification opens competitive doors in the global job market.',
    exampleVi: 'Sở hữu một bằng cấp học thuật được quốc tế công nhận sẽ mở ra những cánh cửa cạnh tranh trên thị trường việc làm toàn cầu.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F5F3FF"/><polygon points="50,25 80,40 50,55 20,40" fill="#7C3AED"/><rect x="35" y="52" width="30" height="15" fill="#6D28D9"/><line x1="75" y1="42" x2="75" y2="65" stroke="#F59E0B" stroke-width="3"/></svg>`
  },
  {
    id: 'stu-02',
    word: 'critical thinking skills',
    partOfSpeech: 'collocation',
    topicId: 'study',
    topicName: 'Study & Higher Education',
    topicIcon: '📚',
    band: '6.0 - 7.5',
    level: 'B2',
    ipaUk: '/ˈkrɪt.ɪ.kəl ˈθɪŋ.kɪŋ skɪlz/',
    ipaUs: '/ˈkrɪt̬.ɪ.kəl ˈθɪŋ.kɪŋ skɪlz/',
    stress: 'CRIT-i-cal THINK-ing SKILLS',
    definitionVi: 'Kỹ năng tư duy phản biện và suy luận logic',
    definitionEn: 'The objective analysis and evaluation of an issue in order to form a reasoned judgement.',
    synonyms: ['analytical reasoning', 'intellectual discernment', 'evaluative faculties'],
    collocations: ['cultivate critical thinking skills', 'sharpen critical thinking skills', 'deficient in critical thinking'],
    exampleEn: 'Tertiary education should prioritize cultivating robust critical thinking skills rather than demanding rote memorization.',
    exampleVi: 'Giáo dục đại học nên ưu tiên việc trau dồi các kỹ năng tư duy phản biện sắc sảo thay vì đòi hỏi học sinh học vẹt ghi nhớ máy móc.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F5F3FF"/><circle cx="50" cy="45" r="18" fill="none" stroke="#7C3AED" stroke-width="4"/><path d="M42 60 H58 L55 70 H45 Z" fill="#6D28D9"/><circle cx="50" cy="45" r="5" fill="#F59E0B"/></svg>`
  },
  {
    id: 'stu-03',
    word: 'rigorous academic scrutiny',
    partOfSpeech: 'collocation',
    topicId: 'study',
    topicName: 'Study & Higher Education',
    topicIcon: '📚',
    band: '7.5+',
    level: 'C2',
    ipaUk: '/ˈrɪɡ.ər.əs ˌæk.əˈdem.ɪk ˈskruː.tɪ.ni/',
    ipaUs: '/ˈrɪɡ.ɚ.əs ˌæk.əˈdem.ɪk ˈskruː.tən.i/',
    stress: 'RIG-or-ous ac-a-DEM-ic SCRU-ti-ny',
    definitionVi: 'Sự thẩm định học thuật nghiêm ngặt và khắt khe',
    definitionEn: 'Thorough, meticulous, and critical peer examination of scholarly theses or experimental research.',
    synonyms: ['exhaustive scholarly critique', 'stringent peer review', 'in-depth academic appraisal'],
    collocations: ['withstand rigorous academic scrutiny', 'subject to rigorous academic scrutiny', 'pass rigorous scrutiny'],
    exampleEn: 'Before publication in leading journals, doctoral dissertations must withstand unsparingly rigorous academic scrutiny from senior panels.',
    exampleVi: 'Trước khi được đăng trên các tạp chí hàng đầu, các luận án tiến sĩ phải trải qua và vượt qua được sự thẩm định học thuật vô cùng nghiêm ngặt từ hội đồng giáo sư kỳ cựu.',
    svg: `<svg viewBox="0 0 100 100" class="card-svg-icon"><circle cx="50" cy="50" r="45" fill="#F5F3FF"/><rect x="28" y="25" width="44" height="52" rx="4" fill="none" stroke="#5B21B6" stroke-width="4"/><line x1="36" y1="38" x2="64" y2="38" stroke="#7C3AED" stroke-width="3"/><line x1="36" y1="48" x2="64" y2="48" stroke="#7C3AED" stroke-width="3"/><circle cx="56" cy="62" r="10" fill="none" stroke="#F59E0B" stroke-width="3"/><line x1="63" y1="69" x2="70" y2="76" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/></svg>`
  }
];

// Helper methods cho Cơ sở dữ liệu Từ Vựng IELTS
class IeltsVocabDatabaseManager {
  constructor() {
    this.vocabList = IELTS_VOCABULARY_DATABASE;
    this.topics = IELTS_20_TOPICS_METADATA;
  }

  getAll() {
    return this.vocabList;
  }

  getTopics() {
    if (this.topics && this.topics.length === 22) {
      return this.topics;
    }
    const bDataset = (typeof window !== 'undefined' && window.IELTS_BENCHMARK_DATASET)
      ? window.IELTS_BENCHMARK_DATASET
      : (typeof global !== 'undefined' && global.IELTS_BENCHMARK_DATASET ? global.IELTS_BENCHMARK_DATASET : (typeof IELTS_BENCHMARK_DATASET !== 'undefined' ? IELTS_BENCHMARK_DATASET : null));

    if (bDataset && bDataset.metadata && bDataset.metadata.topics) {
      return bDataset.metadata.topics.map((t) => ({
        id: t.id,
        name: t.name,
        viName: t.viName,
        icon: t.icon,
        number: t.number
      }));
    }
    return this.topics;
  }

  getById(id) {
    return this.vocabList.find((item) => item.id === id);
  }

  filter({ topic = 'all', band = 'all', status = 'all', keyword = '', masteredIds = [], reviewIds = [] }) {
    let result = this.vocabList;

    if (topic && topic !== 'all') {
      const qTopic = topic.toLowerCase();
      result = result.filter((item) => {
        const itemTopicId = (item.topicId || '').toLowerCase();
        const itemTopic = (item.topic || '').toLowerCase();
        const itemTopicName = (item.topicName || '').toLowerCase();
        return (
          itemTopicId === qTopic ||
          itemTopic === qTopic ||
          itemTopicName === qTopic ||
          itemTopicName.includes(qTopic) ||
          qTopic.includes(itemTopicId)
        );
      });
    }

    if (band && band !== 'all') {
      const qBand = band.toLowerCase();
      result = result.filter((item) => {
        const itemBand = (item.band || item.bandLevel || '').toLowerCase();
        return itemBand === qBand || itemBand.includes(qBand);
      });
    }

    if (status && status !== 'all') {
      if (status === 'mastered') {
        result = result.filter((item) => window.srsManager ? window.srsManager.isMastered(item.id) : masteredIds.includes(item.id));
      } else if (status === 'review' || status === 'reviewing') {
        result = result.filter((item) => window.srsManager ? window.srsManager.isReviewing(item.id) : reviewIds.includes(item.id));
      } else if (status === 'learning') {
        result = result.filter((item) => window.srsManager ? window.srsManager.isLearning(item.id) : false);
      } else if (status === 'new') {
        result = result.filter((item) => window.srsManager ? window.srsManager.isNew(item.id) : !masteredIds.includes(item.id) && !reviewIds.includes(item.id));
      } else if (status === 'due_srs') {
        result = result.filter((item) => window.srsManager ? window.srsManager.isDueForReview(item.id) : reviewIds.includes(item.id));
      } else if (status === 'unmastered') {
        result = result.filter((item) => window.srsManager ? !window.srsManager.isMastered(item.id) : !masteredIds.includes(item.id));
      }
    }

    if (keyword && keyword.trim().length > 0) {
      const q = keyword.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.word.toLowerCase().includes(q) ||
          item.definitionVi.toLowerCase().includes(q) ||
          item.definitionEn.toLowerCase().includes(q) ||
          item.ipaUk.toLowerCase().includes(q) ||
          item.synonyms.some((s) => s.toLowerCase().includes(q)) ||
          item.exampleEn.toLowerCase().includes(q)
      );
    }

    return result;
  }

  getStats(masteredIds = [], reviewIds = []) {
    const total = this.vocabList.length;
    const mastered = this.vocabList.filter((item) => masteredIds.includes(item.id)).length;
    const review = this.vocabList.filter((item) => reviewIds.includes(item.id)).length;
    const unlearned = total - mastered;
    const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0;

    return {
      total,
      mastered,
      review,
      unlearned,
      percentage,
    };
  }
}

// Khởi tạo Singleton Database
if (typeof window !== 'undefined') {
  window.vocabDb = new IeltsVocabDatabaseManager();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IELTS_20_TOPICS_METADATA,
    IELTS_VOCABULARY_DATABASE,
    IeltsVocabDatabaseManager
  };
}
