import MeObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/me.object.response.users.api.interface';

interface MeResponseUsersApiInterface {
	message: string;
	me: MeObjectResponseUsersApiInterface;
}

export default MeResponseUsersApiInterface;
