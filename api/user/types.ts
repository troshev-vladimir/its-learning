import type { CRUD, Responce } from './../types'
export interface User {
  name?: string
  surname?: string
  thirdname?: string
  photoUrl?: string
  age?: number
  email: string
  city: string
  phone: string
  degree?: number
  releaseYear?: string
  vuz?: string
  faculty?: string
  learnArea?: string
  birthdate?: string
  birthPlace?: string
  havExperience: boolean
  graduates?: string[]
  additionalGraduates?: string[]
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
