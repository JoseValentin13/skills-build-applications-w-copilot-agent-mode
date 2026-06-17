import express from 'express'
import mongoose from 'mongoose'

const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    baseUrl,
    port,
    mongoReady: mongoose.connection.readyState === 1,
  })
})

async function start() {
  await mongoose.connect(mongoUri).catch((error) => {
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