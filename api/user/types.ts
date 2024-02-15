import type { CRUD, Responce } from './../types'
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

export interface AbstractUserService extends CRUD<User> {
  // testExtraMethod: () => null
}
