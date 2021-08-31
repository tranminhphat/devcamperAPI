import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import Course from '../models/Course';

/**
 * @desc		Get all courses
 * @route		GET /api/v1/courses
 * @route		GET /api/v1/bootcamps/:bootcampId/courses
 * @access	Public
 */
export const getCourses = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { bootcampId } = req.params;
		let query;

		if (bootcampId) {
			query = Course.find({ bootcamp: bootcampId });
		} else {
			query = Course.find();
		}

		const courses = await query;

		res
			.status(200)
			.json({ success: true, count: courses.length, data: courses });
	}
);
