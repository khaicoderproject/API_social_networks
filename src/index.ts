import express, { NextFunction, Request, Response } from 'express'
import routerUser from './routes/user.routes'
import DatabaseService from './services/database.services'
import { defaultErrorsHandle } from './middlewares/error.middleware'
const app = express()
const port = 3000
app.use(express.json())
DatabaseService.connect()
app.use('/user', routerUser)
app.use(defaultErrorsHandle)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
