import type { api } from '~/api/types'
import type { AbstractCourceService, Cource } from '../types'
import { CustomError } from '~/api/CustomError'

const userAbortController = new AbortController()

export class CourceMockService implements AbstractCourceService {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async courcePreview(userId: string) {
    return {}
  }

  async cource() {
    return {
      data: {
        title: 'title',
        academ: {
          state: true,
          date: '01.02.1999',
        },
        trial: {
          state: true,
          days: 20,
        },
        averageScore: 23,
        isStarted: true,
        startDate: '01.02.1999',
        isEnded: false,
        planEndDate: '01.02.1999',
        realEndDate: '01.02.1999',
        docs: [
          {
            name: 'link',
            link: 'asdasd',
          },
        ],
        diplomas: [
          {
            name: 'link',
            link: 'asdasd',
          },
        ],
        score: 12,
        shouldPay: true,
        statistics: {
          tests: {
            score: 1,
            total: 3,
          },
          video: {
            score: 1,
            total: 3,
          },
          tasks: {
            score: 1,
            total: 3,
          },
        },
        modules: [
          {
            id: 'id',
            title: 'string',
            status: 'active',
            averageScore: 123,
            lessonsPreviews: {
              count: 2,
              passed: 1,
              value: [
                {
                  id: 'string',
                  title: 'title',
                  passed: false,
                  edgeDate: '01.02.1999',
                },
              ],
            },
          },
        ],
        couchAwilableTill: '01.02.1999',
      },
      message: 'string',
      description: 'string',
    }
  }

  async lesson(lessonId: string) {
    const { data } = await this.api.get('cource', {
      params: { lessonId },
    })
    return data
  }
}

export const abort = userAbortController.abort
