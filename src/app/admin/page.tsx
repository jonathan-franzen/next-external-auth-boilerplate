'use server';

import GhostLink from '@/components/common/ghost-link';
import ListUsers from '@/components/page-specific/admin/list-users';
import UserResponseUsersApiInterface from '@/interfaces/api/users/response/user.response.users.api.interface';
import apiService from '@/services/api';
import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';

async function AdminPage(): Promise<ReactNode> {
	const response: AxiosResponse<UserResponseUsersApiInterface> = await apiService.getUsers();
	const { users } = response.data;

	return (
		<div className='flex h-full flex-col justify-between'>
			<div className='flex h-full flex-col'>
				<h1 className='text-center text-sm font-semibold text-gray-700'>PROTECTED ADMIN PAGE</h1>
				<h3 className='mt-12 text-center'>USERS</h3>
				<div className='mt-2 flex h-full flex-col gap-2 overflow-y-scroll'>
					<ListUsers initialUsers={users} />
				</div>
			</div>
			<div className='mt-2 flex justify-center'>
				<GhostLink href='/dashboard'>Back to dashboard</GhostLink>
			</div>
		</div>
	);
}

export default AdminPage;
