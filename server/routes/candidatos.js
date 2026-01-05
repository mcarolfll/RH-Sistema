import express from 'express'
import db from '../config/database.js'

const router = express.Router()

// Middleware: bloquear rotas se DB indisponível
router.use((req, res, next) => {
  if (!db.isAvailable || !db.isAvailable()) {
    return res.status(503).json({ error: 'DB_UNAVAILABLE', message: 'Banco de dados indisponível' })
  }
  next()
})

// Listar todos os candidatos (com busca opcional)
router.get('/', async (req, res) => {
  try {
    const { busca } = req.query
    let query = 'SELECT * FROM candidatos'
    let params = []

    if (busca) {
      query += ' WHERE nome LIKE ? OR email LIKE ? OR cargo LIKE ?'
      const searchTerm = `%${busca}%`
      params = [searchTerm, searchTerm, searchTerm]
    }

    query += ' ORDER BY data_cadastro DESC'

    const [rows] = await db.execute(query, params)
    res.json(rows)
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error)
    res.status(500).json({ error: 'Erro ao buscar candidatos', message: error.message })
  }
})

// Buscar candidato por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await db.execute('SELECT * FROM candidatos WHERE id = ?', [id])

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Candidato não encontrado' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error('Erro ao buscar candidato:', error)
    res.status(500).json({ error: 'Erro ao buscar candidato', message: error.message })
  }
})

// Criar novo candidato
router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, cargo, experiencia, habilidades } = req.body

    if (!nome || !email || !cargo) {
      return res.status(400).json({ error: 'Nome, email e cargo são obrigatórios' })
    }

    const [result] = await db.execute(
      'INSERT INTO candidatos (nome, email, telefone, cargo, experiencia, habilidades) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, telefone || null, cargo, experiencia || null, habilidades || null]
    )

    res.status(201).json({ success: true, id: result.insertId })
  } catch (error) {
    console.error('Erro ao criar candidato:', error)
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.includes('UNIQUE constraint failed'))) {
      return res.status(400).json({ error: 'email_existe', message: 'E-mail já cadastrado' })
    }
    res.status(500).json({ error: 'Erro ao criar candidato', message: error.message })
  }
})

// Atualizar candidato
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email, telefone, cargo, experiencia, habilidades } = req.body

    if (!nome || !email || !cargo) {
      return res.status(400).json({ error: 'Nome, email e cargo são obrigatórios' })
    }

    const [result] = await db.execute(
      'UPDATE candidatos SET nome = ?, email = ?, telefone = ?, cargo = ?, experiencia = ?, habilidades = ? WHERE id = ?',
      [nome, email, telefone || null, cargo, experiencia || null, habilidades || null, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Candidato não encontrado' })
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Erro ao atualizar candidato:', error)
    res.status(500).json({ error: 'Erro ao atualizar candidato', message: error.message })
  }
})

// Deletar candidato
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await db.execute('DELETE FROM candidatos WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Candidato não encontrado' })
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar candidato:', error)
    res.status(500).json({ error: 'Erro ao deletar candidato', message: error.message })
  }
})

export default router


