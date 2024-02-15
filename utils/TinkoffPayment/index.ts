import { notify } from '@kyvg/vue3-notification'
import type { InitialParams, OrderData, DataForOriderId } from './types'

const TerminalKey = '1662547243585'

export async function TinkoffPayment(
  params: InitialParams
): Promise<string | undefined> {
  const getOrderData = (): OrderData | void => {
    return {
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
  }

  const getOrderDataWithToken = async () => {
    const orderData = getOrderData()

    if (!orderData) return
    const orderId = await getOrderId({
      email: params.userData?.email || '',
      phone: params.userData?.phone || '',
      purchase: params.orderData?.description,
      price: params.amount,
      date: Date.now(),
      method: 'full',
    })

    orderData.OrderId = orderId

    const token = await $fetch<string>('/api/payment/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })

    if (!token) {
      throw new Error('Токен оплаты не сгенерирован')
    }
    orderData.Token = token
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

const getOrderId = async (data: DataForOriderId) => {
  console.log(btoa('Http_Service_Test:XI5su3ce'))

  try {
    const resp = await fetch(
      'https://max43.ru:12244/ka_uprbase2/hs/payment/v1/orderdata',
      {
        headers: {
          Authorization: 'Basic ' + btoa('Http_Service_Test:XI5su3ce'),
        },
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(data),
      }
    )
    const { orderId } = await resp.json()

    if (!orderId) throw new Error('orderId не передан')
    return orderId
  } catch (error) {
    console.log(error)
  }
}
