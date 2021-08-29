import express from 'express';
import {
	createBootCamp,
	deleteBootCamp,
	getBootCamp,
	getBootCamps,
	getBootcampsInRadius,
	updateBootCamp,
} from '../controllers/bootcamp';

const router = express.Router();

router.get('/', getBootCamps);
router.get('/:id', getBootCamp);
router.get('/radius/:zipcode/:distance', getBootcampsInRadius);
router.post('/', createBootCamp);
router.put('/:id', updateBootCamp);
router.delete('/:id', deleteBootCamp);

export default router;
