import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { candidatosAPI } from '../../services/api'
import SearchBar from '../../components/SearchBar'
import EmptyState from '../../components/EmptyState'
import Alert from '../../components/Alert'

function ListaCandidatos() {
  const [candidatos, setCandidatos] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({ type: '', message: '' })
  const navigate = useNavigate()

  useEffect(() => {
    loadCandidatos()
    const params = new URLSearchParams(window.location.search)
    if (params.get('success')) {
      setAlert({ type: 'success', message: 'Candidato cadastrado com sucesso!' })
      window.history.replaceState({}, '', '/candidatos')
    }
    if (params.get('deleted')) {
      setAlert({ type: 'success', message: 'Candidato excluído com sucesso!' })
      window.history.replaceState({}, '', '/candidatos')
    }
  }, [])

  const loadCandidatos = async (searchTerm = '') => {
    try {
      setLoading(true)
      const response = await candidatosAPI.getAll(searchTerm)
      setCandidatos(response.data)
    } catch (error) {
      console.error('Erro ao carregar candidatos:', error)
      setAlert({ type: 'error', message: 'Erro ao carregar candidatos' })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm) => {
    setBusca(searchTerm)
    loadCandidatos(searchTerm)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este candidato?')) return

    try {
      await candidatosAPI.delete(id)
      setAlert({ type: 'success', message: 'Candidato excluído com sucesso!' })
      loadCandidatos(busca)
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

  return (
    <div className="table-container">
      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <div className="table-header">
        <h2 className="table-title">
          <i className="fas fa-users"></i> Candidatos Cadastrados
        </h2>
        <div className="table-header-actions">
          <SearchBar onSearch={handleSearch} placeholder="Buscar candidato..." />
          <Link to="/candidatos/novo" className="btn btn-primary">
            <i className="fas fa-plus"></i> Novo Candidato
          </Link>
        </div>
      </div>

      {busca && (
        <div className="search-results">
          <i className="fas fa-info-circle"></i> <strong>{candidatos.length}</strong> resultado(s) encontrado(s) para "{busca}"
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : candidatos.length === 0 ? (
        <EmptyState
          icon="fas fa-user-slash"
          title={busca ? 'Nenhum candidato encontrado' : 'Nenhum candidato cadastrado'}
          message={busca ? 'Tente buscar com outros termos' : 'Comece cadastrando seu primeiro candidato'}
          actionLink={busca ? null : '/candidatos/novo'}
          actionLabel={busca ? null : 'Cadastrar Candidato'}
        />
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cargo</th>
                <th>Data Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {candidatos.map((candidato) => (
                <tr key={candidato.id}>
                  <td>{candidato.id}</td>
                  <td>{candidato.nome}</td>
                  <td>{candidato.email}</td>
                  <td>{candidato.telefone || '-'}</td>
                  <td>{candidato.cargo}</td>
                  <td>{formatDate(candidato.data_cadastro)}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/candidatos/${candidato.id}`} className="btn btn-small btn-success btn-icon" title="Visualizar">
                        <i className="fas fa-eye"></i>
                      </Link>
                      <Link to={`/candidatos/${candidato.id}/editar`} className="btn btn-small btn-primary btn-icon" title="Editar">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button onClick={() => handleDelete(candidato.id)} className="btn btn-small btn-danger btn-icon" title="Deletar">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListaCandidatos




