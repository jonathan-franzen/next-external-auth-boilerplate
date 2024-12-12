export interface UserResponseUsersApiInterface {
	message: string;
	users: UserObjectResponseUsersApiInterface[];
}

export interface UserObjectResponseUsersApiInterface {
	email: string;
	id: string;
	firstName: string;
	lastName: string;
	roles: string;
	emailVerifiedAt: string | null;
	createdAt: string;
	updatedAt: string;
}
