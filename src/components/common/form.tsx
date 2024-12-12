import PrimaryButton from '@/components/common/primary-button';
import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormPropsReactInterface from '@/interfaces/react/props/form.props.react.interface';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import NextForm from 'next/form';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';

export default function Form({ fields, submitLabel, onSubmit, isLoading = false, additionalContent }: FormPropsReactInterface): ReactNode {
	const [formData, setFormData] = useState<Record<string, string>>({});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prev: Record<string, string>): { [x: string]: string } => ({ ...prev, [name]: value }));
	};

	const handleOnSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setErrorMessage(null);

		try {
			await onSubmit(formData);
		} catch (err) {
			if (err instanceof AxiosError) {
				setErrorMessage(err.response?.data.error || 'Something went wrong.');
			} else {
				setErrorMessage('Something went wrong.');
			}
		}
	};

	return (
		<NextForm action='/login' onSubmit={handleOnSubmit} className='mt-8 flex w-full flex-col'>
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
								'mt-1.5 block w-full rounded-lg border-none bg-neutral-100 px-3 py-3 text-xs opacity-80',
								'focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-gray-400',
							)}
						/>
					</div>
				),
			)}
			{additionalContent && <div className='mt-2'>{additionalContent}</div>}
			<PrimaryButton type='submit' isLoading={isLoading} className='mt-6'>
				{submitLabel}
			</PrimaryButton>
			{errorMessage && (
				<div className='mt-2 flex items-center justify-center gap-3 rounded-md bg-pink-50 p-2'>
					<div className='text-2xs text-pink-900'>{errorMessage}</div>
				</div>
			)}
		</NextForm>
	);
}
