import type { api } from '~/api/types'
import type { AbstractTestService } from '../types'
import { CustomError } from '~/api/CustomError'
const userAbortController = new AbortController()
export class TestService implements AbstractTestService {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async test(testId: string) {
    const { data } = await this.api.get('/test', {
      params: { testId: testId },
    })
    return data
  }

  async answers(testId: string) {
    const { data } = await this.api.post('/test/answers', {
      params: { testId: testId },
    })
    return data
  }
}

export const abort = userAbortController.abort
