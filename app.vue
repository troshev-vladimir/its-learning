<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import "~/assets/styles/main.scss";
  import { Notify } from "quasar";
  const $q = useQuasar();

  $q.notify({
    message: "Success",
    color: "success",
    icon: "fas fa-exclamation-triangle fs-sm",
  });
</script>
