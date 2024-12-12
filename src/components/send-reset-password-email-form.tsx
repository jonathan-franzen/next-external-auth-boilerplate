'use client';

import Form from '@/components/form';
import SendResetPasswordEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/send-reset-password-email.request.auth.api.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import internalApiService from '@/services/internal-api';
import { ReactNode, useState } from 'react';

export default function SendResetPasswordEmailForm(): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnSubmit: FormOnSubmitFunctionReactInterface = async (formData: Record<string, any>): Promise<void> => {
		setIsLoading(true);
		try {
			await internalApiService.postSendResetPasswordEmail(formData as SendResetPasswordEmailRequestAuthApiInterface);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form
			fields={[{ name: 'email', type: 'email', placeholder: 'Email', autoComplete: 'email', required: true }]}
			submitLabel='SEND PASSWORD RESET EMAIL'
			onSubmit={handleOnSubmit}
			isLoading={isLoading}
		/>
	);
}
