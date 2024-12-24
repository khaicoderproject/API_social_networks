import express, { NextFunction, Request, Response } from 'express'
import routerUser from './routes/user.routes'
import DatabaseService from './services/database.services'
const app = express()
const port = 3000
app.use(express.json())
DatabaseService.connect()
app.use('/user', routerUser)
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: 'Mã lỗi là: ', error: error.message })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
