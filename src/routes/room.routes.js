import { Router } from 'express'
import { createRoom, getRoom, getRooms } from '../controllers/room.controller.js'
import { authRequired } from '../middlewares/validateToken.js'


const router = Router()

router.post('/rooms', createRoom)
router.get('/rooms', authRequired, getRooms)
router.get('/rooms/:id', authRequired, getRoom)

export default router
