import type { Responce } from '~/api/types'

export interface Event {
  date: string
  title: string
  description: string
  link?: string
}

export interface AbstractEventService {
  getAll: () => Promise<Responce<Event[]>>
}
