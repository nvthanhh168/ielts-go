"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAMBRIDGE_LISTENING_TEST_1 = void 0;
/**
 * ĐỀ THI MẪU IELTS LISTENING CHUẨN CAMBRIDGE (4 SECTIONS - 40 CÂU HỎI)
 * Đầy đủ 7 dạng bài khảo thí quốc tế & liên kết với các file Audio có sẵn trên máy:
 * - Test 1 - Section 1.mp3
 * - Test 1 - Section 2.mp3
 * - Test 1 - Section 3.mp3
 * - Test 1 - Section 4.mp3
 */
exports.CAMBRIDGE_LISTENING_TEST_1 = {
    id: 'cam-4-test-1',
    title: 'Cambridge Practice Tests for IELTS 4 - Test 1',
    series: 'Cambridge Official Examination Papers',
    totalQuestions: 40,
    listeningTimeMinutes: 30,
    transferTimeMinutes: 10,
    sections: [
        // --------------------------------------------------------------------------
        // SECTION 1: CÂU 1 - 10 (Giao tiếp đời sống: Hỏi thông tin thuê nhà/nghỉ dưỡng)
        // Dạng bài: Notes/Form completion & Short-answer
        // Giới hạn từ: NO MORE THAN THREE WORDS AND/OR A NUMBER
        // --------------------------------------------------------------------------
        {
            sectionNumber: 1,
            title: 'Section 1: Accommodation Inquiry - Holiday Rental Form',
            contextDescription: 'A conversation between a customer and a travel agency representative arranging holiday cottage accommodation.',
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
MAN: Yes, there is a private garage attached to the property.
OFFICER: Now, regarding the rental dates, when would you like to arrive?
MAN: We are looking at the 14th of July, for two weeks, so leaving on the 28th of July.
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
                    correctAnswerPattern: '01732 55890 // 0173255890',
                    wordLimit: { maxWords: 1, allowNumber: true, rawInstruction: 'NO MORE THAN ONE WORD AND/OR A NUMBER' },
                    contextSentence: 'Telephone number: _____',
                    tapescriptSnippet: 'MAN: It\'s 01732 55890.',
                },
                {
                    id: 2,
                    section: 1,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Total number of guests staying at the cottage:',
                    correctAnswerPattern: '4 // four // 4 people // four people',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Number of people: _____',
                    tapescriptSnippet: 'MAN: There will be four of us in total: two adults and two children.',
                },
                {
                    id: 3,
                    section: 1,
                    type: 'SHORT_ANSWER',
                    prompt: 'Name of the recommended coastal cottage:',
                    correctAnswerPattern: 'Kingfisher Lodge // Kingfisher',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Name of cottage: _____ Lodge',
                    tapescriptSnippet: 'OFFICER: Then what about Kingfisher Lodge? It is situated right beside the coastal path...',
                },
                {
                    id: 4,
                    section: 1,
                    type: 'SENTENCE_COMPLETION',
                    prompt: 'Walking distance to the sea:',
                    correctAnswerPattern: '5 minutes // five minutes // 5 mins // five mins',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Distance to sea: only _____ walk',
                    tapescriptSnippet: '...only five minutes walk from the sea.',
                },
                {
                    id: 5,
                    section: 1,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Number of bedrooms in Kingfisher Lodge:',
                    correctAnswerPattern: '3 // three // 3 bedrooms // three bedrooms',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Bedrooms: _____',
                    tapescriptSnippet: 'OFFICER: It has three bedrooms, two bathrooms...',
                },
                {
                    id: 6,
                    section: 1,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Parking facility provided:',
                    correctAnswerPattern: '(private) garage // garage',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Vehicle parking: in a _____',
                    tapescriptSnippet: 'MAN: Yes, there is a private garage attached to the property.',
                },
                {
                    id: 7,
                    section: 1,
                    type: 'SHORT_ANSWER',
                    prompt: 'Planned arrival date in July:',
                    correctAnswerPattern: '14th July // 14 July // July 14th // July 14 // 14th of July',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Arrival date: _____',
                    tapescriptSnippet: 'MAN: We are looking at the 14th of July, for two weeks...',
                },
                {
                    id: 8,
                    section: 1,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Total rental cost for two weeks in pounds:',
                    correctAnswerPattern: '650 // £650 // 650 pounds // six hundred and fifty',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Total price: £_____',
                    tapescriptSnippet: 'OFFICER: The total price comes to 650 pounds, which includes all utility bills...',
                },
                {
                    id: 9,
                    section: 1,
                    type: 'SHORT_ANSWER',
                    prompt: 'Pet allowed to bring along:',
                    correctAnswerPattern: '(small) dog // dog',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Customer pet: a _____',
                    tapescriptSnippet: 'MAN: Does the lodge allow pets? We have a small dog.',
                },
                {
                    id: 10,
                    section: 1,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Additional deposit required for bringing a pet:',
                    correctAnswerPattern: '50 // £50 // 50 pounds // fifty pounds',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Pet deposit: £_____',
                    tapescriptSnippet: 'OFFICER: Yes, pets are permitted, but there is an extra deposit of 50 pounds required.',
                },
            ],
        },
        // --------------------------------------------------------------------------
        // SECTION 2: CÂU 11 - 20 (Thông tin công cộng: Hướng dẫn tham quan bảo tàng & công viên)
        // Dạng bài: Multiple choice & Map / Diagram Labelling
        // --------------------------------------------------------------------------
        {
            sectionNumber: 2,
            title: 'Section 2: City Botanical Park & Heritage Centre Guide',
            contextDescription: 'A tour manager introducing facilities, seasonal events and orientation map of the Greenfields Heritage Park.',
            audioFilename: 'Test 1 - Section 2.mp3',
            audioDurationSeconds: 360,
            fullTapescript: `
GUIDE: Good afternoon everyone, and welcome to Greenfields Heritage Park and Botanical Centre.
Before we start our walking tour, let me give you some background. The park was established back in 1885, initially as a private arboretum for rare botanical species. It was opened to the public in 1920.
Today, the park covers over forty hectares.
If you look at your visitor maps, we are currently standing at the Main Entrance, right by the ticket booth. Directly in front of you, heading north along the central avenue, you will see the Rose Garden.
To the west of the central avenue, behind the cafe, is the Children's Adventure Playground.
If you take the path leading to the right - that is to the east - you will cross the wooden bridge over the stream. Just past the bridge on your left is the Heritage Museum.
Right at the northern end of the park, overlooking the lake, is our famous Victorian Glasshouse, which houses tropical orchids from around the world.
Now, concerning special activities today, at 2:30 pm there is a guided bird-watching walk starting from the lake pavilion. Admission is completely free, but you need to register at the information desk.
For lunch, our Organic Cafe serves locally sourced hot meals until 3:00 pm, and afternoon tea until 5:00 pm.
Please remember that cycling is not permitted on the footpath, and all rubbish must be deposited in the recycling bins provided.
`,
            questions: [
                {
                    id: 11,
                    section: 2,
                    type: 'MULTIPLE_CHOICE',
                    prompt: 'In which year was Greenfields Heritage Park first opened to the public?',
                    options: ['A. 1885', 'B. 1920', 'C. 1945'],
                    correctAnswerPattern: 'B // 1920',
                    tapescriptSnippet: 'It was opened to the public in 1920.',
                },
                {
                    id: 12,
                    section: 2,
                    type: 'MULTIPLE_CHOICE',
                    prompt: 'What is the total area covered by the park today?',
                    options: ['A. 14 hectares', 'B. 40 hectares', 'C. 400 hectares'],
                    correctAnswerPattern: 'B // 40 hectares // 40',
                    tapescriptSnippet: 'Today, the park covers over forty hectares.',
                },
                {
                    id: 13,
                    section: 2,
                    type: 'MULTIPLE_CHOICE',
                    prompt: 'What must visitors do if they wish to join the guided bird-watching walk?',
                    options: [
                        'A. Pay an entry fee of 5 pounds',
                        'B. Bring their own binoculars',
                        'C. Register at the information desk',
                    ],
                    correctAnswerPattern: 'C // Register at the information desk',
                    tapescriptSnippet: 'Admission is completely free, but you need to register at the information desk.',
                },
                {
                    id: 14,
                    section: 2,
                    type: 'MULTIPLE_CHOICE',
                    prompt: 'Until what time are hot meals served at the Organic Cafe?',
                    options: ['A. 2:30 pm', 'B. 3:00 pm', 'C. 5:00 pm'],
                    correctAnswerPattern: 'B // 3:00 pm // 3 pm // 3.00 pm',
                    tapescriptSnippet: '...serves locally sourced hot meals until 3:00 pm, and afternoon tea until 5:00 pm.',
                },
                {
                    id: 15,
                    section: 2,
                    type: 'MULTIPLE_CHOICE',
                    prompt: 'Which activity is strictly prohibited on the park footpaths?',
                    options: ['A. Photography', 'B. Eating snacks', 'C. Cycling'],
                    correctAnswerPattern: 'C // Cycling',
                    tapescriptSnippet: 'Please remember that cycling is not permitted on the footpath...',
                },
                {
                    id: 16,
                    section: 2,
                    type: 'MAP_LABELLING',
                    prompt: 'Map location: Directly north along the central avenue from the entrance:',
                    correctAnswerPattern: 'Rose Garden // (the) Rose Garden',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Feature north of entrance: _____',
                    tapescriptSnippet: 'Directly in front of you, heading north along the central avenue, you will see the Rose Garden.',
                },
                {
                    id: 17,
                    section: 2,
                    type: 'MAP_LABELLING',
                    prompt: 'Map location: Area situated to the west of the central avenue, behind the cafe:',
                    correctAnswerPattern: "(Children's) Adventure Playground // Adventure Playground // Playground",
                    wordLimit: { maxWords: 3, allowNumber: false, rawInstruction: 'NO MORE THAN THREE WORDS' },
                    contextSentence: 'West area: _____',
                    tapescriptSnippet: "To the west of the central avenue, behind the cafe, is the Children's Adventure Playground.",
                },
                {
                    id: 18,
                    section: 2,
                    type: 'MAP_LABELLING',
                    prompt: 'Map location: Building found just past the wooden bridge on the left:',
                    correctAnswerPattern: 'Heritage Museum // Museum',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'East across the bridge: _____',
                    tapescriptSnippet: 'Just past the bridge on your left is the Heritage Museum.',
                },
                {
                    id: 19,
                    section: 2,
                    type: 'MAP_LABELLING',
                    prompt: 'Map location: Building situated at the northern end of the park overlooking the lake:',
                    correctAnswerPattern: '(Victorian) Glasshouse // Glasshouse',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Northern lake edge: _____',
                    tapescriptSnippet: 'Right at the northern end of the park, overlooking the lake, is our famous Victorian Glasshouse...',
                },
                {
                    id: 20,
                    section: 2,
                    type: 'SHORT_ANSWER',
                    prompt: 'Type of plants housed in the Victorian Glasshouse:',
                    correctAnswerPattern: '(tropical) orchids // orchids',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Plants displayed: _____',
                    tapescriptSnippet: '...which houses tropical orchids from around the world.',
                },
            ],
        },
        // --------------------------------------------------------------------------
        // SECTION 3: CÂU 21 - 30 (Học thuật: Thảo luận dự án nghiên cứu giữa sinh viên & giáo sư)
        // Dạng bài: Classification, Matching & Table completion
        // --------------------------------------------------------------------------
        {
            sectionNumber: 3,
            title: 'Section 3: Environmental Science Research Project Tutorial',
            contextDescription: 'Two students, Jack and Sarah, discussing their group research assignment on water conservation with their university tutor.',
            audioFilename: 'Test 1 - Section 3.mp3',
            audioDurationSeconds: 350,
            fullTapescript: `
TUTOR: Come in Jack, Sarah. Take a seat. How is your environmental science project on water conservation coming along?
SARAH: Well, Professor, we have collected most of our field survey data from domestic households, but we are debating how best to structure our final report.
JACK: That's right. Specifically, we've divided the conservation initiatives into three main categories: Government Regulations, Community Schemes, and Household Technological Devices.
TUTOR: Good. Now let's review your evaluation of these specific initiatives. What about rainwater harvesting tanks?
SARAH: We found that rainwater tanks are highly effective for domestic garden irrigation, but the initial installation costs are relatively high for average homeowners.
JACK: Yes, so we classified that under Household Devices with a high payback period.
TUTOR: And the local council's smart water metering programme?
JACK: The smart meters have proven to be the most immediate success. They reduced peak household consumption by twenty-two percent within the first quarter.
SARAH: That falls under Community Schemes sponsored by local municipalities.
TUTOR: Interesting. And what methodology did you use to sample respondents?
SARAH: We used randomized online questionnaires distributed across three distinct socio-economic neighbourhoods.
JACK: We received five hundred and forty valid survey responses in total, which was well above our minimum target of four hundred.
TUTOR: That gives your statistical findings substantial validity. Now, what was the biggest challenge you encountered during data collection?
JACK: Many elderly participants found the digital survey interface confusing, so we had to conduct follow-up telephone interviews with them.
SARAH: And analyzing the qualitative open-ended comments took far longer than we anticipated.
TUTOR: Make sure you discuss that in the Limitations section of your presentation.
`,
            questions: [
                {
                    id: 21,
                    section: 3,
                    type: 'CLASSIFICATION',
                    prompt: 'Classification of initiative: Rainwater harvesting tanks',
                    options: ['A. Government Regulations', 'B. Community Schemes', 'C. Household Technological Devices'],
                    correctAnswerPattern: 'C // Household Technological Devices',
                    tapescriptSnippet: 'JACK: Yes, so we classified that under Household Devices with a high payback period.',
                },
                {
                    id: 22,
                    section: 3,
                    type: 'CLASSIFICATION',
                    prompt: 'Classification of initiative: Smart water metering programme',
                    options: ['A. Government Regulations', 'B. Community Schemes', 'C. Household Technological Devices'],
                    correctAnswerPattern: 'B // Community Schemes',
                    tapescriptSnippet: 'SARAH: That falls under Community Schemes sponsored by local municipalities.',
                },
                {
                    id: 23,
                    section: 3,
                    type: 'SHORT_ANSWER',
                    prompt: 'Percentage reduction in peak water consumption achieved by smart meters:',
                    correctAnswerPattern: '22% // 22 percent // twenty-two percent // 22',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Peak consumption reduced by: _____',
                    tapescriptSnippet: 'They reduced peak household consumption by twenty-two percent within the first quarter.',
                },
                {
                    id: 24,
                    section: 3,
                    type: 'TABLE_COMPLETION',
                    prompt: 'Primary methodology used to gather field data:',
                    correctAnswerPattern: '(online) questionnaires // survey // online survey // questionnaire',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Data collection tool: randomized _____',
                    tapescriptSnippet: 'SARAH: We used randomized online questionnaires distributed across three distinct socio-economic neighbourhoods.',
                },
                {
                    id: 25,
                    section: 3,
                    type: 'TABLE_COMPLETION',
                    prompt: 'Total number of valid survey responses received:',
                    correctAnswerPattern: '540 // five hundred and forty',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Valid responses: _____',
                    tapescriptSnippet: 'JACK: We received five hundred and forty valid survey responses in total...',
                },
                {
                    id: 26,
                    section: 3,
                    type: 'SHORT_ANSWER',
                    prompt: 'Minimum response target originally set by the team:',
                    correctAnswerPattern: '400 // four hundred',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Original target: _____',
                    tapescriptSnippet: '...which was well above our minimum target of four hundred.',
                },
                {
                    id: 27,
                    section: 3,
                    type: 'MATCHING',
                    prompt: 'Group that encountered difficulties with the digital survey format:',
                    correctAnswerPattern: 'elderly participants // elderly people // senior citizens // elderly',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Demographic needing assistance: _____',
                    tapescriptSnippet: 'JACK: Many elderly participants found the digital survey interface confusing...',
                },
                {
                    id: 28,
                    section: 3,
                    type: 'SENTENCE_COMPLETION',
                    prompt: 'Method used to assist participants who had trouble with the online form:',
                    correctAnswerPattern: 'telephone interviews // phone interviews // telephone interview',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Follow-up method: conducted _____',
                    tapescriptSnippet: '...so we had to conduct follow-up telephone interviews with them.',
                },
                {
                    id: 29,
                    section: 3,
                    type: 'SHORT_ANSWER',
                    prompt: 'Type of survey comments that required unexpectedly long analysis time:',
                    correctAnswerPattern: 'open-ended // qualitative // open-ended comments',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Challenging data: analyzing _____ comments',
                    tapescriptSnippet: 'SARAH: And analyzing the qualitative open-ended comments took far longer than we anticipated.',
                },
                {
                    id: 30,
                    section: 3,
                    type: 'SENTENCE_COMPLETION',
                    prompt: 'Section of the presentation where project challenges must be addressed:',
                    correctAnswerPattern: 'limitations // Limitations section',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Must be discussed in the _____ section',
                    tapescriptSnippet: 'TUTOR: Make sure you discuss that in the Limitations section of your presentation.',
                },
            ],
        },
        // --------------------------------------------------------------------------
        // SECTION 4: CÂU 31 - 40 (Độc thoại học thuật: Bài giảng đại học về loài cá mập trắng)
        // Dạng bài: Sentence completion & Summary notes completion
        // Giới hạn từ: NO MORE THAN TWO WORDS AND/OR A NUMBER
        // --------------------------------------------------------------------------
        {
            sectionNumber: 4,
            title: 'Section 4: Marine Biology Lecture - Great White Shark Navigation',
            contextDescription: 'A university lecture exploring the sensory organs, migratory patterns and navigation mechanisms of Great White Sharks.',
            audioFilename: 'Test 1 - Section 4.mp3',
            audioDurationSeconds: 380,
            fullTapescript: `
LECTURER: Good morning, ladies and gentlemen. In today's marine biology lecture, we will investigate the extraordinary navigation systems of one of the ocean's apex predators: the Great White Shark, known scientifically as Carcharodon carcharias.
For decades, marine biologists were baffled by the ability of these sharks to migrate across thousands of kilometres of open ocean, navigating in straight lines without visible reference points.
Recent satellite tagging studies have confirmed that sharks undertake annual journeys between the coast of South Africa and Western Australia, covering over twenty thousand kilometres round trip.
How do they achieve this remarkable feat? The primary navigational mechanism is based on geomagnetic sensing. Sharks possess specialized electro-receptors located around their snout, known as the Ampullae of Lorenzini.
These jelly-filled pores are capable of detecting minuscule electrical impulses, as faint as one billionth of a volt.
This allows the shark not only to detect the muscle contractions of nearby prey hidden under sand, but also to read the Earth's magnetic field lines, functioning as an internal biological compass.
In addition to electromagnetic reception, sharks rely on an acute sense of olfaction. Up to two-thirds of the shark's brain weight is devoted to smelling.
Water enters the nasal cavities continuously as the shark swims, enabling it to detect one drop of blood diluted in one hundred million drops of seawater.
Furthermore, the lateral line system running along both sides of the body senses minute pressure vibrations and water currents created by moving fish up to two hundred metres away.
Unfortunately, commercial overfishing and habitat destruction have caused a severe decline in global populations. It is estimated that population numbers have dropped by seventy-five percent over the last fifty years.
International conservation agreements are essential if we are to preserve this vital keystone species.
`,
            questions: [
                {
                    id: 31,
                    section: 4,
                    type: 'SENTENCE_COMPLETION',
                    prompt: 'Migration distance recorded by satellite tagging (round trip):',
                    correctAnswerPattern: '20,000 km // 20000 km // twenty thousand kilometres // 20,000 kilometres',
                    wordLimit: { maxWords: 3, allowNumber: true, rawInstruction: 'NO MORE THAN THREE WORDS AND/OR A NUMBER' },
                    contextSentence: 'Total migration journey: over _____',
                    tapescriptSnippet: '...covering over twenty thousand kilometres round trip.',
                },
                {
                    id: 32,
                    section: 4,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Primary navigation mechanism relied upon by sharks:',
                    correctAnswerPattern: 'geomagnetic sensing // geomagnetism // magnetic sensing',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Main navigation method: _____',
                    tapescriptSnippet: 'The primary navigational mechanism is based on geomagnetic sensing.',
                },
                {
                    id: 33,
                    section: 4,
                    type: 'SHORT_ANSWER',
                    prompt: 'Location of the Ampullae of Lorenzini electro-receptors:',
                    correctAnswerPattern: '(around the) snout // snout // nose',
                    wordLimit: { maxWords: 2, allowNumber: false, rawInstruction: 'NO MORE THAN TWO WORDS' },
                    contextSentence: 'Sensory organs located around the _____',
                    tapescriptSnippet: 'Sharks possess specialized electro-receptors located around their snout...',
                },
                {
                    id: 34,
                    section: 4,
                    type: 'SENTENCE_COMPLETION',
                    prompt: 'Material filling the pores of Lorenzini:',
                    correctAnswerPattern: 'jelly // jelly-filled',
                    wordLimit: { maxWords: 1, allowNumber: false, rawInstruction: 'NO MORE THAN ONE WORD' },
                    contextSentence: 'Receptor pores are filled with _____',
                    tapescriptSnippet: 'These jelly-filled pores are capable of detecting minuscule electrical impulses...',
                },
                {
                    id: 35,
                    section: 4,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Internal navigation instrument provided by geomagnetic detection:',
                    correctAnswerPattern: '(internal) (biological) compass // biological compass // compass',
                    wordLimit: { maxWords: 3, allowNumber: false, rawInstruction: 'NO MORE THAN THREE WORDS' },
                    contextSentence: 'Acts as an internal _____',
                    tapescriptSnippet: '...functioning as an internal biological compass.',
                },
                {
                    id: 36,
                    section: 4,
                    type: 'SENTENCE_COMPLETION',
                    prompt: 'Proportion of the shark brain weight devoted to olfaction (sense of smell):',
                    correctAnswerPattern: 'two-thirds // 2/3 // two thirds',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Up to _____ of brain weight dedicated to smelling',
                    tapescriptSnippet: "Up to two-thirds of the shark's brain weight is devoted to smelling.",
                },
                {
                    id: 37,
                    section: 4,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Substance detectable at one drop per 100 million drops of seawater:',
                    correctAnswerPattern: 'blood // (a drop of) blood',
                    wordLimit: { maxWords: 1, allowNumber: false, rawInstruction: 'NO MORE THAN ONE WORD' },
                    contextSentence: 'Can detect a single drop of _____',
                    tapescriptSnippet: '...enabling it to detect one drop of blood diluted in one hundred million drops of seawater.',
                },
                {
                    id: 38,
                    section: 4,
                    type: 'SHORT_ANSWER',
                    prompt: 'Body system responsible for sensing water pressure vibrations:',
                    correctAnswerPattern: 'lateral line // (the) lateral line // lateral line system',
                    wordLimit: { maxWords: 3, allowNumber: false, rawInstruction: 'NO MORE THAN THREE WORDS' },
                    contextSentence: 'Sensory line along body: _____',
                    tapescriptSnippet: 'Furthermore, the lateral line system running along both sides of the body senses minute pressure vibrations...',
                },
                {
                    id: 39,
                    section: 4,
                    type: 'SENTENCE_COMPLETION',
                    prompt: 'Maximum distance from which prey movement vibrations can be sensed:',
                    correctAnswerPattern: '200 metres // 200 meters // 200m // two hundred metres',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Vibrations detected up to _____ away',
                    tapescriptSnippet: '...created by moving fish up to two hundred metres away.',
                },
                {
                    id: 40,
                    section: 4,
                    type: 'NOTES_COMPLETION',
                    prompt: 'Estimated percentage drop in global shark populations over the past fifty years:',
                    correctAnswerPattern: '75% // 75 percent // seventy-five percent // 75',
                    wordLimit: { maxWords: 2, allowNumber: true, rawInstruction: 'NO MORE THAN TWO WORDS AND/OR A NUMBER' },
                    contextSentence: 'Global population declined by: _____',
                    tapescriptSnippet: 'It is estimated that population numbers have dropped by seventy-five percent over the last fifty years.',
                },
            ],
        },
    ],
};
//# sourceMappingURL=sample-listening-exam.js.map