<template>
  <div class="target-training-card base-block">
    <div class="target-training-card__container">
      <UiBaseSkeleton
        width="400px"
        height="30px"
        class="target-training-card__skeleton-title"
      />
      <UiBaseSkeleton height="15px" />
      <UiBaseSkeleton height="15px" />
      <UiBaseSkeleton width="80%" height="15px" />
      <UiBaseSkeleton
        width="300px"
        height="52px"
        class="target-training-card__skeleton-button"
      />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.target-training-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $md;
  flex-wrap: wrap;

  @media screen and (min-width: $bp-xs) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
  }

  &__skeleton-title {
    // width: 100%;
    // height: 30px;

    // @include media($bp-xs) {
    //   width: 300px;
    // }
  }

  &__skeleton-button {
    // width: 100%;
    // height: 52px;

    // @include media($bp-xs) {
    //   width: 290px !important;
    // }
  }
}
</style>
