export default interface Event {
  date: Date | string
  title: string
  description: string
  link: string
}

export interface AbstractEventService {
  getAll: () => Promise<Event>
}
