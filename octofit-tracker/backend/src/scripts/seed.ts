import mongoose from 'mongoose'
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models.js'

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

const users = [
  { name: 'Ava Martinez', email: 'ava.martinez@example.com', points: 120 },
  { name: 'Noah Chen', email: 'noah.chen@example.com', points: 98 },
  { name: 'Mia Johnson', email: 'mia.johnson@example.com', points: 142 },
]

const teams = [
  { name: 'Trail Blazers', members: 8, points: 320 },
  { name: 'Cardio Crew', members: 6, points: 275 },
  { name: 'Strength Squad', members: 7, points: 301 },
]

const activities = [
  { userName: 'Ava Martinez', activityType: 'running', minutes: 35, calories: 290 },
  { userName: 'Noah Chen', activityType: 'cycling', minutes: 42, calories: 340 },
  { userName: 'Mia Johnson', activityType: 'strength training', minutes: 28, calories: 220 },
]

const leaderboard = [
  { userName: 'Mia Johnson', points: 142, rank: 1 },
  { userName: 'Ava Martinez', points: 120, rank: 2 },
  { userName: 'Noah Chen', points: 98, rank: 3 },
]

const workouts = [
  { title: 'Morning Boost', category: 'cardio', durationMinutes: 20 },
  { title: 'Full Body Circuit', category: 'strength', durationMinutes: 30 },
  { title: 'Recovery Flow', category: 'mobility', durationMinutes: 15 },
]

async function verifyApiResponses() {
  const endpoints = [
    '/api/users/',
    '/api/teams/',
    '/api/activities/',
    '/api/leaderboard/',
    '/api/workouts/',
  ]

  for (const endpoint of endpoints) {
    const response = await fetch(`${apiBaseUrl}${endpoint}`)
    const body = await response.json()
    console.log(`${endpoint}:`, body)
  }
}

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(mongoUri)

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ])

  await Promise.all([
    UserModel.insertMany(users),
    TeamModel.insertMany(teams),
    ActivityModel.insertMany(activities),
    LeaderboardModel.insertMany(leaderboard),
    WorkoutModel.insertMany(workouts),
  ])

  await verifyApiResponses()
}

seedDatabase()
  .then(async () => {
    await mongoose.disconnect()
  })
  .catch(async (error) => {
    console.error('Failed to seed octofit_db:', error)

    try {
      await mongoose.disconnect()
    } catch {
      // Ignore disconnect errors during shutdown.
    }

    process.exitCode = 1
  })