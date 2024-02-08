import type { api } from '~/api/types'
import type { AbstractUserService, User } from '../types'
export class UserService implements AbstractUserService {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async getAll() {
    const { data } = await this.api.get('users')
    return data
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
