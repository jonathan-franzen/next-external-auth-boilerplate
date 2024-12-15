'use client';

import Form from '@/components/common/form';
import SendResetPasswordEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/send-reset-password-email.request.auth.api.interface';
import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormValidationSchemaFormReactInterface from '@/interfaces/react/form/form-validation-schema.form.react.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import internalApiService from '@/services/internal-api';
import getFormValidationSchema from '@/utils/get-form-validation-schema-line';
import { ReactNode, useState } from 'react';

export default function SendResetPasswordEmailForm(): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const formFields: FormFieldReactInterface[] = [{ name: 'email', type: 'text', placeholder: 'Email', autoComplete: 'email', required: true }];

	const formValidationSchema: FormValidationSchemaFormReactInterface = {
		...getFormValidationSchema('email', /^\S+@\S+\.\S+$/, 'Not a valid email address.', false),
	};

	const handleOnSubmit: FormOnSubmitFunctionReactInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);

		await internalApiService.postSendResetPasswordEmail(formData as unknown as SendResetPasswordEmailRequestAuthApiInterface);
		setIsLoading(false);
	};

	return (
		<Form fields={formFields} submitLabel='SEND PASSWORD RESET EMAIL' onSubmit={handleOnSubmit} isLoading={isLoading} validationSchema={formValidationSchema} />
	);
}
