'use server';

import GhostLink from '@/components/common/ghost-link';
import { UserObjectResponseUsersApiInterface, UserResponseUsersApiInterface } from '@/interfaces/api/users/response/user.response.users.api.interface';
import apiService from '@/services/api';
import { AxiosResponse } from 'axios';
import { ReactElement, ReactNode } from 'react';

export default async function AdminPage(): Promise<ReactNode> {
	const response: AxiosResponse<UserResponseUsersApiInterface> = await apiService.getUsers();
	const { users } = response.data;

	return (
		<div className='flex h-full flex-col justify-between'>
			<div className='flex h-full flex-col'>
				<h1 className='text-center text-sm font-semibold text-gray-700'>PROTECTED ADMIN PAGE</h1>
				<h3 className='mt-12 text-center'>USERS</h3>
				<div className='mt-2 flex h-full flex-col gap-2 overflow-y-scroll'>
					{users &&
						users.map(
							(user: UserObjectResponseUsersApiInterface, index: number): ReactElement => (
								<div key={user.id} className='border-b pb-4'>
									<p>
										{index + 1}. {user.id}
									</p>
									<p>First name: {user.firstName}</p>
									<p>Last name: {user.lastName}</p>
									<p>Email: {user.email}</p>
									<p>Email verified at: {user.emailVerifiedAt}</p>
									<p>User created at: {user.createdAt}</p>
									<p>User updated at: {user.updatedAt}</p>
								</div>
							),
						)}
				</div>
			</div>
			<div className='mt-2 flex justify-center'>
				<GhostLink href='/dashboard'>Back to dashboard</GhostLink>
			</div>
		</div>
	);
}
