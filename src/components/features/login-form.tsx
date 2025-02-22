'use client';

import { submitLoginFormFeatureAction } from '@/actions/feature/feature.actions';
import Form from '@/components/common/form';
import { EMAIL_VALIDATION_REGEX } from '@/constants/regex.constants';
import { RequestPostLoginAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import getFormValidationSchema from '@/utils/get-form-validation-schema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {ReactNode, useState} from 'react';

interface LoginFormProps {
	className?: string;
}

function LoginForm({ className }: LoginFormProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const formFields = [
		{ autoComplete: 'email', name: 'email', placeholder: 'Email', required: true, type: 'text' },
		{ autoComplete: 'current-password', name: 'password', placeholder: 'Password', required: true, type: 'password' },
	];

	const formValidationSchema = {
		...getFormValidationSchema('email', EMAIL_VALIDATION_REGEX, 'Invalid password.', false),
	};

	const handleOnSubmit = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await submitLoginFormFeatureAction(formData as unknown as RequestPostLoginAuthApiInterface);
			await new Promise(() => router.push('/dashboard'));
		} catch (error) {
			setIsLoading(false);
			throw error;
		}
	};

	return (
		<Form
			additionalContent={
				<div className='mt-1 flex justify-end'>
					<Link className='w-fit text-xs text-pink-900 hover:text-pink-700' href='/reset-password'>
						Forgot your password?
					</Link>
				</div>
			}
			className={className}
			fields={formFields}
			isLoading={isLoading}
			onSubmit={handleOnSubmit}
			submitLabel='SIGN IN'
			validationSchema={formValidationSchema}
		/>
	);
}

export default LoginForm;
