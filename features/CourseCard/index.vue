<template>
  <div class="course-card base-block">
    <div class="course-card__container">
      <div class="course-card__left-side">
        <div class="left-side__block">
          <client-only>
            <UiBaseTracker class="course-card__tracker" :value="course.score" />
          </client-only>
          <p class="text-h2">{{ course.title }}</p>
          <p class="text-body2 text-gray-400" v-if="course.isEnded">
            Курс завершён
          </p>
          <p
            class="text-body2 text-gray-400"
            v-if="course.academ?.state && course.academ?.date"
          >
            Предоставлен академический отпуск до {{ course.academ?.date }}
          </p>
          <p class="text-body2 text-gray-400" v-if="course.trial?.state">
            Бесплатный период на {{ course.trial?.days }} день
          </p>
        </div>
        <div class="left-side__block">
          <p class="text-body2" v-if="course.isStarted && course.startDate">
            Дата начала: {{ course.startDate }}
          </p>
          <p class="text-body2" v-if="course.isStarted && course.planEndDate">
            Планируемая дата окончания: {{ course.startDate }}
          </p>
          <p class="text-body2" v-if="course.isEnded && course.realEndDate">
            Дата окончания: {{ course.realEndDate }}
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
          v-if="!course.academ?.state && course.isStarted"
        >
          Запросить академический отпуск
        </UiBaseButton>
        <UiBaseButton
          class="course-card__button"
          type="primary"
          size="small"
          v-if="course.shouldPay"
        >
          Оплатить
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

<script lang="ts" setup>
interface IDoc {
  name: string
  link: string
}

// FIXME тип полей для курса нужно вынести вотдельный расшаренный тип
export type Course = {
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
  isStarted: boolean
  startDate?: string
  isEnded?: boolean
  planEndDate?: string
  realEndDate?: string
  docs?: IDoc[]
  score?: number
  shouldPay?: boolean
}

interface PropsCourse {
  course: Course
}
withDefaults(defineProps<PropsCourse>(), {
  course: () => {
    return {
      title: '1С:Профессиональный разработчик',
      averageScore: 4.96,
      trial: { state: true, days: 31 },
      academ: { state: false, date: '20.01.2024' },
      isStarted: true,
      startDate: '20.01.2024',
      isEnded: true,
      planEndDate: '20.12.2024',
      realEndDate: '10.10.2024',
      docs: [
        {
          name: 'Договор оферты',
          link: 'https://taiga.itsportal.ru/project/its-education/taskboard/sprint-1',
        },
        {
          name: 'Приложение №1',
          link: 'https://taiga.itsportal.ru/project/its-education/taskboard/sprint-1',
        },
        {
          name: 'Приложение №2',
          link: 'https://taiga.itsportal.ru/project/its-education/taskboard/sprint-1',
        },
        {
          name: 'Диплом',
          link: 'https://taiga.itsportal.ru/project/its-education/taskboard/sprint-1',
        },
        {
          name: 'Сертификат №1',
          link: 'https://taiga.itsportal.ru/project/its-education/taskboard/sprint-1',
        },
        {
          name: 'Сертификат №2',
          link: 'https://taiga.itsportal.ru/project/its-education/taskboard/sprint-1',
        },
      ],
      score: 80,
      shouldPay: true,
    }
  },
})
</script>

<style lang="scss">
.course-card {
  &__container {
    position: relative;

    @media (min-width: $breakpoint-sm) {
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

    @media (min-width: $breakpoint-sm) {
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
    @media (min-width: $breakpoint-sm) {
      width: 50%;
    }
  }

  &__right-side,
  .right-side {
    padding-left: 0px;

    @media (min-width: $breakpoint-sm) {
      align-items: flex-end;
      width: 50%;
      padding-left: 40px;

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

    @media (min-width: $breakpoint-sm) {
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
