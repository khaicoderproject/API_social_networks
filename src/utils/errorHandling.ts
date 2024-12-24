import { NextFunction, Request, RequestHandler, Response } from 'express'

export const wrapRequestHandle = (func: RequestHandler) => {
  // return async (req: Request, res: Response, next: NextFunction) => {
  //   Promise.resolve(func(req, res, next)).catch(next)
  // } trong trường hợp chỉ dùng cho function async
  // hoặc cách này dành cho cả 2
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
