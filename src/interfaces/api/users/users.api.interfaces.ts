export interface ObjectUserUsersApiInterface {
	email: string;
	id: string;
	firstName: string;
	lastName: string;
	roles: string[];
	emailVerifiedAt: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface ObjectMeUsersApiInterface {
	email: string;
	id: string;
	firstName: string;
	lastName: string;
	roles: string[];
	emailVerifiedAt: string | null;
}

export interface ResponseGetMeUsersApiInterface {
	message: string;
	me: ObjectMeUsersApiInterface;
}

export interface RequestPostMeResetPasswordUsersApiInterface {
	password: string;
	newPassword: string;
}

export interface ResponsePostMeResetPasswordUsersApiInterface {
	message: string;
	accessToken: string;
}

export interface RequestGetUsersApiInterface {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	filters?: Record<string, string>;
}

export interface ResponseGetUsersApiInterface {
	message: string;
	users: ObjectUserUsersApiInterface[];
	pagination: {
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface RequestPatchIdUsersApiInterface {
	email?: string;
	firstName?: string;
	lastName?: string;
}

export interface ResponsePatchIdUsersApiInterface {
	message: string;
	user: ObjectUserUsersApiInterface;
}
