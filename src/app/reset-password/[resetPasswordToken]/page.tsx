'use server';

import { getTokenResetPasswordApiAction } from '@/actions/api/auth/auth.api.actions';
import GhostLink from '@/components/common/ghost-link';
import ResetPasswordForm from '@/components/features/reset-password-form';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

interface ResetPasswordTokenPageProps {
	params: Promise<{
		resetPasswordToken?: string;
	}>;
}

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
			<ResetPasswordForm className='mt-12' resetPasswordToken={resetPasswordToken} />
			<div className='mt-4 flex justify-center'>
				<GhostLink href='/login'>Back to login</GhostLink>
			</div>
		</>
	);
}

async function ResetPasswordTokenPage({ params }: ResetPasswordTokenPageProps): Promise<ReactNode> {
	const { resetPasswordToken } = await params;

	if (!resetPasswordToken) {
		throw new Error('Something went wrong.');
	}

	try {
		await getTokenResetPasswordApiAction(resetPasswordToken);
	} catch (error) {
		return error instanceof Error && error.message === 'Token expired.' ? <RenderExpired /> : notFound();
	}

	return <RenderSuccess resetPasswordToken={resetPasswordToken} />;
}

export default ResetPasswordTokenPage;
