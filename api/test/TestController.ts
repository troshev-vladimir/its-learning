import { CustomError } from '~/api/CustomError'
import type { AbstractTestService, Answers } from './types'

export class TestController {
  constructor(private repository: AbstractTestService) {}

  async getTest(id: string) {
    const { data: test } = await this.repository.test(id)

    if (!test) {
      throw new CustomError('NOT_FOUND', 404, 'Тест не найден')
    }

    return test
  }
  async saveAnswers(testId: string, answers: Answers) {
    const { data: result } = await this.repository.answers(testId, answers)
    if (!result) {
      throw new CustomError('NOT_FOUND', 404, 'Урок не найден')
    }
    return result
  }
}
