export interface MeResponseUsersApiInterface {
	message: string;
	me: MeObjectResponseUsersApiInterface;
}

export interface MeObjectResponseUsersApiInterface {
	id: string;
	email: string;
	roles: string[];
	firstName: string;
	lastName: string;
	emailVerifiedAt: string | null;
}
