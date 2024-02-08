import { CustomError } from '~/api/Error'
import { ErrorHandler } from '../ErrorHandler'
import type { AbstractUserService } from './types'

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
    } catch (error: any) {
      ErrorHandler(error)
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
      ErrorHandler(error)
    }
  }
  // delete(id: string): Promise<User> {
  //   return this.repository.delete(id)
  // }
  // add(body: User): Promise<User['id']> {
  //   return this.repository.add(body)
  // }
}
