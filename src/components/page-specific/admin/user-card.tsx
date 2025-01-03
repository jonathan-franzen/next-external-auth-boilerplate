'use client';

import { deleteIdUsersApiAction, patchIdUsersApiAction } from '@/actions/api/users/users.api.actions';
import ConfirmationPopup from '@/components/common/confirmation-popup';
import Form from '@/components/common/form';
import GhostButton from '@/components/common/ghost-button';
import { EMAIL_VALIDATION_REGEX } from '@/constants/regex.constants';
import { ObjectUserUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { FieldReactFormInterface, OnSubmitReactFormInterface, ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';
import getFormValidationSchema from '@/utils/get-form-validation-schema';
import { ReactElement, startTransition, useState } from 'react';
import toast from 'react-hot-toast';

const formFields: FieldReactFormInterface[] = [
	{ name: 'email', type: 'text', placeholder: 'Email', autoComplete: 'email', required: true },
	{ name: 'firstName', type: 'firstName', placeholder: 'First name', autoComplete: 'firstName', required: true },
	{ name: 'lastName', type: 'lastName', placeholder: 'Last name', autoComplete: 'lastName', required: true },
];

const formValidationSchema: ValidationSchemaReactFormInterface = {
	...getFormValidationSchema('email', EMAIL_VALIDATION_REGEX, 'Not a valid email address.', true),
};

interface UserCardProps {
	user: ObjectUserUsersApiInterface;
}

function UserCard({ user }: UserCardProps): ReactElement {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleSave: OnSubmitReactFormInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await patchIdUsersApiAction(user.id, formData);
			toast.success('User updated successfully.');
			startTransition((): void => {
				setIsEditing(false);
				setIsLoading(false);
			});
		} catch (err) {
			setIsLoading(false);
			throw err;
		}
	};

	const handleDelete: () => Promise<void> = async (): Promise<void> => {
		setErrorMessage('');
		setIsLoading(true);
		try {
			await deleteIdUsersApiAction(user.id);
			toast.success('User deleted successfully.');
			startTransition((): void => {
				setShowDeletePopup(false);
				setIsLoading(false);
			});
		} catch (err) {
			setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
			setIsLoading(false);
		}
	};

	return (
		<div className='border-b pb-4 text-sm'>
			<p>
				<strong>{user.id}</strong>
			</p>
			{isEditing ? (
				<Form
					fields={formFields}
					submitLabel='SAVE'
					onSubmit={handleSave}
					isLoading={isLoading}
					validationSchema={formValidationSchema}
					initialFormData={{ email: user.email, firstName: user.firstName, lastName: user.lastName }}
					onCancel={(): void => {
						setIsEditing(false);
					}}
					showLabels={true}
					className='mt-1'
				/>
			) : (
				<div className='mt-2 flex flex-col gap-2'>
					<p>
						{user.firstName} {user.lastName}
					</p>
					<p>{user.email}</p>
					{user.emailVerifiedAt ? (
						<p>
							Email verified at <strong>{user.emailVerifiedAt}</strong>
						</p>
					) : (
						<p>Email not verified</p>
					)}
					<p>
						Created at <strong>{user.createdAt}</strong>
					</p>
					<p>
						Updated at <strong>{user.updatedAt}</strong>
					</p>
					<div className='mt-2 flex gap-2'>
						<GhostButton onClick={(): void => setIsEditing(true)} className='text-md inline-flex'>
							Edit
						</GhostButton>
						<GhostButton onClick={(): void => setShowDeletePopup(true)} className='text-md inline-flex'>
							Delete
						</GhostButton>
					</div>
				</div>
			)}
			{showDeletePopup && (
				<ConfirmationPopup
					onConfirm={handleDelete}
					onCancel={(): void => {
						setShowDeletePopup(false);
						setErrorMessage('');
					}}
					confirmLabel='Delete'
					cancelLabel='Cancel'
					isLoading={isLoading}
					errorMessage={errorMessage}
				>
					<p className='mb-4'>
						Are you sure you want to delete{' '}
						<strong>
							{user.firstName} {user.lastName}
						</strong>
						?
					</p>
				</ConfirmationPopup>
			)}
		</div>
	);
}

export default UserCard;
