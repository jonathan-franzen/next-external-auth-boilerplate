import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import { ReactElement } from 'react';

export default interface FormPropsReactInterface {
	fields: FormFieldReactInterface[];
	submitLabel: string;
	onSubmit: (formData: Record<string, any>) => Promise<void>;
	isLoading?: boolean;
	additionalContent?: ReactElement;
}
