import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { adminLogin } from '@/lib/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await adminLogin(email, password)
    setLoading(false)
    if (res.success) navigate('/admin')
    else setError(res.error ?? 'Não foi possível entrar')
  }

  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-primary-dark">Área administrativa</h1>
        <p className="mt-1 text-sm text-muted">Entre com suas credenciais.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input label="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} icon="✉️" />
          <Input label="Senha" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} icon="🔒" error={error} />
          <Button type="submit" loading={loading} className="w-full">Entrar</Button>
        </form>
      </Card>
    </section>
  )
}
