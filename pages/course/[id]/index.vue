<template>
  <div class="course-page">
    <div class="course-page__container">
      <WidgetFullCourseCard
        class="course-page__full-course-card"
        :course="cource"
        :is-loading="isCourceLoadding"
      />

      <p
        v-if="cource?.couchAwilableTill && !isCourceLoadding"
        class="course-page__access-mentor text-body2 text-gray-400"
      >
        Доступ к наставнику до {{ cource?.couchAwilableTill }}
      </p>
      <transition name="fade" mode="out-in">
        <div
          v-if="cource && !isCourceLoadding"
          class="course-page__education-block"
        >
          <FeatureEducationModuleAccordion
            v-for="(module, index) in cource?.modules"
            :key="index"
            v-model="cource.modules[index]"
            :is-open="activeModuleIndex == index"
            @click="() => onClickItem(index)"
          />
        </div>
        <div v-else class="course-page__education-block">
          <UiBaseSkeleton
            v-for="num in 5"
            :key="num"
            width="100%"
            height="100px"
          />
        </div>
      </transition>
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
  &__full-course-card {
    margin-bottom: 32px;
  }

  &__education-block {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
