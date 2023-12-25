<template>
  <div>
    <NuxtLink to="/user-cabinet">cabinet</NuxtLink>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
  import useProgramsStore from "~/stores/programs";
  const prpgramsStore = useProgramsStore();

  const { data, error } = await useAsyncData(`programs`, () => {
    console.log(data);

    return prpgramsStore.fetchPrograms();
  });
</script>

<style lang="scss">
  .app {
    color: red;
  }
</style>
