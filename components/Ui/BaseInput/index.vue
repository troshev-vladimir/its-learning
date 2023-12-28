<template>
  <div
    class="base-input"
    :class="`${status}`"
  >
    <p
      class="base-input__placeholder"
      :class="{ top: focused || modelValue?.length > 0 }"
    >
      {{ placeholder }}
      <span class="placeholder__required-span">
        {{ required ? '*' : '' }}
      </span>
    </p>
    <input
      ref="refInput"
      @input="(event) => $emit('update:modelValue', event.target?.value)"
      :value="modelValue"
      @focus="() => {
        focused = true
        $emit('focus', {status})
      }"
      @blur="
        () => {
          focused = false
          $emit('blur', {status})
        }
      "
      class="base-input__input"
    />
    <p class="base-input__message">{{ message ?? 'Ошибка' }}</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'blur', 'focus'])
import useUiValidation from '~/shared/composables/useUiValidation'

const props = defineProps<{
    modelValue: string
    placeholder?: string
    required?: boolean
    rules?: [(...args: any) => { status: string; message: string } | boolean]
    isValidate?: boolean
  }>(),
  { modelValue, isValidate } = toRefs(props)

const { validate } = useUiValidation(props.rules, modelValue)

let message = ref(),
  status = ref()

watch(
  [isValidate, modelValue],
  () => {
    if (isValidate.value) {
      try {
        status.value = null
        message.value = null
        validate()
      } catch (error: any) {
        let { message: errorMessage, status: errorStatus } = error
        console.log(error)

        status.value = errorStatus
        message.value = errorMessage
      }
    } else {
      status.value = null
      message.value = null
    }
  },
  { immediate: true, deep: true }
)

let focused = ref(false)
</script>

<style lang="scss">
.base-input {
  position: relative;

  &::before {
    content: '';
    display: block;
    position: relative;
    width: 100%;
    height: 17px;
  }

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
      transform: translateY(0%);
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

    &:hover {
      box-shadow: 0 0 0 2px $light-blue;
    }

    &:focus {
      box-shadow: 0 0 0 1px $light-blue;
    }
  }

  &__message {
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
    }
  }
}
</style>
