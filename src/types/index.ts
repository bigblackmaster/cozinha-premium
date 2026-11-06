export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  imageUrl?: string | null
  category: string
  active: boolean
}

export interface ComboItem { productId?: number; name: string; quantity: number }

export interface Combo {
  id: number
  name: string
  slug: string
  description: string
  price: number
  imageUrl?: string | null
  items: ComboItem[]
  active: boolean
}

export interface CartItem {
  id: string
  type: 'product' | 'combo'
  name: string
  price: number
  quantity: number
  imageUrl?: string | null
}

export interface OrderInput {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  items: CartItem[]
}

export interface Order extends OrderInput {
  id: number
  subtotal: number
  shipping: number
  total: number
  status: string
  createdAt: string
}

export interface SiteSettings { [key: string]: string }

export interface ApiResponse<T> { success: boolean; data?: T; error?: string }
