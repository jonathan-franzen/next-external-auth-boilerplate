'use client';

import { submitLoginFormFeatureAction } from '@/actions/feature/feature.actions';
import Form from '@/components/common/form';
import { EMAIL_VALIDATION_REGEX } from '@/constants/regex.constants';
import { RequestPostLoginAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import { FieldReactFormInterface, OnSubmitReactFormInterface, ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';
import getFormValidationSchema from '@/utils/get-form-validation-schema-line';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface LoginFormProps {
	className?: string;
}

function LoginForm({ className }: LoginFormProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router: AppRouterInstance = useRouter();

	const formFields: FieldReactFormInterface[] = [
		{ name: 'email', type: 'text', placeholder: 'Email', autoComplete: 'email', required: true },
		{ name: 'password', type: 'password', placeholder: 'Password', autoComplete: 'current-password', required: true },
	];

	const formValidationSchema: ValidationSchemaReactFormInterface = {
		...getFormValidationSchema('email', EMAIL_VALIDATION_REGEX, 'Invalid credentials.', false),
	};

	const handleOnSubmit: OnSubmitReactFormInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await submitLoginFormFeatureAction(formData as unknown as RequestPostLoginAuthApiInterface);
			router.push('/dashboard');
		} catch (err) {
			setIsLoading(false);
			throw err;
		}
	};

	return (
		<Form
			fields={formFields}
			submitLabel='SIGN IN'
			onSubmit={handleOnSubmit}
			isLoading={isLoading}
			validationSchema={formValidationSchema}
			additionalContent={
				<div className='mt-1 flex justify-end'>
					<Link href='/reset-password' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
						Forgot your password?
					</Link>
				</div>
			}
			className={className}
		/>
	);
}

export default LoginForm;
