import type { UiDatePicker } from '#build/components';
<template>
  <UiBaseForm
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
    submi-text="Войти"
    :loadding="isLoadding"
    title=""
  >
    <div class="row q-col-gutter-y-sm q-col-gutter-x-lg">
      <div class="col-12 col-sm-6 col-md-4">
        <UiBaseInput
          v-model="v$.name.$model"
          name="name"
          label="Имя"
          mask="a"
          capitalize
          required
          :validation-result="{
            status: v$.name.$error ? 'error' : 'none',
            message: getErrorMessage(v$.name),
          }"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <UiBaseInput
          v-model="v$.surname.$model"
          name="surname"
          label="Фамилия"
          mask="a"
          capitalize
          required
          :validation-result="{
            status: v$.surname.$error ? 'error' : 'none',
            message: getErrorMessage(v$.surname),
          }"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <UiBaseInput
          v-model="v$.lastname.$model"
          name="lastname"
          label="Отчество"
          mask="a"
          required
          capitalize
          :validation-result="{
            status: v$.lastname.$error ? 'error' : 'none',
            message: getErrorMessage(v$.lastname),
          }"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <UiDatePicker
          v-model="v$.birthdate.$model"
          name="birthdate"
          label="Дата рождения"
          required
          :validation-result="{
            status: v$.birthdate.$error ? 'error' : 'none',
            message: getErrorMessage(v$.birthdate),
          }"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <UiBaseInput
          v-model="v$.birthplace.$model"
          name="birthplace"
          label="Место рождения"
          required
          :validation-result="{
            status: v$.birthplace.$error ? 'error' : 'none',
            message: getErrorMessage(v$.birthplace),
          }"
          :suggestions="citys"
          @update:model-value="sugestCity(v$.birthplace.$model)"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <UiBaseInput
          v-model="v$.snils.$model"
          v-model:maskError="v$.snils.$error"
          name="snils"
          label="СНИЛС"
          required
          unmasked
          mask="###-###-### ##"
          :validation-result="{
            status: v$.snils.$error ? 'error' : 'none',
            message: getErrorMessage(v$.snils),
          }"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <UiBaseInput
          v-model="v$.pasport.$model"
          name="pasport"
          label="Номер и серия паспорта"
          mask="#### ######"
          required
          :validation-result="{
            status: v$.pasport.$error ? 'error' : 'none',
            message: getErrorMessage(v$.pasport),
          }"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <UiBaseInput
          v-model="v$.departmentCode.$model"
          name="departmentCode"
          label="Введите код подразделения"
          mask="###-###"
          required
          :validation-result="{
            status: v$.departmentCode.$error ? 'error' : 'none',
            message: getErrorMessage(v$.departmentCode),
          }"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <UiDatePicker
          v-model="v$.extradition.$model"
          name="extradition"
          label="Дата выдачи"
          required
          :validation-result="{
            status: v$.extradition.$error ? 'error' : 'none',
            message: getErrorMessage(v$.extradition),
          }"
        />
      </div>
    </div>
    <template #actions><span></span></template>
  </UiBaseForm>
</template>
<script setup lang="ts">
import { getErrorMessage } from '~/utils/helpers'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
const { citys, sugestCity } = useSugestions()

const props = defineProps<{
  isLoadding?: boolean
  modelValue: any
}>()

const emit = defineEmits(['submit', 'update:modelValue'])

const userSotre = useUserStore()
const { accessToken } = storeToRefs(userSotre)

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Поле обязательно', required),
    },
    surname: {
      required: helpers.withMessage('Поле обязательно', required),
    },
    lastname: {
      required: helpers.withMessage('Поле обязательно', required),
    },
    birthdate: {
      required: helpers.withMessage('Поле обязательно', required),
    },
    birthplace: {
      required: helpers.withMessage('Поле обязательно', required),
    },
    snils: {
      required: helpers.withMessage('Поле обязательно', required),
    },
    pasport: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        'Обязательная длина 10 символов',
        minLength(11)
      ),
    },
    departmentCode: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        'Обязательная длина 6 символов',
        minLength(7)
      ),
    },
    extradition: {
      required: helpers.withMessage('Поле обязательно', required),
    },
  }
})
const v$ = useVuelidate(rules, localValue)

const validate = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    console.log(localValue)
    return true
  }
}

defineExpose({
  validate,
})
</script>
<style lang="scss" scoped></style>
