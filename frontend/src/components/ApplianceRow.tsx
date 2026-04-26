import type { Appliance } from '../types'

interface Props {
  appliance: Appliance
  index: number
  showLabels: boolean
  onUpdate: (i: number, field: keyof Appliance, val: string) => void
  onRemove: (i: number) => void
  small?: boolean
}

export default function ApplianceRow({ appliance, index, showLabels, onUpdate, onRemove, small = false }: Props) {
  const labelStyle = small ? { fontSize: 11 } : {}
  const inputStyle = small ? { fontSize: 12 } : {}

  return (
    <div className={small ? 'sim-appliance-row' : 'appliance-row'}>
      <div className="field">
        {showLabels && <label style={labelStyle}>Aparelho</label>}
        <input type="text" placeholder="ex: Geladeira" value={appliance.name} style={inputStyle}
          onChange={e => onUpdate(index, 'name', e.target.value)} />
      </div>
      <div className="field">
        {showLabels && <label style={labelStyle}>Watts</label>}
        <input type="number" placeholder="150" min="0" value={appliance.watts} style={inputStyle}
          onChange={e => onUpdate(index, 'watts', e.target.value)} />
      </div>
      <div className="field">
        {showLabels && <label style={labelStyle}>h/dia</label>}
        <input type="number" placeholder="24" min="0" max="24" value={appliance.hoursPerDay} style={inputStyle}
          onChange={e => onUpdate(index, 'hoursPerDay', e.target.value)} />
      </div>
      <div style={showLabels ? { marginTop: 20 } : {}}>
        <button className="btn-remove" style={small ? { width: 28, height: 28, fontSize: 13 } : {}}
          onClick={() => onRemove(index)}>×</button>
      </div>
    </div>
  )
}