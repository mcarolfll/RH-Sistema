import { Link } from 'react-router-dom'

function EmptyState({ icon, title, message, actionLabel, actionLink }) {
  return (
    <div className="empty-state">
      <i className={icon}></i>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLink && actionLabel && (
        <Link to={actionLink} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          <i className="fas fa-plus"></i> {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default EmptyState




