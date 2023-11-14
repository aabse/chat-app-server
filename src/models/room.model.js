import mongoose, { model, Schema } from 'mongoose'
import Message, { messageSchema } from '../models/message.model.js'

const roomSchema = new mongoose.Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [
    {
      type: messageSchema
    }
  ],
  name: {
    type: String,
    required: false
  }
})

export default model('Room', roomSchema)
