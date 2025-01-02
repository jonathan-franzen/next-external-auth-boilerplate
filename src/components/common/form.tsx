import PrimaryButton from '@/components/common/primary-button';
import SecondaryButton from '@/components/common/secondary-button';
import { FieldReactFormInterface, OnSubmitReactFormInterface, ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';
import sleep from '@/utils/sleep';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import NextForm from 'next/form';
import { ChangeEvent, FormEvent, ReactElement, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormProps {
	fields: FieldReactFormInterface[];
	submitLabel: string;
	onSubmit: OnSubmitReactFormInterface;
	isLoading?: boolean;
	validationSchema?: ValidationSchemaReactFormInterface;
	additionalContent?: ReactElement;
	onCancel?: () => Promise<void> | void;
	initialFormData?: Record<string, string> | (() => Record<string, string>);
	showLabels?: boolean;
	className?: string;
}

function Form({
	fields,
	submitLabel,
	onSubmit,
	isLoading = false,
	validationSchema,
	additionalContent,
	onCancel,
	initialFormData,
	showLabels = false,
	className,
}: FormProps): ReactNode {
	const [formData, setFormData] = useState<Record<string, string>>(initialFormData || {});
	const [formErrors, setFormErrors] = useState<Record<string, string | null>>({});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const validateField: (fieldName: string, value: string) => string | null = (fieldName: string, value: string): string | null => {
		return (validationSchema && validationSchema[fieldName]?.validate(value)) || null;
	};

	const handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prev: Record<string, string>): { [x: string]: string } => ({ ...prev, [name]: value }));
		if (value.length === 0) {
			setFormErrors((prev: Record<string, string | null>): { [x: string]: string | null } => ({ ...prev, [name]: null }));
		} else if (validationSchema && validationSchema[name]?.showError) {
			const error: string | null = validateField(name, value);
			setFormErrors((prev: Record<string, string | null>): { [x: string]: string | null } => ({ ...prev, [name]: error }));
		}
	};

	const handleOnSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setErrorMessage(null);
		setIsSubmitting(true);

		const newErrors: Record<string, string | null> = {};

		for (const field of fields) {
			const value: string = formData[field.name] || '';
			newErrors[field.name] = validateField(field.name, value);
		}

		setFormErrors(newErrors);

		const errorMessage: string | undefined = Object.values(newErrors).find((error: string | null): error is string => error !== null);

		if (errorMessage) {
			await sleep(100 + Math.random() * 100);
			setErrorMessage(errorMessage);
			setIsSubmitting(false);
			return;
		}

		try {
			await onSubmit(formData);
		} catch (err) {
			if (err instanceof AxiosError) {
				setErrorMessage(err.response?.data.error || err.message || 'Something went wrong.');
			} else if (err instanceof Error) {
				setErrorMessage(err.message);
			} else {
				setErrorMessage('Something went wrong.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<NextForm action='/login' onSubmit={handleOnSubmit} className={twMerge('flex w-full flex-col', className)}>
			{fields.map(
				(field: FieldReactFormInterface): ReactNode => (
					<div key={field.name} className='mt-2'>
						{showLabels && (
							<label htmlFor={field.name} className='block text-xs'>
								{field.placeholder}
							</label>
						)}
						<input
							id={field.name}
							name={field.name}
							type={field.type}
							placeholder={field.placeholder}
							autoComplete={field.autoComplete}
							required={field.required}
							value={formData[field.name] || ''}
							onChange={handleOnChange}
							className={clsx(
								'block w-full rounded-lg border-none bg-neutral-100 px-3 py-3 text-xs opacity-80',
								'focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-gray-400',
								!showLabels ? 'mt-1.5' : 'mt-0.5',
							)}
						/>
						{formErrors[field.name] && validationSchema && validationSchema[field.name]?.showError && (
							<div className='mt-1 text-xs text-pink-900'>{formErrors[field.name]}</div>
						)}
					</div>
				),
			)}
			{additionalContent && <div className='mt-2'>{additionalContent}</div>}
			<div className='mt-6 flex gap-6'>
				<PrimaryButton type='submit' isLoading={isSubmitting || isLoading} className='w-full'>
					{submitLabel}
				</PrimaryButton>
				{onCancel && (
					<SecondaryButton onClick={onCancel} className='w-full'>
						CANCEL
					</SecondaryButton>
				)}
			</div>
			{errorMessage && (
				<div className='mt-2 flex items-center justify-center gap-3 rounded-md bg-pink-50 p-2'>
					<div className='text-2xs text-pink-900'>{errorMessage}</div>
				</div>
			)}
		</NextForm>
	);
}

export default Form;
