import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
  console.log('validing token')
  
  const {token} = req.cookies
  console.log(token)
  let error = false
  
  
  if (!token) {
    error = true
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      error = true
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    req.user = user
  })

  if (error) return res.status(401).json({
    message: 'Unauthorized'
  })

  next()
}
