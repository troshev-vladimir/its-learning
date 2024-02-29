<template>
  <div class="base-input" :class="`${status}`">
    <p
      class="base-input__placeholder"
      :class="{ top: focused || inputValue?.length > 0 }"
    >
      {{ placeholder }}
      <span class="placeholder__required-span">
        {{ required ? '*' : '' }}
      </span>
    </p>
    <input
      ref="refInput"
      @input="
        (event) => (inputValue = (event.target as HTMLInputElement)?.value)
      "
      :value="inputValue"
      @focus="
        () => {
          focused = true
        }
      "
      @blur="onBlur"
      @keyup.enter="onUpKeyEnter"
      class="base-input__input"
    />
    <p class="base-input__message">{{ message ?? 'Ошибка' }}</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'enter'])
import useUiValidation from '~/shared/composables/useUiValidation'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  required?: boolean
  rules?: [(...args: any) => { status: string; message: string } | void]
  name?: string
}>()

let inputValue = ref()

const { validate, status, message } = useUiValidation(props.rules, inputValue)

let isValidate = ref(false)

let parentForm = inject('parentForm')

const onUpKeyEnter = () => {
  focused.value = false
  isValidate.value = true
  validate()
  if (!['error', 'warning'].includes(status.value)) emit('enter')
}

const onBlur = () => {
  focused.value = false
  isValidate.value = true
  validate()
  if (!['error', 'warning'].includes(status.value)) emit('blur')
}

watch(inputValue, (value) => {
  emit('update:modelValue', value)
  if (parentForm && props.name) {
    parentForm.value[props.name] = inputValue.value
  }
})

watch(
  () => inputValue.value,
  () => {
    if (isValidate.value) {
      try {
        validate()
      } catch (error: any) {
        if (process.env.NODE_ENV == 'development') console.error(error)
      }
    }
  }
)

let focused = ref(false)
</script>

<style lang="scss">
$error-shadow: #f97b7b;
$warning-shadow: #ffd857;

.base-input {
  position: relative;

  // &::before {
  //   content: '';
  //   display: block;
  //   position: relative;
  //   width: 100%;
  //   height: 17px;
  // }

  &__placeholder {
    top: calc(50% - 10px);
    left: 12px;
    position: absolute;
    margin: 0;
    pointer-events: none;
    color: $secondary;
    transition: 0.2s;

    &.top {
      color: $accent;
      font-size: 12px;
      line-height: 17px;
      top: 0;
      left: 0;
      transform: translateY(calc(-100% + -2px));
    }

    .placeholder__required-span {
      color: $error;
    }
  }

  &__input {
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
    &:focus {
      border-color: $accent;
    }

    &:hover:focus,
    &:hover {
      box-shadow: 0 0 0 2px $light-blue;
    }

    &:focus {
      box-shadow: 0 0 0 1px $light-blue;
    }
  }

  &__message {
    position: absolute;
    visibility: hidden;
    margin-top: 4px;
    font-size: 12px;
    line-height: 17px;
  }

  &.error {
    .base-input__message {
      visibility: visible;
      color: $error;
    }

    .base-input__placeholder {
      color: $error;
      top: calc(50% - 10px);
      &.top {
        color: $error;
        top: 0;
        left: 0;
      }
    }
    .base-input__input {
      border-color: $error;

      &:hover:focus {
        box-shadow: 0 0 0 2px $error-shadow;
      }

      &:hover {
        box-shadow: 0 0 0 2px $error-shadow;
      }

      &:focus {
        box-shadow: 0 0 0 1px $error-shadow;
      }
    }
  }

  &.warning {
    .base-input__message {
      visibility: visible;
      color: $warning;
    }

    .base-input__placeholder {
      color: $warning;
      top: calc(50% - 10px);

      &.top {
        color: $warning;
        top: 0;
        left: 0;
      }
    }
    .base-input__input {
      border-color: $warning;

      &:hover:focus {
        box-shadow: 0 0 0 2px $warning-shadow;
      }

      &:hover {
        box-shadow: 0 0 0 2px $warning-shadow;
      }

      &:focus {
        box-shadow: 0 0 0 1px $warning-shadow;
      }
    }
  }
}
</style>
