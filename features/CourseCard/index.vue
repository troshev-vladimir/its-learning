<template>
  <div class="course-card base-block">
    <div class="course-card__container">
      <div class="course-card__left-side">
        <div class="left-side__block">
          <client-only>
            <UiBaseTracker class="course-card__tracker" :value="course.score" />
          </client-only>
          <nuxt-link to="/course/1/description/">
            <p class="text-h2">{{ course.title }}</p>
          </nuxt-link>
          <p v-if="course.isEnded" class="text-body2 text-gray-400">
            Курс завершён
          </p>
          <p
            v-if="course.academ?.state && course.academ?.date"
            class="text-body2 text-gray-400"
          >
            Предоставлен академический отпуск до {{ course.academ?.date }}
          </p>
          <p v-if="course.trial?.state" class="text-body2 text-gray-400">
            Бесплатный период на {{ course.trial?.days }} день
          </p>
        </div>
        <div class="left-side__block">
          <p v-if="course.isStarted && course.startDate" class="text-body2">
            Дата начала: {{ course.startDate }}
          </p>
          <p v-if="course.isStarted && course.planEndDate" class="text-body2">
            Планируемая дата окончания: {{ course.startDate }}
          </p>
          <p v-if="course.isEnded && course.realEndDate" class="text-body2">
            Дата окончания: {{ course.realEndDate }}
          </p>
        </div>
      </div>
      <div class="course-card__right-side">
        <p class="text-body2">
          Средний балл
          <span v-if="course.averageScore" class="text-body1 text-bold">
            {{ course.averageScore }}
          </span>
          <span v-else class="text-body1 text-bold"> - </span>
        </p>
        <NuxtLink to="/course/1">
          <UiBaseButton
            v-if="course.trial?.state && !course.academ?.state"
            class="course-card__button"
            type="primary"
            size="small"
          >
            Приступить к обучению
          </UiBaseButton>
        </NuxtLink>
        <UiBaseButton
          v-if="course.academ?.state"
          class="course-card__button"
          type="primary"
          size="small"
        >
          Продолжить обучение
        </UiBaseButton>
        <UiBaseButton
          v-if="!course.academ?.state && course.isStarted"
          class="course-card__button"
          type="boarded"
          size="small"
        >
          Запросить академический отпуск
        </UiBaseButton>
        <UiBaseButton
          v-if="course.shouldPay"
          class="course-card__button"
          type="primary"
          size="small"
          @click="() => emit('pay')"
        >
          Оплатить
        </UiBaseButton>
        <div class="course-card__link-list">
          <UiBaseButton
            v-for="(doc, i) in course.docs"
            :key="i"
            type="external-link"
            size="small"
          >
            {{ doc.name }}
          </UiBaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['pay'])

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

    @include media($bp-sm) {
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

    @include media($bp-sm) {
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
    @include media($bp-sm) {
      width: 50%;
    }
  }

  &__right-side,
  .right-side {
    padding-left: 0px;

    @include media($bp-sm) {
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

    @include media($bp-sm) {
      justify-content: flex-end;
      gap: 16px;
    }
  }

  &__button {
    width: 100% !important;

    @include media($bp-xs) {
      width: fit-content !important;
    }
  }
}
</style>
