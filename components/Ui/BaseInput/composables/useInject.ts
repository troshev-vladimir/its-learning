import { inject } from 'vue'
import { dataFromParentForm } from '~/utils/symbols'
import type { Provide } from '~/components/Ui/BaseForm/types'
import type { Props } from '../index.vue'

export default function useInject(props: Props, emit: Function) {
  const { formData, mutateFormData } = inject(dataFromParentForm, {}) as Provide

  const updateParentFormData = (params: Record<string, string>) => {
    if (mutateFormData && typeof mutateFormData === 'function') {
      mutateFormData(props.name, {
        value: params.value,
        status: params.status,
        message: params.message,
      })
    }
    emit('update:modelValue', params.value)
  }

  return { updateParentFormData, formData }
}
