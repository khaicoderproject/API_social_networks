import { error } from 'console'
import { checkSchema } from 'express-validator'
import { ErrorWithStatus } from '~/models/Errors'
import DatabaseService from '~/services/database.services'
import UsersServices from '~/services/users.services'
import { hashPassword } from '~/utils/crypto'
import { decodeJwt } from '~/utils/jwt'
import { validate } from '~/utils/validator'

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        custom: {
          options: async (value, { req }) => {
            const check = await DatabaseService.user.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (!check) {
              // throw new ErrorWithStatus({ message: 'Email đã tồn tại trong hệ thống', status: 401 })
              throw new Error('Email không tồn tại trong hệ thống')
            }
            req.user = check
            return true
          }
        },
        isEmail: true,
        notEmpty: true,
        isString: true,
        trim: true,
        errorMessage: 'Vui lòng nhập đúng Email!'
      },
      password: {
        // isStrongPassword:{
        //   options:{

        //   }
        // }
        isStrongPassword: true,
        trim: true,
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        },
        errorMessage: 'Mật khẩu không hợp lệ!'
      }
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        isLength: {
          options: {
            max: 100,
            min: 1
          }
        },
        notEmpty: true,
        trim: true
      },
      email: {
        custom: {
          options: async (value) => {
            const check = await DatabaseService.user.findOne({ email: value })
            if (check) {
              // throw new ErrorWithStatus({ message: 'Email đã tồn tại trong hệ thống', status: 401 })
              throw new Error('Email đã tồn tại trong hệ thống')
            }
            return true
          }
        },
        isEmail: true,
        notEmpty: true,
        isString: true,
        trim: true,
        errorMessage: 'Vui long nhap dung email!'
      },
      password: {
        // isStrongPassword:{
        //   options:{

        //   }
        // }
        isStrongPassword: true,
        trim: true,
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        }
      },
      confirm_password: {
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password not matched!')
            }
            return true
          }
        },
        isStrongPassword: true,
        trim: true,
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          }
        }
      }
    },
    ['body']
  )
)
export const logoutValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const token = value.split(' ')[1]
            if (!token) {
              throw new ErrorWithStatus({ message: 'Access token is required', status: 401 })
            }
            const decode = await decodeJwt(token)
            // console.log(decode)
            return true
          }
        }
      }
    },
    ['headers']
  )
)
