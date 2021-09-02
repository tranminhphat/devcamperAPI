import express from 'express';
import authRoutes from './auth';
import bootCampsRoutes from './bootcamps';
import coursesRoutes from './courses';

const router = express.Router();

router.use('/bootcamps', bootCampsRoutes);
router.use('/courses', coursesRoutes);
router.use('/auth', authRoutes);

export default router;
