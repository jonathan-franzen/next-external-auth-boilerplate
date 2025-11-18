import { ValidationSchemaReactFormInterface } from '@/interfaces/react/form/form.react.interfaces'

// Return a validation-schema used by form-fields to determine how to be validated when entering data,
// and before sending API requests.
function getFormValidationSchema(
  field: string,
  regex: RegExp,
  message: string,
  showError: boolean
): ValidationSchemaReactFormInterface {
  return {
    [field]: {
      showError: showError,
      validate: (value: string) => (regex.test(value) ? undefined : message),
    },
  }
}

export default getFormValidationSchema
