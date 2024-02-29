<template>
  <label
    :class="[
      $style.baseCheckbox,
      $style[`baseCheckbox--${validationResult.status}`],
      {
        [$style[`baseCheckbox--disabled`]]: disabled,
      },
    ]"
  >
    <input
      :id="props.name"
      v-model="localValue"
      :class="$style.nativeInput"
      type="checkbox"
      :name="props.name"
      @change="update"
    />
    <span :class="[$style.box]">
      <client-only>
        <font-awesome-icon
          :class="$style.icon"
          icon="fa-solid fa-check"
          color="#fff"
        />
      </client-only>
    </span>

    <div :class="[$style.label]">
      <slot>
        <span>{{ props.label }}</span>
      </slot>
    </div>
    <sup v-if="required">*</sup>

    <p v-if="isError" :class="$style['message']">
      {{ props.validationResult.message }}
    </p>
  </label>
</template>

<script lang="ts" setup>
import type { ValidatorResp } from '~/utils/validators/types'

interface Props {
  modelValue: string | number | string[] | boolean
  label?: string
  required?: boolean
  name: string
  validationResult?: ValidatorResp
  rootClass?: string | string[]
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  validationResult: () => ({
    status: 'success',
    message: '',
  }),
})
const emit = defineEmits(['update:modelValue', 'update'])

const { localValue, isError, update } = useFormItem(props, emit)
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
    .box {
      border-color: $accent;
      box-shadow: 0 0 0 2px $light-blue;
    }
  }

  .box {
    width: 20px;
    height: 20px;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: $white;
    border: 1px solid $gray;
    border-radius: 4px;
    position: relative;
    margin-right: 4px;
    margin-left: 0;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
      color: $accent;
      display: none;
    }
  }

  .nativeInput {
    display: none;
    &:checked {
      color: red;
      & ~ .box {
        background-color: $accent;
        .icon {
          display: block;
          color: #fff;
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

    .box {
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

  &--disabled {
    pointer-events: none;

    .nativeInput {
      &:checked {
        & ~ .box {
          background-color: $secondary;
          .icon {
            color: $accent;
          }
        }
      }
    }

    .message,
    sup,
    .label {
      color: $secondary;
    }
  }
}
</style>
