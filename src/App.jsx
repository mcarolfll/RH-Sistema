import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ListaCandidatos from './pages/Candidatos/ListaCandidatos'
import CadastrarCandidato from './pages/Candidatos/CadastrarCandidato'
import EditarCandidato from './pages/Candidatos/EditarCandidato'
import VerCandidato from './pages/Candidatos/VerCandidato'
import ListaEmpresas from './pages/Empresas/ListaEmpresas'
import CadastrarEmpresa from './pages/Empresas/CadastrarEmpresa'
import EditarEmpresa from './pages/Empresas/EditarEmpresa'
import VerEmpresa from './pages/Empresas/VerEmpresa'

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidatos" element={<ListaCandidatos />} />
            <Route path="/candidatos/novo" element={<CadastrarCandidato />} />
            <Route path="/candidatos/:id" element={<VerCandidato />} />
            <Route path="/candidatos/:id/editar" element={<EditarCandidato />} />
            <Route path="/empresas" element={<ListaEmpresas />} />
            <Route path="/empresas/nova" element={<CadastrarEmpresa />} />
            <Route path="/empresas/:id" element={<VerEmpresa />} />
            <Route path="/empresas/:id/editar" element={<EditarEmpresa />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

