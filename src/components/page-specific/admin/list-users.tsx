'use client';

import PrimaryButton from '@/components/common/primary-button';
import { USERS_DEFAULT_PAGE_LIMIT } from '@/constants/api.constants';
import UserObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/user.object.response.users.api.interface';
import UserResponseUsersApiInterface from '@/interfaces/api/users/response/user.response.users.api.interface';
import internalApiService from '@/services/internal-api';
import { AxiosResponse } from 'axios';
import { ChangeEvent, ReactElement, useState } from 'react';

function ListUsers({ initialUsers }: { initialUsers: UserObjectResponseUsersApiInterface[] }): ReactElement {
	const [users, setUsers] = useState<UserObjectResponseUsersApiInterface[]>(initialUsers);
	const [page, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [sortBy, setSortBy] = useState<string>('createdAt');

	const loadMoreUsers: () => Promise<void> = async (): Promise<void> => {
		if (isLoading) return;

		setIsLoading(true);
		const nextPage: number = page + 1;

		try {
			const response: AxiosResponse<UserResponseUsersApiInterface> = await internalApiService.getUsers({ page: nextPage, sortBy });
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

	const handleSortChange: (e: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
		const selectedSort: string = e.target.value;

		setSortBy(selectedSort);
		setPage(1);
		setIsLoading(true);

		try {
			const response: AxiosResponse<UserResponseUsersApiInterface> = await internalApiService.getUsers({ page: 1, sortBy: selectedSort });

			setUsers(response.data.users);
			setHasMore(response.data.users.length >= USERS_DEFAULT_PAGE_LIMIT);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className='mb-4'>
				<label htmlFor='sort' className='mr-1 text-xs text-pink-900'>
					Sort by:
				</label>
				<select id='sort' value={sortBy} onChange={handleSortChange} className='border p-1 text-xs'>
					<option value='firstName'>First Name</option>
					<option value='lastName'>Last Name</option>
					<option value='createdAt'>Created At</option>
				</select>
			</div>
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
