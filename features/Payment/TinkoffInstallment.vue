<template>
  <q-btn-dropdown
    split
    color="white"
    dropdown-icon="fas fa-chevron-down"
    :label="
      localPeriod === 24
        ? `В кредит до (${localPeriod} мес.)`
        : `В рассрочку (${localPeriod} мес.)`
    "
    class="full-width size--xs q-mt-md"
    auto-close
    text-color="black"
    @click="buyProgramViaInstallment"
  >
    <q-list>
      <q-item
        v-for="(instalmentOption, idx) in [3, 6, 24]"
        :key="idx"
        v-close-popup
        clickable
        :active="localPeriod === instalmentOption"
        active-class="bg-blue-2 text-blue-5 no-pointer-events"
        @click="localPeriod = instalmentOption"
      >
        <q-item-section>
          <q-item-label v-if="instalmentOption === 24">
            В кредит до {{ instalmentOption }} месяцев
          </q-item-label>
          <q-item-label v-else> На {{ instalmentOption }} месяца </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import tinkoff from '@tcb-web/create-credit'
import { ref } from 'vue'

const props = defineProps<{
  summ: number;
  title: string;
}>()

const localPeriod = ref(24)

interface Installment {
  sum: number
  period: number | string
  title: string
}

const installmentValues = {
  3: 'installment_0_0_3_4',
  6: 'installment_0_0_6_6,5',
  // 12: "installment_0_0_12_11,5",
}

function buyViaInstallment({ sum, period, title }: Installment) {
  tinkoff.create(
    {
      sum: sum,
      items: [
        {
          name: title || '',
          price: sum || 0,
          quantity: 1,
        },
      ],
      // demoFlow: DemoFlows.sms,
      promoCode: installmentValues[period as keyof typeof installmentValues],
      shopId: 'd7836c7b-d032-493f-a2e3-ce02961930ae',
      showcaseId: 'ff69b584-4d85-4ff6-9c44-8572184eaa1d',
    },
    { view: 'modal' }
  )
}

const buyProgramViaInstallment = () => {
  buyViaInstallment({
    sum: props.summ,
    period:
    localPeriod.value === 24
        ? 'default'
        : localPeriod.value,
    title: 'Программа ' + props.title,
  })
  }
</script>

<style lang="scss" scoped>
.program-card {
  background-color: var(--q-white);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;

  &__header {
    margin-bottom: $md;
    display: block;

    .header__container {
      display: block;

      @media (min-width: $breakpoint-sm) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
      }
    }

    .header__left-side {
      width: 100%;

      @media (min-width: $breakpoint-xs) {
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

    @media (min-width: $breakpoint-sm) {
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

    @media screen and (max-width: $breakpoint-sm) {
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
