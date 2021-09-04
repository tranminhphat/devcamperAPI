import express from 'express';
import {
	forgotPassord,
	getMe,
	login,
	register,
	resetPassword,
} from '../controllers/auth';
import { authRoute } from '../middlewares/authRoute';

const router = express.Router();

router.get('/me', authRoute, getMe);
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassord);
router.put('/resetpassword/:resetToken', resetPassword);

export default router;
