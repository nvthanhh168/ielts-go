"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IELTS_SPEAKING_20_TOPICS = void 0;
exports.getSpeakingTopicById = getSpeakingTopicById;
exports.IELTS_SPEAKING_20_TOPICS = [
    // 1. Animals
    {
        id: 'animals',
        name: 'Animals & Wildlife',
        vietnameseName: 'Động vật & Thế giới Hoang dã',
        icon: '🐾',
        part1Questions: [
            { id: 1, question: 'Do you have a pet at home?', sampleIdea: 'Describe pet affection, daily care routine, or reasons for not having one due to apartment rules.' },
            { id: 2, question: 'What is your favourite wild animal and why?', sampleIdea: 'Mention wildlife characteristics, intelligence, grace or strength (e.g., dolphins, tigers).' },
            { id: 3, question: 'Do you think it is important to protect endangered species?', sampleIdea: 'Biodiversity balance, ecological chain, ethical duty of humankind.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe an interesting wild animal you have seen or read about',
            cueCardInstruction: 'You should say:\n- What animal it is and where it lives\n- What it looks like\n- How it behaves\n- And explain why you find this animal fascinating',
            bulletPoints: ['What animal it is and where it lives', 'What it looks like', 'How it behaves', 'Why you find it fascinating'],
            suggestedIdeas: {
                0: ['Snow leopard in the Himalayan mountain range', 'Great White Shark along the South African coast', 'Giant Panda in bamboo forests of Sichuan'],
                1: ['Thick silver-grey fur with rosette markings', 'Piercing golden eyes and a long bushy tail for balance', 'Incredible camouflage against rocky crags'],
                2: ['Solitary predator known as the "ghost of the mountains"', 'Leaps up to 15 metres between sheer cliffs', 'Nocturnal stalking behavior'],
                3: ['Symbolizes mysterious resilience in harsh freezing habitats', 'Tragic vulnerability to poaching and climate-driven habitat loss']
            }
        },
        part3Questions: [
            { id: 1, question: 'Why are zoos becoming controversial in contemporary society?', analyticalAngle: 'Animal welfare vs educational conservation and captive breeding programmes.' },
            { id: 2, question: 'How can governments balance economic development with wildlife conservation?', analyticalAngle: 'Strict zoning laws, eco-tourism incentives and severe penalties for habitat encroachment.' }
        ],
        usefulCollocations: [
            { phrase: 'natural habitat', meaning: 'Môi trường sống tự nhiên', exampleSentence: 'Human urbanization continues to encroach upon the natural habitat of wild primates.', bandLevel: 'C1' },
            { phrase: 'endangered species', meaning: 'Loài có nguy cơ tuyệt chủng', exampleSentence: 'Tigers are listed as an endangered species due to relentless poaching.', bandLevel: 'B2' },
            { phrase: 'ecological balance', meaning: 'Cân bằng sinh thái', exampleSentence: 'Apex predators play an indispensable role in maintaining the ecological balance.', bandLevel: 'C1' },
            { phrase: 'poaching and trafficking', meaning: 'Săn trộm và buôn lậu động vật', exampleSentence: 'International treaties are essential to combat illicit wildlife poaching and trafficking.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'To be completely honest, I have always had a soft spot for...', usageContext: 'Mở đầu chia sẻ về sở thích động vật' },
            { category: 'BUYING_TIME', phrase: 'That is a rather intriguing question; if my memory serves me well...', usageContext: 'Dành 1-2 giây lấy đà suy nghĩ' },
            { category: 'GIVING_OPINION', phrase: 'From an ecological standpoint, there is no denying that...', usageContext: 'Đưa ra quan điểm học thuật sâu sắc' }
        ],
        sampleAnswers: {
            part1Band6: 'Yes, I really like animals. I have a cat at home. It is very cute and plays with me when I feel stressed after studying.',
            part1Band8: 'Without a shadow of a doubt, I am an avid animal lover. In fact, I share my apartment with a rescue ginger cat who has become an indispensable companion, offering immense stress relief during demanding workdays.',
            part2Band6: 'I want to talk about the snow leopard. It lives in the cold mountains in Asia. It has white fur with spots. It is very quiet and jumps very well. I like it because it is rare and looks very beautiful in photos.',
            part2Band8: 'Today I would like to recount my fascination with the elusive snow leopard, widely revered across Central Asia as the "ghost of the mountains". Inhabiting the rugged, alpine terrains of the Himalayas, this apex predator possesses a remarkable aesthetic elegance—featuring dense, smoky-grey fur adorned with dark rosettes that provide flawless camouflage against jagged rocky screes. What renders this creature profoundly fascinating to my mind is not merely its solitary demeanor and jaw-dropping agility—capable of leaping fifteen metres across treacherous ravines—but its poignant status as a barometer of climate change resilience.'
        }
    },
    // 2. Art
    {
        id: 'art',
        name: 'Art & Exhibitions',
        vietnameseName: 'Nghệ thuật & Triển lãm',
        icon: '🎨',
        part1Questions: [
            { id: 1, question: 'Do you enjoy visiting art galleries or museums?', sampleIdea: 'Appreciation for visual aesthetics, historical reflection, or occasional cultural outings.' },
            { id: 2, question: 'Did you learn to draw or paint during childhood?', sampleIdea: 'Primary school creative classes, expressing imagination, developing fine motor skills.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a piece of art (painting, sculpture or handicraft) that you like',
            cueCardInstruction: 'You should say:\n- What it is and what it looks like\n- Where and when you first saw it\n- Who created it\n- And explain why you find it memorable or inspiring',
            bulletPoints: ['What it is and what it looks like', 'Where and when you first saw it', 'Who created it', 'Why it is memorable or inspiring'],
            suggestedIdeas: {
                0: ['Van Gogh\'s Starry Night', 'A traditional Vietnamese lacquer painting', 'A minimalist bronze sculpture'],
                1: ['Vibrant swirling blues and radiant golden stars', 'Rich textured brushstrokes (impasto technique)', 'Reflects emotional turbulence and transcendental wonder'],
                2: ['Museum of Modern Art (MoMA) in New York or in an art textbook', 'Left an indelible visual impression on me'],
                3: ['Conveys raw emotional depth rather than photorealistic replication', 'Timeless artistic solace during personal adversity']
            }
        },
        part3Questions: [
            { id: 1, question: 'Should schools place equal emphasis on art education as on STEM subjects?', analyticalAngle: 'Cultivating creative problem-solving and lateral thinking alongside analytical skills.' },
            { id: 2, question: 'Can computer-generated AI art truly substitute for human creative expression?', analyticalAngle: 'Algorithmic pattern synthesis vs authentic human soul, suffering and lived emotional depth.' }
        ],
        usefulCollocations: [
            { phrase: 'visual masterpiece', meaning: 'Kiệt tác thị giác', exampleSentence: 'The gallery showcases some of the finest visual masterpieces of the Renaissance.', bandLevel: 'C1' },
            { phrase: 'aesthetic appreciation', meaning: 'Sự trân trọng cái đẹp', exampleSentence: 'Art education fosters deep aesthetic appreciation and emotional maturity.', bandLevel: 'C2' },
            { phrase: 'evoke deep emotions', meaning: 'Gợi lên những cảm xúc sâu sắc', exampleSentence: 'Abstract art has a distinct capacity to evoke deep emotions without literal depictions.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'I must confess I am not an art connoisseur, but...', usageContext: 'Mở đầu khiêm tốn trước chủ đề nghệ thuật' },
            { category: 'SPECULATING', phrase: 'What struck me most profoundly about this artwork was...', usageContext: 'Nhấn mạnh ấn tượng sâu đậm' }
        ],
        sampleAnswers: {
            part1Band6: 'I like art. When I was small, my teacher taught me how to paint flowers and houses. Now I sometimes go to art museums at weekends.',
            part1Band8: 'While I wouldn\'t classify myself as an art connoisseur, I thoroughly relish browsing contemporary galleries. For me, visual art provides an enriching escapism from the monotonous hustle of urban life, sparking imaginative introspection.',
            part2Band6: 'I want to describe Starry Night by Vincent van Gogh. It has blue sky with yellow stars and a small town. I saw it on the internet and then in a museum. It makes me feel peaceful and very creative.',
            part2Band8: 'I would like to share my admiration for Vincent van Gogh\'s seminal masterpiece, "The Starry Night". Dominated by swirling, turbulent azure skies juxtaposed against glowing crescent moons and luminous celestial bodies, the painting utilizes expressive impasto textures that imbue the canvas with an almost kinetic vitality. What has cemented this artwork in my memory is van Gogh\'s profound ability to channel intense inner psychological turmoil into a visual hymn of transcendent serenity.'
        }
    },
    // 3. Celebrations
    {
        id: 'celebrations',
        name: 'Celebrations & Festivals',
        vietnameseName: 'Lễ hội & Dịp Kỷ niệm',
        icon: '🎉',
        part1Questions: [
            { id: 1, question: 'What is the most significant celebration in your country?', sampleIdea: 'Lunar New Year (Tet), Mid-Autumn festival, National Independence Day.' },
            { id: 2, question: 'How do you usually celebrate your birthday?', sampleIdea: 'Intimate dinner with family, gathering with close friends, reflective personal time.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a traditional celebration or festival that you enjoyed',
            cueCardInstruction: 'You should say:\n- What festival it was and when it occurred\n- Where it took place\n- What people did during the event\n- And explain why this celebration holds special meaning for you',
            bulletPoints: ['What festival it was and when it occurred', 'Where it took place', 'What people did during the event', 'Why it holds special meaning for you'],
            suggestedIdeas: {
                0: ['Lunar New Year (Tet Holiday) in Vietnam', 'Mid-Autumn Lantern Festival'],
                1: ['Hometown family ancestral house', 'Bustling flower markets filled with peach blossoms and kumquat trees'],
                2: ['Cooking traditional sticky rice cakes (Banh Chung)', 'Exchanging red envelopes (lucky money)', 'Paying respects to elders'],
                3: ['Reaffirming familial bonds, honouring cultural roots, a fresh beginning']
            }
        },
        part3Questions: [
            { id: 1, question: 'Are commercial marketing campaigns diluting the genuine spirit of traditional festivals?', analyticalAngle: 'Consumerism and material gift-giving overtaking communal fellowship and spiritual reflection.' },
            { id: 2, question: 'How do national celebrations reinforce a country\'s cultural identity?', analyticalAngle: 'Preserving historical memory, uniting diverse demographics under shared ancestral narratives.' }
        ],
        usefulCollocations: [
            { phrase: 'cultural heritage', meaning: 'Di sản văn hóa', exampleSentence: 'Traditional festivals serve as a living embodiment of our cultural heritage.', bandLevel: 'C1' },
            { phrase: 'festive atmosphere', meaning: 'Bầu không khí lễ hội rộn ràng', exampleSentence: 'The streets were brimming with an exuberant festive atmosphere.', bandLevel: 'C1' },
            { phrase: 'reaffirm family bonds', meaning: 'Củng cố sợi dây gắn kết gia đình', exampleSentence: 'Annual reunions provide an invaluable opportunity to reaffirm family bonds.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'When it comes to hallmark national celebrations in my homeland, none can rival...', usageContext: 'Mở đầu nói về lễ hội lớn nhất' },
            { category: 'CONTRASTING', phrase: 'Unlike contemporary commercialized events, this traditional gathering...', usageContext: 'So sánh giữa lễ hội truyền thống và hiện đại' }
        ],
        sampleAnswers: {
            part1Band6: 'In my country, Tet holiday is the biggest festival. We clean the house, eat good food with family and receive lucky money from our parents.',
            part1Band8: 'Without question, the Lunar New Year—known locally as Tet—is the most monumental cultural milestone in Vietnam. It is far more than a vacation; it is a sacred period dedicated to ancestral reverence, family reunions, and shedding past misfortunes for prospective renewal.',
            part2Band6: 'I want to talk about Tet holiday. It happens in January or February. Families cook Banh Chung and visit relatives. I like it because I get lucky money and meet my cousins after a busy year.',
            part2Band8: 'The celebration that stands out most vividly in my memory is the Lunar New Year reunion in my ancestral hometown. As winter gave way to spring, the entire village transformed into a tapestry of crimson and gold, brimming with fragrant peach blossoms. What resonated most deeply with me was the communal ritual of boiling traditional square sticky rice cakes over an open wood-fired hearth through the chilly night, where multiple generations gathered to impart ancestral folklore.'
        }
    },
    // 4. Clothes
    {
        id: 'clothes',
        name: 'Clothes & Fashion',
        vietnameseName: 'Trang phục & Thời trang',
        icon: '👗',
        part1Questions: [
            { id: 1, question: 'What kind of clothes do you usually wear on weekends?', sampleIdea: 'Casual breathable attire, hoodies, denim jeans, sneakers for effortless comfort.' },
            { id: 2, question: 'Do you prefer smart formal clothes or casual wear?', sampleIdea: 'Situational dressing: comfort for daily life vs professionalism for formal academic contexts.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a special item of clothing you wore on an important occasion',
            cueCardInstruction: 'You should say:\n- What the clothing was\n- Where and when you wore it\n- Who bought or tailored it for you\n- And explain how you felt wearing this clothing',
            bulletPoints: ['What the clothing was', 'Where and when you wore it', 'Who tailored it for you', 'How you felt wearing it'],
            suggestedIdeas: {
                0: ['A bespoke navy-blue suit', 'A traditional silk Ao Dai with embroidered motifs'],
                1: ['University graduation ceremony or sibling\'s wedding banquet'],
                2: ['Gifted by parents or crafted by a skilled local tailor'],
                3: ['Felt poised, mature, self-confident and deeply proud']
            }
        },
        part3Questions: [
            { id: 1, question: 'What environmental repercussions are associated with the rise of fast fashion?', analyticalAngle: 'Mass textile waste, microplastic water contamination and exploitative sweatshop labor.' },
            { id: 2, question: 'Does a person\'s choice of attire genuinely reflect their personality or societal pressure?', analyticalAngle: 'Self-expression vs corporate dress codes and peer conformity.' }
        ],
        usefulCollocations: [
            { phrase: 'dress for comfort and utility', meaning: 'Mặc vì sự thoải mái và tiện dụng', exampleSentence: 'I generally opt to dress for comfort and utility rather than chase ephemeral trends.', bandLevel: 'C1' },
            { phrase: 'fast fashion epidemic', meaning: 'Vấn nạn thời trang nhanh', exampleSentence: 'The fast fashion epidemic has precipitated unprecedented environmental degradation.', bandLevel: 'C2' },
            { phrase: 'sartorial elegance', meaning: 'Phong thái ăn mặc lịch lãm', exampleSentence: 'A bespoke suit exudes an aura of timeless sartorial elegance.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'I wouldn\'t deem myself a fashion victim, however...', usageContext: 'Mở đầu chia sẻ về phong cách ăn mặc' },
            { category: 'GIVING_OPINION', phrase: 'In my humble perspective, dressing well is essentially a form of...', usageContext: 'Bày tỏ quan điểm về ý nghĩa trang phục' }
        ],
        sampleAnswers: {
            part1Band6: 'I like casual clothes like T-shirts and jeans. They are comfortable and cheap. I only wear shirts and trousers when I go to job interviews.',
            part1Band8: 'On a day-to-day basis, I prioritize utilitarian comfort over ostentatious style, habitually gravitating toward breathable cotton tees and relaxed denim. However, when the occasion demands formality, I firmly believe in dressing sharply to demonstrate respect.',
            part2Band6: 'I want to talk about my suit for graduation. It was dark blue. My parents bought it for me. It looked very nice and made me feel like an adult.',
            part2Band8: 'The garment that carries immense sentimental value for me is a bespoke navy-blue two-piece suit crafted specifically for my undergraduate commencement ceremony. Meticulously tailored from premium breathable wool, the suit featured structured shoulders and hand-stitched lapels that fit impeccably. Slipping into that suit transformed my posture—instilling a profound sense of poised maturity and accomplishment as I stepped onto the graduation stage.'
        }
    },
    // 5. Environment
    {
        id: 'environment',
        name: 'Environment & Climate Change',
        vietnameseName: 'Môi trường & Biến đổi Khí hậu',
        icon: '🌱',
        part1Questions: [
            { id: 1, question: 'Do you recycle waste at home?', sampleIdea: 'Sorting plastic, aluminum cans, organic compost, reusable shopping tote bags.' },
            { id: 2, question: 'Are there many green parks or trees in your city?', sampleIdea: 'Urban green spaces, pocket parks, tree-lined boulevards providing clean air.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe an environmental law or initiative that you think is beneficial',
            cueCardInstruction: 'You should say:\n- What the law or initiative is\n- How it is implemented\n- What environmental issue it addresses\n- And explain why you believe it is effective or necessary',
            bulletPoints: ['What the initiative is', 'How it is implemented', 'What issue it addresses', 'Why it is effective or necessary'],
            suggestedIdeas: {
                0: ['Single-use plastic ban in retail stores', 'Mandatory rooftop solar panel mandates', 'Urban congestion charging zones'],
                1: ['Levying fines on businesses providing plastic bags, offering biodegradable incentives'],
                2: ['Combatting ocean microplastic pollution and landfill overflow'],
                3: ['Forces sustainable habit changes, curbs fossil-fuel dependency, creates green jobs']
            }
        },
        part3Questions: [
            { id: 1, question: 'Who holds greater responsibility for mitigating global warming: individuals or multinational corporations?', analyticalAngle: 'Corporate carbon footprints vs consumer grassroots pressure and legislative regulation.' },
            { id: 2, question: 'Will technological innovations like carbon capture suffice to reverse ecological degradation?', analyticalAngle: 'Technological optimism vs imperative need for structural reduction in fossil consumption.' }
        ],
        usefulCollocations: [
            { phrase: 'carbon footprint reduction', meaning: 'Giảm lượng khí thải carbon', exampleSentence: 'Transitioning to renewable energy is paramount for significant carbon footprint reduction.', bandLevel: 'C1' },
            { phrase: 'biodiversity loss', meaning: 'Sự suy giảm đa dạng sinh học', exampleSentence: 'Deforestation is the primary catalyst for rapid global biodiversity loss.', bandLevel: 'C1' },
            { phrase: 'sustainable development goals', meaning: 'Mục tiêu phát triển bền vững', exampleSentence: 'Policies must align with United Nations sustainable development goals to ensure long-term viability.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'It goes without saying that environmental sustainability is the defining challenge of our era...', usageContext: 'Mở đầu câu hỏi môi trường học thuật' },
            { category: 'CONTRASTING', phrase: 'While individual actions are commendable, they pale in comparison to...', usageContext: 'So sánh tác động của cá nhân và tập đoàn' }
        ],
        sampleAnswers: {
            part1Band6: 'Yes, I always recycle plastic bottles and paper. My city also has some nice parks where people can exercise and breathe fresh air.',
            part1Band8: 'I make a conscientious effort to minimize my ecological footprint by segregating domestic recyclables, carrying reusable stainless-steel containers, and relying predominantly on public electrified transit.',
            part2Band6: 'I want to talk about the law banning single-use plastic bags in supermarkets. Shops now charge money if you want a plastic bag. This makes people bring their own cloth bags. It reduces plastic trash in the ocean.',
            part2Band8: 'I would like to discuss the nationwide legislative ban on single-use non-biodegradable plastic bags across major retail chains. Implemented via stringent municipal surcharges and strict merchant compliance audits, this policy directly confronts the scourge of non-degradable petroleum polymers polluting marine ecosystems. What makes this initiative extraordinarily efficacious is its behavioral economics design—by attaching a financial friction to plastic bags, it nudged millions of shoppers to internalize the habit of bringing reusable canvas totes.'
        }
    },
    // 6. Famous People
    {
        id: 'famous_people',
        name: 'Famous People & Role Models',
        vietnameseName: 'Người Nổi Tiếng & Hình Mẫu',
        icon: '🌟',
        part1Questions: [
            { id: 1, question: 'Would you like to be famous in the future?', sampleIdea: 'Pros of influential platform vs cons of loss of privacy and unrelenting public scrutiny.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a well-known person (celebrity, scientist or leader) you admire',
            cueCardInstruction: 'You should say:\n- Who this person is and what they are known for\n- How you first learned about them\n- What special qualities or achievements they possess\n- And explain why you admire them',
            bulletPoints: ['Who this person is', 'How you learned about them', 'Special achievements', 'Why you admire them'],
            suggestedIdeas: {
                0: ['David Attenborough (naturalist)', 'Marie Curie (pioneering physicist)', 'Elon Musk (tech innovator)'],
                1: ['Through BBC documentaries or high-school science curricula'],
                2: ['Seven decades dedicated to biodiversity education and planetary stewardship'],
                3: ['Unyielding passion, intellectual humility, moral courage']
            }
        },
        part3Questions: [
            { id: 1, question: 'Do celebrities have a moral responsibility to act as positive role models for youth?', analyticalAngle: 'Influence on impressionable minds vs right to private personal life.' }
        ],
        usefulCollocations: [
            { phrase: 'unrelenting public scrutiny', meaning: 'Sự soi mói không ngừng từ công chúng', exampleSentence: 'Celebrities often endure unrelenting public scrutiny at the expense of their mental well-being.', bandLevel: 'C2' },
            { phrase: 'embody moral integrity', meaning: 'Hiện thân của sự chính trực đạo đức', exampleSentence: 'True leaders embody moral integrity rather than chase sensationalist headlines.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'The individual that immediately springs to my mind is...', usageContext: 'Giới thiệu nhân vật ấn tượng ngay lập tức' }
        ],
        sampleAnswers: {
            part1Band6: 'No, I do not want to be famous. Being famous means having no private life and people always take pictures of you.',
            part1Band8: 'To be completely frank, celebrity status holds very little allure for me. While having a widespread platform to advocate for meaningful causes is undeniably potent, the accompanying invasion of personal privacy and perpetual media scrutiny appear overwhelmingly toxic.',
            part2Band6: 'I want to talk about Sir David Attenborough. He makes nature documentaries. I saw his show Planet Earth on television. He speaks very nicely and teaches everyone to protect nature. I admire him because he is very old but still works hard for the planet.',
            part2Band8: 'The iconic figure I hold in the utmost reverence is Sir David Attenborough, the quintessential broadcaster and natural historian. Spanning more than seven decades of seminal documentary filmmaking, from The Blue Planet to Our Planet, he has brought the fragile magnificence of the natural world into millions of living rooms. What inspires me most profoundly is his unflagging moral crusade in his nineties to educate global audiences on planetary tipping points, delivering impassioned pleas with unparalleled gravitas and intellectual humility.'
        }
    },
    // 7. Food
    {
        id: 'food',
        name: 'Food & Culinary Culture',
        vietnameseName: 'Ẩm thực & Thói quen Ăn uống',
        icon: '🍜',
        part1Questions: [
            { id: 1, question: 'What is your favourite type of food?', sampleIdea: 'Traditional Vietnamese pho, Japanese sushi, Mediterranean balanced salads.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a memorable meal or dining experience you had',
            cueCardInstruction: 'You should say:\n- What you ate and where you ate it\n- Who you shared the meal with\n- What the occasion was\n- And explain why this meal was so memorable',
            bulletPoints: ['What you ate and where', 'Who you shared it with', 'What the occasion was', 'Why it was memorable'],
            suggestedIdeas: {
                0: ['Authentic street-side Pho in Hanoi old quarter', 'A home-cooked celebratory banquet'],
                1: ['Steaming broth simmered for 12 hours with star anise, cinnamon and tender beef'],
                2: ['Gathered with childhood friends reunited after years abroad'],
                3: ['Sensory delight coupled with nostalgic emotional warmth']
            }
        },
        part3Questions: [
            { id: 1, question: 'How is globalization changing traditional national dietary patterns?', analyticalAngle: 'Proliferation of Western fast-food chains vs revival of artisanal local cuisines.' }
        ],
        usefulCollocations: [
            { phrase: 'culinary heritage', meaning: 'Di sản ẩm thực', exampleSentence: 'Street food is an integral facet of a nation\'s culinary heritage.', bandLevel: 'C1' },
            { phrase: 'tantalizing aromas', meaning: 'Hương thơm quyến rũ kích thích vị giác', exampleSentence: 'The open-air kitchen filled the restaurant with tantalizing aromas of roasted herbs.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'I have to admit I am an unabashed foodie at heart...', usageContext: 'Mở đầu thú nhận đam mê ăn uống' }
        ],
        sampleAnswers: {
            part1Band6: 'My favourite food is Pho. It is delicious beef noodle soup with green onions. I eat it for breakfast almost every week.',
            part1Band8: 'I have an immense penchant for traditional Vietnamese street gastronomy, particularly Phở Bò. The harmonious convergence of slow-simmered bone broth infused with star anise and aromatic herbs creates a profoundly restorative culinary experience.',
            part2Band6: 'I want to describe a meal I had in Hanoi. I ate beef noodle soup at a small street restaurant with my best friend. The soup was hot and very fresh. We talked for two hours and felt very happy.',
            part2Band8: 'The dining experience that remains etched in my memory took place at a quaint, family-run noodle eatery tucked within the labyrinthine alleys of Hanoi\'s Old Quarter. Seated on modest plastic stools, my longtime companion and I savored steaming bowls of traditional Pho Bo, whose crystalline broth had been gently simmered for over twelve hours. What elevated this meal beyond mere sustenance was the sensory symphony—the fragrant wafts of fresh cilantro and charred ginger harmonizing with heartfelt nostalgia as we reminisced after years apart.'
        }
    },
    // 8. Friends
    {
        id: 'friends',
        name: 'Friends & Relationships',
        vietnameseName: 'Tình bạn & Các Mối quan hệ',
        icon: '🤝',
        part1Questions: [
            { id: 1, question: 'How often do you hang out with your close friends?', sampleIdea: 'Weekly coffee catch-ups, online gaming sessions, weekend road trips.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a close friend who has had a positive influence on you',
            cueCardInstruction: 'You should say:\n- Who this friend is and how you met\n- What personality traits they possess\n- What activities you do together\n- And explain why this person has been such a positive influence on your life',
            bulletPoints: ['Who this friend is and how you met', 'Their personality traits', 'Activities done together', 'Why they influenced you positively'],
            suggestedIdeas: {
                0: ['High-school desk mate named Minh', 'A university project team partner'],
                1: ['Disciplined, empathetic, possessing an insatiable curiosity and sharp wit'],
                2: ['Studying in library archives, discussing books, running marathons together'],
                3: ['Taught me consistency, emotional resilience, and not to fear failure']
            }
        },
        part3Questions: [
            { id: 1, question: 'Do social media platforms strengthen or weaken authentic interpersonal friendships?', analyticalAngle: 'Superficial digital interactions vs genuine vulnerability and shared physical presence.' }
        ],
        usefulCollocations: [
            { phrase: 'kindred spirits', meaning: 'Những tâm hồn đồng điệu', exampleSentence: 'We instantly recognized each other as kindred spirits with shared worldviews.', bandLevel: 'C2' },
            { phrase: 'unwavering support', meaning: 'Sự ủng hộ kiên định không đổi', exampleSentence: 'A genuine friend provides unwavering support through triumphs and tribulations.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'When reflecting upon the people who have shaped my character, the first person that comes to mind is...', usageContext: 'Mở đầu nói về người bạn ảnh hưởng lớn' }
        ],
        sampleAnswers: {
            part1Band6: 'I meet my friends every weekend. We usually go to coffee shops, talk about our study and play mobile games together.',
            part1Band8: 'Given our demanding occupational schedules, we seldom meet daily; however, we make a concerted effort to convene fortnightly for coffee or leisurely weekend treks to unwind and engage in meaningful conversations.',
            part2Band6: 'I want to talk about my friend Nam. We met in high school ten years ago. He is very smart and always works hard. When I wanted to give up before exams, he helped me study math. He taught me to be patient.',
            part2Band8: 'I would like to speak about my closest confidant, Nam, whom I first encountered during our secondary school days. What distinguishes him is his formidable intellectual discipline paired with profound empathetic warmth. He exerted a transformative influence on my trajectory by exemplifying resilience—whenever I was gripped by imposter syndrome during university admissions, Nam instilled in me the philosophy that failure is merely an iterative stepping stone toward mastery.'
        }
    },
    // 9. Holidays
    {
        id: 'holidays',
        name: 'Holidays & Travel',
        vietnameseName: 'Kỳ nghỉ & Du lịch Trải nghiệm',
        icon: '✈️',
        part1Questions: [
            { id: 1, question: 'Do you prefer relaxing beach vacations or adventurous mountain trekking?', sampleIdea: 'Tranquil coastal rejuvenation vs invigorating physical exertion and panoramic peaks.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a holiday destination you visited that exceeded your expectations',
            cueCardInstruction: 'You should say:\n- Where you went and when\n- Who accompanied you\n- What sights and activities you experienced\n- And explain why it exceeded your expectations',
            bulletPoints: ['Where you went and when', 'Who accompanied you', 'Activities experienced', 'Why it exceeded expectations'],
            suggestedIdeas: {
                0: ['Da Lat highlands or Ha Giang mountainous loop in Northern Vietnam', 'Kyoto, Japan during autumn'],
                1: ['Breathtaking terraced rice paddies, winding mountain passes, ethnic homestays'],
                2: ['Immersive cultural exchange, culinary authenticity far superior to tourist brochures']
            }
        },
        part3Questions: [
            { id: 1, question: 'What measures should governments implement to mitigate the adverse impacts of mass overtourism?', analyticalAngle: 'Imposing tourist visitor caps, seasonal pricing and investing revenue into heritage conservation.' }
        ],
        usefulCollocations: [
            { phrase: 'off the beaten track', meaning: 'Rời xa chốn đông đúc du lịch', exampleSentence: 'I prefer exploring secluded hamlets off the beaten track rather than tourist traps.', bandLevel: 'C1' },
            { phrase: 'breathtaking panorama', meaning: 'Toàn cảnh hùng vĩ ngoạn mục', exampleSentence: 'Standing atop the mountain pass, we were greeted by a breathtaking panorama of mist-shrouded valleys.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'I have had the privilege of travelling to various destinations, but the one that truly blew me away was...', usageContext: 'Mở đầu kể về chuyến đi vượt mong đợi' }
        ],
        sampleAnswers: {
            part1Band6: 'I like beach holidays because I can swim, lie on the sand and eat fresh seafood with my family.',
            part1Band8: 'I gravitate overwhelmingly toward adventurous wilderness expeditions off the beaten track. Immersing myself in rugged mountain landscapes provides a total mental reboot that conventional coastal resort vacations simply cannot rival.',
            part2Band6: 'I want to talk about my trip to Ha Giang last year. I rode a motorbike with my brother through big mountains. The scenery was amazing with green valleys and ethnic villages. It was much more beautiful than in photos.',
            part2Band8: 'The destination that thoroughly shattered my expectations was the dramatic karst plateau of Ha Giang in northern Vietnam. Navigating the serpentine mountain passes on two wheels with my sibling, I was utterly mesmerized by the sheer verticality of the limestone gorges and cascading golden rice terraces. Beyond the awe-inspiring geography, it was the unvarnished hospitality of the indigenous ethnic communities that made the expedition truly transformative.'
        }
    },
    // 10. Music
    {
        id: 'music',
        name: 'Music & Concerts',
        vietnameseName: 'Âm nhạc & Buổi hòa nhạc',
        icon: '🎵',
        part1Questions: [
            { id: 1, question: 'What genre of music do you listen to when studying or relaxing?', sampleIdea: 'Lo-fi instrumental beats, classical symphonies, acoustic indie pop.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a memorable song or piece of music that holds special significance for you',
            cueCardInstruction: 'You should say:\n- What song it is and who performs it\n- When and where you first heard it\n- What the song is about\n- And explain why this song is emotionally meaningful to you',
            bulletPoints: ['What song and artist', 'When you first heard it', 'What it is about', 'Why it is meaningful'],
            suggestedIdeas: {
                0: ['"Imagine" by John Lennon or "Bohemian Rhapsody" by Queen', 'A classical piano nocturne by Chopin'],
                1: ['Themes of peace, existential resilience, nostalgic longing'],
                2: ['Acts as an emotional anchor during challenging periods of life']
            }
        },
        part3Questions: [
            { id: 1, question: 'Does music have the universal power to bridge cultural and linguistic divides?', analyticalAngle: 'Emotional resonance transcending grammatical syntax and geopolitical tensions.' }
        ],
        usefulCollocations: [
            { phrase: 'evocative melody', meaning: 'Giai điệu gợi cảm xúc', exampleSentence: 'The evocative melody stirred up a wave of poignant nostalgia.', bandLevel: 'C1' },
            { phrase: 'therapeutic catharsis', meaning: 'Sự giải tỏa cảm xúc trị liệu', exampleSentence: 'Listening to classical music offers a profound sense of therapeutic catharsis.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'Music is an omnipresent facet of my existence, and whenever I feel down...', usageContext: 'Mở đầu nói về vai trò của âm nhạc' }
        ],
        sampleAnswers: {
            part1Band6: 'I like listening to pop music and acoustic guitar songs. They help me feel relaxed and forget about school homework.',
            part1Band8: 'Music serves as an indispensable auditory sanctuary for me. When concentrating on cognitive tasks, I habitually immerse myself in minimalist neo-classical piano compositions, which enhance focus and subdue ambient sensory distractions.',
            part2Band6: 'I want to talk about the song Imagine by John Lennon. I heard it in my English class when I was 15. The song talks about world peace and people living together without war. It inspires me to be a kinder person.',
            part2Band8: 'The composition that resonates most profoundly with my soul is John Lennon\'s timeless anthem, "Imagine". I first encountered this track during a high school literature class exploring anti-war movements. Driven by a deceptively simple, haunting piano motif, the lyrics paint a visionary ideal of a world devoid of divisive dogmas and greed. What cements its enduring power is its understated poetic optimism, serving as a beacon of universal brotherhood.'
        }
    },
    // 11. Nation and Culture
    {
        id: 'nation_culture',
        name: 'Nation & Cultural Heritage',
        vietnameseName: 'Bản sắc Dân tộc & Di sản Văn hóa',
        icon: '🏛️',
        part1Questions: [
            { id: 1, question: 'What cultural aspect of your country are you most proud of?', sampleIdea: 'Culinary sophistication, resilient historical spirit, enduring respect for ancestral elders.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a historical landmark or heritage site in your country',
            cueCardInstruction: 'You should say:\n- What and where the landmark is\n- What historical events occurred there\n- What it looks like today\n- And explain why it is vital to preserve this heritage site',
            bulletPoints: ['What and where it is', 'Historical background', 'Current appearance', 'Why preservation is vital'],
            suggestedIdeas: {
                0: ['Hue Imperial Citadel in Central Vietnam', 'Temple of Literature in Hanoi'],
                1: ['Ancient imperial seat of the Nguyen Dynasty', 'Classical Sino-Vietnamese architecture with moats, carved dragons and pavilions'],
                2: ['Symbolizes national sovereignty, educational ethos and architectural genius']
            }
        },
        part3Questions: [
            { id: 1, question: 'Should ancient historical buildings be protected at the expense of modern commercial development?', analyticalAngle: 'Preserving irreplaceable collective memory vs accommodating economic modernization.' }
        ],
        usefulCollocations: [
            { phrase: 'architectural splendor', meaning: 'Sự tráng lệ về mặt kiến trúc', exampleSentence: 'The ancient citadel stands as a monument to oriental architectural splendor.', bandLevel: 'C2' },
            { phrase: 'intangible cultural heritage', meaning: 'Di sản văn hóa phi vật thể', exampleSentence: 'Folk music forms are recognized as intangible cultural heritage requiring urgent safeguarding.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'If there is one cultural monument that embodies the soul of my homeland, it is undoubtedly...', usageContext: 'Giới thiệu di tích văn hóa tiêu biểu' }
        ],
        sampleAnswers: {
            part1Band6: 'I am very proud of our traditional food and our history of fighting to protect our country. People are also very friendly.',
            part1Band8: 'Beyond our globally celebrated culinary arts, I take immense pride in our culture\'s profound spirit of communal solidarity and resilience, forged through centuries of overcoming formidable historical adversity.',
            part2Band6: 'I want to talk about the Temple of Literature in Hanoi. It is Vietnam\'s first university, built hundreds of years ago. It has stone turtles with doctor names on them. It is important because it represents education.',
            part2Band8: 'I would like to highlight the Temple of Literature in Hanoi, founded in the eleventh century as Vietnam\'s very first imperial university. Set amidst serene landscaped courtyards, ancient lotus ponds, and ancient banyan trees, the site houses eighty-two stone turtle steles inscribed with the names of doctorate laureates. Preserving this sanctuary is imperative, as it stands as a physical testament to our nation\'s millennium-old veneration of scholarship and civic ethics.'
        }
    },
    // 12. Routines
    {
        id: 'routines',
        name: 'Daily Routines & Time Management',
        vietnameseName: 'Thói quen Hàng ngày & Quản lý Thời gian',
        icon: '⏰',
        part1Questions: [
            { id: 1, question: 'Are you a morning person or a night owl?', sampleIdea: 'Morning productivity and crisp clarity vs nocturnal focus when the world sleeps.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a daily routine or healthy habit you recently adopted',
            cueCardInstruction: 'You should say:\n- What the routine is\n- When and how you started it\n- How difficult it was to maintain at first\n- And explain what positive changes it has brought to your lifestyle',
            bulletPoints: ['What the routine is', 'How you started it', 'Difficulties faced initially', 'Positive lifestyle changes'],
            suggestedIdeas: {
                0: ['Waking up at 5:30 am for meditation and brisk morning jogging', 'Digital detox before bedtime'],
                1: ['Started after reading atomic habits or experiencing chronic work fatigue'],
                2: ['Initial grogginess and temptation to hit the snooze button'],
                3: ['Enhanced cognitive focus, elevated stamina and reduced anxiety']
            }
        },
        part3Questions: [
            { id: 1, question: 'How has the ubiquitous use of smartphones disrupted traditional human circadian rhythms?', analyticalAngle: 'Blue light melatonin suppression, hyper-connectivity and fragmented attention spans.' }
        ],
        usefulCollocations: [
            { phrase: 'circadian rhythm', meaning: 'Nhịp sinh học cơ thể', exampleSentence: 'Irregular sleep schedules disrupt the body\'s natural circadian rhythm.', bandLevel: 'C2' },
            { phrase: 'unwavering self-discipline', meaning: 'Kỷ luật tự giác kiên định', exampleSentence: 'Instilling a morning routine requires unwavering self-discipline during the initial weeks.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'I used to be an incorrigible procrastinator, but recently...', usageContext: 'Thú nhận thói quen cũ và thay đổi' }
        ],
        sampleAnswers: {
            part1Band6: 'I am a morning person. I usually get up at 6 am, eat breakfast and go to school early. I do not like staying up late.',
            part1Band8: 'I am an unabashed early riser. I find that the tranquil early hours before dawn offer an unadulterated cognitive clarity that allows me to tackle mentally rigorous creative projects without interruption.',
            part2Band6: 'I want to talk about my habit of running every morning. I started two months ago. At first it was very hard to get out of bed. But now I feel much healthier and have more energy for work.',
            part2Band8: 'A transformative habit I adopted over the past six months is an early morning exercise regimen paired with mindfulness meditation. Initiated as a conscious antidote to sedentary burnout, the habit initially posed a grueling test of willpower against the siren call of the snooze button. However, once established, this morning anchor recalibrated my mental acuity, boosting physical stamina and cultivating a proactive mindset throughout the day.'
        }
    },
    // 13. Science
    {
        id: 'science',
        name: 'Science & Discoveries',
        vietnameseName: 'Khoa học & Khám phá Đột phá',
        icon: '🔬',
        part1Questions: [
            { id: 1, question: 'Did you enjoy science classes when you were in school?', sampleIdea: 'Fascination with chemistry experiments vs dry memorization of physics formulas.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe an area of science or scientific breakthrough that interests you',
            cueCardInstruction: 'You should say:\n- What field of science it is\n- When and how you became interested in it\n- What practical applications it has\n- And explain why you believe it is crucial for humanity',
            bulletPoints: ['What scientific field', 'How you got interested', 'Practical applications', 'Why it is crucial for humanity'],
            suggestedIdeas: {
                0: ['CRISPR gene editing in biotechnology', 'Renewable nuclear fusion energy', 'Quantum computing'],
                1: ['Reading science journals or watching popular science channels like Kurzgesagt'],
                2: ['Eradicating hereditary genetic disorders, revolutionizing targeted cancer therapies'],
                3: ['Presents boundless potential alongside urgent bioethical dilemmas']
            }
        },
        part3Questions: [
            { id: 1, question: 'Should scientific research be funded predominantly by national governments or private enterprise?', analyticalAngle: 'Public interest basic research vs commercial profit-driven innovation.' }
        ],
        usefulCollocations: [
            { phrase: 'groundbreaking breakthrough', meaning: 'Đột phá mang tính cách mạng', exampleSentence: 'CRISPR technology represents a groundbreaking breakthrough in modern molecular biology.', bandLevel: 'C1' },
            { phrase: 'bioethical dilemmas', meaning: 'Những tình thế tiến thoái lưỡng nan về đạo đức sinh học', exampleSentence: 'Genetic manipulation inevitably triggers complex bioethical dilemmas.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'While I do not possess a formal scientific background, I have always been captivated by...', usageContext: 'Mở đầu nói về chủ đề khoa học' }
        ],
        sampleAnswers: {
            part1Band6: 'I liked biology because I loved learning about plants and animals. But physics was too difficult with many formulas.',
            part1Band8: 'I was thoroughly captivated by biology and chemistry during my school years, primarily because laboratory experiments allowed us to tangibly witness abstract natural laws governing cellular life and chemical reactions.',
            part2Band6: 'I want to talk about genetic engineering. I learned about it on the internet. It can edit DNA to cure diseases like cancer. I think it is very important because it can save millions of sick people in the future.',
            part2Band8: 'The scientific frontier that captivates my curiosity most intensely is CRISPR-Cas9 gene editing technology. First coming across this breakthrough in a scientific periodical, I was fascinated by its mechanism—acting as molecular scissors capable of altering genomic sequences with surgical precision. Its potential applications are staggering: from eradicating congenital hereditary pathologies to engineering drought-resistant staple crops, heralding an unprecedented biological revolution.'
        }
    },
    // 14. Shopping
    {
        id: 'shopping',
        name: 'Shopping & Consumer Habits',
        vietnameseName: 'Mua sắm & Thói quen Tiêu dùng',
        icon: '🛍️',
        part1Questions: [
            { id: 1, question: 'Do you prefer e-commerce shopping or browsing brick-and-mortar stores?', sampleIdea: 'Unmatched algorithmic convenience of online shopping vs tactile sensory verification in physical retail.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a significant item you purchased that you were satisfied with',
            cueCardInstruction: 'You should say:\n- What item you bought and where\n- Why you needed to purchase it\n- How you chose which brand to buy\n- And explain why you feel satisfied with this purchase',
            bulletPoints: ['What item and where', 'Why you needed it', 'How you chose the brand', 'Why you feel satisfied'],
            suggestedIdeas: {
                0: ['An ergonomic noise-cancelling headphone', 'A high-performance lightweight laptop'],
                1: ['Needed to block noisy urban commutes and enhance study productivity'],
                2: ['Researched technical reviews and audio frequency response charts'],
                3: ['Outstanding battery longevity, superior acoustic clarity and durable build']
            }
        },
        part3Questions: [
            { id: 1, question: 'Are targeted social media advertisements manipulating consumers into unnecessary impulsive purchasing?', analyticalAngle: 'Algorithmic micro-targeting, psychological dopamine triggers and artificial scarcity.' }
        ],
        usefulCollocations: [
            { phrase: 'impulsive purchasing', meaning: 'Mua sắm bốc đồng', exampleSentence: 'Algorithmic promotions are engineered to induce impulsive purchasing among teenagers.', bandLevel: 'C1' },
            { phrase: 'value for money', meaning: 'Đáng đồng tiền bát gạo', exampleSentence: 'I prioritize product longevity and genuine value for money over conspicuous brand logos.', bandLevel: 'B2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'I pride myself on being a discerning consumer rather than an impulse buyer...', usageContext: 'Mở đầu khẳng định thói quen tiêu dùng thông thái' }
        ],
        sampleAnswers: {
            part1Band6: 'I usually buy things online because it is fast and cheap. I only go to shopping malls to buy clothes so I can try them on.',
            part1Band8: 'I predominantly utilize e-commerce platforms for utilitarian purchases due to time-efficiency and straightforward price comparisons. However, for specialized items like footwear or tailoring, I still value visiting brick-and-mortar boutiques to inspect tactile quality firsthand.',
            part2Band6: 'I want to talk about my noise-cancelling headphones. I bought them online last year because my dormitory was very noisy. They help me concentrate on studying. The sound is clear and the battery lasts for days.',
            part2Band8: 'The purchase that has yielded the greatest return on investment for me is a pair of over-ear active noise-cancelling headphones. Living in a bustling metropolitan area with ceaseless vehicular clamor, I desperately needed an auditory sanctuary to concentrate on academic research. After scrutinizing numerous technical benchmark comparisons, I invested in a premium model whose acoustic isolation and ergonomic comfort proved genuinely transformative.'
        }
    },
    // 15. Social Media
    {
        id: 'social_media',
        name: 'Social Media & Digital Life',
        vietnameseName: 'Mạng Xã hội & Đời sống Số',
        icon: '📱',
        part1Questions: [
            { id: 1, question: 'How much time do you spend on social networks every day?', sampleIdea: '1-2 hours for professional networking, keeping in touch with friends, or conscious screen-time limits.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe an interesting social media account, channel or website you follow',
            cueCardInstruction: 'You should say:\n- What the account or channel is\n- What type of content it publishes\n- How often you visit or check it\n- And explain why you find it informative or enjoyable',
            bulletPoints: ['What account or channel', 'Content published', 'Frequency of visiting', 'Why it is informative or enjoyable'],
            suggestedIdeas: {
                0: ['An educational YouTube channel like Kurzgesagt or TED-Ed', 'An architectural photography Instagram page'],
                1: ['Animated infographics breaking down complex astrophysics, philosophy and economics'],
                2: ['Checked weekly during evening downtime'],
                3: ['Combines rigorous empirical facts with visually mesmerizing motion graphics']
            }
        },
        part3Questions: [
            { id: 1, question: 'Is the addiction to short-form vertical video content eroding attention spans in younger generations?', analyticalAngle: 'Rapid dopamine feedback loops, cognitive fragmentation and diminished reading endurance.' }
        ],
        usefulCollocations: [
            { phrase: 'algorithmically curated feed', meaning: 'Bảng tin được thuật toán tuyển chọn', exampleSentence: 'Users become trapped in echo chambers by their algorithmically curated feeds.', bandLevel: 'C2' },
            { phrase: 'diminished attention span', meaning: 'Khoảng chú ý bị rút ngắn', exampleSentence: 'Excessive consumption of short-form video content has precipitated diminished attention spans.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'Social media is undeniably a double-edged sword in our digital age...', usageContext: 'Mở đầu câu hỏi mạng xã hội kinh điển' }
        ],
        sampleAnswers: {
            part1Band6: 'I use Facebook and Instagram about one hour a day. I text my friends and watch funny video clips.',
            part1Band8: 'I strive to maintain a disciplined boundary with digital platforms, restricting my usage to approximately forty-five minutes daily. I primarily use LinkedIn for occupational networking and curate my feeds strictly toward educational content.',
            part2Band6: 'I want to talk about a YouTube channel called Kurzgesagt. It makes animated videos about science, space and human biology. The drawings are very colorful and easy to understand. It makes learning science fun.',
            part2Band8: 'The digital channel I follow with unyielding enthusiasm is Kurzgesagt – In a Nutshell, an educational animation platform on YouTube. Specializing in distilling convoluted concepts in quantum mechanics, evolutionary biology, and existential philosophy into twelve-minute animated vignettes, the creators employ signature vector graphics and rigorous peer-reviewed research. What renders this channel peerless is its ability to evoke existential awe while maintaining uncompromising scientific fidelity.'
        }
    },
    // 16. Sport
    {
        id: 'sport',
        name: 'Sports & Physical Fitness',
        vietnameseName: 'Thể thao & Rèn luyện Thể chất',
        icon: '⚽',
        part1Questions: [
            { id: 1, question: 'Do you participate in any sports or physical fitness activities?', sampleIdea: 'Swimming, badminton, weightlifting, distance running.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a sporting event or match that you watched live or on television',
            cueCardInstruction: 'You should say:\n- What sport event it was and who was competing\n- Where and with whom you watched it\n- What happened during the climax of the game\n- And explain why this match was so memorable to you',
            bulletPoints: ['What event and competitors', 'Where and with whom you watched', 'What happened in the climax', 'Why it was memorable'],
            suggestedIdeas: {
                0: ['FIFA World Cup Final (Argentina vs France 2022)', 'National football championship final'],
                1: ['Watched in a lively sports cafe packed with enthusiastic fans'],
                2: ['Thrilling penalty shootout after a dramatic 3-3 deadlock in extra time'],
                3: ['Exemplified poetic sporting greatness, drama and national pride']
            }
        },
        part3Questions: [
            { id: 1, question: 'Are astronomical salaries paid to elite professional athletes justifiable?', analyticalAngle: 'Commercial market entertainment revenue vs societal contribution of teachers/doctors.' }
        ],
        usefulCollocations: [
            { phrase: 'electrifying atmosphere', meaning: 'Bầu không khí sôi động bùng nổ', exampleSentence: 'The stadium was charged with an electrifying atmosphere as the final whistle blew.', bandLevel: 'C1' },
            { phrase: 'unwavering sportsmanship', meaning: 'Tinh thần thể thao cao thượng kiên định', exampleSentence: 'Both competitors demonstrated admirable unwavering sportsmanship throughout the grueling match.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'I have witnessed my fair share of athletic spectacles, but the one that took my breath away was...', usageContext: 'Mở đầu kể về trận đấu thể thao kinh điển' }
        ],
        sampleAnswers: {
            part1Band6: 'I play badminton with my friends twice a week. It is good for my health and helps me stay fit.',
            part1Band8: 'I am a passionate practitioner of swimming and calisthenics, dedicating three sessions weekly to cardiovascular endurance. Physical exercise serves as my premier stress-management outlet, leaving me rejuvenated.',
            part2Band6: 'I want to describe the World Cup Final 2022 between Argentina and France. I watched it on TV with my friends. The game was 3-3 and went to penalties. Messi won the trophy and everyone cheered. It was the most exciting game I ever saw.',
            part2Band8: 'The athletic spectacle etched permanently into my memory is the 2022 FIFA World Cup final between Argentina and France. Watching the clash at a packed community venue amidst hundreds of spellbound spectators, the match unfolded as an operatic roller-coaster—culminating in a breathtaking 3-3 deadlock after extra time before being decided on nerve-shredding penalty shootouts. What cemented this match as unforgettable was witnessing Lionel Messi\'s career-defining triumph, capping decades of athletic perseverance.'
        }
    },
    // 17. Technology
    {
        id: 'technology',
        name: 'Technology & AI Automation',
        vietnameseName: 'Công nghệ & Tự động hóa AI',
        icon: '💻',
        part1Questions: [
            { id: 1, question: 'What piece of technology do you use most frequently every day?', sampleIdea: 'Smartphone as an omnipresent command centre, laptop workstation for productivity.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a technological device or software application that saves you time',
            cueCardInstruction: 'You should say:\n- What the device or software is\n- How you learned to use it\n- What specific tasks it performs\n- And explain how it has made your life more convenient or productive',
            bulletPoints: ['What device or software', 'How you learned to use it', 'Tasks it performs', 'Why it enhances productivity'],
            suggestedIdeas: {
                0: ['An AI-powered project management app (e.g., Notion or Obsidian)', 'A robotic vacuum cleaner'],
                1: ['Discovered via productivity tech forums or YouTube tutorials'],
                2: ['Automates knowledge management, syncs task deadlines across cloud platforms'],
                3: ['Eliminates cognitive friction and streamlines complex workflows']
            }
        },
        part3Questions: [
            { id: 1, question: 'Will generative AI automation create widespread structural unemployment across white-collar industries?', analyticalAngle: 'Displacement of routine cognitive labor vs emergence of new prompt engineering and oversight professions.' }
        ],
        usefulCollocations: [
            { phrase: 'technological leap forward', meaning: 'Bước nhảy vọt về công nghệ', exampleSentence: 'Generative AI signifies an unprecedented technological leap forward in human history.', bandLevel: 'C1' },
            { phrase: 'streamline workflows', meaning: 'Tối ưu hóa quy trình làm việc', exampleSentence: 'Cloud computing tools streamline collaborative workflows across international teams.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'In this day and age, technological integration into daily life is practically seamless...', usageContext: 'Mở đầu chủ đề công nghệ hiện đại' }
        ],
        sampleAnswers: {
            part1Band6: 'I use my laptop every day for studying, researching information and watching movies. It is very useful.',
            part1Band8: 'My ultra-portable laptop is undoubtedly the linchpin of my daily life, functioning as a portable workstation for academic research, data synthesis, and global communication.',
            part2Band6: 'I want to talk about Notion, a note-taking app on my computer. I learned it on YouTube. It organizes my study schedule, notes and homework. It saves me time because I do not lose my papers anymore.',
            part2Band8: 'The software application that has revolutionized my personal productivity is Notion, an all-in-one digital workspace. Discovered via tech productivity blogs during my university years, the application functions as my "second brain"—consolidating academic research databases, project management boards, and habit trackers into an interconnected workspace. By automating recurring workflows and centralizing disparate data, it has drastically curtailed administrative cognitive friction.'
        }
    },
    // 18. Transport
    {
        id: 'transport',
        name: 'Transport & Urban Mobility',
        vietnameseName: 'Giao thông & Phương tiện Đi lại',
        icon: '🚆',
        part1Questions: [
            { id: 1, question: 'What form of public transport do you use most frequently?', sampleIdea: 'Urban metro rail, electrified buses, ride-hailing motorbikes.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe a public transport journey that you remember well',
            cueCardInstruction: 'You should say:\n- What transport method you used and where you traveled\n- When the journey occurred and who was with you\n- What happened during the trip\n- And explain why this journey was memorable',
            bulletPoints: ['Transport method and destination', 'When and with whom', 'What happened during trip', 'Why it was memorable'],
            suggestedIdeas: {
                0: ['High-speed Shinkansen bullet train in Japan', 'Scenic overnight sleeper train through coastal Vietnam'],
                1: ['Gliding past dramatic coastal cliffs, ocean vistas and misty emerald lagoons'],
                2: ['Smooth, tranquil, offering unhurried contemplation away from airport stress']
            }
        },
        part3Questions: [
            { id: 1, question: 'How can metropolitan city councils incentivize commuters to abandon private automobiles?', analyticalAngle: 'Expanding reliable bus rapid transit (BRT), subsidizing metro passes and implementing congestion charges.' }
        ],
        usefulCollocations: [
            { phrase: 'urban gridlock', meaning: 'Ùn tắc giao thông đô thị nghiêm trọng', exampleSentence: 'Heavy investment in subway transit is the only viable panacea for urban gridlock.', bandLevel: 'C2' },
            { phrase: 'mass transit infrastructure', meaning: 'Hạ tầng giao thông công cộng quy mô lớn', exampleSentence: 'Sustainable megacities require world-class mass transit infrastructure.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'Navigating urban transit can often be an ordeal, yet on this occasion...', usageContext: 'Mở đầu kể về chuyến đi phương tiện công cộng' }
        ],
        sampleAnswers: {
            part1Band6: 'I usually take the public bus to school. The ticket is very cheap for students, although sometimes it is crowded.',
            part1Band8: 'I am a fervent advocate for urban public transit, commuting predominantly via our city\'s new elevated metro system. It offers punctuality, shielding commuters from the chaotic gridlock of surface vehicular traffic.',
            part2Band6: 'I want to talk about taking the sleeper train from Hanoi to Da Nang. I went with two friends last summer. The train took 15 hours. Looking out the window at the blue sea and green mountains was very beautiful.',
            part2Band8: 'The public transit journey that lingers most fondly in my memory is an overnight sleeper train ride from Hanoi down to the coastal city of Da Nang. Rather than opting for a commercial flight, my companions and I chose the railway to appreciate the landscape. As dawn broke, the train navigated the precarious bends of Hai Van Pass, hugging the cliffs with the sun rising over the Pacific ocean. The rhythmic cadence of the tracks and panoramic vistas made it an unforgettable voyage.'
        }
    },
    // 19. Weather
    {
        id: 'weather',
        name: 'Weather & Seasons',
        vietnameseName: 'Thời tiết & Các Mùa trong Năm',
        icon: '⛅',
        part1Questions: [
            { id: 1, question: 'What is your favourite season of the year and why?', sampleIdea: 'Autumn with crisp balmy breezes, mild golden sunlight, and comfortable outdoor weather.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe an occasion when extreme weather disrupted your plans',
            cueCardInstruction: 'You should say:\n- What kind of weather occurred and where you were\n- What you had originally planned to do\n- How the weather disrupted your schedule\n- And explain how you adapted to the situation',
            bulletPoints: ['What weather and location', 'Original plans', 'How weather disrupted schedule', 'How you adapted'],
            suggestedIdeas: {
                0: ['A torrential tropical typhoon with flash flooding', 'An unexpected heatwave or dense winter fog'],
                1: ['Planned outdoor camping trip or flight to a holiday destination cancelled'],
                2: ['Pivoted to cozy indoor board games, cooking warm soup, and reading books']
            }
        },
        part3Questions: [
            { id: 1, question: 'Are extreme weather phenomena becoming more recurrent due to anthropogenic climate change?', analyticalAngle: 'Scientific correlation between rising atmospheric temperatures and meteorological anomalies.' }
        ],
        usefulCollocations: [
            { phrase: 'torrential downpour', meaning: 'Cơn mưa xối xả như trút nước', exampleSentence: 'A sudden torrential downpour flooded the city avenues in minutes.', bandLevel: 'C1' },
            { phrase: 'balmy and temperate', meaning: 'Dịu mát và ôn hòa', exampleSentence: 'Autumn in Hanoi is renowned for its balmy and temperate climate.', bandLevel: 'C2' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'Living in a tropical nation, one becomes accustomed to sudden meteorological shifts, but...', usageContext: 'Mở đầu nói về thời tiết nhiệt đới' }
        ],
        sampleAnswers: {
            part1Band6: 'I like autumn best. The weather is cool and sunny, not too hot like summer and not too cold like winter.',
            part1Band8: 'Without hesitation, autumn is my cherished season. The oppressive tropical heat gives way to crisp, balmy breezes and golden foliage, creating an ideal climate for contemplative walking and outdoor pursuits.',
            part2Band6: 'I want to talk about a heavy storm last summer. I planned to go camping with my friends, but a big typhoon arrived with heavy rain and wind. We could not go, so we stayed home, cooked hot pot and watched movies together.',
            part2Band8: 'The incident that stands out vividly occurred two years ago when a severe tropical typhoon struck the northern coast, completely upending our long-anticipated coastal trek. As torrential downpours and gale-force gusts triggered urban flash flooding, transport networks were suspended. Instead of despairing, our group pivoted: we gathered in our apartment, brewed steaming pots of spiced tea, and spent the weekend engaged in board games and storytelling.'
        }
    },
    // 20. Study
    {
        id: 'study',
        name: 'Study, Education & Ambitions',
        vietnameseName: 'Học tập, Giáo dục & Mục tiêu Tương lai',
        icon: '🎓',
        part1Questions: [
            { id: 1, question: 'What is your current academic major or field of study?', sampleIdea: 'Computer science, international business, linguistics, biotechnology.' },
            { id: 2, question: 'Why did you choose this particular field of education?', sampleIdea: 'Intellectual passion, promising employment prospects, ambition to solve societal challenges.' }
        ],
        part2CueCard: {
            topicTitle: 'Describe an academic subject or course you took that you found particularly rewarding',
            cueCardInstruction: 'You should say:\n- What subject or course it was\n- Where and when you took it\n- What specific topics or skills you learned\n- And explain why you found this subject so rewarding',
            bulletPoints: ['What subject and where', 'When you took it', 'Topics and skills acquired', 'Why it was rewarding'],
            suggestedIdeas: {
                0: ['Applied Data Analytics or Academic Critical Thinking and Logic'],
                1: ['Taken in university sophomore year under an inspiring professor'],
                2: ['Synthesizing unstructured data, identifying cognitive biases and fallacies'],
                3: ['Fundamentally altered how I evaluate arguments, make decisions and solve real-world problems']
            }
        },
        part3Questions: [
            { id: 1, question: 'Is traditional university degree education becoming less relevant in the face of specialized micro-credentials?', analyticalAngle: 'Foundational critical thinking and research rigor vs practical, agile technical vocational skills.' },
            { id: 2, question: 'How can educational institutions adapt their curricula to prepare students for an AI-augmented job market?', analyticalAngle: 'Prioritizing meta-learning, ethical reasoning, and interpersonal emotional intelligence over rote memorization.' }
        ],
        usefulCollocations: [
            { phrase: 'intellectual rigor', meaning: 'Sự nghiêm cẩn về mặt học thuật/trí tuệ', exampleSentence: 'The university course challenged students with demanding intellectual rigor.', bandLevel: 'C2' },
            { phrase: 'critical inquiry and problem-solving', meaning: 'Tư duy phản biện và giải quyết vấn đề', exampleSentence: 'Higher education must prioritize critical inquiry and problem-solving over rote memorization.', bandLevel: 'C1' },
            { phrase: 'holistic educational experience', meaning: 'Trải nghiệm giáo dục toàn diện', exampleSentence: 'Extracurricular activities contribute immensely to a holistic educational experience.', bandLevel: 'C1' }
        ],
        suggestedNaturalPhrases: [
            { category: 'STARTING_OFF', phrase: 'When reflecting upon my academic journey thus far, the milestone that stands out is...', usageContext: 'Mở đầu chia sẻ về trải nghiệm học tập' },
            { category: 'SPECULATING', phrase: 'In an era where technological displacement is accelerating, the ultimate skill is...', usageContext: 'Nhận định về kỹ năng tương lai' }
        ],
        sampleAnswers: {
            part1Band6: 'I study Computer Science at university. I chose it because I like computers and technology, and it is easy to find a good job after graduation.',
            part1Band8: 'I am currently pursuing an undergraduate degree in Computer Science, specializing in Artificial Intelligence. What drew me to this discipline was not merely the lucrative employment trajectory, but the profound intellectual thrill of architecting algorithmic solutions to multifaceted societal challenges.',
            part2Band6: 'I want to talk about a Critical Thinking course in my second year. The professor taught us how to evaluate news, find logical errors and write good essays. It helped me become much better at debating and understanding arguments.',
            part2Band8: 'The most intellectually rewarding course I undertook during my tertiary education was a seminar on Cognitive Archaeology and Epistemology. Hosted by an inspiring visiting professor, the course challenged us to deconstruct cognitive biases, scrutinize empirical premises, and construct rigorous deductive arguments. Rather than spoon-feeding factual data, the seminar fundamentally transformed my cognitive toolkit—instilling an unyielding habit of questioning dogmas and synthesizing cross-disciplinary viewpoints.'
        }
    }
];
function getSpeakingTopicById(id) {
    return exports.IELTS_SPEAKING_20_TOPICS.find((t) => t.id === id);
}
//# sourceMappingURL=speaking-topics-db.js.map