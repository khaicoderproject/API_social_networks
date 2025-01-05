import express, { Router } from 'express'
import { register, login } from '~/controllers/user.controllers'
import { registerValidator, loginValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandle } from '~/utils/errorHandling'
import { validate } from '~/utils/validator'
const router = Router()
router.post('/login', loginValidator, wrapRequestHandle(login))
router.post('/register', registerValidator, wrapRequestHandle(register))
export default router
