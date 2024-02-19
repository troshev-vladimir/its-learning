import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken'
import { MyJwtPayload } from '../getTokens/'
const secretRefresh = process.env.REFRESH_SECRET || ''

export default defineEventHandler(async (event) => {
  const refreshTokenFromCookies = getCookie(event, 'refreshToken') || ''

  jwt.verify(refreshTokenFromCookies, secretRefresh, function (err, decoded) {
    // decoded.complete
    // console.log(decoded.id)
    return {
      header: 'JwtHeader',
      payload: 'asd',
      signature: 'string',
    }
  })
})
