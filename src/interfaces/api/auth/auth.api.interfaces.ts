export interface RequestPostLoginAuthApiInterface {
	email: string;
	password: string;
}

export interface RequestPostRegisterAuthApiInterface {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface RequestPostResendVerifyEmailAuthApiInterface {
	email: string;
}

export interface RequestPostResetPasswordAuthApiInterface {
	email: string;
}

export interface RequestPostTokenResetPasswordAuthApiInterface {
	password: string;
}

export interface ResponseGetTokenResetPasswordAuthApiInterface {
	message: string;
}

export interface ResponsePostLoginAuthApiInterface {
	accessToken: string;
	message: string;
}

export interface ResponsePostRefreshAuthApiInterface {
	accessToken: string;
	message: string;
}

export interface ResponsePostRegisterAuthApiInterface {
	message: string;
}

export interface ResponsePostResendVerifyEmailAuthApiInterface {
	message: string;
}

export interface ResponsePostResetPasswordAuthApiInterface {
	message: string;
}

export interface ResponsePostTokenResetPasswordAuthApiInterface {
	message: string;
}

export interface ResponsePostTokenVerifyEmailAuthApiInterface {
	message: string;
}
