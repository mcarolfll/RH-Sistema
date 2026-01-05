import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { candidatosAPI } from '../../services/api'
import { maskPhone } from '../../utils/masks'
import Alert from '../../components/Alert'

function CadastrarCandidato() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    experiencia: '',
    habilidades: ''
  })
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'telefone') {
      setFormData({ ...formData, [name]: maskPhone(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await candidatosAPI.create(formData)
      navigate('/candidatos?success=1')
    } catch (error) {
      if (error.response?.data?.error === 'email_existe') {
        setAlert({ type: 'error', message: 'Este e-mail já está cadastrado. Por favor, use outro e-mail.' })
      } else {
        setAlert({ type: 'error', message: error.response?.data?.message || 'Erro ao cadastrar candidato' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">
        <i className="fas fa-user-plus"></i> Cadastrar Candidato
      </h2>
      <p className="form-subtitle">Preencha os dados do candidato abaixo</p>

      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nome">
              <i className="fas fa-user"></i> Nome Completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> E-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">
              <i className="fas fa-phone"></i> Telefone
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cargo">
              <i className="fas fa-briefcase"></i> Cargo Desejado *
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="experiencia">
              <i className="fas fa-file-alt"></i> Experiência Profissional
            </label>
            <textarea
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              placeholder="Descreva a experiência profissional do candidato..."
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label htmlFor="habilidades">
              <i className="fas fa-star"></i> Habilidades
            </label>
            <textarea
              id="habilidades"
              name="habilidades"
              value={formData.habilidades}
              onChange={handleChange}
              placeholder="Liste as principais habilidades e competências..."
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <i className="fas fa-save"></i> {loading ? 'Salvando...' : 'Salvar Candidato'}
          </button>
          <Link to="/candidatos" className="btn btn-secondary">
            <i className="fas fa-list"></i> Ver Lista
          </Link>
        </div>
      </form>
    </div>
  )
}

export default CadastrarCandidato

