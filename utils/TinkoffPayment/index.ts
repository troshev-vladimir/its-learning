import { notify } from '@kyvg/vue3-notification'
import type { InitialParams, OrderData, DataForOriderId } from './types'

const TerminalKey = '1662547243585'

export async function TinkoffPayment(
  params: InitialParams
): Promise<string | undefined> {
  const orderData = {
    TerminalKey: TerminalKey,
    Amount: params.amount * 100,
    Description: params.orderData?.description || 'Оплата',
    OrderId: '',
    DATA: {
      Phone: params.userData?.phone || '',
      Email: params.userData?.email || '',
    },
    Receipt: {
      Taxation: 'osn',
      Email: params.userData?.email || '',
      Phone: '+79127177910',
      Items: [
        {
          Name: params.orderData.name || 'Оплата',
          Price: params.amount * 100,
          Quantity: 1.0,
          Amount: params.amount * 100,
          PaymentMethod: 'full_prepayment',
          PaymentObject: 'service',
          Tax: 'none',
        },
      ],
    },
    Token: '',
  }

  try {
    const orderDataWithToken = await getOrderDataWithToken(orderData, params)
    if (!orderDataWithToken) throw new Error()
    const paymentUrl = await getFullPaymentUrl(orderDataWithToken)
    if (!paymentUrl) throw new Error()

    return paymentUrl
  } catch (error: any) {
    notify({
      title: error?.message || 'Что то пошло не так',
      type: 'error',
    })
  }
}

const getFullPaymentUrl = async (orderData: OrderData) => {
  const responce = await fetch('https://securepay.tinkoff.ru/v2/Init', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...orderData,
    }),
  }).then((data) => data.json())

  if (!responce.Success) {
    throw new Error(responce.Message)
  }

  return responce?.PaymentURL
}

const getOrderDataWithToken = async (orderData: any, params: InitialParams) => {
  if (!orderData) return
  const orderId = await getOrderId({
    fio: params.userData?.fio || '',
    email: params.userData?.email || '',
    phone: params.userData?.phone || '',
    purchase: params.orderData?.description,
    price: params.amount,
    date: Math.round(Date.now() / 1000),
    method: 'full',
  })
  if (!orderId) {
    throw new Error('orderId не пришёл')
  }

  orderData.OrderId = orderId

  const token = await $fetch<string>('/api/payment/token', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })

  if (!token) {
    throw new Error('Токен оплаты не сгенерирован')
  }
  orderData.Token = token
  return orderData
}

const getOrderId = async (payload: DataForOriderId) => {
  const { data, error } = await useFetch('/api/payment/orderid', {
    body: JSON.stringify(payload),
    method: 'POST',
  })
  if (error.value) throw error.value
  if (!data.value) throw new Error('orderId не передан')
  return data.value
}
