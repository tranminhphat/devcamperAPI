export const createFilterObject = (queryRequest: any) => {
	const queryReq = { ...queryRequest };
	// Fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit'];
	removeFields.forEach((param) => delete queryReq[param]);

	let filterStr = JSON.stringify(queryReq);
	// Create operators ($gt, $gte, etc.)
	filterStr = filterStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);

	return JSON.parse(filterStr);
};

export const createSelectString = (select?: string) => {
	if (select) {
		return select.split(',').join(' ');
	}

	return undefined;
};

export const createSortString = (sort?: string) => {
	let sortBy;
	if (sort) {
		sortBy = sort.split(',').join(' ');
	} else {
		sortBy = '-createdAt';
	}

	return sortBy;
};

export const createPaginationObject = (limit?: string, page?: string) => {
	const realPage = page ? parseInt(page, 10) : 1;
	const realLimit = limit ? parseInt(limit, 10) : 2;
	const skip = (realPage - 1) * realLimit;

	return {
		skip,
		page: realPage,
		limit: realLimit,
	};
};
