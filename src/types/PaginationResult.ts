export type PaginationResult = {
	next?: {
		limit: number;
		page: number;
	};
	prev?: {
		limit: number;
		page: number;
	};
};
