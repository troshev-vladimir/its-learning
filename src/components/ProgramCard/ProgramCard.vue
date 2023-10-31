<template>
  <article class="ui-card shadow-2 full-height">
    <div class="row q-mb-md q-gutter-x-md q-gutter-y-md">
      <div class="col-auto flex items-center">
        <h1 class="text-h2">
          Программа <span class="text-accent">{{ card.name }}</span>
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

    <ul class="adventages q-mb-lg">
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
          <span class="text-body1 text-bold _old-price q-mr-sm">
            {{ formatNumber(card.price.actual) }}
          </span>
          <span class="text-body1 text-bold text-green-14">
            {{ formatNumber(card.price.withDiscount) }}
          </span>
          <span>₽</span>
        </p>
      </div>

      <div class="criteria text-body2 q-mb-md">
        <span class="criteria__name q-mr-sm">Рассрочка от:</span>
        <p class="text-body2">
          <span class="text-body1 text-bold _old-price q-mr-sm">
            {{ formatNumber(Math.floor(card.installment.actual)) }}
          </span>
          <span class="text-body1 text-bold text-green-14">
            {{ formatNumber(Math.floor(card.installment.withDiscount)) }}
          </span>
          <span>₽/мес.</span>
        </p>
      </div>
    </div>

    <div class="text-body2 q-mb-md flex wrap">
      <span class="q-mr-sm">Скидка:</span>
      <p class="text-body2">
        <span class="text-body1 text-bold">
          {{ formatNumber(card.discount || 0) }}</span
        ><span>₽</span>
      </p>
    </div>

    <div class="text-body2 q-mb-md flex wrap">
      <span class="q-mr-sm">Сгорает:</span>
      <p class="text-body2">
        <span class="text-body1 text-bold">
          {{ formatNumber(card.burnout || 0) }}</span
        >
        <span>₽</span>
      </p>
    </div>

    <div class="" style="flex: 1 0 auto">
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
          КУПить ТАРИФ
        </UiButton>
      </template>
    </TinkoffPaymentForm>
    <q-btn-dropdown
      split
      color="white"
      dropdown-icon="fas fa-chevron-down"
      :label="`В рассрочку (${currentInstalmentPreiod} мес.)`"
      class="full-width size--xs q-mt-md"
      auto-close
      text-color="black"
      @click="buyProgramViaInstallment"
    >
      <q-list>
        <q-item
          v-for="(instalmentOption, idx) in [3, 6, 12]"
          :key="idx"
          v-close-popup
          clickable
          :active="currentInstalmentPreiod === instalmentOption"
          active-class="bg-blue-2 text-blue-5 no-pointer-events"
          @click="currentInstalmentPreiod = instalmentOption"
        >
          <q-item-section>
            <q-item-label> На {{ instalmentOption }} месяца </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <div class="d-flex wrap q-mt-md" style="gap: 16px">
      <a
        v-if="card.linkToContract"
        class="text-body2 text-blue-6 d-flex items-center"
        :href="card.linkToContract"
        target="_blank"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Договор оферты
      </a>
      <a
        v-if="card.linkToContractAddition"
        class="text-body2 text-blue-6 d-flex items-center"
        :href="card.linkToContractAddition"
        target="_blank"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Приложение к договору
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

const currentInstalmentPreiod = ref(12);

const buyProgramViaInstallment = () => {
  buyViaInstallment({
    sum: props.card.price.withDiscount,
    period: currentInstalmentPreiod.value,
    title: "Программа " + props.card.name,
  });
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
