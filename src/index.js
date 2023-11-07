import app from "./app.js"
import { connectDB } from "./db.js"
import { createServer } from 'node:http'
import Socket from './socket/socket.js'

const port = process.env.PORT ?? 3000
const server = createServer(app)
connectDB()

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

const { SocketInstance } = Socket.createSocket(server)
SocketInstance(server)
