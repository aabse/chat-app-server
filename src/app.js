import express from 'express'
import logger from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

// logger
app.use(logger('dev'))

// allow json format in requests
app.use(express.json())

// allow json format in cookies
app.use(cookieParser())

// routes
app.use('/api', authRoutes)

export default app
