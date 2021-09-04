import express from 'express';
import authRoutes from './auth';
import bootCampsRoutes from './bootcamp';
import courseRoutes from './course';
import userRoute from './user';

const router = express.Router();

router.use('/bootcamps', bootCampsRoutes);
router.use('/courses', courseRoutes);
router.use('/users', userRoute);
router.use('/auth', authRoutes);

export default router;
