<!-- eslint-disable no-unused-vars -->
<template>
  <section :style="getSectionStyle" class="q-mt-md">
    <div class="container" style="height: 100%">
      <div class="row">
        <div
          v-for="card in programs"
          :key="card.id"
          class="col-12 col-md-4 q-mb-md q-mb-md-none"
        >
          <ui-card
            :title="`Программа <span class='text-accent'>${card.name}</span>`"
            :description="card.description"
            :items="card.items"
            :criterias="card.criterias"
            :price="card.price"
            :documents="card.documents"
            class="full-height"
            :is-promocode-legal="isPromocodeLegal"
            @description="showProgram(card)"
          >
            <div class="row q-mb-md">
              <!--  flex justify-center justify-md-left -->
              <div class="col-12">
                <q-chip
                  v-if="promocode && isPromocodeLegal"
                  outline
                  color="green"
                  text-color="white"
                  icon="fas fa-chevron-down"
                  class="q-mt-sm"
                >
                  {{ acceptedPromocodeText }}
                </q-chip>
                <q-input
                  v-else
                  v-model="promocode"
                  label="Ввести промокод"
                  color="primary"
                  maxlength="6"
                  lazy-rules
                  class="ui-input size-sm full-width"
                  dense
                  no-error-icon
                  outlined
                  :rules="[
                    (val) =>
                      val.length === 6 ||
                      val.length === 0 ||
                      'Неправильный промокод, необходимо 6 символов',
                  ]"
                  :loading="promocodeLoadding"
                  @blur="proovePromocode"
                >
                </q-input>
              </div>
            </div>
            <TinkoffPaymentForm
              :order-data="{
                order: currentProgram?.title || '',
                description: currentProgram?.description || '',
              }"
              :amount="currentSumm(card.price)"
            >
              <template #default="{ handler }">
                <UiButton
                  :disable="promocodeLoadding"
                  color="white"
                  text-color="primary"
                  size="sm"
                  @click="handler"
                >
                  КУПить ТАРИФ
                </UiButton>
              </template>
            </TinkoffPaymentForm>
            <q-btn-dropdown
              split
              color="white"
              :disable-main-btn="promocodeLoadding"
              dropdown-icon="fas fa-chevron-down"
              :label="
                card.installmentPeriod === 24
                  ? `В кредит до (${card.installmentPeriod} мес.)`
                  : `В рассрочку (${card.installmentPeriod} мес.)`
              "
              class="full-width size--xs q-mt-md"
              auto-close
              text-color="black"
              @click="buyProgramViaInstallment(card)"
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
          </ui-card>
        </div>
      </div>
      <div class="placeholder q-mt-sm q-mt-md-xl"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import { Card } from "./types";
import { useMeta, useQuasar } from "quasar";
// import { DemoFlows } from "@tcb-web/create-credit";
import TinkoffPaymentForm from "@/components/TinkoffPaymentForm";
import useConstants from "./composables/useConstants";
import usePromocode from "./composables/usePromocode";
import { buyViaInstallment } from "@/helpers/utils";
import usePrograms from "../TariffCalculatorPage/composables/usePrograms";

const instance = getCurrentInstance();
useMeta({
  title: "BIG SALE | ITS",
});
const $q = useQuasar();
const selectedId = ref<number>();

const acceptedPromocodeText = computed(() => {
  return "Промокод принят";
});

const selectInstallment = (card: Card, instalmentOption: any) => {
  card.installmentPeriod = instalmentOption;
  instance?.proxy?.$forceUpdate();
};

const {
  isPromocodeLegal,
  proovePromocode,
  loadding: promocodeLoadding,
  promocode,
} = usePromocode();

const { programs } = usePrograms(promocode);
const { cards, instalmentOptions, currentProgram } = useConstants(selectedId);

const currentSumm = (price: Card["price"]) => {
  return isPromocodeLegal.value ? price.value - price.discount : price.value;
};

const showProgram = (card: Card) => {
  const link = card.linkToProgram;
  window.open(link, "_blank")?.focus();
};

const getSectionStyle = computed(() => {
  if ($q.screen.gt.sm) {
    return "height: 1800px";
  } else {
    return "height: 2600px";
  }
});

const buyProgramViaInstallment = (program: Card) => {
  buyViaInstallment({
    sum: +program.price.value,
    period:
      program.installmentPeriod === 24 ? "default" : program.installmentPeriod,
    title: "Программа " + program.title,
  });
};
</script>

<style lang="scss">
.body {
  background-color: #fff !important;
}

@import url("@/styles/variables.scss");
.q-btn-group {
  border-radius: $radius-lg !important;
}

.q-btn__content {
  @media screen and (max-width: $breakpoint-sm) {
    font-size: 15px !important;
  }
}

.q-btn-group.size--sm {
  font-size: 20px;
  line-height: 135%;
  color: #101010;
  .q-btn {
    padding: 8px 16px;
  }
}

.q-btn-group.size--xs {
  line-height: 135%;
  color: #101010;
  .q-btn {
    font-size: 16px;
    padding: 4px 8px;
  }
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
  background-color: var(--q-accent) !important;
  color: #fff !important;
}
</style>

<style scoped lang="scss">
.learning-time {
  display: flex;
}

.container {
  display: flex;
  flex-direction: column;
}

.placeholder {
  background-color: #999;
  width: 100%;
  flex: 1 1 auto;
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
