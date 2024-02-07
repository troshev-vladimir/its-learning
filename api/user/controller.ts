import { CustomError } from '../errors'
import type { AbstractUserService, User } from './types'

export class UserController {
  constructor(private repository: AbstractUserService) {}

  async getAll() {
    try {
      const { data: users } = await this.repository.getAll()

      if (!users || !users.length) {
        throw new CustomError({
          message: 'Пользователи не найдены',
          description: 'Проверьте запрашиваемые параметры',
          statusCode: 404,
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
          statusCode: 404,
        })
      }
    }
  }

  async get(id: string) {
    try {
      const { data: user } = await this.repository.get(id)

      if (!user) {
        throw new CustomError({
          message: 'Пользователь не найден',
          description: 'Проверьте id',
          statusCode: 404,
        })
      }

      return user
    } catch (error: any) {
      if (error && error.description) {
        throw error
      } else {
        throw new CustomError({
          message: 'Что то пошло не так',
          description: 'На фронте',
          statusCode: 404,
        })
      }
    }
  }
  // delete(id: string): Promise<User> {
  //   return this.repository.delete(id)
  // }
  // add(body: User): Promise<User['id']> {
  //   return this.repository.add(body)
  // }
}
