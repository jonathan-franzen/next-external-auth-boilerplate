'use client';

import { postResetPasswordAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import Form from '@/components/common/form';
import { EMAIL_VALIDATION_REGEX } from '@/constants/regex.constants';
import { RequestPostResetPasswordAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import { FieldReactFormInterface, OnSubmitReactFormInterface, ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';
import getFormValidationSchema from '@/utils/get-form-validation-schema';
import { ReactNode, startTransition, useState } from 'react';
import toast from 'react-hot-toast';

interface SendPasswordResetEmailFormProps {
	className?: string;
}

function SendPasswordResetEmailForm({ className }: SendPasswordResetEmailFormProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);

	const formFields: FieldReactFormInterface[] = [{ name: 'email', type: 'text', placeholder: 'Email', autoComplete: 'email', required: true }];

	// Validate the entered email-address to avoid unnecessary backend- requests.
	const formValidationSchema: ValidationSchemaReactFormInterface = {
		...getFormValidationSchema('email', EMAIL_VALIDATION_REGEX, 'Not a valid email address.', false),
	};

	const handleOnSubmit: OnSubmitReactFormInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await postResetPasswordAuthApiAction(formData as unknown as RequestPostResetPasswordAuthApiInterface);
			toast.success('Email sent successfully.');
			// Transition to make sure loading state is handled properly.
			startTransition((): void => {
				setIsLoading(false);
			});
		} catch (err) {
			setIsLoading(false);
			throw err;
		}
	};

	return (
		<Form
			fields={formFields}
			submitLabel='SEND PASSWORD RESET EMAIL'
			onSubmit={handleOnSubmit}
			isLoading={isLoading}
			validationSchema={formValidationSchema}
			className={className}
		/>
	);
}

export default SendPasswordResetEmailForm;
