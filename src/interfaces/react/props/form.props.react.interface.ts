import FormFieldReactInterface from '@/interfaces/react/form-field.react.interface';
import FormValidationSchemaFormReactInterface from '@/interfaces/react/form/form-validation-schema.form.react.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import { ReactElement } from 'react';

export default interface FormPropsReactInterface {
	fields: FormFieldReactInterface[];
	submitLabel: string;
	onSubmit: FormOnSubmitFunctionReactInterface;
	isLoading?: boolean;
	validationSchema?: FormValidationSchemaFormReactInterface;
	additionalContent?: ReactElement;
}
