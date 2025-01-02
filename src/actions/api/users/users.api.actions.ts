'use server';

import { USERS_DEFAULT_PAGE_LIMIT } from '@/constants/api.constants';
import { BACKEND_URL } from '@/constants/environment.constants';
import {
	RequestGetUsersApiInterface,
	RequestPatchIdUsersApiInterface,
	ResponseGetMeUsersApiInterface,
	ResponseGetUsersApiInterface,
	ResponsePatchIdUsersApiInterface,
} from '@/interfaces/api/users/users.api.interfaces';
import buildUrl from '@/utils/build-url';
import { authenticatedFetchRequest } from '@/utils/fetch';
import { isHttpError } from 'http-errors';
import { NextResponse } from 'next/server';

export async function getMeUsersApiAction(res: NextResponse): Promise<ResponseGetMeUsersApiInterface> {
	try {
		const url: string = buildUrl(BACKEND_URL, '/users/me');
		const config = {
			method: 'GET',
		};

		const response: Response = await authenticatedFetchRequest(url, config, res);

		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function getUsersApiAction({
	page = 1,
	limit = USERS_DEFAULT_PAGE_LIMIT,
	sortBy,
}: RequestGetUsersApiInterface): Promise<ResponseGetUsersApiInterface> {
	try {
		const url: string = buildUrl(BACKEND_URL, '/users', {
			...(page && { page: page.toString() }),
			...(limit && { limit: limit.toString() }),
			...(sortBy && { sortBy }),
		});
		const config = { method: 'GET' };

		const response: Response = await authenticatedFetchRequest(url, config);

		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function patchIdUsersApiAction(userId: string, data: RequestPatchIdUsersApiInterface): Promise<ResponsePatchIdUsersApiInterface> {
	try {
		const url: string = buildUrl(BACKEND_URL, `/users/${userId}`);
		const config: RequestInit = {
			method: 'PATCH',
			body: JSON.stringify(data),
		};
		const response: Response = await authenticatedFetchRequest(url, config);

		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function deleteIdUsersApiAction(userId: string): Promise<void> {
	try {
		const url: string = buildUrl(BACKEND_URL, `/users/${userId}`);

		const config = {
			method: 'DELETE',
		};

		await authenticatedFetchRequest(url, config);
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}
