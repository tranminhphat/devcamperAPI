import { NextFunction, Request, Response } from 'express';

/**
 * @desc		Get all bootcamps
 * @route		GET /api/v1/bootcamps
 * @access	Public
 */
export const getBootCamps = (
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	res.status(200).json({ success: true, message: 'Show all bootcamps' });
};

/**
 * @desc		Get single bootcamp
 * @route		GET /api/v1/bootcamps/:id
 * @access	Public
 */
export const getBootCamp = (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	res
		.status(200)
		.json({ success: true, message: `Show bootcamp ${req.params.id}` });
};

/**
 * @desc		Create new bootcamp
 * @route		POST /api/v1/bootcamps
 * @access	Private
 */
export const createBootCamp = (
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	res.status(200).json({ success: true, message: 'Create new bootcamp' });
};

/**
 * @desc		Update bootcamp
 * @route		PUT /api/v1/bootcamps/:id
 * @access	Private
 */
export const updateBootCamp = (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	res
		.status(200)
		.json({ success: true, message: `Update bootcamp ${req.params.id}` });
};

/**
 * @desc		Delete bootcamp
 * @route		DELETE /api/v1/bootcamps/:id
 * @access	Private
 */
export const deleteBootCamp = (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	res
		.status(200)
		.json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
