// Define VITE_CODESPACE_NAME in .env.local when running OctoFit Tracker in Codespaces.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(resourcePath, endpointPath) {
  return endpointPath ?? `${apiBaseUrl}/api/${resourcePath}/`
}

export function normalizeCollectionPayload(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [payload.items, payload.results, payload.data, payload.docs]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
    }
  }

  return []
}

export async function fetchCollection(resourcePath, signal, endpointPath) {
  const response = await fetch(getApiUrl(resourcePath, endpointPath), { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return {
    payload,
    items: normalizeCollectionPayload(payload),
  }
}

export { codespaceName }