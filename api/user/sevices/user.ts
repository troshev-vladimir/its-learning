import type { api } from '~/api/types'
import type { AbstractUserService, AuthorizeRequest, User } from '../types'
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

  async get() {
    try {
      const { data } = await this.api.get('users', {
        signal: userAbortController.signal,
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

  async update(body: User) {
    const { data } = await this.api.put('users', {
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

  async auth(params: AuthorizeRequest) {
    const { data } = await this.api.post('auth', params)
    return data
  }
}

export const abort = userAbortController.abort
