import { Router } from 'express';
import { PlacementTestController } from './placement-test.controller';

const router = Router();

// GET /api/v1/placement-test/descriptors - Lấy bảng 9 Band điểm chuẩn IELTS & Hướng dẫn du học
router.get('/descriptors', PlacementTestController.getBandDescriptors);

// POST /api/v1/placement-test/evaluate - Thuật toán tính Overall Band Score & Gợi ý học liệu
router.post('/evaluate', PlacementTestController.evaluateScore);

// GET /api/v1/placement-test/materials - Lấy kho học liệu theo 5 mức Band
router.get('/materials', PlacementTestController.getMaterials);

// POST /api/v1/placement-test/submit - Nộp bài test đầu vào & tự động tạo Lộ trình học
router.post('/submit', PlacementTestController.submitPlacementTest);

export default router;
