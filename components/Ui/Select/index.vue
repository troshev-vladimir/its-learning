<template>
  <div
    :class="[
      $style['baseSelect'],
      $style[`baseSelect--${validationResult.status}`],
      {
        [$style['baseSelect--open']]: isOpen,
      },
    ]"
  >
    <div :class="$style['selectContainer']" @click="toggle">
      <p :class="$style['placeholder']">
        {{ label }}
        <span v-if="required">*</span>
      </p>

      <client-only>
        <span :class="$style['icon']">
          <font-awesome-icon :icon="['fas', 'chevron-down']" color="#ccc" />
        </span>
      </client-only>
    </div>
    <ul :class="$style['dropdown']" v-if="isOpen">
      <li
        :class="[$style['option'], $style['option--selected']]"
        v-for="option in options"
        :key="option.value"
        @click="select(option.value)"
      >
        <span :class="[$style['label'], 'text-body2']">{{ option.label }}</span>
      </li>
    </ul>

    <p v-if="isError" :class="$style['message']">
      {{ validationResult.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ValidatorResp } from '~/utils/validators/types'

export interface Props {
  modelValue: string | number
  label: string
  required?: boolean
  name: string
  validationResult?: ValidatorResp
  options?: Array[{ label: string; value: string; selected: boolean }]
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  validationResult: () => ({
    status: 'success',
    message: '',
  }),
  options: [
    { label: 'asdasd', value: '1', selected: false },
    { label: '23123', value: '2', selected: false },
  ],
})
const emit = defineEmits(['update:modelValue', 'update'])
const { value, isError, update } = useFormItem(props, emit)

const currentOptions = ref(props.options)

const isOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (value: string) => {
  const selectedOption = currentOptions.value.find((el) => el.value === value)
  selectedOption.selected = !selectedOption.selected
  console.log(selectedOption)
}
</script>

<style lang="scss" module>
.baseSelect {
  position: relative;

  .placeholder {
    top: 50%;
    left: 12px;
    position: absolute;
    margin: 0;
    pointer-events: none;
    color: $secondary;
    transition: 0.2s;
    transform: translate(0, -50%);
  }

  .selectContainer {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 10px 12px;
    border: 1px solid $secondary;
    border-radius: 8px;
    background: $white;
    font-size: $md;
    transition: 0.2s;

    &:hover,
    &:focus,
    &:hover:focus,
    &:hover {
      box-shadow: 0 0 0 2px $light-blue;
    }

    &:focus {
      -webkit-box-shadow: 0 0 0 1px $light-blue;
      box-shadow: 0 0 0 1px $light-blue;
    }

    .icon {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translate(0, -50%);
      transition: all ease 0.2s;
    }
  }

  &--open {
    .selectContainer {
      .placeholder {
        color: $accent;
        font-size: 12px;
        line-height: 17px;
        top: 0;
        left: 0;
        transform: translateY(calc(-100% + -2px));
      }

      .icon {
        transform: translate(0, -50%) rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    width: 100%;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 3px 12px 0px rgba(204, 204, 204, 0.25);
    z-index: 2;
    overflow: hidden;

    .option {
      padding: 8px 16px;
      cursor: pointer;
      transition: all ease 0.4s;

      &:not(:last-child) {
        border-bottom: 1px solid var(--gray-300, #ccc);
      }

      &:hover {
        background: var(--gray-100, #eee);
        cursor: poniter;
        transition: all ease 0.2s;
      }

      &--selected {
        background: rgba(0, 117, 235, 0.4);

        &:hover {
          background: rgba(0, 117, 235, 0.2);
        }
      }

      .label {
      }
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
    }
  }
}
</style>
