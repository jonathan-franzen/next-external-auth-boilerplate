import '@/app/globals.css'

import { Metadata } from 'next'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  description: 'Boilerplate for Next.js Authentication with external API',
  title: 'Next External Auth Boilerplate',
}

interface RootLayoutProps extends Readonly<{ children: ReactNode }> {}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main className="row-start-2 flex h-screen flex-col items-center justify-center gap-8">
          <Toaster position="bottom-center" />
          <div className="flex h-[600px] w-96 flex-col border border-black p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
