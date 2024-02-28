<template>
  <div class="full-course-card">
    <div class="full-course-card__content">
      <div class="full-course-card__left-side">
        <UiBaseSkeleton class="text-h2" width="200px" />
        <div class="full-course-card__tracker-block">
          <UiBaseSkeleton width="100%" height="20px" />
          <UiBaseSkeleton width="200px" height="20px" />
        </div>
      </div>
      <UiBaseAverageScore class="average-score" :is-loading="true" />
    </div>
    <div class="full-course-card__statistics">
      <UiBaseSkeleton width="150px" height="55px" />
      <UiBaseSkeleton width="150px" height="55px" />
      <UiBaseSkeleton width="150px" height="55px" />
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.full-course-card {
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 16px;

    @media screen and (min-width: $bp-xs) {
      gap: 0;
      flex-direction: row;
    }
  }

  &__left-side {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media screen and (min-width: $bp-xs) {
      align-items: start;
      width: 65%;
    }
  }

  &__tracker-block {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;
    width: 100%;
  }

  .tracker {
    width: 100%;
  }

  .average-score {
    align-items: center;
    width: auto !important;

    @include media($bp-xs) {
      align-items: flex-end;
    }
  }

  &__statistics {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 32px;
    margin-top: 32px;
    flex-wrap: wrap;

    @media screen and (min-width: $bp-xs) {
      justify-content: flex-start;
    }
  }
}
</style>
