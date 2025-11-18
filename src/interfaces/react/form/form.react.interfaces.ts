export interface FieldReactFormInterface {
  autoComplete?: string
  name: string
  placeholder?: string
  required?: boolean
  type: string
}

export interface OnSubmitReactFormInterface {
  (formData: Record<string, string>): Promise<void>
}

export interface ValidationSchemaReactFormInterface {
  [key: string]: {
    showError: boolean
    validate: (value: string) => string | undefined
  }
}
