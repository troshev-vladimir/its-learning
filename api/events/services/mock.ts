import AbstractEventService from '../../types'
import type Event from './../types'
export class EventMockService implements AbstractEventService<Event> {
  constructor() {}

  async getAll() {
    return {
      date: '01.01.2024',
      title: 'string',
      description: 'string',
      link: 'string',
    }
  }
}
