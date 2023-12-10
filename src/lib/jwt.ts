import jwt from 'jsonwebtoken'

const appSecret = process.env.APP_SECRET || '@2023'

export const jwtGenerate = (data: object) => {
  const token = jwt.sign(data, appSecret, {
    expiresIn: '3m',
    algorithm: 'HS256'
  })

  return token
}

export const jwtRefreshTokenGenerate = (data: object) => {
  const refreshToken = jwt.sign(data, appSecret, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })

  return refreshToken
}
