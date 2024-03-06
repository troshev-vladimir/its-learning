<template>
  <div class="cabinet-page">
    <div class="cabinet-page__events-block">
      <FeatureEventCard
        v-for="(event, i) in mainEvents"
        :key="i"
        :event="event"
        :is-loading="isEventsLoading"
      />
    </div>
    <NuxtLazyHydrate when-visible>
      <LazyWidgetUserProfile :loadding="CourcePending" />
    </NuxtLazyHydrate>
    <NuxtLazyHydrate when-visible>
      <LazyFeatureTargetTestCard @start-test="() => (testPopup = true)" />
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <LazyWidgetCourseCard
        :course="courcePreview"
        :is-loading="CourcePending"
      />
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <LazyFeatureUserDebt />
    </NuxtLazyHydrate>

    <!-- <NuxtLazyHydrate when-visible>
      <LazyUiBasePopup v-model="testPopup" class="target-training-test">
        <template #default>
          <FeatureTest  class="base-block" @submit="() => (testPopup = false)" />
        </template>
      </LazyUiBasePopup>
    </NuxtLazyHydrate> -->
  </div>
</template>

<script lang="ts" setup>
import { useCourceStore } from '~/stores/cource'
import { useEventStore } from '~/stores/event'

const courceStore = useCourceStore()
const { courcePreview } = storeToRefs(courceStore)

const eventStore = useEventStore()
const { events, isEventsLoading } = storeToRefs(eventStore)

definePageMeta({
  layout: 'cabinet',
})

const route = useRoute()
route.meta.pageTitle = 'Личный кабинет'

useSeoMeta({
  title: 'Личный кабинет',
})

const testPopup = ref(false)

const mainEvents = computed(() => {
  if (events.value.length >= 2) {
    return [...events.value].splice(0, 2)
  }
  return events.value
})

const { pending: CourcePending, error: CourseError } = useAsyncData(
  'cource',
  () => courceStore.fetchCourcePreview().then(() => true)
)

useAsyncData('events', () => eventStore.getAll().then(() => true))

// useShowNotification(error.value)
</script>
<style lang="scss" scoped>
.cabinet-page {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__events-block {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 16px;
    row-gap: 16px;

    @include media($bp-sm) {
      grid-template-columns: minmax(60%, 1fr) auto;
    }
  }
}
</style>
