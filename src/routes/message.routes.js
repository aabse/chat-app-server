import { Router } from "express";
import { createMessage, getMessage, getMessages } from "../controllers/message.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post('/messages', authRequired, createMessage)
router.get('/messages', authRequired, getMessages)
router.get('/messages/:id', authRequired, getMessage)

export default router
