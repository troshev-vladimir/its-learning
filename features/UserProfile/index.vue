<template>
  <UiBaseForm
    title="Редактирование профиля"
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
    @submit="sendForm"
  >
    <UiBaseInput
      v-model="form.name"
      name="name"
      label="Имя"
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'none',
        message: getErrorMessage(v$.name),
      }"
      @update:model-value="v$.name.$touch"
    />

    <UiBaseInput
      v-model="form.city"
      name="city"
      label="Город"
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.city.$error ? 'error' : 'none',
        message: getErrorMessage(v$.city),
      }"
      :suggestions="citys"
      @update="v$.city.$touch"
      @update:model-value="sugestCity(form.city)"
    />

    <UiSelect
      v-model="form.degree"
      :options="[
        { label: 'Высшее', value: '1', selected: false },
        { label: 'Не Высшее', value: '2', selected: false },
      ]"
      clearable
      class="q-mb-sm"
      name="degree"
      label="Уровень образования"
      :validation-result="{
        status: v$.degree.$error ? 'error' : 'none',
        message: getErrorMessage(v$.degree),
      }"
      @update="updateValue('degree')"
    ></UiSelect>

    <UiDatePicker
      v-model="form.releaseYear"
      label="Год окончания"
      name="releaseYear"
      year-picker
      root-class="q-mb-sm"
      :validation-result="{
        status: v$.releaseYear.$error ? 'error' : 'none',
        message: getErrorMessage(v$.releaseYear),
      }"
      @update:model-value="v$.releaseYear.$touch"
    ></UiDatePicker>

    <UiBaseInput
      v-model="form.vuz"
      name="vuz"
      label="Учебное заведение"
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.vuz.$error ? 'error' : 'none',
        message: getErrorMessage(v$.vuz),
      }"
      @update="v$.vuz.$touch"
    />

    <UiBaseInput
      v-model="form.faculty"
      name="faculty"
      label="Факультет"
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.faculty.$error ? 'error' : 'none',
        message: getErrorMessage(v$.faculty),
      }"
      @update="v$.faculty.$touch"
    />
    <UiBaseInput
      v-model="form.learnArea"
      name="learnArea"
      label="Направление обучения"
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.learnArea.$error ? 'error' : 'none',
        message: getErrorMessage(v$.learnArea),
      }"
      @update="v$.learnArea.$touch"
    />
    <UiDatePicker
      v-model="form.birthdate"
      label="Дата рождения"
      name="birthdate"
      root-class="q-mb-sm"
      :validation-result="{
        status: v$.birthdate.$error ? 'error' : 'none',
        message: getErrorMessage(v$.birthdate),
      }"
      @update:model-value="v$.birthdate.$touch"
    ></UiDatePicker>

    <UiBaseInput
      v-model="form.birthPlace"
      name="birthPlace"
      label="Место рождения"
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.birthPlace.$error ? 'error' : 'none',
        message: getErrorMessage(v$.birthPlace),
      }"
      :suggestions="citys"
      @update="v$.birthPlace.$touch"
      @update:model-value="sugestCity(form.birthPlace)"
    />

    <UiBaseCheckbox
      v-model="form.havExperience"
      name="havExperience"
      label="У меня есть опыт в программировании"
      class="q-mb-sm"
      :validation-result="{
        status: v$.havExperience.$error ? 'error' : 'none',
        message: getErrorMessage(v$.havExperience),
      }"
      @update="updateValue('havExperience')"
    ></UiBaseCheckbox>

    <UiBaseFileinput
      v-model="form.graduates"
      multiple
      class="q-mb-sm"
      :accept="['image/png', 'image/jpeg']"
      :max-size="9 * 1024 * 1024"
      label="Прикрепить файлы"
      :validation-result="{
        status: v$.graduates.$error ? 'error' : 'none',
        message: getErrorMessage(v$.graduates),
      }"
      @update:model-value="updateValue('graduates')"
    />
    <UiBaseFileinput
      v-model="form.additionalGraduates"
      multiple
      class="q-mb-sm"
      :accept="['image/png', 'image/jpeg']"
      :max-size="9 * 1024 * 1024"
      label="Прикрепить файлы"
      :validation-result="{
        status: v$.additionalGraduates.$error ? 'error' : 'none',
        message: getErrorMessage(v$.additionalGraduates),
      }"
      @update:model-value="updateValue('additionalGraduates')"
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
