import express from 'express';
import bootCampsRoutes from './bootcamps';

const router = express.Router();

router.use('/bootcamps', bootCampsRoutes);

export default router;
