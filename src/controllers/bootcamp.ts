import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import config from '../configs';
import asyncHandler from '../middlewares/asyncHandler';
import Bootcamp from '../models/Bootcamp';
import ErrorResponse from '../utils/ErrorResponse';
import geocoder from '../utils/GeoCoder';

/**
 * @desc		Get all bootcamps
 * @route		GET /api/v1/bootcamps
 * @access	Public
 */
export const getBootCamps = asyncHandler(
	async (_req: Request, res: Response) => {
		res.status(200).json((res as any).advancedResult);
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
		const bootcamp = await Bootcamp.findById(req.params.id);

		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		bootcamp.remove();

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

/**
 * @desc		Upload photo for bootcamp
 * @route		PUT /api/v1/bootcamps/:id/photo
 * @access	Private
 */
export const uploadPhoto = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const bootcamp = await Bootcamp.findById(req.params.id);

		if (!bootcamp) {
			next(
				new ErrorResponse(404, `Bootcamp not found with id of ${req.params.id}`)
			);
			return;
		}

		if (!req.files) {
			next(new ErrorResponse(400, `Please upload a file`));
			return;
		}

		const uploadFile = req.files.photo as UploadedFile;
		// Check if the uploadFile is an image file
		if (!uploadFile.mimetype.startsWith('image')) {
			next(new ErrorResponse(400, `Please upload an image file`));
			return;
		}

		// Check if file size is too big
		if (uploadFile.size > parseInt(config.MAX_FILE_UPLOAD_SIZE as string)) {
			next(new ErrorResponse(400, `Please upload an image file`));
			return;
		}

		// Create a custom file name
		uploadFile.name = `photo_${bootcamp._id}${path.parse(uploadFile.name).ext}`;

		// Move photo to public folder
		uploadFile.mv(
			`${config.FILE_UPLOAD_PATH as string}/${uploadFile.name}`,
			async (err) => {
				if (err) {
					console.error(err);
					next(new ErrorResponse(500, `Problem with upload file`));
					return;
				}

				await Bootcamp.findByIdAndUpdate(req.params.id, {
					photo: uploadFile.name,
				});

				res.status(200).json({
					success: true,
					data: uploadFile.name,
				});
			}
		);
	}
);
