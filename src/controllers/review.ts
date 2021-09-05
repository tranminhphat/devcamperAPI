import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import Review from '../models/Review';

/**
 * @desc		Get all reviews
 * @route		GET /api/v1/reviews
 * @route		GET /api/v1/bootcamps/:bootcampId/reviews
 * @access	Public
 */
export const getReviews = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { bootcampId } = req.params;

		if (bootcampId) {
			const reviews = await Review.find({ bootcamp: bootcampId }).populate({
				path: 'bootcamp',
				select: 'name description',
			});

			return res
				.status(200)
				.json({ success: true, count: reviews.length, data: reviews });
		} else {
			return res.status(200).json((res as any).advancedResult);
		}
	}
);
