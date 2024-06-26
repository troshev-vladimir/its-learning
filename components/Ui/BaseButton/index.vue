<template>
  <button
    class="base-button"
    :class="`${type} ${size} ${isLoading ? 'loading' : ''}`"
  >
    <font-awesome-icon
      class="base-button__icon"
      icon="fa-solid fa-up-right-from-square"
      v-if="type == 'link'"
    />
    <span class="base-button__icon" v-if="$slots['left-icon']">
      <slot name="left-icon"></slot>
    </span>
    <p class="base-button__text" v-if="$slots['default']">
      <slot />
    </p>
    <span class="base-button__icon" v-if="$slots['right-icon']">
      <slot name="right-icon"></slot>
    </span>
    <SpinnerIcon
      :style="['primary'].includes(type) ? 'light' : 'accent'"
      class="base-button__spinner"
      v-if="isLoading"
    />
  </button>
</template>

<script lang="ts" setup>
import SpinnerIcon from '~/assets/img/icons/SpinnerIcon.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    type: {
      type: String,
      default: 'primary',
      validator: (value: string) =>
        ['primary', 'secondary', 'link'].includes(value),
    },
    size: {
      type: String,
      default: 'big',
      validator: (value: string) => ['small', 'big'].includes(value),
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  }),
  { modelValue } = toRefs(props)

const isLoading = computed({
  get() {
    return modelValue.value
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss" scoped>
$blue-hover: #499bed;
$blue-active: #0253a4;

.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.loading {
    pointer-events: none;
    .base-button__text {
      visibility: hidden;
    }
  }

  &.primary {
    color: $white;
    background: $accent;

    &:hover {
      background: $blue-hover;
    }

    &:active {
      background: $blue-active;
    }

    &.disabled {
      background: $gray !important;
    }
  }

  &.secondary {
    outline: 2px solid $accent;
    outline-offset: -2px;
    color: $accent;
    background: transparent;

    &:hover {
      border-color: $blue-hover;
      color: $blue-hover;
    }

    &:active {
      border-color: $blue-active;
      color: $blue-active;
    }
  }

  &.link {
    padding: 0 !important;
    color: $accent;
    background: transparent;
    text-decoration: underline;

    &:hover {
      color: $blue-hover;
    }
    &:active {
      color: $blue-active;
    }
  }

  &.small {
    padding: 12px 24px;
    border-radius: 8px;
    line-height: 20px;
  }

  &.big {
    padding: 16px 32px;
    border-radius: 8px;
    line-height: 20px;
    font-size: 20px;

    * {
      font-size: 20px;
    }
  }
}
</style>
