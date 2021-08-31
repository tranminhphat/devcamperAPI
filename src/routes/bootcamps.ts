import express from 'express';
import {
	createBootCamp,
	deleteBootCamp,
	getBootCamp,
	getBootCamps,
	getBootcampsInRadius,
	updateBootCamp,
} from '../controllers/bootcamp';
import coursesRouter from './courses';

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', coursesRouter);

router.get('/', getBootCamps);
router.get('/:id', getBootCamp);
router.get('/radius/:zipcode/:distance', getBootcampsInRadius);
router.post('/', createBootCamp);
router.put('/:id', updateBootCamp);
router.delete('/:id', deleteBootCamp);

export default router;
