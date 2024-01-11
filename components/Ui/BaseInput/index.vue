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
import { inject } from 'vue'
import { dataFromParentForm } from '~/utils/symbols'
import type { Provide } from '../BaseForm/types'
import useValidation from '~/components/Ui/BaseForm/composables/useValidation'
import type { Validator } from '~/utils/validators/types'

export interface Props {
  modelValue?: string
  label: string
  required?: boolean
  rules?: Array<Validator>
  name: string
  message?: string
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {})

const { formData, mutateFormData } = inject(dataFromParentForm) as Provide
const currentInput = formData?.value[props.name]
let inputValue = ref(currentInput?.value || null)
const { status, validate, message } = useValidation(props.rules, inputValue)

const update = () => {
  validate()

  mutateFormData(props.name, {
    value: inputValue.value,
    status,
    message,
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
