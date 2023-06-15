<template>
  <TheHeader />
  <q-page-container>
    <q-page class="column">
      <router-view />
    </q-page>
  </q-page-container>
  <TheFooter />
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>
