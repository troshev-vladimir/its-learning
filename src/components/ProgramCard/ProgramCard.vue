<template>
  <article
    class="ui-card shadow-2"
    :class="{ 'ui-card--selected': props.selected }"
  >
    <div class="row q-mb-md q-gutter-x-md q-gutter-y-md">
      <div class="col-auto flex items-center">
        <h1 class="text-h2" v-html="props.title"></h1>
      </div>
      <div class="col-auto">
        <ui-button
          size="sm"
          outline
          color="secondary"
          text-class="text-secondary"
          @click="emit('description')"
        >
          Подробнее
        </ui-button>
      </div>
    </div>

    <p class="text-body2 q-mb-md">
      Твоя будущая зарплата:
      <span class="text-h2">{{ formatNumber() }}</span>
    </p>

    <ul class="adventages q-mb-lg">
      <li v-for="(item, idx) in items" :key="idx" class="text-body2 list-item">
        {{ item }}
      </li>
    </ul>

    <div class="criterias q-mt-auto">
      <div class="criteria text-body2 q-mb-md">
        <span class="criteria__name q-mr-sm">Продолжительность обучения:</span>
        <span class="text-body2">
          <p class="text-body2">
            <span class="q-mr-sm text-body1 text-bold">
              {{ criterias.duration.value }}
            </span>
            <span>{{ criterias.duration.dimension }}</span>
          </p>
        </span>
      </div>
      <div class="criteria text-body2 q-mb-md">
        <span class="criteria__name q-mr-sm">Стоимость программы:</span>
        <p class="text-body2">
          <span
            class="text-body1 text-bold"
            :class="{ '_old-price q-mr-sm': isPromocodeLegal }"
          >
            {{ formatNumber(criterias.price.value) }}
          </span>
          <span
            v-if="isPromocodeLegal"
            class="text-body1 text-bold text-green-14"
          >
            {{ formatNumber(price.value - price.discount) }}
          </span>
          <span>{{ criterias.price.dimension }}</span>
        </p>
      </div>

      <div class="criteria text-body2 q-mb-md">
        <span class="criteria__name q-mr-sm">Рассрочка от:</span>
        <p class="text-body2">
          <span
            class="text-body1 text-bold"
            :class="{ '_old-price q-mr-sm': isPromocodeLegal }"
          >
            {{ formatNumber(price.installment) }}
          </span>
          <span
            v-if="isPromocodeLegal"
            class="text-body1 text-bold text-green-14"
          >
            {{ formatNumber(price.discountInstallment) }}
          </span>
          <span>{{ criterias.installment.dimension }}</span>
        </p>
      </div>
    </div>

    <div class="text-body2 q-mb-md flex wrap">
      <span class="q-mr-sm">Скидка:</span>
      <p class="text-body2">
        <span class="text-body1 text-bold"> {{ card. }}</span
        ><span>₽</span>
      </p>
    </div>

    <div class="text-body2 q-mb-md flex wrap">
      <span class="q-mr-sm">Сгорает:</span>
      <p class="text-body2">
        <span class="text-body1 text-bold"> 10000</span>
        <span>₽</span>
      </p>
    </div>

    <div class="text-body2 q-mb-md flex wrap">
      <span class="q-mr-sm">Прибавка к зарплате:</span>
      <p class="text-body2">
        <span class="text-body1 text-bold"> {{ bonus }}</span>
        <span>₽</span>
      </p>
    </div>
    <TinkoffPaymentForm
      :order-data="{
        order: currentProgram?.title || '',
        description: currentProgram?.description || '',
      }"
      :amount="currentSumm(card.price)"
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
      :label="`В рассрочку (${card.installmentPeriod} мес.)`"
      class="full-width size--xs q-mt-md"
      auto-close
      text-color="black"
      @click="buyViaInstallment"
    >
      <q-list>
        <q-item
          v-for="(instalmentOption, idx) in instalmentOptions"
          :key="idx"
          v-close-popup
          clickable
          :active="card.installmentPeriod === instalmentOption"
          active-class="bg-blue-2 text-blue-5 no-pointer-events"
          @click="selectInstallment(card, instalmentOption)"
        >
          <q-item-section>
            <q-item-label> На {{ instalmentOption }} месяца </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <div class="d-flex wrap q-mt-md" style="gap: 16px">
      <a
        class="text-body2 text-blue-6 d-flex items-center"
        :href="documents?.contractLink || '#'"
        target="_blank"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Договор оферты
      </a>
      <a
        class="text-body2 text-blue-6 d-flex items-center"
        :href="documents?.contractAditionLink || '#'"
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
import { defineProps, defineEmits, computed } from "vue";
import TinkoffPaymentForm from "@/components/TinkoffPaymentForm";
import { buyViaInstallment } from "@/helpers/utils";

const emit = defineEmits(["description"]);

export interface Props {
  card: Program;
}

const props = defineProps<Props>();

buyViaInstallment({
  sum: +props.card.price,
  period: props.card.period,
  title: props.card.name,
});
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
