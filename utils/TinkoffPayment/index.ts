import { notify } from '@kyvg/vue3-notification'
import type { InitialParams, Response } from './types'

const TerminalKey = '1662547243585'

export async function TinkoffPayment(
  params: InitialParams
): Promise<Response | undefined> {
  let orderData = {
    TerminalKey,
    Amount: params.amount * 100,
    Description: params.orderData?.description || 'Оплата',
    OrderId: 0,
    DATA: {
      Phone: params.userData?.phone || '',
      Email: params.userData?.email || '',
    },
    Receipt: {
      Taxation: 'osn',
      Email: params.userData?.email || '',
      Phone: params.userData?.phone || '',
      Items: [
        {
          Name: params.orderData?.name || 'Оплата',
          Price: params.amount * 100,
          Quantity: 1.0,
          Amount: params.amount * 100,
          PaymentMethod: 'full_prepayment',
          PaymentObject: 'service',
          Tax: 'none',
        },
      ],
    },
  }

  const OrderId: number = await $fetch(
    'http://max43.ru:5858/ka_uprbase2/hs/payment/v1/orderdata',
    {
      method: 'POST',
      body: JSON.stringify(orderData),
    }
  )

  orderData.OrderId = OrderId

  const responce = await useFetch('api/payment/', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })

  if (responce.data.value) {
    const resp = responce.data.value as { token: string }
    orderData = { ...orderData, ...{ Token: resp.token } }
  }

  try {
    const resp = await fetch('https://securepay.tinkoff.ru/v2/Init', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...orderData,
      }),
    })

    const responce = await resp.json()

    if (!responce.Success) {
      notify({
        title: responce.Message,
      })
      return
    }
    const windowReference = window.open()
    windowReference!.location = responce?.PaymentURL
    return responce
  } catch (error) {
    notify({
      title: 'Что то пошло не так',
    })
  }
}
