import { axiosInternalInstance } from '@/config/axios.config';
import InternalApiService from '@/services/internal-api/internal-api.service';

const internalApiService = new InternalApiService(axiosInternalInstance);

export default internalApiService;
