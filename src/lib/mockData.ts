import type { Combo, Product } from '@/types'

export const mockProducts: Product[] = [
  { id: 1, name: 'Lasanha à bolonhesa', slug: 'lasanha', description: 'Massa fresca, molho de tomate caseiro e queijo gratinado.', price: 42.9, category: 'Massas', active: true, imageUrl: '🍝' },
  { id: 2, name: 'Feijoada completa', slug: 'feijoada', description: 'Feijão preto com carnes selecionadas, arroz, couve e farofa.', price: 49.9, category: 'Pratos', active: true, imageUrl: '🍲' },
  { id: 3, name: 'Frango assado com batatas', slug: 'frango', description: 'Frango temperado com ervas e batatas rústicas.', price: 38.5, category: 'Pratos', active: true, imageUrl: '🍗' },
  { id: 4, name: 'Escondidinho de carne seca', slug: 'escondidinho', description: 'Purê de mandioca cremoso com carne seca desfiada.', price: 36.9, category: 'Pratos', active: true, imageUrl: '🥘' },
  { id: 5, name: 'Bolo de cenoura com chocolate', slug: 'bolo-cenoura', description: 'Fofinho, com cobertura generosa de chocolate.', price: 29.9, category: 'Sobremesas', active: true, imageUrl: '🍰' },
  { id: 6, name: 'Pudim de leite', slug: 'pudim', description: 'Receita de vó, com calda de caramelo.', price: 24.9, category: 'Sobremesas', active: true, imageUrl: '🍮' },
]

export const mockCombos: Combo[] = [
  { id: 1, name: 'Combo Família', slug: 'familia', description: 'Ideal para 4 pessoas.', price: 129.9, active: true, imageUrl: '👨‍👩‍👧‍👦',
    items: [{ name: 'Lasanha à bolonhesa', quantity: 2 }, { name: 'Frango assado com batatas', quantity: 1 }, { name: 'Pudim de leite', quantity: 1 }] },
  { id: 2, name: 'Combo Semana', slug: 'semana', description: '5 marmitas variadas para a semana.', price: 169.9, active: true, imageUrl: '📦',
    items: [{ name: 'Feijoada completa', quantity: 2 }, { name: 'Escondidinho de carne seca', quantity: 2 }, { name: 'Frango assado com batatas', quantity: 1 }] },
  { id: 3, name: 'Combo Doce Lar', slug: 'doce-lar', description: 'Sobremesas para adoçar o fim de semana.', price: 49.9, active: true, imageUrl: '🍬',
    items: [{ name: 'Bolo de cenoura com chocolate', quantity: 1 }, { name: 'Pudim de leite', quantity: 1 }] },
]
