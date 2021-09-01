import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { PaginationResult } from '../types/PaginationResult';
import * as ServiceUtils from '../utils/ServiceUtils';

const advancedResult =
	(model: Model<any, any, any>, populate: any) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const { select, sort, limit, page } = req.query;
		let query;

		//Filters
		const filterObj = ServiceUtils.createFilterObject(req.query);
		query = model.find(filterObj);
		//Selected fields
		const selectStr = ServiceUtils.createSelectString(select as string);
		query = query.select(selectStr);

		// Sort by field
		const sortBy = ServiceUtils.createSortString(sort as string);
		query = query.sort(sortBy);

		// Pagination
		const realPage = page ? parseInt(page as string, 10) : 1;
		const realLimit = limit ? parseInt(limit as string, 10) : 25;
		const startIndex = (realPage - 1) * realLimit;
		const endIndex = realPage * realLimit;
		const total = await model.countDocuments();

		query.skip(startIndex).limit(realLimit);

		if (populate) {
			query = query.populate(populate);
		}

		const results = await query;

		// Pagination result
		let pagination: PaginationResult = {};

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

		(res as any).advancedResult = {
			pagination,
			success: true,
			count: results.length,
			data: results,
		};

		next();
	};

export default advancedResult;
