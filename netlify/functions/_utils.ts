import type { HandlerEvent, HandlerResponse } from '@netlify/functions'
import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

export const COOKIE_NAME = 'admin_session'

export const json = (statusCode: number, body: unknown, headers: Record<string, string> = {}): HandlerResponse => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', ...headers },
  body: JSON.stringify(body),
})

/** Retorna o segmento da rota após o nome da função (ex.: /api/products/5 -> "5"). */
export function subPath(event: HandlerEvent, fn: string) {
  const parts = event.path.split('/').filter(Boolean)
  const idx = parts.lastIndexOf(fn)
  return idx >= 0 ? parts.slice(idx + 1).join('/') : ''
}

export function parseBody<T>(event: HandlerEvent): T {
  try { return JSON.parse(event.body || '{}') as T } catch { return {} as T }
}

export function getAdmin(event: HandlerEvent): { id: number; email: string } | null {
  const secret = process.env.JWT_SECRET
  if (!secret) return null
  const cookies = parse(event.headers.cookie || '')
  const bearer = event.headers.authorization?.replace(/^Bearer\s+/i, '')
  const token = cookies[COOKIE_NAME] || bearer
  if (!token) return null
  try { return jwt.verify(token, secret) as { id: number; email: string } } catch { return null }
}
