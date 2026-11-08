import { Request, Response } from 'express';
import { prisma } from '../../database/prisma.client';
import { ExamType, BandLevel, SkillType } from '../../common/enums';
import { BAND_TIER_CONFIGS, EXAM_TYPE_DEFINITIONS } from '../../../../shared/constants/ielts-levels';

export class LearningPathController {
  /**
   * Lấy cấu hình metadata hệ thống phân tầng và hình thức thi
   * GET /api/v1/learning-paths/metadata
   */
  public static async getSystemMetadata(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      data: {
        examTypes: EXAM_TYPE_DEFINITIONS,
        bandTiers: BAND_TIER_CONFIGS,
        skills: [
          SkillType.LISTENING,
          SkillType.SPEAKING,
          SkillType.READING,
          SkillType.WRITING,
        ],
      },
    });
  }

  /**
   * Lấy danh sách Learning Path theo User hoặc filter theo examType
   * GET /api/v1/learning-paths
   */
  public static async getLearningPaths(req: Request, res: Response): Promise<void> {
    try {
      const { userId, examType, tier } = req.query;

      const whereClause: Record<string, unknown> = {};
      if (userId) whereClause.userId = String(userId);
      if (examType) whereClause.examType = String(examType);
      if (tier) whereClause.targetOverallTier = String(tier);

      const paths = await prisma.learningPath.findMany({
        where: whereClause,
        include: {
          user: {
            select: { id: true, fullName: true, email: true, targetExamType: true },
          },
          modules: {
            orderBy: { orderIndex: 'asc' },
          },
          milestones: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({ success: true, count: paths.length, data: paths });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Database query failed';
      res.status(500).json({ success: false, error: msg });
    }
  }

  /**
   * Tạo Learning Path mới
   * POST /api/v1/learning-paths
   */
  public static async createLearningPath(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        title,
        description,
        examType,
        startOverallTier,
        targetOverallTier,
        targetOverallBand,
        estimatedWeeks,
        weeklyHoursCommitment,
      } = req.body;

      if (!userId || !title || !examType || !startOverallTier || !targetOverallTier || !targetOverallBand) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields to initialize learning path',
        });
        return;
      }

      // Validate examType
      if (![ExamType.ACADEMIC, ExamType.GENERAL_TRAINING].includes(examType)) {
        res.status(400).json({ success: false, message: 'Invalid examType. Must be ACADEMIC or GENERAL_TRAINING' });
        return;
      }

      const newPath = await prisma.learningPath.create({
        data: {
          userId,
          title,
          description,
          examType,
          startOverallTier,
          targetOverallTier,
          targetOverallBand: Number(targetOverallBand),
          estimatedWeeks: Number(estimatedWeeks || 12),
          weeklyHoursCommitment: Number(weeklyHoursCommitment || 10),
          status: 'ACTIVE',
        },
        include: {
          user: true,
          modules: true,
        },
      });

      res.status(201).json({ success: true, data: newPath });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to create learning path';
      res.status(500).json({ success: false, error: msg });
    }
  }

  /**
   * Lấy chi tiết một Learning Path theo ID
   * GET /api/v1/learning-paths/:id
   */
  public static async getLearningPathById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);

      const path = await prisma.learningPath.findUnique({
        where: { id },
        include: {
          modules: {
            include: { lessons: true },
            orderBy: { orderIndex: 'asc' },
          },
          milestones: {
            orderBy: { targetBand: 'asc' },
          },
          user: true,
        },
      });

      if (!path) {
        res.status(404).json({ success: false, message: 'Learning path not found' });
        return;
      }

      res.status(200).json({ success: true, data: path });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Error fetching learning path';
      res.status(500).json({ success: false, error: msg });
    }
  }
}
