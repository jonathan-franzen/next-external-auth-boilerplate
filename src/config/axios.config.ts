import { BACKEND_URL, PUBLIC_FRONTEND_URL } from '@/constants/environment.constants';
import axios, { XiorInstance as AxiosInstance } from 'xior';

export const axiosExternalInstance: AxiosInstance = axios.create({
	baseURL: BACKEND_URL,
});

export const axiosInternalInstance: AxiosInstance = axios.create({
	baseURL: PUBLIC_FRONTEND_URL,
});
