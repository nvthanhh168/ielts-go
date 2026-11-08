import { Router } from 'express';
import { ReadingController } from './reading.controller';

const router = Router();

// GET /api/v1/reading/exam-paper - Lấy đề thi Reading (Academic / General)
router.get('/exam-paper', ReadingController.getExamPaper);

// POST /api/v1/reading/grade - Chấm điểm 40 câu hỏi tự động
router.post('/grade', ReadingController.gradeExam);

// POST /api/v1/reading/ai-mentor - AI Trợ Giảng cá nhân hóa theo Band (< 6.0 vs 6.0+)
router.post('/ai-mentor', ReadingController.consultAiMentor);

export default router;
