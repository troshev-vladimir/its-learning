<template>
  <div class="container">
    <div class="row">
      <div
        class="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3"
      >
        <div class="content column d-flex">
          <form
            ref="form"
            class="rounded-lg bg-white text-primary q-pa-lg shadow-2"
            @submit.prevent="logIn"
          >
            <h1 class="text-h1 q-mb-xl">Вход</h1>

            <p class="q-mb-sm text-body1">Номер телефона:</p>
            <q-input
              ref="phoneRef"
              v-model="userPhone"
              placeholder="+7 (###) #### ## ##"
              mask="+7 (###) #### ## ##"
              unmasked-value
              filled
              fill-mask="_"
              class="q-mb-md"
              :rules="[
                (val) => !!val || 'Надо заполнить',
                (val) => val.length === 11 || 'Введите корректный номер',
              ]"
              lazy-rules
            />

            <label>
              <p class="q-mb-sm text-body1">E-mail</p>
              <q-input
                ref="emailRef"
                v-model="userEmail"
                placeholder="youremail@mail.ru"
                class="q-mb-md"
                filled
                :rules="[
                  (val) => !!val || 'Надо заполнить',
                  (val) => emailValidate(val) || 'Введите корректный email',
                ]"
                lazy-rules
              />
            </label>

            <label>
              <p class="q-mb-sm text-body1">Имя</p>
              <q-input
                ref="nameRef"
                v-model="userName"
                placeholder="Введите ваше имя"
                class="q-mb-md"
                filled
                :rules="[
                  (val) => !!val || 'Надо заполнить',
                  (val) =>
                    val.length > 6 ||
                    'Имя должно быть более 6 символов, сейчас ' + val.length,
                ]"
                lazy-rules
              />
            </label>

            <p class="q-mb-md text-body1">ПИН-код</p>

            <div class="q-mb-xl">
              <PincodeInput ref="pincode" v-model="pin" :error="pincodeError" />
            </div>

            <ui-button
              size="sm"
              class="bg-accent"
              icon-right="fas fa-sign-in-alt"
              :text-class="['text-body2', 'text-white', 'text-bold', 'q-mr-md']"
              role="submit"
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
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
// import { useRouter } from "vue-router";
import PincodeInput from "@/components/UiKit/PincodeInput";
import { emailValidate } from "@/helpers/utils.ts";
const $q = useQuasar();
// const router = useRouter();
const pin = ref("");
const userPhone = ref("");
const userEmail = ref("");
const userName = ref("");
const phoneRef = ref(null);
const emailRef = ref(null);
const nameRef = ref(null);
const form = ref(null);
const pincode = ref(null);
const pincodeError = ref("");

const remainPin = () => {
  if (!userPhone.value || !phoneRef.value.validate()) {
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

const validatePin = () => {
  if (pin.value.length < 4) {
    pincodeError.value = "Неправильно заполнил пинкод, надо 4 цифры";
    return false;
  }
  return true;
};

watch(pin, (value) => {
  if (value) {
    pincodeError.value = "";
  }
});

const validate = () => {
  const phoneValid = phoneRef.value.validate();
  const nameValid = nameRef.value.validate();
  const emailValid = emailRef.value.validate();
  const pinValid = validatePin();
  return phoneValid && nameValid && emailValid && pinValid;
};

const logIn = () => {
  const isFormValid = validate();
  if (!isFormValid) return;

  $q.notify({
    color: "green",
    message: "Упешно выполнен вход",
    actions: false,
  });
  window.location.href = "/lid-game";
  // router.push({ name: "tariff" });
};
</script>

<style lang="scss">
.pin {
  .q-field__control {
    padding-left: 16px;
  }
}

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
