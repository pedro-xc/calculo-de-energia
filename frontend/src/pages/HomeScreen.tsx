import { useState } from 'react'
import type { Screen, Tab } from '../types'
import TabConsumo from './tabs/TabConsumo'
import TabConta from './tabs/TabConta'
import TabSimular from './tabs/TabSimular'

interface Props {
  onLogout: () => void
  onNavigate: (s: Screen) => void
}

const TABS: { key: Tab; label: string }[] = [
  { key: 'consumo', label: 'Consumo kWh' },
  { key: 'conta', label: 'Valor da conta' },
  { key: 'simular', label: 'Simulador' },
]

export default function HomeScreen({ onLogout, onNavigate }: Props) {
  const [tab, setTab] = useState<Tab>('consumo')

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) onLogout()
  }

  return (
    <div className="container">
      <header style={{ position: 'relative' }}>
        <h1>Calculadora de energia</h1>
        <p>Calcula consumo kWh e valor da conta</p>
        <nav style={{ marginTop: 10, display: 'flex', gap: 15, justifyContent: 'center', alignItems: 'center' }}>
          <button className="btn-nav" onClick={() => onNavigate('sobre')}>Sobre a Equipe</button>
          <span style={{ color: 'var(--border)', fontWeight: 600 }}>|</span>
          <button className="btn-nav" onClick={() => onNavigate('help')}>Ajuda / Tutorial</button>
        </nav>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <button className="btn-primary" style={{ padding: '10px 25px', fontSize: 16, fontWeight: 600 }}
            onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <div className="tabs">
        {TABS.map(t => (
          <button key={t.key} className={`tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'consumo' && <TabConsumo />}
      {tab === 'conta' && <TabConta />}
      {tab === 'simular' && <TabSimular />}

      <footer>API em localhost:3001</footer>
    </div>
  )
}