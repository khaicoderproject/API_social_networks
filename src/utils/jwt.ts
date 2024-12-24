import jwt from 'jsonwebtoken'
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options
}: {
  payload: string | object | Buffer<ArrayBufferLike>
  privateKey?: string
  options: jwt.SignOptions
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        reject(error)
      }
      if (!token) {
        return reject(new Error('Token generation failed.')) // Xử lý khi token undefined
      }
      resolve(token)
    })
  })
}
