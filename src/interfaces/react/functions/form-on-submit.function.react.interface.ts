export default interface FormOnSubmitFunctionReactInterface {
	(formData: Record<string, any>): Promise<void>;
}
