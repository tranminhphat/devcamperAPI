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
import { authorizeRole, authRoute, UserRole } from '../middlewares/authRoute';
import Bootcamp from '../models/Bootcamp';
import coursesRouter from './course';
import reviewRouter from './review';

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', coursesRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.get('/', advancedResult(Bootcamp, 'courses'), getBootCamps);
router.get('/:id', getBootCamp);
router.get('/radius/:zipcode/:distance', getBootcampsInRadius);
router.post(
	'/',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.PUBLISHER),
	createBootCamp
);
router.put(
	'/:id',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.PUBLISHER),
	updateBootCamp
);
router.put(
	'/:id/photo',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.PUBLISHER),
	uploadPhoto
);
router.delete(
	'/:id',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.PUBLISHER),
	deleteBootCamp
);

export default router;
