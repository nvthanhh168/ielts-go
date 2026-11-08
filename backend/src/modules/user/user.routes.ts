import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

// GET /api/v1/users - Danh sách người học
router.get('/', UserController.getUsers);

// POST /api/v1/users - Đăng ký / Tạo hồ sơ người học
router.post('/', UserController.createUser);

// GET /api/v1/users/:id - Chi tiết hồ sơ và 4 kỹ năng của người học
router.get('/:id', UserController.getUserById);

export default router;
