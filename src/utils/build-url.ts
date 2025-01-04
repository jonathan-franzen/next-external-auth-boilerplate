// Build URL by providing Base, path and query-params.
function buildUrl(baseUrl: string, path: string, params?: Record<string, string>): string {
	const url = new URL(`${baseUrl}${path}`);
	if (params) {
		Object.entries(params).forEach(([key, value]: [string, string]): void => url.searchParams.append(key, value));
	}
	return url.toString();
}

export default buildUrl;
