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


  setServer(server) {
    this.server = server;
    this.io = new Server(server, {
      connectionStateRecovery: {},
      cors: {
        origin: '*'
      }
    })
  }

  emitUserMessage(roomName, message) {
    console.log('emitting new message')
    this.io.to(roomName).emit('chat message', message)
  }

  initializeSocket() {
    this.io.on('connection', async (socket) => {
      console.log('a user has connected')
      
      socket.on('join room', (roomName) => {
        console.log('join room')
        console.log(roomName)
        socket.join(roomName)
      })

      socket.on('leave room', (roomName) => {
        console.log('leave room')
        console.log(roomName)
        socket.leave(roomName)
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

export default new Socket()
