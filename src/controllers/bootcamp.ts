import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import Bootcamp from '../models/Bootcamp';
import ErrorResponse from '../utils/ErrorResponse';
import geocoder from '../utils/GeoCoder';
import * as ServiceUtils from '../utils/ServiceUtils';

/**
 * @desc		Get all bootcamps
 * @route		GET /api/v1/bootcamps
 * @access	Public
 */
export const getBootCamps = asyncHandler(
	async (req: Request, res: Response) => {
		const { select, sort, limit, page } = req.query;
		let query;

		//Filters
		const filterObj = ServiceUtils.createFilterObject(req.query);
		query = Bootcamp.find(filterObj);

		//Selected fields
		const selectStr = ServiceUtils.createSelectString(select as string);
		query = query.select(selectStr);

		// Sort by field
		const sortBy = ServiceUtils.createSortString(sort as string);
		query = query.sort(sortBy);

		// Pagination
		const realPage = page ? parseInt(page as string, 10) : 1;
		const realLimit = limit ? parseInt(limit as string, 10) : 2;
		const startIndex = (realPage - 1) * realLimit;
		const endIndex = realPage * realLimit;
		const total = await Bootcamp.countDocuments();

		query.skip(startIndex).limit(realLimit);

		const bootcamps = await query;

		// Pagination result
		let pagination: any = {};

		if (endIndex < total) {
			pagination.next = {
				limit: realLimit,
				page: realPage + 1,
			};
		}

		if (startIndex > 0) {
			pagination.prev = {
				limit: realLimit,
				page: realPage - 1,
			};
		}

		res.status(200).json({
			pagination,
			success: true,
			count: bootcamps.length,
			data: bootcamps,
		});
	}
);

/**
 * @desc		Get single bootcamp
 * @route		GET /api/v1/bootcamps/:id
 * @access	Public
 */
export const getBootCamp = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bootcamp = await Bootcamp.findById(req.params.id);
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
		const bootcamp = await Bootcamp.create(req.body);
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
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

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
		const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

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

		const bootcamps = await Bootcamp.find({
			location: {
				$geoWithin: { $centerSphere: [[lng, lat], radius] },
			},
		});

		res.status(200).json({
			success: true,
			count: bootcamps.length,
			data: bootcamps,
		});
	}
);
