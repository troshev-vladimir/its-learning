<template>
  <section class="q-mt-xl">
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
      <div class="row items-center">
        <div class="col-12 col-md-6"><SalaryCalculator /></div>
        <div class="col-12 col-md-6">
          <SalaryGraph />
          <AccentTariff />
        </div>
      </div>
    </div>
  </section>

  <section class="q-mb-xl">
    <div class="container column">
      <h2 class="text-h2 q-mb-md text-center">Комфортный платеж в месяц</h2>
      <div class="row q-mt-xl">
        <div class="col-10 offset-1">
          <PaymentCalculator />
          <div class="justify-between q-mt-lg row">
            <span class="col-2">Рассрочка без переплат</span>
            <span class="col-2 text-right">Быстро и безопасно</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="q-mb-xl">
    <div class="container">
      <h2 class="text-h2 q-mb-lg">Часов обучения в день</h2>
      <div class="row items-center q-col-gutter-y-md">
        <div
          v-for="(item, idx) in hoursItems"
          :key="idx"
          class="col-lg-3 col-md-6 col-12"
        >
          <UiButton
            :color="item.active ? 'white' : 'secondary'"
            text-color="primary"
            class="botton"
            :class="{ 'button--active': item.active }"
            @click="selectTime(item)"
          >
            <div class="d-flex q-col-gutter-md">
              <img :src="item.img" width="80" height="70" />
              <div class="column q-row-gutter-xs items-start">
                <p class="text-h2">{{ item.title }}</p>
                <p class="text-body1">{{ item.body }}</p>
              </div>
            </div>
          </UiButton>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <p class="text-body1">
            Уделяй обучению столько времени сколько комфортно для тебя
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="q-mb-xl q-pb-xl">
    <div class="container">
      <div class="column items-center">
        <UiButton
          color="white"
          text-color="primary"
          type="long"
          @click="router.push({ name: 'pro' })"
        >
          ПОДОБРАТЬ ТАРИФ
        </UiButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import SalaryGraph from "@/components/SlaryGraph";
import SalaryCalculator from "@/components/SalaryCalculator";
import PaymentCalculator from "@/components/PaymentCalculator";
import AccentTariff from "@/components/AccentTariff";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const hoursItems = reactive([
  {
    title: "ИЗИ",
    body: "1 - 2 часа",
    img: new URL(`@/assets/img/front/hard.svg`, import.meta.url),
    active: false,
    id: "easy",
  },
  {
    title: "НОРМАЛ",
    body: "1 - 2 часа",
    img: new URL(`@/assets/img/front/hard.svg`, import.meta.url),
    active: true,
    id: "norm",
  },
  {
    title: "ХАРД",
    body: "1 - 2 часа",
    img: new URL(`@/assets/img/front/hard.svg`, import.meta.url),
    active: false,
    id: "hard",
  },
]);

const selectTime = (item) => {
  store.commit("tariff/setMode", item.id);
  hoursItems.forEach((el) => (el.active = false));
  item.active = !item.active;
};
</script>

<style scoped lang="scss">
.learning-time {
  display: flex;
}

.botton {
  width: 100%;
}

.button--active {
  svg {
    color: #333;
  }
}
</style>
