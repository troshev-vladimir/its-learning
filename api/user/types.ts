import type { Responce } from './../types'
export interface User {
  name?: string
  surname?: string
  thirdname?: string
  id?: string
  photoUrl?: string
  age?: number
  email: string
  city: string
  phone: string
}

export interface AbstractUserService {
  getAll: () => Promise<Responce<User[]> | never>
  get: (id: string) => Promise<Responce<User> | never>
  delete: (id: string) => Promise<Responce<User>>
  add: (body: User) => Promise<Responce<User['id']>>
}
