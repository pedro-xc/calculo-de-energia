import { useState } from 'react'
import ApplianceRow from '../../components/ApplianceRow'
import { fetchSimular } from '../../services/api'
import type { Appliance, Flag, SimularResult } from '../../types'
import { FLAG_LABELS, emptyAppliance } from '../../types'

const FLAGS: Flag[] = ['verde', 'amarela', 'vermelha1', 'vermelha2']

export default function TabSimular() {
  const [simA, setSimA] = useState<Appliance[]>([emptyAppliance()])
  const [simB, setSimB] = useState<Appliance[]>([emptyAppliance()])
  const [tarifa, setTarifa] = useState('')
  const [bandeira, setBandeira] = useState<Flag>('verde')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SimularResult | null>(null)

  const updateSim = (setter: typeof setSimA) => (i: number, field: keyof Appliance, val: string) =>
    setter(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: val } : a))

  const removeSim = (setter: typeof setSimA, arr: Appliance[]) => (i: number) => {
    if (arr.length > 1) setter(prev => prev.filter((_, idx) => idx !== i))
  }

  const simular = async () => {
    setError(''); setResult(null)
    if (!tarifa) { setError('Informe a tarifa.'); return }
    setLoading(true)
    try {
      const data = await fetchSimular(simA, simB, parseFloat(tarifa), bandeira)
      setResult(data)
    } catch (e: any) {
      setError(e.message || 'Não foi possível conectar à API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="sim-grid">
        <div>
          <div className="sim-col-header">Cenário A</div>
          {simA.map((a, i) => (
            <ApplianceRow key={i} appliance={a} index={i} showLabels={i === 0}
              onUpdate={updateSim(setSimA)} onRemove={removeSim(setSimA, simA)} small />
          ))}
          <button className="btn-add" onClick={() => setSimA(prev => [...prev, emptyAppliance()])}>+ Adicionar</button>
        </div>
        <div>
          <div className="sim-col-header">Cenário B</div>
          {simB.map((a, i) => (
            <ApplianceRow key={i} appliance={a} index={i} showLabels={i === 0}
              onUpdate={updateSim(setSimB)} onRemove={removeSim(setSimB, simB)} small />
          ))}
          <button className="btn-add" onClick={() => setSimB(prev => [...prev, emptyAppliance()])}>+ Adicionar</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field">
            <label>Tarifa (R$/kWh)</label>
            <input type="number" placeholder="ex: 0.75" step="0.01" min="0" value={tarifa}
              onChange={e => setTarifa(e.target.value)} />
          </div>
          <div className="field">
            <label>Bandeira</label>
            <select value={bandeira} onChange={e => setBandeira(e.target.value as Flag)}>
              {FLAGS.map(f => <option key={f} value={f}>{FLAG_LABELS[f]}</option>)}
            </select>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={simular}>Simular e comparar</button>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Calculando...</div>}

      {result && (
        <>
          <div className="winner-banner">
            Cenário {result.cenarioMaisEconomico} é mais econômico · Economia de R$ {Math.abs(result.economiaReais).toFixed(2)}/mês
          </div>
          <div className="sim-grid">
            {(['A', 'B'] as const).map(c => {
              const data = c === 'A' ? result.cenarioA : result.cenarioB
              return (
                <div className="card" key={c}>
                  <div className="sim-col-header">
                    Cenário {c} {result.cenarioMaisEconomico === c && <span className="badge">mais econômico</span>}
                  </div>
                  <div className="result-item">
                    <span style={{ color: 'var(--text2)' }}>Consumo</span>
                    <span>{data.totalKwh.toFixed(1)} kWh</span>
                  </div>
                  <div className="result-item">
                    <span style={{ color: 'var(--text2)' }}>Total</span>
                    <span style={{ fontWeight: 500 }}>R$ {data.conta.total.toFixed(2)}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="metric-grid" style={{ marginTop: '1rem' }}>
            <div className="metric">
              <div className="metric-label">Diferença kWh</div>
              <div className="metric-value">{Math.abs(result.diffKwh).toFixed(1)} <span className="metric-unit">kWh</span></div>
            </div>
            <div className="metric">
              <div className="metric-label">Economia mensal</div>
              <div className="metric-value" style={{ color: 'var(--success)' }}>R$ {Math.abs(result.economiaReais).toFixed(2)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}