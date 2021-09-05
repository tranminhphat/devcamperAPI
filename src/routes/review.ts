import express from 'express';
import { getReviews } from '../controllers/review';
import advancedResult from '../middlewares/advancedResult';
import Review from '../models/Review';

const router = express.Router({ mergeParams: true });

router.get(
	'/',
	advancedResult(Review, {
		path: 'bootcamp',
		select: 'name description',
	}),
	getReviews
);

export default router;
