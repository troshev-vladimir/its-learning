const encoder = new TextEncoder()
const charCodes = encoder.encode('Http_Service_Test:XI5su3ce')
const authStr = String.fromCharCode(...charCodes)
//Authorization: 'Basic ' + btoa(authStr),
const authToken = Buffer.from(`Http_Service_Test:XI5su3ce`).toString('base64')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const resp = await $fetch(
      'https://max43.ru:12244/ka_uprbase2/hs/payment/v1/orderdata',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: 'Basic ' + authToken,
        },
      }
    )

    return resp
  } catch (err) {
    console.log(err)
    throw createError({
      message: 'Authorization Failed',
      statusCode: 401,
    })
  }
})
