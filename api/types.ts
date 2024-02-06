import instance from './axios'

export type api = typeof instance

export default abstract class AbstractService<T> {
  constructor(api: typeof instance) {}
}

export interface Error {
  message: string
  code: number
  type: string
}

export interface Responce {
  data: unknown
}
