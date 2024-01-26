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
            <UiBaseButton type="link" size="small">
              Трекер успеваемости
            </UiBaseButton>
          </div>
        </div>
        <UiBaseAverageScore class="average-score" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cabinet',
})
</script>

<style lang="scss">
.course-page {
  &__header,
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 16px;

    @media screen and (min-width: $breakpoint-xs) {
      gap: 0;
      flex-direction: row;
    }

    &__left-side {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      @media screen and (min-width: $breakpoint-xs) {
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
      align-items: end;
    }
  }
}
</style>
