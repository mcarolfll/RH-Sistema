import { useEffect } from 'react'

function Alert({ type, message, onClose }) {
  useEffect(() => {
    if (onClose && message) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [onClose, message])

  if (!message) return null

  return (
    <div className={`alert alert-${type}`}>
      <i className={`fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
      <span>{message}</span>
    </div>
  )
}

export default Alert




