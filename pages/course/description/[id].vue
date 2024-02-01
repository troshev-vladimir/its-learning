<template>
  <section class="description-page base-block q-my-lg">
    <h1 class="text-h1 q-my-lg">
      Программа <span class="text-accent"> 1С Программист </span>
    </h1>

    <div class="base-block--gray content pretty-scroll q-mb-lg">
      <p>
        В нашей программе только нужная теория и никакой воды. Объем
        практических заданий увеличен в 5 раз. Все они основаны на реальных
        коммерческих проектах IT-компании с 12-летним опытом в разработке и
        внедрении 1С. В нашей программе только нужная теория и никакой воды.
        Объем практических заданий увеличен в 5 раз. Все они основаны на
        реальных коммерческих проектах IT-компании с 12-летним опытом в
        разработке и внедрении 1С. В нашей программе только нужная теория и
        никакой воды. Объем практических заданий увеличен в 5 раз. Все они
        основаны на реальных коммерческих проектах IT-компании с 12-летним
        опытом в разработке и внедрении 1С.
      </p>

      <h3>Введение</h3>

      <p>Система 1С:Предприятие:</p>

      <ul>
        <li>Знакомство с основными понятиями.</li>
        <li>Обзор системы.</li>
        <li>Изучение документов и журналов программы.</li>
      </ul>
    </div>

    <UiBaseButton @click="goBack" type="boarded" size="small" class="q-ml-auto"
      >Назад</UiBaseButton
    >
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

const router = useRouter()
const route = useRoute()
const prevPage = ref('')

useSeoMeta({
  title: '1С Программист',
})

onMounted(() => {
  console.log(router, route)
})

const goBack = () => {
  router.push(prevPage.value || '/cabinet')
}
router.beforeEach((prev: any, current: any) => {
  prevPage.value = prev.fullPath
})
</script>
<style lang="scss" scoped>
.description-page {
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
