import express, { Router } from 'express'
import { register, login, logout } from '~/controllers/user.controllers'
import { registerValidator, loginValidator, logoutValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandle } from '~/utils/errorHandling'
import { validate } from '~/utils/validator'
const router = Router()
router.post('/login', loginValidator, wrapRequestHandle(login))
router.post('/register', registerValidator, wrapRequestHandle(register))
router.post('/logout', logoutValidator, wrapRequestHandle(logout))
export default router
