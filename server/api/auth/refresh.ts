import { useCookie } from 'nuxt/app'
import { api } from '~/api'
import {
  createAccessToken,
  getUserRefreshTokenFromCookies,
} from '~/server/utils/token'

export interface LoginRequest {
  login: string
  password: string
}

export default defineEventHandler(async (event) => {
  const decoded = getUserRefreshTokenFromCookies(event)
  console.log(decoded)

  if (decoded) {
    // return await createAccessToken()
  }
})
