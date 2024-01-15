<template>
  <component
    :is="tag"
    class="base-button"
    :class="`${type} ${size} ${isLoading ? 'loading' : ''}`"
  >
    <client-only>
      <font-awesome-icon
        class="base-button__icon"
        icon="fa-solid fa-up-right-from-square"
        v-if="type == 'link'"
      />
    </client-only>
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
  </component>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue'
import SpinnerIcon from '../../../assets/img/icons/SpinnerIcon.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    type: {
      type: String,
      default: 'primary',
      validator: (value: string) =>
        ['primary', 'secondary', 'boarded', 'link'].includes(value),
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
    tag: {
      type: String,
      default: 'button',
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
      background: $cornflower-blue;
    }

    &:active {
      background: $cobalt;
    }

    &.disabled {
      background: $gray !important;
    }
  }

  &.secondary {
    color: $accent;
    background: $white;

    &:hover {
      color: $cornflower-blue;
    }

    &:active {
      color: $cobalt;
    }

    &.disabled {
      color: $gray !important;
    }
  }

  &.boarded {
    outline: 2px solid $accent;
    outline-offset: -2px;
    color: $accent;
    background: transparent;

    &:hover {
      border-color: $cornflower-blue;
      color: $cornflower-blue;
    }

    &:active {
      border-color: $cobalt;
      color: $cobalt;
    }
  }

  &.link {
    padding: 0 !important;
    color: $accent;
    background: transparent;
    text-decoration: underline;

    &:hover {
      color: $cornflower-blue;
    }
    &:active {
      color: $cobalt;
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
