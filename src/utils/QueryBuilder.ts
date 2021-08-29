const queryBuilder = (query: any, queryRequest: any) => {
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

	// query with filter
	query = query.find(JSON.parse(filterStr));

	// query with selected fields
	if (queryRequest.select) {
		const fields = queryRequest.select.split(',').join(' ');
		query = query.select(fields);
	}

	// query with sorting
	if (queryRequest.sort) {
		console.log(queryRequest.sort);
		const sortBy = queryRequest.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	//query with pagination
	const page = parseInt(queryRequest.page, 10) || 1;
	const limit = parseInt(queryRequest.limit, 10) || 1;
	const skip = (page - 1) * limit;

	query = query.skip(skip).limit(limit);

	return query;
};

export default queryBuilder;
