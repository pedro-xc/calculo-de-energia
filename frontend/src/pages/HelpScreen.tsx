interface Props {
  onBack: () => void
}

const steps = [
  {
    num: 1,
    title: 'Cálculo de Consumo (kWh)',
    text: 'Na primeira aba, adicione os aparelhos da sua residência. Insira a Potência em Watts (W) (ex: 1500W para um ar-condicionado) e quantas horas por dia ele fica ligado. O sistema calculará automaticamente o consumo mensal em kWh.',
  },
  {
    num: 2,
    title: 'Valor da Conta (R$)',
    text: 'Na aba de conta, informe o valor da Tarifa da Distribuidora (disponível na sua conta de luz) e selecione a Bandeira Tarifária atual (Verde, Amarela ou Vermelha). O sistema aplicará as taxas extras da ANEEL automaticamente.',
  },
  {
    num: 3,
    title: 'Simulador de Economia',
    text: 'Use o simulador para comparar dois cenários. Por exemplo: "Ar-condicionado ligado por 8h" vs "Ar-condicionado ligado por 4h". O sistema mostrará qual cenário é mais barato e qual a sua economia real em Reais.',
  },
]

export default function HelpScreen({ onBack }: Props) {
  return (
    <div className="help-body">
      <div className="help-container">
        <header className="help-header">
          <h1>Como usar o Sistema</h1>
          <p>Guia rápido para cálculos de energia</p>
        </header>

        <div className="card">
          <div className="section-label">Instruções de Uso</div>
          {steps.map(s => (
            <div className="help-step" key={s.num}>
              <span className="badge-info">PASSO {s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="card help-faq-card">
          <div className="section-label">Dúvidas Frequentes</div>
          <p>
            <strong>Onde encontro a potência?</strong> Geralmente em uma etiqueta atrás do aparelho ou no manual técnico.
            <br /><br />
            <strong>O que são as bandeiras?</strong> São acréscimos aplicados à conta quando o custo de geração de energia no Brasil aumenta (ex: secas).
          </p>
        </div>

        <div className="nav-footer-help">
          <button className="btn-primary" onClick={onBack}>Voltar</button>
        </div>
      </div>
    </div>
  )
}