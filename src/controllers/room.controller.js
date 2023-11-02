import User from '../models/user.model.js'
import Room from '../models/room.model.js'

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
  const rooms = await Room.find()
  return res.json(rooms) 
}

export const getRoom = async (req, res) => {
  const {id} = req.params
  const room = await Room.findById(id)

  res.json(room)
}
