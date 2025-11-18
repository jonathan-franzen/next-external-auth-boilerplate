import { UrlObject } from 'node:url'

import Link from 'next/link'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import GhostButton from '@/components/common/ghost-button'

interface GhostLinkPropsReactInterface {
  children: ReactNode
  className?: string
  href: string | UrlObject
}

function GhostLink({
  children,
  className,
  href,
}: GhostLinkPropsReactInterface): ReactNode {
  return (
    <Link className={twMerge('inline-flex', className)} href={href}>
      <GhostButton>{children}</GhostButton>
    </Link>
  )
}

export default GhostLink
