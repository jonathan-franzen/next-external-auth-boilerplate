'use server';

import { getTokenResetPasswordAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import GhostLink from '@/components/common/ghost-link';
import ResetPasswordForm from '@/components/features/reset-password-form';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

function RenderExpired(): ReactNode {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>TOKEN EXPIRED</h1>
			<p className='mt-12 text-center'>Your token has expired. Please request a new one from /reset-password.</p>
			<div className='mt-4 flex justify-center'>
				<GhostLink href='/login'>Back to login</GhostLink>
			</div>
		</>
	);
}

function RenderSuccess({ resetPasswordToken }: { resetPasswordToken: string }): ReactNode {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SET YOUR NEW PASSWORD</h1>
			<ResetPasswordForm resetPasswordToken={resetPasswordToken} className='mt-12' />
			<div className='mt-4 flex justify-center'>
				<GhostLink href='/login'>Back to login</GhostLink>
			</div>
		</>
	);
}

interface ResetPasswordTokenPageProps {
	params: Promise<{
		resetPasswordToken?: string;
	}>;
}

async function ResetPasswordTokenPage({ params }: ResetPasswordTokenPageProps): Promise<ReactNode> {
	const { resetPasswordToken } = await params;

	if (!resetPasswordToken) {
		throw new Error('Something went wrong.');
	}

	try {
		await getTokenResetPasswordAuthApiAction(resetPasswordToken);
	} catch (err) {
		if (err instanceof Error && err.message === 'Token expired.') {
			return <RenderExpired />;
		} else {
			return notFound();
		}
	}

	return <RenderSuccess resetPasswordToken={resetPasswordToken} />;
}

export default ResetPasswordTokenPage;
