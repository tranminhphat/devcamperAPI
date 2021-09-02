import express from 'express';
import { getMe, login, register } from '../controllers/auth';
import { authRoute } from '../middlewares/authRoute';

const router = express.Router();

router.get('/me', authRoute, getMe);
router.post('/register', register);
router.post('/login', login);

export default router;
