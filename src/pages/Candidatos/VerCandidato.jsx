import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { candidatosAPI } from '../../services/api'
import Alert from '../../components/Alert'

function VerCandidato() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidato, setCandidato] = useState(null)
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCandidato()
  }, [id])

  const loadCandidato = async () => {
    try {
      const response = await candidatosAPI.getById(id)
      setCandidato(response.data)
    } catch (error) {
      navigate('/candidatos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este candidato?')) return

    try {
      await candidatosAPI.delete(id)
      navigate('/candidatos?deleted=1')
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao excluir candidato' })
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="loading-state">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    )
  }

  if (!candidato) return null

  return (
    <div className="form-container">
      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <div className="detail-header">
        <h2 className="form-title">
          <i className="fas fa-user"></i> Perfil do Candidato
        </h2>
        <div className="detail-actions">
          <Link to={`/candidatos/${id}/editar`} className="btn btn-primary">
            <i className="fas fa-edit"></i> Editar
          </Link>
          <Link to="/candidatos" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Voltar
          </Link>
        </div>
      </div>

      <div className="detail-view">
        <div className="detail-section">
          <h3><i className="fas fa-info-circle"></i> Informações Pessoais</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Nome Completo</label>
              <p>{candidato.nome}</p>
            </div>
            <div className="detail-item">
              <label>E-mail</label>
              <p><a href={`mailto:${candidato.email}`}>{candidato.email}</a></p>
            </div>
            <div className="detail-item">
              <label>Telefone</label>
              <p>{candidato.telefone || 'Não informado'}</p>
            </div>
            <div className="detail-item">
              <label>Cargo Desejado</label>
              <p>{candidato.cargo}</p>
            </div>
            <div className="detail-item">
              <label>Data de Cadastro</label>
              <p>{formatDate(candidato.data_cadastro)}</p>
            </div>
          </div>
        </div>

        {candidato.experiencia && (
          <div className="detail-section">
            <h3><i className="fas fa-briefcase"></i> Experiência Profissional</h3>
            <div className="detail-text">
              {candidato.experiencia.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </div>
          </div>
        )}

        {candidato.habilidades && (
          <div className="detail-section">
            <h3><i className="fas fa-star"></i> Habilidades e Competências</h3>
            <div className="detail-text">
              {candidato.habilidades.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-actions delete-section">
        <button onClick={handleDelete} className="btn btn-danger">
          <i className="fas fa-trash"></i> Excluir Candidato
        </button>
      </div>
    </div>
  )
}

export default VerCandidato




