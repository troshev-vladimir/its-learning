<!-- eslint-disable no-unused-vars -->
<template>
  <section>
    <div class="q-mb-xl">
      <div class="container">
        <span class="text-body1 text-secondary">
          Для тех кто уверен в своих возможностях
        </span>
        <h1 class="text-h1 q-mt-md q-mb-lg">
          Получай знания и навыки
          <br />
          <span class="text-accent">так как удобно тебе</span>
        </h1>
      </div>
    </div>

    <div class="container q-mb-lg">
      <div class="q-mt-md flex">
        <h2 class="text-h2 q-mb-md">Потратить заработанное</h2>
        <div
          class="flex wrap items-center full-width q-mb-lg"
          style="gap: 16px"
        >
          <TimerComponent style="flex: 0 0 auto" class="shadow-2" />

          <p>Твой заработок хранится 48 часов. Не упусти свой шанс.</p>
        </div>
        <div class="flex wrap items-start full-width q-mb-sm" style="gap: 16px">
          <CashCounter class="shadow-2" />
          <UiInput
            v-model="promocode"
            label="Ввести промокод"
            color="primary"
            class="ui-input"
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
        <p class="text-body2 text-secondary">
          Подробней о правилах подсчёта бонусов читай
          <a class="text-accent" href="/">тут</a>
        </p>
      </div>
    </div>

    <div class="q-mb-xl">
      <div class="container">
        <div class="row">
          <div
            v-for="card in programs"
            :key="card.id"
            class="col-12 col-md-4 q-mb-md q-mb-md-none"
          >
            <ProgramCard :card="card" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import TimerComponent from "@/components/TimerComponent";
import CashCounter from "@/components/CashCounter";

import b24LeadCreate from "@/helpers/createLeadInB24";
import usePrograms from "./composables/usePrograms";
import ProgramCard from "@/components/ProgramCard";

const promocode = ref("");
const store = useStore();
const { programs } = usePrograms();

const getUserProgress = () => {
  store.dispatch("getUsersCash", promocode.value);
};

onMounted(() => {
  store.dispatch("getUsersCash");
  b24LeadCreate();
});
</script>

<style lang="scss">
@import url("@/styles/variables.scss");
.q-btn-group {
  border-radius: $radius-lg !important;
}

.q-btn__content {
  @media screen and (max-width: $breakpoint-sm) {
    font-size: 15px !important;
  }
}

.q-btn-group.size--sm {
  font-size: 20px;
  line-height: 135%;
  color: #101010;
  .q-btn {
    padding: 8px 16px;
  }
}

.q-btn-group.size--xs {
  line-height: 135%;
  color: #101010;
  .q-btn {
    font-size: 16px;
    padding: 4px 8px;
  }
}

.q-btn-dropdown button:first-child {
  font-weight: 400;
  font-size: 20px;
  font-weight: 700;
  padding: 16px;
  background-color: #fff;
  border-radius: $radius-lg 0 0 $radius-lg;
}

.q-btn-dropdown button:last-child {
  border-radius: 0 $radius-lg $radius-lg 0;
  background-color: var(--q-accent) !important;
  color: #fff !important;
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
