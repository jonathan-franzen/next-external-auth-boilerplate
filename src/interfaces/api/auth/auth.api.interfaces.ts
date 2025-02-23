export interface RequestPostLoginApiInterface {
	email: string;
	password: string;
}

export interface RequestPostRegisterApiInterface {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface RequestPostResendVerifyEmailApiInterface {
	email: string;
}

export interface RequestPostResetPasswordApiInterface {
	email: string;
}

export interface RequestPostTokenResetPasswordApiInterface {
	password: string;
}

export interface ResponseGetTokenResetPasswordApiInterface {
	message: string;
}

export interface ResponsePostLoginApiInterface {
	accessToken: string;
	message: string;
}

export interface ResponsePostRefreshApiInterface {
	accessToken: string;
	message: string;
}

export interface ResponsePostRegisterApiInterface {
	message: string;
}

export interface ResponsePostResendVerifyEmailApiInterface {
	message: string;
}

export interface ResponsePostResetPasswordApiInterface {
	message: string;
}

export interface ResponsePostTokenResetPasswordApiInterface {
	message: string;
}

export interface ResponsePostTokenVerifyEmailApiInterface {
	message: string;
}
