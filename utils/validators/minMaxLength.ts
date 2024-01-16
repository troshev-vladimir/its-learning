import type { ValidatorResp } from '~/utils/validators/types'

export function minMaxLength(minLength: number, maxLength: number) {
  return (value: string) => {
    const validation: ValidatorResp = {
      status: 'success',
      message: 'Всё ок',
    }

    return validation
  }
}
