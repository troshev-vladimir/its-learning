import instance from './axios'

export type api = typeof instance

export interface Error {
  message: string
  description: string
  // code: number
}

export interface Responce {
  data: unknown
}
