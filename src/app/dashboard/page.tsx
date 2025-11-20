'use server'

import Link from 'next/link'

import { Text } from '@/components-new/text'
import { LogoutForm } from '@/features/auth/logout-form'
import { getSelfFromAuthSession } from '@/lib/auth-session'
import { UserRoles } from '@/types/user/user.types'

const DashboardPage = async () => {
  const me = await getSelfFromAuthSession()

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Text as="h3" variant="heading">
          WELCOME, {me.firstName.toUpperCase()}
        </Text>
        <ul className="mt-12 flex flex-col gap-2">
          <li>
            <Text as="p" variant="body">
              Email: {me.email}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              First Name: {me.firstName}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              Last Name: {me.lastName}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              Email verified at: {me.emailVerifiedAt?.toString()}
            </Text>
          </li>
          <li>
            <Text as="p" variant="body">
              <span>Roles: </span>
              {me.roles.map((role: string, index: number): string =>
                index < me.roles.length - 1 ? `${role}, ` : role
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
          {me.roles.includes(UserRoles.ADMIN) ? (
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
