export interface ValidatorResp {
  status: 'error' | 'success'
  message: string
}

export type Validator = (value: string) => ValidatorResp
