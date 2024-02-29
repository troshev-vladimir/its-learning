import type { AbstractEventService } from './types'

export class EventController {
  constructor(private repository: AbstractEventService) {}

  getAll() {
    return this.repository.getAll()
  }
}
