import express from 'express';
import {
	createCourse,
	deleteCourse,
	getCourse,
	getCourses,
	updateCourse,
} from '../controllers/course';
import advancedResult from '../middlewares/advancedResult';
import { authorizeRole, authRoute, UserRole } from '../middlewares/authRoute';
import Course from '../models/Course';

const router = express.Router({ mergeParams: true });

router.get(
	'/',
	advancedResult(Course, {
		path: 'bootcamp',
		select: 'name description',
	}),
	getCourses
);
router.get('/:id', getCourse);
router.post(
	'/',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.PUBLISHER),
	createCourse
);
router.put(
	'/:id',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.PUBLISHER),
	updateCourse
);
router.delete(
	'/:id',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.PUBLISHER),
	deleteCourse
);

export default router;
