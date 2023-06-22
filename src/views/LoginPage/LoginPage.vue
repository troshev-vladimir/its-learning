<template>
  <div class="row">
    <div class="col-4 offset-4">
      <form class="rounded-lg bg-white text-primary q-pa-lg shadow-2">
        <h1 class="text-h1 q-mb-xl">Вход</h1>
        <q-input
          v-model="userPhone"
          filled
          label="Номер телефона"
          placeholder="+7"
          mask="+7 (###) #### ##-## "
          unmasked-value
          class="q-mb-xl"
        />

        <q-input
          v-model="userPin"
          filled
          label="ПИН-код"
          placeholder="1 1 1 1"
          mask="# # # #"
          unmasked-value
          class="q-mb-xl"
        />
        <ui-button
          class="bg-accent"
          icon-right="fas fa-sign-in-alt"
          text-class="text-white text-bold q-mr-md"
        >
          Войти
        </ui-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const userPhone = ref("");
const userPin = ref("");
</script>

<style>
form {
  margin-top: 50vh;
  transform: translateY(-50%);
}
</style>
