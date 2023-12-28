<template>
  <button
    class="base-button"
    :class="`${type} ${size} ${isLoading ? 'loading' : ''}`"
  >
    <p class="base-button__text">
      <slot />
    </p>
    <SpinnerIcon
      :style="['primary'].includes(type) ? 'light' : 'accent'"
      class="base-button__spinner"
      v-if="isLoading"
    />
  </button>
</template>

<script lang="ts" setup>
import SpinnerIcon from '~/assets/img/icons/SpinnerIcon.vue'

defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value),
  },
  size: {
    type: String,
    default: 'big',
    validator: (value: string) => ['small', 'big'].includes(value),
  },
})

const isLoading = ref(false)

const setLoadingStatus = (status: boolean) => {
  isLoading.value = status
}

defineExpose({ setLoadingStatus })
</script>

<style lang="scss" scoped>
$blue-hover: #499bed;
$blue-active: #0253a4;

.base-button {
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
