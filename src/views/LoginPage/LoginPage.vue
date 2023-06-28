<template>
  <div class="container">
    <div class="row">
      <div
        class="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3"
      >
        <div class="content column d-flex">
          <form class="rounded-lg bg-white text-primary q-pa-lg shadow-2">
            <h1 class="text-h1 q-mb-xl">Вход</h1>
            <p class="q-mb-md text-body1">Номер телефона:</p>
            <q-input
              ref="phoneInput"
              v-model="userPhone"
              placeholder="+7 (###) #### ## ##"
              mask="+7 (###) #### ## ##"
              unmasked-value
              filled
              fill-mask="_"
              class="q-mb-xl"
              :rules="[
                (val) => !!val || 'Надо заполнить',
                (val) => val.length === 11 || 'Введите корректный номер',
              ]"
              lazy-rules
            />
            <p class="q-mb-md text-body1">ПИН-код</p>
            <PincodeInput v-model="pin" />

            <ui-button
              size="sm"
              class="bg-accent"
              icon-right="fas fa-sign-in-alt"
              text-class="text-body2 text-white text-bold q-mr-md"
              :disabled="pin.length < 4"
              @click="logIn"
            >
              Войти
            </ui-button>
          </form>
          <div
            class="remain text-accent text-body2 text-center q-mt-md"
            @click="remainPin"
          >
            Напомнить ПИН-код
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import PincodeInput from "@/components/UiKit/PincodeInput";
const $q = useQuasar();
const router = useRouter();
const pin = ref("");
const userPhone = ref("");
const phoneInput = ref(null);

const remainPin = () => {
  const isphoneValid = phoneInput.value.validate();
  if (!userPhone.value || !isphoneValid) {
    $q.notify({
      message: "Введите номер телефона",
      caption: "Туда будет отправлен пин-код",
    });
    return;
  } else {
    $q.notify({
      color: "green",
      message: "Пинкод отправлен",
    });
  }
};

const logIn = () => {
  $q.notify({
    color: "green",
    message: "Упешно выполнен вход",
    actions: false,
  });
  router.push({ name: "tariff" });
};
</script>

<style lang="scss">
.pin {
  .q-field__control {
    padding-left: 16px;
  }
}

// .q-field--filled .q-field__control {
//   border-radius: 16px;
//   background: #f2f2f2;

//   &::after {
//     display: none;
//   }
// }

.content {
  margin-top: 50vh;
  transform: translateY(-50%);
}

.remain {
  cursor: pointer;
}

.pin-input {
  width: 43px;
}
</style>
