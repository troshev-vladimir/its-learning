import type { Responce } from '~/api/types'

export interface Event {
  date: string
  title: string
  description: string
  link?: string
  external?: boolean
}

export interface AbstractEventService {
  getAll: () => Promise<Responce<Event[]>>
}
