export interface User {
  name: string
  id: string
  photoUrl: string
  age: number
}

export interface AbstractUserService {
  getAll: () => Promise<User[] | never>
  get: (id: string) => Promise<User>
  delete: (id: string) => Promise<User>
  add: (body: User) => Promise<User['id']>
}
