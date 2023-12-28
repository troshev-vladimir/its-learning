<template>
  <span class="spinner-icon">
    <span class="spinner-icon__container" :class="`${style}`"> </span>
  </span>
</template>

<script lang="ts" setup>
defineProps({
  style: {
    type: String,
    default: 'light',
    validator: (style) => ['light', 'accent'].includes(style),
  },
})
</script>

<style lang="scss" scoped>
// from https://cssloaders.github.io/
.spinner-icon {
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 24px;
    height: 24px;
    border: 3px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    transform-origin: center;

    &.light {
      border-color: $white;
      border-bottom-color: transparent;
    }

    &.accent {
      border-color: $accent;
      border-bottom-color: transparent;
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
