/**
 * IELTS GO! - Writing Studio Database
 * Kho đề bài Task 1 (Academic & General Training) & Task 2 Essay
 * Tích hợp biểu đồ trực quan SVG, Signpost Words, và Bài mẫu 3 tầng Band (5.0, 6.5, 8.0+) kèm Examiner's Comments
 */

const IELTS_WRITING_PROMPTS_DATABASE = [
  // ================= 1. ACADEMIC TASK 1: LINE GRAPH =================
  {
    id: 'acad-line-energy',
    track: 'ACADEMIC',
    taskType: 'TASK_1',
    chartType: 'Line Graph (Biểu đồ đường)',
    title: 'Academic Task 1: Renewable Energy Generation in Three European Nations (2000 - 2025)',
    promptQuestion: `The line graph below illustrates the percentage of electricity generated from renewable energy sources in three European countries (Germany, the UK, and France) between 2000 and 2025.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    recommendedMinutes: 20,
    minimumWords: 150,
    visualSvg: `
      <svg viewBox="0 0 500 240" class="chart-svg-render" style="width: 100%; max-height: 220px; background: #FFFFFF; border-radius: 8px;">
        <!-- Axes -->
        <line x1="50" y1="20" x2="50" y2="200" stroke="#CBD5E1" stroke-width="2"/>
        <line x1="50" y1="200" x2="470" y2="200" stroke="#CBD5E1" stroke-width="2"/>
        <!-- Grid lines & Y labels -->
        <text x="25" y="25" font-size="10" fill="#64748B">60%</text>
        <line x1="50" y1="20" x2="470" y2="20" stroke="#F1F5F9" stroke-dasharray="4"/>
        <text x="25" y="85" font-size="10" fill="#64748B">40%</text>
        <line x1="50" y1="80" x2="470" y2="80" stroke="#F1F5F9" stroke-dasharray="4"/>
        <text x="25" y="145" font-size="10" fill="#64748B">20%</text>
        <line x1="50" y1="140" x2="470" y2="140" stroke="#F1F5F9" stroke-dasharray="4"/>
        <text x="35" y="200" font-size="10" fill="#64748B">0%</text>
        <!-- X labels -->
        <text x="50" y="218" font-size="10" font-weight="700" fill="#475569">2000</text>
        <text x="180" y="218" font-size="10" font-weight="700" fill="#475569">2010</text>
        <text x="310" y="218" font-size="10" font-weight="700" fill="#475569">2020</text>
        <text x="440" y="218" font-size="10" font-weight="700" fill="#475569">2025</text>
        <!-- Line: Germany (Red / #E11D48) -->
        <polyline points="50,188 180,149 310,74 440,41" fill="none" stroke="#E11D48" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="188" r="4" fill="#E11D48"/>
        <circle cx="180" cy="149" r="4" fill="#E11D48"/>
        <circle cx="310" cy="74" r="4" fill="#E11D48"/>
        <circle cx="440" cy="41" r="4" fill="#E11D48"/>
        <!-- Line: UK (Blue / #2563EB) -->
        <polyline points="50,194 180,179 310,86 440,56" fill="none" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="194" r="4" fill="#2563EB"/>
        <circle cx="180" cy="179" r="4" fill="#2563EB"/>
        <circle cx="310" cy="86" r="4" fill="#2563EB"/>
        <circle cx="440" cy="56" r="4" fill="#2563EB"/>
        <!-- Line: France (Amber / #D97706) -->
        <polyline points="50,164 180,158 310,131 440,119" fill="none" stroke="#D97706" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="164" r="4" fill="#D97706"/>
        <circle cx="180" cy="158" r="4" fill="#D97706"/>
        <circle cx="310" cy="131" r="4" fill="#D97706"/>
        <circle cx="440" cy="119" r="4" fill="#D97706"/>
        <!-- Legend -->
        <rect x="250" y="8" width="12" height="4" fill="#E11D48"/>
        <text x="268" y="12" font-size="10" font-weight="700" fill="#E11D48">Germany (53%)</text>
        <rect x="350" y="8" width="12" height="4" fill="#2563EB"/>
        <text x="368" y="12" font-size="10" font-weight="700" fill="#2563EB">UK (48%)</text>
        <rect x="420" y="8" width="12" height="4" fill="#D97706"/>
        <text x="438" y="12" font-size="10" font-weight="700" fill="#D97706">France (27%)</text>
      </svg>
    `,
    keyFeatures: [
      'Xu hướng chung: Cả 3 quốc gia đều chứng kiến sự gia tăng tỷ trọng năng lượng tái tạo.',
      'Đột phá mạnh nhất: Đức tăng vượt bậc từ 6% (2000) lên 53% (2025), vượt Pháp vào khoảng năm 2007.',
      'Tăng tốc thần tốc: Vương quốc Anh tăng vọt sau 2010, tiệm cận Đức ở mức 48% vào năm 2025.',
      'Tăng trưởng khiêm tốn: Pháp khởi đầu cao nhất (12%) nhưng tăng chậm nhất, kết thúc ở 27%.'
    ],
    sampleBand5: `The graph shows renewable energy in Germany, UK, and France from 2000 to 2025.
In 2000, France was highest with 12%. Germany was 6% and UK was 3%. In 2010, Germany increased to 17% and UK was 7%. France was 14%.
In 2020, Germany was 42% and UK was 38%. France was 23%. In 2025, Germany was 53% and UK was 48%. France was 27%.
Overall, all countries went up. Germany was the highest and France was the lowest.`,
    examinerCommentBand5: `Examiner's Remarks:
- Task Achievement: Thí sinh liệt kê số liệu đơn thuần theo từng năm một cách máy móc, thiếu tổng quan (Overview) rõ nét và thiếu các phép so sánh tương quan giữa các quốc gia.
- Coherence & Cohesion: Câu văn ngắn, lặp cấu trúc "In [year], [country] was [X]%", thiếu từ nối so sánh.
- Lexical Resource: Vốn từ đơn điệu (went up, highest, lowest). Đánh giá: Band 5.0.`,

    sampleBand65: `The provided line graph illustrates the proportion of electricity produced from renewable energy in Germany, the United Kingdom, and France between 2000 and 2025.
Overall, all three countries experienced an upward trend over the 25-year period. Germany and the UK demonstrated the most dramatic rises, whereas France showed a much slower rate of increase.
In 2000, France led the group at 12%, followed by Germany at 6% and the UK at just 3%. Over the next decade, German renewable output climbed steadily to 17%, overtaking France in roughly 2007, while the UK grew slightly to 7%.
From 2010 onward, green energy generation in both Germany and the UK accelerated rapidly. By 2020, figures reached 42% and 38% respectively. This steep climb continued until 2025, when Germany peaked at 53% and the UK reached 48%. In contrast, France experienced only moderate growth, finishing at 27%.`,
    examinerCommentBand65: `Examiner's Remarks:
- Task Achievement: Có Overview rõ ràng bao quát xu hướng chính. Đã chọn lọc các mốc số liệu nổi bật.
- Coherence & Cohesion: Phân chia 2 đoạn thân bài hợp lý theo mốc thời gian và nhóm dữ liệu.
- Lexical Resource: Có sử dụng một số collocations tốt (upward trend, accelerated rapidly, moderate growth). Đánh giá: Band 6.5.`,

    sampleBand8: `The line graph delineates the proportion of electricity generated from renewable energy sources across three European nations—Germany, the United Kingdom, and France—spanning the period from 2000 to 2025.

Overall, it is readily discernible that all three economies underwent an overarching upward trajectory over the 25-year timeframe. Notably, Germany and the UK witnessed exponential surges to emerge as dominant leaders, whereas France exhibited comparatively sluggish expansion.

In 2000, France held the preeminent position, deriving 12% of its domestic electricity from renewables, which doubled the German figure (6%) and quadrupled that of the UK (3%). However, Germany experienced steady expansion over the ensuing decade, eclipsing France around 2007 to reach 17% by 2010, during which the UK showed modest growth to 7%.

The post-2010 era was characterized by a dramatic acceleration in renewable adoption for both Germany and the UK. British renewable output surged over fivefold to 38% in 2020 before culminating at 48% in 2025, closely trailing Germany, which peaked at a commanding 53%. Conversely, France recorded a far more subdued trajectory, plateauing gently to conclude the timeframe at 27%, thereby transitioning from the foremost producer to the lowest.`,
    examinerCommentBand8: `Examiner's Remarks:
- Task Achievement: Tổng quan sắc bén, so sánh số liệu bậc thầy ("eclipsing France around 2007", "surged over fivefold", "transitioning from foremost to lowest").
- Coherence & Cohesion: Mạch văn liên kết tuyệt đối mượt mà, phân chia đoạn hoàn hảo theo tiến trình thời gian.
- Lexical Resource: Vốn từ C1/C2 học thuật phong phú và chính xác (delineates, overarching upward trajectory, preeminent position, subdued trajectory).
- Grammatical Range: Kiểm soát hoàn hảo các mệnh đề quan hệ rút gọn, câu phức và đảo ngữ. Đánh giá: Band 8.5.`,
  },

  // ================= 2. GENERAL TRAINING TASK 1: FORMAL LETTER =================
  {
    id: 'gen-letter-complaint',
    track: 'GENERAL_TRAINING',
    taskType: 'TASK_1',
    chartType: 'Formal Letter (Thư trang trọng)',
    title: 'General Training Task 1: Letter of Complaint Regarding Rental Apartment Maintenance',
    promptQuestion: `You recently moved into a rented apartment, but you have discovered several serious maintenance issues that were not resolved before your arrival.

Write a formal letter to your building property manager. In your letter:
- Introduce yourself and give details of your apartment.
- Describe the problems and how they affect your daily living.
- Explain what specific actions you expect the manager to take and by when.

Write at least 150 words. You do NOT need to write any addresses. Begin your letter with: "Dear Sir or Madam,"`,
    recommendedMinutes: 20,
    minimumWords: 150,
    visualSvg: `
      <div style="background: #F8FAFC; border: 1.5px dashed #CBD5E1; border-radius: 8px; padding: 16px; text-align: left; font-size: 13px; color: #334155;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 20px;">🏢</span>
          <strong style="color: #0F172A;">Apartment 4B, Victoria Residences, Manchester</strong>
        </div>
        <p style="margin: 0 0 6px 0;"><strong>Tình huống:</strong> Học viên vừa nhận nhà vào đầu tháng nhưng phát hiện đường ống nước rò rỉ gây ngập sàn bếp, điều hòa bị hỏng và ổ khóa cửa sổ ban công bị kẹt.</p>
        <p style="margin: 0; color: #D97706;"><strong>Yêu cầu văn phong:</strong> Formal Letter (Trang trọng, lịch thiệp, dứt khoát; tránh viết tắt và tránh dùng từ ngữ thân mật suồng sã).</p>
      </div>
    `,
    keyFeatures: [
      'Mục đích: Nêu rõ danh tính, căn hộ và lý do viết thư ngay đoạn đầu.',
      'Chi tiết sự cố: Mô tả cụ thể các hỏng hóc và tác động tiêu cực đến sinh hoạt thường ngày.',
      'Hành động kỳ vọng: Đưa ra thời hạn cụ thể (Deadline) và yêu cầu kỹ thuật viên đến sửa chữa.'
    ],
    sampleBand5: `Dear Sir or Madam,
I am writing to complain about my apartment. My name is Nam and I live in Apartment 4B. I moved in last Monday.
The apartment has many problems. The water pipe in the kitchen is leaking and water is all over the floor. It is very dirty and bad. Also, the air conditioner is broken so my room is very hot. I cannot sleep well at night.
You must send someone to fix it immediately because I pay high rent. I want you to fix it by tomorrow.
Thank you,
Nam`,
    examinerCommentBand5: `Examiner's Remarks:
- Văn phong chưa đạt chuẩn thư trang trọng (dùng câu ngắn cộc lốc, giọng điệu có phần hung hăng không cần thiết "You must send someone immediately").
- Từ vựng lặp và quá đơn giản (very dirty and bad, very hot). Đạt khoảng 110 từ (dưới 150 từ bị phạt nặng Task Achievement). Đánh giá: Band 5.0.`,

    sampleBand65: `Dear Sir or Madam,

I am writing to formally register a complaint regarding multiple maintenance issues in Apartment 4B of Victoria Residences, which I recently leased starting on the 1st of this month.

Regrettably, upon moving in, I discovered several persistent defects that were supposed to be repaired beforehand. Firstly, the plumbing beneath the kitchen sink is leaking continuously, resulting in minor flooding on the timber floor. Furthermore, the central air conditioning unit fails to operate, making the living environment uncomfortably humid. Additionally, the window latch in the master bedroom is jammed, posing an undeniable security concern.

Given that these malfunctions severely disrupt my daily routine, I request that an accredited repair technician be dispatched to inspect and resolve these matters. I expect these repairs to be completed no later than Friday, 12th November.

I look forward to your prompt response.

Yours faithfully,
Nguyen Van An`,
    examinerCommentBand65: `Examiner's Remarks:
- Thư đạt chuẩn độ dài (>160 từ), văn phong Formal nhất quán, trả lời đầy đủ cả 3 bullet points.
- Từ vựng trang trọng (formally register a complaint, persistent defects, accredited repair technician). Đánh giá: Band 6.5.`,

    sampleBand8: `Dear Sir or Madam,

I am writing to formally draw your attention to several significant maintenance deficiencies within Apartment 4B of Victoria Residences, for which I signed a one-year tenancy agreement commencing on 1st November.

Contrary to the verbal assurances provided during the property inspection, the premises were handed over in a substandard condition. Most urgently, the drainage pipe beneath the kitchen sink has ruptured, causing persistent water leakage that threatens to compromise the integrity of the parquet flooring. Furthermore, the climate control heating system remains completely inoperative, rendering the apartment virtually uninhabitable during current sub-zero temperatures. Lastly, the sliding glass balcony door lacks a functional security latch, presenting a grave vulnerability.

In light of the fact that these conditions infringe upon the habitability terms stipulated in our lease agreement, I trust you will treat this matter with the utmost urgency. I request that certified maintenance personnel be deployed to rectify all highlighted faults no later than 5:00 PM on Friday, 12th November.

Should these repairs fail to materialize within the stipulated timeframe, I will have no alternative but to escalate this grievance to the Municipal Tenancy Tribunal.

Thank you for your prompt attention to this urgent matter.

Yours faithfully,
Alex Morgan`,
    examinerCommentBand8: `Examiner's Remarks:
- Văn phong ngoại giao hoàn hảo (Diplomatic yet firm and authoritative).
- Từ vựng pháp lý & học thuật đỉnh cao (substandard condition, ruptured, compromise the integrity, grave vulnerability, infringe upon habitability terms, escalate this grievance).
- Cấu trúc ngữ pháp câu điều kiện và bị động điêu luyện. Đánh giá: Band 8.5.`,
  },

  // ================= 3. TASK 2 ESSAY: DISCUSS BOTH VIEWS =================
  {
    id: 'task2-ai-education',
    track: 'ACADEMIC',
    taskType: 'TASK_2',
    chartType: 'Opinion / Discussion Essay',
    title: 'Writing Task 2: Artificial Intelligence in Education and Healthcare (Discuss Both Views)',
    promptQuestion: `Some people believe that Artificial Intelligence (AI) will soon replace human teachers and healthcare professionals, bringing higher efficiency and universal access to knowledge. Others argue that human empathy, emotional intelligence, and moral mentorship can never be substituted by automated technology.

Discuss both these views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    recommendedMinutes: 40,
    minimumWords: 250,
    visualSvg: `
      <div style="background: #F0F9FF; border: 1.5px solid #BAE6FD; border-radius: 8px; padding: 16px; text-align: left; font-size: 13px; color: #0369A1;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 20px;">🤖 ↔️ 👩‍🏫</span>
          <strong style="color: #0C4A6E;">Cấu trúc bài viết nghị luận 4 đoạn chuẩn Cambridge:</strong>
        </div>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li><strong>Introduction:</strong> Paraphrase đề bài + Thesis Statement nêu rõ quan điểm cá nhân.</li>
          <li><strong>Body 1 (View 1):</strong> Phân tích sức mạnh xử lý dữ liệu 24/7 và độ chính xác của AI.</li>
          <li><strong>Body 2 (View 2):</strong> Phân tích sự không thể thay thế của trí tuệ cảm xúc, sự thấu cảm và đạo đức.</li>
          <li><strong>Conclusion:</strong> Khẳng định lại mô hình hợp tác cộng sinh (Synergy / Augmentation).</li>
        </ul>
      </div>
    `,
    keyFeatures: [
      'Quan điểm 1: Lợi ích vượt trội về tốc độ xử lý, khả năng cá nhân hóa học tập 24/7 và chẩn đoán y khoa chính xác.',
      'Quan điểm 2: Giá trị vô giá của lòng trắc ẩn, sự thấu cảm và định hướng nhân cách đạo đức của con người.',
      'Ý kiến cá nhân: AI là công cụ hỗ trợ tăng cường (Augmentation) chứ không thể thay thế hoàn toàn con người.'
    ],
    sampleBand5: `Nowaday, Artificial Intelligence is becoming very popular in our life. Some people say AI will replace teachers and doctors, but other people disagree. In this essay I will discuss both views.
On the one hand, AI is very smart and fast. Computers can remember everything and never get tired. Students can learn English with AI anytime and doctors can use computer to scan X-ray very fast. This saves a lot of time and money for hospital and school.
On the other hand, human teachers are very important. Teachers can care about students when they are sad. A computer does not have feelings and cannot smile. Also, doctors need to talk with patients kindly.
In conclusion, I think AI is good but it cannot replace human. Both are important for our future.`,
    examinerCommentBand5: `Examiner's Remarks:
- Task Response: Trả lời được đề bài nhưng các luận điểm phát triển còn nông và mang tính liệt kê ví dụ cảm tính.
- Coherence & Cohesion: Dùng từ nối cơ bản và quen thuộc (On the one hand, On the other hand, In conclusion).
- Lexical Resource: Lặp từ nhiều (very popular, very smart, very fast, very important), lỗi chính tả "Nowaday". Đạt 255 từ. Đánh giá: Band 5.5.`,

    sampleBand65: `In contemporary society, the meteoric rise of artificial intelligence has triggered intense debate regarding the future of specialized professions. While some contend that autonomous algorithms will ultimately supplant educators and medical practitioners due to superior efficiency, others assert that human emotional intelligence remains irreplaceable. This essay examines both perspectives before presenting my own viewpoint.

On the one hand, proponents of AI automation highlight its peerless computational capacity and universal accessibility. In the realm of healthcare, diagnostic algorithms can process thousands of radiographic scans in seconds with remarkable accuracy, minimizing human diagnostic errors. Similarly, in pedagogy, adaptive learning software provides tailored instruction tailored to each student's pace, operating continuously without fatigue. For remote regions lacking qualified professionals, automated systems represent an affordable and equitable solution.

On the other hand, critical aspects of teaching and medicine are deeply anchored in human empathy. A computer program lacks the capacity to sense a student's emotional discouragement or instill moral resilience. Furthermore, in clinical practice, bedside manner and compassionate communication are vital components of therapeutic recovery that algorithms cannot replicate.

In conclusion, while artificial intelligence undeniably provides unprecedented technical efficiency, I firmly believe it will serve as an augmentation tool rather than a wholesale replacement for human professionals.`,
    examinerCommentBand65: `Examiner's Remarks:
- Task Response: Luận điểm rõ ràng, cấu trúc bài cân bằng và thuyết phục.
- Coherence & Cohesion: Sử dụng từ nối tự nhiên, chuyển ý mạch lạc giữa các đoạn.
- Lexical Resource: Vốn từ học thuật khá tốt (meteoric rise, supplant, peerless computational capacity, bedside manner, augmentation tool). Đánh giá: Band 6.5 - 7.0.`,

    sampleBand8: `The exponential proliferation of artificial intelligence has precipitated contentious discourse regarding the longevity of specialized human labor. While technocratic optimists forecast that autonomous algorithms will inevitably supplant pedagogues and medical clinicians by virtue of operational efficacy, traditionalists maintain that emotional resonance and ethical discernment are fundamentally inimitable. In this essay, I shall scrutinize both contentions before delineating my conviction that synergistic integration—rather than outright replacement—represents the future paradigm.

Advocates of algorithmic automation predominantly emphasize unprecedented processing fidelity and egalitarian access. In clinical diagnostics, machine learning models analyze dense pathological datasets and radiographic imagery with a margin of error far narrower than that of fatigued human practitioners. Concurrently, in tertiary education, intelligent tutoring frameworks dynamically modulate curriculum delivery to accommodate heterogenous cognitive abilities, obliterating geographic and socio-economic impediments to knowledge acquisition. Under this lens, automated intelligence democratizes high-tier services that were historically the exclusive privilege of affluent metropolises.

Conversely, detractors compellingly argue that pedagogy and medicine are intrinsically empathetic vocations. Pedagogy transcends mere didactic information transfer; it is fundamentally a humanistic pursuit of character molding, emotional fortitude, and moral inquiry. A generative algorithm, devoid of consciousness, cannot perceive the subtle nuances of adolescent angst, nor can it inspire intellectual courage through shared vulnerability. Similarly, in palliative care, holistic convalescence hinges upon bedside compassionate presence and genuine psychological rapport—intangible human virtues that resist mathematical reduction into binary code.

In conclusion, although artificial intelligence possesses incontestable algorithmic superiority in data synthesis, it fundamentally lacks the soulful dimension of human consciousness. I therefore contend that AI will function as an indispensable cognitive amplifier rather than an existential substitute for teachers and healthcare providers.`,
    examinerCommentBand8: `Examiner's Remarks:
- Task Response: Phân tích cực kỳ sâu sắc, trả lời toàn diện cả 2 quan điểm và thể hiện lập trường kiên định xuyên suốt (Band 9 Task Response).
- Coherence & Cohesion: Mạch lập luận chặt chẽ như một bài báo cáo khoa học Oxford, các câu phức đan cài hoàn hảo.
- Lexical Resource: Kho từ vựng C2 phong phú, chính xác và tự nhiên (exponential proliferation, contentious discourse, technocratic optimists, ethical discernment, egalitarian access, intrinsically empathetic vocations, holistic convalescence).
- Grammatical Range & Accuracy: Kiểm soát tuyệt đối mọi cấu trúc ngữ pháp học thuật đỉnh cao. Đánh giá: Band 8.5 - 9.0.`,
  }
];

// Kho từ nối học thuật (Signpost Words) phân loại theo công dụng
const IELTS_SIGNPOST_WORDS = [
  {
    category: 'Mở bài & Overview / Mục đích thư',
    categoryIcon: '🚀',
    phrases: [
      { text: 'The line graph illustrates...', tip: 'Dùng cho Task 1 biểu đồ đường' },
      { text: 'Overall, it is readily discernible that...', tip: 'Mở đầu câu Overview ăn điểm Task 1' },
      { text: 'I am writing to formally draw your attention to...', tip: 'Mở đầu thư trang trọng Formal Letter' },
      { text: 'In contemporary society, it is often argued that...', tip: 'Mở đầu bài nghị luận Task 2' },
      { text: 'This essay examines both perspectives before delineating...', tip: 'Câu định hướng luận điểm (Thesis Statement)' },
    ]
  },
  {
    category: 'So sánh & Xu hướng số liệu',
    categoryIcon: '📈',
    phrases: [
      { text: 'In stark contrast to...', tip: 'Đối lập hoàn toàn với...' },
      { text: 'Witnessed a precipitous surge...', tip: 'Chứng kiến sự tăng vọt đột ngột' },
      { text: 'Experienced an overarching upward trajectory...', tip: 'Trải qua xu hướng đi lên bao trùm' },
      { text: 'Plateaued gently before culminating at...', tip: 'Đi ngang trước khi đạt đỉnh tại...' },
      { text: 'Surpassed / Eclipsed...', tip: 'Vượt mặt / làm lu mờ số liệu của...' },
    ]
  },
  {
    category: 'Thêm ý & Diễn giải học thuật',
    categoryIcon: '➕',
    phrases: [
      { text: 'Furthermore, it is worth emphasizing that...', tip: 'Hơn nữa, đáng nhấn mạnh rằng...' },
      { text: 'To substantiate this contention...', tip: 'Để chứng minh cho lập luận này...' },
      { text: 'Not only does this yield... but it also...', tip: 'Cấu trúc đảo ngữ nâng cao Grammatical Range' },
      { text: 'In the realm of...', tip: 'Trong lĩnh vực...' },
    ]
  },
  {
    category: 'Nêu quan điểm & Lập luận',
    categoryIcon: '💡',
    phrases: [
      { text: 'From my personal perspective...', tip: 'Theo góc nhìn cá nhân của tôi...' },
      { text: 'Advocates of this viewpoint predominantly emphasize...', tip: 'Những người ủng hộ quan điểm này nhấn mạnh...' },
      { text: 'Conversely, detractors compellingly argue that...', tip: 'Ngược lại, những người phản bác lập luận rằng...' },
      { text: 'A nuanced perspective acknowledges that...', tip: 'Một góc nhìn đa chiều thừa nhận rằng...' },
    ]
  },
  {
    category: 'Kết luận & Tổng kết',
    categoryIcon: '🎯',
    phrases: [
      { text: 'To recapitulate, while...', tip: 'Tóm lại, trong khi...' },
      { text: 'In conclusion, taking all aspects into consideration...', tip: 'Kết luận, sau khi cân nhắc mọi khía cạnh...' },
      { text: 'I therefore contend that...', tip: 'Do đó tôi kiên định cho rằng...' },
    ]
  }
];

class IeltsWritingDatabaseManager {
  constructor() {
    this.prompts = IELTS_WRITING_PROMPTS_DATABASE;
    this.signposts = IELTS_SIGNPOST_WORDS;
  }

  getAllPrompts() {
    return this.prompts;
  }

  getPromptById(id) {
    return this.prompts.find((p) => p.id === id) || this.prompts[0];
  }

  getSignposts() {
    return this.signposts;
  }
}

window.writingDb = new IeltsWritingDatabaseManager();
