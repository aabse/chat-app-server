import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  const {email, password} = req.body

  try {

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: passwordHash
    })

    const userSaved = await newUser.save()

    // generate token
    const token = await createAccessToken({
      id: userSaved._id
    })

    // response
    res.cookie('token', token)
    res.json({
      id: userSaved.id,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message
    })
  }
}

export const login = (req, res) => {
  res.send('login')
}
