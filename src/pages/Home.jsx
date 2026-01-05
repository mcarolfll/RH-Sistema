import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { statsAPI } from '../services/api'

function Home() {
  const [stats, setStats] = useState({ candidatos: 0, empresas: 0 })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await statsAPI.get()
      setStats(response.data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Bem-vindo ao Sistema de Gestão de RH</h2>
          <p className="hero-subtitle">Gerencie candidatos e empresas de forma eficiente e moderna</p>
        </div>
      </section>

      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>Cadastrar Candidatos</h3>
            <p>Registre informações completas dos candidatos de forma organizada</p>
            <Link to="/candidatos/novo" className="btn btn-primary">
              <i className="fas fa-arrow-right"></i> Acessar
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-building"></i>
            </div>
            <h3>Cadastrar Empresas</h3>
            <p>Mantenha um registro completo das empresas parceiras</p>
            <Link to="/empresas/nova" className="btn btn-primary">
              <i className="fas fa-arrow-right"></i> Acessar
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Dashboard</h3>
            <p>Visualize estatísticas e relatórios do sistema</p>
            <Link to="/candidatos" className="btn btn-primary">
              <i className="fas fa-arrow-right"></i> Acessar
            </Link>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon candidatos">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.candidatos}</h3>
              <p>Candidatos Cadastrados</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon empresas">
              <i className="fas fa-building"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.empresas}</h3>
              <p>Empresas Cadastradas</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home




