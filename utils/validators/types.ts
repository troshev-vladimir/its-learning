export interface ValidatorResp {
  status: 'error' | 'success' | 'warn' | 'none'
  message: string
}

export type Validator = (value: string) => ValidatorResp
