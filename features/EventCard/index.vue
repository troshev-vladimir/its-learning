<template>
  <div class="event-card base-block">
    <div class="event-card__container">
      <div class="event-card__date-time-block">
        <p class="date">26.01.2024</p>
        <p class="time">18:00</p>
      </div>
      <p class="text-h2">Событие</p>
      <p class="text-body1 q-mb-md">Описание события</p>
      <UiBaseButton
        type="primary"
        size="small"
        post-icon="fas fa-link"
        class=""
      >
        Присоединиться
      </UiBaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.event-card {
  &__date-time-block {
    display: flex;
    column-gap: 60px;
    row-gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
}
</style>
