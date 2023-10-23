<template>
  <div class="container">
    <div class="row">
      <div
        class="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3"
      >
        <div class="content column d-flex justify-center">
          <h1 class="text-h1 q-mb-xs text-center">Авторизуйтесь</h1>
          <p class="q-mb-md text-body2 text-center">
            что бы мы могли сохранить игровой процесс
          </p>
          <transition name="slide-fade" mode="out-in">
            <form
              v-if="loginStage"
              ref="form"
              class="rounded-lg bg-white text-primary q-pa-lg shadow-2"
            >
              <p class="q-mb-sm text-body1">Номер телефона:</p>
              <q-input
                ref="phoneRef"
                v-model="userPhone"
                placeholder="+7 (###) ### ## ##"
                mask="+7 (###) ### ## ##"
                unmasked-value
                filled
                fill-mask="_"
                class="q-mb-md"
                :rules="[
                  (val) => !!val || 'Надо заполнить',
                  (val) => val.length === 10 || 'Введите корректный номер',
                ]"
                lazy-rules
              >
                <template #hint>
                  <p style="font-size: 14px">
                    Введите номер телефона, и мы отправим вам код безопасности
                    для входа в игру
                  </p>
                </template>
              </q-input>

              <!-- <label>
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
            </label> -->
            </form>
            <form
              v-else
              ref="form"
              class="rounded-lg bg-white text-primary q-pa-lg shadow-2"
              @submit.prevent="logIn"
            >
              <p class="q-mb-md text-body1">ПИН-код</p>

              <div>
                <PincodeInput
                  v-model="pin"
                  :error="pincodeError"
                  @completed="logIn"
                />
              </div>
              <a v-if="userAlreadyExists" @click="resend">Не помню пароль</a>
              <div class="flex q-mt-lg justify-center">
                <ui-button
                  size="sm"
                  class="bg-accent q-mr-md"
                  :text-class="['text-body2', 'text-white', 'text-bold']"
                  role="submit"
                >
                  Войти
                </ui-button>

                <ui-button
                  size="sm"
                  outline
                  :text-class="['text-body2', 'text-accent', 'text-bold']"
                  @click="loginStage = true"
                >
                  Вернуться
                </ui-button>
              </div>
            </form>
          </transition>

          <!-- <div
            class="remain text-accent text-body2 text-center q-mt-md"
            @click="remainPin"
          >
            Напомнить ПИН-код
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import candidate from "@/api/candidate";
import store from "@/store";
// import { useRouter } from "vue-router";
import PincodeInput from "@/components/UiKit/PincodeInput";
import { useMeta } from "quasar";

useMeta({
  title: "Авторизация | ITS",
});

// import { emailValidate } from "@/helpers/utils.ts";
const $q = useQuasar();
// const router = useRouter();
const pin = ref("");
const userPhone = ref("");
const userAlreadyExists = ref(false);
// const userEmail = ref("");
// const userName = ref("");
const phoneRef = ref(null);
// const emailRef = ref(null);
// const nameRef = ref(null);
const form = ref(null);
const pincodeError = ref("");
const loginStage = ref(true);
// const remainPin = () => {
//   if (!userPhone.value || !phoneRef.value.validate()) {
//     $q.notify({
//       message: "Введите номер телефона",
//       caption: "Туда будет отправлен пин-код",
//     });
//     return;
//   } else {
//     $q.notify({
//       color: "green",
//       message: "Пинкод отправлен",
//     });
//   }
// };

const validatePin = () => {
  if (pin.value.length < 4) {
    pincodeError.value = "Неправильный пинкод";
    return false;
  }
  return true;
};

watch(pin, (value) => {
  if (value) {
    pincodeError.value = "";
  }
});

// const validate = () => {
//   const phoneValid = phoneRef.value.validate();
//   const nameValid = nameRef.value.validate();
//   const emailValid = emailRef.value.validate();
//   const pinValid = validatePin();
//   return phoneValid && nameValid && emailValid && pinValid;
// };

watch(userPhone, (value) => {
  if (value.length === 10) {
    requestPin();
  }
});

const requestPin = async () => {
  const isFormValid = userPhone.value.length === 10;
  if (!isFormValid) return;

  try {
    await candidate.candidateCreate("7" + userPhone.value);
    store.commit("setUserPhone", userPhone.value);

    $q.notify({
      color: "green",
      message: "Пинкод отправлен",
      actions: false,
    });
  } catch (error) {
    console.log(error);

    if (error.response.status === 400) {
      userAlreadyExists.value = true;
    }
  } finally {
    loginStage.value = false;
    pin.value = "";
  }
};

const logIn = async () => {
  const isFormValid = validatePin();
  if (!isFormValid) return;

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
    // router.push({ name: "tariff" });
    window.location.href = "/lid-game";
  } catch (error) {
    console.log(error);
    loginStage.value = true;
  }
};

const resend = () => {
  candidate.candidateCreate("7" + userPhone.value, true);
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
