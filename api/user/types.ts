import type { CRUD, Responce } from './../types'
import type { TargetTestStatus } from '~/api/test'
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
  // targetTestStatus: TargetTestStatus
  orderId?: string
  startStatus?: 'started' | 'stopped' | 'paused'
}

export interface AuthorizeRequest {
  login?: string
  password?: string
}

export interface AuthorizeResponce {
  id: string
}

export interface AbstractUserService extends CRUD<User> {
  setStartStatus: (status: User['startStatus']) => Promise<Responce<string>>
  auth: (params: AuthorizeRequest) => Promise<Responce<AuthorizeResponce>>
}
