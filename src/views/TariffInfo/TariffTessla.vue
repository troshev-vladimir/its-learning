<template>
  <section>
    <span class="text-body1 text-secondary">Специально для тебя:</span>
    <h1 class="text-h1 q-mt-md q-mb-lg">
      Программа <span class="text-accent">TESLA</span>
    </h1>
    <p class="q-mb-lg text-body1">
      Курс разработан специальнодля тех, кто хочет стать профи
    </p>

    <p class="q-mb-sm text-body2">
      Продолжительность:
      <span class="text-bold"> {{ currentProgram?.period }} мес.</span>
    </p>
    <p class="q-mb-sm text-body2">
      Часов теории:
      <span class="text-bold">{{ currentProgram?.theoryhours }}</span>
    </p>
    <p class="q-mb-sm text-body2">
      Часов практики:
      <span class="text-bold"> {{ currentProgram?.practicehours }}</span>
    </p>
    <p class="q-mb-sm text-body2">
      Постоянный контакт с наставниками – ведущими практикующими программистами:
    </p>
  </section>

  <section class="q-mt-lg">
    <h1 class="text-h2 q-mb-lg">
      После успешного прохождения обучения ты получишь:
    </h1>
    <ul>
      <li class="q-mb-lg">
        <div class="d-flex items-center">
          <img src="@/assets/img/program/work.svg" alt="work" class="q-mr-lg" />
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
            Сертификат «1С Профессионал» подтверждающий качество твоих знаний и
            навыков
          </p>
        </div>
      </li>
    </ul>
  </section>

  <section class="q-mt-lg">
    <h1 class="text-h2 q-mb-lg">А главное:</h1>
    <p class="text-body1 q-mb-lg">
      Знания и практические навыки к которым 1С программист идет в течении 2лет,
      набивая шишки на собственном опыте, всего за 8месяцев, обучившись у лучших
      практиков отрасли.
    </p>
    <img class="full-width" src="@/assets/img/program/graph.png" alt="graph" />
  </section>

  <section class="q-mt-lg">
    <h1 class="text-h2 q-mb-lg">Чему ты научишься:</h1>
    <UiAccordion>
      <UiAccordionItem title="Введение">
        <p class="text-body1">Система 1С:Предприятие:</p>
        <span class="list-item text-body1">
          Знакомство с основными понятиями.
        </span>
        <span class="list-item text-body1">Обзор системы.</span>
        <span class="list-item text-body1"
          >Изучение документов и журналов программы.</span
        >
      </UiAccordionItem>

      <UiAccordionItem title="Марафон 1С">
        <p class="text-body1 q-mb-md">
          Марафон состоит из 21 модуля. Каждый модуль включает в себя теорию и
          практическое задание.
        </p>

        <p class="text-body1">На марафоне ты разберешь:</p>
        <p class="list-item text-body1">
          Общие сведения: установка 1С:Бухгалтерия 8, работа в интерфейсе
          «Такси».
        </p>
        <p class="list-item text-body1">
          Объекты справочной информации: иерархические справочники, реквизиты,
          константы.
        </p>
        <p class="list-item text-body1">
          Документооборот торгового предприятия.
        </p>
        <p class="list-item text-body1">
          Регистры накопления, проведение документов, документ «Выписка банка».
        </p>
        <p class="list-item text-body1">
          Виды регистров накопления, регистры сведений, интерфейс приложения,
          создание оборотного регистра, настройка начальной страницы.
        </p>
        <p class="list-item text-body1">
          Программный код: комментарии, переменная, условный оператор, цикл.
        </p>
        <p class="list-item text-body1">
          Логические операции: конкатенация, число, дата, булево, встроенные
          функции платформы, округление целого, текущая дата, итоги.
        </p>
        <p class="list-item text-body1">
          Процедуры: параметры, функции, переменные, события.
        </p>
        <p class="list-item text-body1">
          Отладка: ссылка Объект, типы данных Регистра Проведение, типы данных
          Объект.
        </p>
        <p class="list-item text-body1">
          СКД: вводная часть, СКД , СКД Группировки, СКД выбрать данные из ТЧ,
          СКД Параметры. Отчет текущий день.
        </p>
        <p class="list-item text-body1">
          Учет остатков товаров: чтение остатков из регистров, получение
          остатков на дату, отчет продажи товаров, подзапросы.
        </p>
        <p class="list-item text-body1">
          Контроль остатков: запрос контроля остатков, расчет себестоимости.
        </p>
        <p class="list-item text-body1">
          Себестоимость: отчет «Валовая прибыль», сложные отчеты, диаграммы,
          графики.
        </p>
        <p class="list-item text-body1">
          Основы бухгалтерского учета: основные понятия, активные и пассивные
          счета, проводки по счетам б/у, баланс, объект конфигурации «План
          счетов», регистр бухгалтерии.
        </p>
        <p class="list-item text-body1">
          Проведение документов по бух.учету: поступление товаров и услуг,
          реализация товаров и услуг, выписка банка, бухгалтерская операция.
        </p>
        <p class="list-item text-body1">
          Отчеты по бухгалтерскому учету: отчет «остатки по счетам», остатки по
          активным и пассивным счетам, отчет «Баланс», изменение баланса,
          получение прибыли по БУ.
        </p>
        <p class="list-item text-body1">
          Метод отклонений: начисления, график работы, регистр расчета ЗП,
          документы.
        </p>
        <p class="list-item text-body1">
          Учет отсутствия сотрудников: начисление заработной платы, расчет
          оклада, премии, зависимость от базы.
        </p>

        <p class="list-item text-body1">
          CRM-Системы: CRM-система, объекты CRM-системы, CRM-оценка менеджеров,
          АВС-отчет.
        </p>

        <p class="list-item text-body1">
          Бизнес процесс: воронка Продаж, построение воронки продаж, создание
          объектов, бизнес-процессы, линейный бизнес-процесс, циклический
          бизнес-процесс.
        </p>
        <p class="q-mt-md d-flex">
          Всего: 3 часа (теория 2,5 часа, 3 тестирования на 30 минут).
        </p>
      </UiAccordionItem>

      <UiAccordionItem title="Ускоряйся">
        <p class="text-body1">
          Всего 5 модулей из теории и тестовых заданий на тему:
        </p>
        <p class="list-item text-body1">
          Работа с платформой 1С:Предприятие 8: администрирование, понятие типа
          данных и объекта
        </p>
        <p class="list-item text-body1">
          Работа с прикладными объектами: типы данных, образованные от
          прикладных объектов, модули объектов и их события, объект конфигурации
          «Регистр», регистры накопления.
        </p>
        <p class="list-item text-body1">
          Получение информации из БД: создание выходных форм, язык запросов,
          группировка, сортировка, получение итогов, получение данных из
          нескольких источников, создание отчетов.
        </p>
        <p class="list-item text-body1">
          Интерфейс формы: управляемые формы, события управляемых форм,
          объектов, работа с модулем формы, списки в управляемых формах, обычные
          формы.
        </p>
        <p class="list-item text-body1">
          Торговый учет: базовые понятия торгового учета, приемы внедрения,
          поддержки и обновления типовых решений на платформе 1С Предприятие 8.
        </p>
      </UiAccordionItem>

      <UiAccordionItem title="Запросы Light">
        <p class="text-body1">В данную тему входит только теория, а именно:</p>
        <p class="list-item text-body1">
          Работа с одним и несколькими источниками данных.
        </p>
        <p class="list-item text-body1">Виртуальные и временные таблицы.</p>
        <p class="list-item text-body1">Расчет итогов в запросе.</p>
        <p class="list-item text-body1">
          Вложенные запросы, временные таблицы, пакетные запросы.
        </p>
        <p class="list-item text-body1">Запрос как источник данных для СКД.</p>
        <p class="list-item text-body1">
          Основные причины неоптимальной работы запросов.
        </p>
      </UiAccordionItem>

      <UiAccordionItem title="Программирование управляемых форм">
        <p class="text-body1">
          Финальный рывок в изучении теории программирования 1С:
        </p>
        <p class="list-item text-body1">
          Управляемые формы на чистой информационной базе.
        </p>
        <p class="list-item text-body1">
          Нюансы перевода обычной формы на управляемую.
        </p>
        <p class="list-item text-body1">
          Осуществление перехода от обычной к управляемой.
        </p>
      </UiAccordionItem>

      <UiAccordionItem title='Марафон "Базовый"'>
        <p class="text-body1">
          Всего 5 модулей из теории и практических заданий для закрепления
          полученных знаний:
        </p>
        <p class="list-item text-body1">Знакомство с платформой.</p>
        <p class="list-item text-body1">
          Общие механизмы платформы "1С Предприятие 8".
        </p>
        <p class="list-item text-body1">Автоматизация управленческого учета.</p>
        <p class="list-item text-body1">Автоматизация бухгалтерского учета.</p>
        <p class="list-item text-body1">Автоматизация расчета зарплаты.</p>
      </UiAccordionItem>

      <UiAccordionItem title='Марафон 1С "Продвинутый"'>
        <p class="text-body1">
          Всего 5 модулей из теории и практических заданий для закрепления
          полученных знаний, - прокачаешь свои знания, полученные из Марафона 1С
          "Базовый" на 200%:
        </p>
        <p class="list-item text-body1">Общие механизмы платформы.</p>
        <p class="list-item text-body1">Прикладные механизмы платформы.</p>
        <p class="list-item text-body1">Автоматизация управленческого учета</p>
        <p class="list-item text-body1">Автоматизация бухгалтерского учета.</p>
        <p class="list-item text-body1">
          Автоматизация расчетов заработной платы.
        </p>
      </UiAccordionItem>
      <UiAccordionItem title="Система компоновки данных">
        <p class="text-body1">
          Изучение теории + практическое домашнее задание:
        </p>
        <p class="list-item text-body1">
          Механизм компоновки данных. Для чего он необходим.
        </p>
        <p class="list-item text-body1">Режим работы конструктора запросов.</p>
        <p class="list-item text-body1">Конструктор схемы компоновки данных.</p>
        <p class="list-item text-body1">
          Влияние механизма компоновки данных на запросы.
        </p>
        <p class="list-item text-body1">Работа с чужими базами в СКД.</p>
        <p class="list-item text-body1">Работа с данными из памяти в СКД.</p>
        <p class="list-item text-body1">
          Вывод результата СКД в виде коллекции.
        </p>
        <p class="list-item text-body1">
          Переход от механизмов к предметным понятиям с помощью СКД.
        </p>
        <p class="list-item text-body1">
          Управление параметрами виртуальной таблицы в СКД.
        </p>
        <p class="list-item text-body1">Автополе в настройках СКД.</p>
        <p class="list-item text-body1">
          Работа с макетом оформления в СКД и др.
        </p>
      </UiAccordionItem>

      <UiAccordionItem title="Запросы повышенная сложность">
        <p class="text-body1">Теория, домашние задания и много практики:</p>
        <p class="list-item text-body1">
          Общая информация о хранении данных в "1С:Предприятие 8".
        </p>
        <p class="list-item text-body1">Синтаксис текста запроса.</p>
        <p class="list-item text-body1">Работа с итогами в тексте запроса.</p>
        <p class="list-item text-body1">
          Использование нескольких таблиц в запросе: вложенные запросы,
          соединение, объединение.
        </p>
        <p class="list-item text-body1">
          Работа с запросами пи помощи встроенного языка.
        </p>
        <p class="list-item text-body1">
          Использование временных таблиц и пакетных запросов.
        </p>
        <p class="list-item text-body1">
          Использование виртуальных таблиц в запросе.
        </p>
        <p class="list-item text-body1">Оптимизация запросов</p>
        <p class="list-item text-body1">Сложные случаи написания запросов.</p>
      </UiAccordionItem>

      <UiAccordionItem title="Документооборот">
        <p class="text-body1">Теория, домашние задания и много практики:</p>
        <p class="text-body1">Новые возможности 1С Документооборот 3.0</p>
        <p class="text-body1">Что лучше сейчас внедрять на 2.1 или 3.0?</p>
        <p class="text-body1">Как перейти с 2.1 на 3.0?</p>
        <p class="text-body1">
          Как обучиться новой версии 1С Документооборот 3.0?
        </p>
        <p class="text-body1">FAQ</p>
      </UiAccordionItem>

      <UiAccordionItem title="Бизнес-процессы">
        <p class="text-body1">12 глав - 2 часа теории (без практики)</p>
        <p class="list-item text-body1">Введение</p>
        <p class="list-item text-body1">Задачи</p>
        <p class="list-item text-body1">Адресация задач</p>
        <p class="list-item text-body1">
          Текущие задачи активного пользователя
        </p>
        <p class="list-item text-body1">Бизнес процесс</p>
        <p class="list-item text-body1">Карта маршрута</p>
        <p class="list-item text-body1">Персональная адресация</p>
        <p class="list-item text-body1">Карта маршрута у пользователя</p>
        <p class="list-item text-body1">Точка выбора варианта</p>
        <p class="list-item text-body1">Ролевая адресация</p>
        <p class="list-item text-body1">Точка условиям</p>
        <p class="list-item text-body1">Точка разделения. Точка слияния</p>
      </UiAccordionItem>

      <UiAccordionItem title="Разработка мобильных приложений">
        <p class="text-body1">За 5 часов теории ты узнаешь:</p>
        <p class="list-item text-body1">Что такое мобильное приложение.</p>
        <p class="list-item text-body1">Мобильный клиент</p>
        <p class="list-item text-body1">
          Мобильный клиент в автономном режиме и много другое
        </p>
      </UiAccordionItem>

      <UiAccordionItem title="Основы 1С администрирования">
        <p class="text-body1">6 часов теории без практических задания</p>
      </UiAccordionItem>

      <UiAccordionItem title="Управление доступом">
        <p class="text-body1">
          В модуле ты изучишь 6 занятий по следующим темам:
        </p>
        <p class="list-item text-body1">
          Введение. Права и роли. Функциональные опции. RLS.
        </p>
        <p class="list-item text-body1">
          Использование шаблонов ограничения доступа. Использование инструкций
          препроцессора, функциональных опций и параметров сеанса в ограничениях
          RL. Ограничения RLS к данным отчетов, регистров. Ограничения RLS и
          расширения. Приемы ограничения доступа без RLS.
        </p>
        <p class="list-item text-body1">
          Ограничения входа в программу. Схема управления доступом. Ограничения
          доступа. Группирование значений доступа к объектам. Использование
          расширений.
        </p>
        <p class="list-item text-body1">
          Подсистема. Запрет редактирования реквизитов объектов.
        </p>
        <p class="list-item text-body1">
          Подсистема Групповое изменение реквизитов. Подсистема Поиск и замена
          дублей. Подсистема Даты запрета изменения.
        </p>
        <p class="list-item text-body1">
          Подсистема Версионирование объектов. Подсистема Анализ журнала
          регистрации. Подсистема Защита персональных данных. Подсистема
          Завершение работы пользователей.
        </p>
      </UiAccordionItem>

      <UiAccordionItem title="Зaдание для портфолио">
        <p class="text-body1">
          На итоговом практическом задании ты настроишь конфигурацию в
          соответствии с необходимыми требованиями и научишься применять
          полученные знания в реальном проекте. После выполненного задания ты
          получишь сертификат и это будет твоим стартом в мире
          1С-программирования!
        </p>
      </UiAccordionItem>
      <UiAccordionItem title="3 коммерческих оплачиваемых задачи">
        <p class="text-body1">
          Теперь ты сможешь! Выполнить реальные задачи! И доказать, что теперь
          ты программист 1С!
        </p>
      </UiAccordionItem>
    </UiAccordion>
  </section>
</template>

<script setup>
import UiAccordionItem from "@/components/UiKit/UiAccordion/UiAccordionItem.vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";

useMeta({
  title: "Программа TESLA | ITS",
});

const store = useStore();
const currentProgram = store.getters["tariff/getCurrentProgramm"];
</script>

<style></style>
