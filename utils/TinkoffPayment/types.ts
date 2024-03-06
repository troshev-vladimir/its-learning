export interface InitialParams<T> {
  amount: number
  orderData: T

  userData?: {
    phone?: string
    email?: string
    name: string
    surname: string
    thirdname: string
  }
}

export interface FullOrderData {
  description: string
  name: string
}

export interface InstallmentOrderData {
  period: string
  title: string
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

export interface OrderData {
  TerminalKey: string
  Amount: number
  Description: string
  OrderId: string | number
  DATA: {
    Phone: string
    Email: string
  }
  Receipt: {
    Taxation: string
    Email: string
    Phone: string
    Items: {
      Name: string
      Price: number
      Quantity: string | number
      Amount: number
      PaymentMethod: string
      PaymentObject: string
      Tax: string
    }[]
  }
  Token: string
}

export interface DataForOriderId {
  fio?: string
  email: string
  phone: string
  purchase: string
  price: number
  date: string | Date | number
  method: 'full' | 'installment'
  utm?: string
}
