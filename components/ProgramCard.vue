<template>
  <article class="program-card shadow-2 full-height bg-white">
    <div class="program-card__header">
      <div class="text-body1 text-bold q-mb-md q-block">Программа</div>
      <div class="header__container">
        <div class="header__left-side">
          <h1 class="text-h2">
            <span class="text-accent">{{ card.name }}</span>
          </h1>
        </div>
        <div class="header__right-side">
          <p class="text-body1 text-bold" v-html="card.description" />
        </div>
      </div>
    </div>

    <div class="program-card__content">
      <div class="q-mb-md">
        <ul class="adventages q-mb-md" style="flex: 1 0 auto">
          <li
            v-for="(advantage, idx) in card.advantages"
            :key="idx"
            class="text-body2 list-item"
          >
            {{ advantage }}
          </li>
        </ul>
        <div class="program-card__criterias">
          <div class="criteria text-body2">
            <span class="criteria__name q-mr-sm"> Срок обучения: </span>
            <span class="text-body2">
              <p class="text-body2">
                <span class="q-mr-sm text-body1 text-bold">
                  {{ card.period }}
                </span>
                <span>мес.</span>
              </p>
            </span>
          </div>

          <div class="criteria">
            <p class="text-body2">Твоя будущая зарплата:</p>
            <span class="text-body1 text-bold text-no-wrap">
              {{ formatNumber(card.futureSalary) }} ₽
            </span>
          </div>
        </div>
      </div>
      <div class="content__right-side">
        <div class="program-card__criterias">
          <div class="criteria text-body2">
            <span class="criteria__name q-mr-sm"> Стоимость программы: </span>
            <p class="text-body2">
              <span
                v-if="card.price.withDiscount !== card.price.actual"
                class="text-body2 text-bold _old-price q-mr-sm"
              >
                {{ formatNumber(card.price.actual) }}
              </span>
              <span
                class="text-body1 text-bold"
                :style="`color: ${
                  card.price.withDiscount !== card.price.actual
                    ? 'var(--q-success)'
                    : '#000'
                }`"
              >
                {{ formatNumber(card.price.withDiscount) }}
              </span>
              <span>₽</span>
            </p>
          </div>

          <div class="criteria text-body2">
            <span class="criteria__name q-mr-sm">Рассрочка от:</span>
            <p class="text-body2">
              <span
                v-if="card.price.withDiscount !== card.price.actual"
                class="text-body2 text-bold _old-price q-mr-sm"
              >
                {{ formatNumber(getInstallment(card.price.actual)) }}
              </span>
              <span
                class="text-body1 text-bold"
                :style="`color: ${
                  card.price.withDiscount !== card.price.actual
                    ? 'var(--q-success)'
                    : '#000'
                }`"
              >
                {{ formatNumber(getInstallment(card.price.withDiscount)) }}
              </span>
              <span>₽/мес.</span>
            </p>
          </div>

          <div
            v-if="card.price.withDiscount !== card.price.actual"
            class="criteria text-body2"
          >
            <span class="q-mr-sm">Скидка:</span>
            <p class="text-body2">
              <span class="text-body1 text-bold">
                {{
                  formatNumber(card.price.actual - card.price.withDiscount || 0)
                }}
              </span>
              <span> ₽ </span>
            </p>
          </div>

          <div v-if="card.price.withDiscount !== card.price.actual" class="">
            <div class="criteria text-body2">
              <span class="q-mr-sm">Прибавка к зарплате:</span>
              <p class="text-body2">
                <span class="text-body1 text-bold">
                  {{ formatNumber(card.salaryAddition || 0) }}</span
                >
                <span>₽</span>
              </p>
            </div>
          </div>
        </div>
        <div class="program-card__buttons-block">
          <a :href="paumentUrl" target="_blank">
            <UiBaseButton
              class="program-card__buy-button"
              color="white"
              text-color="primary"
              size="small"
              type="secondary"
            >
              Купить
            </UiBaseButton>
          </a>
          <div class="row q-gutter-md q-mt-xs">
            <UiSelect
              v-model="selectedPeriod"
              clearable
              :options="[
                { label: 'В рассрочку на 3 мес.', value: '3', selected: false },
                { label: 'В рассрочку на 6 мес.', value: '6', selected: false },
                {
                  label: 'В рассрочку на 12 мес.',
                  value: '12',
                  selected: false,
                },
                { label: 'В кредит на 24 мес.', value: '24', selected: false },
              ]"
              label="Выберите срок рассрочки"
              class="col"
            />
            <UiBaseButton
              class="q-mt-md"
              color="white"
              text-color="primary"
              size="small"
              type="secondary"
              @click="openDeferredModal"
            >
              Взять в рассрочку
            </UiBaseButton>
          </div>
        </div>
      </div>
    </div>

    <slot />

    <div class="d-flex wrap q-mt-md" style="gap: 16px">
      <a
        class="text-body2 text-secondary d-flex items-center"
        href="https://drive.google.com/file/d/1ZNHZx2x22b3iPrefR64JgQxJyruz9M3b/view?usp=share_link"
        target="_blank"
      >
        <UiBaseButton type="link" size="small"> Договор оферты </UiBaseButton>
      </a>
      <a
        v-if="card.linkToContractAddition"
        class="text-body2 text-secondary d-flex items-center"
        :href="card.linkToContractAddition"
        target="_blank"
      >
        <UiBaseButton type="link" size="small">
          Приложение к договору №1
        </UiBaseButton>
      </a>
      <a
        class="text-body2 text-secondary d-flex items-center"
        href="https://drive.google.com/file/d/1Dzm_SQZyGkEM7uAp1zcUEwYylmrhn-nw/view?usp=share_link"
        target="_blank"
      >
        <UiBaseButton type="link" size="small">
          Приложение к договору №2
        </UiBaseButton>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { formatNumber } from '~/utils/helpers'
import { type Program } from '~/api/configurator/program/types'
import useUserStore from '~/stores/configurator/user'
import { TinkoffPayment } from '~/utils/TinkoffPayment'
import { useNotification } from '@kyvg/vue3-notification'
import { buyViaInstallment } from '~/utils/TinkoffInstallment'

const { notify } = useNotification()

export interface Props {
  card: Program
}
const { user } = useUserStore()
const props = defineProps<Props>()

const paumentUrl = ref('')
const selectedPeriod = ref()

const getInstallment = (summ: number) => {
  return Math.round((summ * 1.2108499096) / 24)
}

const openDeferredModal = () => {
  if (!selectedPeriod.value || selectedPeriod.value.length <= 0) {
    notify({
      title: 'Выберите период рассрочки',
      type: 'warn',
    })

    return
  }

  buyViaInstallment({
    sum: props.card.price.withDiscount || props.card.price.actual,
    period: selectedPeriod.value === 24 ? 'default' : selectedPeriod.value,
    title: '1С:Программист',
  })
}

onMounted(async () => {
  const tinkoffPaymentUrl = await TinkoffPayment({
    orderData: {
      description: props.card.name,
      name: props.card.name,
    },
    userData: {
      phone: user.id,
      email: 'email@gmail.com', //user.email
    },
    amount: props.card.price.withDiscount,
  })

  console.log(tinkoffPaymentUrl)

  if (tinkoffPaymentUrl) paumentUrl.value = tinkoffPaymentUrl
})
</script>

<style lang="scss" scoped>
.program-card {
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;

  &__header {
    margin-bottom: $md;
    display: block;

    .header__container {
      display: block;

      @media (min-width: $bp-sm) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
      }
    }

    .header__left-side {
      width: 100%;

      @media (min-width: $bp-xs) {
        margin-bottom: $sm;
      }
    }
    .header__right-side {
      width: 100%;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: $bp-sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .content__right-side {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__buy-button {
    width: 100%;
  }

  &__buttons-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    grid-column-start: 1;
    grid-column-end: 3;
    margin-top: $md;
  }

  &__criterias {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
    height: fit-content;

    @media (min-width: 429px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  ._old-price {
    text-decoration: line-through;
    color: #999;
  }

  .header {
    min-height: 120px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: $bp-sm) {
      min-height: 0;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      gap: 16px;
    }
  }

  .list-item::before {
    background-color: var(--q-accent);
  }

  .criteria {
  }

  &--selected {
    background-color: #fff;

    .list-item::before {
      background-color: var(--q-secondary);
    }
  }

  * {
    color: currentColor;
  }
}
</style>
~/api/configurator/program/types
