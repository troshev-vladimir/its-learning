<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    value?: number
    size: 'big' | 'small'
  }>(),
  { value: 10, size: 'small' }
)

const progressTrack = ref<HTMLElement | Element>()
const animationTimer = ref()
const lastValue = ref('0%')
const progressTrackValue = computed(() => props.value + '%')

const animateProgressTrack = () => {
  if (animationTimer.value) {
    progressTrack.value?.classList.remove('animate')
    clearInterval(animationTimer.value)
  }
  progressTrack.value?.classList.add('animate')
  animationTimer.value = setTimeout(() => {
    progressTrack.value?.classList.remove('animate')
  }, 1000)
}

const observer = new IntersectionObserver(animateProgressTrack, {
  rootMargin: '-1px',
  threshold: 1.0,
})

onMounted(() => {
  if (progressTrack.value) observer.observe(progressTrack.value)
})

watch(
  () => props.value,
  (newValue, oldValue) => {
    if (oldValue != null) lastValue.value = oldValue + '%'
    animateProgressTrack()
  },
  { immediate: true }
)
</script>

<template>
  <div v-memo="progressTrackValue" class="base-tracker" :class="[size]">
    <div class="base-tracker__progress-bar">
      <div ref="progressTrack" class="base-tracker__progress-track"></div>
    </div>
    <p
      :class="{
        'text-bold text-h2': size == 'big',
        'text-body1': size == 'small',
      }"
    >
      {{ progressTrackValue }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.base-tracker {
  display: flex;
  align-items: center;
  width: 100%;

  &.big {
    gap: 20px;
    height: 24px;
  }

  &.small {
    gap: 8px;
    height: 19px;
  }

  &__progress-bar {
    background: $gray-200;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  &__progress-track {
    height: 100%;
    width: v-bind(progressTrackValue);
    border-radius: 8px;
    background: linear-gradient(90deg, #499bed 0.02%, #0075eb 100.02%);

    &.animate {
      animation-duration: 1s;
      animation-timing-function: ease;
      animation-name: animateTrack;
    }

    @keyframes animateTrack {
      from {
        width: v-bind(lastValue);
      }
      to {
        width: v-bind(progressTrackValue);
      }
    }
  }
}
</style>
