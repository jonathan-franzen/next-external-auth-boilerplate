function buildUrl(baseUrl: string, path: string, params: Record<string, string>): string {
	const url = new URL(`${baseUrl}${path}`);
	Object.entries(params).forEach(([key, value]: [string, string]): void => url.searchParams.append(key, value));
	return url.toString();
}

export default buildUrl;