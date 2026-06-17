import express from 'express'
import { type Model } from 'mongoose'
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js'
import { connectDatabase, mongoUri, mongoose } from './config/database.js'

const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

const app = express()

app.use(express.json())

function registerCollectionRoute<T>(route: string, label: string, model: Model<T>) {
  app.get(route, async (_request, response) => {
    try {
      const items = await model.find().lean().exec()

      response.json({
        baseUrl,
        count: items.length,
        items,
        resource: label,
        databaseReady: true,
      })
    } catch (error) {
      response.json({
        baseUrl,
        count: 0,
        items: [],
        resource: label,
        databaseReady: false,
        error: error instanceof Error ? error.message : 'Database query failed',
      })
    }
  })
}

function registerNormalizedCollectionRoute<T>(route: string, label: string, model: Model<T>) {
  registerCollectionRoute(route, label, model)
  registerCollectionRoute(route.slice(0, -1), label, model)
}

registerNormalizedCollectionRoute('/api/users/', 'users', UserModel)
registerNormalizedCollectionRoute('/api/teams/', 'teams', TeamModel)
registerNormalizedCollectionRoute('/api/activities/', 'activities', ActivityModel)
registerNormalizedCollectionRoute('/api/leaderboard/', 'leaderboard', LeaderboardModel)
registerNormalizedCollectionRoute('/api/workouts/', 'workouts', WorkoutModel)

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    baseUrl,
    port,
    mongoReady: mongoose.connection.readyState === 1,
  })
})

async function start() {
  void connectDatabase().catch((error) => {
    console.warn('MongoDB connection not ready at startup:', error instanceof Error ? error.message : error)
  })

  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}`)
  })
}

start().catch((error) => {
  console.error('Failed to start OctoFit Tracker API:', error)
  process.exit(1)
})