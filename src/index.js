import app from "./app.js"
import { connectDB } from "./db.js"
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000
const server = createServer(app)
connectDB()

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
