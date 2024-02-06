import type { api, Error } from '~/api/types'
import type { AbstractUserService, User } from '../types'
import { CustomError } from '~/api/errors'
export class UserService implements AbstractUserService {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async getAll() {
    try {
      const { data } = await this.api.get('users')
      return data
    } catch (error: any) {
      throw new CustomError({
        message: error.message,
        description: 'Проблема на беке',
      })
    }
  }

  async get(id: string) {
    const { data } = await this.api.get('users', {
      params: { id },
    })
    return data
  }

  async delete(id: string) {
    const { data } = await this.api.delete('users', {
      params: { id },
    })
    return data
  }

  async update(id: string, body: User) {
    const { data } = await this.api.put('users', {
      params: { id },
      body: body,
    })
    return data
  }

  async add(body: User) {
    const { data } = await this.api.put('users', {
      body: body,
    })
    return data
  }
}
