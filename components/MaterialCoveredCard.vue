<template>
  <div class="material-covered-card">
    <span class="material-covered-card__icon-circle">
      <UiBaseIcon
        font-size="26px"
        width="26px"
        hight="26px"
        radius="4px"
        class="icon"
        :icon="icon"
      />
    </span>
    <div class="material-covered-card__content">
      <p class="text-body1">{{ title }}</p>
      <p class="text-body1">{{ statistic.score }} / {{ statistic.total }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CourceStaisticItem } from '~/api/cource'

defineProps<{
  statistic: CourceStaisticItem
  icon: string | string[]
  title: string
}>()
</script>

<style lang="scss" scoped>
.material-covered-card {
  display: flex;
  align-items: center;
  gap: 16px;

  &__icon-circle {
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    border: 2px solid $blue-500;

    .icon {
      color: $blue-500;
      font-size: 30px;
    }
  }
}
</style>
