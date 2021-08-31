import express from 'express';
import {
	createCourse,
	deleteCourse,
	getCourse,
	getCourses,
	updateCourse,
} from '../controllers/course';

const router = express.Router({ mergeParams: true });

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
