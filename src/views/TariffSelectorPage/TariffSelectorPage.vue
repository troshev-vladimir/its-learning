<!-- eslint-disable no-unused-vars -->
<template>
  <section :style="getSectionStyle" class="q-mt-md">
    <div class="container" style="height: 100%">
      <div class="row">
        <div
          v-for="card in programs"
          :key="card.id"
          class="col-12 col-md-4 q-mb-md q-mb-md-none"
        >
          <ProgramCard :card="card">
            <q-chip
              v-if="promocode && card.discountApplyed"
              outline
              color="green"
              text-color="white"
              icon="fas fa-chevron-down"
              class="q-mt-sm"
            >
              Промокод принят
            </q-chip>
            <q-input
              v-else
              v-model="promocode"
              label="Ввести промокод"
              color="primary"
              maxlength="6"
              lazy-rules
              class="ui-input size-sm full-width"
              dense
              no-error-icon
              outlined
              :rules="[
                (val) =>
                  val.length === 6 ||
                  val.length === 0 ||
                  'Неправильный промокод, необходимо 6 символов',
              ]"
              :loading="promocodeLoadding"
              @blur="proovePromocode"
              @keyup.enter="proovePromocode"
            >
            </q-input>
          </ProgramCard>
        </div>
      </div>
      <div class="placeholder q-mt-sm q-mt-md-xl"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMeta, useQuasar } from "quasar";
import usePromocode from "./composables/usePromocode";
import usePrograms from "../TariffCalculatorPage/composables/usePrograms";
import ProgramCard from "@/components/ProgramCard";

useMeta({
  title: "BIG SALE | ITS",
});
const $q = useQuasar();

const {
  proovePromocode,
  loadding: promocodeLoadding,
  promocode,
} = usePromocode();
const { programs } = usePrograms(promocode);

const getSectionStyle = computed(() => {
  if ($q.screen.gt.sm) {
    return "height: 1800px";
  } else {
    return "height: 2600px";
  }
});
</script>

<style lang="scss">
.body {
  background-color: #fff !important;
}

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

.container {
  display: flex;
  flex-direction: column;
}

.placeholder {
  background-color: #999;
  width: 100%;
  flex: 1 1 auto;
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
