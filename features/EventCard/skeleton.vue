<template>
  <div class="event-card base-block">
    <div class="event-card__container">
      <div class="event-card__date-time-block">
        <UiBaseSkeleton width="81px" height="16px" />
        <UiBaseSkeleton width="42px" height="16px" />
      </div>
      <UiBaseSkeleton class="q-mb-md" width="200px" height="30px" />
      <div class="text-body2 q-mb-md event-card__description">
        <UiBaseSkeleton width="100%" height="16px" />
        <UiBaseSkeleton width="100%" height="16px" />
        <UiBaseSkeleton width="100%" height="16px" />
        <UiBaseSkeleton width="80%" height="16px" />
      </div>
      <UiBaseSkeleton
        class="event-card__event-button"
        width="100%"
        height="44px"
      />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.event-card {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &__date-time-block {
    display: flex;
    column-gap: 60px;
    row-gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  &__description {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  &__event-button {
    align-self: end;
    width: 100%;

    @include media($bp-xs) {
      max-width: 215px;
    }
  }
}
</style>
