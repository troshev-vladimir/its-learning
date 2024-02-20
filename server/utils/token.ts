import jwt, { type JwtPayload } from 'jsonwebtoken'

export interface body {
  login: string
  password: string
}

export interface MyJwtPayload {
  id: string
}

const refreshTokenExpiration = process.env.REFRESH_EXPIRES || ''
const accessTokenExpiration = process.env.ACCESS_EXPIRES || ''
const refreshTokenSecret = process.env.REFRESH_SECRET || ''
const accessTokenSecret = process.env.ACCESS_SECRET || ''

const createToken = async (
  payload: MyJwtPayload,
  type: 'access' | 'refresh'
) => {
  const isAccess = type === 'access'

  return await jwt.sign(
    {
      id: payload.id,
      // exp: Math.floor(Date.now() / 1000) + (60 * 60),
    },
    isAccess ? accessTokenSecret : refreshTokenSecret,

    {
      expiresIn: isAccess ? accessTokenExpiration : refreshTokenExpiration,
    }
  )
}

const createAccessToken = async (payload: MyJwtPayload) => {
  return createToken(payload, 'access')
}

const createRefreshToken = async (payload: MyJwtPayload) => {
  return createToken(payload, 'refresh')
}

const verifyToken = async (token: string, type: 'access' | 'refresh') => {
  const secret = type === 'access' ? accessTokenSecret : refreshTokenSecret
  try {
    const decoded = await jwt.verify(token, secret)
    return decoded
  } catch (err) {
    throw Error('token invalid')
  }
}

const getUserRefreshTokenFromCookies = (event: any) => {
  const cookie = getCookie(event, 'refreshToken')
  if (!cookie) {
    return null
  }
  const token = verifyToken(cookie, 'refresh')
  if (!token) {
    return null
  }
  return token
}

const setUserRefreshTokenInCookies = (event: any, token: string) => {
  setCookie(event, 'refreshToken', token)
}

export {
  createRefreshToken,
  createAccessToken,
  getUserRefreshTokenFromCookies,
  setUserRefreshTokenInCookies,
}
