'use client';

import UserCard from '@/components/page-specific/admin/user-card';
import { ObjectUserUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { ReactNode, RefObject, useEffect, useRef } from 'react';

interface UsersContainerProps {
	users: ObjectUserUsersApiInterface[];
	page?: string;
	sortBy?: string;
}

function UsersContainer({ users, page, sortBy }: UsersContainerProps): ReactNode {
	const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	useEffect((): void => {
		if (containerRef.current) {
			containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
		}
	}, [page, sortBy]);

	return (
		<div ref={containerRef} className='flex h-full flex-col gap-4 overflow-y-scroll'>
			{users.map(
				(user: ObjectUserUsersApiInterface): ReactNode => (
					<UserCard key={user.id} user={user} />
				),
			)}
		</div>
	);
}

export default UsersContainer;
