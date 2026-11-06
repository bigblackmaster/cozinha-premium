import type { Handler } from '@netlify/functions'
import { desc, eq } from 'drizzle-orm'
import { getDb, schema } from '../../db'
import { getAdmin, json, parseBody } from './_utils'

interface Item { name: string; price: number; quantity: number }
interface Body { customerName?: string; customerEmail?: string; customerPhone?: string; customerAddress?: string; items?: Item[] }

export const handler: Handler = async (event) => {
  try {
    const db = getDb()
    if (event.httpMethod === 'POST') {
      const b = parseBody<Body>(event)
      if (!b.customerName || !b.customerEmail || !b.customerPhone || !b.customerAddress || !b.items?.length)
        return json(400, { error: 'Dados do pedido incompletos' })
      const subtotal = b.items.reduce((s, i) => s + Number(i.price) * Number(i.quantity), 0)
      const [rule] = await db.select().from(schema.shippingRules).where(eq(schema.shippingRules.active, true)).limit(1)
      let shipping = rule ? Number(rule.price) : 0
      if (rule?.freeAbove && subtotal >= Number(rule.freeAbove)) shipping = 0
      const [row] = await db.insert(schema.orders).values({
        customerName: b.customerName, customerEmail: b.customerEmail, customerPhone: b.customerPhone, customerAddress: b.customerAddress,
        items: b.items, subtotal: subtotal.toFixed(2), shipping: shipping.toFixed(2), total: (subtotal + shipping).toFixed(2),
      }).returning()
      return json(201, { data: row })
    }
    if (event.httpMethod === 'GET') {
      if (!getAdmin(event)) return json(401, { error: 'Não autorizado' })
      return json(200, { data: await db.select().from(schema.orders).orderBy(desc(schema.orders.createdAt)) })
    }
    return json(405, { error: 'Método não permitido' })
  } catch (err) {
    console.error(err)
    return json(500, { error: 'Erro interno' })
  }
}
