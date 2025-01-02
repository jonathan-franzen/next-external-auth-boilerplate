export interface ValidationSchemaReactFormInterface {
	[key: string]: {
		validate: (value: string) => string | null;
		showError: boolean;
	};
}

export interface OnSubmitReactFormInterface {
	(formData: Record<string, string>): Promise<void>;
}

export interface FieldReactFormInterface {
	name: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	required?: boolean;
}
