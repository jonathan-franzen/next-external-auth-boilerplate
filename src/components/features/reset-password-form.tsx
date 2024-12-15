'use client';

import Form from '@/components/common/form';
import ResetPasswordRequestAuthApiInterface from '@/interfaces/api/auth/request/reset-password.request.auth.api.interface';
import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormValidationSchemaFormReactInterface from '@/interfaces/react/form/form-validation-schema.form.react.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import internalApiService from '@/services/internal-api';
import getFormValidationSchema from '@/utils/get-form-validation-schema-line';
import { ReactNode, useState } from 'react';

export default function ResetPasswordForm({ resetPasswordToken }: { resetPasswordToken: string }): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const formFields: FormFieldReactInterface[] = [
		{ name: 'password', type: 'password', placeholder: 'New password', autoComplete: 'current-password', required: true },
	];

	const formValidationSchema: FormValidationSchemaFormReactInterface = {
		...getFormValidationSchema('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password too weak.', true),
	};

	const handleOnSubmit: FormOnSubmitFunctionReactInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await internalApiService.postResetPassword({ ...(formData as unknown as ResetPasswordRequestAuthApiInterface), resetPasswordToken });
		} finally {
			setIsLoading(false);
		}
	};

	return <Form fields={formFields} submitLabel='UPDATE PASSWORD' onSubmit={handleOnSubmit} isLoading={isLoading} validationSchema={formValidationSchema} />;
}
