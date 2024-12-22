'use client';

import PrimaryButton from '@/components/common/primary-button';
import internalApiService from '@/services/internal-api';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

function ResendVerifyEmailButton({ email }: { email: string }): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnClick: () => Promise<void> = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await internalApiService.postResendVerifyEmail({ email });
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
