'use server';

import { deleteLogoutApiAction, postLoginApiAction, postRegisterApiAction } from '@/actions/api/auth/auth.api.actions';
import { RequestPostLoginApiInterface, RequestPostRegisterApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import { destroyAuthSession, updateAuthSessionAndSave } from '@/services/iron-session/iron-session.service';

export async function onClickLogoutButtonFeatureAction(): Promise<void> {
	await deleteLogoutApiAction();
	await destroyAuthSession();
}

export async function submitLoginFormFeatureAction(data: RequestPostLoginApiInterface): Promise<void> {
	const response = await postLoginApiAction(data);
	await updateAuthSessionAndSave('accessToken', response.accessToken);
}

export async function submitRegisterFormFeatureAction(data: RequestPostRegisterApiInterface): Promise<void> {
	await postRegisterApiAction(data);

	const { email, password } = data;

	await submitLoginFormFeatureAction({ email, password });
}
