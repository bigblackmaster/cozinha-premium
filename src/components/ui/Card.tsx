import type { HTMLAttributes } from 'react'

export default function Card({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-surface bg-white shadow-sm transition-shadow hover:shadow-md ${className}`} {...rest}>
      {children}
    </div>
  )
}
