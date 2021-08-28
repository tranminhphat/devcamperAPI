import { NextFunction, Request, Response } from 'express';
import {
	createBootcamp,
	deleteBootcampById,
	fetchBootcampById,
	fetchBootcamps,
	updateBootcampById,
} from '../services/bootcamp';
import ErrorResponse from '../utils/ErrorResponse';

/**
 * @desc		Get all bootcamps
 * @route		GET /api/v1/bootcamps
 * @access	Public
 */
export const getBootCamps = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bootcamps = await fetchBootcamps();
		res
			.status(200)
			.json({ success: true, count: bootcamps.length, data: bootcamps });
	} catch (err) {
		next(err);
	}
};

/**
 * @desc		Get single bootcamp
 * @route		GET /api/v1/bootcamps/:id
 * @access	Public
 */
export const getBootCamp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bootcamp = await fetchBootcampById(req.params.id);
		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: bootcamp });
	} catch (err) {
		next(err);
	}
};

/**
 * @desc		Create new bootcamp
 * @route		POST /api/v1/bootcamps
 * @access	Private
 */
export const createBootCamp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bootcamp = await createBootcamp(req.body);
		res.status(201).json({ success: true, data: bootcamp });
	} catch (err) {
		next(err);
	}
};

/**
 * @desc		Update bootcamp
 * @route		PUT /api/v1/bootcamps/:id
 * @access	Private
 */
export const updateBootCamp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bootcamp = await updateBootcampById(req.params.id, req.body);

		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: bootcamp });
	} catch (err) {
		next(err);
	}
};

/**
 * @desc		Delete bootcamp
 * @route		DELETE /api/v1/bootcamps/:id
 * @access	Private
 */
export const deleteBootCamp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bootcamp = await deleteBootcampById(req.params.id);

		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: {} });
	} catch (err) {
		next(err);
	}
};
