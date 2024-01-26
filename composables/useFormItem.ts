import { computed } from 'vue'

export default function useFromItem(
  props: Record<string, any>,
  emit: Function
) {
  const localValue = computed({
    get() {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.name)
      } else {
        return props.modelValue
      }
    },
    set(value: typeof props.modelValue) {
      console.log(value)

      if (Array.isArray(props.modelValue)) {
        value
          ? emit('update:modelValue', [...props.modelValue, props.name])
          : emit(
              'update:modelValue',
              props.modelValue.filter((el) => el !== props.name)
            )
      } else {
        emit('update:modelValue', value)
      }
    },
  })

  const isError = computed(() => {
    return props.validationResult.status === 'error'
  })

  const update = () => {
    emit('update')
  }

  return {
    localValue,
    isError,
    update,
  }
}