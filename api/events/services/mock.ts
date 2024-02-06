import type Event from './../types'
export class EventMockService {
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
