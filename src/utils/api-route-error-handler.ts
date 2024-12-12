import logger from '@/utils/logger';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export default function apiRouteErrorHandler(err: unknown, responseMessage: string): NextResponse {
	let status: number = 500;
	let errorMessage: string = 'Something went wrong.';

	if (err instanceof AxiosError) {
		status = err.status || status;
		errorMessage = err.response?.data.error || errorMessage;
	} else {
		if (err && typeof err === 'object' && 'message' in err) {
			errorMessage = err.message as string;
		} else {
			errorMessage = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
		}
	}

	logger.error({
		message: responseMessage,
		context: {
			status,
			error: errorMessage,
		},
	});

	return NextResponse.json({ error: errorMessage }, { status });
}
