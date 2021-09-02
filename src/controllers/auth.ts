import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import User from '../models/User';

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
