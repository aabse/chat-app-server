import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import roomRoutes from './routes/room.routes.js'
import messageRoutes from './routes/message.routes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

const app = express()

const URL_ORIGIN = process.env.URL_ORIGIN ?? 'http://localhost'
const PORT_ORIGIN = process.env.PORT_ORIGIN ?? '5173'

console.log(URL_ORIGIN)

// cors
app.use(cors({
  origin: `${URL_ORIGIN}:${PORT_ORIGIN}`,
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
