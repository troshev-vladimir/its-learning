import type { Responce } from './../types'

export interface Item {
  name: string
  quantity: number | string
  price: number | string
  vendorCode?: string
  category?: string
}

export interface TinkoffParams {
  sum: number | string
  shopId: string
  showcaseId?: string
  promoCode?: string
  integrationType?: string
  orderNumber?: string
  successURL?: string
  webhookURL?: string
  failURL?: string
  returnURL?: string
  items: Item[]
  values?: {
    contact: {
      email?: string
      fio?: {
        firstName: string
        lastName: string
        middleName?: string
      }
      mobilePhone?: string
    }
  }
  meta?: Record<string, any>
  useReturnLinks?: boolean
}

export interface AbstractPaymentService {
  get: (userId: string) => Promise<Responce<TinkoffParams> | never>
}
