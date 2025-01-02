'use server';

import { deleteLogoutAuthApiAction, postLoginAuthApiAction, postRegisterAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import { deleteAuthCookies, setCookie } from '@/actions/cookies/cookies.actions';
import {
	RequestPostLoginAuthApiInterface,
	RequestPostRegisterAuthApiInterface,
	ResponsePostLoginAuthApiInterface
} from '@/interfaces/api/auth/auth.api.interfaces';

export async function submitRegisterFormFeatureAction(data: RequestPostRegisterAuthApiInterface): Promise<void> {
	await postRegisterAuthApiAction(data);

	const { email, password } = data;

	await submitLoginFormFeatureAction({ email, password });
}

export async function submitLoginFormFeatureAction(data: RequestPostLoginAuthApiInterface): Promise<void> {
	const response: ResponsePostLoginAuthApiInterface = await postLoginAuthApiAction(data);
	await setCookie('accessToken', response.accessToken);
}

export async function onClickLogoutButtonFeatureAction(): Promise<void> {
	await deleteLogoutAuthApiAction();
	await deleteAuthCookies();
}
