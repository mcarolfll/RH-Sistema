import { useState } from 'react'

function SearchBar({ onSearch, placeholder = "Buscar..." }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="btn btn-primary btn-icon" title="Buscar">
        <i className="fas fa-search"></i>
      </button>
      {searchTerm && (
        <button type="button" onClick={handleClear} className="btn btn-secondary btn-icon" title="Limpar busca">
          <i className="fas fa-times"></i>
        </button>
      )}
    </form>
  )
}

export default SearchBar




