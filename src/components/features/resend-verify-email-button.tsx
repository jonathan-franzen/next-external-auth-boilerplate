'use client';

import { postResendVerifyEmailApiAction } from '@/actions/api/auth/auth.api.actions';
import PrimaryButton from '@/components/common/primary-button';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

interface ResendVerifyEmailButtonProps {
	email: string;
}

function ResendVerifyEmailButton({ email }: ResendVerifyEmailButtonProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnClick = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await postResendVerifyEmailApiAction({ email });
			toast.success('Email sent successfully.');
		} catch {
			toast.error('Unable to send email.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PrimaryButton className='mt-6' isLoading={isLoading} onClick={void handleOnClick}>
			RESEND VERIFY EMAIL
		</PrimaryButton>
	);
}

export default ResendVerifyEmailButton;
