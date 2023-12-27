<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import "~/assets/styles/main.scss";
  import useUserStore from "./stores/user";

  const $q = useQuasar();
  const router = useRouter();
  const userStore = useUserStore();

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

    userStore.userId = localStorage.getItem("userPhone") || "";
    userStore.userToken = localStorage.getItem("userToken") || "";
  });

  onBeforeUnmount(() => {
    window.removeEventListener("server-error", errorHandler);
    window.removeEventListener("unauthorized", unauthorisedHandler);
  });

  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | ITS Education` : "ITS Education";
    },
  });
</script>
