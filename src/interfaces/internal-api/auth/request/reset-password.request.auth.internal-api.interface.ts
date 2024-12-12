import ResetPasswordRequestAuthApiInterface from '@/interfaces/api/auth/request/reset-password.request.auth.api.interface';

export default interface ResetPasswordRequestAuthInternalApiInterface extends ResetPasswordRequestAuthApiInterface {
	resetPasswordToken: string;
}
