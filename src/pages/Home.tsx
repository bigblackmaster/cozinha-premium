import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { siteConfig } from '@/config/site'
import { mockCombos, mockProducts } from '@/lib/mockData'
import { formatBRL, useCartStore } from '@/store/cartStore'

const steps = [
  { icon: '🛒', title: 'Escolha', text: 'Navegue pelos pratos e combos e monte seu pedido.' },
  { icon: '👩‍🍳', title: 'Preparamos', text: 'Cozinhamos tudo fresquinho, com ingredientes selecionados.' },
  { icon: '🚚', title: 'Entregamos', text: 'Receba em casa, pronto para aquecer e servir.' },
]

export default function Home() {
  const addItem = useCartStore((s) => s.addItem)
  return (
    <>
      <section className="bg-gradient-to-br from-surface via-bg to-primary-light/40">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <Badge>[Demonstrativo]</Badge>
          <h1 className="mt-4 text-4xl font-extrabold text-primary-dark md:text-6xl">{siteConfig.description}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">Comida caseira feita com carinho, do nosso fogão direto para a sua mesa.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/produtos"><Button size="lg">Ver cardápio</Button></Link>
            <Link to="/combos"><Button size="lg" variant="outline">Conhecer combos</Button></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary-dark">Produtos em destaque <Badge variant="warning">[Demonstrativo]</Badge></h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.slice(0, 3).map((p) => (
            <Card key={p.id}>
              <div className="flex h-40 items-center justify-center bg-surface text-6xl">{p.imageUrl}</div>
              <div className="p-5">
                <h3 className="font-semibold">{p.name} <span className="text-xs text-muted">[Demonstrativo]</span></h3>
                <p className="mt-1 text-sm text-muted">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{formatBRL(p.price)}</span>
                  <Button size="sm" onClick={() => addItem({ id: `p-${p.id}`, type: 'product', name: p.name, price: p.price })}>Adicionar</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-primary-dark">Combos <Badge variant="warning">[Demonstrativo]</Badge></h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {mockCombos.map((c) => (
              <Card key={c.id} className="p-6">
                <div className="text-5xl">{c.imageUrl}</div>
                <h3 className="mt-3 font-semibold">{c.name} <span className="text-xs text-muted">[Demonstrativo]</span></h3>
                <p className="text-sm text-muted">{c.description}</p>
                <p className="mt-3 text-lg font-bold text-primary">{formatBRL(c.price)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary-dark">Como funciona</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light/50 text-3xl">{s.icon}</div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-accent px-8 py-10 text-center text-white">
          <p className="text-2xl font-bold">🚚 Frete grátis em pedidos acima de R$ 150,00</p>
          <p className="mt-1 text-sm opacity-90">[Demonstrativo] Consulte as regiões atendidas.</p>
        </div>
      </section>
    </>
  )
}
