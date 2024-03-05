<template>
  <div class="education-lesson-card">
    <div class="education-lesson-card__container">
      <div class="education-lesson-card__video">
        <UiBaseSkeleton class="video__player"></UiBaseSkeleton>
      </div>
      <div class="education-lesson-card__right-side">
        <UiBaseSkeleton class="text-body2" width="100%" />
        <UiBaseSkeleton class="text-body2" width="100%" />
        <UiBaseSkeleton class="text-body2" width="100%" />
        <UiBaseSkeleton class="text-body2" width="80%" />
        <UiBaseSkeleton width="100px" height="14px" />
        <UiBaseSkeleton width="100px" height="14px" />
        <UiBaseSkeleton width="149px" height="44px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: 'SkeletonForCard',
}
</script>

<style lang="scss" scoped>
.education-lesson-card {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    column-gap: 40px;
    row-gap: 16px;

    @include media($bp-md) {
      flex-direction: row;
    }
  }

  &__right-side {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;

    @include media($bp-md) {
      width: 50%;
    }
  }

  &__video {
    width: 100%;
    max-height: 100%;

    @include media($bp-md) {
      width: 50%;
    }
  }

  .video__player {
    overflow: hidden;
    border-radius: 8px;
    padding-bottom: 50%;
  }
}
</style>
