import FormValidationSchemaFormReactInterface from '@/interfaces/react/form/form-validation-schema.form.react.interface';

function getFormValidationSchema(field: string, regex: RegExp, message: string, showError: boolean): FormValidationSchemaFormReactInterface {
	return {
		[field]: {
			validate: (value: string): string | null => (!regex.test(value) ? message : null),
			showError: showError,
		},
	};
}

export default getFormValidationSchema;
