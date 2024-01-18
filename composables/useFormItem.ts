import { defineEmits, computed } from 'vue'

export default function useFromItem(
  props: Record<string, any>,
  emit: Function
) {
  const value = computed({
    get() {
      return props.modelValue
    },
    set(value: string | number | boolean) {
      emit('update:modelValue', value)
    },
  })

  const isError = computed(() => {
    return props.validationResult.status === 'error'
  })

  const update = () => {
    emit('update')
  }

  return {
    value,
    isError,
    props,
    update,
  }
}
