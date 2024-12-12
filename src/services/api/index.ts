import { axiosExternalInstance } from '@/config/axios.config';
import ApiService from '@/services/api/api.service';
import cookieService from '@/services/cookie';

const apiService = new ApiService(axiosExternalInstance, cookieService);

export default apiService;
