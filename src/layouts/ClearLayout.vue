<template>
  <TheHeader />
  <q-page-container>
    <q-page class="column">
      <router-view />
    </q-page>
  </q-page-container>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
</script>
