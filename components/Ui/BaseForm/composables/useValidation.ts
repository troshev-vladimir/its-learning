import type { ValidatorResp } from '~/utils/validators/types'

export default function useValidation(localData: Ref<any>) {
  const message = ref('')
  const isSuccessfullyFilled = ref(true)

  const checkAllFields = () => {
    const fields = Object.values(localData.value) as ValidatorResp[]
    const values = fields.map((el) => el.status)
    const isExistError = values.includes('error') || fields.length === 0

    if (isExistError) {
      message.value = 'Форма заполенена не верно'
      isSuccessfullyFilled.value = false
    } else {
      message.value = ''
      isSuccessfullyFilled.value = true
    }
  }

  return {
    checkAllFields,
    message,
    isSuccessfullyFilled,
  }
}
