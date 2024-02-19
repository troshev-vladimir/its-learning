import jwt, { JwtPayload } from 'jsonwebtoken'
import { api } from '~/api'

export interface body {
  login: string
  password: string
}

export interface MyJwtPayload {
  id: string
  exp: number
}

const secretAccess = process.env.ACCESS_SECRET || ''
const secretRefresh = process.env.REFRESH_SECRET || ''

export default defineEventHandler(async (event) => {
  const body: body = await readBody(event)

  try {
    const { id: userId } = await api.user.auth(body)

    const accessToken: string = await jwt.sign(
      {
        id: userId,
        exp: Math.floor(Date.now() / 1000) + 30 * 60,
      } as MyJwtPayload & JwtPayload,
      secretAccess,
      {}
    )

    const refreshToken: string = await jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 30 * 60 },
      secretAccess,
      {}
    )

    setCookie(event, 'refreshToken', refreshToken)

    return accessToken
  } catch (error) {
    console.log(error)
  }
})
