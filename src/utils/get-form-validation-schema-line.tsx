import FormValidationSchemaFormReactInterface from '@/interfaces/react/form/form-validation-schema.form.react.interface';

export default function getFormValidationSchema(field: string, regex: RegExp, message: string, showError: boolean): FormValidationSchemaFormReactInterface {
	return {
		[field]: {
			validate: (value: string): string | null => (!regex.test(value) ? message : null),
			showError: showError,
		},
	};
}
