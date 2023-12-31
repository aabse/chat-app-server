import User from '../models/user.model.js'
import Room from '../models/room.model.js'
import Message from '../models/message.model.js'
import Socket from '../socket/socket.js'

export const createMessage = async (req, res) => {
  const {message, roomId} = req.body
  const currentUser = await User.findById(req.user.id)
  

  const newMessage = new Message({
    message,
    user: currentUser.id,
    name: currentUser.email
  })

  const room = await Room.findByIdAndUpdate(roomId, {
    $push: {
      messages: newMessage
    }
  })

  
  const messageSaved = await newMessage.save()

  Socket.emitUserMessage(room.id, messageSaved)
  
  res.json(messageSaved)
}

export const getMessages = async (req, res) => {
  const messages = await Message.find()
  return res.json(messages)
}

export const getMessage = async (req, res) => {
  const {id} = req.params
  const message = await Message.findById(id)

  res.json(message)
}
