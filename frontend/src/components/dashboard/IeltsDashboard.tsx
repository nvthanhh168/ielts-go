import React, { useState, useMemo } from 'react';
import { calculateOverallBandScore, mapBandToTier } from '../../../../shared/utils/ielts-scoring';
import { IELTS_9_BAND_DESCRIPTORS, STUDY_ABROAD_GUIDELINE } from '../../../../shared/constants/ielts-band-descriptors';
import { IELTS_STUDY_MATERIALS, getRecommendedMaterialsByBand } from '../../../../shared/constants/ielts-materials';
import { BAND_TIER_CONFIGS, EXAM_TYPE_DEFINITIONS } from '../../../../shared/constants/ielts-levels';
import { ExamType, BandLevel, SkillType } from '../../types/ielts';
import { BAND_TIER_UI_META } from '../../constants/ielts.constants';

export const IeltsDashboard: React.FC = () => {
  // Trạng thái hình thức thi
  const [examType, setExamType] = useState<ExamType>(ExamType.ACADEMIC);

  // Điểm 4 kỹ năng trong bài test đầu vào
  const [scores, setScores] = useState({
    listening: 5.5,
    reading: 6.0,
    writing: 5.5,
    speaking: 5.0,
  });

  // Điểm mục tiêu
  const [targetBand, setTargetBand] = useState<number>(6.5);

  // Tính toán Overall Band Score tự động
  const calculation = useMemo(() => {
    return calculateOverallBandScore(scores);
  }, [scores]);

  const currentTier = useMemo(() => {
    return mapBandToTier(calculation.overallBand);
  }, [calculation.overallBand]);

  const targetTier = useMemo(() => {
    return mapBandToTier(targetBand);
  }, [targetBand]);

  // Phân bổ học liệu tự động
  const recommendation = useMemo(() => {
    return getRecommendedMaterialsByBand(calculation.overallBand);
  }, [calculation.overallBand]);

  const tierMeta = BAND_TIER_UI_META[currentTier];
  const isStudyAbroadMet = calculation.overallBand >= 6.0;

  const handleScoreChange = (skill: keyof typeof scores, value: number) => {
    setScores((prev) => ({
      ...prev,
      [skill]: Math.round(value * 2) / 2, // Đảm bảo step 0.5
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                IELTS Master AI v2.0
              </span>
              <span className="text-xs text-slate-500">Hệ thống Phân tầng 5 Cấp độ</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
              Test Đầu Vào & Gợi Ý Lộ Trình Theo Band
            </h1>
            <p className="text-slate-600 mt-1">
              Đánh giá chuẩn xác 4 kỹ năng, đối chiếu 9 Band điểm quốc tế và tự động phân bổ kho học liệu.
            </p>
          </div>

          {/* Chọn Hình thức thi */}
          <div className="mt-4 md:mt-0 flex items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setExamType(ExamType.ACADEMIC)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                examType === ExamType.ACADEMIC
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 IELTS Academic
            </button>
            <button
              onClick={() => setExamType(ExamType.GENERAL_TRAINING)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                examType === ExamType.GENERAL_TRAINING
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💼 General Training
            </button>
          </div>
        </div>

        {/* Section 1: Bộ Giả Lập & Tính Điểm Test Đầu Vào */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột 1 & 2: Form nhập / kéo điểm 4 kỹ năng */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>📝</span> Kết Quả Test Đầu Vào 4 Kỹ Năng
              </h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
                Thang điểm 1.0 - 9.0 (Bước nhảy 0.5)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Listening */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    🎧 Listening
                  </span>
                  <span className="text-xl font-black text-indigo-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    Band {scores.listening.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="0.5"
                  value={scores.listening}
                  onChange={(e) => handleScoreChange('listening', parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1.0</span>
                  <span>4.5</span>
                  <span>6.5 (Du học)</span>
                  <span>9.0</span>
                </div>
              </div>

              {/* Reading */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    📖 Reading
                  </span>
                  <span className="text-xl font-black text-indigo-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    Band {scores.reading.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="0.5"
                  value={scores.reading}
                  onChange={(e) => handleScoreChange('reading', parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1.0</span>
                  <span>4.5</span>
                  <span>6.5 (Du học)</span>
                  <span>9.0</span>
                </div>
              </div>

              {/* Writing */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    ✍️ Writing
                  </span>
                  <span className="text-xl font-black text-indigo-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    Band {scores.writing.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="0.5"
                  value={scores.writing}
                  onChange={(e) => handleScoreChange('writing', parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1.0</span>
                  <span>4.5</span>
                  <span>6.5 (Du học)</span>
                  <span>9.0</span>
                </div>
              </div>

              {/* Speaking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    🗣️ Speaking
                  </span>
                  <span className="text-xl font-black text-indigo-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    Band {scores.speaking.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="0.5"
                  value={scores.speaking}
                  onChange={(e) => handleScoreChange('speaking', parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1.0</span>
                  <span>4.5</span>
                  <span>6.5 (Du học)</span>
                  <span>9.0</span>
                </div>
              </div>
            </div>

            {/* Target Band Picker */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-700">
                🎯 Thiết lập mục tiêu mong muốn:
              </span>
              <div className="flex items-center gap-2">
                {[6.0, 6.5, 7.0, 7.5, 8.0].map((b) => (
                  <button
                    key={b}
                    onClick={() => setTargetBand(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      targetBand === b
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Band {b.toFixed(1)} {b === 6.5 && '★'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cột 3: Card Tổng kết Overall Band & Đánh giá Du học */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Overall Band Score
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold border ${tierMeta.badgeColor}`}
                >
                  Cấp độ: {tierMeta.label}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-6xl font-black tracking-tight text-white">
                  {calculation.overallBand.toFixed(1)}
                </span>
                <span className="text-indigo-300 text-sm font-medium">
                  (Điểm gốc: {calculation.rawAverage.toFixed(3)})
                </span>
              </div>

              {/* Thông báo quy tắc làm tròn */}
              <div className="mt-2 text-xs text-indigo-200 bg-indigo-950/60 p-2.5 rounded-lg border border-indigo-800">
                {calculation.roundedDirection === 'UP' && 'Làm tròn lên số nguyên kế tiếp (>= 0.75)'}
                {calculation.roundedDirection === 'HALF' && 'Làm tròn thành mức .5 (từ 0.25 đến dưới 0.75)'}
                {calculation.roundedDirection === 'DOWN' && 'Làm tròn xuống số nguyên (< 0.25)'}
                {calculation.roundedDirection === 'EXACT' && 'Điểm chuẩn chính xác không cần làm tròn'}
              </div>

              {/* Đánh giá Ngưỡng Du học 6.0 - 6.5 */}
              <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-200">Chuẩn du học (6.0 - 6.5):</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-xs ${
                      isStudyAbroadMet ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {isStudyAbroadMet ? 'ĐẠT YÊU CẦU' : 'CẦN NÂNG BAND'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isStudyAbroadMet
                    ? 'Bạn đã đạt ngưỡng nhận thư mời nhập học trực tiếp của hầu hết các trường Đại học tại Anh, Úc, Canada.'
                    : `Bạn còn cách ngưỡng vàng du học ${Math.max(0, Number((6.5 - calculation.overallBand).toFixed(1)))} band. Cần tăng tốc rèn luyện!`}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300">
              <span>Mục tiêu: Band {targetBand.toFixed(1)}</span>
              <span className="font-bold text-white">
                Khoảng cách: +{Math.max(0, Number((targetBand - calculation.overallBand).toFixed(1)))} Band
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Kho Học Liệu & Bài Tập Phân Bổ Tự Động theo Band */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h2 className="text-xl font-bold text-slate-900">
                  Kho Học Liệu & Bài Tập Đề Xuất Cho Cấp Độ: &quot;{tierMeta.label}&quot;
                </h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Thuật toán tự động khớp tài liệu phù hợp nhất cho người học ở Band {calculation.overallBand.toFixed(1)}
              </p>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl font-semibold border border-indigo-200">
              Tìm thấy {recommendation.materials.length} tài liệu trọng tâm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendation.materials.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between bg-slate-50/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                      {item.targetSkill === 'ALL' ? '4 Kỹ Năng' : item.targetSkill}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{item.targetBandRange}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-indigo-600 font-medium">{item.authorOrPublisher}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.description}</p>

                  {/* Điểm nhấn nổi bật */}
                  <ul className="mt-3 space-y-1 text-xs text-slate-500">
                    {item.keyFeatures.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Local available notice */}
                {item.localAvailablePath && (
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      📁 Có sẵn trên máy tính
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{item.localAvailablePath}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Bảng Đánh Giá Năng Lực 9 Band Điểm Chuẩn IELTS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <h2 className="text-xl font-bold text-slate-900">
                  Bảng Đánh Giá Năng Lực 9 Band Điểm Chuẩn IELTS
                </h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Quy chuẩn năng lực ngôn ngữ quốc tế (Band 0 đến Band 9) và điểm mốc du học 6.0 - 6.5
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200">
              <span>★</span>
              <strong>Band 6.0 - 6.5:</strong> Ngưỡng xét tuyển du học & định cư phổ biến
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                  <th className="p-3">Band</th>
                  <th className="p-3">Cấp độ (CEFR)</th>
                  <th className="p-3">Định nghĩa năng lực tiếng Anh</th>
                  <th className="p-3">Khả năng học thuật & Du học</th>
                  <th className="p-3 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {IELTS_9_BAND_DESCRIPTORS.map((d) => {
                  const isCurrentBand =
                    Math.abs(d.band - calculation.overallBand) < 0.3 ||
                    (d.band === 6.5 && calculation.overallBand === 6.5) ||
                    (d.band === 6.0 && calculation.overallBand === 6.0);

                  return (
                    <tr
                      key={d.band}
                      className={`transition-colors ${
                        isCurrentBand
                          ? 'bg-indigo-50/80 font-medium'
                          : d.isStudyAbroadThreshold
                          ? 'bg-amber-50/40'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-base">Band {d.band}</span>
                        {d.isStudyAbroadThreshold && (
                          <span className="text-amber-500 font-bold" title="Ngưỡng vàng du học">
                            ★
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{d.levelName}</div>
                        <div className="text-xs text-slate-400 font-mono">{d.cefrLevel}</div>
                      </td>
                      <td className="p-3 text-xs text-slate-600 max-w-md leading-relaxed">
                        {d.detailedDescription}
                      </td>
                      <td className="p-3 text-xs text-slate-600 max-w-xs">
                        {d.academicSuitability}
                      </td>
                      <td className="p-3 text-right">
                        {isCurrentBand ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white shadow-sm">
                            VỊ TRÍ HIỆN TẠI
                          </span>
                        ) : d.isStudyAbroadThreshold ? (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-200 text-amber-800">
                            NGƯỠNG DU HỌC
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IeltsDashboard;
