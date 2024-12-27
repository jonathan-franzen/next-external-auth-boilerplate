interface GetUsersRequestAuthApiInterface {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	filters?: Record<string, any>;
}

export default GetUsersRequestAuthApiInterface;
