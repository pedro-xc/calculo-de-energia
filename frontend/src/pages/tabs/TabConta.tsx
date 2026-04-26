import { useState } from 'react'
import { fetchConta } from '../../services/api'
import type { ContaResult, Flag } from '../../types'
import { FLAG_LABELS } from '../../types'

const FLAGS: Flag[] = ['verde', 'amarela', 'vermelha1', 'vermelha2']

export default function TabConta() {
  const [kwh, setKwh] = useState('')
  const [tarifa, setTarifa] = useState('')
  const [flag, setFlag] = useState<Flag>('verde')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ContaResult | null>(null)

  const calcular = async () => {
    setError(''); setResult(null)
    if (!kwh || !tarifa) { setError('Preencha kWh e tarifa.'); return }
    setLoading(true)
    try {
      const data = await fetchConta(parseFloat(kwh), parseFloat(tarifa), flag)
      setResult(data)
    } catch (e: any) {
      setError(e.message || 'Não foi possível conectar à API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '1rem' }}>
          <div className="field">
            <label>Total kWh</label>
            <input type="number" placeholder="ex: 200" min="0" value={kwh}
              onChange={e => setKwh(e.target.value)} />
          </div>
          <div className="field">
            <label>Tarifa (R$/kWh)</label>
            <input type="number" placeholder="ex: 0.75" step="0.01" min="0" value={tarifa}
              onChange={e => setTarifa(e.target.value)} />
          </div>
        </div>

        <div className="section-label">Bandeira tarifária</div>
        <div className="flag-btns">
          {FLAGS.map(f => (
            <button key={f} className={`flag-btn${flag === f ? ' ' + f : ''}`} onClick={() => setFlag(f)}>
              {FLAG_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <button className="btn-primary" onClick={calcular}>Calcular conta</button>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Calculando...</div>}

      {result && (
        <>
          <div className="metric-grid" style={{ marginTop: '1rem' }}>
            <div className="metric">
              <div className="metric-label">Subtotal</div>
              <div className="metric-value">R$ {result.subtotal.toFixed(2)}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Adicional bandeira</div>
              <div className="metric-value">R$ {result.adicionalBandeira.toFixed(2)}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Total a pagar</div>
              <div className="metric-value" style={{ color: 'var(--accent)' }}>R$ {result.total.toFixed(2)}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>
            {kwh} kWh × R${tarifa}/kWh · Bandeira {FLAG_LABELS[flag]}
          </div>
        </>
      )}
    </div>
  )
}