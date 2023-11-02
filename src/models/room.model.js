import mongoose, { model, Schema } from 'mongoose'

const roomSchema = new mongoose.Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
})

export default model('Room', roomSchema)
