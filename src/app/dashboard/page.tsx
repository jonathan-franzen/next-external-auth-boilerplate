'use server'

import Link from 'next/link'

import { getSelfApi } from '@/api/user/get-self.api'
import { Text } from '@/components-new/text'
import { SaveAuthSession } from '@/features/auth/components/save-auth-session'
import { LogoutForm } from '@/features/auth/forms/logout-form'
import { parseApiResponse } from '@/lib/api'
import { UserRoles } from '@/types/user.types'

const DashboardPage = async () => {
  const { res, authSession } = await getSelfApi()
  const { data } = await parseApiResponse(res)

  return (
    <>
      <SaveAuthSession authSession={authSession} />
      <div className="flex h-full flex-col justify-between">
        <div>
          <Text as="h3" variant="heading">
            WELCOME, {data.firstName.toUpperCase()}
          </Text>
          <ul className="mt-12 flex flex-col gap-2">
            <li>
              <Text as="p" variant="body">
                Email: {data.email}
              </Text>
            </li>
            <li>
              <Text as="p" variant="body">
                First Name: {data.firstName}
              </Text>
            </li>
            <li>
              <Text as="p" variant="body">
                Last Name: {data.lastName}
              </Text>
            </li>
            <li>
              <Text as="p" variant="body">
                Email verified at: {data.emailVerifiedAt?.toString()}
              </Text>
            </li>
            <li>
              <Text as="p" variant="body">
                <span>Roles: </span>
                {data.roles.map((role: string, index: number): string =>
                  index < data.roles.length - 1 ? `${role}, ` : role
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
            {data.roles.includes(UserRoles.ADMIN) ? (
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
    </>
  )
}

export default DashboardPage
