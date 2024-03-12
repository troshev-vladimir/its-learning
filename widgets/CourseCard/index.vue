<template>
  <Transition name="fade" mode="out-in" :duration="200">
    <div v-if="!isLoading" class="course-card base-block">
      <div class="course-card__container">
        <div class="course-card__left-side">
          <div class="left-side__block">
            <client-only>
              <UiBaseTracker
                class="course-card__tracker"
                :value="course?.progress"
              />
            </client-only>
            <nuxt-link to="/course/1/description/">
              <p class="text-h2">{{ course?.title }}</p>
            </nuxt-link>
            <p v-if="course?.isEnded" class="text-body2 text-gray-400">
              Курс завершён
            </p>
            <p
              v-if="course?.academ?.state && course.academ?.date"
              class="text-body2 text-gray-400"
            >
              Предоставлен академический отпуск до {{ course?.academ?.date }}
            </p>
            <p v-if="course?.trial?.state" class="text-body2 text-gray-400">
              Бесплатный период на {{ course?.trial?.days }} день
            </p>
          </div>
          <div class="left-side__block">
            <p v-if="course?.isStarted && course?.startDate" class="text-body2">
              Дата начала: {{ course?.startDate }}
            </p>
            <p
              v-if="course?.isStarted && course?.planEndDate"
              class="text-body2"
            >
              Планируемая дата окончания: {{ course?.startDate }}
            </p>
            <p v-if="course?.isEnded && course?.realEndDate" class="text-body2">
              Дата окончания: {{ course?.realEndDate }}
            </p>
          </div>
        </div>

        <div class="course-card__right-side">
          <p class="text-body2">
            Средний балл
            <span v-if="course?.averageScore" class="text-body1 text-bold">
              {{ course?.averageScore }}
            </span>
            <span v-else class="text-body1 text-bold"> - </span>
          </p>
          <div class="course-card__buttons-block">
            <UiBaseButton
              v-if="course?.trial?.state && !course?.academ?.state"
              :to="`/course/${course?.id}`"
              class="course-card__button"
              type="primary"
              size="small"
            >
              Приступить к обучению
            </UiBaseButton>
            <UiBaseButton
              v-if="course?.academ?.state"
              :to="`/course/${course?.id}`"
              class="course-card__button"
              type="primary"
              size="small"
            >
              Продолжить обучение
            </UiBaseButton>
            <AcademyButton
              v-show="!course?.academ?.state && course?.isStarted"
            />
            <ClientOnly>
              <PaymentButton v-show="course?.shouldPay" />
            </ClientOnly>
            <ContractSigningButton />
            <UiBaseButton type="boarded" size="small" @click="getManagerCall">
              Связаться с менеджером
            </UiBaseButton>
          </div>
          <div class="course-card__links">
            <div class="course-card__link-list">
              <UiBaseButton
                v-for="(doc, i) in course?.docs"
                :key="i"
                type="external-link"
                size="small"
              >
                {{ doc.name }}
              </UiBaseButton>
            </div>
            <div class="course-card__link-list">
              <UiBaseButton
                v-for="(diploma, i) in course?.diplomas"
                :key="i"
                type="external-link"
                size="small"
                :to="diploma.link"
              >
                {{ diploma.name }}
              </UiBaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Skeleton v-else />
  </Transition>
</template>

<script lang="ts" setup>
import PaymentButton from './ui/PaymentButton.vue'
import AcademyButton from './ui/AcademyButton.vue'
import ContractSigningButton from './ui/ContractSigningButton.vue'
import type { CourcePreview } from '~/api/cource/types'
import Skeleton from './skeleton.vue'
import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

const emit = defineEmits(['pay'])

interface Props {
  course?: CourcePreview
  isLoading?: boolean
}
const props = defineProps<Props>()

const getManagerCall = () => {
  notify({
    status: 'info',
    title: 'С вами скоро свяжется менеджер',
  })
}
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
    margin-top: 16px;

    @include media($bp-sm) {
      margin-top: 0px;
      align-items: flex-end;
      width: 50%;
      padding-left: 40px;

      &__date {
        text-align: right;
      }
    }
  }

  &__buttons-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $md;
  }

  &__link-list {
    display: flex;
    flex-wrap: wrap;
    gap: $sm;

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
