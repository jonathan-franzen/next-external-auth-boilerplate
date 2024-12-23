import PrimaryButton from '@/components/common/primary-button';
import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormPropsReactInterface from '@/interfaces/react/props/form.props.react.interface';
import sleep from '@/utils/sleep';
import clsx from 'clsx';
import NextForm from 'next/form';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { XiorError as AxiosError, isXiorError as isAxiosError } from 'xior';

function Form({ fields, submitLabel, onSubmit, isLoading = false, validationSchema, additionalContent }: FormPropsReactInterface): ReactNode {
	const [formData, setFormData] = useState<Record<string, string>>({});
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
			if (isAxiosError(err)) {
				setErrorMessage((err as AxiosError).response?.data.error || 'Something went wrong.');
			} else {
				setErrorMessage('Something went wrong.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<NextForm action='/login' onSubmit={handleOnSubmit} className='flex flex-col mt-8 w-full'>
			{fields.map(
				(field: FormFieldReactInterface): ReactNode => (
					<div key={field.name} className='mt-2'>
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
								'block bg-neutral-100 opacity-80 mt-1.5 px-3 py-3 border-none rounded-lg w-full text-xs',
								'focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-gray-400',
							)}
						/>
						{formErrors[field.name] && validationSchema && validationSchema[field.name]?.showError && (
							<div className='mt-1 text-pink-900 text-xs'>{formErrors[field.name]}</div>
						)}
					</div>
				),
			)}
			{additionalContent && <div className='mt-2'>{additionalContent}</div>}
			<PrimaryButton type='submit' isLoading={isSubmitting || isLoading} className='mt-6'>
				{submitLabel}
			</PrimaryButton>
			{errorMessage && (
				<div className='flex justify-center items-center gap-3 bg-pink-50 mt-2 p-2 rounded-md'>
					<div className='text-2xs text-pink-900'>{errorMessage}</div>
				</div>
			)}
		</NextForm>
	);
}

export default Form;
