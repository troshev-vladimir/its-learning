import type AbstractService from '../types'

export interface User {
  name: string
  id: string
  photoUrl: string
  age: number
}

export interface AbstractUserService extends AbstractService<User> {
  getAll: () => Promise<User[]>
  get: (id: string) => Promise<User>
  delete: (id: string) => Promise<User>
  add: (body: User) => Promise<User['id']>
}
