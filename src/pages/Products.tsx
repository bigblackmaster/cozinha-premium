import { useEffect, useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { getProducts } from '@/lib/api'
import { mockProducts } from '@/lib/mockData'
import { formatBRL, useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('Todos')
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.success && res.data && res.data.length ? res.data : mockProducts)
      setLoading(false)
    })
  }, [])

  const categories = useMemo(() => ['Todos', ...new Set(products.map((p) => p.category))], [products])
  const filtered = category === 'Todos' ? products : products.filter((p) => p.category === category)

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary-dark">Nossos produtos <Badge variant="warning">[Demonstrativo]</Badge></h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Button key={c} size="sm" variant={c === category ? 'primary' : 'ghost'} onClick={() => setCategory(c)}>{c}</Button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 bg-surface" />
                <div className="space-y-3 p-5"><div className="h-4 w-2/3 rounded bg-surface" /><div className="h-3 rounded bg-surface" /></div>
              </Card>
            ))
          : filtered.map((p) => (
              <Card key={p.id}>
                <div className="flex h-40 items-center justify-center bg-surface text-6xl">{p.imageUrl}</div>
                <div className="p-5">
                  <Badge>{p.category}</Badge>
                  <h3 className="mt-2 font-semibold">{p.name} <span className="text-xs text-muted">[Demonstrativo]</span></h3>
                  <p className="mt-1 text-sm text-muted">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{formatBRL(p.price)}</span>
                    <Button size="sm" onClick={() => addItem({ id: `p-${p.id}`, type: 'product', name: p.name, price: p.price })}>Adicionar ao carrinho</Button>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </section>
  )
}
