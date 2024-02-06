import type { AbstractUserService, User } from './types'

export default class UserController {
  constructor(private repository: AbstractUserService) {}

  getAll(): Promise<User[]> {
    return this.repository.getAll()
  }
  get(id: string): Promise<User> {
    return this.repository.get(id)
  }
  delete(id: string): Promise<User> {
    return this.repository.delete(id)
  }
  add(body: User): Promise<User['id']> {
    return this.repository.add(body)
  }
}
