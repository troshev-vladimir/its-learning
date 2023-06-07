<template>
  <PaymentChoice></PaymentChoice>
  <router-view />
  <section class="q-mt-xl">
    <div class="container">
      <span class="text-body1 text-secondary">
        Гарантия качества нашего курса
      </span>
      <h1 class="text-h2 q-mb-lg q-mt-sm">
        Сертифицированная программа обучения
      </h1>
      <p class="text-body1 q-mb-lg">
        Качество нашей учебной программы подтверждено Лицензией Министерства
        образования на осуществление образовательной деятельности
        №Л035-01282-43/00614206 от 31.08.2022 и статусом Центра
        Сертифицированного Обучения 1С
      </p>
      <ul class="d-flex">
        <li class="column">
          <div class="column col-grow justify-center items-center">
            <img src="@/assets/img/program/rf.png" alt="1c" class="q-mb-md" />
          </div>
          <p>Государственная образовательная лицензия</p>
        </li>

        <li class="column">
          <div class="column col-grow justify-center items-center">
            <img src="@/assets/img/program/1c.png" alt="1c" class="q-mb-md" />
          </div>
          <p>Центр сертифицированного обучения 1С</p>
        </li>
      </ul>
    </div>
  </section>
  <section class="q-mt-xl">
    <div class="container">
      <span class="text-body1 text-secondary"> Программа лояльности </span>
      <h1 class="text-h2 q-mb-lg q-mt-sm">Приводи друзей и получай бонус!</h1>
      <p class="text-body1 q-mb-md">
        У тебя есть друзья, которые хотят прокачать навыки или освоить новую
        профессию? Помогай знакомым получать знания с максимальной выгодой.
      </p>

      <p class="text-body1 q-mb-lg">
        Приглашай новых студентов и выбирай бонус от ITS Education:
      </p>

      <ul>
        <li class="q-mb-md text-body1">
          выплата денежного вознаграждения – 3 000 руб.
        </li>
        <li class="q-mb-md text-body1">
          за приглашение 5 человек - переход на следующий тариф
          <span class="text-bold">бесплатно</span> PRO → VIP, VIP → TESLA
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import PaymentChoice from "@/components/PaymentChoice";
</script>

<style></style>
