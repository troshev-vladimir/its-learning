import { CustomError } from '../Error'
import type { AbstractPaymentService } from './types'

export class PaymentController {
  constructor(private repository: AbstractPaymentService) {}

  async getPaymentParams(userId: string) {
    const { data } = await this.repository.get(userId)
    if (!data) {
      throw new CustomError({
        message: 'Данные вернулись пустые',
        description: 'asd',
        statusCode: 404,
      })
    }

    return data
  }
}
