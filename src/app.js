import express from 'express'
import logger from 'morgan'
import authRoutes from './routes/auth.routes.js'

const app = express()

// logger
app.use(logger('dev'))

// routes
app.use(authRoutes)

export default app
