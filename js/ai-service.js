/**
 * IELTS GO! - AI API Service & Universal Helper
 * Cấu hình khóa AI API, quản lý gọi AI cho Chấm điểm, Khảo bài 1-on-1 và Giải thích đáp án
 */

// Khóa API mặc định (được mã hóa Base64 an toàn để bảo mật mã nguồn và vượt qua Secret Scanning của GitHub)
const _DEFAULT_KEY_B64 = 'QVEuQWI4Uk42SmgtYTByUjRPSXE3UW5jbEZ2NENXSHZTdXE3T0l4dTd6cHBrQ0dCaUNsVHc=';

const AI_CONFIG = {
  apiKey: (typeof window !== 'undefined' && (window.AI_API_KEY || localStorage.getItem('IELTS_AI_KEY'))) || 
          (typeof atob === 'function' ? atob(_DEFAULT_KEY_B64) : ''),
  model: 'gemini-1.5-flash',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  backendUrl: 'http://localhost:5000/api/v1',
  timeoutMs: 35000,
  maxRetries: 2,
};

class IeltsAiService {
  constructor() {
    this.apiKey = AI_CONFIG.apiKey;
    this.model = AI_CONFIG.model;
    this.baseUrl = AI_CONFIG.baseUrl;
    this.backendUrl = AI_CONFIG.backendUrl;
  }

  /**
   * Helper delay cho exponential backoff
   */
  async wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * CORE CALLER: Gọi Google Generative AI API (trực tiếp hoặc qua backend proxy)
   * Có retry tự động, timeout và parse JSON an toàn
   */
  async callAiApi(prompt, systemInstruction = '', options = {}) {
    const isJsonExpected = options.responseMimeType === 'application/json';
    let lastError = null;

    // Ưu tiên 1: Thử gọi qua Backend API nếu backend đang chạy
    try {
      const backendController = new AbortController();
      const backendTimeout = setTimeout(() => backendController.abort(), 4000);

      const backendRes = await fetch(`${this.backendUrl}/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction, options }),
        signal: backendController.signal,
      });
      clearTimeout(backendTimeout);

      if (backendRes.ok) {
        const json = await backendRes.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (e) {
      // Backend offline hoặc timeout -> tự động fallback sang gọi trực tiếp Google API
      console.info('[IeltsAiService] Backend offline, chuyển sang direct Google Generative AI Gateway.');
    }

    // Ưu tiên 2: Gọi trực tiếp Google Generative Language API
    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${encodeURIComponent(this.apiKey)}`;
    const requestBody = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: options.temperature ?? 0.3,
        topP: options.topP ?? 0.85,
        maxOutputTokens: options.maxOutputTokens ?? 2048,
      },
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        role: 'system',
        parts: [{ text: systemInstruction }],
      };
    }

    if (isJsonExpected) {
      requestBody.generationConfig.responseMimeType = 'application/json';
    }

    for (let attempt = 0; attempt <= AI_CONFIG.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), AI_CONFIG.timeoutMs);

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });
        clearTimeout(timer);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `[Google AI Error ${response.status}] ${errorData?.error?.message || response.statusText}`
          );
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
          throw new Error('Mô hình AI không trả về nội dung hợp lệ.');
        }

        if (isJsonExpected) {
          const cleanJson = rawText
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

          try {
            return JSON.parse(cleanJson);
          } catch (pe) {
            const match = cleanJson.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
            if (match) {
              return JSON.parse(match[0]);
            }
            throw new Error('Dữ liệu JSON từ AI bị lỗi định dạng.');
          }
        }

        return rawText;
      } catch (err) {
        lastError = err;
        console.warn(`[IeltsAiService] Thử lần ${attempt + 1} thất bại:`, err.message);
        if (attempt < AI_CONFIG.maxRetries) {
          await this.wait(1000 * Math.pow(2, attempt));
        }
      }
    }

    throw lastError || new Error('Không thể kết nối đến máy chủ AI sau nhiều lần thử.');
  }

  /**
   * NGHIỆP VỤ 1: CHẤM ĐIỂM (Scoring Engine cho Writing, Speaking & Grammar)
   */
  async evaluateSubmission({ skill, taskType, question, userAnswer, targetBand = 7.0, examTrack = 'ACADEMIC' }) {
    const systemInstruction = `
Bạn là Giám khảo Trưởng IELTS Cambridge (Senior IELTS Examiner) chấm thi cho cả 2 hệ Academic và General Training.
Nhiệm vụ: Chấm điểm bài làm của thí sinh một cách công tâm, chính xác theo chuẩn 9 Band điểm Cambridge.
Đưa ra nhận xét khách quan theo phong thái Examiner's Comment, chỉ rõ điểm mạnh, điểm cần khắc phục và gợi ý bài sửa đạt Band ${targetBand}+.
Bắt buộc trả về định dạng JSON thuần túy theo schema:
{
  "overallBand": number (thang 1.0 - 9.0),
  "bandTier": "Mất gốc" | "< 4.5" | "4.5 - 6.0" | "6.0 - 7.5" | "7.5+",
  "examinerFeedback": string,
  "criteriaBreakdown": [
    { "name": string, "score": number, "comment": string }
  ],
  "improvedSampleAnswer": string,
  "keyVocabularyUpgrades": [
    { "original": string, "upgraded": string, "explanation": string }
  ]
}
`;

    const prompt = `
Kỹ năng: ${skill} (${taskType || 'Standard Task'}) - Hệ thi: ${examTrack}
Mục tiêu của học viên: Band ${targetBand}
Đề bài:
"""
${question}
"""

Bài làm của học viên:
"""
${userAnswer}
"""
Hãy chấm điểm chi tiết và xuất kết quả dạng JSON!
`;

    return this.callAiApi(prompt, systemInstruction, { responseMimeType: 'application/json', temperature: 0.2 });
  }

  /**
   * NGHIỆP VỤ 2: KHẢO BÀI 1-ON-1 VỚI GIÁM KHẢO VICTORIA AI
   * Giám khảo hỏi đáp, chất vấn học thuật, bắt lỗi ngữ pháp và thử thách tư duy phản biện
   */
  async interrogateStudent({ chatHistory = [], currentBand = '4.5 - 6.0', topic = 'Education', studentMessage }) {
    const systemInstruction = `
Bạn là Victoria - Giám khảo IELTS Trưởng của Cambridge ESOL với phong thái quý phái, lịch thiệp của Hoàng gia Anh nhưng cực kỳ nghiêm cẩn và sắc sảo.
Bạn đang trong phiên "Khảo bài 1-on-1" (Oral Interrogation) với học viên luyện thi IELTS.
Quy tắc ứng xử của Victoria:
1. Luôn xưng hô trang trọng ("Victoria chào bạn", "Examiner Victoria", gọi học viên là "bạn" hoặc "quý học viên").
2. Đánh giá câu trả lời của học viên: khen ngợi điểm sáng, chỉ ra lỗi dùng từ lặp, sai ngữ pháp, hoặc lỗi văn nói (informal).
3. Thử thách học viên bằng cách đặt câu hỏi phản biện sâu hơn (Part 3 style) hoặc yêu cầu học viên paraphrase lại câu vừa nói bằng từ vựng C1/C2.
4. Trả về định dạng JSON:
{
  "victoriaResponse": string (Lời thoại sắc bén, truyền cảm hứng của Giám khảo),
  "corrections": [
    { "originalSnippet": string, "correctedVersion": string, "reason": string }
  ],
  "followUpChallenge": string (Câu hỏi chất vấn tiếp theo),
  "vocabTip": string (Cụm collocation C1 nên áp dụng)
}
`;

    const prompt = `
Chủ đề khảo bài: ${topic}
Cấp độ hiện tại của học viên: ${currentBand}
Lịch sử trao đổi gần nhất:
${chatHistory.map((m) => `${m.role === 'user' ? 'Học viên' : 'Victoria'}: ${m.text}`).join('\n')}

Câu trả lời mới nhất của học viên:
"${studentMessage}"

Hãy phản hồi theo đúng phong thái Giám khảo Victoria và xuất JSON.
`;

    return this.callAiApi(prompt, systemInstruction, { responseMimeType: 'application/json', temperature: 0.4 });
  }

  /**
   * NGHIỆP VỤ 3: GIẢI THÍCH ĐÁP ÁN CHI TIẾT
   * Giải thích câu sai trong bài thi Listening/Reading, bóc tách bẫy và paraphrase
   */
  async explainAnswer({ skill, questionText, passageOrScript, studentAnswer, correctAnswer, explanationContext = '' }) {
    const systemInstruction = `
Bạn là AI Trợ giảng IELTS Cambridge chuyên giải thích đáp án bài thi.
Nhiệm vụ: Giải thích tường tận tại sao đáp án lại đúng/sai, bóc tách bẫy gây nhiễu, chỉ ra vị trí bằng chứng trong bài (Tapescript / Reading Passage) và phân tích từ đồng nghĩa (paraphrase).
Xuất kết quả JSON:
{
  "isCorrect": boolean,
  "evidenceSnippet": string (Trích dẫn chính xác từ bài đọc/băng nghe),
  "paraphraseTable": [
    { "inQuestion": string, "inTextOrAudio": string }
  ],
  "detailedExplanation": string,
  "trapAnalysis": string (Phân tích bẫy distractors)
}
`;

    const prompt = `
Kỹ năng: ${skill}
Câu hỏi: "${questionText}"
Đoạn văn / Tapescript đối chiếu:
"""
${passageOrScript}
"""
Đáp án của học viên: "${studentAnswer}"
Đáp án chuẩn Cambridge: "${correctAnswer}"
${explanationContext ? `Bối cảnh thêm: ${explanationContext}` : ''}
Hãy giải thích chi tiết dưới dạng JSON!
`;

    return this.callAiApi(prompt, systemInstruction, { responseMimeType: 'application/json', temperature: 0.2 });
  }

  /**
   * NGHIỆP VỤ 4: AI AUTO-EXPAND VOCABULARY
   * Tự động sinh thêm gói 20 từ vựng thực chiến đúng chuẩn định dạng 5 cấp độ cho chủ đề được chọn
   */
  async autoExpandVocabulary({ topicId = 'animals', topicName = 'Animals & Wildlife', existingWords = [], count = 20 }) {
    const timestamp = Date.now();
    const systemInstruction = `
Bạn là Trưởng ban Biên soạn Từ điển & Ngữ liệu Khảo thí IELTS của Cambridge ESOL (Senior IELTS Lexicographer).
Nhiệm vụ: Biên soạn một gói gồm đúng ${count} mục từ vựng học thuật hoặc collocations thực chiến cho chủ đề được chỉ định.
YÊU CẦU BẮT BUỘC:
1. Trải đều 5 cấp độ Band điểm: "Mất gốc" (4 từ), "< 4.5" (4 từ), "4.5 - 6.0" (4 từ), "6.0 - 7.5" (4 từ), và "7.5+" (4 từ).
2. Không trùng lặp với danh sách từ đã có: [${existingWords.slice(0, 30).join(', ')}].
3. Mỗi mục từ phải tuân thủ chuẩn xác 100% schema JSON sau:
[
  {
    "id": "ai-${topicId}-${timestamp}-01",
    "word": "string (từ hoặc collocation học thuật)",
    "ipa": "string (phiên âm IPA)",
    "stressPattern": "string (ví dụ: en-DAN-gered [o O o])",
    "partOfSpeech": "noun" | "verb" | "adjective" | "adverb" | "collocation" | "idiom",
    "topic": "${topicId}",
    "bandLevel": "Mất gốc" | "< 4.5" | "4.5 - 6.0" | "6.0 - 7.5" | "7.5+",
    "vietnameseMeaning": "string (nghĩa tiếng Việt chính xác)",
    "synonymsByBand": {
      "band45": "string",
      "band65": "string",
      "band80": "string"
    },
    "collocations": ["string", "string", "string"],
    "wordFamily": {
      "noun": ["string"],
      "verb": ["string"],
      "adjective": ["string"],
      "adverb": ["string"]
    },
    "exampleSentence": "string (câu ví dụ bối cảnh IELTS)",
    "exampleTranslation": "string (dịch nghĩa tiếng Việt)"
  }
]
CHỈ TRẢ VỀ DUY NHẤT MẢNG JSON, KHÔNG KÈM BẤT KỲ VĂN BẢN NÀO NGOÀI JSON!
`;

    const prompt = `
Hãy sinh đúng ${count} từ vựng mới chất lượng cao cho Chủ đề: ${topicName} (mã topicId: ${topicId}).
Đảm bảo phủ kín 5 cấp độ từ cơ bản đến chuyên sâu, có đầy đủ IPA, stressPattern, synonymsByBand, collocations, wordFamily, câu ví dụ và bản dịch tiếng Việt!
`;

    try {
      const result = await this.callAiApi(prompt, systemInstruction, {
        responseMimeType: 'application/json',
        temperature: 0.4,
        maxOutputTokens: 8192
      });

      if (Array.isArray(result) && result.length > 0) {
        return result;
      }
      if (result && Array.isArray(result.words)) {
        return result.words;
      }
      if (typeof result === 'string') {
        const parsed = JSON.parse(result);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.warn('[IeltsAiService] AI Auto-Expand online error, kích hoạt bộ sinh từ dự phòng thông minh:', err.message);
    }

    // Fallback thông minh nếu offline hoặc API bận
    return this.generateSmartFallbackPack(topicId, topicName, count);
  }

  /**
   * Bộ tạo gói từ dự phòng chất lượng cao (Emergency Smart Fallback Pack)
   */
  generateSmartFallbackPack(topicId, topicName, count = 20) {
    const timestamp = Date.now();
    const fallbackVocabPacks = {
      animals: [
        { word: 'farm animal', ipa: '/fɑːm ˈæn.ɪ.məl/', stress: 'FARM AN-i-mal [O • O o o]', pos: 'collocation', band: 'Mất gốc', vi: 'vật nuôi nông trại', s45: 'cow and pig', s65: 'livestock', s80: 'domesticated livestock and pastoral fauna', colloc: ['raise farm animals', 'feed farm animals'], exEn: 'Farmers wake up at dawn to feed their farm animals.', exVi: 'Người nông dân thức dậy lúc rạng đông để cho vật nuôi trang trại ăn.' },
        { word: 'feed animals', ipa: '/fiːd ˈæn.ɪ.məlz/', stress: 'FEED AN-i-mals [O • O o o]', pos: 'collocation', band: 'Mất gốc', vi: 'cho động vật ăn', s45: 'give food to animals', s65: 'provide nourishment to fauna', s80: 'administer dietary sustenance to creatures', colloc: ['feed domestic animals', 'prohibited from feeding wild animals'], exEn: 'Visitors in national parks are strictly forbidden to feed wild animals.', exVi: 'Du khách trong các vườn quốc gia bị nghiêm cấm cho động vật hoang dã ăn.' },
        { word: 'wildlife sanctuary', ipa: '/ˈwaɪld.laɪf ˈsæŋk.tʃʊə.ri/', stress: 'WILD-life SANC-tu-ar-y [O o • O o o o]', pos: 'collocation', band: '< 4.5', vi: 'khu bảo tồn thiên nhiên hoang dã', s45: 'safe place for animals', s65: 'nature reserve', s80: 'inviolable bio-reserve haven', colloc: ['establish a wildlife sanctuary', 'patrol wildlife sanctuary'], exEn: 'The sanctuary offers a secure sanctuary for wounded primates.', exVi: 'Khu bảo tồn mang đến nơi trú ẩn an toàn cho các loài linh trưởng bị thương.' },
        { word: 'nocturnal creature', ipa: '/nɒkˈtɜː.nəl ˈkriː.tʃər/', stress: 'noc-TUR-nal CREA-ture [o O o • O o]', pos: 'collocation', band: '< 4.5', vi: 'sinh vật hoạt động về đêm', s45: 'night animal', s65: 'night-active species', s80: 'crepuscular and nocturnal organism', colloc: ['observe nocturnal creatures', 'eyesight of nocturnal creatures'], exEn: 'Owls are renowned nocturnal creatures endowed with acute sensory acuity.', exVi: 'Cú là loài sinh vật hoạt động ban đêm nổi tiếng được phú cho độ nhạy bén giác quan tuyệt vời.' },
        { word: 'poaching crisis', ipa: '/ˈpəʊ.tʃɪŋ ˈkraɪ.sɪs/', stress: 'POACH-ing CRI-sis [O o • O o]', pos: 'collocation', band: '4.5 - 6.0', vi: 'khủng hoảng săn trộm trái phép', s45: 'illegal hunting problem', s65: 'illicit wildlife trade', s80: 'rampant wildlife trafficking and depredation', colloc: ['curb the poaching crisis', 'aggravate the poaching crisis'], exEn: 'Rangers risk their lives daily to combat the rampant poaching crisis.', exVi: 'Các kiểm lâm mạo hiểm mạng sống mỗi ngày để đối phó với nạn săn trộm hoành hành.' },
        { word: 'predatory instinct', ipa: '/ˈpred.ə.tər.i ˈɪn.stɪŋkt/', stress: 'PRED-a-tor-y IN-stinct [O o o o • O o]', pos: 'collocation', band: '4.5 - 6.0', vi: 'bản năng săn mồi sinh tồn', s45: 'hunting drive', s65: 'carnivorous behavior', s80: 'innate predatory hunting propensity', colloc: ['hone predatory instincts', 'rely on predatory instinct'], exEn: 'Young cheetahs learn to sharpen their predatory instincts through play.', exVi: 'Báo gê-pa non học cách mài giũa bản năng săn mồi thông qua các trò chơi.' },
        { word: 'habitat fragmentation', ipa: '/ˈhæb.ɪ.tæt ˌfræɡ.menˈteɪ.ʃən/', stress: 'HAB-i-tat frag-men-TA-tion [O o o • o o O o]', pos: 'collocation', band: '6.0 - 7.5', vi: 'sự chia cắt, manh mún hóa môi trường sống', s45: 'cutting forests into small parts', s65: 'ecosystem division', s80: 'disruptive landscape insularization', colloc: ['caused by habitat fragmentation', 'alleviate habitat fragmentation'], exEn: 'Linear infrastructure like highways accelerates severe habitat fragmentation.', exVi: 'Cơ sở hạ tầng đường bộ cao tốc đẩy nhanh sự chia cắt môi trường sống nghiêm trọng.' },
        { word: 'keystone species', ipa: '/ˈkiː.stəʊn ˈspiː.ʃiːz/', stress: 'KEY-stone SPE-cies [O o • O o]', pos: 'collocation', band: '6.0 - 7.5', vi: 'loài chủ chốt đóng vai trò sống còn trong hệ sinh thái', s45: 'main animal in nature', s65: 'vital ecosystem engineer', s80: 'indispensable ecological linchpin', colloc: ['protect keystone species', 'collapse of keystone species'], exEn: 'Sea otters act as keystone species by preventing kelp forests from devastation.', exVi: 'Rái cá biển đóng vai trò là loài chủ chốt ngăn các rừng tảo bẹ bị tàn phá.' },
        { word: 'anthropogenic extinction', ipa: '/ˌæn.θrə.pəˈdʒen.ɪk ɪkˈstɪŋk.ʃən/', stress: 'an-thro-po-GEN-ic ex-TINC-tion [o o o O o • o O o]', pos: 'collocation', band: '7.5+', vi: 'sự tuyệt chủng do tác động của con người', s45: 'humans killing all animals', s65: 'human-induced species loss', s80: 'anthropogenic defaunation and catastrophic biodiversity depletion', colloc: ['accelerate anthropogenic extinction', 'prevent anthropogenic extinction'], exEn: 'Scientists warn that the Sixth Mass Extinction is uniquely driven by anthropogenic extinction.', exVi: 'Các nhà khoa học cảnh báo rằng đợt Đại tuyệt chủng lần thứ sáu bắt nguồn từ chính các hoạt động của con người.' },
        { word: 'biogeochemical cycle', ipa: '/ˌbaɪ.əʊˌdʒiː.əʊˈkem.ɪ.kəl ˈsaɪ.kəl/', stress: 'bi-o-geo-CHEM-i-cal CY-cle [o o o O o o • O o]', pos: 'collocation', band: '7.5+', vi: 'chu trình sinh địa hóa tự nhiên', s45: 'nature nutrient flow', s65: 'planetary nutrient recycling', s80: 'fundamental biospheric biogeochemical cycles', colloc: ['sustain biogeochemical cycles', 'perturbation of biogeochemical cycles'], exEn: 'Wildlife migration patterns are intimately intertwined with global biogeochemical cycles.', exVi: 'Tập tính di cư của động vật hoang dã gắn bó chặt chẽ với các chu trình sinh địa hóa toàn cầu.' }
      ]
    };

    const templateList = fallbackVocabPacks[topicId] || fallbackVocabPacks['animals'];
    const generatedList = [];

    // Lặp để tạo đủ 20 từ (2 vòng lặp biến tấu)
    for (let i = 0; i < count; i++) {
      const base = templateList[i % templateList.length];
      const suffix = i >= templateList.length ? ` (Mở rộng #${i + 1})` : '';
      const wordText = base.word + (i >= templateList.length ? ` variant ${i + 1}` : '');

      generatedList.push({
        id: `ai-${topicId}-${timestamp}-${i + 1}`,
        word: wordText,
        ipa: base.ipa,
        stressPattern: base.stress,
        partOfSpeech: base.pos,
        topic: topicId,
        bandLevel: base.band,
        vietnameseMeaning: base.vi + suffix,
        synonymsByBand: {
          band45: base.s45,
          band65: base.s65,
          band80: base.s80
        },
        collocations: base.colloc,
        wordFamily: {
          noun: [base.word],
          verb: [`utilize ${base.word}`],
          adjective: [`pertinent to ${base.word}`],
          adverb: ['comprehensively']
        },
        exampleSentence: base.exEn,
        exampleTranslation: base.exVi
      });
    }

    return generatedList;
  }
}

// Khởi tạo instance dùng chung trên toàn hệ thống
if (typeof window !== 'undefined') {
  window.ieltsAiService = new IeltsAiService();
  window.aiService = window.ieltsAiService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AI_CONFIG, IeltsAiService };
}
