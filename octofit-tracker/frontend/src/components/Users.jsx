import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'name', label: 'Student' },
  { key: 'email', label: 'Email' },
  { key: 'points', label: 'Points' },
]

const endpointPath = '/api/users/'

export default function Users() {
  return (
    <ResourcePage
      accent="#ff8f70"
      description="Review student profiles and overall point progress."
      fields={fields}
      endpointPath={endpointPath}
      resource="users"
      title="Users"
    />
  )
}