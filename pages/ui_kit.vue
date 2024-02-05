<template>
  <FeatureEducationLessonAccordion>
    <template #default>
      <FeatureEducationLessonCard />
    </template>
  </FeatureEducationLessonAccordion>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI -kit'

const popup = ref(false)
</script>

<style lang="scss">
@import '~/assets/styles/base-styles.scss';
.resume-form {
  min-width: 90vw;
  @media (min-width: $bp-xs) {
    min-width: 50vw;
  }

  // @media (min-width: $bp-xs) {
  // }
}
</style>
