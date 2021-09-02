import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';

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

	// Create JWT token
	const token = user.getSignedJwt();

	res.status(201).json({ token, success: true });
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

		// Create JWT token
		const token = user.getSignedJwt();

		res.status(201).json({ token, success: true });
	}
);
