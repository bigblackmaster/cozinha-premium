import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

export default function Input({ label, error, icon, className = '', id, ...rest }: Props) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={inputId} className="text-sm font-medium">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</span>}
        <input
          id={inputId}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-light ${icon ? 'pl-10' : ''} ${error ? 'border-red-400' : 'border-surface'} ${className}`}
          {...rest}
        />
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}
