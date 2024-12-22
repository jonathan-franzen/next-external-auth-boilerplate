'use client';

import Form from '@/components/common/form';
import { PASSWORD_VALIDATION_REGEX } from '@/constants/regex.constants';
import ResetPasswordRequestAuthApiInterface from '@/interfaces/api/auth/request/reset-password.request.auth.api.interface';
import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormValidationSchemaFormReactInterface from '@/interfaces/react/form/form-validation-schema.form.react.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import internalApiService from '@/services/internal-api';
import getFormValidationSchema from '@/utils/get-form-validation-schema-line';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

function ResetPasswordForm({ resetPasswordToken }: { resetPasswordToken: string }): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router: AppRouterInstance = useRouter();

	const formFields: FormFieldReactInterface[] = [
		{ name: 'password', type: 'password', placeholder: 'New password', autoComplete: 'current-password', required: true },
	];

	const formValidationSchema: FormValidationSchemaFormReactInterface = {
		...getFormValidationSchema('password', PASSWORD_VALIDATION_REGEX, 'Password too weak.', true),
	};

	const handleOnSubmit: FormOnSubmitFunctionReactInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);

		await internalApiService.postResetPassword({ ...(formData as unknown as ResetPasswordRequestAuthApiInterface), resetPasswordToken });

		toast.success('Password reset successfully.');

		router.push('/login');
	};

	return <Form fields={formFields} submitLabel='UPDATE PASSWORD' onSubmit={handleOnSubmit} isLoading={isLoading} validationSchema={formValidationSchema} />;
}

export default ResetPasswordForm;
