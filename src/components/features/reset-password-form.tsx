'use client';

import { postTokenResetPasswordAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import { postMeResetPasswordUsersApiAction } from '@/actions/api/users/users.api.actions';
import Form from '@/components/common/form';
import { PASSWORD_VALIDATION_REGEX } from '@/constants/regex.constants';
import { RequestPostTokenResetPasswordAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import { RequestPostMeResetPasswordUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { FieldReactFormInterface, OnSubmitReactFormInterface, ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';
import getFormValidationSchema from '@/utils/get-form-validation-schema';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

interface ResetPasswordFormProps {
	resetPasswordToken?: string;
	className?: string;
}

function ResetPasswordForm({ resetPasswordToken, className }: ResetPasswordFormProps): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router: AppRouterInstance = useRouter();

	const formFields: FieldReactFormInterface[] = [
		...(!resetPasswordToken ? [{ name: 'password', type: 'password', placeholder: 'Current password', autoComplete: 'current-password', required: true }] : []),
		{ name: 'newPassword', type: 'password', placeholder: 'New password', autoComplete: 'new-password', required: true },
	];

	const formValidationSchema: ValidationSchemaReactFormInterface = {
		...getFormValidationSchema('newPassword', PASSWORD_VALIDATION_REGEX, 'Password too weak.', true),
	};

	const handleOnSubmit: OnSubmitReactFormInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);

		try {
			if (resetPasswordToken) {
				await postTokenResetPasswordAuthApiAction(resetPasswordToken, formData as unknown as RequestPostTokenResetPasswordAuthApiInterface);
			} else {
				await postMeResetPasswordUsersApiAction(formData as unknown as RequestPostMeResetPasswordUsersApiInterface);
			}

			toast.success('Password reset successfully.');

			resetPasswordToken ? router.push('/login') : setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			throw err;
		}
	};

	return (
		<Form
			fields={formFields}
			submitLabel='UPDATE PASSWORD'
			onSubmit={handleOnSubmit}
			isLoading={isLoading}
			validationSchema={formValidationSchema}
			className={className}
		/>
	);
}

export default ResetPasswordForm;
