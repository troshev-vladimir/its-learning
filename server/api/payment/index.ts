import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const password = 'l8w4z08uhfuj45tt'

  const dataToToken = [
    { Amount: body.Amount },
    { Description: body.Description },
    { OrderId: body.OrderId },
    { Password: password },
    { TerminalKey: body.TerminalKey },
  ]

  const tokenString = dataToToken.reduce((acc, el) => {
    return acc + Object.values(el)[0]
  }, '')

  const token = crypto.createHash('sha256').update(tokenString).digest('hex')

  return {
    token,
  }
})
