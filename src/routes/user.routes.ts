import express, { Router } from 'express'
import { register } from '~/controllers/user.controllers'
import { registerValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandle } from '~/utils/errorHandling'
import { validate } from '~/utils/validator'
const router = Router()
router.post('/register', registerValidator, wrapRequestHandle(register))
export default router
