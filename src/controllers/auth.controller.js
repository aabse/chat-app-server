import User from '../models/user.model.js'

export const register = async (req, res) => {
  const {email, password} = req.body

  try {
    const newUser = new User({
      email,
      password
    })

    const userSaved = await newUser.save()
    res.json(userSaved)
  } catch (error) {
    console.log(error)
  }
}

export const login = (req, res) => {
  res.send('login')
}
