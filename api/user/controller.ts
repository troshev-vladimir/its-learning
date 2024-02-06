import { CustomError } from '../errors'
import type { AbstractUserService, User } from './types'

export class UserController {
  constructor(private repository: AbstractUserService) {}

  async getAll(): Promise<User[] | never> {
    try {
      const users = await this.repository.getAll()

      if (!users || !users.length) {
        throw new CustomError({
          message: 'Пользователи не найдены',
          description: 'Проверьте запрашиваемые параметры',
        })
      }

      return users
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      } else {
        throw new CustomError({
          message: 'Что то пошло не так',
          description: 'На фронте',
        })
      }
    }
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
