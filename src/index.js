import app from "./app"
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000
const server = createServer(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
