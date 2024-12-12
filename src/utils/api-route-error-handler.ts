import StatusError from '@/errors/status.error';
import logger from '@/utils/logger';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export default function apiRouteErrorHandler(err: unknown, responseMessage: string): NextResponse {
	let status: number = 500;
	let errorMessage: string = 'Something unexpected happened.';

	if (err instanceof AxiosError || err instanceof StatusError) {
		status = err.status || status;
		errorMessage = err.message || errorMessage;
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
			error: JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))),
		},
	});

	return NextResponse.json({ message: responseMessage, error: errorMessage }, { status });
}
