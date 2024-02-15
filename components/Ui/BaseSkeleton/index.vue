<template>
  <div class="base-skeleton">
    <div class="base-skeleton__line"></div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  height?: string
  width?: string
  radius?: string
  background?: string
}

withDefaults(defineProps<Props>(), {
  height: 'auto',
  width: '100%',
  radius: '8px',
  background: '#e6e6e6',
})
</script>

<style lang="scss">
.base-skeleton {
  max-width: v-bind(width);
  height: v-bind(height);
  width: inherit;
  border-radius: v-bind(radius);
  background: v-bind(background);
  overflow: hidden;

  &__line {
    width: 100%;
    height: 100%;
    background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 60%
      ),
      transparent;
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1.5s loading ease-in-out infinite;
  }
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
