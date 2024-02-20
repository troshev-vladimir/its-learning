import { api } from '~/api'
import {
  createAccessToken,
  createRefreshToken,
  setUserRefreshTokenInCookies,
} from '~/server/utils/token'

export interface LoginRequest {
  login: string
  password: string
}

export default defineEventHandler(async (event) => {
  const body: LoginRequest = await readBody(event)

  console.log('body', body)

  const { id: userId } = await api.user.auth(body)

  if (!userId) {
    throw createError({ statusCode: 404, statusMessage: 'User Not Found' })
  }

  const refreshToken = await createRefreshToken({ id: userId })
  setUserRefreshTokenInCookies(event, refreshToken)

  return await createAccessToken({ id: userId })
})
