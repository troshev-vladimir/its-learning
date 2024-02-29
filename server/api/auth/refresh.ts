import {
  createAccessToken,
  getUserRefreshTokenFromCookies,
} from '~/server/utils/token'

export default defineEventHandler(async (event) => {
  const decoded = await getUserRefreshTokenFromCookies(event)
  console.log(decoded)

  if (decoded) {
    // @ts-expect-error
    return await createAccessToken(decoded.id)
  }
})
