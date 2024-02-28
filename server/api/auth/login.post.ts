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

  try {
    const { id: userId } = await api.user.auth(body)

    if (!userId) {
      throw createError({ statusCode: 404, statusMessage: 'User Not Found' })
    }

    const refreshToken = await createRefreshToken({ id: userId })
    setUserRefreshTokenInCookies(event, refreshToken)

    return await createAccessToken({ id: userId })
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User Not Found',
      data: {
        login: 'Беда, на сервере не нашли',
        password: 'Беда, пароль не верный',
      },
    })
  }
})