import ResourcePage from './ResourcePage.jsx'

const fields = [
  { key: 'userName', label: 'Athlete' },
  { key: 'points', label: 'Points' },
  { key: 'rank', label: 'Rank' },
]

export default function Leaderboard() {
  return (
    <ResourcePage
      accent="#f6c15d"
      description="See who is leading the OctoFit challenge board."
      fields={fields}
      resource="leaderboard"
      title="Leaderboard"
    />
  )
}