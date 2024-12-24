import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enum'

// Interface mô tả kiểu dữ liệu của người dùng
interface Usertype {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus

  bio?: string // có thể có
  location?: string // có thể có
  website?: string // có thể có
  username?: string // có thể có
  avatar?: string // có thể có
  cover_photo?: string // có thể có
}

// Lớp User để khởi tạo thông tin người dùng
export default class User {
  _id: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus

  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string

  // Constructor nhận đối tượng user theo kiểu Usertype
  constructor(user: Usertype) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name || ''
    this.email = user.email
    this.date_of_birth = user.date_of_birth || new Date()
    this.password = user.password
    this.created_at = date
    this.updated_at = date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = UserVerifyStatus.Unverified
    // Nếu có, gán các thuộc tính optional
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
  }
}
