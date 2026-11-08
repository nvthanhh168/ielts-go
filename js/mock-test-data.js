/**
 * IELTS GO! - Chế Độ 9: Cơ Sở Dữ Liệu Phòng Thi Thử IELTS Listening & Reading
 * Dữ liệu chuẩn khảo thí Cambridge Official Practice (Listening 4 Sections & Reading 3 Passages)
 * Hỗ trợ cả 2 hệ thi: Academic Reading và General Training Reading
 */

// BẢNG QUY ĐỔI ĐIỂM SỐ RA IELTS BAND SCORE CHUẨN CAMBRIDGE
const IELTS_BAND_CONVERSION = {
  LISTENING: [
    { min: 39, max: 40, band: 9.0, desc: 'Expert User (Thông thạo xuất sắc)' },
    { min: 37, max: 38, band: 8.5, desc: 'Very Good User (Rất tốt)' },
    { min: 35, max: 36, band: 8.0, desc: 'Very Good User (Rất tốt)' },
    { min: 32, max: 34, band: 7.5, desc: 'Good User (Tốt)' },
    { min: 30, max: 31, band: 7.0, desc: 'Good User (Tốt)' },
    { min: 26, max: 29, band: 6.5, desc: 'Competent User (Khá)' },
    { min: 23, max: 25, band: 6.0, desc: 'Competent User (Khá)' },
    { min: 18, max: 22, band: 5.5, desc: 'Modest User (Trung bình khá)' },
    { min: 16, max: 17, band: 5.0, desc: 'Modest User (Trung bình)' },
    { min: 13, max: 15, band: 4.5, desc: 'Limited User (Hạn chế)' },
    { min: 10, max: 12, band: 4.0, desc: 'Limited User (Hạn chế)' },
    { min: 6, max: 9, band: 3.5, desc: 'Extremely Limited (Rất hạn chế)' },
    { min: 4, max: 5, band: 3.0, desc: 'Extremely Limited (Rất hạn chế)' },
    { min: 0, max: 3, band: 2.5, desc: 'Intermittent User (Mất gốc)' }
  ],
  ACADEMIC_READING: [
    { min: 39, max: 40, band: 9.0, desc: 'Expert User (Thông thạo xuất sắc)' },
    { min: 37, max: 38, band: 8.5, desc: 'Very Good User (Rất tốt)' },
    { min: 35, max: 36, band: 8.0, desc: 'Very Good User (Rất tốt)' },
    { min: 33, max: 34, band: 7.5, desc: 'Good User (Tốt)' },
    { min: 30, max: 32, band: 7.0, desc: 'Good User (Tốt)' },
    { min: 27, max: 29, band: 6.5, desc: 'Competent User (Khá)' },
    { min: 23, max: 26, band: 6.0, desc: 'Competent User (Khá)' },
    { min: 19, max: 22, band: 5.5, desc: 'Modest User (Trung bình khá)' },
    { min: 15, max: 18, band: 5.0, desc: 'Modest User (Trung bình)' },
    { min: 13, max: 14, band: 4.5, desc: 'Limited User (Hạn chế)' },
    { min: 10, max: 12, band: 4.0, desc: 'Limited User (Hạn chế)' },
    { min: 6, max: 9, band: 3.5, desc: 'Extremely Limited (Rất hạn chế)' },
    { min: 4, max: 5, band: 3.0, desc: 'Extremely Limited (Rất hạn chế)' },
    { min: 0, max: 3, band: 2.5, desc: 'Intermittent User (Mất gốc)' }
  ],
  GENERAL_READING: [
    { min: 40, max: 40, band: 9.0, desc: 'Expert User (Thông thạo xuất sắc)' },
    { min: 39, max: 39, band: 8.5, desc: 'Very Good User (Rất tốt)' },
    { min: 37, max: 38, band: 8.0, desc: 'Very Good User (Rất tốt)' },
    { min: 36, max: 36, band: 7.5, desc: 'Good User (Tốt)' },
    { min: 34, max: 35, band: 7.0, desc: 'Good User (Tốt)' },
    { min: 32, max: 33, band: 6.5, desc: 'Competent User (Khá)' },
    { min: 30, max: 31, band: 6.0, desc: 'Competent User (Khá)' },
    { min: 27, max: 29, band: 5.5, desc: 'Modest User (Trung bình khá)' },
    { min: 23, max: 26, band: 5.0, desc: 'Modest User (Trung bình)' },
    { min: 19, max: 22, band: 4.5, desc: 'Limited User (Hạn chế)' },
    { min: 15, max: 18, band: 4.0, desc: 'Limited User (Hạn chế)' },
    { min: 12, max: 14, band: 3.5, desc: 'Extremely Limited (Rất hạn chế)' },
    { min: 8, max: 11, band: 3.0, desc: 'Extremely Limited (Rất hạn chế)' },
    { min: 0, max: 7, band: 2.5, desc: 'Intermittent User (Mất gốc)' }
  ]
};

// =========================================================================
// 1. ĐỀ THI LISTENING (4 SECTIONS - 40 CÂU HỎI - CAMBRIDGE TEST 1)
// =========================================================================
const IELTS_LISTENING_EXAM_DATA = {
  id: 'cam-listening-01',
  title: 'Cambridge Official Practice - IELTS Listening Full Test 1',
  series: 'Cambridge Official Examination Papers',
  totalQuestions: 40,
  listeningTimeMinutes: 30,
  transferTimeMinutes: 10,
  sections: [
    {
      sectionNumber: 1,
      title: 'Section 1: Accommodation Inquiry - Holiday Rental Form',
      contextDescription: 'Hội thoại giữa khách hàng và tư vấn viên dịch vụ du lịch đặt nhà nghỉ gia đình tại bờ biển.',
      audioFilename: 'Test 1 - Section 1.mp3',
      audioDurationSeconds: 340,
      fullTapescript: `
OFFICER: Good morning, City Travel and Accommodation Services. Can I help you?
MAN: Hello, yes, I'm calling about renting a holiday cottage for my family in late July.
OFFICER: Certainly, sir. Let me take down a few details first. Could I have your surname, please?
MAN: Yes, it's Blake. B-L-A-K-E.
OFFICER: Thank you, Mr Blake. And your contact telephone number?
MAN: It's 01732 55890.
OFFICER: Great. And how many people will be staying in the cottage?
MAN: There will be four of us in total: two adults and two children.
OFFICER: Right. Now, what type of location are you looking for?
MAN: We really want somewhere near the beach, within walking distance if possible.
OFFICER: Well, we have several properties. The first one is called Willow Cottage. It has a lovely garden, but it is located near the town centre.
MAN: Oh, we prefer somewhere quieter, close to the coast.
OFFICER: Then what about Kingfisher Lodge? It is situated right beside the coastal path, only five minutes walk from the sea.
MAN: That sounds wonderful. How many bedrooms does it have?
OFFICER: It has three bedrooms, two bathrooms, and a fully equipped kitchen with a dishwasher.
MAN: Excellent. And does it have parking facilities?
OFFICER: Yes, there is a private garage attached to the property.
MAN: And regarding the arrival dates, we are looking at the 14th of July, for two weeks, so leaving on the 28th of July.
OFFICER: Let me check availability... Yes, Kingfisher Lodge is free from the 14th of July.
MAN: Perfect. And what is the total price for the two weeks?
OFFICER: The total price comes to 650 pounds, which includes all utility bills and linen.
MAN: That fits our budget nicely. Does the lodge allow pets? We have a small dog.
OFFICER: Yes, pets are permitted, but there is an extra deposit of 50 pounds required.
MAN: That's completely fine. Thank you so much!
      `,
      questions: [
        {
          id: 1,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Customer contact phone number:',
          correctPattern: '01732 55890 / 0173255890',
          instruction: 'NO MORE THAN ONE WORD AND/OR A NUMBER',
          contextSentence: 'Telephone number: _____',
          tapescriptSnippet: "MAN: It's 01732 55890."
        },
        {
          id: 2,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Number of occupants staying at the property:',
          correctPattern: '4 / four',
          instruction: 'NO MORE THAN ONE WORD AND/OR A NUMBER',
          contextSentence: 'Total number of guests: _____',
          tapescriptSnippet: 'MAN: There will be four of us in total: two adults and two children.'
        },
        {
          id: 3,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Preferred location type:',
          correctPattern: 'beach / coast',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Desired location: Near the _____',
          tapescriptSnippet: 'MAN: We really want somewhere near the beach, within walking distance if possible.'
        },
        {
          id: 4,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Selected holiday cottage name:',
          correctPattern: 'Kingfisher / Kingfisher Lodge',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Property name: _____ Lodge',
          tapescriptSnippet: 'OFFICER: Then what about Kingfisher Lodge?'
        },
        {
          id: 5,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Number of bedrooms in Kingfisher Lodge:',
          correctPattern: '3 / three',
          instruction: 'NO MORE THAN ONE WORD AND/OR A NUMBER',
          contextSentence: 'Bedrooms count: _____',
          tapescriptSnippet: 'OFFICER: It has three bedrooms, two bathrooms, and a fully equipped kitchen...'
        },
        {
          id: 6,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Car parking facility available:',
          correctPattern: '(private) garage / garage',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Parking: A private _____',
          tapescriptSnippet: 'OFFICER: Yes, there is a private garage attached to the property.'
        },
        {
          id: 7,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Starting date of vacation rental:',
          correctPattern: '14th July / 14 July / July 14 / July 14th',
          instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
          contextSentence: 'Date of arrival: _____',
          tapescriptSnippet: 'MAN: We are looking at the 14th of July, for two weeks...'
        },
        {
          id: 8,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Duration of cottage stay in weeks:',
          correctPattern: '2 / two (weeks)',
          instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
          contextSentence: 'Length of stay: _____ weeks',
          tapescriptSnippet: 'MAN: ...for two weeks, so leaving on the 28th of July.'
        },
        {
          id: 9,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Total rental cost for the two weeks:',
          correctPattern: '650 / 650 pounds / £650',
          instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
          contextSentence: 'Total price: £_____',
          tapescriptSnippet: 'OFFICER: The total price comes to 650 pounds, which includes all utility bills and linen.'
        },
        {
          id: 10,
          section: 1,
          type: 'NOTES_COMPLETION',
          prompt: 'Additional deposit required for bringing a dog:',
          correctPattern: '50 / 50 pounds / £50',
          instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
          contextSentence: 'Pet deposit: £_____',
          tapescriptSnippet: 'OFFICER: Yes, pets are permitted, but there is an extra deposit of 50 pounds required.'
        }
      ]
    },

    {
      sectionNumber: 2,
      title: 'Section 2: Park Warden Guided Tour & Diagram Labelling',
      contextDescription: 'Bài nói chuyện của kiểm lâm viên giới thiệu bản đồ khu bảo tồn thiên nhiên và quy định an toàn.',
      audioFilename: 'Test 1 - Section 2.mp3',
      audioDurationSeconds: 380,
      fullTapescript: `
WARDEN: Welcome everyone to Greenvale Nature Reserve. Before we begin our guided walking trail, please direct your attention to the map of the park layout in front of you. We are currently standing at the Main Entrance gates. Immediately on your left as you enter is the Information Centre where you can purchase wildlife guides and birdwatching binoculars.

Moving past the Information Centre along the Western Trail, you will find the Dragonfly Pond on your right. This freshwater pond is a protected breeding ground, so please do not throw stones or step past the wooden fences. Continuing north along this same path, right at the top left corner of the park, stands the Bird Watching Hide. This two-storey wooden structure offers magnificent views over the reed beds where rare marsh harriers nest.

Now, if we return to the Main Entrance and take the central path leading straight ahead through the Oak Woodland, you will arrive at the Picnic Area. Here we have sheltered wooden tables, clean drinking water taps, and recycling bins.

Finally, branching off to the eastern boundary of the park, you will encounter the Wildflower Meadow. During late spring and summer, this meadow is blanketed with native orchids. Just beyond the meadow, in the far eastern corner, is the Children's Adventure Playground, fully fenced for safety.

Now, regarding the walking tour rules: First, all visitors must remain on the designated gravel paths at all times. Second, please take all litter home with you. Third, strictly no dogs are allowed on the nature trail to avoid distressing the wildlife.
      `,
      questions: [
        {
          id: 11,
          section: 2,
          type: 'MULTIPLE_CHOICE',
          prompt: 'Where is the Information Centre located?',
          options: ['A. On the right of the Main Entrance', 'B. Immediately on the left as you enter', 'C. In the centre of the Oak Woodland'],
          correctPattern: 'B',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 12,
          section: 2,
          type: 'MULTIPLE_CHOICE',
          prompt: 'What can visitors do at the Bird Watching Hide?',
          options: ['A. Buy wildlife binoculars', 'B. Feed marsh harriers', 'C. Enjoy views over the nesting reed beds'],
          correctPattern: 'C',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 13,
          section: 2,
          type: 'MULTIPLE_CHOICE',
          prompt: 'What facility is available at the central Picnic Area?',
          options: ['A. Barbecue grills', 'B. Clean drinking water taps', 'C. Bicycle rental station'],
          correctPattern: 'B',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 14,
          section: 2,
          type: 'MULTIPLE_CHOICE',
          prompt: 'Why are dogs prohibited on the nature trail?',
          options: ['A. To prevent damage to gravel paths', 'B. To avoid distressing wild animals', 'C. Because of poisonous plants in the meadow'],
          correctPattern: 'B',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 15,
          section: 2,
          type: 'LABELLING_DIAGRAM',
          prompt: 'Label Map Area A (Next to Western Trail):',
          correctPattern: 'Dragonfly Pond / pond',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Area A on map: _____'
        },
        {
          id: 16,
          section: 2,
          type: 'LABELLING_DIAGRAM',
          prompt: 'Label Map Area B (Top left corner of park):',
          correctPattern: 'Bird (Watching) Hide / bird hide',
          instruction: 'NO MORE THAN THREE WORDS',
          contextSentence: 'Area B on map: _____'
        },
        {
          id: 17,
          section: 2,
          type: 'LABELLING_DIAGRAM',
          prompt: 'Label Map Area C (Along eastern boundary):',
          correctPattern: 'Wildflower Meadow / meadow',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Area C on map: _____'
        },
        {
          id: 18,
          section: 2,
          type: 'LABELLING_DIAGRAM',
          prompt: 'Label Map Area D (Far eastern corner):',
          correctPattern: '(Children\'s) Playground / adventure playground',
          instruction: 'NO MORE THAN THREE WORDS',
          contextSentence: 'Area D on map: _____'
        },
        {
          id: 19,
          section: 2,
          type: 'SHORT_ANSWER',
          prompt: 'What must visitors remain on at all times?',
          correctPattern: '(gravel) paths / designated paths',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Visitors must stay on: _____'
        },
        {
          id: 20,
          section: 2,
          type: 'SHORT_ANSWER',
          prompt: 'What are visitors requested to take home with them?',
          correctPattern: '(all) litter / rubbish / waste',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Visitors must take home: _____'
        }
      ]
    },

    {
      sectionNumber: 3,
      title: 'Section 3: Academic Discussion on Marine Conservation Project',
      contextDescription: 'Hai sinh viên đại học thảo luận với giảng viên hướng dẫn về dự án phục hồi rạn san hô nhân tạo.',
      audioFilename: 'Test 1 - Section 3.mp3',
      audioDurationSeconds: 410,
      fullTapescript: `
PROFESSOR: Good afternoon, Liam and Sarah. Let's look over your research proposal on artificial coral reef rehabilitation. Liam, how did you decide on the primary substrate material?
LIAM: Well, originally we considered recycled rubber tires, but empirical research showed they leach toxic chemicals into seawater over time. So we opted for pH-neutral porous concrete blocks instead.
SARAH: Yes, porous concrete allows crustose coralline algae to adhere much more rapidly, creating a firm biological anchor for coral larvae.
PROFESSOR: Excellent decision. And what monitoring methodology will you deploy to assess larval recruitment?
SARAH: We will use underwater stereo video cameras mounted on underwater tripods to conduct weekly photographic quadrats.
LIAM: In addition, we plan to measure ambient water temperature, salinity, and dissolved oxygen levels every twenty-four hours using automated benthic sensors.
PROFESSOR: That will provide robust quantitative data. What about your community outreach component?
SARAH: We have partnered with the local artisanal fishing cooperative. They agreed to designate a two-square-kilometer marine sanctuary where no motorized trawling is permitted.
LIAM: In return, our project will train ten local divers as citizen science reef monitors, giving them alternative livelihoods in ecotourism.
      `,
      questions: [
        {
          id: 21,
          section: 3,
          type: 'MULTIPLE_CHOICE',
          prompt: 'Why did the students reject rubber tires as reef substrate?',
          options: ['A. They were too light to stay underwater', 'B. They release hazardous toxic chemicals', 'C. Corals refused to grow on dark surfaces'],
          correctPattern: 'B',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 22,
          section: 3,
          type: 'MULTIPLE_CHOICE',
          prompt: 'What substrate material was ultimately chosen?',
          options: ['A. Marine grade steel plates', 'B. Porous concrete blocks', 'C. Crushed volcanic basalt'],
          correctPattern: 'B',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 23,
          section: 3,
          type: 'MULTIPLE_CHOICE',
          prompt: 'How often will water quality parameters be measured by sensors?',
          options: ['A. Every hour', 'B. Every 24 hours', 'C. Once per week'],
          correctPattern: 'B',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 24,
          section: 3,
          type: 'MULTIPLE_CHOICE',
          prompt: 'What is the size of the designated marine sanctuary?',
          options: ['A. 2 square kilometers / 2 sq km', 'B. 5 square kilometers', 'C. 10 square kilometers'],
          correctPattern: 'A',
          instruction: 'Choose the correct letter, A, B or C.'
        },
        {
          id: 25,
          section: 3,
          type: 'TABLE_COMPLETION',
          prompt: 'Tool used for photographic monitoring of coral larvae:',
          correctPattern: '(stereo) video cameras / cameras',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Monitoring equipment: Underwater stereo _____'
        },
        {
          id: 26,
          section: 3,
          type: 'TABLE_COMPLETION',
          prompt: 'Biological organism that creates anchor for coral larvae:',
          correctPattern: '(coralline) algae',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Biological adhesive: Crustose coralline _____'
        },
        {
          id: 27,
          section: 3,
          type: 'TABLE_COMPLETION',
          prompt: 'Prohibited activity inside marine sanctuary:',
          correctPattern: '(motorized) trawling / trawling',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Banned practice: Motorized _____'
        },
        {
          id: 28,
          section: 3,
          type: 'SENTENCE_COMPLETION',
          prompt: 'Local divers will receive training to work as citizen science reef _____',
          correctPattern: 'monitors / citizen monitors',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Job title: Reef _____'
        },
        {
          id: 29,
          section: 3,
          type: 'SENTENCE_COMPLETION',
          prompt: 'Alternative livelihoods will be created in the sector of _____',
          correctPattern: 'ecotourism / eco-tourism',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Sector: _____'
        },
        {
          id: 30,
          section: 3,
          type: 'SENTENCE_COMPLETION',
          prompt: 'Underwater sensors will monitor dissolved _____ levels in the water.',
          correctPattern: 'oxygen',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Dissolved _____ levels'
        }
      ]
    },

    {
      sectionNumber: 4,
      title: 'Section 4: Academic Lecture on History of Urban Sanitation Systems',
      contextDescription: 'Bài giảng học thuật của giáo sư lịch sử đô thị về sự phát triển của hệ thống thoát nước từ thời cổ đại đến hiện đại.',
      audioFilename: 'Test 1 - Section 4.mp3',
      audioDurationSeconds: 430,
      fullTapescript: `
LECTURER: Good morning, ladies and gentlemen. Today we examine the evolution of urban subterranean sewage networks. In the ancient Indus Valley civilization around 2500 BCE, cities like Mohenjo-daro featured the world's first standardized brick-lined municipal drainage channels. Every private dwelling possessed a designated bathing chamber from which wastewater flowed into covered street drains.

Fast forward to the nineteenth century, London was engulfed by the Industrial Revolution. Rapid population growth overwhelmed existing cesspools, culminating in the historic Great Stink of 1858. The intolerable stench emanating from the River Thames compelled Parliament to fund civil engineer Joseph Bazalgette's monumental infrastructure project.

Bazalgette designed an interconnected subterranean labyrinth comprising over eighty-two miles of brick-lined intercepting sewers, paired with eleven hundred miles of street sewers. The key innovation lay in utilizing gravity and pumping stations to transport effluent eastward, far downstream from the metropolitan drinking water intakes. As an immediate consequence, waterborne epidemic outbreaks such as cholera were virtually eliminated from the capital by 1866.
      `,
      questions: [
        {
          id: 31,
          section: 4,
          type: 'FLOW_CHART_COMPLETION',
          prompt: 'Earliest known brick-lined drains built in the _____ Valley.',
          correctPattern: 'Indus / Indus Valley',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Location: The _____ civilization'
        },
        {
          id: 32,
          section: 4,
          type: 'FLOW_CHART_COMPLETION',
          prompt: 'Approximate historical era of Mohenjo-daro sanitation:',
          correctPattern: '2500 BCE / 2500 BC',
          instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
          contextSentence: 'Date: Around _____'
        },
        {
          id: 33,
          section: 4,
          type: 'FLOW_CHART_COMPLETION',
          prompt: 'Ancient houses in Mohenjo-daro had a private _____ chamber.',
          correctPattern: 'bathing / bath',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Room: Private _____ chamber'
        },
        {
          id: 34,
          section: 4,
          type: 'SUMMARY_COMPLETION',
          prompt: 'Historic environmental crisis in London in 1858 was called The Great _____',
          correctPattern: 'Stink',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Event: The Great _____'
        },
        {
          id: 35,
          section: 4,
          type: 'SUMMARY_COMPLETION',
          prompt: 'The chief civil engineer who designed London’s modern sewer system:',
          correctPattern: '(Joseph) Bazalgette / Bazalgette',
          instruction: 'NO MORE THAN TWO WORDS',
          contextSentence: 'Engineer: Joseph _____'
        },
        {
          id: 36,
          section: 4,
          type: 'SUMMARY_COMPLETION',
          prompt: 'Total miles of underground intercepting sewers constructed:',
          correctPattern: '82 / 82 miles / eighty-two',
          instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
          contextSentence: 'Distance: _____ miles'
        },
        {
          id: 37,
          section: 4,
          type: 'SUMMARY_COMPLETION',
          prompt: 'Natural force utilized alongside pumps to transport wastewater:',
          correctPattern: 'gravity',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Transport mechanism: Utilized _____'
        },
        {
          id: 38,
          section: 4,
          type: 'SUMMARY_COMPLETION',
          prompt: 'Direction effluent was transported away from the capital:',
          correctPattern: 'eastward / east',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Direction: _____'
        },
        {
          id: 39,
          section: 4,
          type: 'SUMMARY_COMPLETION',
          prompt: 'Fatal waterborne disease eradicated following project completion:',
          correctPattern: 'cholera',
          instruction: 'NO MORE THAN ONE WORD',
          contextSentence: 'Disease eradicated: _____'
        },
        {
          id: 40,
          section: 4,
          type: 'SUMMARY_COMPLETION',
          prompt: 'Year by which major epidemic outbreaks were eliminated in London:',
          correctPattern: '1866',
          instruction: 'A NUMBER ONLY',
          contextSentence: 'Year: _____'
        }
      ]
    }
  ]
};

// =========================================================================
// 2. ĐỀ THI ACADEMIC READING (3 PASSAGES - 40 CÂU HỎI)
// =========================================================================
const IELTS_ACADEMIC_READING_EXAM_DATA = {
  id: 'academic-reading-01',
  title: 'Cambridge Official Practice - IELTS Academic Reading Test 1',
  timeAllowedMinutes: 60,
  totalQuestions: 40,
  passages: [
    {
      passageNumber: 1,
      title: 'The Secret Ecological Role of Rainforest Bats',
      subtitle: 'How nocturnal mammals sustain biodiversity in tropical ecosystems',
      paragraphs: [
        { label: 'A', text: 'Bats are often misunderstood creatures, frequently portrayed in folklore as sinister omens or disease carriers. However, in tropical rainforests across Southeast Asia and the Amazon Basin, bats act as indispensable ecological engineers. Over 1,400 recognized species of bats inhabit the planet, constituting roughly one-fifth of all mammalian diversity. Among these, frugivorous (fruit-eating) and nectarivorous (nectar-feeding) bats play irreplaceable roles in seed dispersal and pollination, ensuring the regenerative survival of vast tracts of ancient jungle.' },
        { label: 'B', text: 'Unlike birds, which typically excrete seeds while perching on tree branches, flying fruit bats frequently defecate in mid-flight. This creates an expansive "seed shadow" that scatters germinating seeds across heavily deforested clearings where few terrestrial animals dare to venture. Botanists estimate that over 500 economic plant species, including wild bananas, durians, cloves, and cashews, rely almost exclusively on nocturnal bat pollination. The economically vital durian tree, for instance, blooms almost entirely at dusk, secreting heavy musky nectar designed specifically to attract cave nectar bats (Eonycteris spelaea).' },
        { label: 'C', text: 'In addition to plant reproduction, insectivorous microbats provide immense natural pest suppression services. A single insect-eating bat can capture over 1,000 mosquito-sized insects in just sixty minutes of nocturnal foraging. In agricultural landscapes buffering primary forest, such as rice paddies and cacao plantations, colonies of free-tailed bats consume tens of metric tonnes of crop-destroying caterpillars and planthoppers annually. This biological pest control saves local farming communities millions of dollars each year in synthetic pesticide costs, thereby reducing chemical run-off into riverine habitats.' },
        { label: 'D', text: 'Despite their paramount ecological contributions, tropical bat populations are experiencing catastrophic declines. Unregulated limestone quarrying for concrete manufacture obliterates crucial karst cave roosts where millions of bats breed. Simultaneously, widespread slash-and-burn agriculture fragments continuous canopies, forcing bats into perilous journeys across open terrain where they fall prey to domestic predators or collide with high-voltage power grids. Conservationists warn that without legal protection for subterranean roosting networks, the domino effect on tropical forest ecosystems could be irreversible.' }
      ],
      questions: [
        { id: 1, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Bats represent approximately twenty percent of all mammalian species on Earth.', correctPattern: 'TRUE', contextQuote: '...constituting roughly one-fifth of all mammalian diversity.' },
        { id: 2, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Fruit bats drop seeds in the same concentrated patterns as birds.', correctPattern: 'FALSE', contextQuote: 'Unlike birds, which typically excrete seeds while perching... flying fruit bats frequently defecate in mid-flight.' },
        { id: 3, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Durian flowers open during midday to attract daytime pollinators.', correctPattern: 'FALSE', contextQuote: 'The economically vital durian tree, for instance, blooms almost entirely at dusk...' },
        { id: 4, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Over 500 economic plant varieties depend on bats for their survival.', correctPattern: 'TRUE', contextQuote: 'Botanists estimate that over 500 economic plant species... rely almost exclusively on nocturnal bat pollination.' },
        { id: 5, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Synthetic pesticides have been proven safer than natural bat pest control.', correctPattern: 'NOT GIVEN', contextQuote: 'This biological pest control saves local farming communities millions of dollars each year in synthetic pesticide costs...' },
        { id: 6, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Limestone quarrying damages cave systems where breeding bats live.', correctPattern: 'TRUE', contextQuote: 'Unregulated limestone quarrying... obliterates crucial karst cave roosts where millions of bats breed.' },
        { id: 7, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'All tropical countries have passed strict environmental laws protecting bats.', correctPattern: 'FALSE', contextQuote: 'Conservationists warn that without legal protection for subterranean roosting networks...' },
        { id: 8, passage: 1, type: 'SUMMARY_COMPLETION', prompt: 'Fruit bats excrete seeds during flight, creating a wide seed _____ across clearings.', correctPattern: 'shadow', instruction: 'NO MORE THAN ONE WORD' },
        { id: 9, passage: 1, type: 'SUMMARY_COMPLETION', prompt: 'Cave nectar bats pollinate the commercially important _____ tree.', correctPattern: 'durian', instruction: 'NO MORE THAN ONE WORD' },
        { id: 10, passage: 1, type: 'SUMMARY_COMPLETION', prompt: 'A single microbat can capture up to 1,000 _____ per hour.', correctPattern: 'insects', instruction: 'NO MORE THAN ONE WORD' },
        { id: 11, passage: 1, type: 'SUMMARY_COMPLETION', prompt: 'Bat pest control protects crops on rice paddies and _____ plantations.', correctPattern: 'cacao', instruction: 'NO MORE THAN ONE WORD' },
        { id: 12, passage: 1, type: 'SUMMARY_COMPLETION', prompt: 'The primary raw material extracted from karst caves is _____ for concrete.', correctPattern: 'limestone', instruction: 'NO MORE THAN ONE WORD' },
        { id: 13, passage: 1, type: 'SUMMARY_COMPLETION', prompt: 'Canopy fragmentation forces bats to face dangers from power _____', correctPattern: 'grids', instruction: 'NO MORE THAN ONE WORD' }
      ]
    },

    {
      passageNumber: 2,
      title: 'Urban Vertical Architecture: Reimagining Megacities',
      subtitle: 'The engineering, ecological and psychological dimensions of high-density vertical living',
      paragraphs: [
        { label: 'A', text: 'As global urban populations swell toward an unprecedented 2.5 billion additional city dwellers by 2050, horizontal sprawl has reached an ecological and geographic impasse. Expanding outward consumes fertile agricultural land and escalates transportation emissions. In response, a visionary cadre of architects is pioneering vertical urbanism: consolidating residential, commercial, agricultural, and recreational functions within monumental skyward structures.' },
        { label: 'B', text: 'The structural foundations of supertall towers (exceeding 300 metres) harness high-performance composite concrete infused with carbon nanotubes, paired with aerodynamic tapering and tuned mass dampers. A tuned mass damper—essentially a suspended pendulum weighing hundreds of tonnes near the building apex—counteracts lethal lateral oscillations caused by typhoons and seismic tremors by oscillating in anti-phase to structural sway.' },
        { label: 'C', text: 'However, verticality is not merely an engineering triumph; it embodies a transformative paradigm in environmental resource cycling. State-of-the-art vertical developments integrate closed-loop microclimates, featuring high-rise vertical hydroponic farms irrigated by greywater harvested from domestic bathrooms. Photovoltaic façades and integrated wind turbines generate up to forty percent of internal energy needs. Natural biome pockets layered at alternating intervals absorb carbon dioxide and curb the heat-island effect.' },
        { label: 'D', text: 'Nevertheless, socio-psychological critiques of high-density vertical living remain prominent among urban sociologists. Early high-rise residential projects constructed in post-war Europe frequently engendered acute social isolation, feelings of claustrophobia, and a disconnect from street-level communal life. Critics argue that stacking thousands of citizens vertically can lead to transactional relationships unless communal "sky-parks" and shared dining precincts are woven into the interior architectural fabric.' },
        { label: 'E', text: 'Futuristic blueprints already feature elevated sky-bridges equipped with high-speed automated transit capsules connecting disparate towers at height. This horizontal connectivity above ground level promises to create multi-tiered cityscapes, turning the sky into a vibrant public realm while returning ground-level earth to ecological rewilding and pedestrian priority.' }
      ],
      questions: [
        { id: 14, passage: 2, type: 'MATCHING_HEADINGS', paragraphRef: 'Paragraph A', prompt: 'Choose the correct heading for Paragraph A:', headingsList: ['i. Technological innovations mitigating structural sway', 'ii. The ecological limits of outward suburban sprawl', 'iii. Closed-loop environmental systems and microclimates', 'iv. Social isolation concerns in high-density towers', 'v. Interconnected sky-bridges in the cities of tomorrow'], correctPattern: 'ii' },
        { id: 15, passage: 2, type: 'MATCHING_HEADINGS', paragraphRef: 'Paragraph B', prompt: 'Choose the correct heading for Paragraph B:', headingsList: ['i. Technological innovations mitigating structural sway', 'ii. The ecological limits of outward suburban sprawl', 'iii. Closed-loop environmental systems and microclimates', 'iv. Social isolation concerns in high-density towers', 'v. Interconnected sky-bridges in the cities of tomorrow'], correctPattern: 'i' },
        { id: 16, passage: 2, type: 'MATCHING_HEADINGS', paragraphRef: 'Paragraph C', prompt: 'Choose the correct heading for Paragraph C:', headingsList: ['i. Technological innovations mitigating structural sway', 'ii. The ecological limits of outward suburban sprawl', 'iii. Closed-loop environmental systems and microclimates', 'iv. Social isolation concerns in high-density towers', 'v. Interconnected sky-bridges in the cities of tomorrow'], correctPattern: 'iii' },
        { id: 17, passage: 2, type: 'MATCHING_HEADINGS', paragraphRef: 'Paragraph D', prompt: 'Choose the correct heading for Paragraph D:', headingsList: ['i. Technological innovations mitigating structural sway', 'ii. The ecological limits of outward suburban sprawl', 'iii. Closed-loop environmental systems and microclimates', 'iv. Social isolation concerns in high-density towers', 'v. Interconnected sky-bridges in the cities of tomorrow'], correctPattern: 'iv' },
        { id: 18, passage: 2, type: 'MATCHING_HEADINGS', paragraphRef: 'Paragraph E', prompt: 'Choose the correct heading for Paragraph E:', headingsList: ['i. Technological innovations mitigating structural sway', 'ii. The ecological limits of outward suburban sprawl', 'iii. Closed-loop environmental systems and microclimates', 'iv. Social isolation concerns in high-density towers', 'v. Interconnected sky-bridges in the cities of tomorrow'], correctPattern: 'v' },
        { id: 19, passage: 2, type: 'CLASSIFICATION', prompt: 'Tuned mass dampers function primarily to resist:', options: ['A. Internal electrical fires', 'B. Typhoons and seismic lateral tremors', 'C. Extreme temperature fluctuations'], correctPattern: 'B' },
        { id: 20, passage: 2, type: 'CLASSIFICATION', prompt: 'Hydroponic farms inside vertical towers are irrigated using:', options: ['A. Bottled drinking water', 'B. Recycled domestic greywater', 'C. Ocean seawater'], correctPattern: 'B' },
        { id: 21, passage: 2, type: 'CLASSIFICATION', prompt: 'What percentage of energy can building façades and turbines generate?', options: ['A. Up to 20 percent', 'B. Up to 40 percent', 'C. Up to 100 percent'], correctPattern: 'B' },
        { id: 22, passage: 2, type: 'CLASSIFICATION', prompt: 'Early post-war high-rises in Europe were criticized for causing:', options: ['A. Severe social isolation and claustrophobia', 'B. Excessive noise from street traffic', 'C. High construction costs only'], correctPattern: 'A' },
        { id: 23, passage: 2, type: 'MULTIPLE_CHOICE', prompt: 'A tuned mass damper essentially functions as a large:', options: ['A. Hydraulic pump', 'B. Suspended pendulum', 'C. Electronic gyroscope'], correctPattern: 'B' },
        { id: 24, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'Vertical gardens help curb the urban heat-_____ effect.', correctPattern: 'island', instruction: 'NO MORE THAN ONE WORD' },
        { id: 25, passage: 2, type: 'MULTIPLE_CHOICE', prompt: 'What architectural feature is recommended to foster communal bonding in vertical towers?', options: ['A. Private express elevators', 'B. Communal sky-parks and shared dining precincts', 'C. Soundproof walls only'], correctPattern: 'B' },
        { id: 26, passage: 2, type: 'MULTIPLE_CHOICE', prompt: 'Elevated sky-bridges allow ground-level earth to be returned to:', options: ['A. Industrial factories', 'B. Motorway interchanges', 'C. Ecological rewilding and pedestrian spaces'], correctPattern: 'C' }
      ]
    },

    {
      passageNumber: 3,
      title: 'The Cognitive Dawn: Unlocking the Evolutionary Roots of Human Language',
      subtitle: 'Archaeological, anatomical and genetic insights into human vocal communication',
      paragraphs: [
        { label: 'A', text: 'Unlike anatomical milestones such as bipedalism, spoken words leave behind no tangible fossil record. For over a century, evolutionary anthropologists debated whether language emerged abruptly through a single macromutation—a hypothesis championed by linguist Noam Chomsky—or coalesced incrementally across two million years of hominin evolution.' },
        { label: 'B', text: 'Recent paleogenetic breakthroughs have reshaped this inquiry. The identification of the FOXP2 gene in Neanderthal remains demonstrated that the neurological prerequisites for nuanced speech articulation were already established in the common ancestor shared with Homo sapiens over 500,000 years ago. Furthermore, excavations in Blombos Cave, South Africa, revealed engraved ochre plaques and pierced shell beads dating back 80,000 years, providing undeniable evidence of externalized symbolic thinking.' },
        { label: 'C', text: 'Cognitive scientists emphasize that early tool manufacture, such as composite hafted spears, required hierarchical planning mirroring sentence syntax. Yet, several evolutionary biologists remain skeptical of equating stone tool making directly with spoken dialogue, noting that mechanical skills can be transmitted through observational mimicry without verbal syntax.' },
        { label: 'D', text: 'Ultimately, language served as an intellectual catalyst that unlocked shared collective mythologies, inter-tribal treaties, and legal codes. As humans migrated across diverse ecological frontiers, flexible spoken grammar allowed our ancestors to outcompete archaic rivals, transforming Homo sapiens into a truly planetary species.' }
      ],
      questions: [
        { id: 27, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Noam Chomsky argued that human language evolved in a slow, gradual step-by-step process.', correctPattern: 'NO', contextQuote: '...whether language emerged abruptly through a single macromutation—a hypothesis championed by linguist Noam Chomsky...' },
        { id: 28, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'The FOXP2 gene was discovered in ancient Neanderthal remains.', correctPattern: 'YES', contextQuote: 'The identification of the FOXP2 gene in Neanderthal remains demonstrated...' },
        { id: 29, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'The shell beads at Blombos Cave were the oldest jewelry ever discovered in world history.', correctPattern: 'NOT GIVEN', contextQuote: '...excavations in Blombos Cave... revealed engraved ochre plaques and pierced shell beads dating back 80,000 years...' },
        { id: 30, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Constructing composite tools requires hierarchical planning similar to grammatical syntax.', correctPattern: 'YES', contextQuote: 'Cognitive scientists emphasize that early tool manufacture... required hierarchical planning mirroring sentence syntax.' },
        { id: 31, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'All evolutionary scientists agree that making stone tools proves the existence of spoken language.', correctPattern: 'NO', contextQuote: 'Yet, several evolutionary biologists remain skeptical of equating stone tool making directly with spoken dialogue...' },
        { id: 32, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Cave art at Chauvet was created using paint brushes made from animal hair.', correctPattern: 'NOT GIVEN', contextQuote: 'No mention of brush material.' },
        { id: 33, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Language was primarily useful only for basic food gathering and alarm warnings.', correctPattern: 'NO', contextQuote: 'Language was not merely an instrumental invention... it unlocked shared collective mythologies...' },
        { id: 34, passage: 3, type: 'MULTIPLE_CHOICE', prompt: 'Why is tracing the origin of language uniquely difficult for archaeologists?', options: ['A. Ancient languages used too few consonants', 'B. Spoken words leave no physical fossil remains', 'C. Modern computers cannot model vocal chords'], correctPattern: 'B' },
        { id: 35, passage: 3, type: 'MULTIPLE_CHOICE', prompt: 'What did the engraved ochre plaques at Blombos Cave prove?', options: ['A. The beginning of farming', 'B. Externalized symbolic thinking', 'C. The invention of paper'], correctPattern: 'B' },
        { id: 36, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'The speech gene identified in Neanderthals is called _____', correctPattern: 'FOXP2', instruction: 'NO MORE THAN ONE WORD' },
        { id: 37, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'Hierarchical tool making parallels the structural architecture of sentence _____', correctPattern: 'syntax', instruction: 'NO MORE THAN ONE WORD' },
        { id: 38, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'Skeptics argue stone tools could be copied through visual _____ without speaking.', correctPattern: 'mimicry', instruction: 'NO MORE THAN ONE WORD' },
        { id: 39, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'Language acted as an intellectual _____ that fostered collective mythologies.', correctPattern: 'catalyst', instruction: 'NO MORE THAN ONE WORD' },
        { id: 40, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'Flexible grammar transformed Homo sapiens into a truly _____ species.', correctPattern: 'planetary', instruction: 'NO MORE THAN ONE WORD' }
      ]
    }
  ]
};

// =========================================================================
// 3. ĐỀ THI GENERAL TRAINING READING (3 SECTIONS - 40 CÂU HỎI)
// =========================================================================
const IELTS_GENERAL_READING_EXAM_DATA = {
  id: 'general-reading-01',
  title: 'Cambridge Official Practice - IELTS General Training Reading Test 1',
  timeAllowedMinutes: 60,
  totalQuestions: 40,
  passages: [
    {
      passageNumber: 1,
      title: 'Section 1: Daily Social Survival & Public Notices',
      subtitle: 'Part 1A: Community Sports Centre Regulations & Part 1B: City Library Lending Guidelines',
      paragraphs: [
        { label: 'Notice 1', text: 'COMMUNITY SPORTS CENTRE MEMBERSHIP RULES: All fitness club members must present their digital membership barcode at the electronic turnstiles upon entry. Lockers in changing rooms operate using a refundable £1 coin. Lockers must be cleared every evening; any possessions left overnight will be transferred to Lost Property and discarded after 14 days. The Olympic swimming pool is reserved exclusively for swim squad training between 6:00 AM and 8:30 AM on weekdays. Free personal training inductions must be booked at least 48 hours in advance through the online portal.' },
        { label: 'Notice 2', text: 'METROPOLITAN LIBRARY LENDING POLICIES: Cardholders may borrow up to 12 physical books for an initial duration of 21 days. Audiobooks and educational DVDs are restricted to a 14-day borrowing loan. Items can be renewed up to three times online, provided no other patron has placed an active reservation on the title. Overdue items will incur a daily penalty fine of 25 pence per volume. Replacement charges for severely damaged or missing volumes will reflect the full original retail price plus a £5 non-refundable administrative processing fee.' }
      ],
      questions: [
        { id: 1, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Sports centre members must show their physical paper card at the entrance.', correctPattern: 'FALSE', contextQuote: '...must present their digital membership barcode at the electronic turnstiles...' },
        { id: 2, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Locker £1 coins are returned to members after use.', correctPattern: 'TRUE', contextQuote: 'Lockers in changing rooms operate using a refundable £1 coin.' },
        { id: 3, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Unclaimed locker belongings are kept permanently in Lost Property.', correctPattern: 'FALSE', contextQuote: '...will be transferred to Lost Property and discarded after 14 days.' },
        { id: 4, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'The swimming pool is open for casual public swimming at 7:00 AM on Tuesdays.', correctPattern: 'FALSE', contextQuote: '...reserved exclusively for swim squad training between 6:00 AM and 8:30 AM on weekdays.' },
        { id: 5, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Personal training inductions require booking two days in advance.', correctPattern: 'TRUE', contextQuote: '...must be booked at least 48 hours in advance through the online portal.' },
        { id: 6, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'A library cardholder can borrow up to 20 books simultaneously.', correctPattern: 'FALSE', contextQuote: 'Cardholders may borrow up to 12 physical books...' },
        { id: 7, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Audiobooks can be borrowed for a longer period than printed books.', correctPattern: 'FALSE', contextQuote: 'Audiobooks and educational DVDs are restricted to a 14-day borrowing loan (vs 21 days for books).' },
        { id: 8, passage: 1, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Items cannot be renewed if another borrower has requested them.', correctPattern: 'TRUE', contextQuote: '...provided no other patron has placed an active reservation on the title.' },
        { id: 9, passage: 1, type: 'SHORT_ANSWER', prompt: 'What fee is charged daily for overdue library books?', correctPattern: '25 pence / 25p', instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
        { id: 10, passage: 1, type: 'SHORT_ANSWER', prompt: 'What administrative fee is added when replacing a lost book?', correctPattern: '£5 / 5 pounds / five pounds', instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
        { id: 11, passage: 1, type: 'SHORT_ANSWER', prompt: 'How long can a member borrow a physical book before renewing?', correctPattern: '21 days / three weeks', instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
        { id: 12, passage: 1, type: 'SHORT_ANSWER', prompt: 'Where are overnight locker items taken?', correctPattern: 'Lost Property', instruction: 'NO MORE THAN TWO WORDS' },
        { id: 13, passage: 1, type: 'SHORT_ANSWER', prompt: 'What must members book online 48 hours in advance?', correctPattern: '(personal training) inductions / induction', instruction: 'NO MORE THAN TWO WORDS' },
        { id: 14, passage: 1, type: 'SHORT_ANSWER', prompt: 'Maximum number of online renewals allowed per book:', correctPattern: '3 / three (times)', instruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' }
      ]
    },

    {
      passageNumber: 2,
      title: 'Section 2: Workplace Survival & Employment Policies',
      subtitle: 'Health & Safety at Work & Annual Performance Review Guidelines',
      paragraphs: [
        { label: 'Policy A', text: 'OCCUPATIONAL HEALTH AND DISPLAY SCREEN GUIDELINES: Employees who spend more than four cumulative hours daily operating desktop computers are entitled to workstation ergonomic assessments. Employers must provide adjustable chairs with lumbar support and anti-glare screen filters upon request. Staff are required to take a five-to-ten minute postural change break every sixty minutes of continuous typing. Annual eyesight examinations are funded entirely by the company through accredited optometry providers. In the event of repetitive strain injury (RSI) symptoms, employees must report immediately to the designated Health and Safety Representative.' },
        { label: 'Policy B', text: 'ANNUAL PERFORMANCE EVALUATION PROCEDURES: The annual staff appraisal comprises three sequential stages. First, employees submit a self-assessment document evaluating their key performance indicators (KPIs) by October 15th. Second, a formal face-to-face review with the departmental line manager takes place in mid-November. Finally, written objectives for the subsequent fiscal year are jointly established and signed. Outstanding performance ratings may result in discretionary merit bonuses or eligibility for the Accelerated Leadership Fellowship.' }
      ],
      questions: [
        { id: 15, passage: 2, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Ergonomic assessments are available only to senior corporate managers.', correctPattern: 'FALSE', contextQuote: 'Employees who spend more than four cumulative hours daily... are entitled to workstation ergonomic assessments.' },
        { id: 16, passage: 2, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Employees must pay half the cost of their annual eyesight test.', correctPattern: 'FALSE', contextQuote: 'Annual eyesight examinations are funded entirely by the company...' },
        { id: 17, passage: 2, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Typists are advised to take a postural break every hour.', correctPattern: 'TRUE', contextQuote: 'Staff are required to take a five-to-ten minute postural change break every sixty minutes...' },
        { id: 18, passage: 2, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'The staff appraisal process consists of three distinct stages.', correctPattern: 'TRUE', contextQuote: 'The annual staff appraisal comprises three sequential stages.' },
        { id: 19, passage: 2, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'Self-assessment forms must be submitted no later than October 15th.', correctPattern: 'TRUE', contextQuote: '...employees submit a self-assessment document... by October 15th.' },
        { id: 20, passage: 2, type: 'TRUE_FALSE_NOT_GIVEN', prompt: 'All employees receive an identical monetary bonus at the end of the year.', correctPattern: 'FALSE', contextQuote: 'Outstanding performance ratings may result in discretionary merit bonuses...' },
        { id: 21, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'Workstation assessments are granted to staff operating computers over _____ hours daily.', correctPattern: '4 / four', instruction: 'NO MORE THAN ONE WORD AND/OR A NUMBER' },
        { id: 22, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'Office chairs provided must include support for the _____ spine.', correctPattern: 'lumbar', instruction: 'NO MORE THAN ONE WORD' },
        { id: 23, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'Symptoms of repetitive strain injury must be reported to the Health and Safety _____', correctPattern: 'Representative', instruction: 'NO MORE THAN ONE WORD' },
        { id: 24, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'Face-to-face performance meetings take place during the month of _____', correctPattern: 'November', instruction: 'NO MORE THAN ONE WORD' },
        { id: 25, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'Exceptional appraisal scores may lead to the Accelerated Leadership _____', correctPattern: 'Fellowship', instruction: 'NO MORE THAN ONE WORD' },
        { id: 26, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'Screen filters provided to staff are designed to reduce _____', correctPattern: 'glare / anti-glare', instruction: 'NO MORE THAN ONE WORD' },
        { id: 27, passage: 2, type: 'SUMMARY_COMPLETION', prompt: 'In stage three, objectives are set for the subsequent _____ year.', correctPattern: 'fiscal', instruction: 'NO MORE THAN ONE WORD' }
      ]
    },

    {
      passageNumber: 3,
      title: 'Section 3: General Reading on the History of Mechanical Timekeeping',
      subtitle: 'From sundials and water clocks to the spring-driven clocks that transformed modern life',
      paragraphs: [
        { label: 'A', text: 'Before the invention of mechanical timepieces, civilizations relied on astronomical cycles and hydraulic flow. In ancient Egypt and Babylon, shadow sticks and water clocks (clepsydrae) measured the passage of daytime and nighttime intervals. However, water clocks suffered severe inaccuracies caused by variations in water temperature and sediment clogging the drainage orifices. A radically new mechanism was necessary to regulate human labour in an industrializing world.' },
        { label: 'B', text: 'The monumental turning point arrived in medieval Europe around 1300 CE with the invention of the mechanical escapement. The escapement mechanism converted continuous kinetic energy from falling counterweights into alternating, rhythmic ticks. Monasteries were among the earliest institutions to erect monumental bell tower clocks, ensuring monks observed strict prayer schedules regardless of cloudy weather or darkness.' },
        { label: 'C', text: 'In the seventeenth century, Dutch polymath Christiaan Huygens introduced the pendulum clock in 1656. By harnessing harmonic oscillation, Huygens reduced clock timekeeping errors from fifteen minutes per day to less than ten seconds, facilitating modern scientific experiments and maritime navigation charting.' }
      ],
      questions: [
        { id: 28, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Ancient water clocks were entirely immune to climate variations.', correctPattern: 'NO', contextQuote: '...water clocks suffered severe inaccuracies caused by variations in water temperature...' },
        { id: 29, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'The mechanical escapement was invented around 1300 CE in medieval Europe.', correctPattern: 'YES', contextQuote: 'The monumental turning point arrived in medieval Europe around 1300 CE...' },
        { id: 30, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Monasteries adopted clocks primarily to regulate commercial trade transactions.', correctPattern: 'NO', contextQuote: '...ensuring monks observed strict prayer schedules regardless of cloudy weather...' },
        { id: 31, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Christiaan Huygens was an English astronomer working in London.', correctPattern: 'NO', contextQuote: 'Dutch polymath Christiaan Huygens introduced the pendulum clock...' },
        { id: 32, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'The pendulum clock reduced daily timekeeping errors to less than ten seconds.', correctPattern: 'YES', contextQuote: '...reduced clock timekeeping errors from fifteen minutes per day to less than ten seconds...' },
        { id: 33, passage: 3, type: 'YES_NO_NOT_GIVEN', prompt: 'Huygens earned a large fortune selling clocks across Europe.', correctPattern: 'NOT GIVEN', contextQuote: 'No mention of commercial profit.' },
        { id: 34, passage: 3, type: 'MULTIPLE_CHOICE', prompt: 'What did water clocks depend on to measure time?', options: ['A. Burning candles', 'B. Hydraulic flow through orifices', 'C. Falling lead weights'], correctPattern: 'B' },
        { id: 35, passage: 3, type: 'MULTIPLE_CHOICE', prompt: 'What critical invention converted continuous weight fall into rhythmic ticks?', options: ['A. The pendulum', 'B. The mechanical escapement', 'C. The solar lens'], correctPattern: 'B' },
        { id: 36, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'Ancient Egyptian water clocks were known technically as _____', correctPattern: 'clepsydrae', instruction: 'NO MORE THAN ONE WORD' },
        { id: 37, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'The earliest institutional users of mechanical bell clocks were medieval _____', correctPattern: 'monasteries', instruction: 'NO MORE THAN ONE WORD' },
        { id: 38, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'Huygens invented the pendulum clock in the year _____', correctPattern: '1656', instruction: 'A NUMBER ONLY' },
        { id: 39, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'The pendulum utilized harmonic _____ to achieve precision.', correctPattern: 'oscillation', instruction: 'NO MORE THAN ONE WORD' },
        { id: 40, passage: 3, type: 'SUMMARY_COMPLETION', prompt: 'Improved clock accuracy facilitated scientific research and maritime _____', correctPattern: 'navigation', instruction: 'NO MORE THAN ONE WORD' }
      ]
    }
  ]
};

// =========================================================================
// 4. BẢNG MÔ TẢ NĂNG LỰC BAND ĐIỂM & QUY TẮC LÀM TRÒN CHUẨN CAMBRIDGE
// =========================================================================
const IELTS_BAND_COMPETENCY_DESCRIPTIONS = {
  9.0: {
    band: 9.0,
    title: 'Expert User (Thông thạo xuất sắc)',
    cefr: 'C2',
    descEn: 'Has fully operational command of the language: appropriate, accurate and fluent with complete understanding.',
    descVi: 'Hoàn toàn làm chủ ngôn ngữ: chuẩn xác, lưu loát, thấu hiểu toàn diện không chút trở ngại.',
    acceptanceNote: 'Vượt qua mọi yêu cầu đầu vào của tất cả các trường đại học hàng đầu thế giới (Oxford, Cambridge, Harvard, MIT...).'
  },
  8.5: {
    band: 8.5,
    title: 'Very Good User (Rất tốt - Tiệm cận xuất sắc)',
    cefr: 'C2',
    descEn: 'Has fully operational command of the language with only occasional unsystematic inaccuracies and inappropriacies. Handles complex detailed argumentation well.',
    descVi: 'Làm chủ ngôn ngữ gần như hoàn hảo, chỉ thỉnh thoảng mắc những lỗi nhỏ ngẫu nhiên không mang tính hệ thống. Lập luận phức tạp rất tốt.',
    acceptanceNote: 'Đạt điều kiện nhập học tất cả các chương trình Thạc sĩ, Tiến sĩ và học bổng danh giá toàn cầu.'
  },
  8.0: {
    band: 8.0,
    title: 'Very Good User (Rất tốt)',
    cefr: 'C2',
    descEn: 'Has fully operational command of the language with only occasional unsystematic inaccuracies. Misunderstandings may occur in unfamiliar situations.',
    descVi: 'Sử dụng ngôn ngữ rất tốt, xử lý tốt các tình huống tranh luận học thuật chuyên sâu.',
    acceptanceNote: 'Vượt xa tiêu chuẩn xét tuyển của các ngành khó như Y khoa, Luật khoa tại Anh, Úc, Mỹ.'
  },
  7.5: {
    band: 7.5,
    title: 'Good User (Tốt - Nâng cao)',
    cefr: 'C1',
    descEn: 'Has operational command of the language, though with occasional inaccuracies, inappropriacies and misunderstandings in some situations. Generally handles complex language well.',
    descVi: 'Nắm vững ngôn ngữ, xử lý tốt ngôn ngữ phức tạp và hiểu lập luận chi tiết.',
    acceptanceNote: 'Được hầu hết các trường đại học danh tiếng tại Anh, Úc, Canada, Mỹ chấp nhận trực tiếp không cần học khóa bổ trợ.'
  },
  7.0: {
    band: 7.0,
    title: 'Good User (Tốt)',
    cefr: 'C1',
    descEn: 'Has operational command of the language. Generally handles complex language well and understands detailed reasoning.',
    descVi: 'Sử dụng ngôn ngữ tốt, vận dụng trôi chảy câu phức và từ vựng học thuật trong hầu hết hoàn cảnh.',
    acceptanceNote: 'Chuẩn đầu vào tiêu chuẩn của các trường đại học nhóm Russell Group (Anh) và Go8 (Úc).'
  },
  6.5: {
    band: 6.5,
    title: 'Competent User (Khá - Ngưỡng Du Học Tiêu Chuẩn)',
    cefr: 'B2',
    descEn: 'Has generally effective command of the language despite some inaccuracies, inappropriacies and misunderstandings. Can use and understand fairly complex language, particularly in familiar situations.',
    descVi: 'Sử dụng ngôn ngữ nhìn chung hiệu quả dù đôi chỗ còn thiếu sót. Có thể sử dụng tốt câu phức trong bối cảnh quen thuộc.',
    acceptanceNote: '★ Mức điểm 6.0 - 7.0 thường được các trường đại học tại Anh, Úc, New Zealand, Canada và Mỹ chấp nhận nhập học chương trình Cử nhân & Thạc sĩ.'
  },
  6.0: {
    band: 6.0,
    title: 'Competent User (Khá)',
    cefr: 'B2',
    descEn: 'Has generally effective command of the language despite inaccuracies. Adequate for basic academic studies.',
    descVi: 'Đạt ngưỡng giao tiếp và học tập căn bản, đủ điều kiện xét tuyển Cử nhân tại nhiều quốc gia nói tiếng Anh.',
    acceptanceNote: '★ Mức điểm 6.0 - 7.0 thường được các trường đại học tại Anh, Úc, New Zealand, Canada và Mỹ chấp nhận.'
  },
  5.5: {
    band: 5.5,
    title: 'Modest User (Trung bình khá)',
    cefr: 'B2',
    descEn: 'Has partial command of the language, coping with overall meaning in most situations, though is likely to make many mistakes.',
    descVi: 'Nắm được nghĩa tổng thể trong hầu hết tình huống, nhưng còn mắc nhiều lỗi ngữ pháp và từ vựng.',
    acceptanceNote: 'Thường yêu cầu học thêm khóa tiếng Anh dự bị (Pre-sessional English) 10-20 tuần trước khi vào khóa chính.'
  },
  5.0: {
    band: 5.0,
    title: 'Modest User (Trung bình)',
    cefr: 'B1',
    descEn: 'Partial command of language, struggles with complex structures.',
    descVi: 'Năng lực ngôn ngữ ở mức cơ bản, gặp khó khăn với cấu trúc câu phức.',
    acceptanceNote: 'Đạt chuẩn cho các chương trình Cao đẳng, Đào tạo nghề hoặc diện định cư tay nghề cơ bản.'
  },
  4.5: {
    band: 4.5,
    title: 'Limited User (Hạn chế)',
    cefr: 'B1',
    descEn: 'Basic competence is limited to familiar situations with frequent problems in understanding and expression.',
    descVi: 'Năng lực cơ bản bị giới hạn trong các tình huống quen thuộc, thường xuyên gặp trở ngại.',
    acceptanceNote: 'Cần các khóa bổ túc tiếng Anh chuyên sâu kéo dài.'
  },
  4.0: {
    band: 4.0,
    title: 'Limited User (Hạn chế)',
    cefr: 'B1',
    descEn: 'Basic competence is limited to familiar situations.',
    descVi: 'Khả năng cơ bản giới hạn trong những tình huống quen thuộc.',
    acceptanceNote: 'Cần các khóa bổ túc tiếng Anh chuyên sâu kéo dài.'
  },
  3.5: {
    band: 3.5,
    title: 'Extremely Limited User',
    cefr: 'A2',
    descEn: 'Conveys and understands only general meaning in very familiar situations.',
    descVi: 'Chỉ hiểu và truyền tải được ý nghĩa chung trong các tình huống cực kỳ quen thuộc.',
    acceptanceNote: 'Chưa đủ điều kiện tham gia các khóa học học thuật.'
  },
  3.0: {
    band: 3.0,
    title: 'Extremely Limited User',
    cefr: 'A2',
    descEn: 'Understands only general meaning in very familiar situations.',
    descVi: 'Chỉ hiểu được ý nghĩa chung trong các tình huống cực kỳ quen thuộc.',
    acceptanceNote: 'Chưa đủ điều kiện tham gia các khóa học học thuật.'
  },
  2.5: {
    band: 2.5,
    title: 'Intermittent User',
    cefr: 'A1',
    descEn: 'No real communication is possible except for the most basic information.',
    descVi: 'Gần như không thể giao tiếp trừ những thông tin hết sức đơn giản.',
    acceptanceNote: 'Cần bắt đầu lại từ chương trình mất gốc A1.'
  },
  2.0: {
    band: 2.0,
    title: 'Intermittent User (Ngắt quãng)',
    cefr: 'A1',
    descEn: 'No real communication is possible except for the most basic information using isolated words or short formulae in familiar situations.',
    descVi: 'Không thể giao tiếp thực sự ngoại trừ những thông tin cơ bản nhất bằng các từ đơn lẻ.',
    acceptanceNote: 'Chưa đủ điều kiện xét tuyển học thuật quốc tế.'
  },
  1.5: {
    band: 1.5,
    title: 'Non User (Tiệm cận)',
    cefr: 'Pre-A1',
    descEn: 'Essentially has no ability to use the language beyond possibly a few isolated words.',
    descVi: 'Chưa có khả năng sử dụng tiếng Anh ngoài một số từ đơn lập.',
    acceptanceNote: 'Cần tham gia lộ trình củng cố nền tảng tiếng Anh căn bản.'
  },
  1.0: {
    band: 1.0,
    title: 'Non User (Không sử dụng được tiếng Anh)',
    cefr: 'Pre-A1',
    descEn: 'Essentially has no ability to use the language beyond possibly a few isolated words.',
    descVi: 'Về cơ bản không có khả năng sử dụng tiếng Anh ngoài một vài từ ngữ đơn lẻ rời rạc.',
    acceptanceNote: 'Không đủ điều kiện nhập học hoặc định cư.'
  }
};

// Hàm tính Overall Band Score theo quy chế làm tròn chuẩn Cambridge:
// - Số thập phân < 0.25 -> làm tròn xuống .0 (vd 6.125 -> 6.0)
// - Số thập phân >= 0.25 và < 0.75 -> làm tròn thành .5 (vd 6.25 -> 6.5, 6.375 -> 6.5, 6.625 -> 6.5)
// - Số thập phân >= 0.75 -> làm tròn lên .0 (vd 6.75 -> 7.0, 6.875 -> 7.0)
function calculateIeltsOverallBand(listening, reading, writing, speaking) {
  const l = parseFloat(listening) || 0;
  const r = parseFloat(reading) || 0;
  const w = parseFloat(writing) || 0;
  const s = parseFloat(speaking) || 0;
  const avg = (l + r + w + s) / 4;
  const decimal = avg - Math.floor(avg);
  let rounded;
  if (decimal < 0.25) {
    rounded = Math.floor(avg);
  } else if (decimal < 0.75) {
    rounded = Math.floor(avg) + 0.5;
  } else {
    rounded = Math.ceil(avg);
  }
  return Math.min(9.0, Math.max(0, rounded));
}

if (typeof window !== 'undefined') {
  window.IELTS_BAND_CONVERSION = IELTS_BAND_CONVERSION;
  window.IELTS_BAND_COMPETENCY_DESCRIPTIONS = IELTS_BAND_COMPETENCY_DESCRIPTIONS;
  window.calculateIeltsOverallBand = calculateIeltsOverallBand;
  window.IELTS_LISTENING_EXAM_DATA = IELTS_LISTENING_EXAM_DATA;
  window.IELTS_ACADEMIC_READING_EXAM_DATA = IELTS_ACADEMIC_READING_EXAM_DATA;
  window.IELTS_GENERAL_READING_EXAM_DATA = IELTS_GENERAL_READING_EXAM_DATA;
}
