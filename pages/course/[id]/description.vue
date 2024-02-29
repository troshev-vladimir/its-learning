<template>
  <div class="description-page">
    <div class="base-block q-my-lg">
      <h1 class="text-h1 q-my-lg">
        Программа
        <span class="text-accent"> {{ data?.title }}</span>
      </h1>

      <div
        class="base-block--gray content pretty-scroll q-mb-lg"
        v-html="data?.content"
      ></div>
      <UiBaseButton
        tag="span"
        type="boarded"
        size="small"
        class="q-ml-auto"
        @click="goBack"
      >
        Назад
      </UiBaseButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { api } from '~/api'

definePageMeta({
  layout: 'cabinet',
})

useSeoMeta({
  title: '1С Программист',
})

const router = useRouter()
const route = useRoute()

const { data } = useAsyncData('detail', () => {
  const id =
    typeof route.params.id === 'string' ? route.params.id : route.params.id[0]
  return api.cource.getCourceDetail(id)
})

const goBack = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.description-page {
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
