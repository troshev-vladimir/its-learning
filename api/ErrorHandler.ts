import { notify } from '@kyvg/vue3-notification'
import { CustomError } from '~/api/Error'
import type { IError } from './types'

export function ErrorHandler(error: IError) {
  // notify({
  //   title: error.message,
  //   text: error.description,
  //   data: {
  //     auth: error.statusCode === 401 || error.statusCode === 403,
  //   },
  // })
  throw createError(new CustomError(error))
}
