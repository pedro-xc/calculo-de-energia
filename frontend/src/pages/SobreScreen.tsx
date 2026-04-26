interface Props {
  onBack: () => void
}

const members = [
  { name: 'Enzo Garofalo Pampana', ra: '24008914' },
  { name: 'Pedro Ximenes Costa', ra: '24000763' },
  { name: 'Yuri Cardoso Balieiro', ra: '24011525' },
]

export default function SobreScreen({ onBack }: Props) {
  return (
    <div className="sobre-body">
      <div className="about-container">
        <header className="about-header">
          <h1>Sobre a Equipe</h1>
        </header>

        <div className="card">
          <div className="section-label">Nossa Equipe</div>
          <div className="team-photo-container">
            <img src="equipe.jpg" alt="Foto da Equipe" />
          </div>
          <ul className="member-list">
            {members.map(m => (
              <li key={m.ra} className="member-item">
                <span className="member-name">{m.name}</span>
                <span className="member-ra">RA: {m.ra}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card sobre-project-card">
          <div className="section-label">O Projeto</div>
          <p>
            Site que fornece uma ferramenta intuitiva para cálculo de consumo elétrico residencial
            e simulação de economia baseada em diferentes cenários de uso.
          </p>
        </div>

        <div className="nav-footer">
          <button className="btn-primary" onClick={onBack}>Voltar</button>
        </div>
      </div>
    </div>
  )
}