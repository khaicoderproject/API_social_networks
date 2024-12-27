import { error } from 'console'
import { checkSchema } from 'express-validator'
import { ErrorWithStatus } from '~/models/Errors'
import UsersServices from '~/services/users.services'

export const registerValidator = checkSchema({
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
        const check = await UsersServices.existPassword(value)
        if (check) {
          throw new ErrorWithStatus({ message: 'Email đã tồn tại trong hệ thống', status: 401 })
          // throw new Error('Email đã tồn tại trong hệ thống')
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
})
