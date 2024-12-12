'use client';

import Button from '@/components/button';
import internalApiService from '@/services/internal-api';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

export default function ResendVerifyEmailButton({ email }: { email: string }): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnClick: () => Promise<void> = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await internalApiService.postResendVerifyEmail({ email });
		} catch {
			toast.error('Unable to send email.');
		} finally {
			setIsLoading(false);
		}
	};

	return <Button label='RESEND VERIFY EMAIL' isLoading={isLoading} className='mt-6' onClick={handleOnClick} />;
}
