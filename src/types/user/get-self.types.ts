import { DataResponse } from '@/types/api/response.types'
import { User } from '@/types/user/user.types'

export interface GetSelfResponse extends DataResponse<User> {}
