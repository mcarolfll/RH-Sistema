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

// Listar todas as empresas (com busca opcional)
router.get('/', async (req, res) => {
  try {
    const { busca } = req.query
    let query = 'SELECT * FROM empresas'
    let params = []

    if (busca) {
      query += ' WHERE nome LIKE ? OR email LIKE ? OR cnpj LIKE ?'
      const searchTerm = `%${busca}%`
      params = [searchTerm, searchTerm, searchTerm]
    }

    query += ' ORDER BY data_cadastro DESC'

    const [rows] = await db.execute(query, params)
    res.json(rows)
  } catch (error) {
    console.error('Erro ao buscar empresas:', error)
    res.status(500).json({ error: 'Erro ao buscar empresas', message: error.message })
  }
})

// Buscar empresa por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await db.execute('SELECT * FROM empresas WHERE id = ?', [id])

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error('Erro ao buscar empresa:', error)
    res.status(500).json({ error: 'Erro ao buscar empresa', message: error.message })
  }
})

// Criar nova empresa
router.post('/', async (req, res) => {
  try {
    const { nome, cnpj, email, telefone, endereco, descricao } = req.body

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }

    const [result] = await db.execute(
      'INSERT INTO empresas (nome, cnpj, email, telefone, endereco, descricao) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, cnpj || null, email, telefone || null, endereco || null, descricao || null]
    )

    res.status(201).json({ success: true, id: result.insertId })
  } catch (error) {
    console.error('Erro ao criar empresa:', error)
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.includes('UNIQUE constraint failed'))) {
      return res.status(400).json({ error: 'cnpj_existe', message: 'CNPJ já cadastrado' })
    }
    res.status(500).json({ error: 'Erro ao criar empresa', message: error.message })
  }
})

// Atualizar empresa
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nome, cnpj, email, telefone, endereco, descricao } = req.body

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }

    const [result] = await db.execute(
      'UPDATE empresas SET nome = ?, cnpj = ?, email = ?, telefone = ?, endereco = ?, descricao = ? WHERE id = ?',
      [nome, cnpj || null, email, telefone || null, endereco || null, descricao || null, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' })
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error)
    res.status(500).json({ error: 'Erro ao atualizar empresa', message: error.message })
  }
})

// Deletar empresa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await db.execute('DELETE FROM empresas WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' })
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar empresa:', error)
    res.status(500).json({ error: 'Erro ao deletar empresa', message: error.message })
  }
})

export default router


