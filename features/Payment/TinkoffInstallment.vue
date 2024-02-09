<template>
  <q-btn-dropdown
    split
    color="white"
    dropdown-icon="fas fa-chevron-down"
    :label="
      localPeriod === 24
        ? `В кредит до (${localPeriod} мес.)`
        : `В рассрочку (${localPeriod} мес.)`
    "
    class="full-width size--xs q-mt-md"
    auto-close
    text-color="black"
    @click="buyProgramViaInstallment"
  >
    <q-list>
      <q-item
        v-for="(instalmentOption, idx) in [3, 6, 12, 24]"
        :key="idx"
        v-close-popup
        clickable
        :active="localPeriod === instalmentOption"
        active-class="bg-blue-2 text-blue-5 no-pointer-events"
        @click="localPeriod = instalmentOption"
      >
        <q-item-section>
          <q-item-label v-if="instalmentOption === 24">
            В кредит до {{ instalmentOption }} месяцев
          </q-item-label>
          <q-item-label v-else> На {{ instalmentOption }} месяца </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { buyViaInstallment } from '~/utils/TinkoffInstallment'

const props = defineProps<{
  summ: number
  title: string
}>()

const localPeriod = ref(24)

const buyProgramViaInstallment = () => {
  buyViaInstallment({
    sum: props.summ,
    period: localPeriod.value === 24 ? 'default' : localPeriod.value,
    title: 'Программа ' + props.title,
  })
}
</script>

<style lang="scss">
.q-btn-dropdown--split .q-btn-dropdown__arrow-container {
  border-color: var(--q-secondary) !important;
}
</style>
