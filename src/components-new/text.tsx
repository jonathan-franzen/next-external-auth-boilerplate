import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

import { cn } from '@/utils/cn'

export const textVariants = cva('', {
  variants: {
    variant: {
      heading: 'text-sm font-semibold',
      body: 'text-xs font-normal',
    },
    color: {
      darkGray: 'text-gray-700',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'darkGray',
  },
})

interface BaseTextProps {
  as?: ElementType
  children?: ReactNode
  className?: string
}

type TextProps<T extends ElementType> = BaseTextProps &
  VariantProps<typeof textVariants> &
  ComponentPropsWithRef<T>

export const Text = <T extends ElementType = 'span'>({
  as,
  children,
  className,
  variant,
  color,
  ...props
}: TextProps<T>) => {
  const Component = as ?? 'span'
  return (
    <Component
      className={cn(textVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}
