<template>
  <UiBasePopup class="target-training-test">
    <FeatureTest
      class="target-training-test__test"
      @submit="(value) => emit('submit', value)"
    />
  </UiBasePopup>
</template>

<script lang="ts" setup>
const emit = defineEmits(['submit'])
</script>

<style lang="scss" scoped>
.target-training-test {
  &__test {
    min-width: 90vw;
    padding: 24px;

    @media screen and (min-width: $breakpoint-xs) {
      min-width: 540px;
    }
  }
}
</style>
