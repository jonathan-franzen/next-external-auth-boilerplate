import PrimaryButton from '@/components/common/primary-button';
import SecondaryButton from '@/components/common/secondary-button';
import Icon from '@/components/icon/icon';
import { FieldReactFormInterface, OnSubmitReactFormInterface, ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';
import sleep from '@/utils/sleep';
import clsx from 'clsx';
import NextForm from 'next/form';
import { ChangeEvent, FormEvent, ReactElement, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormProps {
	additionalContent?: ReactElement;
	className?: string;
	fields: FieldReactFormInterface[];
	initialFormData?: (() => Record<string, string>) | Record<string, string>;
	isLoading?: boolean;
	onCancel?: () => Promise<void> | void;
	onSubmit: OnSubmitReactFormInterface;
	showLabels?: boolean;
	submitLabel: string;
	validationSchema?: ValidationSchemaReactFormInterface;
}

function Form({
	additionalContent,
	className,
	fields,
	initialFormData,
	isLoading = false,
	onCancel,
	onSubmit,
	showLabels = false,
	submitLabel,
	validationSchema,
}: FormProps): ReactNode {
	const [formData, setFormData] = useState<Record<string, string>>(initialFormData || {});
	const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const validateField = (fieldName: string, value: string): string | undefined => {
		if (!validationSchema) {
			return;
		}

		const schemaMap = new Map(Object.entries(validationSchema));

		if (schemaMap.has(fieldName)) {
			const fieldSchema = schemaMap.get(fieldName);
			return fieldSchema?.validate?.(value);
		}

		return;
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (value.length === 0) {
			setFormErrors((prev) => ({ ...prev, [name]: undefined }));
		} else if (validationSchema) {
			const schemaMap = new Map(Object.entries(validationSchema));
			if (schemaMap.has(name)) {
				const schema = schemaMap.get(name) as { showError?: boolean };
				if (schema?.showError) {
					const error = validateField(name, value);
					setFormErrors((prev) => ({ ...prev, [name]: error }));
				}
			}
		}
	};

	const handleOnSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setErrorMessage(undefined);
		setIsSubmitting(true);

		const newErrors: Record<string, string | undefined> = {};

		for (const field of fields) {
			const value = formData[field.name] || '';
			newErrors[field.name] = validateField(field.name, value);
		}

		setFormErrors(newErrors);

		const errorMessage = Object.values(newErrors).find((error) => error !== undefined);

		if (errorMessage) {
			await sleep(100 + Math.random() * 100);
			setErrorMessage(errorMessage);
			setIsSubmitting(false);
			return;
		}

		try {
			await onSubmit(formData);
			setFormData(initialFormData || {});
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('Something went wrong.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<NextForm action='/login' className={twMerge('flex w-full flex-col', className)} onSubmit={(e) => void handleOnSubmit(e)}>
			{fields.map(
				(field: FieldReactFormInterface): ReactNode => (
					<div className='mt-2' key={field.name}>
						{showLabels && (
							<label className='block text-xs' htmlFor={field.name}>
								{field.placeholder}
							</label>
						)}
						<input
							autoComplete={field.autoComplete}
							className={clsx(
								'block w-full rounded-lg border-none bg-neutral-100 p-3 text-xs opacity-80',
								'focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-gray-400',
								showLabels ? 'mt-0.5' : 'mt-1.5',
							)}
							id={field.name}
							name={field.name}
							onChange={handleOnChange}
							placeholder={field.placeholder}
							required={field.required}
							type={field.type}
							value={formData[field.name] || ''}
						/>
						{formErrors[field.name] && validationSchema && validationSchema[field.name]?.showError && (
							<div className='mt-1 text-xs text-pink-900'>{formErrors[field.name]}</div>
						)}
					</div>
				),
			)}
			{additionalContent && <div className='mt-2'>{additionalContent}</div>}
			<div className='mt-6 flex gap-6'>
				<PrimaryButton className='w-full' isLoading={isSubmitting || isLoading} type='submit'>
					{submitLabel}
				</PrimaryButton>
				{onCancel && (
					<SecondaryButton className='w-full' onClick={() => void onCancel()}>
						CANCEL
					</SecondaryButton>
				)}
			</div>
			{errorMessage && (
				<div className='relative mt-2 flex items-center justify-center gap-3 rounded-md bg-pink-50 p-2'>
					<p className='text-xs text-pink-900'>{errorMessage}</p>
					<button className='absolute right-4 text-pink-900' onClick={() => void setErrorMessage(undefined)}>
						<Icon fill='#831843' name='close-circle' size='16' />
					</button>
				</div>
			)}
		</NextForm>
	);
}

export default Form;
