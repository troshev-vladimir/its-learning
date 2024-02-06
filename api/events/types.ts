import type AbstractService from '../types'

export default interface Event {
  date: Date | string
  title: string
  description: string
  link: string
}

export interface AbstractEventService extends AbstractService<Event> {
  getAll: () => Promise<Event>
}
