import type { ValidatorResp } from '~/utils/validators/types'

export function minMaxLength(minLength: number, maxLength: number) {
  return (value: string) => {
    const validation: ValidatorResp = {
      status: 'success',
      message: 'Всё ок',
    }

    if (value.length >= minLength && value.length <= maxLength) {
      return validation
    } else {
      validation.status = 'error'

      if (minLength == maxLength) {
        validation.message = `Длина значения минимум ${minLength} символов`
        return validation
      } else {
        validation.message = `Длина не менее ${minLength} и не более ${maxLength}`
        return validation
      }
    }
  }
}
