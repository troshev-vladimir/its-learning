<!-- eslint-disable no-unused-vars -->
<template>
  <section>
    <div class="container">
      <span class="text-body1 text-secondary">Учитесь в своем ритме</span>
      <h1 class="text-h1 q-mt-md">
        Получай знания и навыки <br />
        <span class="text-accent">так как удобно тебе</span>
      </h1>
    </div>
  </section>

  <section class="q-mt-xl q-mb-xl">
    <div class="container">
      <h2 class="text-h2 q-mb-lg">Выбери подходящие параметры</h2>
      <div class="row items-center q-col-gutter-xl">
        <div class="col-12 col-md-6"><SalaryCalculator /></div>
        <div class="col-12 col-md-6">
          <!-- <SalaryGraph /> -->
          <AccentTariff class="shadow-2" />
          <div class="q-mt-md flex items-end">
            <p class="text-h2 q-mb-md">Потратить заработанное</p>
            <div
              class="flex items-center full-width q-mb-lg"
              style="gap: 16px; flex-wrap: nowrap"
            >
              <TimerComponent style="flex: 0 0 auto" class="shadow-2" />

              <p style="flex: 0 1 auto">
                Твой заработок хранится 48 часов. Не упусти свой шанс.
              </p>
            </div>
            <div class="flex items-start full-width q-mb-sm" style="gap: 16px">
              <CashCounter class="shadow-2" style="flex: 1 1 auto" />
              <UiInput
                v-model="promocode"
                label="Ввести промокод"
                style="flex: 1 1 auto"
                color="primary"
                class="ui-input grow-1"
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
            <div class="flex no-wrap q-mb-md">
              <div class="q-mr-lg">
                <div class="text-body1 q-mb-sm flex">Скидка на обучение</div>
                <p class="text-h2 flex">{{ discount }} руб.</p>
              </div>

              <div class="">
                <div class="text-body1 q-mb-sm">Премия к первой зарплате</div>
                <p class="text-h2">{{ bonus }} руб.</p>
              </div>
            </div>
            <p class="text-body2 text-secondary">
              Подробней о правилах подсчёта бонусов читай
              <a class="text-accent" href="/">тут</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="q-mb-xl">
    <div class="container column">
      <h2 class="text-h2 q-mb-md text-center">Комфортный платеж в месяц</h2>
      <div class="row q-mt-xl">
        <div class="col-12 col-md-10 offset-md-1">
          <PaymentCalculator />
          <div class="justify-between q-mt-lg row">
            <span class="col-4 col-md-2">Рассрочка без переплат</span>
            <span class="col-4 col-md-2 text-right">Быстро и безопасно</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="q-mb-xl">
    <div class="container">
      <!-- <div class="row q-mb-xl justify-between items-center">
        <div class="col-12 col-sm-6 col-md-8">
          <h2 class="text-h2 q-mb-sm">Куда распределить заработанное?</h2>
          <p class="text-body1">
            Выбери один из вариантов куда ты потратишь зароботок
          </p>
        </div>
      </div>

      <div class="row q-col-gutter-lg no-wrap-md items-center q-mb-xl">
        <div
          v-for="(item, idx) in hoursItems"
          :key="idx"
          class="col-12 col-md-6"
          style="flex-grow: 1"
        >
          <UiButton
            :color="item.active ? 'white' : 'secondary'"
            text-color="primary"
            class="button button--selectable full-width"
            :class="{ 'button--active': item.active }"
            selectable
            @click="choiseSpendManyWay(item)"
          >
            <div class="d-flex q-gutter-lg items-center">
              <icon-base width="40" height="40">
                <component :is="item.img"></component>
              </icon-base>
              <div class="column q-row-gutter-xs items-start">
                <p class="text-body1 text-bold">{{ item.title }}</p>
              </div>
            </div>
          </UiButton>
        </div>
      </div>
      </div> -->

      <div class="row">
        <div class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
          <UiButton
            color="white"
            text-color="primary"
            type="long"
            class="full-width"
            @click="goToTariff()"
          >
            ПОДОБРАТЬ ТАРИФ
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import SalaryGraph from "@/components/SlaryGraph";
import SalaryCalculator from "@/components/SalaryCalculator";
import PaymentCalculator from "@/components/PaymentCalculator";
import AccentTariff from "@/components/AccentTariff";
import CashCounter from "@/components/CashCounter";
import TimerComponent from "@/components/TimerComponent";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import tariffApi from "@/api/tariff";
import { useQuasar } from "quasar";
import apiTariff from "@/api/tariff";
import { useMeta } from "quasar";
import axios from "@/api/axios";

useMeta({
  title: "Конструктор тарифа | ITS",
});

const store = useStore();
const router = useRouter();
const $q = useQuasar();
const promocode = ref("");
const choosenSpandMethod = ref("salary");
const goToTariff = () => {
  const program = store.getters["tariff/getCurrentProgramm"];
  const payment = store.state.tariff.payment;
  const name = program?.name.toLowerCase() || "tesla";

  tariffApi
    .getInstallment(
      program?.id,
      payment,
      promocode.value,
      choosenSpandMethod.value,
      store.state.userPhone,
      store.state.userToken
    )
    .then((responce) => {
      store.commit("tariff/setInstallment", responce[0]);
    })
    .then(() => {
      router.push({ name });
    })
    .catch((error) => {
      console.log(error);
      $q.notify({
        color: "negative",
        position: "top",
        message: "Что то пошло не так",
      });
    });
};

const setIntheMiddle = () => {
  const program = store.getters["tariff/getCurrentProgramm"];
  store.commit("tariff/setPayment", program.offermin + program.offermax / 2);
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
  apiTariff
    .getTariffs()
    .then((responce) => {
      store.commit("tariff/setPrograms", responce);
    })
    .then(() => {
      setIntheMiddle();
    })
    .catch((e) => {
      console.log(e);
    });

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
