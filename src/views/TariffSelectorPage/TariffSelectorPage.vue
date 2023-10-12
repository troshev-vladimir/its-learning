<!-- eslint-disable no-unused-vars -->
<template>
  <section>
    <div class="q-mb-xl">
      <div class="container">
        <span class="text-body1 text-secondary">
          Для тех кто уверен в своих возможностях
        </span>
        <h1 class="text-h1 q-mt-md q-mb-lg">
          Полное погружение <br />
          <span class="text-accent">в мир 1С программирования</span>
        </h1>

        <p class="text-body1 q-mb-md">
          Для тех, кто уверен в своих силах, мы создали программы для
          максимально быстрого и эффективного погружения в 1С программирование.
        </p>
        <p class="text-body1">
          Выбирая наши комплексные программы, ты получаешь знания и практические
          навыки, к которым 1С программист идет в течение года и более, набивая
          шишки на собственном опыте, всего за 5 месяцев, обучившись у лучших
          практиков отрасли.
        </p>
      </div>
    </div>

    <div class="q-mb-xl">
      <div class="container">
        <div class="row">
          <div
            v-for="card in cards"
            :key="card.id"
            class="col-12 col-md-4 q-mb-md q-mb-md-none"
          >
            <ui-card
              :title="`Программа <span class='text-accent'>${card.title}</span>`"
              :description="card.description"
              :items="card.items"
              :criterias="card.criterias"
              :price="card.price"
              class="full-height"
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
                :label="`В рассрочку (${card.installmentPeriod} мес.)`"
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
                      <q-item-label>
                        На {{ instalmentOption }} месяца
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </ui-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import tinkoff from "@tcb-web/create-credit";
import { Card } from "./types";
import { useMeta } from "quasar";
// import { DemoFlows } from "@tcb-web/create-credit";
import TinkoffPaymentForm from "@/components/TinkoffPaymentForm";
import useConstants from "./composables/useConstants";
import usePromocode from "./composables/usePromocode";

const instance = getCurrentInstance();
useMeta({
  title: "BIG SALE | ITS",
  link: {
    name: { rel: "icon", href: "/favicon-promo.ico" },
  },
});

const selectedId = ref<number>();

const acceptedPromocodeText = computed(() => {
  return "Промокод принят";
});

const currentSumm = (price: Card["price"]) => {
  return isPromocodeLegal.value ? price.value - price.discount : price.value;
};

const selectInstallment = (card: Card, instalmentOption: any) => {
  card.installmentPeriod = instalmentOption;
  instance?.proxy?.$forceUpdate();
};

const { cards, instalmentOptions, getCurrentInstallment, currentProgram } =
  useConstants(selectedId);

const {
  isPromocodeLegal,
  proovePromocode,
  loadding: promocodeLoadding,
  promocode,
} = usePromocode();

const showProgram = (card: Card) => {
  const link = card.linkToProgram;
  window.open(link, "_blank")?.focus();
};

const buyProgramViaInstallment = (program: Card) => {
  tinkoff.create(
    {
      sum: currentSumm(program.price),
      items: [
        {
          name: program.title || "",
          price: currentSumm(program.price) || 0,
          quantity: 1,
        },
      ],
      // demoFlow: DemoFlows.sms,
      promoCode: getCurrentInstallment(program.installmentPeriod),
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
