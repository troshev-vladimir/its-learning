<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3">
        <div class="content column d-flex">
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
              size="sm"
              class="bg-accent"
              icon-right="fas fa-sign-in-alt"
              text-class="text-white text-bold q-mr-md"
            >
              Войти
            </ui-button>
          </form>
          <div class="remain text-accent text-body2 text-center q-mt-md">
            Напомнить ПИН-код
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const userPhone = ref("");
const userPin = ref("");
</script>

<style>
.content {
  margin-top: 50vh;
  transform: translateY(-50%);
}

.remain {
  cursor: pointer;
}
</style>
