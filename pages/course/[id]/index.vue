<template>
  <div class="course-page">
    <div class="course-page__container">
      <div class="course-page__header">
        <div class="header__left-side">
          <p class="text-h2">1С:Профессиональный разработчик</p>
          <div class="column items-center header__tracker-block">
            <ClientOnly>
              <UiBaseTracker class="tracker q-mb-sm" />
            </ClientOnly>
            <UiBaseButton
              type="link"
              size="small"
              prev-icon="fas fa-chart-line"
            >
              Трекер успеваемости
            </UiBaseButton>
          </div>
        </div>
        <p class="text-body1 text-bold text-blue-600">Завершен</p>
        <UiBaseAverageScore class="average-score" />
      </div>
      <div class="course-page__course-statistics-block">
        <MaterialCoveredCard
          :icon="['fas', 'check-square']"
          :statistic="statistics.tests"
          title="Тесты"
        />
        <MaterialCoveredCard
          :icon="['fas', 'video']"
          :statistic="statistics.tests"
          title="Видео"
        />
        <MaterialCoveredCard
          :icon="['fas', 'file-code']"
          :statistic="statistics.tests"
          title="Задания"
        />
      </div>
      <p class="course-page__access-mentor text-body2 text-gray-400">
        Доступ к наставнику до 20.08.2024
      </p>

      <div class="column q-gutter-md">
        <FeatureEducationModuleAccordion
          v-for="(item, index) in 5"
          :key="index"
          :model-value="activeIndex == index"
          :value="{
            id: `${index}`,
            title: 'Пройденный модуль',
            status: 'ended',
          }"
          @click="() => onClickItem(index)"
        >
          <div>1234123</div>
        </FeatureEducationModuleAccordion>
        <br />
        <FeatureEducationModuleAccordion
          :value="{
            id: '11',
            title: 'Активный модуль',
            status: 'active',
          }"
          :model-value="activeIndex == 11"
          @click="() => onClickItem(11)"
        >
          <div>1234123</div>
        </FeatureEducationModuleAccordion>
        <br />
        <FeatureEducationModuleAccordion
          :value="{
            id: '11',
            title: 'Активный модуль',
            status: 'active',
          }"
          :model-value="activeIndex == 13"
          @click="() => onClickItem(13)"
        >
          <div>1234123</div>
        </FeatureEducationModuleAccordion>
        <br />
        <FeatureEducationModuleAccordion
          :value="{
            id: '12',
            title: 'Заблокированный модуль',
            status: 'locked',
          }"
          :model-value="activeIndex == 12"
          @click="() => onClickItem(12)"
        >
          <div>1234123</div>
        </FeatureEducationModuleAccordion>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cabinet',
})

const route = useRoute()
const router = useRouter()
route.meta.pageTitle = 'Обучение'

const activeIndex = ref(-1)

const onClickItem = (index: number) => {
  if (activeIndex.value == index) {
    activeIndex.value = -1
    router.replace({ query: { module: -1 } })
    return
  }
  router.replace({ query: { module: index } })
  activeIndex.value = index
}

onMounted(() => {
  if (route.query?.module) activeIndex.value = +route.query.module
})

useSeoMeta({
  title: 'Обучение',
})

const statistics = {
  tests: {
    score: 1,
    total: 2,
  },
  video: {
    score: 1,
    total: 2,
  },
  tasks: {
    score: 1,
    total: 2,
  },
}
</script>

<style lang="scss" scoped>
.course-page {
  &__header,
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 16px;

    @media screen and (min-width: $bp-xs) {
      gap: 0;
      flex-direction: row;
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
      width: 100%;
    }

    .tracker {
      width: 100%;
    }

    .average-score {
      align-items: flex-end;
    }
  }

  &__course-statistics-block {
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

  &__access-mentor {
    margin-top: 32px;
  }
}
</style>
