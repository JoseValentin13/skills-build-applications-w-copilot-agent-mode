import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Duration' },
]

const endpointPath = '/api/workouts/'

export default function Workouts() {
  return (
    <ResourcePage
      accent="#ad7bff"
      description="Explore suggested workouts and recovery plans."
      fields={fields}
      endpointPath={endpointPath}
      resource="workouts"
      title="Workouts"
    />
  )
}