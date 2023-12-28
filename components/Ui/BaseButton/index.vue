<template>
  <button
    class="base-button"
    :class="`${type} ${size}`"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (value: string) => ["primary", "secondary"].includes(value),
  },
  size: {
    type: String,
    default: "big",
    validator: (value: string) => ["small", "big"].includes(value),
  },
});
</script>

<style lang="scss" scoped>
$blue-hover: #499bed;
$blue-active: #0253a4;

.base-button {
  border: none;
  cursor: pointer;

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
    padding: 16px 24px;
    border-radius: 8px;
  }

  &.big {
    padding: 16px 32px;
    border-radius: 8px;
    font-size: 20px;
    * {
      font-size: 20px;
    }
  }
}
</style>
 