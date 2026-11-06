import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { getCombos } from '@/lib/api'
import { mockCombos } from '@/lib/mockData'
import { formatBRL, useCartStore } from '@/store/cartStore'
import type { Combo } from '@/types'

export default function Combos() {
  const [combos, setCombos] = useState<Combo[]>([])
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    getCombos().then((res) => setCombos(res.success && res.data && res.data.length ? res.data : mockCombos))
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary-dark">Combos <Badge variant="warning">[Demonstrativo]</Badge></h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {combos.map((c) => (
          <Card key={c.id} className="flex flex-col p-6">
            <div className="text-5xl">{c.imageUrl}</div>
            <h3 className="mt-3 text-lg font-semibold">{c.name} <span className="text-xs text-muted">[Demonstrativo]</span></h3>
            <p className="text-sm text-muted">{c.description}</p>
            <p className="mt-4 text-sm font-semibold">O que inclui:</p>
            <ul className="mt-1 flex-1 space-y-1 text-sm">
              {c.items.map((i) => <li key={i.name}>• {i.quantity}x {i.name}</li>)}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xl font-bold text-primary">{formatBRL(c.price)}</span>
              <Button size="sm" onClick={() => addItem({ id: `c-${c.id}`, type: 'combo', name: c.name, price: c.price })}>Adicionar</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
