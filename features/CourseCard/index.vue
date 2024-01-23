<script lang="ts" setup>
// FIXME тип полей для курса нужно вынести вотдельный расшаренный тип
interface PropsCourse {
  course: {
    title: string
    academ?: {
      state: boolean
      date: string
    }
    trial?: {
      state: true
      days: number
    }
    averageScore?: number
    started: boolean
    startDate: string
    planEndDate: string
    realEndDate: string
    docs?: [{ name: string; link: string }]
  }
}
withDefaults(defineProps<PropsCourse>(), {
  course: {
    title: '1С:Профессиональный разработчик',
    averageScore: 4.96,
    trial: { state: true, days: 31 },
    academ: { state: false, date: '20.01.2024' },
    started: true,
    startDate: '20.01.2024',
    planEndDate: '20.12.2024',
    docs: [
      {
        name: 'Договор оферты',
        link: 'https://taiga.itsportal.ru/project/its-education/taskboard/sprint-1',
      },
    ],
  },
})
</script>

<template>
  <div class="course-card base-block">
    <div class="course-card__container">
      <div class="course-card__left-side">
        <div class="left-side__block">
          <client-only>
            <UiBaseTracker class="course-card__tracker" />
          </client-only>
          <p class="text-h2">{{ course.title }}</p>
          <p class="text-body2 text-gray-600" v-if="course.trial?.state">
            Бесплатный период на {{ course.trial?.days }} день
          </p>
          <p class="text-body2 text-gray-600" v-if="course.academ?.state">
            Предоставлен академический отпуск до {{ course.academ?.date }}
          </p>
        </div>
        <div class="left-side__block">
          <p class="text-body2" v-if="course.started && course.startDate">
            Дата начала: {{ course.startDate }}
          </p>
          <p class="text-body2" v-if="course.started && course.planEndDate">
            Планируемая дата окончания: {{ course.startDate }}
          </p>
        </div>
      </div>
      <div class="course-card__right-side">
        <p class="text-body2">
          Средний балл
          <span class="text-body1 text-bold" v-if="course.averageScore">
            {{ course.averageScore }}
          </span>
          <span class="text-body1 text-bold" v-else> - </span>
        </p>
        <UiBaseButton
          class="course-card__button"
          type="primary"
          size="small"
          v-if="course.trial?.state && !course.academ?.state"
        >
          Приступить к обучению
        </UiBaseButton>
        <UiBaseButton
          class="course-card__button"
          type="primary"
          size="small"
          v-if="course.academ?.state"
        >
          Продолжить обучение
        </UiBaseButton>
        <UiBaseButton
          class="course-card__button"
          type="boarded"
          size="small"
          v-if="!course.academ?.state && course.started"
        >
          Запросить академический отпуск
        </UiBaseButton>
        <div class="course-card__link-list">
          <UiBaseButton
            type="external-link"
            size="small"
            v-for="(doc, i) in course.docs"
            :key="i"
          >
            {{ doc.name }}
          </UiBaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.course-card {
  &__container {
    position: relative;

    @media (min-width: 820px) {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
    }
  }

  &__right-side,
  &__left-side {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;

    @media (min-width: 820px) {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  &__tracker {
    width: 70%;
  }

  &__left-side {
    .left-side__block {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    @media (min-width: 820px) {
      width: 60%;
    }
  }

  &__right-side,
  .right-side {
    @media (min-width: 820px) {
      align-items: flex-end;
      width: 40%;

      &__date {
        text-align: right;
      }
    }
  }

  &__link-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: $md;
    row-gap: $sm;

    @media (min-width: 820px) {
      justify-content: flex-end;
      gap: 16px;
    }
  }

  &__button {
    width: 100% !important;

    @media (min-width: $breakpoint-xs) {
      width: fit-content !important;
    }
  }
}
</style>
