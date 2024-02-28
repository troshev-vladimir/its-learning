import instance from './axios'

export type api = typeof instance

export interface Responce<P> {
  data: P | undefined
  message: string
  description: string
}

export interface CRUD<T> {
  getAll: () => Promise<Responce<T[]> | never>
  get: () => Promise<Responce<T> | never>
  delete: (id: string) => Promise<Responce<T> | never>
  update: (body: T) => Promise<Responce<T> | never>
  add: (body: T) => Promise<Responce<T> | never>
}

export interface ResponceError {
  error: string
  message: string
  data: any
}
