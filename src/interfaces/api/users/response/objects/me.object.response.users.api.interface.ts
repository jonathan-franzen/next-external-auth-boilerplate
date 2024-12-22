interface MeObjectResponseUsersApiInterface {
	id: string;
	email: string;
	roles: string[];
	firstName: string;
	lastName: string;
	emailVerifiedAt: string | null;
}

export default MeObjectResponseUsersApiInterface;
