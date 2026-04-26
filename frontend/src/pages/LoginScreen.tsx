import { useState } from 'react'

interface Props {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: Props) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const verificar = () => {
    if (user === 'admin' && pass === '1234') {
      onLogin()
    } else {
      setError(true)
    }
  }

  return (
    <div className="login-body">
      <div className="login-container">
        <header className="login-header">
          <h2 style={{ fontSize: '3rem' }}>Bem‑vindo!</h2>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Calculadora de Energia</h1>
        </header>

        <div className="card login-card">
          {error && (
            <div className="login-error">Usuário ou senha incorretos.</div>
          )}

          <div className="form-group">
            <label>Usuário</label>
            <input type="text" placeholder="Ex: admin" value={user}
              onChange={e => { setUser(e.target.value); setError(false) }}
              onKeyDown={e => e.key === 'Enter' && verificar()} />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="Ex: 1234" value={pass}
              onChange={e => { setPass(e.target.value); setError(false) }}
              onKeyDown={e => e.key === 'Enter' && verificar()} />
          </div>

          <button className="btn-primary" onClick={verificar}>Entrar</button>
        </div>
      </div>
    </div>
  )
}