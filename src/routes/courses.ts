import express from 'express';
import {
	createCourse,
	deleteCourse,
	getCourse,
	getCourses,
	updateCourse,
} from '../controllers/course';
import advancedResult from '../middlewares/advancedResult';
import { authRoute } from '../middlewares/authRoute';
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
router.post('/', authRoute, createCourse);
router.put('/:id', authRoute, updateCourse);
router.delete('/:id', authRoute, deleteCourse);

export default router;
