<template>
  <UiBaseForm
    title="Редактирование профиля"
    @submit="sendForm"
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
  >
    <UiBaseInput
      name="name"
      label="Имя"
      required
      :root-class="['q-mb-sm']"
      @update:model-value="v$.name.$touch"
      v-model="form.name"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'success',
        message: getErrorMessage(v$.name),
      }"
    />

    <UiBaseInput
      name="city"
      label="Город"
      :root-class="['q-mb-sm']"
      @update="v$.city.$touch"
      v-model="form.city"
      @update:modelValue="sugestCity(form.city)"
      :validation-result="{
        status: v$.city.$error ? 'error' : 'success',
        message: getErrorMessage(v$.city),
      }"
      :suggestions="citys"
    />

    <UiSelect
      :options="[
        { label: 'Высшее', value: '1', selected: false },
        { label: 'Не Высшее', value: '2', selected: false },
      ]"
      clearable
      class="q-mb-sm"
      name="degree"
      label="Уровень образования"
      v-model="form.degree"
      @update="updateValue('degree')"
      :validation-result="{
        status: v$.degree.$error ? 'error' : 'success',
        message: getErrorMessage(v$.degree),
      }"
    ></UiSelect>

    <UiDatePicker
      label="Год окончания"
      name="releaseYear"
      v-model="form.releaseYear"
      @update:modelValue="v$.releaseYear.$touch"
      year-picker
      root-class="q-mb-sm"
      :validation-result="{
        status: v$.releaseYear.$error ? 'error' : 'success',
        message: getErrorMessage(v$.releaseYear),
      }"
    ></UiDatePicker>

    <UiBaseInput
      name="vuz"
      label="Учебное заведение"
      :root-class="['q-mb-sm']"
      @update="v$.vuz.$touch"
      v-model="form.vuz"
      :validation-result="{
        status: v$.vuz.$error ? 'error' : 'success',
        message: getErrorMessage(v$.vuz),
      }"
    />

    <UiBaseInput
      name="faculty"
      label="Факультет"
      :root-class="['q-mb-sm']"
      @update="v$.faculty.$touch"
      v-model="form.faculty"
      :validation-result="{
        status: v$.faculty.$error ? 'error' : 'success',
        message: getErrorMessage(v$.faculty),
      }"
    />
    <UiBaseInput
      name="learnArea"
      label="Направление обучения"
      :root-class="['q-mb-sm']"
      @update="v$.learnArea.$touch"
      v-model="form.learnArea"
      :validation-result="{
        status: v$.learnArea.$error ? 'error' : 'success',
        message: getErrorMessage(v$.learnArea),
      }"
    />
    <UiDatePicker
      label="Дата рождения"
      name="birthdate"
      v-model="form.birthdate"
      @update:modelValue="v$.birthdate.$touch"
      root-class="q-mb-sm"
      :validation-result="{
        status: v$.birthdate.$error ? 'error' : 'success',
        message: getErrorMessage(v$.birthdate),
      }"
    ></UiDatePicker>

    <UiBaseInput
      name="birthPlace"
      label="Место рождения"
      :root-class="['q-mb-sm']"
      @update="v$.birthPlace.$touch"
      v-model="form.birthPlace"
      @update:modelValue="sugestCity(form.birthPlace)"
      :validation-result="{
        status: v$.birthPlace.$error ? 'error' : 'success',
        message: getErrorMessage(v$.birthPlace),
      }"
      :suggestions="citys"
    />

    <UiBaseCheckbox
      name="havExperience"
      v-model="form.havExperience"
      label="У меня есть опыт в программировании"
      @update="updateValue('havExperience')"
      class="q-mb-sm"
      :validation-result="{
        status: v$.havExperience.$error ? 'error' : 'success',
        message: getErrorMessage(v$.havExperience),
      }"
    ></UiBaseCheckbox>

    <UiBaseFileinput
      v-model="form.graduates"
      multiple
      class="q-mb-sm"
      :accept="['image/png', 'image/jpeg']"
      :max-size="9 * 1024 * 1024"
      label="Прикрепить файлы"
      @update:modelValue="updateValue('graduates')"
      :validation-result="{
        status: v$.graduates.$error ? 'error' : 'success',
        message: getErrorMessage(v$.graduates),
      }"
    />
    <UiBaseFileinput
      v-model="form.additionalGraduates"
      multiple
      class="q-mb-sm"
      :accept="['image/png', 'image/jpeg']"
      :max-size="9 * 1024 * 1024"
      label="Прикрепить файлы"
      @update:modelValue="updateValue('additionalGraduates')"
      :validation-result="{
        status: v$.additionalGraduates.$error ? 'error' : 'success',
        message: getErrorMessage(v$.additionalGraduates),
      }"
    />
  </UiBaseForm>
</template>
<script setup lang="ts">
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
const { citys, sugestCity } = useSugestions()
const emit = defineEmits(['submit'])

const form = reactive<Record<string, any>>({
  name: 'asdasdasd',
  city: '',
  degree: 0,
  releaseYear: '',
  vuz: '',
  faculty: '',
  learnArea: '',
  birthdate: '',
  birthPlace: '',
  havExperience: false,
  graduates: [],
  additionalGraduates: [],
})

const rules = computed(() => {
  return {
    name: { required: helpers.withMessage('Поле обязательно', required) },
    city: {},
    degree: {},
    releaseYear: {},
    vuz: {},
    faculty: {},
    learnArea: {},
    birthdate: {},
    birthPlace: {},
    havExperience: {},
    graduates: {},
    additionalGraduates: {},
  }
})

const v$ = useVuelidate(rules, form)

const getErrorMessage = (field: any) => {
  if (field.$errors && field.$errors.length) {
    return field.$errors[0].$message
  }

  return ''
}

const updateValue = (fieldName: string, index?: number) => {
  v$.value[fieldName].$touch()
}

const sendForm = async () => {
  // v$.value.$reset()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    console.log(form)
    emit('submit')
  }
}
</script>
<style lang="scss"></style>
