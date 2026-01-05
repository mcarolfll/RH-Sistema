import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { empresasAPI } from '../../services/api'
import SearchBar from '../../components/SearchBar'
import EmptyState from '../../components/EmptyState'
import Alert from '../../components/Alert'

function ListaEmpresas() {
  const [empresas, setEmpresas] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({ type: '', message: '' })

  useEffect(() => {
    loadEmpresas()
    const params = new URLSearchParams(window.location.search)
    if (params.get('success')) {
      setAlert({ type: 'success', message: 'Empresa cadastrada com sucesso!' })
      window.history.replaceState({}, '', '/empresas')
    }
    if (params.get('deleted')) {
      setAlert({ type: 'success', message: 'Empresa excluída com sucesso!' })
      window.history.replaceState({}, '', '/empresas')
    }
  }, [])

  const loadEmpresas = async (searchTerm = '') => {
    try {
      setLoading(true)
      const response = await empresasAPI.getAll(searchTerm)
      setEmpresas(response.data)
    } catch (error) {
      console.error('Erro ao carregar empresas:', error)
      setAlert({ type: 'error', message: 'Erro ao carregar empresas' })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm) => {
    setBusca(searchTerm)
    loadEmpresas(searchTerm)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta empresa?')) return

    try {
      await empresasAPI.delete(id)
      setAlert({ type: 'success', message: 'Empresa excluída com sucesso!' })
      loadEmpresas(busca)
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

  return (
    <div className="table-container">
      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <div className="table-header">
        <h2 className="table-title">
          <i className="fas fa-building"></i> Empresas Cadastradas
        </h2>
        <div className="table-header-actions">
          <SearchBar onSearch={handleSearch} placeholder="Buscar empresa..." />
          <Link to="/empresas/nova" className="btn btn-primary">
            <i className="fas fa-plus"></i> Nova Empresa
          </Link>
        </div>
      </div>

      {busca && (
        <div className="search-results">
          <i className="fas fa-info-circle"></i> <strong>{empresas.length}</strong> resultado(s) encontrado(s) para "{busca}"
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : empresas.length === 0 ? (
        <EmptyState
          icon="fas fa-building"
          title={busca ? 'Nenhuma empresa encontrada' : 'Nenhuma empresa cadastrada'}
          message={busca ? 'Tente buscar com outros termos' : 'Comece cadastrando sua primeira empresa'}
          actionLink={busca ? null : '/empresas/nova'}
          actionLabel={busca ? null : 'Cadastrar Empresa'}
        />
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Data Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa) => (
                <tr key={empresa.id}>
                  <td>{empresa.id}</td>
                  <td>{empresa.nome}</td>
                  <td>{empresa.cnpj || '-'}</td>
                  <td>{empresa.email}</td>
                  <td>{empresa.telefone || '-'}</td>
                  <td>{formatDate(empresa.data_cadastro)}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/empresas/${empresa.id}`} className="btn btn-small btn-success btn-icon" title="Visualizar">
                        <i className="fas fa-eye"></i>
                      </Link>
                      <Link to={`/empresas/${empresa.id}/editar`} className="btn btn-small btn-primary btn-icon" title="Editar">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button onClick={() => handleDelete(empresa.id)} className="btn btn-small btn-danger btn-icon" title="Deletar">
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

export default ListaEmpresas




