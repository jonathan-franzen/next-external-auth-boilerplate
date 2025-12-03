'use server'

import Link from 'next/link'

import { Text } from '@/components/text'
import { LogoutForm } from '@/features/auth/forms/logout-form'
import { getSelfFromAuthSession } from '@/lib/auth-session'
import { UserRoles } from '@/packages/shared/types/user.types'

const DashboardPage = async () => {
  const self = await getSelfFromAuthSession()

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <ul className="mt-12 flex flex-col gap-2">
          <li>
            <Text as="p" variant="body">
              Email: {self.email}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              First Name: {self.firstName}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              Last Name: {self.lastName}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              Email verified at: {self.emailVerifiedAt?.toString()}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              <span>Roles: </span>
              {self.roles.map((role: string, index: number): string =>
                index < self.roles.length - 1 ? `${role}, ` : role
              )}
            </Text>
          </li>
        </ul>
        <div className="mt-6 flex justify-center">
          <Link href="/dashboard/reset-password">Change password here</Link>
        </div>
      </div>
      <div>
        <LogoutForm />
        <div className="mt-2 flex justify-center">
          {self.roles.includes(UserRoles.ADMIN) ? (
            <Link href="/admin">View admin page</Link>
          ) : (
            <div className="mt-2 flex flex-col items-center justify-center gap-2">
              <Text as="p" variant="body">
                This user is no admin. See what happens when you
              </Text>
              <Link href="/admin">View admin page</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
