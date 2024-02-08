import instance from './axios'

export type api = typeof instance

export interface IError {
  message: string
  description: string
  statusCode: number
}

export interface Responce<P> {
  data: P | undefined
  message: string
  description: string
  success: boolean
}
