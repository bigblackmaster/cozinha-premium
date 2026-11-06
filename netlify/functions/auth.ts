import type { Handler } from '@netlify/functions'
import bcrypt from 'bcryptjs'
import jwt, { type SignOptions } from 'jsonwebtoken'
import { serialize } from 'cookie'
import { eq } from 'drizzle-orm'
import { getDb, schema } from '../../db'
import { COOKIE_NAME, getAdmin, json, parseBody, subPath } from './_utils'

export const handler: Handler = async (event) => {
  const route = subPath(event, 'auth')
  try {
    if (event.httpMethod === 'POST' && route === 'login') {
      const { email, password } = parseBody<{ email?: string; password?: string }>(event)
      if (!email || !password) return json(400, { error: 'E-mail e senha são obrigatórios' })
      const [admin] = await getDb().select().from(schema.admins).where(eq(schema.admins.email, email)).limit(1)
      if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) return json(401, { error: 'Credenciais inválidas' })
      const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET!, {
        expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
      })
      const cookie = serialize(COOKIE_NAME, token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7 })
      return json(200, { data: { token, name: admin.name } }, { 'Set-Cookie': cookie })
    }
    if (event.httpMethod === 'POST' && route === 'logout') {
      const cookie = serialize(COOKIE_NAME, '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 })
      return json(200, { data: null }, { 'Set-Cookie': cookie })
    }
    if (event.httpMethod === 'GET' && route === 'me') {
      const admin = getAdmin(event)
      return admin ? json(200, { data: admin }) : json(401, { error: 'Não autenticado' })
    }
    return json(404, { error: 'Rota não encontrada' })
  } catch (err) {
    console.error(err)
    return json(500, { error: 'Erro interno' })
  }
}
