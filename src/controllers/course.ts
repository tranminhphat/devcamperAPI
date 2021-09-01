import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import Bootcamp from '../models/Bootcamp';
import Course from '../models/Course';
import ErrorResponse from '../utils/ErrorResponse';

/**
 * @desc		Get all courses
 * @route		GET /api/v1/courses
 * @route		GET /api/v1/bootcamps/:bootcampId/courses
 * @access	Public
 */
export const getCourses = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { bootcampId } = req.params;

		if (bootcampId) {
			const course = await Course.find({ bootcamp: bootcampId }).populate({
				path: 'bootcamp',
				select: 'name description',
			});
			return res
				.status(200)
				.json({ success: true, count: course.length, data: course });
		} else {
			return res.status(200).json((res as any).advancedResult);
		}
	}
);

/**
 * @desc		Get single course
 * @route		GET /api/v1/courses/:id
 * @access	Public
 */
export const getCourse = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const course = await Course.findById(req.params.id).populate({
			path: 'bootcamp',
			select: 'name description',
		});

		if (!course) {
			next(
				new ErrorResponse(404, `Course not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: course });
	}
);

/**
 * @desc		Create new course
 * @route		POST /api/v1/bootcamps/:bootcampId/courses
 * @access	Private
 */
export const createCourse = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// Include the bootcamp ID in the form body
		req.body.bootcamp = req.params.bootcampId;

		const bootcamp = Bootcamp.findById(req.params.bootcampId);
		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		const course = await Course.create(req.body);

		res.status(201).json({ success: true, data: course });
	}
);

/**
 * @desc		Update course
 * @route		PUT /api/v1/courses/:id
 * @access	Private
 */
export const updateCourse = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!course) {
			next(
				new ErrorResponse(404, `Course not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: course });
	}
);

/**
 * @desc		Delete course
 * @route		DELETE /api/v1/courses/:id
 * @access	Private
 */
export const deleteCourse = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const course = await Course.findById(req.params.id);

		if (!course) {
			next(
				new ErrorResponse(404, `Course not found with id of ${req.params.id}`)
			);
			return;
		}

		course.remove();

		res.status(200).json({ success: true, data: {} });
	}
);
