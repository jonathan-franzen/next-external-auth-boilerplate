import { ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';

function getFormValidationSchema(field: string, regex: RegExp, message: string, showError: boolean): ValidationSchemaReactFormInterface {
	return {
		[field]: {
			validate: (value: string): string | null => (!regex.test(value) ? message : null),
			showError: showError,
		},
	};
}

export default getFormValidationSchema;
