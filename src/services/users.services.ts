import User from '~/models/schemas/user.schema'
import DatabaseService from './database.services'
import { registerReqBody } from '~/models/requests/user.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enum'
import refreshToken from '~/models/schemas/refreshToken.schema'
import { ObjectId } from 'mongodb'

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
  private async signAccessAndRefreshToken(user_id: string) {
    const [access_token, refresh_token] = await Promise.all([this.accessToken(user_id), this.refreshToken(user_id)])
    return {
      access_token,
      refresh_token
    }
  }
  async login(user_id: string) {
    const token = await this.signAccessAndRefreshToken(user_id)
    const info = {
      token: token.refresh_token,
      created_at: new Date(),
      user_id: user_id
    }
    // console.log(info)
    await DatabaseService.signRefeshToken.insertOne(
      new refreshToken({ token: token.refresh_token, user_id: new ObjectId(user_id) })
    )
    return token
  }
  async register(payload: registerReqBody) {
    const result = await DatabaseService.user.insertOne(
      new User({ ...payload, date_of_birth: new Date(payload.date_of_birth), password: hashPassword(payload.password) })
    )
    //new Date(payload.date_of_birth) giup doan code Date thay vi string
    //...payload, date_of_birth: new Date(payload.date_of_birth)})) ...payload dùng để ghi đè
    const user_id = result.insertedId.toString()
    const token = await this.signAccessAndRefreshToken(user_id)
    return token
  }
}
const UsersServices = new usersServices()
export default UsersServices
