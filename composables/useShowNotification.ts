import { useNotification } from '@kyvg/vue3-notification'
import type { CustomError } from '~/api/CustomError'
const { notify } = useNotification()

export default function useShowNotification(error: Error | CustomError | null) {
  if (error && 'statusCode' in error && error.statusCode === 401) {
    throw createError({
      message: error.message,
      statusCode: error.statusCode,
    })
  }
  onMounted(async () => {
    await nextTick()

    notify({
      text: error?.message,
      type: 'error',
    })
  })
}
