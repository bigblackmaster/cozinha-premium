import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer className="mt-16 bg-primary-dark text-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold">{siteConfig.logo.startsWith('/') ? '' : siteConfig.logo} {siteConfig.name}</p>
          <p className="mt-2 text-primary-light">{siteConfig.description}</p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Links úteis</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/produtos" className="hover:text-primary-light">Produtos</Link></li>
            <li><Link to="/combos" className="hover:text-primary-light">Combos</Link></li>
            <li><a href="#como-funciona" className="hover:text-primary-light">Como funciona</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold">Redes sociais</p>
          <div className="flex gap-4 text-sm">
            <a href={siteConfig.social.instagram} className="hover:text-primary-light">Instagram</a>
            <a href={siteConfig.social.facebook} className="hover:text-primary-light">Facebook</a>
            <a href={siteConfig.social.whatsapp} className="hover:text-primary-light">WhatsApp</a>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-sm text-primary-light">
        © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
      </p>
    </footer>
  )
}
