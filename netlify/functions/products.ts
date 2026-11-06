import type { Handler } from '@netlify/functions'
import { desc, eq } from 'drizzle-orm'
import { getDb, schema } from '../../db'
import { getAdmin, json, parseBody, subPath } from './_utils'

type ProductInput = typeof schema.products.$inferInsert

export const handler: Handler = async (event) => {
  const id = Number(subPath(event, 'products')) || null
  const t = schema.products
  try {
    const db = getDb()
    if (event.httpMethod === 'GET') {
      const all = event.queryStringParameters?.all === '1' && getAdmin(event)
      const rows = all ? await db.select().from(t).orderBy(desc(t.createdAt)) : await db.select().from(t).where(eq(t.active, true))
      return json(200, { data: rows.map((r) => ({ ...r, price: Number(r.price) })) })
    }
    if (!getAdmin(event)) return json(401, { error: 'Não autorizado' })
    const body = parseBody<ProductInput>(event)
    if (event.httpMethod === 'POST') {
      const [row] = await db.insert(t).values({ ...body, price: String(body.price) }).returning()
      return json(201, { data: row })
    }
    if (event.httpMethod === 'PUT' && id) {
      const [row] = await db.update(t).set({ ...body, ...(body.price !== undefined && { price: String(body.price) }), updatedAt: new Date() }).where(eq(t.id, id)).returning()
      return row ? json(200, { data: row }) : json(404, { error: 'Produto não encontrado' })
    }
    if (event.httpMethod === 'DELETE' && id) {
      await db.delete(t).where(eq(t.id, id))
      return json(200, { data: null })
    }
    return json(405, { error: 'Método não permitido' })
  } catch (err) {
    console.error(err)
    return json(500, { error: 'Erro interno' })
  }
}
