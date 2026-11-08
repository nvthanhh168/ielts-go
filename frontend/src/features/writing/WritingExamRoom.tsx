import React, { useState, useEffect, useMemo } from 'react';
import { WritingPrompt, WritingAssessmentResult, WritingTaskType } from '../../../../shared/types/writing';
import { SAMPLE_WRITING_PROMPTS } from '../../../../shared/constants/sample-writing-prompts';

export const WritingExamRoom: React.FC = () => {
  const [selectedTaskType, setSelectedTaskType] = useState<WritingTaskType>('TASK_1_ACADEMIC');
  const [essayText, setEssayText] = useState<string>('');
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<WritingAssessmentResult | null>(null);

  const activePrompt: WritingPrompt = useMemo(() => {
    return (
      SAMPLE_WRITING_PROMPTS.find((p) => p.taskType === selectedTaskType) ||
      SAMPLE_WRITING_PROMPTS[0]
    );
  }, [selectedTaskType]);

  // Reset timer & word count when switching tasks
  const handleTaskSwitch = (type: WritingTaskType) => {
    setSelectedTaskType(type);
    setEssayText('');
    setAssessmentResult(null);
    setTimeLeft(type === 'TASK_2_ESSAY' ? 40 * 60 : 20 * 60);
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Word count & validation
  const wordCount = useMemo(() => {
    return essayText.trim().split(/\s+/).filter(Boolean).length;
  }, [essayText]);

  const minRequiredWords = activePrompt.minimumWords;
  const isWordCountSatisfied = wordCount >= minRequiredWords;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEvaluate = async () => {
    if (wordCount < 50) {
      alert('Bài viết quá ngắn để đánh giá. Vui lòng viết tối thiểu 50 từ.');
      return;
    }
    setIsEvaluating(true);

    try {
      const res = await fetch('http://localhost:5000/api/v1/writing/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: selectedTaskType,
          promptQuestion: activePrompt.promptQuestion,
          visualDataDescription: activePrompt.visualDataDescription,
          userEssayText: essayText,
          targetBand,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setAssessmentResult(json.data);
      }
    } catch (err) {
      console.error('Error submitting essay:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 uppercase tracking-wider">
            IELTS Writing Engine
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Luyện Thi Writing &amp; AI Examiner</h1>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => handleTaskSwitch('TASK_1_ACADEMIC')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedTaskType === 'TASK_1_ACADEMIC'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📊 Task 1 (150 từ - 20p)
          </button>
          <button
            onClick={() => handleTaskSwitch('TASK_2_ESSAY')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedTaskType === 'TASK_2_ESSAY'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✍️ Task 2 (250 từ - 40p - x2 Điểm)
          </button>
        </div>
      </div>

      {/* Editor & Prompt Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prompt & Timer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Thời gian làm bài:</span>
              <span className="text-2xl font-mono font-black">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Tiêu chuẩn độ dài:</span>
              <span className="text-xs font-bold text-amber-300">Tối thiểu {minRequiredWords} từ</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900">{activePrompt.title}</h2>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{activePrompt.promptQuestion}</p>
            {activePrompt.visualDataDescription && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono whitespace-pre-line text-slate-600">
                {activePrompt.visualDataDescription}
              </div>
            )}
          </div>
        </div>

        {/* Right: Text Editor */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-700">Khung Soạn Thảo Bài Viết</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Số từ:</span>
              <strong className={isWordCountSatisfied ? 'text-emerald-600 font-black' : 'text-amber-600 font-black'}>
                {wordCount} / {minRequiredWords} từ
              </strong>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                isWordCountSatisfied ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
              }`}>
                {isWordCountSatisfied ? 'ĐỦ TỪ ✓' : 'CHƯA ĐỦ TỪ'}
              </span>
            </div>
          </div>

          <textarea
            rows={15}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Viết bài làm của bạn tại đây..."
            className="w-full p-4 rounded-xl border border-slate-300 focus:border-indigo-600 outline-none font-serif text-[15px] leading-relaxed"
          />

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">Mục tiêu Band:</span>
              <select
                value={targetBand}
                onChange={(e) => setTargetBand(parseFloat(e.target.value))}
                className="p-1 border rounded font-bold"
              >
                <option value="7.0">Band 7.0</option>
                <option value="7.5">Band 7.5</option>
                <option value="8.0">Band 8.0</option>
              </select>
            </div>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
            >
              {isEvaluating ? 'AI Examiner Đang Chấm...' : '🤖 Chấm Điểm & Nâng Cấp Bài Mẫu'}
            </button>
          </div>
        </div>
      </div>

      {/* Assessment Report Card */}
      {assessmentResult && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <span className="text-xs px-3 py-1 rounded-full font-black bg-purple-100 text-purple-700">
                Cambridge Assessment Report
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Overall Writing: <span className="text-indigo-600">Band {assessmentResult.overallBand.toFixed(1)}</span>
              </h3>
            </div>
            <div className="text-xs text-slate-500">
              {assessmentResult.wordCount} từ • {assessmentResult.wordCountPenalty ? '⚠️ Bị phạt thiếu từ' : 'Đạt chuẩn độ dài'}
            </div>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs italic font-serif text-slate-700">
            <strong>Examiner&apos;s Comment:</strong> &ldquo;{assessmentResult.cambridgeExaminerComment}&rdquo;
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
            <h4 className="text-base font-bold text-emerald-400">
              Bài Viết Mẫu Nâng Cấp Chuẩn Band {assessmentResult.upgradedModelAnswer.targetBand.toFixed(1)}:
            </h4>
            <p className="text-xs font-serif whitespace-pre-line text-slate-200 leading-relaxed">
              {assessmentResult.upgradedModelAnswer.modelEssayText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingExamRoom;
