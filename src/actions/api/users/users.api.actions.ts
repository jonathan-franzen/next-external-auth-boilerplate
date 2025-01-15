'use server';

import { USERS_DEFAULT_PAGE_LIMIT } from '@/constants/api.constants';
import { BACKEND_URL } from '@/constants/environment.constants';
import {
	RequestGetUsersApiInterface,
	RequestPatchIdUsersApiInterface,
	RequestPostMeResetPasswordUsersApiInterface,
	ResponseGetMeUsersApiInterface,
	ResponseGetUsersApiInterface,
	ResponsePatchIdUsersApiInterface,
	ResponsePostMeResetPasswordUsersApiInterface,
} from '@/interfaces/api/users/users.api.interfaces';
import { authenticatedFetchRequest, makeRequest } from '@/services/fetch/fetch.service';
import { getAuthSession, updateAuthSessionAndSave } from '@/services/iron-session/iron-session.service';
import buildUrl from '@/utils/build-url';
import { AuthSessionData, IronSession } from 'iron-session';

export async function getMeUsersApiAction(session?: IronSession<AuthSessionData>, isServerComponent = false): Promise<ResponseGetMeUsersApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/users/me');
	const config = {
		method: 'GET',
	};

	session = session || (await getAuthSession());

	return await makeRequest<ResponseGetMeUsersApiInterface>((): Promise<Response> => authenticatedFetchRequest(url, config, isServerComponent, false, session));
}

export async function postMeResetPasswordUsersApiAction(
	data: RequestPostMeResetPasswordUsersApiInterface,
	isServerComponent = false,
): Promise<ResponsePostMeResetPasswordUsersApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/users/me/reset-password');
	const config = {
		method: 'POST',
		body: JSON.stringify(data),
	};
	const response = await makeRequest<ResponsePostMeResetPasswordUsersApiInterface>(
		(): Promise<Response> => authenticatedFetchRequest(url, config, isServerComponent, true),
	);

	await updateAuthSessionAndSave('accessToken', response.accessToken);

	return response;
}

export async function getUsersApiAction(
	{ page = 1, limit = USERS_DEFAULT_PAGE_LIMIT, sortBy }: RequestGetUsersApiInterface,
	isServerComponent = false,
): Promise<ResponseGetUsersApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/users', {
		...(page && { page: page.toString() }),
		...(limit && { limit: limit.toString() }),
		...(sortBy && { sortBy }),
	});
	const config = { method: 'GET' };

	return await makeRequest<ResponseGetUsersApiInterface>((): Promise<Response> => authenticatedFetchRequest(url, config, isServerComponent));
}

export async function patchIdUsersApiAction(
	userId: string,
	data: RequestPatchIdUsersApiInterface,
	isServerComponent = false,
): Promise<ResponsePatchIdUsersApiInterface> {
	const url: string = buildUrl(BACKEND_URL, `/users/${userId}`);
	const config: RequestInit = {
		method: 'PATCH',
		body: JSON.stringify(data),
	};

	return await makeRequest<ResponsePatchIdUsersApiInterface>((): Promise<Response> => authenticatedFetchRequest(url, config, isServerComponent));
}

export async function deleteIdUsersApiAction(userId: string, isServerComponent = false): Promise<void> {
	const url: string = buildUrl(BACKEND_URL, `/users/${userId}`);

	const config = {
		method: 'DELETE',
	};

	await makeRequest<void>((): Promise<Response> => authenticatedFetchRequest(url, config, isServerComponent));
}
