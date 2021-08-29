import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import {
	createBootcamp,
	deleteBootcampById,
	fetchBootcampById,
	fetchBootcamps,
	fetchBootcampsByRadius,
	updateBootcampById,
} from '../services/bootcamp';
import ErrorResponse from '../utils/ErrorResponse';
import geocoder from '../utils/GeoCoder';

/**
 * @desc		Get all bootcamps
 * @route		GET /api/v1/bootcamps
 * @access	Public
 */
export const getBootCamps = asyncHandler(
	async (req: Request, res: Response) => {
		const bootcamps = await fetchBootcamps(req.query);
		res
			.status(200)
			.json({ success: true, count: bootcamps.length, data: bootcamps });
	}
);

/**
 * @desc		Get single bootcamp
 * @route		GET /api/v1/bootcamps/:id
 * @access	Public
 */
export const getBootCamp = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bootcamp = await fetchBootcampById(req.params.id);
		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: bootcamp });
	}
);

/**
 * @desc		Create new bootcamp
 * @route		POST /api/v1/bootcamps
 * @access	Private
 */
export const createBootCamp = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const bootcamp = await createBootcamp(req.body);
		res.status(201).json({ success: true, data: bootcamp });
	}
);

/**
 * @desc		Update bootcamp
 * @route		PUT /api/v1/bootcamps/:id
 * @access	Private
 */
export const updateBootCamp = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bootcamp = await updateBootcampById(req.params.id, req.body);

		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: bootcamp });
	}
);

/**
 * @desc		Delete bootcamp
 * @route		DELETE /api/v1/bootcamps/:id
 * @access	Private
 */
export const deleteBootCamp = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bootcamp = await deleteBootcampById(req.params.id);

		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: {} });
	}
);

/**
 * @desc		Get bootcamps within a radius
 * @route		GET /api/v1/bootcamps/radius/:zipcode/:distance
 * @access	Private
 */
export const getBootcampsInRadius = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { zipcode, distance } = req.params;

		// Get lat, lng from zipcode with gecoder
		const loc = await geocoder.geocode(zipcode);
		const lat = loc[0].latitude as number;
		const lng = loc[0].longitude as number;

		// Calculate radius using radians
		// Divide distance by radius of Earth
		// Earth's radius = 3,963 mi
		const radius = parseInt(distance) / 3963;

		const bootcamps = await fetchBootcampsByRadius(lat, lng, radius);

		res.status(200).json({
			success: true,
			count: bootcamps.length,
			data: bootcamps,
		});
	}
);
