'use client';

import internalApiService from '@/services/internal-api';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import PrimaryButton from "@/components/common/primary-button";

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

	return <PrimaryButton isLoading={isLoading} className='mt-6' onClick={handleOnClick} >RESEND VERIFY EMAIL</PrimaryButton>;
}
