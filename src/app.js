import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import roomRoutes from './routes/room.routes.js'
import messageRoutes from './routes/message.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

// cors
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// logger
app.use(logger('dev'))

// allow json format in requests
app.use(express.json())

// allow json format in cookies
app.use(cookieParser())

// routes
app.use('/api', authRoutes)
app.use('/api', roomRoutes)
app.use('/api', messageRoutes)

export default app
