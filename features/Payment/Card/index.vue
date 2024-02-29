<template>
  <div v-if="isLoading === false" class="payment-card base-block">
    <div class="payment-card__container">
      <p class="text-body1 q-mb-md">Ваша программа обучения:</p>
      <p class="text-h1"><span class="text-blue-600">1С:</span>Программист</p>
      <div class="payment-card__content">
        <div class="payment-card__about-programm-block">
          <p class="text-body2">Главное о программе обучения:</p>
          <div class="about-programm-block__list">
            <div class="about-programm-block__item">
              <p class="text-body1">6</p>
              <p class="text-body1">месяцев</p>
            </div>
            <div class="about-programm-block__item">
              <p class="text-body1">200</p>
              <p class="text-body1">часов теории</p>
            </div>
            <div class="about-programm-block__item">
              <p class="text-body1">500</p>
              <p class="text-body1">часов практики</p>
            </div>
          </div>
        </div>
        <div class="payment-card__programm-cost-block">
          <div class="programm-cost-block__deferred-payment">
            <p class="text-body2">В рассрочку</p>
            <div>
              <p
                v-if="value.deferredPrice?.withDiscount"
                class="text-body1 text-bold"
              >
                {{ formatNumber(value.deferredPrice?.withDiscount) }} руб. /
                мес.
              </p>
              <p
                v-if="value.deferredPrice?.real"
                class="text-body2 text-crossed-out text-gray-300"
              >
                {{ formatNumber(value.deferredPrice?.real) }} руб.
              </p>
            </div>
          </div>
          <div class="programm-cost-block__full-payment">
            <p class="text-body2">Одним платежом</p>
            <p class="full-payment__discount-card text-body2">скидка 20%</p>
            <p v-if="value.fullPrice?.withDiscount" class="text-body1">
              {{ formatNumber(value.fullPrice?.withDiscount) }} руб.
            </p>
            <p
              v-if="value.fullPrice?.real"
              class="text-body2 text-crossed-out text-gray-300"
            >
              {{ formatNumber(value.fullPrice?.real) }} руб.
            </p>
          </div>
        </div>
      </div>
      <div class="payment-card__payment-selection-block">
        <div class="payment-selection-block__choose-buttons-block">
          <UiBaseRadio
            v-model="paymentChoice"
            name="radio"
            value="full"
            label="Банковская карта"
          />
          <UiBaseRadio
            v-model="paymentChoice"
            name="radio"
            value="deferred"
            label="Рассрочка"
          />
        </div>
        <UiSelect
          v-show="paymentChoice === 'deferred'"
          v-model="selectedPeriod"
          name="period"
          clearable
          :options="[
            { label: 'В рассрочку на 3 мес.', value: '3', selected: false },
            { label: 'В рассрочку на 6 мес.', value: '6', selected: false },
            { label: 'В рассрочку на 12 мес.', value: '12', selected: false },
            { label: 'В кредит на 24 мес.', value: '24', selected: false },
          ]"
          label="Выберите срок рассрочки"
          class="payment-selection-block__payment-period"
          :validation-result="{
            status: isPeriodError ? 'error' : 'success',
            message: 'Для рассрочки надо выбрать период обязательно',
          }"
          @update:model-value="isPeriodError = false"
        />
        <div class="row q-gutter-sm q-md-gutter-md">
          <UiBaseButton
            v-if="paymentChoice === 'deferred'"
            type="primary"
            size="small"
            @click="openDeferredMadal"
          >
            Купить
          </UiBaseButton>
          <a v-else-if="paymentUrl" :href="paymentUrl" target="_blank">
            <UiBaseButton type="primary" size="small"> Купить </UiBaseButton>
          </a>
          <nuxt-link to="/course/1/description/">
            <UiBaseButton type="boarded" size="small">
              Смотреть программу
            </UiBaseButton>
          </nuxt-link>
        </div>
      </div>
      <div class="payment-card__docs">
        <UiBaseButton
          v-for="(doc, i) in value.docs"
          :key="i"
          type="link"
          tag="a"
          :href="doc.link"
          target="_blank"
          size="small"
        >
          {{ doc.name }}
        </UiBaseButton>
      </div>
    </div>
  </div>
  <Skeleton v-else />
</template>

<script lang="ts" setup>
import { formatNumber } from '~/utils/helpers'
import { useUserStore } from '~/stores/user'
import { useNotification } from '@kyvg/vue3-notification'
import { TinkoffPayment } from '~/utils/TinkoffPayment'
import { buyViaInstallment } from '~/utils/TinkoffInstallment'
import type { IDoc } from '~/types'
import Skeleton from './skeleton.vue'

const { notify } = useNotification()

interface ICost {
  id: string
  fullPrice: {
    real: number
    withDiscount?: number
  }
  deferredPrice?: {
    real: number
    withDiscount?: number
  }
  docs?: IDoc[]
}
interface Props {
  value: ICost
}

const isLoading = ref(false)

const props = withDefaults(defineProps<Props>(), {
  value: () => ({
    id: '1',
    fullPrice: {
      real: 150_000,
      withDiscount: 120_000,
    },
    deferredPrice: {
      real: 7567,
      withDiscount: 6054,
    },
    docs: [
      {
        name: 'Договор оферты',
        link: 'https://gitlab.itsportal.ru/troshev/itseducation',
      },
      {
        name: 'Приложение к договору оферты №1',
        link: 'https://gitlab.itsportal.ru/troshev/itseducation',
      },
      {
        name: 'Приложение к договору оферты №2',
        link: 'https://gitlab.itsportal.ru/troshev/itseducation',
      },
    ],
  }),
})
const isPeriodError = ref(false)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const paymentChoice = ref<'full' | 'deferred'>('full')
const selectedPeriod = ref()
const paymentUrl = ref('')

const openDeferredMadal = () => {
  isPeriodError.value = false

  if (!selectedPeriod.value || !selectedPeriod.value.length) {
    notify({
      title: 'Выберите период оплаты',
      type: 'warn',
    })
    isPeriodError.value = true
    return
  }
  buyViaInstallment({
    sum: props.value.fullPrice.withDiscount || props.value.fullPrice.real,
    period: selectedPeriod.value === 24 ? 'default' : selectedPeriod.value,
    title: '1С:Программист',
  })
}

onMounted(async () => {
  const tinkoffPaymentUrl = await TinkoffPayment({
    amount: props.value.fullPrice.withDiscount || props.value.fullPrice.real,
    orderData: {
      description: '1С:Программист',
      name: '1С:Программист',
    },
    userData: {
      fio:
        user.value?.name +
        ' ' +
        user.value?.surname +
        ' ' +
        user.value?.thirdname,
      phone: user.value?.phone,
      email: user.value?.email,
    },
  })

  paymentUrl.value = tinkoffPaymentUrl || ''
})
</script>

<style lang="scss" scoped>
.payment-card {
  &__content {
    @include media($bp-sm) {
      display: flex;
      justify-content: space-between;
    }
  }

  &__about-programm-block,
  .about-programm-block {
    margin-top: 32px;
    &__list {
      margin-top: 16px;
      display: flex;
      column-gap: 32px;
      row-gap: 16px;
      flex-wrap: wrap;

      @include media($bp-xs) {
        column-gap: 48px;
      }
    }
  }

  &__programm-cost-block,
  .programm-cost-block {
    display: flex;
    column-gap: 24px;
    margin-top: 24px;

    @include media($bp-md) {
      column-gap: 64px;
    }

    &__deferred-payment {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__full-payment,
    .full-payment {
      &__discount-card {
        background: $yellow-400;
        width: fit-content;
        padding: 2px 22px;
        border-radius: 8px;
      }
    }
  }

  &__payment-selection-block,
  .payment-selection-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 48px;
    row-gap: 24px;
    margin: 32px 0;

    @include media($bp-sm) {
      flex-direction: row;
      align-items: center;
    }

    &__choose-buttons-block {
      display: flex;
      flex-direction: column;

      label {
        &:first-child {
          margin-bottom: 8px;
        }
      }
    }

    &__payment-period {
      min-width: 300px;
      padding-top: 0;
    }
  }

  &__docs {
    display: flex;
    column-gap: 32px;
    row-gap: 8px;
    flex-wrap: wrap;
    margin-top: 16px;
  }
}
</style>
~/api/CustomError
