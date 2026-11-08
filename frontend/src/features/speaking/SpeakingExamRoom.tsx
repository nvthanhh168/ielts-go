import React, { useState, useEffect, useRef } from 'react';
import { IELTS_SPEAKING_20_TOPICS } from '../../../../shared/constants/speaking-topics-db';
import {
  SpeakingTopicData,
  SpeakingAssessmentResult,
  CollocationItem,
  NaturalPhraseItem,
} from '../../../../shared/types/speaking';

type ExamPart = 1 | 2 | 3;
type ActiveTab = 'PRACTICE_TOPIC' | 'VIRTUAL_EXAM';

export const SpeakingExamRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('VIRTUAL_EXAM');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('technology');
  const [currentPart, setCurrentPart] = useState<ExamPart>(2);
  const [targetBand, setTargetBand] = useState<number>(7.5);

  // Part 1 selection
  const [part1QuestionIdx, setPart1QuestionIdx] = useState<number>(0);

  // Part 2 Prep & Recording states
  const [prepTimeLeft, setPrepTimeLeft] = useState<number>(60);
  const [isPrepping, setIsPrepping] = useState<boolean>(false);
  const [prepNotes, setPrepNotes] = useState<string>('');

  const [speakTimeLeft, setSpeakTimeLeft] = useState<number>(120);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Speech Transcript & AI Evaluation
  const [transcript, setTranscript] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<SpeakingAssessmentResult | null>(null);

  // Recognition ref
  const recognitionRef = useRef<any>(null);

  const currentTopic: SpeakingTopicData =
    IELTS_SPEAKING_20_TOPICS.find((t) => t.id === selectedTopicId) ||
    IELTS_SPEAKING_20_TOPICS[0];

  // Initialize Web Speech API if supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          setTranscript(currentTranscript.trim());
        };

        recognition.onerror = (e: any) => {
          console.error('Speech recognition error:', e);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // 1-minute prep timer
  useEffect(() => {
    let timer: any;
    if (isPrepping && prepTimeLeft > 0) {
      timer = setInterval(() => {
        setPrepTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPrepping(false);
            // Auto start recording
            startRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPrepping, prepTimeLeft]);

  // 2-minute speaking timer
  useEffect(() => {
    let timer: any;
    if (isRecording && speakTimeLeft > 0) {
      timer = setInterval(() => {
        setSpeakTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, speakTimeLeft]);

  const startPrep = () => {
    setPrepTimeLeft(60);
    setIsPrepping(true);
    setIsRecording(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    setSpeakTimeLeft(120);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition already running');
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Recognition stopped');
      }
    }
  };

  const handleEvaluate = async () => {
    if (!transcript.trim()) {
      alert('Vui lòng ghi âm hoặc nhập bài nói của bạn trước khi gửi giám khảo chấm điểm.');
      return;
    }

    setIsEvaluating(true);
    setAssessmentResult(null);

    const activeQuestionOrCard =
      currentPart === 1
        ? currentTopic.part1Questions[part1QuestionIdx]?.question
        : currentPart === 2
        ? currentTopic.part2CueCard.topicTitle
        : currentTopic.part3Questions[0]?.question;

    try {
      const response = await fetch('http://localhost:5000/api/v1/speaking/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: currentTopic.id,
          part: currentPart,
          questionOrCard: activeQuestionOrCard,
          prepNotes: currentPart === 2 ? prepNotes : undefined,
          transcript,
          targetBand,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setAssessmentResult(json.data);
      } else {
        alert(json.message || 'Không thể đánh giá bài nói.');
      }
    } catch (err: any) {
      console.error('Lỗi khi gửi bài nói:', err);
      alert('Không thể kết nối đến máy chủ AI Examiner.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎙️</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                IELTS Speaking Master & Phòng Thi Ảo AI
              </h1>
              <p className="text-sm text-slate-500">
                Thư viện 20 chủ đề trọng tâm + Phòng thi 3 Parts mô phỏng giám khảo Cambridge
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('VIRTUAL_EXAM')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'VIRTUAL_EXAM'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏛️ Phòng Thi Mô Phỏng 3 Parts
          </button>
          <button
            onClick={() => setActiveTab('PRACTICE_TOPIC')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'PRACTICE_TOPIC'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📚 Thư Viện 20 Chủ Điểm (Band 6+)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: 20 Topics List */}
        <div className="lg:col-span-1 space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-h-[850px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              20 Chủ Điểm Thường Gặp
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full">
              20 Topics
            </span>
          </div>

          <div className="space-y-1.5">
            {IELTS_SPEAKING_20_TOPICS.map((topic) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setTranscript('');
                    setAssessmentResult(null);
                    setPrepNotes('');
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 border ${
                    isSelected
                      ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold shadow-xs'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xl">{topic.icon}</span>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{topic.name}</p>
                    <p className="text-xs text-slate-400 truncate">{topic.vietnameseName}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'VIRTUAL_EXAM' ? (
            /* VIRTUAL EXAM ROOM MODE */
            <div className="space-y-6">
              {/* Part Tabs */}
              <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentPart(1);
                      setTranscript('');
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      currentPart === 1
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Part 1: Phỏng Vấn (4-5')
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPart(2);
                      setTranscript('');
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      currentPart === 2
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Part 2: Cue Card (3-4')
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPart(3);
                      setTranscript('');
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      currentPart === 3
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Part 3: Thảo Luận Sâu (4-5')
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Mục tiêu:</span>
                  <select
                    value={targetBand}
                    onChange={(e) => setTargetBand(Number(e.target.value))}
                    className="text-xs font-bold border border-slate-300 rounded-lg p-1.5 bg-slate-50 text-slate-800"
                  >
                    <option value={6.5}>Band 6.5</option>
                    <option value={7.0}>Band 7.0</option>
                    <option value={7.5}>Band 7.5</option>
                    <option value={8.0}>Band 8.0</option>
                  </select>
                </div>
              </div>

              {/* Part 1 Screen */}
              {currentPart === 1 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full">
                      Part 1 Questions: {currentTopic.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      Câu {part1QuestionIdx + 1} / {currentTopic.part1Questions.length}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-lg font-bold text-slate-800">
                      "{currentTopic.part1Questions[part1QuestionIdx]?.question}"
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      💡 Gợi ý trả lời: {currentTopic.part1Questions[part1QuestionIdx]?.sampleIdea}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {currentTopic.part1Questions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setPart1QuestionIdx(idx);
                          setTranscript('');
                        }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                          part1QuestionIdx === idx
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Câu {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Part 2 Screen: Cambridge Cue Card & Timers */}
              {currentPart === 2 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  {/* Official Cue Card Booklet Style */}
                  <div className="p-6 bg-amber-50/70 border-2 border-amber-300 rounded-2xl shadow-xs space-y-4 font-serif">
                    <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                      <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-800">
                        CANDIDATE CUE CARD • IELTS SPEAKING PART 2
                      </span>
                      <span className="text-xs font-mono font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        Topic: {currentTopic.name}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 leading-snug">
                      {currentTopic.part2CueCard.topicTitle}
                    </h2>

                    <div className="space-y-2 text-slate-800 text-sm italic">
                      <p className="font-semibold not-italic">You should say:</p>
                      <ul className="list-disc list-inside space-y-1.5 pl-2 font-sans not-italic text-sm text-slate-700">
                        {currentTopic.part2CueCard.bulletPoints.map((bp, i) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 1-Minute Prep Countdown & Quick Notes Scratchpad */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-600 uppercase">
                          ⏱️ 1 Phút Chuẩn Bị
                        </span>
                        <span
                          className={`text-xl font-mono font-bold ${
                            prepTimeLeft <= 10 && isPrepping
                              ? 'text-rose-600 animate-pulse'
                              : 'text-slate-800'
                          }`}
                        >
                          00:{prepTimeLeft.toString().padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">
                        Thí sinh có đúng 1 phút ghi chép từ khóa trước khi bắt đầu bài nói 2 phút.
                      </p>
                      <button
                        onClick={startPrep}
                        disabled={isPrepping}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                          isPrepping
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-slate-800 text-white hover:bg-slate-700'
                        }`}
                      >
                        {isPrepping ? 'Đang Đếm Ngược 1 Phút...' : 'Bắt Đầu 1 Phút Chuẩn Bị'}
                      </button>
                    </div>

                    {/* Quick Notes Scratchpad */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-slate-600 mb-1 flex items-center justify-between">
                        <span>📝 Giấy Nháp Nhanh (Candidate Scratchpad)</span>
                        <span className="text-[10px] text-slate-400">Tự do ghi keyword</span>
                      </label>
                      <textarea
                        value={prepNotes}
                        onChange={(e) => setPrepNotes(e.target.value)}
                        placeholder="Ví dụ:
- What: autonomous vehicle
- When: 2024 at tech expo
- Features: LiDAR, machine learning, auto-braking
- Feeling: mind-blowing, transformative"
                        className="w-full flex-1 p-3 text-xs font-mono bg-amber-50/30 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 resize-none h-28"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Part 3 Screen: Deep Two-way Discussion */}
              {currentPart === 3 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                      Part 3 Discussion: {currentTopic.name}
                    </span>
                    <span className="text-xs text-slate-400">Yêu cầu tư duy trừu tượng C1+</span>
                  </div>

                  <div className="space-y-3">
                    {currentTopic.part3Questions.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5"
                      >
                        <p className="font-bold text-slate-800 text-sm">
                          Câu {q.id}: {q.question}
                        </p>
                        <p className="text-xs text-indigo-600 font-medium">
                          🎯 Góc nhìn phân tích: {q.analyticalAngle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speech Recording & Live Speech-to-Text */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-300'
                      }`}
                    />
                    <span className="text-sm font-bold text-slate-800">
                      {isRecording ? 'Đang Thu Âm Trực Tiếp...' : 'Sẵn Sàng Thu Âm Bài Nói'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-slate-600">
                      Thời gian nói: {Math.floor(speakTimeLeft / 60)}:
                      {(speakTimeLeft % 60).toString().padStart(2, '0')}
                    </span>
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
                      >
                        <span>🔴</span> Bắt Đầu Nói
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
                      >
                        <span>⏹️</span> Dừng Lại
                      </button>
                    )}
                  </div>
                </div>

                {/* Speech Transcript Output & Manual Edit */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-600">
                      Transcript ghi âm (Speech-to-Text nhận diện tự động & cho phép chỉnh sửa):
                    </label>
                    <span className="text-xs text-slate-400 font-mono">
                      {transcript.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Giọng nói của bạn sau khi nhấn 'Bắt Đầu Nói' sẽ tự động chuyển thành văn bản ở đây. Bạn cũng có thể dán hoặc chỉnh sửa transcript trực tiếp nếu không dùng microphone..."
                    className="w-full p-4 text-sm font-sans bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-400 h-32"
                  />
                </div>

                {/* Evaluate Action */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      // Load sample answer band 6 for test demo
                      setTranscript(
                        currentPart === 1
                          ? currentTopic.sampleAnswers.part1Band6
                          : currentTopic.sampleAnswers.part2Band6
                      );
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
                  >
                    Nạp Bài Nói Thử Nghiệm
                  </button>

                  <button
                    onClick={handleEvaluate}
                    disabled={isEvaluating}
                    className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:from-rose-700 hover:to-indigo-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isEvaluating ? (
                      <>
                        <span className="animate-spin">⏳</span> AI Examiner Đang Thẩm Định...
                      </>
                    ) : (
                      <>
                        <span>⚖️</span> Chấm Điểm 4 Tiêu Chí Cambridge
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* AI Examiner Assessment Results */}
              {assessmentResult && (
                <div className="bg-white p-6 rounded-2xl border-2 border-rose-200 shadow-md space-y-6">
                  {/* Overall Band Banner */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-gradient-to-r from-rose-50 to-indigo-50 border border-rose-200 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                        {assessmentResult.overallBand.toFixed(1)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Kết Quả Đánh Giá IELTS Speaking Part {assessmentResult.partEvaluated}
                        </h3>
                        <p className="text-xs text-rose-700 font-medium">
                          Phân tầng năng lực: {assessmentResult.bandTier} • Mục tiêu đề ra: Band{' '}
                          {targetBand}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold px-3 py-1 bg-white border border-rose-200 text-slate-700 rounded-full shadow-xs">
                        Official 4 Criteria Scoring
                      </span>
                    </div>
                  </div>

                  {/* Cambridge Examiner Comment */}
                  <div className="p-4 bg-slate-50 border-l-4 border-rose-600 rounded-r-xl space-y-1">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Examiner's Official Feedback
                    </h4>
                    <p className="text-sm text-slate-800 italic leading-relaxed">
                      "{assessmentResult.cambridgeExaminerComment}"
                    </p>
                  </div>

                  {/* 4 Criteria Breakdown Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fluency & Coherence */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-xs font-bold text-slate-700">
                          1. Fluency & Coherence
                        </span>
                        <span className="text-xs font-extrabold px-2 py-0.5 bg-rose-100 text-rose-800 rounded">
                          Band {assessmentResult.criteria.fluencyAndCoherence.score}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {assessmentResult.criteria.fluencyAndCoherence.comment}
                      </p>
                      <div className="text-[11px] space-y-1 pt-1">
                        <p className="text-emerald-700 font-medium">
                          ✓ Điểm mạnh:{' '}
                          {assessmentResult.criteria.fluencyAndCoherence.strengths?.join(', ')}
                        </p>
                        <p className="text-rose-600 font-medium">
                          ⚠️ Cần khắc phục:{' '}
                          {assessmentResult.criteria.fluencyAndCoherence.weaknesses?.join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Lexical Resource */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-xs font-bold text-slate-700">
                          2. Lexical Resource
                        </span>
                        <span className="text-xs font-extrabold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                          Band {assessmentResult.criteria.lexicalResource.score}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {assessmentResult.criteria.lexicalResource.comment}
                      </p>
                      <div className="text-[11px] space-y-1 pt-1">
                        <p className="text-emerald-700 font-medium">
                          ✓ Từ vựng tốt:{' '}
                          {assessmentResult.criteria.lexicalResource.strengths?.join(', ')}
                        </p>
                        <p className="text-rose-600 font-medium">
                          ⚠️ Thiếu hụt:{' '}
                          {assessmentResult.criteria.lexicalResource.weaknesses?.join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Grammatical Range & Accuracy */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-xs font-bold text-slate-700">
                          3. Grammatical Range & Accuracy
                        </span>
                        <span className="text-xs font-extrabold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                          Band {assessmentResult.criteria.grammaticalRangeAndAccuracy.score}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {assessmentResult.criteria.grammaticalRangeAndAccuracy.comment}
                      </p>
                      <div className="text-[11px] space-y-1 pt-1">
                        <p className="text-emerald-700 font-medium">
                          ✓ Cấu trúc tốt:{' '}
                          {assessmentResult.criteria.grammaticalRangeAndAccuracy.strengths?.join(', ')}
                        </p>
                        <p className="text-rose-600 font-medium">
                          ⚠️ Lỗi ngữ pháp:{' '}
                          {assessmentResult.criteria.grammaticalRangeAndAccuracy.weaknesses?.join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Pronunciation */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-xs font-bold text-slate-700">4. Pronunciation</span>
                        <span className="text-xs font-extrabold px-2 py-0.5 bg-teal-100 text-teal-800 rounded">
                          Band {assessmentResult.criteria.pronunciation.score}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {assessmentResult.criteria.pronunciation.comment}
                      </p>
                      <div className="text-[11px] space-y-1 pt-1">
                        <p className="text-emerald-700 font-medium">
                          ✓ Ngữ âm:{' '}
                          {assessmentResult.criteria.pronunciation.strengths?.join(', ')}
                        </p>
                        <p className="text-rose-600 font-medium">
                          ⚠️ Cải thiện:{' '}
                          {assessmentResult.criteria.pronunciation.weaknesses?.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pronunciation Advice & Word Stress */}
                  {assessmentResult.pronunciationAdvice && (
                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-teal-900 uppercase flex items-center gap-2">
                        <span>🗣️</span> Phân Tích Ngữ Âm & Trọng Âm Từ (Word Stress & Intonation)
                      </h4>
                      <p className="text-xs text-teal-800">
                        💡 {assessmentResult.pronunciationAdvice.intonationAndLinkingTip}
                      </p>
                      {assessmentResult.pronunciationAdvice.wordStressIssues?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {assessmentResult.pronunciationAdvice.wordStressIssues.map((w, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-2.5 rounded-lg border border-teal-200 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800">{w.word}</span>
                                <span className="font-mono text-teal-700 font-semibold">
                                  {w.correctIpa}
                                </span>
                              </div>
                              <p className="text-[11px] text-rose-600">
                                Lỗi phát âm thường gặp: {w.incorrectAttempt}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vocabulary Upgrades */}
                  {assessmentResult.vocabularyUpgrades?.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                        <span>🚀</span> Nâng Cấp Từ Vựng & Collocations Mục Tiêu Band 8.0
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {assessmentResult.vocabularyUpgrades.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl text-xs space-y-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className="line-through text-slate-400 font-mono">
                                {item.originalWord}
                              </span>
                              <span className="text-indigo-700 font-bold">➔</span>
                              <span className="text-indigo-900 font-bold bg-white px-2 py-0.5 rounded border border-indigo-200">
                                {item.upgradedIdiomOrCollocation}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600">{item.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Personalized Upgraded Band 8 Model Answer */}
                  {assessmentResult.upgradedBand8Transcript && (
                    <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                          <span>✨</span> Bài Nói Nâng Cấp Band 8.0 (Personalized Model Answer)
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Phát triển từ chính ý tưởng của học viên
                        </span>
                      </div>
                      <p className="text-sm font-serif italic leading-relaxed text-slate-200">
                        "{assessmentResult.upgradedBand8Transcript}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* TOPIC PRACTICE MODE (20 Topics Library with 4 Components) */
            <div className="space-y-6">
              {/* Topic Banner */}
              <div className="p-6 bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentTopic.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{currentTopic.name}</h2>
                    <p className="text-indigo-200 text-sm">
                      {currentTopic.vietnameseName} • Trọn bộ học liệu chuẩn bị cho Band 6.5+
                    </p>
                  </div>
                </div>
              </div>

              {/* Component 1: Useful Collocations and Vocabulary */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span>💎</span> 1. Useful Collocations & Vocabulary (Từ Vựng Ăn Điểm)
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">
                    {currentTopic.usefulCollocations.length} Collocations C1/C2
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentTopic.usefulCollocations.map((col, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-950 text-sm">{col.phrase}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                          {col.bandLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Nghĩa: {col.meaning}</p>
                      <p className="text-xs text-slate-700 italic border-l-2 border-indigo-400 pl-2">
                        "{col.exampleSentence}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 2: Suggested Ideas on Cue Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span>💡</span> 2. Suggested Ideas (Gợi Ý Phát Triển Ý Cho Từng Bullet Point)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Part 2 Cue Card Ideas</span>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                  <p className="font-bold text-slate-900 text-sm">
                    {currentTopic.part2CueCard.topicTitle}
                  </p>
                  <div className="space-y-3 pt-2">
                    {currentTopic.part2CueCard.bulletPoints.map((bp, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-xs font-bold text-amber-900">• {bp}:</p>
                        <div className="flex flex-wrap gap-1.5 pl-3">
                          {currentTopic.part2CueCard.suggestedIdeas[i]?.map((idea, j) => (
                            <span
                              key={j}
                              className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs"
                            >
                              {idea}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Component 3: Suggested Natural Phrases */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span>🗣️</span> 3. Suggested Natural Phrases (Cấu Trúc Tự Nhiên & Lấy Đà)
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                    Fluency Boosters
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentTopic.suggestedNaturalPhrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-200 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                          {phrase.category}
                        </span>
                        <span className="text-[11px] text-slate-500">{phrase.usageContext}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 font-mono pt-1">
                        "{phrase.phrase}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 4: Sample Answers Band 6 vs Band 8 Comparison */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span>⚖️</span> 4. Sample Answers (So Sánh Bài Nói Mẫu Band 6.0 vs Band 8.0)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Comparative Model</span>
                </div>

                <div className="space-y-4">
                  {/* Part 1 Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Part 1 - Band 6.0</span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                          Competent
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        "{currentTopic.sampleAnswers.part1Band6}"
                      </p>
                    </div>

                    <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-900">
                          Part 1 - Band 8.0+
                        </span>
                        <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded font-bold">
                          Very Good
                        </span>
                      </div>
                      <p className="text-xs text-indigo-950 italic font-serif">
                        "{currentTopic.sampleAnswers.part1Band8}"
                      </p>
                    </div>
                  </div>

                  {/* Part 2 Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Part 2 - Band 6.0</span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                          Basic ideas
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        "{currentTopic.sampleAnswers.part2Band6}"
                      </p>
                    </div>

                    <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-900">
                          Part 2 - Band 8.0+
                        </span>
                        <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded font-bold">
                          Advanced Idiomatic
                        </span>
                      </div>
                      <p className="text-xs text-indigo-950 italic font-serif">
                        "{currentTopic.sampleAnswers.part2Band8}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
