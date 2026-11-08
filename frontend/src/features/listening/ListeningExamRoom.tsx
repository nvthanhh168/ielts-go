import React, { useState, useEffect, useRef } from 'react';
import { ListeningTestExam, ListeningSection, QuestionType, WordLimitRule } from '../../../../shared/types/listening';
import { gradeSingleListeningQuestion, validateWordLimit } from '../../../../shared/utils/cambridge-grading';
import { getListeningFeedbackByScore } from '../../../../shared/constants/listening-feedback';

export const ListeningExamRoom: React.FC<{ exam: ListeningTestExam }> = ({ exam }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  
  // Timer: 30 mins listening + 10 mins transfer = 40 mins (2400 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(40 * 60);
  const [isTransferPhase, setIsTransferPhase] = useState<boolean>(false);

  // Audio Playback: Khảo thí chuẩn chỉ phát 1 lần duy nhất
  const [hasPlayedAudio, setHasPlayedAudio] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer
  useEffect(() => {
    if (isExamSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 10 * 60 && !isTransferPhase) {
          setIsTransferPhase(true); // Bắt đầu 10 phút chuyển đáp án
        }
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isExamSubmitted, timeLeft, isTransferPhase]);

  const activeSection: ListeningSection = exam.sections[activeSectionIndex];

  const handleInputChange = (questionId: number, val: string) => {
    if (isExamSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handlePlayAudio = () => {
    if (hasPlayedAudio[activeSectionIndex]) {
      alert('⚠️ Chế độ thi thử chuẩn Cambridge: Mỗi Section chỉ được phát Audio đúng 1 lần duy nhất!');
      return;
    }
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setHasPlayedAudio((prev) => ({ ...prev, [activeSectionIndex]: true }));
    }
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Tính điểm tức thì khi nộp bài
  const gradingSummary = React.useMemo(() => {
    if (!isExamSubmitted) return null;
    let score = 0;
    const details: Record<number, ReturnType<typeof gradeSingleListeningQuestion>> = {};

    exam.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        const res = gradeSingleListeningQuestion(answers[q.id] || '', q.correctAnswerPattern, q.wordLimit);
        details[q.id] = res;
        if (res.isCorrect) score++;
      });
    });

    const feedback = getListeningFeedbackByScore(score);
    return { score, details, feedback };
  }, [isExamSubmitted, answers, exam]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header bar: Tiêu đề & Bộ đếm thời gian kép */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              Cambridge IELTS Listening
            </span>
            <span className="text-xs text-slate-500">{exam.series}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{exam.title}</h1>
        </div>

        {/* Dual Timers & Phase badge */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider block text-slate-400">
              {isTransferPhase ? '⏳ 10 Phút Chuyển Đáp Án' : '🎧 30 Phút Nghe Bài Thi'}
            </span>
            <span
              className={`text-2xl font-black font-mono ${
                timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-slate-900'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>

          {!isExamSubmitted ? (
            <button
              onClick={handleSubmitExam}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
            >
              Nộp Bài Thi
            </button>
          ) : (
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800">
              Đã Chấm Điểm
            </span>
          )}
        </div>
      </div>

      {/* Audio Bar (Chế độ thi thử: Phát 1 lần) */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl">
            📻
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-2">
              <span>Section {activeSection.sectionNumber}: {activeSection.title}</span>
              {hasPlayedAudio[activeSectionIndex] && (
                <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded font-bold">
                  ĐÃ PHÁT 1 LẦN
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Chế độ thi chuẩn Cambridge: File âm thanh chỉ được nghe duy nhất một lượt.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <audio
            ref={audioRef}
            src={`http://localhost:5000/api/v1/listening/audio/${encodeURIComponent(activeSection.audioFilename)}`}
            onEnded={() => setIsPlaying(false)}
          />
          <button
            onClick={handlePlayAudio}
            disabled={hasPlayedAudio[activeSectionIndex] || isExamSubmitted}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              hasPlayedAudio[activeSectionIndex]
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-md'
            }`}
          >
            {isPlaying ? '🔊 Đang phát Audio...' : hasPlayedAudio[activeSectionIndex] ? '🔒 Đã nghe xong' : '▶ Bắt đầu nghe'}
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {exam.sections.map((sec, idx) => (
          <button
            key={sec.sectionNumber}
            onClick={() => setActiveSectionIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSectionIndex === idx
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Section {sec.sectionNumber} (Câu {sec.questions[0].id} - {sec.questions[sec.questions.length - 1].id})
          </button>
        ))}
      </div>

      {/* Questions List of Active Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">{activeSection.title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{activeSection.contextDescription}</p>
        </div>

        <div className="space-y-6">
          {activeSection.questions.map((q) => {
            const userVal = answers[q.id] || '';
            const validation = validateWordLimit(userVal, q.wordLimit);
            const grading = gradingSummary?.details[q.id];

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-all ${
                  isExamSubmitted
                    ? grading?.isCorrect
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-red-300 bg-red-50/40'
                    : !validation.isValid
                    ? 'border-red-400 bg-red-50/20'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        {q.type.replace('_', ' ')}
                      </span>
                      {q.wordLimit && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {q.wordLimit.rawInstruction}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-slate-800 mt-2">{q.prompt}</p>
                    {q.contextSentence && (
                      <p className="text-xs text-slate-600 italic font-mono bg-white p-2 rounded border border-slate-200">
                        {q.contextSentence}
                      </p>
                    )}
                  </div>

                  {/* Submission status badge */}
                  {isExamSubmitted && (
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        grading?.isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {grading?.isCorrect ? '✓ ĐÚNG (+1)' : '✗ SAI (0)'}
                    </span>
                  )}
                </div>

                {/* Input Control */}
                <div className="mt-4">
                  {q.options ? (
                    // Multiple Choice / Options
                    <div className="space-y-2">
                      {q.options.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer p-2 rounded hover:bg-white border border-transparent hover:border-slate-200"
                        >
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            value={opt[0]}
                            checked={userVal.toUpperCase() === opt[0]}
                            disabled={isExamSubmitted}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            className="accent-indigo-600"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    // Text Input with Real-time Word Limit Validator
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={userVal}
                        disabled={isExamSubmitted}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Gõ câu trả lời của bạn..."
                        className={`w-full md:w-80 px-3 py-2 text-sm rounded-lg border outline-none transition-all ${
                          !validation.isValid
                            ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                        }`}
                      />
                      {/* Warning if word limit exceeded */}
                      {!validation.isValid && (
                        <p className="text-xs text-red-600 font-bold flex items-center gap-1">
                          ⚠️ {validation.errorMessage}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Show Cambridge Acceptable Answers & Explanation when submitted */}
                {isExamSubmitted && (
                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs">
                    <div className="text-slate-700">
                      <strong>Đáp án chuẩn Cambridge:</strong>{' '}
                      <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {q.correctAnswerPattern}
                      </span>
                    </div>
                    {q.tapescriptSnippet && (
                      <div className="text-slate-600 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <strong className="block text-slate-800 mb-1">Trích đoạn Tapescript:</strong>
                        <p className="italic font-serif">{q.tapescriptSnippet}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Result & Performance Feedback Banner (When submitted) */}
      {gradingSummary && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className={`text-xs px-3 py-1 rounded-full font-black ${gradingSummary.feedback.tier.statusBadge.color}`}>
                {gradingSummary.feedback.tier.statusBadge.label}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Kết Quả: {gradingSummary.score}/40 Câu Đúng (Band {gradingSummary.feedback.bandScore.toFixed(1)})
              </h3>
              <p className="text-xs text-slate-500 mt-1">{gradingSummary.feedback.tier.vietnameseTitle}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tư Vấn Năng Lực Khảo Thí:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{gradingSummary.feedback.tier.evaluationSummary}</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              {gradingSummary.feedback.tier.actionableRecommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">👉</span> {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeningExamRoom;
