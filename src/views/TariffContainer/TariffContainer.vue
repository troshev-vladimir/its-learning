<template>
  <div class="container">
    <ui-button
      class="button-to-payment z-top bg-accent"
      text-class="text-white"
      size="sm"
      :class="{ hidden: paymentVisible }"
      @click="
        payment.scrollIntoView({
          behavior: 'smooth',
        })
      "
    >
      ПЕРЕЙТИ К ОПЛАТЕ
    </ui-button>
    <div class="row relative-position">
      <div class="col-12 col-lg-7">
        <router-view />

        <section class="q-mt-xl">
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
          <ul class="license">
            <li class="column">
              <div class="column col-grow justify-center items-center">
                <img
                  src="@/assets/img/program/rf.png"
                  alt="1c"
                  class="q-mb-md full-width"
                />
              </div>
              <p>Государственная образовательная лицензия</p>
            </li>

            <li class="column">
              <div class="column col-grow justify-center items-center">
                <img
                  src="@/assets/img/program/1c.png"
                  alt="1c"
                  class="q-mb-md full-width"
                />
              </div>
              <p>Центр сертифицированного обучения 1С</p>
            </li>
          </ul>
        </section>
        <section class="q-mt-xl">
          <span class="text-body1 text-secondary"> Программа лояльности </span>
          <h1 class="text-h2 q-mb-lg q-mt-sm">
            Приводи друзей и получай бонус!
          </h1>
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
        </section>
      </div>
      <div
        id="payment"
        ref="payment"
        v-intersection="onIntersection"
        class="col-12 col-lg-5"
      >
        <PaymentChoice class="asside"></PaymentChoice>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PaymentChoice from "@/components/PaymentChoice";
const payment = ref(null);

const paymentVisible = ref(false);

const onIntersection = (entry) => {
  paymentVisible.value = entry.isIntersecting;
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.license {
  display: flex;
  flex-direction: column;
  column-gap: $lg;
  row-gap: $lg;
  .column {
    align-items: center;
  }

  p {
    max-width: 200px;
    text-align: center;
  }

  @media screen and (min-width: $breakpoint-sm) {
    flex-direction: row;
  }
}
.asside {
  position: sticky;
  top: 20px;
  margin-bottom: 20px;
  margin-top: 24px;

  @media screen and (max-width: $breakpoint-md) {
    margin-top: 0;
  }
}

.container {
  z-index: $flex-cols;
}

.button-to-payment {
  position: fixed;
  bottom: 10px;
  left: 20px;
  right: 20px;
  @media screen and (min-width: $breakpoint-sm) {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
