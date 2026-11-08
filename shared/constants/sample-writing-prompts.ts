import { WritingPrompt } from '../types/writing';
import { ExamType } from '../types/ielts';

export const SAMPLE_WRITING_PROMPTS: WritingPrompt[] = [
  // ---------------------------------------------------------------------------
  // TASK 1: ACADEMIC (Line Graph / Bar Chart)
  // ---------------------------------------------------------------------------
  {
    id: 'acad-task-1-energy',
    taskType: 'TASK_1_ACADEMIC',
    examType: ExamType.ACADEMIC,
    title: 'Academic Task 1: Renewable Energy Consumption in Three Nations (2000 - 2025)',
    promptQuestion:
      'The line graph below shows the percentage of electricity generated from renewable energy sources in three European countries (Germany, the UK, and France) between 2000 and 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    visualDataDescription: `
Data Table Breakdown (% of total electricity generated):
- Year 2000: Germany (6%), the UK (3%), France (12%)
- Year 2010: Germany (17%), the UK (7%), France (14%)
- Year 2020: Germany (42%), the UK (38%), France (23%)
- Year 2025: Germany (53%), the UK (48%), France (27%)
Key Trends:
1. Significant overall upward trajectory across all three nations.
2. Germany witnessed the steepest exponential rise, surpassing France around 2007.
3. The UK grew dramatically post-2010, closely trailing Germany by 2025.
4. France experienced the slowest and most modest rate of expansion.
`,
    recommendedMinutes: 20,
    minimumWords: 150,
  },

  // ---------------------------------------------------------------------------
  // TASK 1: GENERAL TRAINING (Formal Letter of Complaint)
  // ---------------------------------------------------------------------------
  {
    id: 'gen-task-1-complaint',
    taskType: 'TASK_1_GENERAL',
    examType: ExamType.GENERAL_TRAINING,
    title: 'General Training Task 1: Letter of Complaint to Property Management',
    promptQuestion:
      'You recently moved into a rented apartment, but you have discovered several serious maintenance issues that were not resolved before your arrival.\n\nWrite a formal letter to your building property manager. In your letter:\n- Introduce yourself and give details of your apartment.\n- Describe the problems and how they affect your daily living.\n- Explain what specific actions you expect the manager to take and by when.\n\nWrite at least 150 words. You do NOT need to write any addresses. Begin your letter with: Dear Sir or Madam,',
    bulletPoints: [
      'Introduce yourself and state your apartment unit number and lease starting date.',
      'Detail the malfunctions (e.g., leaking bathroom pipes, faulty heating unit, broken window latch).',
      'Set a reasonable but firm deadline for repairs and request confirmation in writing.',
    ],
    recommendedMinutes: 20,
    minimumWords: 150,
  },

  // ---------------------------------------------------------------------------
  // TASK 2: ESSAY (Academic & General Training - Discuss Both Views)
  // ---------------------------------------------------------------------------
  {
    id: 'essay-task-2-artificial-intelligence',
    taskType: 'TASK_2_ESSAY',
    examType: ExamType.ACADEMIC,
    title: 'Task 2 Essay: Artificial Intelligence in Education and Healthcare',
    promptQuestion:
      'Some people believe that artificial intelligence (AI) will soon replace human teachers and healthcare professionals, bringing higher efficiency and equal access to knowledge. Others argue that human empathy, emotional intelligence, and critical thinking can never be substituted by automated technology.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    bulletPoints: [
      'View 1: The advantages of AI in delivering individualized 24/7 learning and diagnostic precision.',
      'View 2: The indispensability of human compassion, ethical moral judgment, and motivational mentorship.',
      'Your Opinion: A balanced synergy where AI serves as a powerful augmenting tool rather than a full replacement.',
    ],
    recommendedMinutes: 40,
    minimumWords: 250,
  },
];
