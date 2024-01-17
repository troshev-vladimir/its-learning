import type { Validator, ValidatorResp } from '~/utils/validators/types'
export default function useValidation(
  rules: Validator[] | undefined,
  validation: ValidatorResp | undefined
) {
  const status = ref<ValidatorResp['status']>(validation?.status || 'success')
  const message = ref(validation?.message || 'success')

  const validate = (value: string) => {
    status.value = 'success'
    message.value = ''

    if (!rules || !rules.length) return

    for (let index = 0; index < rules.length; index++) {
      const result = rules[index](value)
      status.value = result.status
      message.value = result.message

      if (status.value === 'error') break
    }
  }

  return { validate, status, message }
}
