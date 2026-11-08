import { Router } from 'express';
import { speakingController } from './speaking.controller';

const router = Router();

// GET /api/v1/speaking/topics - Lấy danh mục 20 chủ đề Speaking
router.get('/topics', speakingController.getTopics.bind(speakingController));

// GET /api/v1/speaking/topics/:topicId - Lấy chi tiết học liệu của 1 chủ đề
router.get('/topics/:topicId', speakingController.getTopicDetail.bind(speakingController));

// POST /api/v1/speaking/evaluate - Chấm bài nói qua AI Examiner
router.post('/evaluate', speakingController.evaluateSpeech.bind(speakingController));

// POST /api/v1/speaking/part3-questions - Tạo câu hỏi mở rộng Part 3
router.post('/part3-questions', speakingController.generatePart3Questions.bind(speakingController));

export default router;
