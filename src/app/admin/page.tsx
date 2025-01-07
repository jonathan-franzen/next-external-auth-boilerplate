'use server';

import { getUsersApiAction } from '@/actions/api/users/users.api.actions';
import Refresh from '@/components/features/refresh';
import PageSelector from '@/components/page-specific/admin/page-selector';
import SortingSelector from '@/components/page-specific/admin/sorting-selector';
import UsersContainer from '@/components/page-specific/admin/users-container';
import { ResponseGetUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { until } from '@open-draft/until';
import { isHttpError } from 'http-errors';
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

	const { data, error } = await until((): Promise<ResponseGetUsersApiInterface> => getUsersApiAction({ page: pageNumber, sortBy }, true));

	if (error) {
		// Fallback in-case refresh not performed in middleware.
		if (isHttpError(error) && error.status === 401) {
			return <Refresh loadingIndicator={true} />;
		} else {
			throw error;
		}
	}

	if (!data && pageNumber > 1) {
		const params = new URLSearchParams({ page, sortBy });
		params.set('page', '1');
		redirect(`/admin?${params.toString()}`);
	}

	return (
		<>
			<div className='mb-4 mt-12 flex justify-between'>
				<p>Listing all users</p>
				<SortingSelector initialSortingOption={sortBy} />
			</div>
			<UsersContainer users={data?.users || []} page={page} sortBy={sortBy} />
			{data && data.pagination.totalPages > 1 && <PageSelector currentPage={data.pagination.page} totalPages={data.pagination.totalPages} className='mt-4' />}
		</>
	);
}

export default AdminPage;
