import express from 'express';
import {
	forgotPassord,
	getMe,
	login,
	register,
	resetPassword,
	updateInfo,
	updatePassword,
} from '../controllers/auth';
import { authRoute } from '../middlewares/authRoute';

const router = express.Router();

router.get('/me', authRoute, getMe);
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassord);
router.put('/resetpassword/:resetToken', resetPassword);
router.put('/updateinfo', authRoute, updateInfo);
router.put('/updatepassword', authRoute, updatePassword);

export default router;
