import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { useCartStore } from '@/store/cartStore'

const links = [
  { to: '/', label: 'Início' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/combos', label: 'Combos' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors ${isActive ? 'text-primary' : 'text-text hover:text-primary'}`

  return (
    <header className="sticky top-0 z-40 border-b border-surface bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-dark">
          {siteConfig.logo.startsWith('/') ? <img src={siteConfig.logo} alt="" className="h-8 w-8" /> : <span aria-hidden>{siteConfig.logo}</span>}
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => <NavLink key={l.to} to={l.to} end className={navClass}>{l.label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Carrinho" className="relative rounded-full p-2 hover:bg-surface">
            <span className="text-2xl">🛒</span>
            {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-xs font-bold text-white">{count}</span>}
          </button>
          <button aria-label="Abrir menu" className="rounded p-2 text-2xl md:hidden" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-surface px-4 py-4 md:hidden">
          {links.map((l) => <NavLink key={l.to} to={l.to} end className={navClass} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
        </nav>
      )}
    </header>
  )
}
