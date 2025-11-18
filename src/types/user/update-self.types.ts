import { z } from 'zod'

import { updateSelfValidator } from '@/validators/user/update-self.validator.js'

export type UpdateSelfRequestBody = z.infer<typeof updateSelfValidator>['body']
