import { CustomError } from '../CustomError'
import type { AbstractEventService } from './types'
import type { Event } from './types'

export class EventController {
  constructor(private repository: AbstractEventService) {}

  async getAll(): Promise<Event[]> {
    const result = await this.repository.getAll()
    if (!result.data)
      throw new CustomError('NOT_FOUND', 404, 'События не найдены')
    return result.data
  }
}
