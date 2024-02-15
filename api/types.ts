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

export interface CRUD<T> {
  getAll: () => Promise<Responce<T[]> | never>
  get: (id: string) => Promise<Responce<T> | never>
  delete: (id: string) => Promise<Responce<T> | never>
  add: (body: T) => Promise<Responce<T> | never>
}
