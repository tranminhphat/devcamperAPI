import express from 'express';
import {
	createReview,
	deleteReview,
	getReview,
	getReviews,
	updateReview,
} from '../controllers/review';
import advancedResult from '../middlewares/advancedResult';
import { authorizeRole, authRoute, UserRole } from '../middlewares/authRoute';
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
router.get('/:id', getReview);
router.post(
	'/',
	authRoute,
	authorizeRole(UserRole.USER, UserRole.ADMIN),
	createReview
);
router.put(
	'/:id',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.USER),
	updateReview
);
router.delete(
	'/:id',
	authRoute,
	authorizeRole(UserRole.ADMIN, UserRole.USER),
	deleteReview
);

export default router;
