import type { ReactNode } from 'react'

type Variant = 'default' | 'success' | 'warning' | 'danger'
const styles: Record<Variant, string> = {
  default: 'bg-surface text-primary-dark',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
}

export default function Badge({ variant = 'default', className = '', children }: { variant?: Variant; className?: string; children: ReactNode }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[variant]} ${className}`}>{children}</span>
}
