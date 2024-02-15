<template>
  <div class="cabinet-page">
    <div class="cabinet-page__events-block">
      <FeatureEventCard
        v-for="(event, i) in mainEvents"
        :key="i"
        :event="event"
      />
    </div>
    <div>
      <div class="row q-col-gutter-lg items-center">
        <div class="offset-3 col-6 offset-sm-0 col-sm-4 col-md-2">
          <div class="user-photo">
            <img
              src="https://mindfulness.demo.zigzagpress.com/wp-content/uploads/sites/20/2010/08/team_02.jpg"
              alt="user"
              width="100"
            />
          </div>
        </div>

        <div class="col-12 col-sm-8 col-md-7 q-gutter-sm">
          <div class="column items-center q-gutter-sm items-sm-start">
            <p class="text-h2">Виктор Андреевич Балкин</p>
            <div class="d-flex justify-between justify-md-start">
              <p class="text-body2 q-mr-xl">Город: Киров</p>
              <p class="text-body2">Возраст: 29 лет</p>
            </div>
            <UiBaseButton
              type="boarded"
              size="small"
              @click="userProfileEdit = true"
            >
              Редактировать
            </UiBaseButton>
          </div>
        </div>
        <div class="col-12 col-md-3 justify-center justify-md-end d-flex">
          <UiBaseAverageScore class="items-center items-md-end" />
        </div>
      </div>
    </div>
    <FeatureTargetTrainingCard @start-test="() => (testPopup = true)" />
    <WidgetCourseCard @pay="() => (payCoursePopup = true)" />

    <FeatureUserDebt />
    <UiBasePopup v-model="userProfileEdit">
      <template #default>
        <FeatureUserProfile
          class="base-block"
          @submit="() => (userProfileEdit = false)"
        ></FeatureUserProfile>
      </template>
    </UiBasePopup>

    <UiBasePopup v-model="testPopup" class="target-training-test">
      <template #default>
        <FeatureTest class="base-block" @submit="() => (testPopup = false)" />
      </template>
    </UiBasePopup>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cabinet',
})

const route = useRoute()
route.meta.pageTitle = 'Личный кабинет'

useSeoMeta({
  title: 'Личный кабинет',
})

const userProfileEdit = ref(false)
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

.user-photo {
  padding-bottom: 100%;
  background: $gray-300;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
