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

    <p class="text-body2 q-mb-md" v-html="description"></p>
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
            {{ criterias.price.value }}
          </span>
          <span
            v-if="isPromocodeLegal"
            class="text-body1 text-bold text-green-14"
          >
            {{ price.value - price.discount }}
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
            {{ price.installment }}
          </span>
          <span
            v-if="isPromocodeLegal"
            class="text-body1 text-bold text-green-14"
          >
            {{ price.discountInstallment }}
          </span>
          <span>{{ criterias.installment.dimension }}</span>
        </p>
      </div>
    </div>

    <slot> </slot>

    <div class="d-flex wrap q-mt-md">
      <a
        class="text-body2 text-blue-6 d-flex items-center"
        :href="documents?.contractLink || '#'"
        target="_blank"
        rel="noopener noreferrer"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Скачать договор оферты
      </a>
      <a
        class="text-body2 text-blue-6 d-flex items-center"
        :href="documents?.contractAditionLink || '#'"
        target="_blank"
        rel="noopener noreferrer"
      >
        <q-icon name="fas fa-external-link-alt" class="q-mr-sm" />
        Скачать приложение к договору
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["description"]);
import { Card } from "@/views/TariffSelectorPage/types";

export interface Props {
  title: string;
  description: string;
  criterias: Card["criterias"];
  price: Card["price"];
  items: [];
  selected: boolean;
  isPromocodeLegal: boolean;
  documents: {
    contractAditionLink: string;
    contractLink: string;
  };
}
const props = defineProps<Props>();
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
