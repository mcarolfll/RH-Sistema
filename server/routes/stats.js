import express from 'express'
import db from '../config/database.js'

const router = express.Router()

// Middleware: bloquear rotas se DB indisponível
router.use((req, res, next) => {
  if (!db.isAvailable || !db.isAvailable()) {
    return res.status(503).json({ candidatos: 0, empresas: 0 })
  }
  next()
})

// Buscar estatísticas
router.get('/', async (req, res) => {
  try {
    const [candidatosResult] = await db.execute('SELECT COUNT(*) as total FROM candidatos')
    const [empresasResult] = await db.execute('SELECT COUNT(*) as total FROM empresas')

    res.json({
      candidatos: candidatosResult[0].total,
      empresas: empresasResult[0].total
    })
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    res.status(500).json({ candidatos: 0, empresas: 0 })
  }
})

export default router




