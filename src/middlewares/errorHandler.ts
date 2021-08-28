import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/ErrorResponse';

const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let error = { ...err };
	error.message = err.message;

	// Log to console for dev
	console.log(err);

	// MongoDB bad ObjectID error
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(404, message);
	}

	// MongoDB duplicate field error
	if (err.code === 11000) {
		const message = `Duplicate field value error`;
		error = new ErrorResponse(400, message);
	}

	// MongoDB validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map(
			(val) => (val as Error).message
		);
		error = new ErrorResponse(400, message.toString());
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Internal Server Error',
	});
};

export default errorHandler;
