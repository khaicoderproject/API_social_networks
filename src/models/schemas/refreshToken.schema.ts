import { ObjectId } from 'mongodb'
interface RefreshToken {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
}
export default class refreshToken {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  constructor(refreshToken: RefreshToken) {
    this._id = refreshToken._id
    this.token = refreshToken.token
    this.created_at = new Date()
    this.user_id = refreshToken.user_id
  }
}
