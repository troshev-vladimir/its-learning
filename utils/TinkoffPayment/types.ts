export interface InitialParams {
  amount: number
  orderData: {
    description: string
    name: string
  }

  userData?: {
    phone?: string
    email?: string
  }
}

export interface Response {
  Success: 'true' | 'false'
  ErrorCode: number
  TerminalKey: string
  Status: 'NEW' | ''
  PaymentId: number
  OrderId: string
  Amount: number
  PaymentURL: string
}
