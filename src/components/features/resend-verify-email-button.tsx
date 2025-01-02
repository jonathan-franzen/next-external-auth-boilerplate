'use client';

import { postResendVerifyEmailAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import PrimaryButton from '@/components/common/primary-button';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

interface ResendVerifyEmailButtonProps {
	email: string;
}

function ResendVerifyEmailButton({ email }: ResendVerifyEmailButtonProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnClick: () => Promise<void> = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await postResendVerifyEmailAuthApiAction({ email });
			toast.success('Email sent successfully.');
		} catch {
			toast.error('Unable to send email.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PrimaryButton isLoading={isLoading} className='mt-6' onClick={handleOnClick}>
			RESEND VERIFY EMAIL
		</PrimaryButton>
	);
}

export default ResendVerifyEmailButton;
