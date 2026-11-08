import { ReadingExamPaper } from '../types/reading';
import { ExamType } from '../types/ielts';

/**
 * ĐỀ THI MẪU 1: IELTS ACADEMIC READING (40 CÂU HỎI - 3 PASSAGES)
 */
export const SAMPLE_ACADEMIC_READING_EXAM: ReadingExamPaper = {
  id: 'academic-reading-test-1',
  examType: ExamType.ACADEMIC,
  title: 'Cambridge Official Practice - IELTS Academic Reading Test 1',
  timeAllowedMinutes: 60,
  totalQuestions: 40,
  passages: [
    // -------------------------------------------------------------------------
    // PASSAGE 1: Câu 1 - 13 (Độ khó căn bản: True/False/Not Given & Summary Completion)
    // -------------------------------------------------------------------------
    {
      passageNumber: 1,
      title: 'The Secret Ecological Role of Rainforest Bats',
      subtitle: 'How nocturnal mammals sustain biodiversity in tropical ecosystems',
      wordCount: 850,
      fullText: '',
      paragraphs: [
        {
          label: 'A',
          text: 'Bats are often misunderstood creatures, frequently portrayed in folklore as sinister omens or disease carriers. However, in tropical rainforests, particularly across Southeast Asia and the Amazon Basin, bats act as indispensable ecological engineers. Over 1,400 recognized species of bats inhabit the planet, constituting roughly one-fifth of all mammalian diversity. Among these, frugivorous (fruit-eating) and nectarivorous (nectar-feeding) bats play irreplaceable roles in seed dispersal and pollination, ensuring the regenerative survival of vast tracts of ancient jungle.',
        },
        {
          label: 'B',
          text: 'Unlike birds, which typically excrete seeds while perching on tree branches, flying fruit bats frequently defecate in mid-flight. This creates an expansive "seed shadow" that scatters germinating seeds across heavily deforested clearings where few terrestrial animals dare to venture. Botanists estimate that over 500 economic plant species, including wild bananas, durians, cloves, and cashews, rely almost exclusively on nocturnal bat pollination. The economically vital durian tree, for instance, blooms almost entirely at dusk, secreting heavy musky nectar designed specifically to attract cave nectar bats (Eonycteris spelaea).',
        },
        {
          label: 'C',
          text: 'In addition to plant reproduction, insectivorous microbats provide immense natural pest suppression services. A single insect-eating bat can capture over 1,000 mosquito-sized insects in just sixty minutes of nocturnal foraging. In agricultural landscapes buffering primary forest, such as rice paddies and cacao plantations, colonies of free-tailed bats consume tens of metric tonnes of crop-destroying caterpillars and planthoppers annually. This biological pest control saves local farming communities millions of dollars each year in synthetic pesticide costs, thereby reducing chemical run-off into delicate riverine habitats.',
        },
        {
          label: 'D',
          text: 'Despite their paramount ecological contributions, tropical bat populations are experiencing catastrophic declines. Unregulated limestone quarrying for concrete manufacture obliterates crucial karst cave roosts where millions of bats breed. Simultaneously, widespread slash-and-burn agriculture fragments continuous canopies, forcing bats into perilous journeys across open terrain where they fall prey to domestic predators or collide with high-voltage power grids. Conservationists warn that without legal protection for subterranean roosting networks and aerial migration corridors, the domino effect on tropical forest ecosystems could be irreversible.',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // PASSAGE 2: Câu 14 - 26 (Độ khó trung bình: Matching Headings i-viii & Classification)
    // -------------------------------------------------------------------------
    {
      passageNumber: 2,
      title: 'Urban Vertical Architecture: Reimagining Megacities',
      subtitle: 'The engineering, ecological and psychological dimensions of high-density vertical living',
      wordCount: 920,
      fullText: '',
      paragraphs: [
        {
          label: 'A',
          text: 'As global urban populations are projected to swell by an unprecedented 2.5 billion inhabitants by the mid-century, conventional horizontal city sprawl has reached an ecological and geographic impasse. Expanding outward consumes arable agricultural perimeters, escalates transportation carbon emissions, and necessitates prohibitively expensive suburban infrastructure. In response, a visionary cadre of architects and structural engineers is advocating for vertical urbanism: consolidating residential, commercial, agricultural, and recreational functions within monumental skyward structures.',
        },
        {
          label: 'B',
          text: 'The structural foundations of supertall towers (exceeding 300 metres) have evolved dramatically beyond the traditional steel cage designs of the early twentieth century. Modern vertical architecture harnesses high-performance composite concrete infused with carbon nanotubes, paired with aerodynamic tapering and tuned mass dampers. A tuned mass damper—essentially a suspended pendulum weighing hundreds of tonnes situated near the building apex—counteracts lethal lateral oscillations caused by typhoons and seismic tremors by oscillating in anti-phase to structural sway.',
        },
        {
          label: 'C',
          text: 'However, verticality is not merely an engineering triumph; it embodies a transformative paradigm in environmental resource cycling. State-of-the-art vertical developments integrate closed-loop microclimates, featuring high-rise vertical hydroponic farms irrigated by greywater harvested from domestic bathrooms. Photovoltaic façades and integrated wind turbines embedded within building apertures generate up to forty percent of internal energy needs. By layering natural biome pockets at alternating fifteen-story intervals, these "vertical forests" absorb urban carbon dioxide while drastically curbing the heat-island effect.',
        },
        {
          label: 'D',
          text: 'Nevertheless, socio-psychological critiques of high-density vertical living remain prominent among urban sociologists. Early high-rise residential projects constructed in post-war Europe frequently engendered acute social isolation, feelings of claustrophobia, and a perceived disconnect from street-level communal life. Critics argue that stacking thousands of citizens vertically can lead to transactional relationships rather than authentic community cohesion, unless communal "sky-parks," collective dining precincts, and civic courtyards are intentionally woven into the interior architectural fabric.',
        },
        {
          label: 'E',
          text: 'Looking toward the foreseeable horizon, vertical urbanism will likely expand from isolated skyscraper monoliths into interconnected three-dimensional sky-networks. Futuristic blueprints already feature elevated sky-bridges equipped with high-speed automated transit capsules connecting adjoining towers hundreds of metres above ground level. Such interconnected aerial megastructures may redefine human civilization, turning the sky into a vibrant public realm while returning ground-level earth to ecological rewilding.',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // PASSAGE 3: Câu 27 - 40 (Độ khó nâng cao: Yes/No/Not Given, Multiple Choice & Sentence Completion)
    // -------------------------------------------------------------------------
    {
      passageNumber: 3,
      title: 'The Evolution of Human Language and Cognitive Archaeology',
      subtitle: 'Investigating the mysterious origins of symbolic communication and syntactic thought',
      wordCount: 1050,
      fullText: '',
      paragraphs: [
        {
          label: 'A',
          text: 'The genesis of human language represents one of the most enigmatic conundrums in evolutionary anthropology. Unlike anatomical milestones such as bipedalism or dental reduction, spoken words leave behind no tangible fossil record. For over a century, scholars debated whether language emerged abruptly through a single macromutation—a hypothesis prominently championed by linguist Noam Chomsky—or evolved through a protracted, gradual sequence of proto-linguistic gestures and vocal grooming over hundreds of millennia.',
        },
        {
          label: 'B',
          text: 'Recent breakthroughs in cognitive archaeology and paleogenomics have tilted the academic consensus toward an earlier, gradual timeline. The discovery of the FOXP2 gene in Neanderthal remains demonstrated that the neurological prerequisites for complex motor speech control were already present in the common ancestor of Homo sapiens and Neanderthals over 500,000 years ago. Furthermore, archaeological excavations in Blombos Cave, South Africa, revealed engraved ochre plaques and pierced marine shell beads dating back 75,000 to 100,000 years, providing undeniable evidence of externalized symbolic abstraction.',
        },
        {
          label: 'C',
          text: 'Symbolic material culture serves as an empirical proxy for grammatical syntax. To manufacture an engraved design or assemble a composite hafted spear, an early hominid must conceptualize hierarchical, recursive steps—combining raw components in a strictly regulated sequence to yield a tool whose utility transcends the sum of its individual parts. This cognitive capacity for recursive hierarchy mirrors the fundamental architecture of human syntax, wherein clauses are nested within larger sentence structures to express infinite creative permutations.',
        },
        {
          label: 'D',
          text: 'Yet, several evolutionary biologists remain skeptical of equating early tool manufacture directly with spoken language. They maintain that complex motor skills could be transmitted through observational mimicry and non-verbal gesturing rather than full-blown grammar. In their view, the communicative burst that triggered the Upper Paleolithic artistic revolution—manifested in the sublime cave paintings of Chauvet and Lascaux 35,000 years ago—reflects an unprecedented cognitive rewiring unique solely to Homo sapiens, rather than a shared archaic legacy.',
        },
        {
          label: 'E',
          text: 'Ultimately, unravelling the birth of language demands a synthesis of genetic mapping, computer simulations of cultural transmission, and neural brain imaging. Language was not merely an instrumental invention for sharing practical information regarding food sources or predator threats; it was the cognitive catalyst that unlocked shared collective mythologies, inter-tribal trade treaties, and the cumulative cultural transmission that separates humanity from every other species on the planet.',
        },
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // 40 QUESTIONS COMPILATION (ACADEMIC)
  // ---------------------------------------------------------------------------
  questions: [
    // Passage 1: Questions 1 - 7 (True / False / Not Given)
    {
      id: 1,
      passageNumber: 1,
      type: 'TRUE_FALSE_NOT_GIVEN',
      prompt: 'Bats make up approximately 20% of all living mammal species.',
      correctAnswer: 'TRUE',
      contextQuote: '...constituting roughly one-fifth of all mammalian diversity.',
    },
    {
      id: 2,
      passageNumber: 1,
      type: 'TRUE_FALSE_NOT_GIVEN',
      prompt: 'Fruit-eating bats drop seeds only when resting in trees.',
      correctAnswer: 'FALSE',
      contextQuote: 'Unlike birds, which typically excrete seeds while perching on tree branches, flying fruit bats frequently defecate in mid-flight.',
    },
    {
      id: 3,
      passageNumber: 1,
      type: 'TRUE_FALSE_NOT_GIVEN',
      prompt: 'The durian flower opens primarily during the daytime.',
      correctAnswer: 'FALSE',
      contextQuote: 'The economically vital durian tree, for instance, blooms almost entirely at dusk...',
    },
    {
      id: 4,
      passageNumber: 1,
      type: 'TRUE_FALSE_NOT_GIVEN',
      prompt: 'Insect-eating bats feed mainly on crop caterpillars rather than mosquitoes.',
      correctAnswer: 'NOT GIVEN',
      contextQuote: 'A single insect-eating bat can capture over 1,000 mosquito-sized insects... consume tens of metric tonnes of crop-destroying caterpillars...',
    },
    {
      id: 5,
      passageNumber: 1,
      type: 'TRUE_FALSE_NOT_GIVEN',
      prompt: 'Biological pest control by bats helps decrease chemical contamination in rivers.',
      correctAnswer: 'TRUE',
      contextQuote: '...reducing chemical run-off into delicate riverine habitats.',
    },
    {
      id: 6,
      passageNumber: 1,
      type: 'TRUE_FALSE_NOT_GIVEN',
      prompt: 'Limestone quarrying in Southeast Asia has completely ceased due to environmental laws.',
      correctAnswer: 'FALSE',
      contextQuote: 'Unregulated limestone quarrying for concrete manufacture obliterates crucial karst cave roosts...',
    },
    {
      id: 7,
      passageNumber: 1,
      type: 'TRUE_FALSE_NOT_GIVEN',
      prompt: 'Domestic predators kill more bats annually than power lines do.',
      correctAnswer: 'NOT GIVEN',
      contextQuote: '...where they fall prey to domestic predators or collide with high-voltage power grids.',
    },

    // Passage 1: Questions 8 - 13 (Summary Completion)
    {
      id: 8,
      passageNumber: 1,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Complete summary: Fruit bats create an expansive _____ that spreads seeds over deforested areas.',
      correctAnswer: 'seed shadow',
      contextQuote: 'This creates an expansive "seed shadow" that scatters germinating seeds...',
    },
    {
      id: 9,
      passageNumber: 1,
      type: 'SUMMARY_COMPLETION',
      prompt: 'More than 500 plants rely on _____ pollination carried out by bats.',
      correctAnswer: 'nocturnal',
      contextQuote: '...rely almost exclusively on nocturnal bat pollination.',
    },
    {
      id: 10,
      passageNumber: 1,
      type: 'SUMMARY_COMPLETION',
      prompt: 'The flowers of durian trees secrete a _____ nectar to attract bats.',
      correctAnswer: 'musky',
      contextQuote: '...secreting heavy musky nectar designed specifically to attract cave nectar bats...',
    },
    {
      id: 11,
      passageNumber: 1,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Colonies of bats eliminate crop-destroying caterpillars in agricultural areas such as _____ plantations.',
      correctAnswer: 'cacao',
      contextQuote: '...such as rice paddies and cacao plantations...',
    },
    {
      id: 12,
      passageNumber: 1,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Bats suffer habitat loss when quarrying destroys their breeding sites in _____ caves.',
      correctAnswer: 'karst',
      contextQuote: '...obliterates crucial karst cave roosts where millions of bats breed.',
    },
    {
      id: 13,
      passageNumber: 1,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Widespread _____ agriculture breaks up continuous forest canopies.',
      correctAnswer: 'slash-and-burn',
      contextQuote: 'Simultaneously, widespread slash-and-burn agriculture fragments continuous canopies...',
    },

    // Passage 2: Questions 14 - 18 (Matching Paragraph Headings)
    {
      id: 14,
      passageNumber: 2,
      type: 'MATCHING_HEADINGS',
      paragraphRef: 'Paragraph A',
      prompt: 'Choose the correct heading for Paragraph A:',
      headingsList: [
        { romanNumeral: 'i', text: 'Technological innovations mitigating extreme structural sway' },
        { romanNumeral: 'ii', text: 'The ecological limits of outward suburban expansion' },
        { romanNumeral: 'iii', text: 'Closed-loop environmental systems and microclimates' },
        { romanNumeral: 'iv', text: 'Social isolation concerns in high-density towers' },
        { romanNumeral: 'v', text: 'Interconnected sky-bridges in the cities of tomorrow' },
        { romanNumeral: 'vi', text: 'Historical evolution of single-family residences' },
      ],
      correctAnswer: 'ii',
      contextQuote: 'Expanding outward consumes arable agricultural perimeters, escalates transportation carbon emissions...',
    },
    {
      id: 15,
      passageNumber: 2,
      type: 'MATCHING_HEADINGS',
      paragraphRef: 'Paragraph B',
      prompt: 'Choose the correct heading for Paragraph B:',
      headingsList: [
        { romanNumeral: 'i', text: 'Technological innovations mitigating extreme structural sway' },
        { romanNumeral: 'ii', text: 'The ecological limits of outward suburban expansion' },
        { romanNumeral: 'iii', text: 'Closed-loop environmental systems and microclimates' },
        { romanNumeral: 'iv', text: 'Social isolation concerns in high-density towers' },
        { romanNumeral: 'v', text: 'Interconnected sky-bridges in the cities of tomorrow' },
      ],
      correctAnswer: 'i',
      contextQuote: 'Modern vertical architecture harnesses... A tuned mass damper counteracts lethal lateral oscillations...',
    },
    {
      id: 16,
      passageNumber: 2,
      type: 'MATCHING_HEADINGS',
      paragraphRef: 'Paragraph C',
      prompt: 'Choose the correct heading for Paragraph C:',
      headingsList: [
        { romanNumeral: 'i', text: 'Technological innovations mitigating extreme structural sway' },
        { romanNumeral: 'ii', text: 'The ecological limits of outward suburban expansion' },
        { romanNumeral: 'iii', text: 'Closed-loop environmental systems and microclimates' },
        { romanNumeral: 'iv', text: 'Social isolation concerns in high-density towers' },
        { romanNumeral: 'v', text: 'Interconnected sky-bridges in the cities of tomorrow' },
      ],
      correctAnswer: 'iii',
      contextQuote: 'State-of-the-art vertical developments integrate closed-loop microclimates, featuring high-rise vertical hydroponic farms...',
    },
    {
      id: 17,
      passageNumber: 2,
      type: 'MATCHING_HEADINGS',
      paragraphRef: 'Paragraph D',
      prompt: 'Choose the correct heading for Paragraph D:',
      headingsList: [
        { romanNumeral: 'i', text: 'Technological innovations mitigating extreme structural sway' },
        { romanNumeral: 'ii', text: 'The ecological limits of outward suburban expansion' },
        { romanNumeral: 'iii', text: 'Closed-loop environmental systems and microclimates' },
        { romanNumeral: 'iv', text: 'Social isolation concerns in high-density towers' },
        { romanNumeral: 'v', text: 'Interconnected sky-bridges in the cities of tomorrow' },
      ],
      correctAnswer: 'iv',
      contextQuote: '...socio-psychological critiques of high-density vertical living remain prominent among urban sociologists.',
    },
    {
      id: 18,
      passageNumber: 2,
      type: 'MATCHING_HEADINGS',
      paragraphRef: 'Paragraph E',
      prompt: 'Choose the correct heading for Paragraph E:',
      headingsList: [
        { romanNumeral: 'i', text: 'Technological innovations mitigating extreme structural sway' },
        { romanNumeral: 'ii', text: 'The ecological limits of outward suburban expansion' },
        { romanNumeral: 'iii', text: 'Closed-loop environmental systems and microclimates' },
        { romanNumeral: 'iv', text: 'Social isolation concerns in high-density towers' },
        { romanNumeral: 'v', text: 'Interconnected sky-bridges in the cities of tomorrow' },
      ],
      correctAnswer: 'v',
      contextQuote: 'Futuristic blueprints already feature elevated sky-bridges equipped with high-speed automated transit capsules...',
    },

    // Passage 2: Questions 19 - 26 (Classification & Summary)
    {
      id: 19,
      passageNumber: 2,
      type: 'CLASSIFICATION',
      prompt: 'Tuned mass dampers function primarily to resist:',
      options: ['A. Internal electricity loss', 'B. Earthquakes and typhoon vibrations', 'C. Overheating from sunlight'],
      correctAnswer: 'B',
      contextQuote: '...counteracts lethal lateral oscillations caused by typhoons and seismic tremors...',
    },
    {
      id: 20,
      passageNumber: 2,
      type: 'CLASSIFICATION',
      prompt: 'Hydroponic farms inside vertical buildings are watered using:',
      options: ['A. Purified bottled water', 'B. Recycled household greywater', 'C. Desalinated sea water'],
      correctAnswer: 'B',
      contextQuote: '...featuring high-rise vertical hydroponic farms irrigated by greywater harvested from domestic bathrooms.',
    },
    {
      id: 21,
      passageNumber: 2,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Super-tall concrete is reinforced using microscopic carbon _____.',
      correctAnswer: 'nanotubes',
      contextQuote: '...harnesses high-performance composite concrete infused with carbon nanotubes...',
    },
    {
      id: 22,
      passageNumber: 2,
      type: 'SUMMARY_COMPLETION',
      prompt: 'A tuned mass damper acts as a suspended _____ swinging opposite to building movement.',
      correctAnswer: 'pendulum',
      contextQuote: 'A tuned mass damper—essentially a suspended pendulum weighing hundreds of tonnes...',
    },
    {
      id: 23,
      passageNumber: 2,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Photovoltaic façades and integrated wind turbines supply as much as _____ percent of internal power.',
      correctAnswer: '40 // forty',
      contextQuote: '...generate up to forty percent of internal energy needs.',
    },
    {
      id: 24,
      passageNumber: 2,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Vertical gardens help lower the urban heat-_____ effect in congested city areas.',
      correctAnswer: 'island',
      contextQuote: '...while drastically curbing the heat-island effect.',
    },
    {
      id: 25,
      passageNumber: 2,
      type: 'MULTIPLE_CHOICE',
      prompt: 'What architectural feature is suggested to prevent feelings of isolation in vertical towers?',
      options: [
        'A. Faster elevators with panoramic glass',
        'B. Communal sky-parks and shared dining halls',
        'C. Larger private balcony spaces',
      ],
      correctAnswer: 'B',
      contextQuote: '...unless communal "sky-parks," collective dining precincts, and civic courtyards are intentionally woven...',
    },
    {
      id: 26,
      passageNumber: 2,
      type: 'MULTIPLE_CHOICE',
      prompt: 'By moving functions into connected sky-bridges, what can happen to ground-level land?',
      options: [
        'A. It can be dedicated to ecological rewilding',
        'B. It can be converted into motorways',
        'C. It will become completely unusable',
      ],
      correctAnswer: 'A',
      contextQuote: '...turning the sky into a vibrant public realm while returning ground-level earth to ecological rewilding.',
    },

    // Passage 3: Questions 27 - 33 (Yes / No / Not Given - Writer's views)
    {
      id: 27,
      passageNumber: 3,
      type: 'YES_NO_NOT_GIVEN',
      prompt: "Noam Chomsky asserted that human language evolved in a slow, gradual step-by-step process.",
      correctAnswer: 'NO',
      contextQuote: '...whether language emerged abruptly through a single macromutation—a hypothesis prominently championed by linguist Noam Chomsky...',
    },
    {
      id: 28,
      passageNumber: 3,
      type: 'YES_NO_NOT_GIVEN',
      prompt: 'The FOXP2 gene existed in the shared ancestor of modern humans and Neanderthals.',
      correctAnswer: 'YES',
      contextQuote: 'The discovery of the FOXP2 gene in Neanderthal remains demonstrated that the neurological prerequisites... were already present in the common ancestor...',
    },
    {
      id: 29,
      passageNumber: 3,
      type: 'YES_NO_NOT_GIVEN',
      prompt: 'The engraved artifacts at Blombos Cave were the oldest artistic relics ever discovered in Africa.',
      correctAnswer: 'NOT GIVEN',
      contextQuote: '...excavations in Blombos Cave, South Africa, revealed engraved ochre plaques... dating back 75,000 to 100,000 years, providing undeniable evidence...',
    },
    {
      id: 30,
      passageNumber: 3,
      type: 'YES_NO_NOT_GIVEN',
      prompt: 'Making composite hafted tools requires a sequential cognitive process akin to grammar.',
      correctAnswer: 'YES',
      contextQuote: 'This cognitive capacity for recursive hierarchy mirrors the fundamental architecture of human syntax...',
    },
    {
      id: 31,
      passageNumber: 3,
      type: 'YES_NO_NOT_GIVEN',
      prompt: 'All evolutionary scientists concur that spear-making implies spoken language ability.',
      correctAnswer: 'NO',
      contextQuote: 'Yet, several evolutionary biologists remain skeptical of equating early tool manufacture directly with spoken language.',
    },
    {
      id: 32,
      passageNumber: 3,
      type: 'YES_NO_NOT_GIVEN',
      prompt: 'The paintings at Chauvet Cave were created using advanced natural dyes imported from overseas.',
      correctAnswer: 'NOT GIVEN',
      contextQuote: '...manifested in the sublime cave paintings of Chauvet and Lascaux 35,000 years ago...',
    },
    {
      id: 33,
      passageNumber: 3,
      type: 'YES_NO_NOT_GIVEN',
      prompt: 'Language was primarily useful only for basic hunting instructions and alarm calls.',
      correctAnswer: 'NO',
      contextQuote: 'Language was not merely an instrumental invention for sharing practical information regarding food sources or predator threats; it was the cognitive catalyst...',
    },

    // Passage 3: Questions 34 - 40 (Multiple Choice & Sentence Completion)
    {
      id: 34,
      passageNumber: 3,
      type: 'MULTIPLE_CHOICE',
      prompt: 'Why do spoken words pose unique challenges for evolutionary archaeologists?',
      options: [
        'A. Ancient languages were too simple to analyze',
        'B. Spoken words leave no physical fossil remains',
        'C. Modern genetic technology cannot examine speech',
      ],
      correctAnswer: 'B',
      contextQuote: 'Unlike anatomical milestones such as bipedalism or dental reduction, spoken words leave behind no tangible fossil record.',
    },
    {
      id: 35,
      passageNumber: 3,
      type: 'MULTIPLE_CHOICE',
      prompt: 'What did the engraved plaques at Blombos Cave demonstrate?',
      options: [
        'A. The invention of agriculture',
        'B. The emergence of externalized symbolic thinking',
        'C. The first written alphabet',
      ],
      correctAnswer: 'B',
      contextQuote: '...providing undeniable evidence of externalized symbolic abstraction.',
    },
    {
      id: 36,
      passageNumber: 3,
      type: 'SUMMARY_COMPLETION',
      prompt: 'The motor prerequisites for speech speech control were identified by analyzing the _____ gene.',
      correctAnswer: 'FOXP2',
      contextQuote: 'The discovery of the FOXP2 gene in Neanderthal remains demonstrated...',
    },
    {
      id: 37,
      passageNumber: 3,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Recursive hierarchy in early tool manufacture parallels the rules of sentence _____.',
      correctAnswer: 'syntax',
      contextQuote: '...mirrors the fundamental architecture of human syntax...',
    },
    {
      id: 38,
      passageNumber: 3,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Skeptical biologists argue that early spear making could be copied through visual _____ and non-verbal gestures.',
      correctAnswer: 'mimicry',
      contextQuote: '...could be transmitted through observational mimicry and non-verbal gesturing...',
    },
    {
      id: 39,
      passageNumber: 3,
      type: 'SUMMARY_COMPLETION',
      prompt: 'The artistic explosion of the Upper Paleolithic is exemplified by the cave art at _____ and Lascaux.',
      correctAnswer: 'Chauvet',
      contextQuote: '...manifested in the sublime cave paintings of Chauvet and Lascaux...',
    },
    {
      id: 40,
      passageNumber: 3,
      type: 'SUMMARY_COMPLETION',
      prompt: 'Language served as the intellectual _____ that fostered collective mythologies and treaties.',
      correctAnswer: 'catalyst',
      contextQuote: '...it was the cognitive catalyst that unlocked shared collective mythologies...',
    },
  ],
};
