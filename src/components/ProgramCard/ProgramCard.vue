<template>
  <article class="program-card shadow-2 full-height">
    <div class="program-card__header">
      <div class="header__left-side">
        <div class="text-body1 text-bold q-mb-md q-block">Программа</div>
        <h1 class="text-h2">
          <span class="text-accent">{{ card.name }}</span>
        </h1>
      </div>
      <div class="header__right-side">
        <p class="text-body1 text-bold" v-html="card.description"></p>
      </div>
    </div>

    <div class="program-card__content q-mb-sm">
      <ul class="adventages" style="flex: 1 0 auto">
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
      </div>
    </div>

    <div class="program-card__content">
      <div class="program-card__buttons-block">
        <TinkoffPaymentForm
          :order-data="{
            order: card.name || '',
            description:
              'Твой путь в 1С программирование начинается прямо сейчас',
          }"
          :amount="card.price.withDiscount"
        >
          <template #default="{ handler }">
            <UiButton
              class="program-card__buy-button"
              color="white"
              text-color="primary"
              size="sm"
              @click="handler"
            >
              КУПить
            </UiButton>
          </template>
        </TinkoffPaymentForm>
        <q-btn-dropdown
          split
          color="white"
          dropdown-icon="fas fa-chevron-down"
          :label="
            currentInstalmentPreiod === 24
              ? `В кредит до (${currentInstalmentPreiod} мес.)`
              : `В рассрочку (${currentInstalmentPreiod} мес.)`
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
              :active="currentInstalmentPreiod === instalmentOption"
              active-class="bg-blue-2 text-blue-5 no-pointer-events"
              @click="currentInstalmentPreiod = instalmentOption"
            >
              <q-item-section>
                <q-item-label v-if="instalmentOption === 24">
                  В кредит до {{ instalmentOption }} месяцев
                </q-item-label>
                <q-item-label v-else>
                  На {{ instalmentOption }} месяца
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="program-card__criterias">
        <div
          v-if="card.price.withDiscount !== card.price.actual"
          class="criteria text-body2"
        >
          <span class="q-mr-sm">Скидка:</span>
          <p class="text-body2">
            <span class="text-body1 text-bold">
              {{ formatNumber(card.discount || 0) }}
            </span>
            <span> ₽ </span>
          </p>
        </div>

        <div
          v-if="card.price.withDiscount !== card.price.actual"
          class="criteria text-body2"
        >
          <span class="q-mr-sm">Сгорает:</span>
          <p class="text-body2">
            <span
              class="text-body1 text-bold"
              :class="{ 'text-red-6': card.burnout > 0 }"
            >
              {{ formatNumber(card.burnout || 0) }}</span
            >
            <span>₽</span>
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
    </div>

    <slot> </slot>

    <div class="d-flex wrap q-mt-md" style="gap: 16px">
      <a
        class="text-body2 text-secondary d-flex items-center"
        href="https://drive.google.com/file/d/1ZNHZx2x22b3iPrefR64JgQxJyruz9M3b/view?usp=share_link"
        target="_blank"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Договор оферты
      </a>
      <a
        v-if="card.linkToContractAddition"
        class="text-body2 text-secondary d-flex items-center"
        :href="card.linkToContractAddition"
        target="_blank"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Приложение к договору №1
      </a>
      <a
        class="text-body2 text-secondary d-flex items-center"
        href="https://drive.google.com/file/d/1Dzm_SQZyGkEM7uAp1zcUEwYylmrhn-nw/view?usp=share_link"
        target="_blank"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Приложение к договору №2
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { formatNumber } from "@/helpers/utils";
import { Program } from "@/types/program";
import { defineProps, ref } from "vue";
import TinkoffPaymentForm from "@/components/TinkoffPaymentForm";
import { buyViaInstallment } from "@/helpers/utils";

export interface Props {
  card: Program;
}

const props = defineProps<Props>();

const currentInstalmentPreiod = ref(6);

const buyProgramViaInstallment = () => {
  buyViaInstallment({
    sum: props.card.price.withDiscount,
    period:
      currentInstalmentPreiod.value === 24
        ? "default"
        : currentInstalmentPreiod.value,
    title: "Программа " + props.card.name,
  });
};

const getInstallment = (summ: number) => {
  return Math.round((summ * 1.2108499096) / 24);
};
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
    @media (min-width: $breakpoint-sm) {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 24px;
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
    gap: 24px;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__buy-button {
    width: 100%;
  }

  &__buttons-block {
    display: flex;
    flex-direction: column;
    justify-content: end;
    grid-row-start: 2;

    @media (min-width: $breakpoint-sm) {
      grid-row-start: 1;
    }
  }

  &__criterias {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;

    @media (min-width: 429px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  ._old-price {
    text-decoration: line-through;
    color: #999;
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
