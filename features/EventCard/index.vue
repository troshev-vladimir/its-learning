<template>
  <Transition name="fade" mode="out-in" :duration="200">
    <div v-if="!isLoading" class="event-card base-block">
      <div class="event-card__container">
        <div v-if="event?.date" class="event-card__date-time-block">
          <p class="date">{{ eventTime?.date }}</p>
          <p v-if="!isEventStarted" class="time">{{ eventTime?.time }}</p>
          <p v-else class="text-blue-600">Событие уже идет</p>
        </div>
        <p class="text-h2 q-mb-md">{{ event?.title }}</p>
        <p class="text-body2 q-mb-md event-card__description">
          {{ event?.description }}
        </p>
        <template v-if="isEventStarted && event?.link">
          <UiBaseButton
            v-if="event.external"
            type="primary"
            size="small"
            post-icon="fas fa-link"
            class="event-card__event-button"
            tag="a"
            :href="event?.link"
            target="_blank"
          >
            Присоединиться
          </UiBaseButton>
          <UiBaseButton
            v-else
            type="primary"
            size="small"
            post-icon="fas fa-link"
            class="event-card__event-button"
            @click="emit('submit', event.link)"
          >
            Присоединиться
          </UiBaseButton>
        </template>
      </div>
    </div>
    <skeleton v-else />
  </Transition>
</template>

<script lang="ts" setup>
import Skeleton from './skeleton.vue'
import type { Event } from '~/api/events'

interface Props {
  event: Event
  isLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})
const emit = defineEmits(['submit'])

const isEventStarted = computed(() => {
  return props.event?.date && Date.parse(props.event?.date) <= Date.now()
})

const eventTime = computed(() => {
  if (!props.event?.date) return
  return {
    date: new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(Date.parse(props.event?.date)),
    time: new Intl.DateTimeFormat('ru-RU', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(Date.parse(props.event?.date)),
  }
})
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
