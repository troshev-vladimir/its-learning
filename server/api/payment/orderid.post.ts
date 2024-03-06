import baseAuthToken from '~/server/utils/baseToken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(baseAuthToken())

  // тут в body надо чётко все поля и телефон с имейлом в формате

  try {
    const resp: any = await $fetch(
      'https://max43.ru:12244/ka_uprbase2/hs/payment/v1/orderdata',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: 'Basic ' + baseAuthToken(),
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
