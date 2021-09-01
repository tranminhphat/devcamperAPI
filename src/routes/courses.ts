import express from 'express';
import {
	createCourse,
	deleteCourse,
	getCourse,
	getCourses,
	updateCourse,
} from '../controllers/course';
import advancedResult from '../middlewares/advancedResult';
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
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
