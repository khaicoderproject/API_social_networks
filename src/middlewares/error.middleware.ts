import express, { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import { HTTP_STATUS } from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
export const defaultErrorsHandle = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    return res.status(error.status).json(omit(error, ['status']))
  }
  Object.getOwnPropertyNames(error).forEach((key) => {
    Object.defineProperty(error, key, { enumerable: true })
  })

  // console.log(error.message)

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    errorInfo: omit(error, ['stack'])
  })
}
