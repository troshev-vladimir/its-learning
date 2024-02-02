<template>
  <section class="description-page base-block q-my-lg">
    <h1 class="text-h1 q-my-lg">
      Программа
      <span class="text-accent"> 1С Программист {{ route.params.id }}</span>
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
    <nuxt-link to="/cabinet">
      <UiBaseButton tag="span" type="boarded" size="small" class="q-ml-auto">
        Назад
      </UiBaseButton>
    </nuxt-link>
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

useSeoMeta({
  title: '1С Программист',
})

const router = useRouter()
const route = useRoute()

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
