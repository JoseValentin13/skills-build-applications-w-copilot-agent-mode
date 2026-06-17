import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, codespaceName } from './lib/api.js'
import './App.css'

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

const featureCards = [
  {
    label: 'Users',
    path: '/users',
    description: 'Browse students, profile details, and point totals.',
  },
  {
    label: 'Teams',
    path: '/teams',
    description: 'See team composition and progress toward collective goals.',
  },
  {
    label: 'Activities',
    path: '/activities',
    description: 'Review recent workouts and training sessions.',
  },
  {
    label: 'Leaderboard',
    path: '/leaderboard',
    description: 'Track the current ranking and leaderboard movement.',
  },
  {
    label: 'Workouts',
    path: '/workouts',
    description: 'Explore suggested workouts and training plans.',
  },
]

function Home() {
  return (
    <section className="home-layout">
      <div className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">React 19 presentation tier</span>
          <h1>OctoFit Tracker brings fitness data into one clean dashboard.</h1>
          <p className="lead">
            The frontend now uses React Router, Codespaces-aware API URLs, and a safe localhost
            fallback so the UI works in either environment.
          </p>
          <div className="hero-actions">
            <NavLink className="btn btn-primary hero-button" to="/activities">
              Open activity feed
            </NavLink>
            <NavLink className="btn btn-outline-light hero-button" to="/leaderboard">
              View leaderboard
            </NavLink>
          </div>
        </div>

        <aside className="status-panel">
          <div className="status-card">
            <img className="brand-mark" src="/octofitapp-small.png" alt="OctoFit Tracker logo" />
            <div>
              <p className="status-label">API base URL</p>
              <code className="status-code">{apiBaseUrl}</code>
            </div>
          </div>

          <div className="status-grid">
            <div className="mini-card">
              <span>Routes</span>
              <strong>5 views</strong>
            </div>
            <div className="mini-card">
              <span>Mode</span>
              <strong>{codespaceName ? 'Codespaces' : 'Localhost'}</strong>
            </div>
          </div>

          <div className="env-note">
            <p>
              Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when you run the
              app in Codespaces.
            </p>
            <p>
              If the variable is missing, the app safely falls back to{' '}
              <code>http://localhost:8000</code>.
            </p>
          </div>
        </aside>
      </div>

      <div className="feature-grid">
        {featureCards.map((card) => (
          <NavLink key={card.path} className="feature-card" to={card.path}>
            <span className="feature-card__label">{card.label}</span>
            <p>{card.description}</p>
            <span className="feature-card__link">Open view</span>
          </NavLink>
        ))}
      </div>

      <div className="workflow-strip">
        <div>
          <span>Presentation tier</span>
          <strong>React 19 + Vite + Bootstrap</strong>
        </div>
        <div>
          <span>Navigation</span>
          <strong>React Router routes</strong>
        </div>
        <div>
          <span>API contract</span>
          <strong>Array and paginated payloads</strong>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <img className="brand-mark" src="/octofitapp-small.png" alt="OctoFit Tracker logo" />
          <div>
            <p className="brand-name">OctoFit Tracker</p>
            <p className="brand-tag">Fitness dashboards for students and teams</p>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to={item.path}
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
