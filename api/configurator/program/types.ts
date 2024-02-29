export interface Program {
  id: string
  name: string
  futureSalary: number
  description: string
  advantages: string[]
  period: number
  price: {
    actual: number
    withDiscount: number
  }
  installment: {
    actual: number
    withDiscount: number
  }
  burnout: number
  salaryAddition: number
  discount: number
  discountApplyed: boolean
  linkToProgram: string
  linkToContract: string
  linkToContractAddition: string
}

export interface getProgramsRequest {
  promocode: string
  id: string
  token: string
}
