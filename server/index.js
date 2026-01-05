import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/database.js'
import candidatosRoutes from './routes/candidatos.js'
import empresasRoutes from './routes/empresas.js'
import statsRoutes from './routes/stats.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Inicializar banco de dados
async function initializeDatabase() {
  try {
    // Inicializar conexão SQLite
    await db.initialize()
    
    // Criar tabelas
    await db.query(`
      CREATE TABLE IF NOT EXISTS candidatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT,
        cargo TEXT,
        experiencia TEXT,
        habilidades TEXT,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.query(`
      CREATE TABLE IF NOT EXISTS empresas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cnpj TEXT UNIQUE,
        email TEXT NOT NULL,
        telefone TEXT,
        endereco TEXT,
        descricao TEXT,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('✅ Banco de dados e tabelas inicializados com sucesso')
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error.message)
  }
}

// Inicializar banco
initializeDatabase()

// Rotas
app.use('/api/candidatos', candidatosRoutes)
app.use('/api/empresas', empresasRoutes)
app.use('/api/stats', statsRoutes)

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📡 API disponível em http://localhost:${PORT}/api`)
})

export default app
