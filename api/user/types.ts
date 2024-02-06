import type { Responce } from './../types'
export interface User {
  name?: string
  id?: string
  photoUrl?: string
  age?: number
}

export interface AbstractUserService {
  getAll: () => Promise<Responce<User[] | never>>
  get: (id: string) => Promise<Responce<User>>
  delete: (id: string) => Promise<Responce<User>>
  add: (body: User) => Promise<Responce<User['id']>>
}
