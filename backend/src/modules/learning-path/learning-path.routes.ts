import { Router } from 'express';
import { LearningPathController } from './learning-path.controller';

const router = Router();

// GET /api/v1/learning-paths/metadata - Lấy toàn bộ phân tầng và cấu hình 2 hình thức thi
router.get('/metadata', LearningPathController.getSystemMetadata);

// GET /api/v1/learning-paths - Lấy danh sách lộ trình (hỗ trợ lọc userId, examType, tier)
router.get('/', LearningPathController.getLearningPaths);

// POST /api/v1/learning-paths - Khởi tạo lộ trình mới
router.post('/', LearningPathController.createLearningPath);

// GET /api/v1/learning-paths/:id - Chi tiết lộ trình
router.get('/:id', LearningPathController.getLearningPathById);

export default router;
