import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  },
  connectionStateRecovery: {}
})

io.on('connection', async (socket) => {
  console.log('a user connected')

  socket.on('chat message', async (msg) => {
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
