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

      <div class="course-page__education-block">
        <FeatureEducationModuleAccordion
          v-for="(item, index) in 5"
          :key="index"
          :model-value="activeModuleIndex == index"
          :value="{
            id: index.toString(),
            title: 'Пройденный модуль',
            status: 'ended',
          }"
          @click="() => onClickModule(index)"
        >
          <FeatureEducationLessonAccordion
            :is-open="activeLessonId == lessonMock.id"
            :lesson="lessonMock"
            @click-header="onClickLesson(lessonMock.id)"
          >
            <template #default>
              <FeatureEducationLessonCard :lesson="lessonMock" />
            </template>
          </FeatureEducationLessonAccordion>
          <FeatureEducationLessonAccordion
            :is-open="activeLessonId == lessonMock2.id"
            :lesson="lessonMock2"
            @click-header="onClickLesson(lessonMock2.id)"
          >
            <template #default>
              <FeatureEducationLessonCard :lesson="lessonMock2" />
            </template>
          </FeatureEducationLessonAccordion>
        </FeatureEducationModuleAccordion>
        <FeatureEducationModuleAccordion
          :value="{
            id: '11',
            title: 'Активный модуль',
            status: 'active',
          }"
          :model-value="activeModuleIndex == 11"
          @click="() => onClickModule(11)"
        >
          <div>1234123</div>
        </FeatureEducationModuleAccordion>
        <FeatureEducationModuleAccordion
          :value="{
            id: '11',
            title: 'Активный модуль',
            status: 'active',
          }"
          :model-value="activeModuleIndex == 13"
          @click="() => onClickModule(13)"
        >
          <div>1234123</div>
        </FeatureEducationModuleAccordion>
        <FeatureEducationModuleAccordion
          :value="{
            id: '12',
            title: 'Заблокированный модуль',
            status: 'locked',
          }"
          :model-value="activeModuleIndex == 12"
          @click="() => onClickModule(12)"
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

const activeModuleIndex = ref(-1)
const activeLessonId = ref<string | number>(-1)

const lessonMock = {
  id: '1',
  title: 'Название урока',
  description:
    'Но многие известные личности являются только методом политического участия и преданы социально-демократической анафеме. Кстати, действия представителей оппозиции обнародованы. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: консультация с широким активом не даёт нам иного выбора, кроме определения как самодостаточных, так и внешне зависимых концептуальных решений.',
  presentations: [{ name: 'Презентация №1', link: 's' }],
  test: {
    id: '123',
    questions: [
      { id: '1', text: 'Вопрос?', answers: [{ text: '123', id: '1' }] },
    ],
  },
  comletionDate: '20.01.23',
  estimation: true,
  testResult: '5',
}
const lessonMock2 = {
  id: '2',
  title: 'Lesson 2',
  description: 'Advanced topic discussion',
  presentations: [{ link: '2', name: 'Presentation 2' }],
  estimatedDate: '2022-01-05',
  estimation: false,
  task: {
    docs: [{ link: '1', name: 'Document 1' }],
    description: 'Complete the task',
    status: 'taken',
    receptDate: '2022-01-05',
    acceptanceDate: '2022-01-15',
    uploadedFiles: 'file.pdf',
    result: 'Pass',
  },
}
const onClickModule = (index: number) => {
  if (activeModuleIndex.value == index) {
    activeModuleIndex.value = -1
    router.replace({ query: { ...route.query, module: null } })
    return
  }
  router.replace({ query: { ...route.query, module: index } })
  activeModuleIndex.value = index
}

const onClickLesson = (id: string) => {
  if (activeLessonId.value == id) {
    activeLessonId.value = -1
    router.replace({ query: { ...route.query, lesson: null } })
    return
  }
  router.replace({ query: { ...route.query, lesson: id } })
  activeLessonId.value = id
}

onMounted(() => {
  if (route.query?.module) activeModuleIndex.value = +route.query?.module
  if (route.query?.lesson) activeLessonId.value = route.query?.lesson.toString()
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

  &__education-block {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
