import axios from 'axios'

const API_URL = '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Candidatos
export const candidatosAPI = {
  getAll: (busca = '') => {
    const params = busca ? { busca } : {}
    return api.get('/candidatos', { params })
  },
  getById: (id) => api.get(`/candidatos/${id}`),
  create: (data) => api.post('/candidatos', data),
  update: (id, data) => api.put(`/candidatos/${id}`, data),
  delete: (id) => api.delete(`/candidatos/${id}`)
}

// Empresas
export const empresasAPI = {
  getAll: (busca = '') => {
    const params = busca ? { busca } : {}
    return api.get('/empresas', { params })
  },
  getById: (id) => api.get(`/empresas/${id}`),
  create: (data) => api.post('/empresas', data),
  update: (id, data) => api.put(`/empresas/${id}`, data),
  delete: (id) => api.delete(`/empresas/${id}`)
}

// Stats
export const statsAPI = {
  get: () => api.get('/stats')
}

export default api




