import { Router } from 'express';
import { ListeningController } from './listening.controller';

const router = Router();

// GET /api/v1/listening/exam-paper - Lấy đề thi 4 Sections (40 câu)
router.get('/exam-paper', ListeningController.getExamPaper);

// GET /api/v1/listening/audio/:filename - Stream audio MP3 cho từng section
router.get('/audio/:filename', ListeningController.streamAudio);

// POST /api/v1/listening/grade - Chấm điểm tự động chuẩn khảo thí Cambridge
router.post('/grade', ListeningController.gradeExam);

// POST /api/v1/listening/explain-with-ai - Gọi AI giải thích vị trí đáp án trong tapescript
router.post('/explain-with-ai', ListeningController.explainTapescriptWithAi);

export default router;
