import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'
import authMiddleware from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

// cors
app.use(cors({
  origin: true
}))

app.use(express.json())

// Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API running' })
})

app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.path}`)
  next()
})

// Auth routes
app.use('/', authRoutes)

// Task routes (protected)
app.use('/tasks', authMiddleware, taskRoutes)

console.log('Auth routes loaded: /register, /login')
console.log('Task routes loaded: /tasks')

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

