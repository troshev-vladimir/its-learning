import type { User } from '~/api/user/types'
import tinkoff from '@tcb-web/create-credit'
import { getOrderId } from '../TinkoffPayment'
import type {
  InitialParams,
  InstallmentOrderData,
} from '../TinkoffPayment/types'
export interface Installment {
  sum: number
  period: number | string
  title: string
  orderNumber: string
}

const installmentValues = {
  '3': 'installment_0_0_3_4',
  '6': 'installment_0_0_6_6,5',
  '12': 'installment_0_0_12_11,5',
}

export async function buyViaInstallment(
  params: InitialParams<InstallmentOrderData>
) {
  const orderId = await getOrderId({
    fio:
      params.userData?.name ||
      '' + params.userData?.surname ||
      '' + params.userData?.thirdname ||
      '',
    email: params?.userData?.email || '',
    phone: params?.userData?.phone || '',
    purchase: params.orderData.title || '',
    price: params.amount,
    date: Math.round(Date.now() / 1000),
    method: 'installment',
  })

  tinkoff.create(
    {
      sum: params.amount,
      items: [
        {
          name: params.orderData.title || '',
          price: params.amount || 0,
          quantity: 1,
        },
      ],
      // demoFlow: DemoFlows.sms,
      promoCode:
        installmentValues[
          params.orderData.period as keyof typeof installmentValues
        ],
      shopId: 'd7836c7b-d032-493f-a2e3-ce02961930ae',
      showcaseId: 'ff69b584-4d85-4ff6-9c44-8572184eaa1d',
      webhookURL: 'https://lk.itseducation.ru/api/orderdataInstallment',
      // successURL: '',
      // failURL: '',
      // returnURL: '',
      orderNumber: orderId || '',
      values: {
        contact: {
          fio: {
            lastName: params.userData?.name || '',
            firstName: params.userData?.surname || '',
            middleName: params.userData?.thirdname || '',
          },
          mobilePhone: params.userData?.phone,
          email: params.userData?.email,
        },
      },
    },
    { view: 'modal' }
  )
}
