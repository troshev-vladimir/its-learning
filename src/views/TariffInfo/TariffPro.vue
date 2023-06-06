<template>
  <section class="q-mt-xl">
    <div class="container">
      <span class="text-body1 text-secondary">Специально для тебя:</span>
      <h1 class="text-h1 q-mt-md q-mb-lg">
        Программа <span class="text-accent">PRO</span>
      </h1>
      <p class="q-mb-lg text-body1">
        Курс разработан специально для тех, кто хочет изучить и освоить 1С
        программирование с самых азов
      </p>

      <p class="q-mb-sm text-body2">
        Продолжительность: <span class="text-bold"> 3</span> мес.
      </p>
      <p class="q-mb-sm text-body2">Часов теории:</p>
      <p class="q-mb-sm text-body2">Часов практики:</p>
      <p class="q-mb-sm text-body2">
        Постоянный контакт с наставниками – ведущими практикующими
        программистами:
      </p>
    </div>
  </section>

  <section class="q-mt-xl">
    <div class="container">
      <h1 class="text-h2 q-mb-lg">
        После успешного прохождения обучения ты получишь:
      </h1>
      <ul>
        <li class="q-mb-lg">
          <div class="d-flex items-center">
            <img
              src="@/assets/img/program/work.svg"
              alt="work"
              class="q-mr-lg"
            />
            <p class="text-body1">
              Возможность трудоустройства в компанию IT Сервис или в компании
              партнеры.
            </p>
          </div>
        </li>
        <li>
          <div class="d-flex items-center">
            <img
              src="@/assets/img/program/sertificate.svg"
              alt="sertificate"
              class="q-mr-lg"
            />
            <p class="text-body1">
              Сертификат «1С Профессионал» подтверждающий качество твоих знаний
              и навыков
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <section class="q-mt-xl">
    <div class="container">
      <h1 class="text-h2 q-mb-lg">А главное:</h1>
      <p class="text-body1 q-mb-lg">
        Знания и практические навыки к которым 1С программист идет в течение 1
        года, набивая шишки на собственном опыте, всего за 3 месяца, обучившись
        у лучших практиков отрасли.
      </p>
      <img src="@/assets/img/program/graph.png" alt="graph" />
    </div>
  </section>

  <section class="q-mt-xl">
    <div class="container">
      <h1 class="text-h2 q-mb-lg">Чему ты научишься:</h1>
      <UiAccordion :items="acordionItems"> </UiAccordion>
    </div>
  </section>
</template>

<script setup>
const acordionItems = [
  {
    title: "adasdad",
    content: "213213123",
  },
  {
    title: "adasdad",
    content: "213213123",
  },
];
</script>

<style></style>
