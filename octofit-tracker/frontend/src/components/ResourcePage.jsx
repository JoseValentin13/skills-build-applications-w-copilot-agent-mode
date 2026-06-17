import { useEffect, useMemo, useState } from 'react'
import { apiBaseUrl, fetchCollection, getApiUrl } from '../lib/api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

function makeItemKey(item, index) {
  return item?._id ?? item?.id ?? item?.email ?? item?.name ?? item?.title ?? index
}

export default function ResourcePage({
  accent = '#68e1fd',
  description,
  fields,
  endpointPath,
  resource,
  title,
}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError('')

    fetchCollection(resource, controller.signal, endpointPath)
      .then(({ items: nextItems }) => {
        setItems(nextItems)
        setLoading(false)
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') {
          return
        }

        setItems([])
        setError(requestError instanceof Error ? requestError.message : 'Unknown request error')
        setLoading(false)
      })

    return () => controller.abort()
  }, [endpointPath, resource])

  const responseMode = useMemo(() => {
    if (loading) {
      return 'Loading API data...'
    }

    if (error) {
      return 'Showing fallback state'
    }

    return `${items.length} record${items.length === 1 ? '' : 's'} loaded`
  }, [error, items.length, loading])

  const firstField = fields[0]
  const secondField = fields[1]

  return (
    <section className="resource-page" style={{ '--resource-accent': accent }}>
      <div className="resource-header">
        <div>
          <span className="eyebrow">{title}</span>
          <h1>{description}</h1>
          <p className="resource-intro">
            Data is fetched from <code>{getApiUrl(resource, endpointPath)}</code> and normalized
            for both plain arrays and paginated payloads.
          </p>
        </div>

        <div className="resource-status">
          <div>
            <span>Base URL</span>
            <strong>{apiBaseUrl}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{responseMode}</strong>
          </div>
        </div>
      </div>

      <div className="resource-grid">
        {loading && (
          <div className="resource-empty card-surface">
            <h2>Loading {title.toLowerCase()}...</h2>
            <p>Waiting for the backend to return records.</p>
          </div>
        )}

        {!loading && error && (
          <div className="resource-empty card-surface warning-surface">
            <h2>Fallback response</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="resource-empty card-surface">
            <h2>No records yet</h2>
            <p>The seeded database is empty for this collection.</p>
          </div>
        )}

        {items.map((item, index) => (
          <article className="resource-card" key={makeItemKey(item, index)}>
            <div className="resource-card__header">
              <div>
                <span className="resource-card__index">Item {index + 1}</span>
                <h2>{formatValue(item[firstField?.key])}</h2>
                <p>{formatValue(item[secondField?.key])}</p>
              </div>
              <span className="resource-card__badge">{resource}</span>
            </div>

            <dl className="resource-meta">
              {fields.slice(2).map((field) => (
                <div key={field.key}>
                  <dt>{field.label}</dt>
                  <dd>{formatValue(item[field.key])}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}