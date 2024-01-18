<template>
  <label
    :class="[
      $style.baseCheckbox,
      $style[`baseCheckbox--${validationResult.status}`],
    ]"
  >
    <input
      v-model="value"
      :class="$style.nativeInput"
      type="checkbox"
      :name="props.name"
      @change="update"
    />
    <span :class="[$style.container]">
      <client-only>
        <font-awesome-icon :class="$style.icon" icon="fa-solid fa-check" />
      </client-only>
    </span>
    <slot>
      <span>{{ props.label }}</span>
    </slot>
    <sup v-if="required">*</sup>

    <p v-if="isError" :class="$style['message']">
      {{ props.validationResult.message }}
    </p>
  </label>
</template>

<script lang="ts" setup>
import type { ValidatorResp } from '~/utils/validators/types'

interface Props {
  modelValue: string | number | boolean
  label: string
  required?: boolean
  name: string
  validationResult?: ValidatorResp
  rootClass?: string | string[]
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  validationResult: () => ({
    status: 'success',
    message: '',
  }),
})
const emit = defineEmits(['update:modelValue', 'update'])

const { value, isError, update } = useFormItem(props, emit)
</script>

<style lang="scss" module>
.baseCheckbox {
  $root: &;
  transition: 0.2s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;

  &:hover {
    .container {
      border-color: $accent;
      box-shadow: 0 0 0 2px $light-blue;
    }
  }

  .container {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    border: 1px solid $gray;
    border-radius: 4px;
    position: relative;
    margin-right: 4px;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      color: $accent;
      display: none;
    }
  }

  .nativeInput {
    display: none;
    &:checked {
      color: red;
      & ~ .container {
        .icon {
          display: block;
        }
      }
    }
  }

  .message {
    position: absolute;
    font-size: 12px;
    margin-top: 2px;
    line-height: 17px;
    bottom: 0;
    transform: translate(0, 100%);
  }

  &--error {
    .message {
      color: $error;
    }

    .placeholder {
      color: $error !important;
    }

    .container {
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
    }
  }
}
</style>
