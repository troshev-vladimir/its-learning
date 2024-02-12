import type { api } from '~/api/types'
import type { AbstractPaymentService, ParamsRequest } from '../types'

export class PaymentService implements AbstractPaymentService {
  constructor(private api: api) {}

  async get(params: ParamsRequest) {
    const { data } = await this.api.get('hs/payment/v1/orderdata', {
      params: params,
    })

    return data
  }
}
