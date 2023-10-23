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
                    Введите номер телефона, и мы отправим вам пароль для входа в
                    игру
                  </p>
                </template>
              </q-input>
            </form>
            <form
              v-else
              ref="form"
              class="rounded-lg bg-white text-primary q-pa-lg shadow-2"
              @submit.prevent="userAlreadyExists ? logIn() : resend()"
            >
              <p class="q-mb-md text-body1">Пароль</p>

              <div>
                <PincodeInput
                  v-model="pin"
                  :error="pincodeError"
                  @completed="logIn"
                />
              </div>
              <div class="flex q-mt-lg justify-center">
                <ui-button
                  size="sm"
                  class="bg-accent q-mr-md"
                  :text-class="['text-body2', 'text-white', 'text-bold']"
                  role="submit"
                >
                  {{ userAlreadyExists ? "Войти" : "Получить пароль" }}
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

const $q = useQuasar();
const pin = ref("");
const userPhone = ref("");
const userAlreadyExists = ref(false);
const phoneRef = ref(null);
const form = ref(null);
const pincodeError = ref("");
const loginStage = ref(true);

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

watch(userPhone, (value) => {
  if (value.length === 10) {
    requestPin();
  }
});

const requestPin = async () => {
  const isFormValid = userPhone.value.length === 10;
  if (!isFormValid) return;

  try {
    const responce = await candidate.candidateCreate("7" + userPhone.value);
    store.commit("setUserPhone", userPhone.value);

    if (responce) {
      $q.notify({
        color: "green",
        message: "Пароль отправлен",
        actions: false,
      });
    }
  } catch (error) {
    console.log(error);

    if (error.response?.status === 400) {
      userAlreadyExists.value = true;
    } else {
      $q.notify({
        color: "negative",
        message: "Что то пошло не так",
      });
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
