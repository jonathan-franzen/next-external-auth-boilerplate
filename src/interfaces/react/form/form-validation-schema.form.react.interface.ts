interface FormValidationSchemaFormReactInterface {
	[key: string]: {
		validate: (value: string) => string | null;
		showError: boolean;
	};
}

export default FormValidationSchemaFormReactInterface;
