<template>
  <div>
    {{ programs }}
  </div>
</template>

<script setup lang="ts">
import useProgramsStore from "~/stores/programs";
const prpgramsStore = useProgramsStore();

const {
  data: programs,
  error,
  pending,
} = await useAsyncData(`programs`, () => {
  return prpgramsStore.fetchPrograms();
});
</script>

<style lang="scss">
.app {
  color: red;
}
</style>
