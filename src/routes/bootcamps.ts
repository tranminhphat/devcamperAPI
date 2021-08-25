import express from 'express';
import {
	createBootCamp,
	deleteBootCamp,
	getBootCamp,
	getBootCamps,
	updateBootCamp,
} from '../controllers/bootcampControllers';

const router = express.Router();

router.get('/', getBootCamps);
router.get('/:id', getBootCamp);
router.post('/', createBootCamp);
router.put('/:id', updateBootCamp);
router.delete('/:id', deleteBootCamp);

export default router;
