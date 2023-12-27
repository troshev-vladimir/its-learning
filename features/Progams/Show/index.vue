<template>
  <section>
    <div class="container q-mb-lg">
      <div class="q-mt-md flex">
        <h2 class="text-h2 q-mb-md">Потратить заработанное</h2>
        <div
          class="flex wrap items-center full-width q-mb-lg"
          style="gap: 16px"
        >
          <TimerComponent
            style="flex: 0 0 auto"
            class="shadow-2"
            @time-is-gone="updatePrograms"
          />

          <p>
            Твой заработок хранится 24 часa.<br />
            Не упусти свой шанс.
          </p>
        </div>
        <div class="flex wrap items-start full-width q-mb-sm" style="gap: 16px">
          <CashCounter class="shadow-2" />
          <q-chip
            v-if="promocode && store.state.userPromoBonus > 0"
            outline
            color="green"
            text-color="white"
            icon="fas fa-chevron-down"
            class="q-mt-sm self-center"
          >
            Промокод принят
          </q-chip>
          <UiInput
            v-else
            v-model="promocode"
            label="Ввести промокод"
            color="primary"
            class="ui-input"
            no-error-icon
            outlined
            :readonly="store.state.userPromoBonus"
            @blur="getUserProgress"
            @keyup.enter="getUserProgress"
          >
            <template v-if="store.state.userPromoBonus" #before>
              <q-icon name="fas fa-check" color="green-5" />
            </template>
          </UiInput>
        </div>
        <p class="text-body2 text-secondary">
          Подробней о правилах подсчёта бонусов читай
          <a
            class="text-accent"
            href="https://drive.google.com/file/d/1plR7AYYlzmD26AJ-P_nxkmjeiHzirqol/view?usp=share_link"
            target="_blank"
            >тут</a
          >
        </p>
      </div>
    </div>

    <div class="q-mb-xl">
      <div class="container">
        <div class="row">
          <div v-for="card in programs" :key="card.id" class="col-12">
            <ProgramCard :card="card" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import b24LeadCreate from "~/utils/createLeadInB24";
import useProgramsStore from "~/stores/programs";
const prpgramsStore = useProgramsStore();
import usePrograms from "./composables/usePrograms";

const promocode = ref("");

const getUserProgress = async () => {
  if (!promocode.value.length) return;
  // store.dispatch("getUsersCash", promocode.value);
};
const { data: programs, error } = await useAsyncData(`programs`, () => {
  return prpgramsStore.fetchPrograms();
});
</script>

<style></style>
