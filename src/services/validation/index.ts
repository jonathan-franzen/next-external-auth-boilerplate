import cookieService from '@/services/cookie';
import ValidationService from '@/services/validation/validation.service';

const validationService = new ValidationService(cookieService);

export default validationService;
