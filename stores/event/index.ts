import { api } from '~/api/bootstrap'
import type { Event } from '~/api/events/index'

export const useEventStore = defineStore('event', () => {
  const events = ref<Event[]>([])
  const isEventsLoading = ref<boolean>(false)

  const getAll = async (): Promise<void> => {
    if (isEventsLoading.value) return
    try {
      isEventsLoading.value = true
      events.value = await api.event.getAll()
    } finally {
      isEventsLoading.value = false
    }
  }

  return { events, isEventsLoading, getAll }
})
