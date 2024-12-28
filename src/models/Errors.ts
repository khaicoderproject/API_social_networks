import { HTTP_STATUS } from '~/constants/httpStatus'
import USER_MESSAGE from '~/constants/messages'

type errorsType = Record<
  string,
  {
    msg: string
    // location: string
    // value: any
    // path: string
    [key: string]: any
  }
>
//Định nghĩa kiểu dữ liệu errorsType, dùng record để ánh xạ tương tự như [field: string]:{}
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}
export class ErrorsEntity extends ErrorWithStatus {
  errors: errorsType
  constructor({ message, status, errors }: { message?: string; status?: number; errors: errorsType }) {
    super({ message: USER_MESSAGE.VALIDATION_ERROR, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
