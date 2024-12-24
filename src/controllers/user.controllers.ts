import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { registerReqBody } from '~/models/requests/user.requests'
import UsersServices from '~/services/users.services'
export const register: any = async (
  req: Request<ParamsDictionary, any, registerReqBody>,
  res: Response,
  next: NextFunction
) => {
  // throw new Error('test error handling')
  const result = await UsersServices.register(req.body)
  return res.json({ message: 'Dang ky thanh cong', result })
  // try {
  //   throw new Error('test error handling')
  //   const result = await UsersServices.register(req.body)
  //   return res.json({ message: 'Dang ky thanh cong', result })
  // } catch (error) {
  //   next(error)
  // }
}
