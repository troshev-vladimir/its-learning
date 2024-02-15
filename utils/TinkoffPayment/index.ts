import { notify } from '@kyvg/vue3-notification'
import type { InitialParams, OrderData, Response } from './types'

const TerminalKey = '1662547243585'

export async function TinkoffPayment(
  params: InitialParams
): Promise<string | undefined> {
  const getOrderData = (): OrderData | void => {
    return {
      TerminalKey: TerminalKey,
      Amount: params.amount * 100,
      Description: params.orderData?.description || 'Оплата',
      OrderId: String(Math.random()),
      DATA: {
        Phone: localStorage.getItem('userPhone') || '',
        Email: localStorage.getItem('userEmail') || '',
      },
      Receipt: {
        Taxation: 'osn',
        Email: localStorage.getItem('userEmail') || '',
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
  }

  const getOrderDataWithToken = async () => {
    const orderData = getOrderData()

    if (!orderData) return

    const data = await $fetch<string>('/api/payment/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })

    if (!data) {
      throw new Error('Токен оплаты не сгенерирован')
    }
    orderData.Token = data
    return orderData
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

  try {
    const orderData = await getOrderDataWithToken()
    if (!orderData) throw new Error()
    const paymentUrl = await getFullPaymentUrl(orderData)
    if (!paymentUrl) throw new Error()

    return paymentUrl
  } catch (error: any) {
    notify({
      title: error?.message || 'Что то пошло не так',
      type: 'error',
    })
  }
}
