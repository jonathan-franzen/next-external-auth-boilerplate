import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import { ReactElement } from 'react';

export default interface FormPropsReactInterface {
	fields: FormFieldReactInterface[];
	submitLabel: string;
	onSubmit: FormOnSubmitFunctionReactInterface;
	isLoading?: boolean;
	additionalContent?: ReactElement;
}
