import User from '../models/user.model.js'
import Room from '../models/room.model.js'
import Socket from '../socket/socket.js'

export const createRoom = async (req, res) => {
  const currentUser = await User.findById(req.user.id)
  let {users} = req.body
  console.log(currentUser)
  users = [currentUser, ...users]

  const newRoom = new Room({
    users,
    messages: []
  })

  const roomSaved = await newRoom.save()

  res.json({
    id: roomSaved.id,
    users: roomSaved.users,
    messages: roomSaved.messages
  })

}

export const getRooms = async (req, res) => {
  const {user} = req.query
  const currentUser = await User.findById(req.user.id)
  if (user === undefined) {
    const rooms = await Room.find()
    return res.json(rooms)
  } else {
    console.log('searching room')
    const roomFound = await Room.findOne({
      users: {
        $all: [req.user.id, user]
      }
    })
    if (roomFound) {
      //Socket.joinRoom(roomFound.id)
      return res.json(roomFound)
    } else {
      const newRoom = new Room({
        users: [currentUser,user],
        messages: []
      }) 

      const roomSaved = await newRoom.save()
      //Socket.joinRoom(roomSaved.id)
      return res.json(roomSaved)

    }
  }
}

export const getRoom = async (req, res) => {
  const {id} = req.params
  const room = await Room.findById(id)
  res.json(room)
}
