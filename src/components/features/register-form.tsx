'use client';

import { submitRegisterFormFeatureAction } from '@/actions/feature/feature.actions';
import Form from '@/components/common/form';
import { EMAIL_VALIDATION_REGEX, PASSWORD_VALIDATION_REGEX } from '@/constants/regex.constants';
import { RequestPostRegisterAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import getFormValidationSchema from '@/utils/get-form-validation-schema';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface RegisterFormProps {
	className?: string;
}

function RegisterForm({ className }: RegisterFormProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const formFields = [
		{ autoComplete: 'email', name: 'email', placeholder: 'Email', required: true, type: 'text' },
		{ autoComplete: 'firstName', name: 'firstName', placeholder: 'First name', required: true, type: 'firstName' },
		{ autoComplete: 'lastName', name: 'lastName', placeholder: 'Last name', required: true, type: 'lastName' },
		{ autoComplete: 'new-password', name: 'password', placeholder: 'Password', required: true, type: 'password' },
	];

	const formValidationSchema = {
		...getFormValidationSchema('email', EMAIL_VALIDATION_REGEX, 'Not a valid email address.', true),
		...getFormValidationSchema('password', PASSWORD_VALIDATION_REGEX, 'Password too weak.', true),
	};

	const handleOnSubmit = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await submitRegisterFormFeatureAction(formData as unknown as RequestPostRegisterAuthApiInterface);
			await new Promise(() => router.push('/verify-email'));
		} catch (error) {
			setIsLoading(false);
			throw error;
		}
	};

	return (
		<Form
			className={className}
			fields={formFields}
			isLoading={isLoading}
			onSubmit={handleOnSubmit}
			submitLabel='SIGN UP'
			validationSchema={formValidationSchema}
		/>
	);
}

export default RegisterForm;
