import { Request, Response } from 'express';
import { prisma } from '../../database/prisma.client';
import {
  calculateOverallBandScore,
  mapBandToTier,
  convertListeningRawScoreToBand,
  convertReadingRawScoreToBand,
} from '../../../../shared/utils/ielts-scoring';
import {
  IELTS_9_BAND_DESCRIPTORS,
  STUDY_ABROAD_GUIDELINE,
} from '../../../../shared/constants/ielts-band-descriptors';
import {
  IELTS_STUDY_MATERIALS,
  getRecommendedMaterialsByBand,
} from '../../../../shared/constants/ielts-materials';
import { BAND_TIER_CONFIGS, EXAM_TYPE_DEFINITIONS } from '../../../../shared/constants/ielts-levels';
import { ExamType, BandLevel, SkillType } from '../../common/enums';
import { generatePersonalizedRoadmap } from '../../services/ai/ai.helper';

export class PlacementTestController {
  /**
   * 1. Lấy thông tin Bảng đánh giá 9 Band điểm chuẩn IELTS & Hướng dẫn ngưỡng Du học
   * GET /api/v1/placement-test/descriptors
   */
  public static async getBandDescriptors(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      data: {
        descriptors: IELTS_9_BAND_DESCRIPTORS,
        studyAbroadGuideline: STUDY_ABROAD_GUIDELINE,
        thresholdBand: 6.5,
        thresholdDescription: 'Ngưỡng 6.0 - 6.5 là tiêu chuẩn nhập học đại học/thạc sĩ quốc tế.',
      },
    });
  }

  /**
   * 2. Thuật toán tính toán điểm Band và tự động phân bổ học liệu
   * POST /api/v1/placement-test/evaluate
   */
  public static async evaluateScore(req: Request, res: Response): Promise<void> {
    try {
      const {
        listening,
        reading,
        writing,
        speaking,
        examType = ExamType.ACADEMIC,
        rawListeningScore,
        rawReadingScore,
      } = req.body;

      // Tính điểm band kỹ năng nếu người dùng nhập số câu đúng (rawScore / 40)
      const lBand =
        typeof rawListeningScore === 'number'
          ? convertListeningRawScoreToBand(rawListeningScore)
          : Number(listening ?? 5.0);

      const rBand =
        typeof rawReadingScore === 'number'
          ? convertReadingRawScoreToBand(rawReadingScore, examType === ExamType.ACADEMIC)
          : Number(reading ?? 5.0);

      const wBand = Number(writing ?? 5.0);
      const sBand = Number(speaking ?? 5.0);

      // Tính Overall Band Score theo quy tắc làm tròn chính thức của IELTS
      const calculation = calculateOverallBandScore({
        listening: lBand,
        reading: rBand,
        writing: wBand,
        speaking: sBand,
      });

      const tier = mapBandToTier(calculation.overallBand);
      const tierConfig = BAND_TIER_CONFIGS[tier];

      // Tìm thông tin descriptor tương ứng trong 9 band chuẩn
      const closestBandDescriptor =
        IELTS_9_BAND_DESCRIPTORS.find((d) => d.band === calculation.overallBand) ||
        IELTS_9_BAND_DESCRIPTORS.find((d) => Math.abs(d.band - calculation.overallBand) <= 0.5) ||
        IELTS_9_BAND_DESCRIPTORS[4];

      // Phân bổ kho học liệu tự động theo band
      const recommendation = getRecommendedMaterialsByBand(calculation.overallBand);

      // Đánh giá khoảng cách tới ngưỡng du học (Band 6.5)
      const studyAbroadTarget = 6.5;
      const gapToStudyAbroad = Number((studyAbroadTarget - calculation.overallBand).toFixed(1));
      const isQualifiedForStudyAbroad = calculation.overallBand >= 6.0;

      res.status(200).json({
        success: true,
        data: {
          skillsScores: {
            listening: lBand,
            reading: rBand,
            writing: wBand,
            speaking: sBand,
          },
          calculation,
          tier,
          tierConfig,
          descriptor: closestBandDescriptor,
          studyAbroadStatus: {
            targetBand: studyAbroadTarget,
            gapBand: gapToStudyAbroad > 0 ? gapToStudyAbroad : 0,
            isQualified: isQualifiedForStudyAbroad,
            statusLabel: isQualifiedForStudyAbroad
              ? '✅ ĐẠT TIÊU CHUẨN DU HỌC'
              : `⚠️ CẦN TÍCH LŨY THÊM +${gapToStudyAbroad} BAND`,
          },
          recommendedMaterials: recommendation,
        },
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Evaluation failed';
      res.status(500).json({ success: false, error: msg });
    }
  }

  /**
   * 3. Lấy kho học liệu theo 5 mức Band điểm
   * GET /api/v1/placement-test/materials
   */
  public static async getMaterials(req: Request, res: Response): Promise<void> {
    const { tier, band } = req.query;

    if (band) {
      const rec = getRecommendedMaterialsByBand(Number(band));
      res.status(200).json({ success: true, data: rec });
      return;
    }

    if (tier && typeof tier === 'string' && tier in IELTS_STUDY_MATERIALS) {
      const materials = IELTS_STUDY_MATERIALS[tier as BandLevel];
      res.status(200).json({ success: true, tier, data: materials });
      return;
    }

    // Trả về toàn bộ học liệu phân theo 5 cấp độ
    res.status(200).json({
      success: true,
      data: IELTS_STUDY_MATERIALS,
    });
  }

  /**
   * 4. Nộp bài test đầu vào & Tự động khởi tạo Lộ trình học cá nhân hóa cho User
   * POST /api/v1/placement-test/submit
   */
  public static async submitPlacementTest(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        examType = ExamType.ACADEMIC,
        scores,
        targetOverallBand = 6.5,
        weeklyHoursAvailable = 10,
      } = req.body;

      if (!userId || !scores) {
        res.status(400).json({ success: false, message: 'userId and scores are required' });
        return;
      }

      // 1. Tính toán điểm chuẩn
      const calc = calculateOverallBandScore({
        listening: scores.listening,
        reading: scores.reading,
        writing: scores.writing,
        speaking: scores.speaking,
      });

      const startTier = mapBandToTier(calc.overallBand);
      const targetTier = mapBandToTier(Number(targetOverallBand));

      // 2. Cập nhật hồ sơ User trong Database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          currentOverallBand: calc.overallBand,
          overallTier: startTier,
          targetOverallBand: Number(targetOverallBand),
          targetExamType: examType,
        },
      });

      // 3. Cập nhật 4 kỹ năng của User
      const skillsArray: Array<{ skill: SkillType; band: number }> = [
        { skill: SkillType.LISTENING, band: scores.listening },
        { skill: SkillType.READING, band: scores.reading },
        { skill: SkillType.WRITING, band: scores.writing },
        { skill: SkillType.SPEAKING, band: scores.speaking },
      ];

      for (const item of skillsArray) {
        const itemTier = mapBandToTier(item.band);
        await prisma.userSkillProfile.upsert({
          where: {
            userId_skill: {
              userId,
              skill: item.skill,
            },
          },
          update: {
            currentBand: item.band,
            currentTier: itemTier,
            targetBand: Math.max(item.band + 1.0, Number(targetOverallBand)),
            targetTier,
          },
          create: {
            userId,
            skill: item.skill,
            currentBand: item.band,
            currentTier: itemTier,
            targetBand: Math.max(item.band + 1.0, Number(targetOverallBand)),
            targetTier,
          },
        });
      }

      // 4. Phân bổ kho học liệu tương ứng
      const recommendation = getRecommendedMaterialsByBand(calc.overallBand);

      // 5. Tạo LearningPath mới trong Database
      const title = `Lộ trình ${examType === ExamType.ACADEMIC ? 'IELTS Academic' : 'IELTS General'}: Bứt phá ${calc.overallBand} -> ${targetOverallBand}`;
      const newPath = await prisma.learningPath.create({
        data: {
          userId,
          title,
          description: `Lộ trình tự động đề xuất dựa trên kết quả Test Đầu Vào (Overall: ${calc.overallBand}). Khuyến nghị học liệu: ${recommendation.primaryRoadmapBook?.title || 'Cambridge IELTS'}`,
          examType,
          startOverallTier: startTier,
          targetOverallTier: targetTier,
          targetOverallBand: Number(targetOverallBand),
          status: 'ACTIVE',
          estimatedWeeks: Math.max(8, Math.round((Number(targetOverallBand) - calc.overallBand) * 12)),
          weeklyHoursCommitment: Number(weeklyHoursAvailable),
          totalModulesCount: 4,
          completedModulesCount: 0,
        },
      });

      // Khởi tạo các module cho 4 kỹ năng dựa trên học liệu
      await prisma.learningModule.createMany({
        data: [
          {
            learningPathId: newPath.id,
            skill: SkillType.LISTENING,
            tier: startTier,
            examType,
            title: `Listening: ${recommendation.primaryRoadmapBook?.title || 'Phát triển kỹ năng nghe'}`,
            orderIndex: 1,
            estimatedMinutes: 120,
            status: 'AVAILABLE',
          },
          {
            learningPathId: newPath.id,
            skill: SkillType.READING,
            tier: startTier,
            examType,
            title: `Reading: Chiến thuật đọc hiểu ${examType === ExamType.ACADEMIC ? 'học thuật' : 'văn bản đời sống'}`,
            orderIndex: 2,
            estimatedMinutes: 120,
            status: 'LOCKED',
          },
          {
            learningPathId: newPath.id,
            skill: SkillType.WRITING,
            tier: startTier,
            examType,
            title: `Writing: Làm chủ cấu trúc câu và lập luận ${examType === ExamType.ACADEMIC ? 'Task 1 Biểu đồ' : 'Task 1 Viết thư'}`,
            orderIndex: 3,
            estimatedMinutes: 150,
            status: 'LOCKED',
          },
          {
            learningPathId: newPath.id,
            skill: SkillType.SPEAKING,
            tier: startTier,
            examType,
            title: 'Speaking: Phản xạ lưu loát và phát âm tự nhiên',
            orderIndex: 4,
            estimatedMinutes: 120,
            status: 'LOCKED',
          },
        ],
      });

      res.status(201).json({
        success: true,
        message: 'Hoàn thành bài Test đầu vào & Tạo lộ trình học thành công!',
        data: {
          calculation: calc,
          tier: startTier,
          user: updatedUser,
          learningPath: newPath,
          recommendedMaterials: recommendation,
        },
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Submit failed';
      res.status(500).json({ success: false, error: msg });
    }
  }
}
