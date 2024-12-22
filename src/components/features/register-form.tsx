'use client';

import Form from '@/components/common/form';
import { EMAIL_VALIDATION_REGEX, PASSWORD_VALIDATION_REGEX } from '@/constants/regex.constants';
import RegisterRequestAuthApiInterface from '@/interfaces/api/auth/request/register.request.auth.api.interface';
import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormValidationSchemaFormReactInterface from '@/interfaces/react/form/form-validation-schema.form.react.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import internalApiService from '@/services/internal-api';
import getFormValidationSchema from '@/utils/get-form-validation-schema-line';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

function RegisterForm(): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router: AppRouterInstance = useRouter();

	const formFields: FormFieldReactInterface[] = [
		{ name: 'email', type: 'text', placeholder: 'Email', autoComplete: 'email', required: true },
		{ name: 'firstName', type: 'firstName', placeholder: 'First name', autoComplete: 'firstName', required: true },
		{ name: 'lastName', type: 'lastName', placeholder: 'Last name', autoComplete: 'lastName', required: true },
		{ name: 'password', type: 'password', placeholder: 'Password', autoComplete: 'new-password', required: true },
	];

	const formValidationSchema: FormValidationSchemaFormReactInterface = {
		...getFormValidationSchema('email', EMAIL_VALIDATION_REGEX, 'Not a valid email address.', true),
		...getFormValidationSchema('password', PASSWORD_VALIDATION_REGEX, 'Password too weak.', true),
	};

	const handleOnSubmit: FormOnSubmitFunctionReactInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);

		const { email, password } = formData;

		try {
			await internalApiService.postRegister(formData as unknown as RegisterRequestAuthApiInterface);
			await internalApiService.postLogin({ email, password });
			router.push('/verify-email');
		} catch (err) {
			setIsLoading(false);
			throw err;
		}
	};

	return (
		<>
			<Form fields={formFields} submitLabel='SIGN UP' onSubmit={handleOnSubmit} isLoading={isLoading} validationSchema={formValidationSchema} />
		</>
	);
}

export default RegisterForm;
