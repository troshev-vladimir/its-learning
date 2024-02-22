<template>
  <div class="target-test-page row">
    <FeatureTest
      v-if="testStatus === 'in_process'"
      :timer="true"
      class="target-test-page__target-test"
      @submit="sendResults"
    />
    <FeatureTargetTestResults
      v-if="['waiting', 'result'].includes(testStatus)"
      :status="testStatus"
      class="target-test-page__target-test base-block"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TargetTestStatus } from '~/features/TargetTestResults/model/types'
definePageMeta({
  layout: 'empty',
})
const testStatus = ref<TargetTestStatus>('in_process')

const sendResults = () => {
  testStatus.value = 'waiting'
  setTimeout(() => {
    testStatus.value = 'result'
  }, 2000)
}
</script>

<style lang="scss" scoped>
.target-test-page {
  margin-left: 0;
  min-height: 100vh;
  margin-left: 0 !important;
  padding: 24px;
  max-height: 100vh;

  &__target-test {
    margin: auto;
    width: 100%;
  }
}
</style>
