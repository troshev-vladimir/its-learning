<!-- eslint-disable no-unused-vars -->
<template>
  <section>
    <div class="container">
      <span class="text-body1 text-secondary"
        >Учитесь в своем ритме adasdasd</span
      >
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
      <div class="row q-mb-xl justify-between items-center">
        <div class="col-12 col-sm-6 col-md-8">
          <h2 class="text-h2 q-mb-sm">Куда распределить заработанное?</h2>
          <p class="text-body1">
            Выбери один из вариантов куда ты потратишь зароботок
          </p>
        </div>

        <div class="col-auto col-md-3">
          <CashCounter class="shadow-2" />
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
                <!-- <p class="text-body1">{{ item.body }}</p> -->
              </div>
            </div>
          </UiButton>
        </div>
      </div>
      <div class="row">
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
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import tariffApi from "@/api/tariff";
import { useQuasar } from "quasar";
import apiTariff from "@/api/tariff";

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
      choosenSpandMethod.value
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

const hoursItems = reactive([
  {
    title: "ПОТРАТИТЬ НА ОБУЧЕНИЕ",
    // body: "от 6 часов",
    img: "LearningImg",
    active: false,
    id: "learning",
  },
  {
    title: "ПОЛУЧИТЬ С ПЕРВОЙ ЗАРПЛАТОЙ",
    // body: "3 - 4 часа",
    img: "SalaryImg",
    active: true,
    id: "salary",
  },
]);

const choiseSpendManyWay = (item) => {
  choosenSpandMethod.value = item.id;
  hoursItems.forEach((el) => (el.active = false));
  item.active = !item.active;
};

onMounted(() => {
  apiTariff
    .getTariffs()
    .then((responce) => {
      // Проверка на актуальность данных в ЛС и сторе
      // if (Array.isArray(responce)) {
      //   responce.reduce((el, acc) => {
      //     return acc || el.id === this.$store.state.tariff.programs;
      //   }, false);
      // }
      this.$store.commit("tariff/setPrograms", responce);
    })
    .then(() => {
      this.setIntheMiddle();
    })
    .catch((e) => {
      console.log(e);
    });
});
</script>

<style lang="scss">
.ui-input.q-field--outlined .q-field__control {
  border-radius: 16px;
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
