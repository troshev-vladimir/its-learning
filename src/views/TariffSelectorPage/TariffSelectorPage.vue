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
            :selected="card.id === secectedId"
            @select="selectProgram(card.id)"
          ></ui-card>
        </div>
      </div>
    </div>
  </section>

  <section class="q-mb-xl">
    <div class="container">
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
            КУПить ТАРИФ
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const promocode = ref("");
const secectedId = ref(null);

const selectProgram = (id) => {
  secectedId.value = id;
};

const cards = [
  {
    id: 0,
    title: "Программа <span class='text-accent'>TESLA</span>",
    price: {
      value: 128000,
      installment: 10666,
    },
    description:
      "Для тех кто готов выйти на middle уровень за минимальное время.",
    items: [
      "Трудоустройство в случае успешного прохождения обучения.",
      "Диплом государственного образца.",
      "3 коммерческие оплачиваемые задачи.",
      "200,5 часов теории и 88,5 часов практических домашних заданий.",
    ],
    criterias: [
      {
        name: "Продолжительность обучения:",
        value: '<span class="q-mr-sm text-body1 text-bold">8</span>мес.',
      },
      {
        name: "Стоимость программы:",
        value:
          '<span class="q-mr-sm text-body1 text-bold text-no-wrap">128 000</span> руб.',
      },
      {
        name: "Рассрочка от:",
        value:
          '<span class="q-mr-sm text-body1 text-bold text-no-wrap">10 666</span> руб./мес',
      },
    ],
  },
  {
    id: 1,
    title: "Программа <span class='text-accent'>VIP</span>",
    price: {
      value: 88000,
      installment: 7333,
    },
    description:
      "Для тех, кто готов по-настоящему углубиться в сферу программирования 1С.",
    items: [
      "Трудоустройство в случае успешного прохождения обучения.",
      "Диплом государственного образца.",
      "150,5 часов теории и 66,5 часов практических домашних заданий.",
    ],
    criterias: [
      {
        name: "Продолжительность обучения:",
        value: '<span class="q-mr-sm text-body1 text-bold">6</span>мес.',
      },
      {
        name: "Стоимость программы:",
        value:
          '<span class="q-mr-sm text-body1 text-bold text-no-wrap">88 000</span> руб.',
      },
      {
        name: "Рассрочка от:",
        value:
          '<span class="q-mr-sm text-body1 text-bold text-no-wrap">7 333</span> руб./мес',
      },
    ],
  },
  {
    id: 2,
    title: "Программа <span class='text-accent'>PRO</span>",
    price: {
      value: 58000,
      installment: 4833,
    },
    description:
      "5 месяцев, для тех, кто хочет освоить 1С с нуля и получить базовые знания необходимые для трудоустройства.",
    items: [
      "Трудоустройство в случае успешного прохождения обучения.",
      "124,5 часов теории и 59,5 часов практических домашних заданий.",
    ],
    criterias: [
      {
        name: "Продолжительность обучения:",
        value: '<span class="q-mr-sm text-body1 text-bold">5</span>мес.',
      },
      {
        name: "Стоимость программы:",
        value:
          '<span class="q-mr-sm text-body1 text-bold text-no-wrap">58 000</span> руб.',
      },
      {
        name: "Рассрочка от:",
        value:
          '<span class="q-mr-sm text-body1 text-bold text-no-wrap">4 833</span> руб./мес',
      },
    ],
  },
];
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
