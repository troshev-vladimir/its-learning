import { CustomError } from '~/api/CustomError'
import type { AbstractUserService, AuthorizeRequest, User } from './types'

export class UserController {
  constructor(private repository: AbstractUserService) {}

  async getAll() {
    const { data: users } = await this.repository.getAll()

    if (!users || !users.length) {
      throw new CustomError('NOT_FOUND', 404, 'Пользователи не найдены')
    }

    return users
  }

  async get() {
    const { data: user } = await this.repository.get()

    if (!user) {
      throw new CustomError('NOT_FOUND', 404, 'Пользователь не найден')
    }

    return user
  }

  async auth(params: AuthorizeRequest) {
    const { data } = await this.repository.auth(params)
    if (!data) throw new CustomError('AUTH_ERR', 401)
    return data
  }

  async update(body: User) {
    return this.repository.update(body)
  }
  // delete(id: string): Promise<User> {
  //   return this.repository.delete(id)
  // }
  // add(body: User): Promise<User['id']> {
  //   return this.repository.add(body)
  // }
}
