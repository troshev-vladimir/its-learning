<template>
  <article class="ui-card shadow-2 full-height">
    <div class="row q-mb-md q-gutter-x-md q-gutter-y-md">
      <div class="col-auto flex items-center">
        <h1 class="text-h2">
          <span class="text-body1 text-bold">Программа </span>
          <span class="text-accent">{{ card.name }}</span>
        </h1>
      </div>
      <div class="col-auto">
        <ui-button
          size="sm"
          outline
          color="secondary"
          tag="a"
          target="_blank"
          text-class="text-secondary"
          :href="card.linkToProgram || '#'"
        >
          Подробнее
        </ui-button>
      </div>
    </div>

    <p class="text-body1 q-mb-md text-bold" v-html="card.description"></p>

    <p class="text-body2 q-mb-md">
      Твоя будущая зарплата:
      <span class="text-body1 text-bold text-no-wrap">
        {{ formatNumber(card.futureSalary) }} ₽
      </span>
    </p>

    <ul class="adventages q-mb-lg" style="flex: 1 0 auto">
      <li
        v-for="(advantage, idx) in card.advantages"
        :key="idx"
        class="text-body2 list-item"
      >
        {{ advantage }}
      </li>
    </ul>

    <div class="criterias">
      <div class="criteria text-body2 q-mb-md">
        <span class="criteria__name q-mr-sm">Продолжительность обучения:</span>
        <span class="text-body2">
          <p class="text-body2">
            <span class="q-mr-sm text-body1 text-bold">
              {{ card.period }}
            </span>
            <span>мес.</span>
          </p>
        </span>
      </div>
      <div class="criteria text-body2 q-mb-md">
        <span class="criteria__name q-mr-sm">Стоимость программы:</span>
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

      <div class="criteria text-body2 q-mb-md">
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

    <div
      v-if="card.price.withDiscount !== card.price.actual"
      class="text-body2 q-mb-md flex wrap"
    >
      <span class="q-mr-sm">Скидка:</span>
      <p class="text-body2">
        <span class="text-body1 text-bold">
          {{ formatNumber(card.discount || 0) }}</span
        ><span>₽</span>
      </p>
    </div>

    <div
      v-if="card.price.withDiscount !== card.price.actual"
      class="text-body2 q-mb-md flex wrap"
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
      <div class="text-body2 flex wrap q-mb-md">
        <span class="q-mr-sm">Прибавка к зарплате:</span>
        <p class="text-body2">
          <span class="text-body1 text-bold">
            {{ formatNumber(card.salaryAddition || 0) }}</span
          >
          <span>₽</span>
        </p>
      </div>
    </div>

    <TinkoffPaymentForm
      :order-data="{
        order: card.name || '',
        description: 'Твой путь в 1С программирование начинается прямо сейчас',
      }"
      :amount="card.price.withDiscount"
    >
      <template #default="{ handler }">
        <UiButton color="white" text-color="primary" size="sm" @click="handler">
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
.ui-card {
  background-color: var(--q-white);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  ._old-price {
    text-decoration: line-through;
    color: #999;
  }

  .list-item::before {
    background-color: var(--q-accent);
  }

  .criteria {
    display: flex;
    flex-wrap: wrap;
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
