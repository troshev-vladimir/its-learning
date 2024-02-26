<script lang="ts" setup></script>

<template>
  <div class="base-average-score-skeleton">
    <UiBaseSkeleton width="100px" class="text-body1" />
    <UiBaseSkeleton width="150px" class="text-body2" />
  </div>
</template>

<style lang="scss" scoped>
.base-average-score-skeleton {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  &__value {
    font-size: 30px !important;
  }

  &__description {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
}
</style>
