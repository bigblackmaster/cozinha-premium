import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl">🍽️</p>
      <h1 className="mt-4 text-3xl font-bold text-primary-dark">Página não encontrada</h1>
      <p className="mt-2 text-muted">Parece que esse prato não está no cardápio.</p>
      <Link to="/" className="mt-6 inline-block"><Button>Voltar ao início</Button></Link>
    </section>
  )
}
