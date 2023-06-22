<template>
  <div class="container">
    <div class="row relative-position">
      <div class="col-12 col-md-7 col-lg-8">
        <section class="q-mb-xl">
          <span class="text-body1 text-secondary">
            Личный кабинет пользователя
          </span>
          <p class="q-mb-lg">
            <span class="text-body1 text-bold q-mr-md"> Юзер ФИО </span>
            <span class="text-body2 q-mr-md"> Статус пользователя </span>
            <span class="text-body2"> до: 19.06.2023 </span>
          </p>

          <div
            class="d-flex column row-md items-md-center items-start justify-between q-mb-xl"
          >
            <h1 class="text-h1 q-mb-lg q-mb-lg-none">
              Программа <span class="text-accent">PRO</span>
            </h1>

            <div class="d-flex column items-end">
              <p class="text-body2 d-flex items-center q-mb-lg">
                <span class="q-mr-sm">Сумма к оплате:</span>
                <span class="text-bold text-body1">46 352 руб.</span>
              </p>
              <ui-button
                size="sm"
                class="bg-accent"
                :text-class="['text-white']"
              >
                ОПЛАТИТЬ ЦЕЛИКОМ
              </ui-button>
            </div>
          </div>

          <article
            class="rounded-lg bg-white text-primary q-pa-lg shadow-3 q-mb-xl"
          >
            <div class="d-flex column row-lg no-wrap-lg justify-between">
              <div class="d-flex column">
                <div class="q-mb-lg d-flex col-grow items-start">
                  <h1 class="text-h2 q-mr-md">Оплата</h1>
                  <span class="text-body1"> До 19 июля 2023 </span>
                </div>

                <div class="d-flex items-center">
                  <q-btn
                    color="secondary"
                    text-color="primary"
                    class="button rounded q-mr-sm"
                    :disabled="courseStep <= 1"
                    @click="courseStep--"
                  >
                    -
                  </q-btn>
                  <q-btn
                    color="white"
                    class="button rounded q-mr-sm"
                    text-color="primary"
                  >
                    {{ courseStep }}
                  </q-btn>
                  <q-btn
                    color="secondary"
                    class="button rounded q-mr-sm"
                    text-color="primary"
                    :disabled="courseStep >= unpayedSteps.length"
                    @click="courseStep++"
                  >
                    +
                  </q-btn>
                  <span class="text-body1">Количество платежей к оплате</span>
                </div>
              </div>

              <div
                class="d-flex row justify-between column-lg items-center items-lg-end q-mt-md q-mt-lg-none"
              >
                <div class="d-flex column items-lg-end q-mr-sm q-mr-sm-none">
                  <span class="text-body2 q-mb-sm"> Сумма к оплате </span>
                  <h2 class="text-h2 q-mb-lg-md q-mb-none">
                    {{ totalSumm }} руб.
                  </h2>
                </div>
                <ui-button
                  size="sm"
                  class="bg-accent"
                  :text-class="['text-white']"
                >
                  ОПЛАТИТЬ
                </ui-button>
              </div>
            </div>
          </article>

          <article
            class="rounded-lg bg-white text-primary q-pa-lg shadow-3 q-mb-xl"
          >
            <div class="d-flex column row-lg no-wrap-lg justify-between">
              <div class="d-flex column">
                <div class="q-mb-lg d-flex col-grow items-start">
                  <h1 class="text-h2 q-mr-md">Рассрочка от банка</h1>
                </div>

                <div class="d-flex column">
                  <span class="text-body1 q-mb-md">
                    Общая сумма: 46352 руб.
                  </span>
                  <span class="text-body1">Срок рассрочки: 12 мес.</span>
                </div>
              </div>

              <div
                class="d-flex row justify-between column-lg items-center items-lg-end q-mt-md q-mt-lg-none"
              >
                <div class="d-flex column items-lg-end q-mr-sm q-mr-sm-none">
                  <span class="text-body2 q-mb-sm">
                    Размер ежемесячного платежа:
                  </span>
                  <h2 class="text-h2 q-mb-sm-md q-mb-lg-none">3957 руб.</h2>
                </div>
                <ui-button
                  size="sm"
                  class="bg-accent"
                  :text-class="['text-white']"
                >
                  ПЕРЕЙТИ К ОФОРМЛЕНИЮ
                </ui-button>
              </div>
            </div>
          </article>

          <ul>
            <li
              v-for="(step, idx) in courseSteps"
              :key="idx"
              class="d-flex justify-between q-mb-lg text-body2"
            >
              <span>{{ step.date }}</span>
              <span> {{ step.summ }}руб.</span>
              <span>{{ step.status }}</span>
            </li>
          </ul>
        </section>
        <section class="q-mb-xl">
          <h2 class="text-h2 q-mb-lg">Пройденные курсы:</h2>
          <ul>
            <li class="d-flex justify-between q-mb-lg text-body1">
              <span>Введение</span>
              <span>Успешно пройден</span>
              <span>16.05.2023</span>
            </li>
            <li class="d-flex justify-between q-mb-lg text-body1">
              <span>Введение</span>
              <span>Успешно пройден</span>
              <span>16.05.2023</span>
            </li>
            <li class="d-flex justify-between text-body1">
              <span>Введение</span>
              <span>Успешно пройден</span>
              <span>16.05.2023</span>
            </li>
          </ul>
        </section>

        <section class="q-mb-xl">
          <h2 class="text-h2 q-mb-lg">Документы:</h2>
          <ul>
            <li class="text-body2 q-mb-md flex-inline">
              <a href="" download="" class="link-download d-flex items-center">
                <q-icon
                  name="fas fa-download"
                  color="secondary"
                  size="32px"
                  class="q-mr-md"
                />
                <span>Договор оферты</span>
              </a>
            </li>
            <li class="text-body2">
              <a href="" download="" class="link-download d-flex items-center">
                <q-icon
                  name="fas fa-download"
                  color="secondary"
                  size="32px"
                  class="q-mr-md"
                />
                <span>Договор оферты</span>
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-h2 q-mb-lg">Взять отпуск</h2>
          <p class="q-mb-lg text-body1">
            Если хотите приостановить обучение — например, на время путешествия
            или больничного — вы можете взять отпуск. Во время отпуска даты
            следующих платежей переносятся на соответствующее кол-во дней.
          </p>
          <ui-button size="sm" class="bg-accent" :text-class="['text-white']">
            ПРИОСТАНОВИТЬ ОБУЧЕНИЕ
          </ui-button>
        </section>
      </div>

      <div class="col-12 col-md-5 col-lg-4">
        <article
          class="asside rounded-lg bg-white text-primary q-pa-lg shadow-2"
        >
          <h2 class="text-h2 q-mb-lg">Хочешь большего?</h2>
          <p class="text-body1 q-mb-lg">
            В любой момент у тебя есть возможность перейти на более продвинутую
            программу обучения:
          </p>

          <p class="text-body1 text-bold q-mb-sm">
            Программа <span class="text-accent"> PRO</span>
          </p>
          <p class="text-body2 q-mb-lg">
            Для тех кто готов по настоящему углубиться в сферу 1С
            программирования.
          </p>

          <ul>
            <li class="q-mb-md list-item">
              <p class="text-body2">Диплом государственного образца.</p>
            </li>
            <li class="q-mb-md">
              <p class="text-body2 list-item">
                150,5 часов теории и 66,5 часов практических домашних заданий.
              </p>
            </li>
          </ul>

          <ui-button
            size="sm"
            class="full-width bg-accent"
            :text-class="['text-white']"
          >
            ХОЧУ БОЛЬШЕГО
          </ui-button>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import useSteps from "./composables/useSteps";

const { courseStep, courseSteps, totalSumm, unpayedSteps } = useSteps();
</script>

<style lang="scss" scoped>
.asside {
  position: sticky;
  top: 20px;
  margin-bottom: 20px;
  margin-top: 24px;

  @media screen and (max-width: $breakpoint-md) {
    margin-top: $xl;
    margin-bottom: 0;
  }
}

.col-to-row {
  flex-direction: column;

  @media screen and (min-width: $breakpoint-md) {
    flex-direction: row;
  }
}

.link-download {
  &:hover {
    color: var(--q-accent);
    transition: all ease var(--animate-duration);

    i:before {
      transition: all ease var(--animate-duration);
      color: var(--q-accent);
    }
  }
}
</style>
