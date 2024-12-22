import ResetPasswordRequestAuthApiInterface from '@/interfaces/api/auth/request/reset-password.request.auth.api.interface';

interface ResetPasswordRequestAuthInternalApiInterface extends ResetPasswordRequestAuthApiInterface {
	resetPasswordToken: string;
}

export default ResetPasswordRequestAuthInternalApiInterface;
