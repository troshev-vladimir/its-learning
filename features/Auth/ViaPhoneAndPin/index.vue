<template>
  <transition name="slide-fade" mode="out-in">
    <q-form
      v-if="authStage === 'phone'"
      ref="formPhone"
      class="rounded-lg bg-white text-primary q-pa-lg shadow-2 text-center"
      @submit.prevent="requestPin"
    >
      <p class="q-mb-sm text-body1">Номер телефона:</p>
      <q-input
        id="phone"
        v-model="userPhone"
        name="phone"
        mask="+7 (###) ### ## ##"
        placeholder="+7 (___) ___ __ __"
        unmasked-value
        filled
        class="q-mb-md"
        :rules="[
          (val) => !!val || 'Заполните номер телефона',
          (val) => val.length === 10 || 'Введите корректный номер',
        ]"
        lazy-rules
        autofocus
        type="tel"
        @paste="phonePasteEvent"
        no-error-icon
      >
        <template #hint>
          <p style="font-size: 14px">
            Введите номер телефона, и мы отправим вам пароль для входа в игру
          </p>
        </template>
      </q-input>
      <div class="flex justify-center">
        <UiButton
          size="sm"
          class="bg-accent q-mr-md q-mt-md"
          :text-class="['text-body2', 'text-white', 'text-bold']"
          role="submit"
        >
          Далее
        </UiButton>
      </div>
    </q-form>
    <form
      v-else
      ref="formPin"
      class="rounded-lg bg-white text-primary q-pa-lg shadow-2 text-center"
      @submit.prevent
    >
      <p class="q-mb-md text-body1">Пароль:</p>

      <div class="d-flex items-center">
        <UiPincodeInput
          ref="pinRef"
          v-model="pin"
          :error="pincodeError"
          :disabled="loadding"
          @completed="logIn"
        >
          <template v-if="userAlreadyExists" #hint>
            На указанный вами номер телефона, ранее мы отправляли смс с паролем
            для входа в игру. Используйте его для авторизации.
          </template>
          <template v-else #hint>
            На указанный вами номер мы отправили пароль для входа с игру,
            введите его в поле выше
          </template>
        </UiPincodeInput>
      </div>
      <div class="flex q-mt-lg justify-center">
        <div class="" style="position: relative">
          <UiButton
            size="sm"
            outline
            :text-class="['text-body2', 'text-accent', 'text-bold']"
            @click="goBackToPhone"
          >
            Назад
          </UiButton>

          <div class="loadder-wrappper">
            <q-spinner
              v-if="loadding"
              class="loadder"
              color="primary"
              size="32px"
            />
          </div>
        </div>
      </div>
      <div
        v-if="userAlreadyExists && !currentTimeToResend"
        class="remain text-accent text-body2 text-center q-mt-md"
        @click="resend"
      >
        Напомнить пароль
      </div>

      <div v-if="currentTimeToResend" class="text-body2 q-mt-md">
        Повторная отправка возможна через:
        <span class="text-no-wrap">{{ getTime }}</span>
      </div>
    </form>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import useTimer from "./composables/useTimer";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
const { setTimer, getTime, currentTimeToResend } = useTimer();

const authStage = ref<"phone" | "pin">("phone");
const $q = useQuasar();
const pin = ref("");
const userPhone = ref("");
const userAlreadyExists = ref(false);
const pinRef = ref(null);
const form = ref(null);
const pincodeError = ref("");
const route = useRoute();
const loadding = ref(false);

const validatePin = () => {
  if (pin.value.length < 4) {
    pincodeError.value = "Неправильный пароль";
    return false;
  }
  return true;
};

watch(pin, (value) => {
  if (value) {
    pincodeError.value = "";
  }
});

const phonePasteEvent = (e: ClipboardEvent) => {
  e.preventDefault();
  const { clipboardData } = e;
  let paste = clipboardData?.getData("text");
  if (!paste) return;
  paste = paste.replace(/[^\d]/g, "");
  const newString = String(paste).substring(String(paste).length - 10);
  userPhone.value = newString;
};

const setSavedPhone = () => {
  const savedPhone = localStorage.getItem("userPhone");

  if (savedPhone) {
    userPhone.value = savedPhone.substring(1);
  }
};

const goBackToPhone = () => {
  authStage.value = "phone";
};

const goForwardToPin = () => {
  authStage.value = "pin";
  pin.value = "";
  pincodeError.value = "";
};

const requestPin = async () => {
  const isFormValid = userPhone.value.length === 10;
  if (!isFormValid) return;
  userAlreadyExists.value = true;

  try {
    // const responce = await candidate.candidateCreate("7" + userPhone.value);
    // store.commit("setUserPhone", userPhone.value);

    // if (responce.alreadyExists) {
    //   userAlreadyExists.value = true;
    //   store.commit("setUserPhone", userPhone.value);
    // } else {
    //   $q.notify({
    //     color: "green",
    //     message: "Пароль отправлен",
    //     actions: false,
    //   });
    // }
    goForwardToPin();
  } catch (error) {
    console.log(error);

    $q.notify({
      color: "negative",
      message: "Что то пошло не так",
    });
  }
};

const goToGame = () => {
  if (process.env.NODE_ENV === "production") {
    history.pushState({}, "", "https://lk.itseducation.ru/configurator/auth/");
    window.location.replace("/its_game");
  } else {
    console.log("to game");
  }
};

const logIn = async () => {
  const isFormValid = validatePin();

  if (!isFormValid) return;
  loadding.value = true;

  try {
    if ("7" + userPhone.value !== localStorage.getItem("userPhone")) {
      localStorage.clear();
    }
    // const response = await candidate.сandidateConfirmation(
    //   "7" + userPhone.value,
    //   pin.value
    // );
    // store.commit("setUserToken", response[0].token);

    $q.notify({
      color: "green",
      message: "Упешно выполнен вход",
    });

    goToGame();
  } catch (error) {
    pin.value = "";
    setTimeout(() => {
      // @ts-ignore
      pinRef.value.clear();
    });
  } finally {
    loadding.value = false;
  }
};

const resend = async () => {
  if (!userPhone.value) return;

  try {
    const responce = true; //await candidate.candidateCreate(
    //   "7" + userPhone.value,
    //   true
    // );

    if (responce) {
      $q.notify({
        color: "green",
        message: "Пароль отправлен",
      });
      setTimer();
    } else {
      $q.notify({
        color: "negative",
        message: "Что то пошло не так",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  setSavedPhone();
  if (route.query.unauthorised) {
    $q.notify({
      color: "negative",
      message: "Вы не авторизованы или срок действия токена истёк",
    });
  }
});
</script>

<style></style>
