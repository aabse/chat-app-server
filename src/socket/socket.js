import { Server } from 'socket.io'

class Socket {
  constructor(server) {
    this.server = server
    this.io = new Server(server, {
      connectionStateRecovery: {},
      cors: {
        origin: '*'
      }
    })
  }

  emitUserMessage() {

  }

  initializeSocket() {
    this.io.on('connection', async (socket) => {
      console.log('a user has connected')
      socket.on('chat message', async (msg) => {
        console.log(msg)
      })
    })
  }

  static createSocket(server) {
    const _createSocketInstance = (server) => {
      const socketInstance = new Socket(server)
      return socketInstance.initializeSocket()
    }

    return {
      SocketInstance: _createSocketInstance
    }
  }
}

export default Socket;
