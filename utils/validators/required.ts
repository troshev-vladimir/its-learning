import type { ValidatorResp } from '~/utils/validators/types'

export function required() {
  return (value: string) => {
    const validation: ValidatorResp = {
      status: 'success',
      message: 'Всё ок',
    }

    if (value == null || (typeof value == 'string' && value.length <= 0)) {
      validation.status = 'error'
      validation.message = 'Это поле обязательно'
    }

    return validation
  }
}
