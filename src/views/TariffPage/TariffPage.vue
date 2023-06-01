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

  <section class="q-mt-xl">
    <div class="container">
      <h2 class="text-h2 q-mb-lg">Выбери подходящие параметры</h2>
      <div class="row items-center">
        <div class="col-6"><SalaryCalculator /></div>
        <div class="col-6"><SalaryGraph /></div>
      </div>
    </div>
  </section>

  <section class="q-mt-xl q-mb-xl">
    <div class="container">
      <div class="row justify-center q-mb-lg">
        <div class="col-10 q-mb-lg"><PaymentCalculator /></div>
        <div class="row no-wrap justify-between items-center col-10">
          <span class="col-2">Рассрочка без переплат</span>
          <h2 class="text-h2 q-mb-lg">Комфортный платеж в месяц</h2>
          <span class="col-2 text-right">Быстро и безопасно</span>
        </div>
      </div>
    </div>
  </section>
  <section class="q-mb-xl">
    <div class="container">
      <h2 class="text-h2 q-mb-lg">Часов обучения в день</h2>
      <div class="row justify-between">
        <UiButton
          v-for="(item, idx) in hoursItems"
          :key="idx"
          color="secondary"
          text-color="primary"
        >
          <div class="row q-col-gutter-md">
            <img :src="item.img" width="80" height="70" alt="hard" />
            <div class="column q-row-gutter-xs items-start">
              <p class="text-h2">{{ item.title }}</p>
              <p class="text-body1">{{ item.body }}</p>
            </div>
          </div>
        </UiButton>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="row justify-center">
        <UiButton color="white" text-color="primary" type="long">
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

const hoursItems = [
  {
    title: "НОРМАЛ",
    body: "1 - 2 часа",
    img: "/img/front/hard.svg",
  },
  {
    title: "НОРМАЛ",
    body: "1 - 2 часа",
    img: "/img/front/hard.svg",
  },
  {
    title: "НОРМАЛ",
    body: "1 - 2 часа",
    img: "/img/front/hard.svg",
  },
];
</script>
