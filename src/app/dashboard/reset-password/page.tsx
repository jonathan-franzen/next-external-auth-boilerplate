'use server';

import GhostLink from '@/components/common/ghost-link';
import ResetPasswordForm from '@/components/features/reset-password-form';
import { ReactNode } from 'react';

function ResetPasswordDashboardPage(): ReactNode {
	return (
		<div className='flex h-full flex-col'>
			<h1 className='text-center text-sm font-semibold text-gray-700'>CHANGE YOUR PASSWORD</h1>
			<ResetPasswordForm className='mt-12' />
			<div className='mt-2 flex justify-center'>
				<GhostLink href='/dashboard'>Back to dashboard</GhostLink>
			</div>
		</div>
	);
}

export default ResetPasswordDashboardPage;
