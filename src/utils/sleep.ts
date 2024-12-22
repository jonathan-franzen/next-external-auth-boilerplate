function sleep(ms: number): Promise<unknown> {
	return new Promise((resolve: (value: unknown) => void): NodeJS.Timeout => setTimeout(resolve, ms));
}

export default sleep;
