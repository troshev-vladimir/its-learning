import type { api } from '~/api/types'
import type { AbstractCourceService, Cource } from '../types'
import { CustomError } from '~/api/CustomError'
const userAbortController = new AbortController()
export class CourceService implements AbstractCourceService {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async courcePreview(userId: string) {
    const { data } = await this.api.get('users', {
      signal: userAbortController.signal,
      params: { userId },
    })
    return data
  }

  async cource(userId: string) {
    const { data } = await this.api.get('users', {
      signal: userAbortController.signal,
      params: { userId },
    })
    return data
  }

  async lesson(lessonId: string) {
    const { data } = await this.api.get('cource', {
      params: { lessonId },
    })
    return data
  }
}

export const abort = userAbortController.abort
