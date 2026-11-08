import { Router } from 'express';
import { AiController } from './ai.controller';

const router = Router();

// POST /api/v1/ai/generate - Generic AI completion
router.post('/generate', AiController.genericGenerate);

// POST /api/v1/ai/generate-roadmap - AI personalized roadmap generator
router.post('/generate-roadmap', AiController.generateRoadmap);

// POST /api/v1/ai/evaluate-writing - AI IELTS writing examiner
router.post('/evaluate-writing', AiController.evaluateWriting);

// POST /api/v1/ai/evaluate-speaking - AI IELTS speaking examiner
router.post('/evaluate-speaking', AiController.evaluateSpeaking);

export default router;
