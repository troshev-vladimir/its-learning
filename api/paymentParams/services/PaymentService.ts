import type { api } from '~/api/types'
import type { AbstractPaymentService } from '../types'

export class PaymentService implements AbstractPaymentService {
  constructor(private api: api) {}

  async get(userId: string) {
    const { data } = await this.api.get('hs/payment/v1/orderdata', {
      params: {
        userId,
      },
    })

    return data
  }
}
