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

export interface AuthorizeRequest {
  login?: string
  password?: string
}

export interface AuthorizeResponce {
  id: string
}

export interface AbstractUserService extends CRUD<User> {
  auth: (params: AuthorizeRequest) => Promise<Responce<AuthorizeResponce>>
}
