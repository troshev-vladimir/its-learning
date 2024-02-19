import type { api } from '~/api/types'
import type { AbstractUserService, User } from '../types'
import { CustomError } from '~/api/CustomError'
const userAbortController = new AbortController()
export class UserService implements AbstractUserService {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async getAll() {
    const { data } = await this.api.get('users', {})

    return data
  }

  async get(id: string) {
    try {
      const { data } = await this.api.get('users', {
        signal: userAbortController.signal,
        params: { id },
      })
      return data
    } catch (error) {
      // @ts-ignore
      if (this.api.isCancel(error)) {
        throw new CustomError('is cancled', 400, error)
      } else {
        throw error
      }
    }
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

export const abort = userAbortController.abort
