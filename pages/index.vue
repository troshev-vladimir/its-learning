<template>
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
      <FeatureBonusCache />
      <FeatureProgramsShow />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import b24LeadCreate from "~/utils/createLeadInB24";

  useSeoMeta({
    title: "Покупка програмы",
    ogTitle: "Покупка програмы",
    description: "Покупка програмы",
    ogDescription: "Покупка програмы",
    ogImage: "https://example.com/image.png",
    twitterCard: "summary_large_image",
  });

  onMounted(() => {
    b24LeadCreate(); //TODO: на регистрацию
  });
</script>

<style lang="scss">
  .app {
    color: red;
  }
</style>
