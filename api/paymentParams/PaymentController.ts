import { CustomError } from '../Error'
import type { AbstractPaymentService, ParamsRequest } from './types'

export class PaymentController {
  constructor(private repository: AbstractPaymentService) {}

  async getPaymentParams(params: ParamsRequest) {
    const { data } = await this.repository.get(params)
    if (!data) {
      throw new CustomError({
        message: 'Данные вернулись пустые',
        description: 'asd',
        statusCode: 404,
      })
    }

    return data.paymentParams
  }
}
