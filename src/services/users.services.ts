import User from '~/models/schemas/user.schema'
import DatabaseService from './database.services'
import { registerReqBody } from '~/models/requests/user.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enum'

class usersServices {
  private accessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: {
        algorithm: 'HS256',
        expiresIn: '15m'
      }
    })
  }
  private refreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: {
        algorithm: 'HS256',
        expiresIn: '100d'
      }
    })
  }
  async register(payload: registerReqBody) {
    const result = await DatabaseService.user.insertOne(
      new User({ ...payload, date_of_birth: new Date(payload.date_of_birth), password: hashPassword(payload.password) })
    )
    //new Date(payload.date_of_birth) giup doan code Date thay vi string
    //...payload, date_of_birth: new Date(payload.date_of_birth)})) ...payload dùng để ghi đè
    const user_id = result.insertedId.toString()
    const [access_token, refresh_token] = await Promise.all([this.accessToken(user_id), this.refreshToken(user_id)])
    return {
      access_token,
      refresh_token
    }
  }
  async existPassword(email: string) {
    const result = await DatabaseService.user.findOne({ email })
    return result
  }
}
const UsersServices = new usersServices()
export default UsersServices
