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

export const login = async (req, res) => {
  const {email, password} = req.body

  try {
    const userFound = await User.findOne({email})

    if (!userFound) return res.status(400).json({
      message: 'Invalid credentials'
    })

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) res.status(400).json({
      message: 'Invalid credentials'
    })

    const token = await createAccessToken({
      id: userFound._id
    })

    res.cookie('token', token)
    res.json({
      id: userFound._id,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    console.log(error)
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  console.log(req.user)
  const userFound = await User.findById(req.user.id)
  if (!userFound) {
    return res.status(400).json({
      message: 'User not found'
    })
  }
  return res.json({
    id: userFound._id,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}

