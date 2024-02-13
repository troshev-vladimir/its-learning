<template>
  <div class="event-card base-block">
    <div class="event-card__container">
      <div class="event-card__date-time-block">
        <p class="date">{{ event.date }}</p>
        <p class="time">{{ event.time }}</p>
      </div>
      <p class="text-h2 q-mb-md">{{ event.title }}</p>
      <p class="text-body2 q-mb-md event-card__description">
        {{ event.description }}
      </p>
      <UiBaseButton
        v-if="event.link"
        type="primary"
        size="small"
        post-icon="fas fa-link"
        class="event-card__event-button"
        tag="a"
        :href="event.link"
        target="_blank"
      >
        Присоединиться
      </UiBaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IEvent {
  title: string
  date?: string
  time?: string
  description?: string
  link?: string
}
interface Props {
  event: IEvent
}
defineProps<Props>()
</script>

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
  }

  &__event-button {
    align-self: end;
  }
}
</style>
