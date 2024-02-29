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
  position: relative;
  max-width: 100%;
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(radius);
  background: v-bind(background);
  overflow: hidden;

  &__line {
    position: absolute;
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

  &.text-body1 {
    height: 15px;

    @include media($bp-sm) {
      height: 27px;
    }
  }

  &.text-body2 {
    height: 12px;

    @include media($bp-sm) {
      height: 20px;
    }
  }

  &.text-h1 {
    height: 35px;

    @include media($bp-sm) {
      height: 45px;
    }
  }

  &.text-h2 {
    height: 27px;

    @include media($bp-sm) {
      height: 30px;
    }
  }

  &.button {
    max-width: 100%;

    @include media($bp-xs) {
      max-width: v-bind(width);
    }
  }
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
