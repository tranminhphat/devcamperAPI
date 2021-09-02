import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../configs';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import asyncHandler from './asyncHandler';

export const authRoute = asyncHandler(
	async (req: Request, _res: Response, next: NextFunction) => {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			// Authorization: Bearer dslgifyu82o4rldmshganfdsklm.2hjl345
			token = req.headers.authorization.split(' ')[1];
		}
		// else if(req.cookies.token){
		// 	token = req.cookies.token;
		//}

		if (!token) {
			return next(new ErrorResponse(401, 'Not authorize to access this route'));
		}

		try {
			const decodedToken = jwt.verify(
				token,
				config.JWT_SECRET as string
			) as any;

			(req as any).user = await User.findById(decodedToken.id as string);

			next();
		} catch (err) {
			console.error(err);
			return next(new ErrorResponse(401, 'Not authorize to access this route'));
		}
	}
);
