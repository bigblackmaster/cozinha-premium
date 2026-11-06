import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const Home = lazy(() => import('@/pages/Home'))
const Products = lazy(() => import('@/pages/Products'))
const Combos = lazy(() => import('@/pages/Combos'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Login = lazy(() => import('@/pages/admin/Login'))

export function isAuthenticated() {
  return Boolean(localStorage.getItem('admin_token')) || document.cookie.includes('admin_session=')
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function AdminPanel() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold text-primary-dark">Painel administrativo</h1>
      <p className="mt-2 text-muted">Em construção — gestão de produtos, combos e pedidos.</p>
    </section>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-16 text-center text-muted">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/combos" element={<Combos />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
