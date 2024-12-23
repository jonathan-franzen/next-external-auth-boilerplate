'use server';

import GhostLink from '@/components/common/ghost-link';
import { UserObjectResponseUsersApiInterface } from '@/interfaces/api/users/response/user.response.users.api.interface';
import apiService from '@/services/api';
import { ReactElement, ReactNode } from 'react';

async function AdminPage(): Promise<ReactNode> {
	const response = await apiService.getUsers();
	const { users } = response.data;

	return (
		<div className='flex flex-col justify-between h-full'>
			<div className='flex flex-col h-full'>
				<h1 className='font-semibold text-center text-gray-700 text-sm'>PROTECTED ADMIN PAGE</h1>
				<h3 className='mt-12 text-center'>USERS</h3>
				<div className='flex flex-col gap-2 mt-2 h-full overflow-y-scroll'>
					{users &&
						users.map(
							(user: UserObjectResponseUsersApiInterface, index: number): ReactElement => (
								<div key={user.id} className='pb-4 border-b'>
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
			<div className='flex justify-center mt-2'>
				<GhostLink href='/dashboard'>Back to dashboard</GhostLink>
			</div>
		</div>
	);
}

export default AdminPage;
