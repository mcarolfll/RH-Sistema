import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { empresasAPI } from '../../services/api'
import { maskPhone, maskCNPJ } from '../../utils/masks'
import Alert from '../../components/Alert'

function CadastrarEmpresa() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    descricao: ''
  })
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'telefone') {
      setFormData({ ...formData, [name]: maskPhone(value) })
    } else if (name === 'cnpj') {
      setFormData({ ...formData, [name]: maskCNPJ(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await empresasAPI.create(formData)
      navigate('/empresas?success=1')
    } catch (error) {
      if (error.response?.data?.error === 'cnpj_existe') {
        setAlert({ type: 'error', message: 'Este CNPJ já está cadastrado. Por favor, use outro CNPJ.' })
      } else {
        setAlert({ type: 'error', message: error.response?.data?.message || 'Erro ao cadastrar empresa' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">
        <i className="fas fa-building"></i> Cadastrar Empresa
      </h2>
      <p className="form-subtitle">Preencha os dados da empresa abaixo</p>

      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nome">
              <i className="fas fa-building"></i> Nome da Empresa *
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
            <label htmlFor="cnpj">
              <i className="fas fa-id-card"></i> CNPJ
            </label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
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

          <div className="form-group full-width">
            <label htmlFor="endereco">
              <i className="fas fa-map-marker-alt"></i> Endereço
            </label>
            <textarea
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Digite o endereço completo da empresa..."
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label htmlFor="descricao">
              <i className="fas fa-info-circle"></i> Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva a empresa, área de atuação, etc..."
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <i className="fas fa-save"></i> {loading ? 'Salvando...' : 'Salvar Empresa'}
          </button>
          <Link to="/empresas" className="btn btn-secondary">
            <i className="fas fa-list"></i> Ver Lista
          </Link>
        </div>
      </form>
    </div>
  )
}

export default CadastrarEmpresa




