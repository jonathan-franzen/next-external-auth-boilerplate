'use client';

import UserCard from '@/components/page-specific/admin/user-card';
import { ObjectUserUsersApiInterface } from '@/interfaces/api/user/user.api.interfaces';
import { ReactNode, useEffect, useRef } from 'react';

interface UsersContainerProps {
	page?: string;
	sortBy?: string;
	users: ObjectUserUsersApiInterface[];
}

function UsersContainer({ page, sortBy, users }: UsersContainerProps): ReactNode {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTo({ behavior: 'instant', top: 0 });
		}
	}, [page, sortBy]);

	return (
		<div className='flex h-full flex-col gap-4 overflow-y-scroll' ref={containerRef}>
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
}

export default UsersContainer;
