'use server'

import Link from 'next/link'
import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <h1 className="text-center text-sm font-semibold text-gray-700">
        PROTECTED ADMIN PAGE
      </h1>
      {children}
      <Link className="mt-2 flex justify-center" href="/dashboard">
        Back to dashboard
      </Link>
    </div>
  )
}

export default AdminLayout
