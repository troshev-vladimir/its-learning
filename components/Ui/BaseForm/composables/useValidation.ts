import type { Validator, ValidatorResp } from '~/utils/validators/types'
export default function useValidation(
  rules: Validator[] | undefined,
  value: Ref<string>
) {
  const status = ref<null | ValidatorResp['status']>(null)
  const message = ref('')

  const validate = () => {
    if (!rules || !rules.length) return

    for (let index = 0; index < rules.length; index++) {
      const result = rules[index](value.value)
      status.value = result.status
      message.value = result.message
    }
  }

  return { validate, status, message }
}
