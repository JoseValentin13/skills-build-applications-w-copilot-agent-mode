import mongoose, { Schema } from 'mongoose'

export interface UserRecord {
  name: string
  email: string
  points: number
}

export interface TeamRecord {
  name: string
  members: number
  points: number
}

export interface ActivityRecord {
  userName: string
  activityType: string
  minutes: number
  calories: number
}

export interface LeaderboardRecord {
  userName: string
  points: number
  rank: number
}

export interface WorkoutRecord {
  title: string
  category: string
  durationMinutes: number
}

const userSchema = new Schema<UserRecord>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

const teamSchema = new Schema<TeamRecord>(
  {
    name: { type: String, required: true },
    members: { type: Number, required: true, default: 0 },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

const activitySchema = new Schema<ActivityRecord>(
  {
    userName: { type: String, required: true },
    activityType: { type: String, required: true },
    minutes: { type: Number, required: true, default: 0 },
    calories: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema<LeaderboardRecord>(
  {
    userName: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

const workoutSchema = new Schema<WorkoutRecord>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

export const UserModel = mongoose.model<UserRecord>('User', userSchema)
export const TeamModel = mongoose.model<TeamRecord>('Team', teamSchema)
export const ActivityModel = mongoose.model<ActivityRecord>('Activity', activitySchema)
export const LeaderboardModel = mongoose.model<LeaderboardRecord>('Leaderboard', leaderboardSchema)
export const WorkoutModel = mongoose.model<WorkoutRecord>('Workout', workoutSchema)