import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let dbInstance = null
let available = false

async function initialize() {
  try {
    dbInstance = await open({
      filename: path.join(__dirname, '../../database.sqlite'),
      driver: sqlite3.Database
    })
    available = true
    console.log('✅ Conectado ao banco de dados SQLite')
    return dbInstance
  } catch (error) {
    console.error('❌ Erro ao conectar ao SQLite:', error)
    throw error
  }
}

// Wrapper para simular o comportamento do mysql2 (retornar [rows, fields])
// O código existente espera desestruturar const [rows] = await db.execute(...)
async function execute(sql, params = []) {
  if (!available || !dbInstance) {
    throw new Error('DB_NOT_AVAILABLE')
  }
  
  // Normalizar params (SQLite usa ? como MySQL, então ok)
  // Mas para INSERT/UPDATE, o retorno é diferente.
  
  const sqlUpper = sql.trim().toUpperCase()
  if (sqlUpper.startsWith('SELECT')) {
    const rows = await dbInstance.all(sql, params)
    return [rows, []] // Retorna array simulando [rows, fields]
  } else {
    const result = await dbInstance.run(sql, params)
    // result tem { lastID, changes }
    // mysql2 retorna { insertId, affectedRows, ... }
    return [{
      insertId: result.lastID,
      affectedRows: result.changes,
      ...result
    }, []]
  }
}

async function query(sql, params) {
  return execute(sql, params)
}

function setAvailable(val) {
  available = !!val
}

function isAvailable() {
  return available
}

export default {
  initialize,
  execute,
  query,
  setAvailable,
  isAvailable
}


