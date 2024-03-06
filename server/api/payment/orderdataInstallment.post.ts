import baseAuthToken from '~/server/utils/baseToken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const resp: any = await $fetch(
      'https://max43.ru:12244/ka_uprbase2/hs/payment/v1/orderdataInstallment',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: 'Basic ' + baseAuthToken(),
        },
      }
    )

    return resp
  } catch (err: any) {
    throw createError({
      statusMessage: err.message,
      statusCode: err.status,
      data: {
        description: 'Вероятно с бека не пришли данные orderdata',
      },
    })
  }
})
