import AbstractService, { type api } from '../../types'
import type Event from './../types'
export class EventService implements AbstractService<Event> {
  api: api

  constructor(http: api) {
    this.api = http
  }

  async getAll() {
    const { data } = await this.api.get('events', {})
    return data
  }
}
