import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';

/**
 * @desc		Get all users
 * @route		GET /api/v1/users
 * @access	Private/Admin
 */
export const getUsers = asyncHandler(
	async (_req: Request, res: Response, _next: NextFunction) => {
		return res.status(200).json((res as any).advancedResult);
	}
);

/**
 * @desc		Get single user
 * @route		GET /api/v1/users/:id
 * @access	Private/Admin
 */
export const getUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(req.params.id);

		if (!user) {
			next(
				new ErrorResponse(404, `User not found with id of ${req.params.id}`)
			);
			return;
		}

		res.status(200).json({ success: true, data: user });
	}
);

/**
 * @desc		Create new user
 * @route		POST /api/v1/users
 * @access	Private/Admin
 */
export const createUser = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const user = await User.create(req.body);

		res.status(201).json({ success: true, data: user });
	}
);

/**
 * @desc		Update user
 * @route		PUT /api/v1/users/:id
 * @access	Private/Admin
 */
export const updateUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let user = (await User.findById(req.params.id)) as any;

		if (!user) {
			next(
				new ErrorResponse(404, `User not found with id of ${req.params.id}`)
			);
			return;
		}

		user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({ success: true, data: user });
	}
);

/**
 * @desc		Delete user
 * @route		DELETE /api/v1/users/:id
 * @access	Private/Admin
 */
export const deleteUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = (await User.findById(req.params.id)) as any;

		if (!user) {
			next(
				new ErrorResponse(404, `User not found with id of ${req.params.id}`)
			);
			return;
		}

		user.remove();

		res.status(200).json({ success: true, data: {} });
	}
);
