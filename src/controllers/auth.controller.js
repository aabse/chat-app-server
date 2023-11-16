import User from '../models/user.model.js'
import Room from '../models/room.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  const {email, password} = req.body

  const listRooms = ['general']

  try {

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: passwordHash
    })

    const userSaved = await newUser.save()

    await Room.updateMany({
      name: {
        $in: listRooms
      }
    },
    {
      $push: {
        users: userSaved._id
      }
    })

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

  console.log(email)
  console.log(password)
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
  if (req.user == undefined) return res.status(400).json({
    message: 'Bad request'
  })
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

export const users = async (req, res) => {
  console.log(req.user)
  const users = await User.find({
    _id: {
      $ne: req.user.id
    }
  })
  return res.json(users)
}

