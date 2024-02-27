const encoder = new TextEncoder()
const charCodes = encoder.encode('Http_Service_Test:XI5su3ce')
const authStr = String.fromCharCode(...charCodes)
//Authorization: 'Basic ' + btoa(authStr),
const authToken = Buffer.from(`Http_Service_Test:XI5su3ce`).toString('base64')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(authToken)

  // тут в body надо чётко все поля и телефон с имейлом в формате

  try {
    const resp: any = await $fetch(
      'https://max43.ru:12244/ka_uprbase2/hs/payment/v1/orderdata',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: 'Basic ' + authToken,
        },
      }
    )

    return resp[0].OrderID
  } catch (err: any) {
    throw createError({
      statusMessage: err.message,
      statusCode: err.status,
      data: {
        description: 'Вероятно с бека не ришли данные orderdata',
      },
    })
  }
})
