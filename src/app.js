import express from 'express'
import logger from 'morgan'
import authRoutes from './routes/auth.routes.js'

const app = express()

// logger
app.use(logger('dev'))

// allow json format in requests
app.use(express.json())

// routes
app.use('/api', authRoutes)

export default app
