<template>
  <div class="course-card base-block">
    <div class="course-card__container">
      <div class="course-card__left-side">
        <div class="left-side__block">
          <UiBaseSkeleton width="100%" height="20px" />
          <UiBaseSkeleton width="556px" class="text-h2" />
          <UiBaseSkeleton width="220px" class="text-body2" />
        </div>
        <div class="left-side__block">
          <UiBaseSkeleton width="200px" class="text-body2" />
          <UiBaseSkeleton width="320px" class="text-body2" />
        </div>
      </div>
      <div class="course-card__right-side">
        <UiBaseSkeleton width="162px" class="text-body2" />
        <UiBaseSkeleton width="246px" height="44px" class="button" />
        <UiBaseSkeleton width="150px" height="44px" class="button" />

        <div class="course-card__link-list">
          <UiBaseSkeleton
            v-for="doc in 3"
            :key="doc"
            width="100px"
            height="20px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.course-card {
  &__container {
    position: relative;

    @include media($bp-sm) {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
    }
  }

  &__right-side,
  &__left-side {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;

    @include media($bp-sm) {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  &__tracker {
    width: 70%;
  }

  &__left-side {
    .left-side__block {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    @include media($bp-sm) {
      width: 50%;
    }
  }

  &__right-side,
  .right-side {
    padding-left: 0px;
    margin-top: 16px;

    @include media($bp-sm) {
      margin-top: 16px;
      align-items: flex-end;
      width: 50%;
      padding-left: 40px;

      &__date {
        text-align: right;
      }
    }
  }

  &__link-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: $md;
    row-gap: $sm;
    width: 100%;

    @include media($bp-sm) {
      justify-content: flex-end;
      gap: 16px;
    }
  }

  &__button {
    width: 100% !important;

    @include media($bp-xs) {
      width: fit-content !important;
    }
  }
}
</style>
