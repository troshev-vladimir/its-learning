<template>
  <div class="cabinet-page">
    <UiBaseButton
      size="small"
      post-icon="face-angry"
      @click="
        () => {
          isEvrydaySupervisor = true
        }
      "
      >Подключиться к надзирателю</UiBaseButton
    >
    <UiBaseButton
      size="small"
      :post-icon="['fab', 'discord']"
      @click="submitToDiscord"
    >
      Пример дискорда
    </UiBaseButton>

    <div class="cabinet-page__events-block">
      <FeatureEventCard
        v-for="(event, i) in mainEvents"
        :key="i"
        :event="event"
        :is-loading="isEventsLoading"
        @submit="submitToWebinar"
      />
    </div>
    <NuxtLazyHydrate when-visible>
      <LazyWidgetUserProfile :loadding="CourcePending" />
    </NuxtLazyHydrate>
    <NuxtLazyHydrate when-visible>
      <FeatureTargetTestCardSkeleton v-if="isTestLoading" />

      <LazyFeatureTargetTestCard
        v-else-if="isTestAvailable"
        @start-test="() => (testPopup = true)"
      />

      <FeatureTargetTestWaitingCard v-else-if="test?.status === 'waiting'" />

      <FeatureTargetTestResults
        v-else-if="test && test?.status === 'result'"
        :is-passed="test?.results.passed"
        comment="Как принято считать, независимые государства представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности. Повседневная практика показывает, что базовый вектор развития требует определения и уточнения кластеризации усилий."
        :results="test?.results.details"
        class="target-test-page__target-test base-block"
      >
        <UiBaseButton
          class="target-training-results-card__button"
          type="primary"
          size="small"
          style="width: 100%"
          @click="scrollToCourseCard"
        >
          {{
            test?.results.passed
              ? 'Приступить к обучению'
              : 'Все равно хочу учиться'
          }}
        </UiBaseButton>
      </FeatureTargetTestResults>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <LazyWidgetCourseCard
        ref="courseCard"
        :course="courcePreview"
        :is-loading="CourcePending"
      />
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <LazyFeatureUserDebt />
    </NuxtLazyHydrate>

    <LazyUiBasePopup v-model="isWebinar" class="target-training-test">
      <div class="wrapper">
        <iframe
          width="100%"
          :src="webinarLink"
          frameborder="0"
          allow="autoplay; encrypted-media; clipboard-write"
          allowfullscreen
        ></iframe>
      </div>
    </LazyUiBasePopup>

    <LazyUiBasePopup v-model="isDiscord" class="target-training-test">
      <div class="wrapper">
        <iframe
          :src="`https://discord.com/widget?id=1159892531673321503&username=${user.name}&theme=dark`"
          width="100%"
          allowtransparency="true"
          frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </LazyUiBasePopup>

    <LazyUiBasePopup v-model="isEvrydaySupervisor" class="target-training-test">
      <div class="wrapper">
        <iframe
          allow="fullscreen display-capture camera microphone"
          src="https://vconf.edgecenter.ru/call/?roomId=serv1kpc8elpvllpmdk"
          width="100%"
        >
        </iframe>
      </div>
    </LazyUiBasePopup>

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
import { useUserStore } from '~/stores/user'
import { useCourceStore } from '~/stores/cource'
import { useEventStore } from '~/stores/event'
import { useTestStore } from '~/stores/test'

const route = useRoute()
route.meta.pageTitle = 'Личный кабинет'

useSeoMeta({
  title: 'Личный кабинет',
})

const testStore = useTestStore()
const { test, isTestLoading, isTestAvailable } = storeToRefs(testStore)

const courceStore = useCourceStore()
const { courcePreview } = storeToRefs(courceStore)

const eventStore = useEventStore()
const { events, isEventsLoading } = storeToRefs(eventStore)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
definePageMeta({
  layout: 'cabinet',
})

const testPopup = ref(false)
const isWebinar = ref(false)
const isDiscord = ref(false)

const webinarLink = ref('')
const isEvrydaySupervisor = ref(false)

const mainEvents = computed(() => {
  if (events.value.length >= 2) {
    return [...events.value].splice(0, 2)
  }
  return events.value
})

const submitToWebinar = (link: string) => {
  webinarLink.value = link
  isWebinar.value = true
}
const submitToDiscord = () => {
  isDiscord.value = true
}

const { pending: CourcePending, error: CourseError } = useAsyncData(
  'cource',
  () => courceStore.fetchCourcePreview().then(() => true)
)

useAsyncData('events', () => eventStore.getAll().then(() => true))

useAsyncData('test', () => testStore.fetchTest('target').then(() => true))

const scrollToCourseCard = () => {
  const courseCard = document.querySelector('.course-card')
  courseCard?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const stop = watch(CourcePending, () => {
  if (!CourcePending.value && route.query.showCourse === 'true') {
    setTimeout(scrollToCourseCard, 300)
    stop()
  }
})

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

.wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* The height of the item will now be 56.25% of the width. */
}
/* Adjust the iframe so it's rendered in the outer-width and outer-height of it's parent */
.wrapper iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
