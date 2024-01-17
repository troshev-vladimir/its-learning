<template>
  <div :class="[$style['base-input'], $style[`base-input--${status}`]]">
    <input
      ref="refInput"
      v-model="inputValue"
      @blur="update"
      @keyup.enter="update"
      :name="name"
      :class="$style['native-input']"
      placeholder=""
    />
    <p :class="$style['placeholder']">
      {{ label }}
      <span v-if="required">*</span>
    </p>
    <p v-if="isError" :class="$style['message']">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import useInject from './composables/useInject'
import useValidation from './composables/useValidation'
import type { Validator, ValidatorResp } from '~/utils/validators/types'

export interface Props {
  modelValue?: string
  label: string
  required?: boolean
  rules?: Array<Validator>
  name: string
  validationResult?: ValidatorResp
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  validationResult: () => ({
    status: 'success',
    message: '',
  }),
})
const emit = defineEmits(['update:modelValue'])

const { status, validate, message } = useValidation(
  props.rules,
  props.validationResult
)
const { updateParentFormData, formData } = useInject(props, emit)

const currentForm = formData
let inputValue = computed({
  get() {
    return typeof props.modelValue === 'string'
      ? props.modelValue
      : currentForm.value[props.name]?.value
  },
  set(value: string) {
    validate(inputValue.value)
    updateParentFormData({
      value,
      status: status.value,
      message: message.value,
    })
  },
})

const update = () => {
  validate(inputValue.value)
  updateParentFormData({
    value: inputValue.value,
    status: status.value,
    message: message.value,
  })
}

watch(inputValue, () => {
  if (isError.value) {
    update()
  }
})

const isError = computed(() => {
  return status.value === 'error'
})

onMounted(() => {
  updateParentFormData({
    value: inputValue.value,
    status: props.required ? 'error' : 'success',
    message: props.required ? 'Поле обязательное' : message.value,
  })
})

defineExpose({ update })
</script>

<style lang="scss" module>
.base-input {
  position: relative;

  .native-input:focus ~ .placeholder,
  .native-input:not(:placeholder-shown) ~ .placeholder {
    color: $accent;
    font-size: 12px;
    line-height: 17px;
    top: 0;
    left: 0;
    transform: translateY(calc(-100% + -2px));
  }

  .placeholder {
    top: calc(50% - 10px);
    left: 12px;
    position: absolute;
    margin: 0;
    pointer-events: none;
    color: $secondary;
    transition: 0.2s;
  }

  .native-input {
    width: 100%;
    height: 100%;
    padding: 10px 12px;
    border: 1px solid $secondary;
    outline: none;
    border-radius: 8px;
    background: $white;
    font-size: $md;
    transition: 0.2s;

    &:hover,
    &:focus,
    &:-webkit-autofill,
    &:-webkit-autofill:focus {
      border-color: $accent;
    }

    &:hover:focus,
    &:-internal-autofill-selected:hover,
    &:hover {
      box-shadow: 0 0 0 2px $light-blue;
    }

    &:focus,
    &:-internal-autofill-selected:focus {
      -webkit-box-shadow: 0 0 0 1px $light-blue;
      box-shadow: 0 0 0 1px $light-blue;
    }
  }

  .message {
    position: absolute;
    font-size: 12px;
    margin-top: 2px;
    line-height: 17px;
  }

  &--error {
    .message {
      color: $error;
    }

    .placeholder {
      color: $error !important;
    }

    .native-input {
      border-color: $error;

      &:hover:focus {
        box-shadow: 0 0 0 2px $error;
      }

      &:hover {
        box-shadow: 0 0 0 2px $error;
        border-color: $red;
      }

      &:focus {
        box-shadow: 0 0 0 1px $error;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:focus,
      &:-internal-autofill-selected:focus,
      &:-internal-autofill-selected {
        -webkit-box-shadow: 0 0 0 2px $error;
        -webkit-text-fill-color: #000;
      }
    }
  }
}
</style>
