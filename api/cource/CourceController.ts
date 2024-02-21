import { CustomError } from '~/api/CustomError'
import type { AbstractCourceService } from './types'

export class CourceController {
  constructor(private repository: AbstractCourceService) {}

  async getCource(id: string) {
    const { data: cource } = await this.repository.cource(id)

    if (!cource) {
      throw new CustomError('NOT_FOUND', 404, 'Курс не найден')
    }

    return cource
  }

  async getLesson(id: string) {
    const { data: lesson } = await this.repository.cource(id)

    if (!lesson) {
      throw new CustomError('NOT_FOUND', 404, 'Урок не найден')
    }

    return lesson
  }
}
