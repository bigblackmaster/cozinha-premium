import type { ApiResponse, Combo, Order, OrderInput, Product } from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function request<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
      ...init,
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) return { success: false, error: json.error ?? `Erro ${res.status}` }
    return { success: true, data: (json.data ?? json) as T }
  } catch {
    return { success: false, error: 'Falha de conexão com o servidor' }
  }
}

export const getProducts = () => request<Product[]>('/products')
export const getCombos = () => request<Combo[]>('/combos')
export const createOrder = (order: OrderInput) =>
  request<Order>('/orders', { method: 'POST', body: JSON.stringify(order) })

export async function adminLogin(email: string, password: string) {
  const res = await request<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  if (res.success && res.data?.token) localStorage.setItem('admin_token', res.data.token)
  return res
}

export async function adminLogout() {
  localStorage.removeItem('admin_token')
  return request<null>('/auth/logout', { method: 'POST' })
}

export const adminGetOrders = () => request<Order[]>('/orders')
export const adminGetProducts = () => request<Product[]>('/products?all=1')
export const adminGetCombos = () => request<Combo[]>('/combos?all=1')
