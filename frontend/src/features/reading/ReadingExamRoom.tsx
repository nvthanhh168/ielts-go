import React, { useState, useEffect } from 'react';
import { ReadingExamPaper, ReadingPassage, ReadingQuestion, ReadingQuestionType } from '../../../../shared/types/reading';
import { ExamType, BandLevel } from '../../types/ielts';
import { convertReadingRawScoreToBand } from '../../../../shared/utils/ielts-scoring';

export const ReadingExamRoom: React.FC<{ exam: ReadingExamPaper }> = ({ exam }) => {
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60); // 60 minutes countdown
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [studentBandTier, setStudentBandTier] = useState<BandLevel>(BandLevel.BAND_4_5_TO_6_0);

  // Text highlighting state
  const [highlightColor, setHighlightColor] = useState<string>('#fef08a'); // yellow

  // Countdown timer 60:00
  useEffect(() => {
    if (isExamSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isExamSubmitted, timeLeft]);

  const activePassage: ReadingPassage = exam.passages[activePassageIndex];

  // Lọc câu hỏi tương ứng với Passage đang chọn
  const passageQuestions: ReadingQuestion[] = exam.questions.filter(
    (q) => q.passageNumber === (activePassageIndex + 1 as 1 | 2 | 3)
  );

  const handleAnswerChange = (qId: number, val: string) => {
    if (isExamSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Tính điểm Reading
  const gradingSummary = React.useMemo(() => {
    if (!isExamSubmitted) return null;
    let raw = 0;
    const details: Record<number, boolean> = {};

    exam.questions.forEach((q) => {
      const u = (userAnswers[q.id] || '').trim().toLowerCase();
      const exp = q.correctAnswer.toLowerCase();
      const ok = exp.includes('//') ? exp.split('//').map((s) => s.trim()).includes(u) : u === exp;
      details[q.id] = ok;
      if (ok) raw++;
    });

    const band = convertReadingRawScoreToBand(raw, exam.examType === ExamType.ACADEMIC);
    return { raw, band, details };
  }, [isExamSubmitted, userAnswers, exam]);

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden text-slate-800">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-700">
            {exam.examType === ExamType.ACADEMIC ? 'IELTS Academic Reading' : 'IELTS General Reading'}
          </span>
          <h1 className="text-lg font-bold text-slate-900 hidden md:block">{exam.title}</h1>
        </div>

        {/* Band Tier Selector for AI Mentor */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Trình độ của bạn:</span>
          <select
            value={studentBandTier}
            onChange={(e) => setStudentBandTier(e.target.value as BandLevel)}
            className="px-2.5 py-1 rounded-lg border border-slate-300 font-bold bg-white text-indigo-700 outline-none"
          >
            <option value={BandLevel.BELOW_4_5}>Band &lt; 4.5 (Cơ bản / Dịch nghĩa)</option>
            <option value={BandLevel.BAND_4_5_TO_6_0}>Band 4.5 - 6.0 (Trung cấp / Paraphrase)</option>
            <option value={BandLevel.BAND_6_0_TO_7_5}>Band 6.0 - 7.5 (Nâng cao / Phân tích bẫy)</option>
            <option value={BandLevel.BAND_7_5_PLUS}>Band 7.5+ (Chuyên sâu / Logic học thuật)</option>
          </select>
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400">
              Đồng hồ 60 Phút
            </span>
            <span
              className={`text-xl font-black font-mono ${
                timeLeft < 600 ? 'text-red-600 animate-pulse' : 'text-slate-900'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>

          {!isExamSubmitted ? (
            <button
              onClick={() => setIsExamSubmitted(true)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              Nộp Bài Thi
            </button>
          ) : (
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
              {gradingSummary?.raw}/40 (Band {gradingSummary?.band})
            </span>
          )}
        </div>
      </header>

      {/* Split-Screen Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Pane: Reading Passages with Highlight Tool */}
        <div className="w-full md:w-1/2 h-full flex flex-col border-r border-slate-200 bg-white">
          {/* Passage Switcher Tabs & Highlight Bar */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePassageIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activePassageIndex === idx
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  Passage {idx + 1}
                </button>
              ))}
            </div>

            {/* Highlighter Toolbar */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Bút dạ:</span>
              <button
                onClick={() => setHighlightColor('#fef08a')}
                className="w-5 h-5 rounded-full bg-yellow-200 border border-yellow-400 hover:scale-110 transition-transform"
                title="Vàng"
              />
              <button
                onClick={() => setHighlightColor('#bbf7d0')}
                className="w-5 h-5 rounded-full bg-green-200 border border-green-400 hover:scale-110 transition-transform"
                title="Xanh"
              />
              <button
                onClick={() => setHighlightColor('#fed7aa')}
                className="w-5 h-5 rounded-full bg-orange-200 border border-orange-400 hover:scale-110 transition-transform"
                title="Cam"
              />
            </div>
          </div>

          {/* Passage Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 leading-relaxed text-slate-800 text-justify font-serif text-[15px]">
            <div>
              <span className="text-xs font-bold font-sans uppercase tracking-widest text-indigo-600 block mb-1">
                Reading Passage {activePassage.passageNumber}
              </span>
              <h2 className="text-2xl font-bold font-sans text-slate-900">{activePassage.title}</h2>
              {activePassage.subtitle && (
                <p className="text-sm font-sans text-slate-500 mt-1 italic">{activePassage.subtitle}</p>
              )}
            </div>

            <div className="space-y-4">
              {activePassage.paragraphs.map((p) => (
                <div key={p.label} className="relative pl-6">
                  <span className="absolute left-0 top-0 font-sans font-black text-sm text-indigo-700 bg-indigo-50 px-1 rounded">
                    {p.label}
                  </span>
                  <p className="text-slate-700 leading-relaxed select-text">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: 40 Questions List */}
        <div className="w-full md:w-1/2 h-full flex flex-col bg-slate-50">
          <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Câu hỏi cho Passage {activePassageIndex + 1} (Câu {passageQuestions[0]?.id} - {passageQuestions[passageQuestions.length - 1]?.id})
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Đã làm: <strong className="text-indigo-600">{Object.keys(userAnswers).length}</strong>/40
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {passageQuestions.map((q) => {
              const userVal = userAnswers[q.id] || '';
              const isCorrect = gradingSummary?.details[q.id];

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isExamSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-red-50/50 border-red-300'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        {q.type.replace(/_/g, ' ')}
                      </span>
                      {q.paragraphRef && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {q.paragraphRef}
                        </span>
                      )}
                    </div>

                    {isExamSubmitted && (
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {isCorrect ? '✓ ĐÚNG' : '✗ SAI'}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-800 mt-2">{q.prompt}</p>

                  {/* Input form per question type */}
                  <div className="mt-3">
                    {q.type === 'MATCHING_HEADINGS' && q.headingsList ? (
                      <select
                        value={userVal}
                        disabled={isExamSubmitted}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="w-full text-xs font-medium p-2 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="">-- Chọn tiêu đề thích hợp (i - x) --</option>
                        {q.headingsList.map((h) => (
                          <option key={h.romanNumeral} value={h.romanNumeral}>
                            {h.romanNumeral.toUpperCase()}. {h.text}
                          </option>
                        ))}
                      </select>
                    ) : q.type === 'TRUE_FALSE_NOT_GIVEN' ? (
                      <div className="flex gap-4 text-xs font-bold">
                        {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                          <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`q_${q.id}`}
                              value={opt}
                              checked={userVal === opt}
                              disabled={isExamSubmitted}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className="accent-indigo-600"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : q.type === 'YES_NO_NOT_GIVEN' ? (
                      <div className="flex gap-4 text-xs font-bold">
                        {['YES', 'NO', 'NOT GIVEN'].map((opt) => (
                          <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`q_${q.id}`}
                              value={opt}
                              checked={userVal === opt}
                              disabled={isExamSubmitted}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className="accent-indigo-600"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : q.options ? (
                      <div className="space-y-1.5 text-xs font-medium">
                        {q.options.map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                            <input
                              type="radio"
                              name={`q_${q.id}`}
                              value={opt[0]}
                              checked={userVal.toUpperCase() === opt[0]}
                              disabled={isExamSubmitted}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className="accent-indigo-600"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={userVal}
                        disabled={isExamSubmitted}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        placeholder="Điền câu trả lời..."
                        className="w-full md:w-80 px-3 py-1.5 text-xs rounded-lg border border-slate-300 outline-none"
                      />
                    )}
                  </div>

                  {/* Explanation when submitted */}
                  {isExamSubmitted && (
                    <div className="mt-3 pt-2 border-t border-slate-200/80 text-xs space-y-1">
                      <div>
                        <strong>Đáp án đúng:</strong>{' '}
                        <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
                          {q.correctAnswer}
                        </span>
                      </div>
                      {q.contextQuote && (
                        <p className="text-slate-600 italic bg-white p-2 rounded border border-slate-200 font-serif">
                          &ldquo;{q.contextQuote}&rdquo;
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingExamRoom;
