import UserObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/user.object.response.users.api.interface';

interface UserResponseUsersApiInterface {
	message: string;
	users: UserObjectResponseUsersApiInterface[];
}

export default UserResponseUsersApiInterface;
