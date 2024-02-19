<template>
  <div class="cabinet-page">
    <div class="cabinet-page__events-block">
      <FeatureEventCard
        v-for="(event, i) in mainEvents"
        :key="i"
        :event="event"
      />
    </div>
    <WidgetUserProfile v-if="!error" :loadding="pending" />
    <FeatureTargetTrainingCard @start-test="() => (testPopup = true)" />
    <WidgetCourseCard @pay="() => (payCoursePopup = true)" />
    <FeatureUserDebt />

    <UiBasePopup v-model="testPopup" class="target-training-test">
      <template #default>
        <FeatureTest class="base-block" @submit="() => (testPopup = false)" />
      </template>
    </UiBasePopup>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import useShowNotification from '~/composables/useShowNotification'

definePageMeta({
  layout: 'cabinet',
})

const route = useRoute()
route.meta.pageTitle = 'Личный кабинет'

useSeoMeta({
  title: 'Личный кабинет',
})
const userStore = useUserStore()
const testPopup = ref(false)
const payCoursePopup = ref(false)

const mainEvents = computed(() => {
  if (events.value.length >= 2) {
    return [...events.value].splice(0, 2)
  }
  return events.value
})

const events = ref([
  {
    title: 'Вебинар',
    date: '26.01.2024',
    time: '18:00',
    description:
      'Не следует, однако, забывать, что высокотехнологичная концепция общественного уклада требует анализа кластеризации усилий. Таким образом, высокотехнологичная концепция общественного уклада напрямую зависит от соответствующих условий активизации.',
    link: 'https://fontawesome.com/v5/search?q=arrow&o=r&m=free',
  },
  {
    title: 'Созвон с наставником',
    date: '26.01.2024',
    time: '18:00',
    description:
      'Предварительные выводы неутешительны: синтетическое тестирование предполагает независимые способы реализации укрепления моральных ценностей.',
  },
])

const { pending, error } = await useLazyAsyncData('user', () =>
  userStore.fetchUser().then(() => true)
)

useShowNotification(error.value)
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
      grid-template-columns: 60% 40%;
    }
  }
}
</style>
