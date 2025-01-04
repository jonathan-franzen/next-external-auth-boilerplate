'use client';

import { submitRegisterFormFeatureAction } from '@/actions/feature/feature.actions';
import Form from '@/components/common/form';
import { EMAIL_VALIDATION_REGEX, PASSWORD_VALIDATION_REGEX } from '@/constants/regex.constants';
import { RequestPostRegisterAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import { FieldReactFormInterface, OnSubmitReactFormInterface, ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';
import getFormValidationSchema from '@/utils/get-form-validation-schema';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface RegisterFormProps {
	className?: string;
}

function RegisterForm({ className }: RegisterFormProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router: AppRouterInstance = useRouter();

	const formFields: FieldReactFormInterface[] = [
		{ name: 'email', type: 'text', placeholder: 'Email', autoComplete: 'email', required: true },
		{ name: 'firstName', type: 'firstName', placeholder: 'First name', autoComplete: 'firstName', required: true },
		{ name: 'lastName', type: 'lastName', placeholder: 'Last name', autoComplete: 'lastName', required: true },
		{ name: 'password', type: 'password', placeholder: 'Password', autoComplete: 'new-password', required: true },
	];

	const formValidationSchema: ValidationSchemaReactFormInterface = {
		...getFormValidationSchema('email', EMAIL_VALIDATION_REGEX, 'Not a valid email address.', true),
		...getFormValidationSchema('password', PASSWORD_VALIDATION_REGEX, 'Password too weak.', true),
	};

	const handleOnSubmit: OnSubmitReactFormInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await submitRegisterFormFeatureAction(formData as unknown as RequestPostRegisterAuthApiInterface);
			router.push('/verify-email');
		} catch (err) {
			setIsLoading(false);
			throw err;
		}
	};

	return (
		<Form
			fields={formFields}
			submitLabel='SIGN UP'
			onSubmit={handleOnSubmit}
			isLoading={isLoading}
			validationSchema={formValidationSchema}
			className={className}
		/>
	);
}

export default RegisterForm;
