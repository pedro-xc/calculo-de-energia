import { useState } from 'react'
import ApplianceRow from '../../components/ApplianceRow'
import { fetchConsumo } from '../../services/api'
import type { Appliance, ConsumoResult } from '../../types'
import { emptyAppliance } from '../../types'

export default function TabConsumo() {
  const [appliances, setAppliances] = useState<Appliance[]>([emptyAppliance()])
  const [days, setDays] = useState(30)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ConsumoResult | null>(null)

  const update = (i: number, field: keyof Appliance, val: string) =>
    setAppliances(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: val } : a))

  const remove = (i: number) => {
    if (appliances.length > 1) setAppliances(prev => prev.filter((_, idx) => idx !== i))
  }

  const calcular = async () => {
    setError(''); setResult(null); setLoading(true)
    try {
      const data = await fetchConsumo(appliances, days)
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
        <div className="section-label">Aparelhos</div>
        {appliances.map((a, i) => (
          <ApplianceRow key={i} appliance={a} index={i} showLabels={i === 0} onUpdate={update} onRemove={remove} />
        ))}
        <button className="btn-add" onClick={() => setAppliances(prev => [...prev, emptyAppliance()])}>
          + Adicionar aparelho
        </button>
      </div>

      <div className="card">
        <div className="field" style={{ maxWidth: 120 }}>
          <label>Dias no mês</label>
          <input type="number" value={days} min={1} max={31} onChange={e => setDays(Number(e.target.value))} />
        </div>
      </div>

      <button className="btn-primary" onClick={calcular}>Calcular consumo</button>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Calculando...</div>}

      {result && (
        <>
          <div className="metric-grid">
            <div className="metric">
              <div className="metric-label">Total mensal</div>
              <div className="metric-value">{result.totalKwh.toFixed(1)} <span className="metric-unit">kWh</span></div>
            </div>
            <div className="metric">
              <div className="metric-label">Aparelhos</div>
              <div className="metric-value">{result.items.length}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Dias</div>
              <div className="metric-value">{days}</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '1rem' }}>
            <div className="section-label">Detalhamento por aparelho</div>
            {result.items.map((item, i) => {
              const pct = result.totalKwh > 0 ? Math.round((item.kwhMes / result.totalKwh) * 100) : 0
              return (
                <div className="result-item" key={i}>
                  <div>
                    <div className="result-name">{item.name}</div>
                    <div className="result-sub">{item.watts}W · {item.hoursPerDay}h/dia</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div>{item.kwhMes.toFixed(1)} kWh</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="result-sub">{pct}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}