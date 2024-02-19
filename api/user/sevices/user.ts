import type { api } from '~/api/types'
import type { AbstractUserService, User } from '../types'
const userAbortController = new AbortController()
export class UserService implements AbstractUserService {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async getAll() {
    const { data } = await this.api.get('users', {
      signal: userAbortController.signal,
    })

    return data
  }

  async get(id: string) {
    const { data } = await this.api.get('users', {
      signal: userAbortController.signal,
      params: { id },
    })
    return data
  }

  async delete(id: string) {
    const { data } = await this.api.delete('users', {
      signal: userAbortController.signal,
      params: { id },
    })
    return data
  }

  async update(id: string, body: User) {
    const { data } = await this.api.put('users', {
      params: { id },
      signal: userAbortController.signal,
      body: body,
    })
    return data
  }

  async add(body: User) {
    const { data } = await this.api.put('users', {
      signal: userAbortController.signal,
      body: body,
    })
    return data
  }
}

export const abort = userAbortController.abort()
