<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import "~/assets/styles/main.scss";
const $q = useQuasar();
const router = useRouter();

function errorHandler(e: any) {
  $q.notify({
    color: "negative",
    position: "top",
    message: e.detail?.message || "Что то пошло не так",
  });
}

function unauthorisedHandler() {
  router.push({ name: "auth" });
  localStorage.removeItem("userToken");
}
onMounted(() => {
  window.addEventListener("server-error", errorHandler);
  window.addEventListener("unauthorized", unauthorisedHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("server-error", errorHandler);
  window.removeEventListener("unauthorized", unauthorisedHandler);
});
</script>
