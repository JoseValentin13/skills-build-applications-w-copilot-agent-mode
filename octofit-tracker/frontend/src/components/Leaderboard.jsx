import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'userName', label: 'Athlete' },
  { key: 'points', label: 'Points' },
  { key: 'rank', label: 'Rank' },
]

const endpointPath = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

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