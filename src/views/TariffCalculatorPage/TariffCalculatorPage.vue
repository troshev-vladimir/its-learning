<!-- eslint-disable no-unused-vars -->
<template>
  <section>
    <div class="q-mb-xl">
      <div class="container">
        <span class="text-body1 text-secondary">
          Для тех кто уверен в своих возможностях
        </span>
        <h1 class="text-h1 q-mt-md q-mb-lg">
          Получай знания и навыки
          <br />
          <span class="text-accent">так как удобно тебе</span>
        </h1>
      </div>
    </div>

    <div class="container q-mb-lg">
      <div class="q-mt-md flex">
        <h2 class="text-h2 q-mb-md">Потратить заработанное</h2>
        <div
          class="flex wrap items-center full-width q-mb-lg"
          style="gap: 16px"
        >
          <TimerComponent style="flex: 0 0 auto" class="shadow-2" />

          <p>Твой заработок хранится 48 часов. Не упусти свой шанс.</p>
        </div>
        <div class="flex wrap items-start full-width q-mb-sm" style="gap: 16px">
          <CashCounter class="shadow-2" />
          <UiInput
            v-model="promocode"
            label="Ввести промокод"
            color="primary"
            class="ui-input"
            no-error-icon
            outlined
            :readonly="store.state.userPromoBonus"
            @blur="getUserProgress"
          >
            <template v-if="store.state.userPromoBonus" #before>
              <q-icon name="fas fa-check" color="green-5" />
            </template>
          </UiInput>
        </div>
        <p class="text-body2 text-secondary">
          Подробней о правилах подсчёта бонусов читай
          <a class="text-accent" href="/">тут</a>
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
              :documents="card.documents"
              class="full-height"
              @description="showProgram(card)"
            >
              <div class="text-body2 q-mb-md flex wrap">
                <span class="q-mr-sm">Скидка:</span>
                <p class="text-body2">
                  <span class="text-body1 text-bold"> {{ discount }}</span
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
                  <UiButton
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
import { ref, getCurrentInstance, computed, onMounted } from "vue";
import { Card } from "../TariffSelectorPage/types";
// import { DemoFlows } from "@tcb-web/create-credit";
import TinkoffPaymentForm from "@/components/TinkoffPaymentForm";
import useConstants from "../TariffSelectorPage/composables/useConstants";
import store from "@/store";
import axios from "axios";
import TimerComponent from "@/components/TimerComponent";
import CashCounter from "@/components/CashCounter";
import { buyViaInstallment } from "@/helpers/utils";

const promocode = ref("");
const selectedId = ref<number>();
const instance = getCurrentInstance();

const { cards, instalmentOptions, currentProgram } = useConstants(selectedId);

const selectInstallment = (card: Card, instalmentOption: any) => {
  card.installmentPeriod = instalmentOption;
  instance?.proxy?.$forceUpdate();
};

const currentSumm = (price: Card["price"]) => {
  return price.value;
};

const showProgram = (card: Card) => {
  const link = card.linkToProgram;
  window.open(link, "_blank")?.focus();
};

const buyProgramViaInstallment = (program: Card) => {
  buyViaInstallment({
    sum: +program.price,
    period: program.installmentPeriod,
    title: program.title,
  });
};

const getUserProgress = () => {
  store.dispatch("getUsersCash", promocode.value);
};

const discount = computed(() => {
  return store.getters.getCurrentProgramDicounts(
    store.getters["tariff/getCurrentProgramm"]?.id
  )?.discount;
});

const bonus = computed(() => {
  return store.getters.getCurrentProgramDicounts(
    store.getters["tariff/getCurrentProgramm"]?.id
  )?.bonus;
});

onMounted(() => {
  store.dispatch("getUsersCash");

  if (!localStorage.getItem("leadWasCreated")) {
    axios
      .get(
        "https://itsportal.bitrix24.ru/rest/706/gc1c0iz28zvqxvlk/crm.lead.add.json",
        {
          params: {
            "fields[NAME]": localStorage.getItem("userName"),
            "fields[TITLE]":
              "ITS Learning перешёл в конфигуратор НЕ ТРОГАЙТЕ плиз",
            "fields[PHONE][N0][VALUE]": localStorage.getItem("userPhone"),
            "fields[ASSIGNED_BY_ID]": 664,
            "fields[OPPORTUNITY]": localStorage.getItem("userMany"),
          },
        }
      )
      .then(() => {
        localStorage.setItem("leadWasCreated", "true");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
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
