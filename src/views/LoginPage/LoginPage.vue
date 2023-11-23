<template>
  <div class="container auth">
    <div class="row justify-center">
      <div class="col-12 col-xs-10 col-sm-8 col-md-6">
        <div class="content column d-flex justify-center q-mx-auto">
          <h1 class="text-h1 q-mb-xs text-center">Авторизуйтесь</h1>
          <p class="q-mb-md text-body2 text-center">
            чтобы мы могли сохранить игровой процесс
          </p>
          <transition name="slide-fade" mode="out-in">
            <q-form
              v-if="loginStage"
              ref="form"
              class="rounded-lg bg-white text-primary q-pa-lg shadow-2 text-center"
              @submit.prevent="requestPin"
            >
              <p class="q-mb-sm text-body1">Номер телефона:</p>
              <q-input
                id="phone"
                ref="phoneRef"
                v-model="userPhone"
                name="phone"
                placeholder="+7 (___) ___ __ __"
                mask="+7 ### ### ## ##"
                unmasked-value
                filled
                fill-mask=" "
                class="q-mb-md"
                :rules="[
                  (val) => !!val || 'Надо заполнить',
                  (val) => val.length === 10 || 'Введите корректный номер',
                ]"
                lazy-rules
                autofocus
                type="tel"
                @paste="phonePasteEvent"
              >
                <template #hint>
                  <p style="font-size: 14px">
                    Введите номер телефона, и мы отправим вам пароль для входа в
                    игру
                  </p>
                </template>
              </q-input>

              <div class="flex justify-center">
                <ui-button
                  size="sm"
                  class="bg-accent q-mr-md q-mt-md"
                  :text-class="['text-body2', 'text-white', 'text-bold']"
                  type="submit"
                >
                  Далее
                </ui-button>
              </div>
            </q-form>
            <form
              v-else
              ref="form"
              class="rounded-lg bg-white text-primary q-pa-lg shadow-2 text-center"
            >
              <p class="q-mb-md text-body1">Пароль:</p>

              <div class="d-flex items-center">
                <PincodeInput
                  ref="pinRef"
                  v-model="pin"
                  :error="pincodeError"
                  :disabled="loadding"
                  @completed="logIn"
                >
                  <template v-if="userAlreadyExists" #hint>
                    На указанный вами номер телефона, ранее мы отправляли смс с
                    паролем для входа в игру. Используйте его для авторизации.
                  </template>
                  <template v-else #hint>
                    На указанный вами номер мы отправили пароль для входа с
                    игру, введите его в поле выше
                  </template>
                </PincodeInput>
              </div>
              <div class="flex q-mt-lg justify-center">
                <div class="" style="position: relative">
                  <ui-button
                    size="sm"
                    outline
                    :text-class="['text-body2', 'text-accent', 'text-bold']"
                    @click="goBackToPhone"
                  >
                    Назад
                  </ui-button>

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
                v-if="!loginStage && userAlreadyExists && !currentTimeToResend"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useQuasar } from "quasar";
import candidate from "@/api/candidate";
import store from "@/store";
// import { useRouter } from "vue-router";
import PincodeInput from "@/components/UiKit/PincodeInput";
import { useMeta } from "quasar";
import useTimer from "./composables/useTimer";
import { useRoute } from "vue-router";

useMeta({
  title: "Авторизация | ITS",
});

const { setTimer, getTime, currentTimeToResend } = useTimer();

const $q = useQuasar();
const pin = ref("");
const userPhone = ref("");
const userAlreadyExists = ref(false);
const phoneRef = ref(null);
const pinRef = ref(null);
const form = ref(null);
const pincodeError = ref("");
const loginStage = ref(true); //true
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

const phonePasteEvent = (e) => {
  e.preventDefault();
  let paste = (event.clipboardData || window.clipboardData).getData("text");
  paste = paste.replace(/[^\d]/g, "");
  const newString = String(paste).substring(String(paste).length - 10);
  userPhone.value = newString;
};

// watch(userPhone, (value) => {
//   if (value.length === 10) {
//     requestPin();
//   }
// });

const setSavedPhone = () => {
  const savedPhone = localStorage.getItem("userPhone");

  if (savedPhone) {
    userPhone.value = savedPhone.substring(1);
  }
};

const goBackToPhone = () => {
  loginStage.value = true;
  setSavedPhone();
};

const goForwardToPin = () => {
  loginStage.value = false;
  pin.value = "";
  pincodeError.value = "";
};

const requestPin = async () => {
  const isFormValid = userPhone.value.length === 10;
  if (!isFormValid) return;
  userAlreadyExists.value = false;

  try {
    // window.grecaptcha.ready(function () {
    //   window.grecaptcha
    //     .execute("6LeSntMoAAAAADsyZB3lmDFD4uRt6WtnSQR0DJ9j", {
    //       action: "submit",
    //     })
    //     .then(function (token) {
    //       console.log("recaptcha", token);
    //     });
    // });

    const responce = await candidate.candidateCreate("7" + userPhone.value);
    store.commit("setUserPhone", userPhone.value);

    if (responce.alreadyExists) {
      userAlreadyExists.value = true;
      store.commit("setUserPhone", userPhone.value);
    } else {
      $q.notify({
        color: "green",
        message: "Пароль отправлен",
        actions: false,
      });
    }

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
  if (process.env.FOR_PAGES === "true") {
    window.location.replace("/test/its_game");
  } else if (process.env.NODE_ENV === "production") {
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
    const response = await candidate.сandidateConfirmation(
      "7" + userPhone.value,
      pin.value
    );
    store.commit("setUserToken", response[0].token);

    $q.notify({
      color: "green",
      message: "Упешно выполнен вход",
      actions: false,
    });

    console.log(process.env.FOR_PAGES);

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
    const responce = await candidate.candidateCreate(
      "7" + userPhone.value,
      true
    );

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
  // if (localStorage.userToken) {
  //   goToGame();
  // }
  setSavedPhone();
  if (route.query.unauthorised === true) {
    $q.notify({
      color: "negative",
      message: "Вы не авторизованы или срок действия токена истёк",
    });
  }
});
</script>
<style>
.auth .q-field__messages {
  text-align: center;
}

.auth .pin p {
  text-align: center;
}
</style>
<style lang="scss" scoped>
.pin {
  .q-field__control {
    padding-left: 16px;
  }
}

.loadder-wrappper {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translate(100%, -50%);
}

.content {
  max-width: 360px;
  margin-top: 50vh;
  transform: translateY(-50%);
}

.remain {
  cursor: pointer;
}

.pin-input {
  width: 43px;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
