export default interface FormOnSubmitFunctionReactInterface {
	(formData: Record<string, string>): Promise<void>;
}
