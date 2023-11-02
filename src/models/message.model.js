import { model, Schema } from "mongoose"

const messageSchema = new Schema({
  message: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }
})

export default model('Message', messageSchema)
