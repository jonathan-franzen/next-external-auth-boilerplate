'use client';

import PrimaryButton from '@/components/common/primary-button';
import { USERS_DEFAULT_PAGE_LIMIT } from '@/constants/api.constants';
import UserObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/user.object.response.users.api.interface';
import UserResponseUsersApiInterface from '@/interfaces/api/users/response/user.response.users.api.interface';
import internalApiService from '@/services/internal-api';
import { AxiosResponse } from 'axios';
import { ReactElement, useState } from 'react';

function ListUsers({ initialUsers }: { initialUsers: UserObjectResponseUsersApiInterface[] }): ReactElement {
	const [users, setUsers] = useState<UserObjectResponseUsersApiInterface[]>(initialUsers);
	const [page, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const loadMoreUsers: () => Promise<void> = async (): Promise<void> => {
		if (isLoading) return;

		setIsLoading(true);
		const nextPage: number = page + 1;

		try {
			const response: AxiosResponse<UserResponseUsersApiInterface> = await internalApiService.getUsers({ page: nextPage });
			const newUsers: UserObjectResponseUsersApiInterface[] = response.data.users;

			setUsers((prevUsers: UserObjectResponseUsersApiInterface[]): UserObjectResponseUsersApiInterface[] => [...prevUsers, ...newUsers]);
			setPage(nextPage);

			// Check if there are more users to load
			if (newUsers.length < USERS_DEFAULT_PAGE_LIMIT) {
				setHasMore(false);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className='flex flex-col gap-4'>
				{users.map(
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
			{hasMore && (
				<div className='mt-4 flex justify-center'>
					<PrimaryButton onClick={loadMoreUsers} isLoading={isLoading} className='inline-flex w-full'>
						Load More
					</PrimaryButton>
				</div>
			)}
		</div>
	);
}

export default ListUsers;
