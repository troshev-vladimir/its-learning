<template>
  <TheHeader class="q-mb-xl" />
  <q-page-container>
    <q-page class="column">
      <router-view />
    </q-page>
  </q-page-container>
  <TheFooter class="q-mt-xl" />
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>
