const env: NodeJS.ProcessEnv = process.env;

// App
export const APP_ENV: string = (env.APP_ENV as string) || 'dev';

// Private
export const BACKEND_URL = env.BACKEND_URL as string;
export const IRON_SESSION_SECRET = env.IRON_SESSION_SECRET as string;
