'use server';

import { getUsersApiAction } from '@/actions/api/users/users.api.actions';
import GhostLink from '@/components/common/ghost-link';
import PageSelector from '@/components/page-specific/admin/page-selector';
import SortingSelector from '@/components/page-specific/admin/sorting-selector';
import UsersContainer from '@/components/page-specific/admin/users-container';
import { ResponseGetUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface AdminPageProps {
	searchParams: Promise<{
		page?: string;
		sortBy?: string;
	}>;
}

async function AdminPage({ searchParams }: AdminPageProps): Promise<ReactNode> {
	const { page = '1', sortBy = 'createdAt' } = await searchParams;
	const pageNumber: number = Number(page);

	const response: ResponseGetUsersApiInterface = await getUsersApiAction({ page: pageNumber, sortBy }, true);

	if (!response && pageNumber > 1) {
		const params = new URLSearchParams({ page, sortBy });
		params.set('page', '1');
		redirect(`/admin?${params.toString()}`);
	}

	const { users, pagination } = response;

	return (
		<div className='flex h-full flex-col justify-between'>
			<h1 className='text-center text-sm font-semibold text-gray-700'>PROTECTED ADMIN PAGE</h1>
			<div className='mb-4 mt-12 flex justify-between'>
				<p>Listing all users</p>
				<SortingSelector initialSortingOption={sortBy} />
			</div>
			<UsersContainer users={users} page={page} sortBy={sortBy} />
			{pagination.totalPages > 1 && <PageSelector currentPage={pagination.page} totalPages={pagination.totalPages} className='mt-4' />}
			<GhostLink href='/dashboard' className='mt-2 flex justify-center'>
				Back to dashboard
			</GhostLink>
		</div>
	);
}

export default AdminPage;
