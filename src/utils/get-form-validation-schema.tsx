import { ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces';

// Return a validation-schema used by form-fields to determine how to be validated when entering data,
// and before sending API requests.
function getFormValidationSchema(field: string, regex: RegExp, message: string, showError: boolean): ValidationSchemaReactFormInterface {
	return {
		[field]: {
			validate: (value: string): string | null => (!regex.test(value) ? message : null),
			showError: showError,
		},
	};
}

export default getFormValidationSchema;
