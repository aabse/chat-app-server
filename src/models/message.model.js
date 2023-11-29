import { model, Schema } from "mongoose"

export const messageSchema = new Schema({
  message: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }
}, 
{
  timestamps: true
})

export default model('Message', messageSchema)
