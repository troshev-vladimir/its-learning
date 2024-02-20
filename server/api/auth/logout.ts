import { useCookie } from 'nuxt/app'
import { api } from '~/api'
import { setUserRefreshTokenInCookies } from '~/server/utils/token'
export interface LoginRequest {
  userId: string
}

export default defineEventHandler(async (event) => {
  // const body: LoginRequest = await readBody(event)
  // const responce = await api.user.logout(userId)

  // const refreshToken = useCookie('refreshToken', { httpOnly: true })
  // refreshToken.value = ''
  setUserRefreshTokenInCookies(event, '')
})
