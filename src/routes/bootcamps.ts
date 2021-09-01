import express from 'express';
import {
	createBootCamp,
	deleteBootCamp,
	getBootCamp,
	getBootCamps,
	getBootcampsInRadius,
	updateBootCamp,
	uploadPhoto,
} from '../controllers/bootcamp';
import advancedResult from '../middlewares/advancedResult';
import Bootcamp from '../models/Bootcamp';
import coursesRouter from './courses';

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', coursesRouter);

router.get('/', advancedResult(Bootcamp, 'courses'), getBootCamps);
router.get('/:id', getBootCamp);
router.get('/radius/:zipcode/:distance', getBootcampsInRadius);
router.post('/', createBootCamp);
router.put('/:id', updateBootCamp);
router.put('/:id/photo', uploadPhoto);
router.delete('/:id', deleteBootCamp);

export default router;
