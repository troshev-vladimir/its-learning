<template>
  <div class="course-page">
    <p v-if="isCourceLoadding">loadding...</p>
    <div v-else-if="cource" class="course-page__container">
      <div class="course-page__header">
        <div class="header__left-side">
          <p class="text-h2">{{ cource?.title }}</p>
          <div class="column items-center header__tracker-block">
            <ClientOnly>
              <UiBaseTracker
                :value="cource?.progress"
                class="tracker q-mb-sm"
              />
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
        <p v-if="cource?.isEnded" class="text-body1 text-bold text-blue-600">
          Завершен
        </p>
        <UiBaseAverageScore
          class="average-score"
          :value="cource?.averageScore"
        />
      </div>
      <div class="course-page__course-statistics-block">
        <MaterialCoveredCard
          v-if="cource?.statistics.tests"
          :icon="['fas', 'check-square']"
          :statistic="cource?.statistics.tests"
          title="Тесты"
        />
        <MaterialCoveredCard
          v-if="cource?.statistics.video"
          :icon="['fas', 'video']"
          :statistic="cource?.statistics.video"
          title="Видео"
        />
        <MaterialCoveredCard
          v-if="cource?.statistics.tasks"
          :icon="['fas', 'file-code']"
          :statistic="cource?.statistics.tasks"
          title="Задания"
        />
      </div>
      <p
        v-if="cource?.couchAwilableTill"
        class="course-page__access-mentor text-body2 text-gray-400"
      >
        Доступ к наставнику до {{ cource?.couchAwilableTill }}
      </p>

      <div class="course-page__education-block">
        <FeatureEducationModuleAccordion
          v-for="(module, index) in cource?.modules"
          :key="index"
          v-model="cource.modules[index]"
          :is-open="activeModuleIndex == index"
          @click="() => onClickItem(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCourceStore } from '~/stores/cource'
definePageMeta({
  layout: 'cabinet',
})
useSeoMeta({
  title: 'Обучение',
})
const route = useRoute()
const router = useRouter()
route.meta.pageTitle = 'Обучение'

const courceStore = useCourceStore()
const { cource, isCourceLoadding } = storeToRefs(courceStore)

const activeModuleIndex = ref(-1)

const onClickItem = (index: number) => {
  if (activeModuleIndex.value == index) {
    activeModuleIndex.value = -1
    router.replace({ query: {} })
    return
  }
  router.replace({ query: { module: index } })
  activeModuleIndex.value = index
}

const { pending, error } = useAsyncData('cource', () =>
  courceStore.fetchCource().then(() => true)
)

onMounted(() => {
  console.log('page mounted')

  if (route.query?.module) activeModuleIndex.value = +route.query.module
})
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
