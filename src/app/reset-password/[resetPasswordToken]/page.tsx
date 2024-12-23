'use server';

import GhostLink from '@/components/common/ghost-link';
import ResetPasswordForm from '@/components/features/reset-password-form';
import apiService from '@/services/api';
import { Params } from 'next/dist/server/request/params';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { XiorError as AxiosError, isXiorError as isAxiosError } from 'xior';

function RenderExpired(): ReactNode {
	return (
		<>
			<h1 className='font-semibold text-center text-gray-700 text-sm'>TOKEN EXPIRED</h1>
			<p className='mt-12 text-center'>Your token has expired. Please request a new one from /reset-password.</p>
			<div className='flex justify-center mt-4'>
				<GhostLink href='/login'>Back to login</GhostLink>
			</div>
		</>
	);
}

function RenderSuccess({ resetPasswordToken }: { resetPasswordToken: string }): ReactNode {
	return (
		<>
			<h1 className='font-semibold text-center text-gray-700 text-sm'>SET YOUR NEW PASSWORD</h1>
			<ResetPasswordForm resetPasswordToken={resetPasswordToken} />
			<div className='flex justify-center mt-4'>
				<GhostLink href='/login'>Back to login</GhostLink>
			</div>
		</>
	);
}

async function ResetPasswordTokenPage(props: { params: Promise<Params> }): Promise<ReactNode> {
	const params: Params = await props.params;
	const resetPasswordToken: string | undefined = Array.isArray(params.resetPasswordToken) ? params.resetPasswordToken[0] : params.resetPasswordToken;

	if (!resetPasswordToken) {
		throw new Error('Something went wrong.');
	}

	try {
		await apiService.getVerifyResetPasswordToken(resetPasswordToken);
	} catch (err) {
		if (isAxiosError(err) && (err as AxiosError).message === 'Token expired.') {
			return <RenderExpired />;
		}
		return notFound();
	}

	return <RenderSuccess resetPasswordToken={resetPasswordToken} />;
}

export default ResetPasswordTokenPage;
