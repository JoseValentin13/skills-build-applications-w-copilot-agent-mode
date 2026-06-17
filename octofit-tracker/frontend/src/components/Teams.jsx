import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return (
    <ResourcePage
      accent="#8aa7ff"
      description="Track teams, members, and collective point totals."
      fields={fields}
      endpointPath="/api/teams/"
      resource="teams"
      title="Teams"
    />
  )
}