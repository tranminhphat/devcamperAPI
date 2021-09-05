import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { UserRole } from '../middlewares/authRoute';
import Bootcamp from '../models/Bootcamp';
import Review from '../models/Review';
import ErrorResponse from '../utils/ErrorResponse';

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

/**
 * @desc		Get single review
 * @route		GET /api/v1/reviews/:id
 * @access	Public
 */
export const getReview = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const review = await Review.findById(req.params.id).populate({
			path: 'bootcamp',
			select: 'name description',
		});

		if (!review) {
			next(
				new ErrorResponse(404, `Review not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: review });
	}
);

/**
 * @desc		Add new review
 * @route		POST /api/v1/bootcamps/:bootcampId/reviews
 * @access	Private
 */
export const createReview = asyncHandler(
	async (req: Request & { user: any }, res: Response, next: NextFunction) => {
		req.body.bootcamp = req.params.bootcampId;
		req.body.user = req.user.id;

		const bootcamp = await Bootcamp.findById(req.params.bootcampId);
		if (!bootcamp) {
			return next(
				new ErrorResponse(
					404,
					`Bootcamp not found with id of ${req.params.bootcampId}`
				)
			);
		}

		const review = await Review.create(req.body);

		res.status(201).json({ success: true, data: review });
	}
);

/**
 * @desc		Update review
 * @route		PUT /api/v1/reviews/:id
 * @access	Private
 */
export const updateReview = asyncHandler(
	async (req: Request & { user: any }, res: Response, next: NextFunction) => {
		let review = (await Review.findById(req.params.id)) as any;

		if (!review) {
			next(
				new ErrorResponse(404, `Reviews not found with id of ${req.params.id}`)
			);
			return;
		}

		// Make sure review belongs to user or user is admin
		if (
			review.user.toString() !== req.user.id &&
			req.user.role !== UserRole.ADMIN
		) {
			return next(
				new ErrorResponse(
					404,
					`User ${req.user.id} is not authorized to update review ${review._id}`
				)
			);
		}

		review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({ success: true, data: review });
	}
);

/**
 * @desc		Delete review
 * @route		DELETE /api/v1/review/:id
 * @access	Private
 */
export const deleteReview = asyncHandler(
	async (req: Request & { user: any }, res: Response, next: NextFunction) => {
		const review = (await Review.findById(req.params.id)) as any;

		if (!review) {
			next(
				new ErrorResponse(404, `Review not found with id of ${req.params.id}`)
			);
			return;
		}

		// Make sure review belongs to user or user is admin
		if (
			review.user.toString() !== req.user.id &&
			req.user.role !== UserRole.ADMIN
		) {
			return next(
				new ErrorResponse(
					404,
					`User ${req.user.id} is not authorized to delete review ${review._id}`
				)
			);
		}

		review.remove();

		res.status(200).json({ success: true, data: {} });
	}
);
