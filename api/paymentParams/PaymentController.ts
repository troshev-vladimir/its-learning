import type { AbstractPaymentService } from './types'

export class PaymentController {
  constructor(private repository: AbstractPaymentService) {}

  getPaymentParams(userId: string) {
    return this.repository.get(userId)
  }
}
