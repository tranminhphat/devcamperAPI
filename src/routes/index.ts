import express from 'express';
import bootCampsRoutes from './bootcamps';
import coursesRoutes from './courses';

const router = express.Router();

router.use('/bootcamps', bootCampsRoutes);
router.use('/courses', coursesRoutes);

export default router;
