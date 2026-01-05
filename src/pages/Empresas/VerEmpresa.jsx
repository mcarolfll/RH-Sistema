import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { empresasAPI } from '../../services/api'
import Alert from '../../components/Alert'

function VerEmpresa() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [empresa, setEmpresa] = useState(null)
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEmpresa()
  }, [id])

  const loadEmpresa = async () => {
    try {
      const response = await empresasAPI.getById(id)
      setEmpresa(response.data)
    } catch (error) {
      navigate('/empresas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir esta empresa?')) return

    try {
      await empresasAPI.delete(id)
      navigate('/empresas?deleted=1')
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao excluir empresa' })
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

  if (!empresa) return null

  return (
    <div className="form-container">
      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <div className="detail-header">
        <h2 className="form-title">
          <i className="fas fa-building"></i> Perfil da Empresa
        </h2>
        <div className="detail-actions">
          <Link to={`/empresas/${id}/editar`} className="btn btn-primary">
            <i className="fas fa-edit"></i> Editar
          </Link>
          <Link to="/empresas" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Voltar
          </Link>
        </div>
      </div>

      <div className="detail-view">
        <div className="detail-section">
          <h3><i className="fas fa-info-circle"></i> Informações da Empresa</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Nome da Empresa</label>
              <p>{empresa.nome}</p>
            </div>
            <div className="detail-item">
              <label>CNPJ</label>
              <p>{empresa.cnpj || 'Não informado'}</p>
            </div>
            <div className="detail-item">
              <label>E-mail</label>
              <p><a href={`mailto:${empresa.email}`}>{empresa.email}</a></p>
            </div>
            <div className="detail-item">
              <label>Telefone</label>
              <p>{empresa.telefone || 'Não informado'}</p>
            </div>
            <div className="detail-item">
              <label>Data de Cadastro</label>
              <p>{formatDate(empresa.data_cadastro)}</p>
            </div>
          </div>
        </div>

        {empresa.endereco && (
          <div className="detail-section">
            <h3><i className="fas fa-map-marker-alt"></i> Endereço</h3>
            <div className="detail-text">
              {empresa.endereco.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </div>
          </div>
        )}

        {empresa.descricao && (
          <div className="detail-section">
            <h3><i className="fas fa-info-circle"></i> Descrição</h3>
            <div className="detail-text">
              {empresa.descricao.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-actions delete-section">
        <button onClick={handleDelete} className="btn btn-danger">
          <i className="fas fa-trash"></i> Excluir Empresa
        </button>
      </div>
    </div>
  )
}

export default VerEmpresa




