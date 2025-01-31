export interface RequestPostRegisterAuthApiInterface {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface ResponsePostRegisterAuthApiInterface {
	message: string;
}

export interface RequestPostResendVerifyEmailAuthApiInterface {
	email: string;
}

export interface ResponsePostResendVerifyEmailAuthApiInterface {
	message: string;
}

export interface ResponsePostTokenVerifyEmailAuthApiInterface {
	message: string;
}

export interface RequestPostLoginAuthApiInterface {
	email: string;
	password: string;
}

export interface ResponsePostLoginAuthApiInterface {
	message: string;
	accessToken: string;
}

export interface RequestPostResetPasswordAuthApiInterface {
	email: string;
}

export interface ResponsePostResetPasswordAuthApiInterface {
	message: string;
}

export interface ResponseGetTokenResetPasswordAuthApiInterface {
	message: string;
}

export interface RequestPostTokenResetPasswordAuthApiInterface {
	password: string;
}

export interface ResponsePostTokenResetPasswordAuthApiInterface {
	message: string;
}

export interface ResponsePostRefreshAuthApiInterface {
	message: string;
	accessToken: string;
}
