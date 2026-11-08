import { Request, Response } from 'express';
import { prisma } from '../../database/prisma.client';
import { ExamType, BandLevel, SkillType } from '../../common/enums';

export class UserController {
  /**
   * Lấy danh sách Users kèm theo Skill Profiles
   * GET /api/v1/users
   */
  public static async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        include: {
          skillProfiles: true,
          learningPaths: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      });
      res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to fetch users';
      res.status(500).json({ success: false, error: msg });
    }
  }

  /**
   * Tạo người dùng mới với cấu hình hình thức thi và cấp độ xuất phát
   * POST /api/v1/users
   */
  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        email,
        fullName,
        targetExamType = ExamType.ACADEMIC,
        currentOverallBand = 3.0,
        overallTier = BandLevel.ZERO_FOUNDATION,
        targetOverallBand = 6.5,
      } = req.body;

      if (!email || !fullName) {
        res.status(400).json({ success: false, message: 'Email and fullName are required' });
        return;
      }

      const user = await prisma.user.create({
        data: {
          email,
          fullName,
          targetExamType,
          currentOverallBand: Number(currentOverallBand),
          overallTier,
          targetOverallBand: Number(targetOverallBand),
          // Tự động khởi tạo 4 kỹ năng cơ bản
          skillProfiles: {
            create: [
              {
                skill: SkillType.LISTENING,
                currentBand: Number(currentOverallBand),
                currentTier: overallTier,
                targetBand: Number(targetOverallBand),
                targetTier: BandLevel.BAND_6_0_TO_7_5,
              },
              {
                skill: SkillType.SPEAKING,
                currentBand: Number(currentOverallBand),
                currentTier: overallTier,
                targetBand: Number(targetOverallBand),
                targetTier: BandLevel.BAND_6_0_TO_7_5,
              },
              {
                skill: SkillType.READING,
                currentBand: Number(currentOverallBand),
                currentTier: overallTier,
                targetBand: Number(targetOverallBand),
                targetTier: BandLevel.BAND_6_0_TO_7_5,
              },
              {
                skill: SkillType.WRITING,
                currentBand: Number(currentOverallBand),
                currentTier: overallTier,
                targetBand: Number(targetOverallBand),
                targetTier: BandLevel.BAND_6_0_TO_7_5,
              },
            ],
          },
        },
        include: {
          skillProfiles: true,
        },
      });

      res.status(201).json({ success: true, data: user });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to create user';
      res.status(500).json({ success: false, error: msg });
    }
  }

  /**
   * Lấy chi tiết User theo ID
   * GET /api/v1/users/:id
   */
  public static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          skillProfiles: true,
          learningPaths: {
            include: { modules: true },
          },
          aiEvaluations: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Error retrieving user';
      res.status(500).json({ success: false, error: msg });
    }
  }
}
