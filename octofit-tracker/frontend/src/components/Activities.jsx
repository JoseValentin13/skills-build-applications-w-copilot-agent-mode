import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'userName', label: 'Athlete' },
  { key: 'activityType', label: 'Activity' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'calories', label: 'Calories' },
]

const endpointPath = '/api/activities/'

export default function Activities() {
  return (
    <ResourcePage
      accent="#7be495"
      description="Follow the latest activity logs and training sessions."
      fields={fields}
      endpointPath={endpointPath}
      resource="activities"
      title="Activities"
    />
  )
}