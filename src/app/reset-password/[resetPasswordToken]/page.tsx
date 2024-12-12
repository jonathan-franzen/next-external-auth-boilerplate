'use server';

import ResetPasswordForm from '@/components/reset-password-form';
import StatusError from '@/errors/status.error';
import apiService from '@/services/api';
import { AxiosError } from 'axios';
import { Params } from 'next/dist/server/request/params';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function ResetPasswordTokenPage(props: { params: Promise<Params> }): Promise<ReactNode> {
	const params: Params = await props.params;
	const resetPasswordToken: string | undefined = Array.isArray(params.resetPasswordToken) ? params.resetPasswordToken[0] : params.resetPasswordToken;

	if (!resetPasswordToken) {
		throw new StatusError('Something unexpected happened.', 500);
	}

	try {
		await apiService.getVerifyResetPasswordToken(resetPasswordToken);
	} catch (err) {
		if (err instanceof AxiosError && err.status === 410) {
			return <RenderExpired />;
		}
		console.error(err);
		return notFound();
	}

	return <RenderSuccess resetPasswordToken={resetPasswordToken} />;
}

function RenderExpired(): ReactNode {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>TOKEN EXPIRED</h1>
			<p className='mt-12 text-center'>Your token has expired. Please request a new one from /reset-password.</p>
			<div className='mt-4 flex justify-center'>
				<Link href='/login' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
					Back to login
				</Link>
			</div>
		</>
	);
}

function RenderSuccess({ resetPasswordToken }: { resetPasswordToken: string }): ReactNode {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SET YOUR NEW PASSWORD</h1>
			<ResetPasswordForm resetPasswordToken={resetPasswordToken} />
			<div className='mt-4 flex justify-center'>
				<Link href='/login' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
					Back to login
				</Link>
			</div>
		</>
	);
}
