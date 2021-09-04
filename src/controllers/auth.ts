import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { sendTokenResponse } from '../utils/ServiceUtils';

/**
 * @desc		Register user
 * @route		POST /api/v1/auth/register
 * @access	Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password, role } = req.body;

	const user = (await User.create({
		name,
		email,
		password,
		role,
	})) as any;

	sendTokenResponse(user, 201, res);
});

/**
 * @desc		Login user
 * @route		POST /api/v1/auth/login
 * @access	Public
 */
export const login = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		if (!email || !password) {
			next(new ErrorResponse(400, 'Please provide an email and password'));
			return;
		}

		const user = (await User.findOne({ email }).select('+password')) as any;

		if (!user) {
			next(new ErrorResponse(401, 'Invalid credentials'));
			return;
		}

		const isMatchPassword = await user.matchPassword(password);

		if (!isMatchPassword) {
			next(new ErrorResponse(401, 'Invalid credentials'));
			return;
		}

		sendTokenResponse(user, 200, res);
	}
);

/**
 * @desc		Get the current user
 * @route		GET /api/v1/auth/me
 * @access	Public
 */
export const getMe = asyncHandler(
	async (req: any, res: Response, _next: NextFunction) => {
		res.status(200).json({ success: true, data: (req as any).user });
	}
);

/**
 * @desc		Forgot password
 * @route		POST /api/v1/auth/forgotpassword
 * @access	Public
 */
export const forgotPassord = asyncHandler(
	async (req: any, res: Response, next: NextFunction) => {
		const user = (await User.findOne({ email: req.body.email })) as any;

		if (!user) {
			return next(new ErrorResponse(404, 'There is no user with that email'));
		}

		// Get reset password token
		user.getResetPasswordToken();

		await user.save({ validateBeforeSave: false });

		res.status(200).json({ success: true, data: user });
	}
);
