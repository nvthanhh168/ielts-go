import { Router } from 'express';
import { WritingController } from './writing.controller';

const router = Router();

// GET /api/v1/writing/prompts - Lấy đề thi mẫu Task 1 & Task 2
router.get('/prompts', WritingController.getPrompts);

// POST /api/v1/writing/evaluate - AI Examiner chấm chữa chi tiết & sinh bài mẫu nâng cấp
router.post('/evaluate', WritingController.evaluateEssay);

export default router;
