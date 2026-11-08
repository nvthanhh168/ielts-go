import { Request, Response } from 'express';
import {
  callAiApi,
  evaluateIeltsWriting,
  evaluateIeltsSpeaking,
  generatePersonalizedRoadmap,
} from '../../services/ai/ai.helper';
import { ExamType, BandLevel, SkillType } from '../../common/enums';

export class AiController {
  /**
   * Endpoint gọi AI API tổng quát
   * POST /api/v1/ai/generate
   */
  public static async genericGenerate(req: Request, res: Response): Promise<void> {
    try {
      const { prompt, systemInstruction, options } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ success: false, message: 'Prompt is required and must be a string' });
        return;
      }

      const result = await callAiApi({
        prompt,
        systemInstruction,
        options,
      });

      res.status(200).json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown AI Error';
      res.status(500).json({ success: false, error: message });
    }
  }

  /**
   * Endpoint sinh Lộ trình học tập cá nhân hóa qua AI
   * POST /api/v1/ai/generate-roadmap
   */
  public static async generateRoadmap(req: Request, res: Response): Promise<void> {
    try {
      const {
        targetExamType,
        currentTier,
        targetTier,
        targetBand,
        currentSkills,
        weeklyHoursAvailable,
        targetExamDate,
      } = req.body;

      if (!targetExamType || !currentTier || !targetTier || !targetBand || !currentSkills) {
        res.status(400).json({
          success: false,
          message: 'Missing required parameters: targetExamType, currentTier, targetTier, targetBand, currentSkills',
        });
        return;
      }

      const roadmap = await generatePersonalizedRoadmap({
        targetExamType: targetExamType as ExamType,
        currentTier: currentTier as BandLevel,
        targetTier: targetTier as BandLevel,
        targetBand: Number(targetBand),
        currentSkills,
        weeklyHoursAvailable: Number(weeklyHoursAvailable || 10),
        targetExamDate,
      });

      res.status(200).json({ success: true, data: roadmap });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to generate roadmap';
      res.status(500).json({ success: false, error: message });
    }
  }

  /**
   * Endpoint chấm bài Writing bằng AI
   * POST /api/v1/ai/evaluate-writing
   */
  public static async evaluateWriting(req: Request, res: Response): Promise<void> {
    try {
      const { examType, taskType, promptQuestion, studentEssay } = req.body;

      if (!examType || !taskType || !promptQuestion || !studentEssay) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: examType, taskType, promptQuestion, studentEssay',
        });
        return;
      }

      const assessment = await evaluateIeltsWriting({
        examType: examType as ExamType,
        taskType,
        promptQuestion,
        studentEssay,
      });

      res.status(200).json({ success: true, data: assessment });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to evaluate writing';
      res.status(500).json({ success: false, error: message });
    }
  }

  /**
   * Endpoint đánh giá bản gỡ băng Speaking bằng AI
   * POST /api/v1/ai/evaluate-speaking
   */
  public static async evaluateSpeaking(req: Request, res: Response): Promise<void> {
    try {
      const { part, question, transcriptText } = req.body;

      if (!part || !question || !transcriptText) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: part, question, transcriptText',
        });
        return;
      }

      const assessment = await evaluateIeltsSpeaking({
        part: Number(part) as 1 | 2 | 3,
        question,
        transcriptText,
      });

      res.status(200).json({ success: true, data: assessment });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to evaluate speaking';
      res.status(500).json({ success: false, error: message });
    }
  }
}
