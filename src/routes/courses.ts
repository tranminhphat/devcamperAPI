import express from 'express';
import { getCourses } from '../controllers/course';

const router = express.Router({ mergeParams: true });

router.get('/', getCourses);

export default router;
