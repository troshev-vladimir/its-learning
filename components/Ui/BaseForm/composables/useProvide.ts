import type { Provide } from '../types'
import { dataFromParentForm } from '~/utils/symbols'

export default function useProvide(
  localData: Ref<any>,
  isSuccessfullyFilled: Ref<boolean>
) {
  const changeFormData = (elName: keyof typeof localData.value, value: any) => {
    localData.value[elName] = value
    isSuccessfullyFilled.value = true
  }

  provide(dataFromParentForm, {
    formData: readonly(localData),
    mutateFormData: changeFormData,
  } as Provide)

  return {
    isSuccessfullyFilled,
  }
}
