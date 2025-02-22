const env = process.env;

// App
export const APP_ENV = (env.APP_ENV as string) || 'dev';

// Private
export const BACKEND_URL = env.BACKEND_URL as string;
export const IRON_SESSION_SECRET = env.IRON_SESSION_SECRET as string;
