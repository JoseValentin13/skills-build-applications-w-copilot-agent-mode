import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

const endpointPath = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

export default function Teams() {
  return (
    <ResourcePage
      accent="#8aa7ff"
      description="Track teams, members, and collective point totals."
      fields={fields}
      endpointPath={endpointPath}
      resource="teams"
      title="Teams"
    />
  )
}