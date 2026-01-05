import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path ? 'active' : ''
    }
    return location.pathname.startsWith(path) ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <i className="fas fa-briefcase"></i>
          <h1>Sistema RH</h1>
        </div>
        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <i className="fas fa-home"></i> <span className="nav-text">Início</span>
          </Link>
          <Link to="/candidatos" className={`nav-link ${isActive('/candidatos')}`}>
            <i className="fas fa-user-tie"></i> <span className="nav-text">Candidatos</span>
          </Link>
          <Link to="/empresas" className={`nav-link ${isActive('/empresas')}`}>
            <i className="fas fa-building"></i> <span className="nav-text">Empresas</span>
          </Link>
          <Link to="/candidatos" className={`nav-link ${isActive('/dashboard')}`}>
            <i className="fas fa-chart-bar"></i> <span className="nav-text">Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header


