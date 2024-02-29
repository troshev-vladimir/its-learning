export function checkTokenExpValid(token: string) {
  if (!token) return false

  const now = Math.floor(Date.now() * 0.001)
  const payload = token.split('.')[1]
  const expiration = JSON.parse(atob(payload)).exp

  console.log(expiration > now)

  return expiration > now
}
