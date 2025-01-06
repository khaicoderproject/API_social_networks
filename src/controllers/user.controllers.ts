import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import USER_MESSAGE from '~/constants/messages'
import { registerReqBody } from '~/models/requests/user.requests'
import User from '~/models/schemas/user.schema'
import UsersServices from '~/services/users.services'
export const login: any = async (req: Request, res: Response) => {
  // console.log(req)
  const user = req.user as User
  const userId = user._id as ObjectId
  const result = await UsersServices.login(userId.toString())
  // throw new Error('test error')
  res.json({ message: USER_MESSAGE.LOGIN_SUCCESS, result })
}
export const register: any = async (
  req: Request<ParamsDictionary, any, registerReqBody>,
  res: Response,
  next: NextFunction
) => {
  // throw new Error('test error handling')
  const result = await UsersServices.register(req.body)
  return res.json({ message: USER_MESSAGE.REGISTER_SUCCESS, result })
  // try {
  //   throw new Error('test error handling')
  //   const result = await UsersServices.register(req.body)
  //   return res.json({ message: 'Dang ky thanh cong', result })
  // } catch (error) {
  //   next(error)
  // }
}
