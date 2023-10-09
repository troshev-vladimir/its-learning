<!-- eslint-disable no-unused-vars -->
<template>
  <section class="q-mb-xl">
    <div class="container">
      <span class="text-body1 text-secondary">
        Для тех кто уверен в своих возможностях
      </span>
      <h1 class="text-h1 q-mt-md q-mb-lg">
        Полное погружение <br />
        <span class="text-accent">в мир 1С программирования</span>
      </h1>

      <p class="text-body1 q-mb-md">
        Для тех, кто уверен в своих силах, мы создали программы для максимально
        быстрого и эффективного погружения в 1С программирование.
      </p>
      <p class="text-body1">
        Выбирая наши комплексные программы, ты получаешь знания и практические
        навыки, к которым 1С программист идет в течение года и более, набивая
        шишки на собственном опыте, всего за 5 месяцев, обучившись у лучших
        практиков отрасли.
      </p>
    </div>
  </section>

  <section class="q-mb-xl">
    <div class="container">
      <div class="row">
        <div
          v-for="card in cards"
          :key="card.id"
          class="col-12 col-md-4 q-mb-md q-mb-md-none"
        >
          <ui-card
            :title="card.title"
            :description="card.description"
            :items="card.items"
            :criterias="card.criterias"
            :selected="card.id === selectedId"
            @select="selectProgram(card.id)"
            @description="showProgram(card)"
          ></ui-card>
        </div>
      </div>
    </div>
  </section>

  <section class="q-mb-xl">
    <div class="container">
      <div class="row q-col-gutter-y-md">
        <div class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
          <q-input
            v-model="promocode"
            label="Ввести промокод"
            color="primary"
            maxlength="6"
            lazy-rules
            class="ui-input q-mb-sm"
            no-error-icon
            outlined
            :rules="[
              (val) =>
                val.length === 6 ||
                val.length === 0 ||
                'Неправильный промокод, необходимо 6 символов',
            ]"
          >
          </q-input>
        </div>
      </div>
      <div class="row justify-center q-col-gutter-y-md">
        <div class="col-12 col-sm-10 col-md-6">
          <TinkoffPaymentForm
            :order-data="{
              order: currentProgram?.title || '',
              description: currentProgram?.description || '',
            }"
            :amount="currentProgram?.price.value || 0"
          >
            <template #default="{ handler }">
              <UiButton
                :disable="!isSelectedProgram"
                color="white"
                text-color="primary"
                type="long"
                class="full-width"
                @click="handler"
              >
                КУПить ТАРИФ
              </UiButton>
            </template>
          </TinkoffPaymentForm>
        </div>
        <div class="col-12 col-sm-10 col-md-6">
          <q-btn-dropdown
            split
            color="white"
            :disable-main-btn="!isSelectedProgram"
            dropdown-icon="fas fa-chevron-down"
            :label="`Оформить рассрочку (${installment} мес.)`"
            class="full-width"
            auto-close
            text-color="black"
            @click="buyProgramViaInstallment"
          >
            <q-list>
              <q-item
                v-for="(instalmentOption, idx) in instalmentOptions"
                :key="idx"
                v-close-popup
                clickable
                :active="installment === instalmentOption"
                active-class="bg-teal-1 text-grey-8 no-pointer-events"
                @click="installment = instalmentOption"
              >
                <q-item-section>
                  <q-item-label>
                    На {{ instalmentOption }} месяца
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import tinkoff from "@tcb-web/create-credit";
import { Card } from "./types";
// import { DemoFlows } from "@tcb-web/create-credit";
import TinkoffPaymentForm from "@/components/TinkoffPaymentForm";
import useConstants from "./composables/useConstants";

const promocode = ref("");
const selectedId = ref<number>();
const installment = ref(3);

const isSelectedProgram = computed(
  () => selectedId.value !== null && typeof selectedId.value !== "undefined"
);

const { cards, instalmentOptions, getCurrentInstallment, currentProgram } =
  useConstants(selectedId);

const selectProgram = (id: number) => {
  selectedId.value = id;
};

const showProgram = (card: Card) => {
  const link = card.linkToProgram;
  window.open(link, "_blank")?.focus();
};

const buyProgramViaInstallment = () => {
  tinkoff.createDemo(
    {
      sum: currentProgram.value?.price.value || 0,
      items: [
        {
          name: currentProgram.value?.title || "",
          price: currentProgram.value?.price.value || 0,
          quantity: 1,
        },
      ],
      // demoFlow: DemoFlows.sms,
      promoCode: getCurrentInstallment(installment.value),
      shopId: "d7836c7b-d032-493f-a2e3-ce02961930ae",
      showcaseId: "ff69b584-4d85-4ff6-9c44-8572184eaa1d",
    },
    { view: "modal" }
  );
};
</script>

<style lang="scss">
@import url("@/styles/variables.scss");
.q-btn-group {
  border-radius: $radius-lg !important;
}

.q-btn-dropdown button:first-child {
  font-weight: 400;
  font-size: 20px;
  font-weight: 700;
  padding: 16px;
  background-color: #fff;
  border-radius: $radius-lg 0 0 $radius-lg;
}

.q-btn-dropdown button:last-child {
  border-radius: 0 $radius-lg $radius-lg 0;
}
</style>

<style scoped lang="scss">
.learning-time {
  display: flex;
}

.button {
  width: 100%;

  &--selectable {
    svg {
      color: #fff;
    }
  }
}

.button--active {
  svg {
    color: #333;
  }
}
</style>
