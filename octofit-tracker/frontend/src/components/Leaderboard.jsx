import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'userName', label: 'Athlete' },
  { key: 'points', label: 'Points' },
  { key: 'rank', label: 'Rank' },
]

const endpointPath = '/api/leaderboard/'

export default function Leaderboard() {
  return (
    <ResourcePage
      accent="#f6c15d"
      description="See who is leading the OctoFit challenge board."
      fields={fields}
      endpointPath={endpointPath}
      resource="leaderboard"
      title="Leaderboard"
    />
  )
}