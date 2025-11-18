export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: UserRoles[]
  emailVerifiedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
