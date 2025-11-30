import { z } from 'zod'

import { OrderDirection } from '@/packages/shared/types/common.types'

export const orderValidator = z.enum(OrderDirection).optional()

export const paginationValidator = z.object({
  // Zero-based page index
  page: z.number().int().min(0),

  // Number of items per page
  pageSize: z.number().int().positive(),
})

export const passwordValidator = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must include at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
  .regex(/\d/, 'Password must include at least one number')
  .max(128, 'Password must be at most 128 characters')
