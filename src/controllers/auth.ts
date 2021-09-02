import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';

/**
 * @desc		Register user
 * @route		POST /api/v1/auth/register
 * @access	Public
 */
export const register = asyncHandler(async (_req: Request, res: Response) => {
	res.status(200).json({ sucess: true });
});
