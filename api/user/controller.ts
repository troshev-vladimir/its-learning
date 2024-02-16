import { CustomError } from '~/api/CustomError'
import type { AbstractUserService } from './types'

export class UserController {
  constructor(private repository: AbstractUserService) {}

  async getAll() {
    const { data: users } = await this.repository.getAll()

    if (!users || !users.length) {
      throw new CustomError('NOT_FOUND', 404, 'Пользователи не найдены')
    }

    return users
  }

  async get(id: string) {
    const { data: user } = await this.repository.get(id)

    if (!user) {
      throw new CustomError('NOT_FOUND', 404, 'Пользователь не найден')
    }

    return user
  }
  // delete(id: string): Promise<User> {
  //   return this.repository.delete(id)
  // }
  // add(body: User): Promise<User['id']> {
  //   return this.repository.add(body)
  // }
}
