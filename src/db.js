import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/chat-app-db')
    console.log('>>> DB is connected')
  } catch (e) {
    console.log(e)
  }
}
