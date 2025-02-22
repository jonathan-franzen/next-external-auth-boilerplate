'use server';

import GhostLink from '@/components/common/ghost-link';
import { ReactNode } from 'react';

interface AdminLayoutProps {
	children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps): ReactNode {
	return (
		<div className='flex h-full flex-col justify-between'>
			<h1 className='text-center text-sm font-semibold text-gray-700'>PROTECTED ADMIN PAGE</h1>
			{children}
			<GhostLink className='mt-2 flex justify-center' href='/dashboard'>
				Back to dashboard
			</GhostLink>
		</div>
	);
}

export default AdminLayout;
