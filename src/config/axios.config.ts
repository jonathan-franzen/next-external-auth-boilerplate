import { BACKEND_URL, PUBLIC_FRONTEND_URL } from '@/constants/environment.constants';
import axios, { AxiosInstance } from 'axios';

export const axiosExternalInstance: AxiosInstance = axios.create({
	baseURL: BACKEND_URL,
	headers: { 'Content-Type': 'application/json' },
});

export const axiosInternalInstance: AxiosInstance = axios.create({
	baseURL: PUBLIC_FRONTEND_URL,
	headers: { 'Content-Type': 'application/json' },
});
