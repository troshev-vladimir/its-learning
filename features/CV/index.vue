<template>
  <UiBaseForm
    title="Резюме"
    class="base-block q-mt-lg q-mb-lg"
    @submit="sendForm"
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
  >
    <UiBaseInput
      name="name"
      label="Введите имя"
      required
      :root-class="['q-mb-xl']"
      v-model="form.name"
      @update="updateValue('name')"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'success',
        message: getErrorMessage(v$.name),
      }"
    />

    <UiBaseInput
      name="about"
      label="О себе"
      textarea
      required
      :root-class="['q-mb-xl']"
      v-model="form.about"
      @update="updateValue('about')"
      :validation-result="{
        status: v$.about.$error ? 'error' : 'success',
        message: getErrorMessage(v$.about),
      }"
    />
    <UiBaseInput
      name="email"
      label="Введите почту"
      type="text"
      :root-class="['q-mb-xl']"
      v-model="form.email"
      @update="updateValue('email')"
      :validation-result="{
        status: v$.email.$error ? 'error' : 'success',
        message: getErrorMessage(v$.email),
      }"
    />
    <UiBaseCheckbox
      name="current-work"
      v-model="v$.isCurrent.$model"
      label="По настоящее время"
      @update="updateValue('isCurrent')"
      class="q-mb-xl"
      required
      :validation-result="{
        status: v$.isCurrent.$error ? 'error' : 'success',
        message: getErrorMessage(v$.isCurrent),
      }"
    ></UiBaseCheckbox>

    <div class="q-mb-xl">
      <UiBaseCheckbox
        name="o3"
        v-model="form.options"
        label="Option3"
      ></UiBaseCheckbox>

      <UiBaseCheckbox
        name="o2"
        v-model="form.options"
        label="Option2"
      ></UiBaseCheckbox>

      <UiBaseCheckbox
        name="o1"
        v-model="form.options"
        label="Option1"
      ></UiBaseCheckbox>
    </div>
    <div style="display: flex; flex-direction: column" class="q-mb-xl">
      <UiBaseRadio name="radio" value="1" label="1" v-model="form.picked" />
      <UiBaseRadio name="radio" value="2" label="2" v-model="form.picked" />
      <UiBaseRadio name="radio" value="3" label="3" v-model="form.picked" />
      <UiBaseRadio name="radio" value="4" label="4" v-model="form.picked" />
    </div>

    <UiSelect
      :options="[
        { label: 'item1', value: '1', selected: false },
        { label: 'item2', value: '2', selected: false },
        { label: 'item3', value: '3', selected: false },
        { label: 'item4', value: '4', selected: false },
        { label: 'item5', value: '5', selected: true },
      ]"
      clearable
      class="q-mb-xl"
      name="items"
      multiple
      label="Выберите элементы"
      v-model="form.items"
      @update="updateValue('items')"
      :validation-result="{
        status: v$.items.$error ? 'error' : 'success',
        message: getErrorMessage(v$.items),
      }"
    ></UiSelect>
    <UiBaseFileinput
      v-model="form.files"
      multiple
      :accept="['text/html', 'text/javascript']"
      :max-size="9000"
      @update:modelValue="updateValue('files')"
      :validation-result="{
        status: v$.files.$error ? 'error' : 'success',
        message: getErrorMessage(v$.files),
      }"
    />
  </UiBaseForm>
</template>

<script setup lang="ts">
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = reactive<Record<string, any>>({
  name: 'asdasdsad',
  about: '111',
  email: 'initial',
  isCurrent: false,
  options: ['o2'],
  picked: '2',
  items: [],
  files: [],
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Поле обязательно', required),
      email: helpers.withMessage('Не верный email', email),
      $autoDirty: true,
    },
    name: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        ({ $params }: Record<string, any>) => `Минимум ${$params.min} символов`,
        minLength(6)
      ),
      $autoDirty: true,
    },
    about: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        ({ $params }: Record<string, any>) => `Минимум ${$params.min} символов`,
        minLength(6)
      ),
    },
    isCurrent: {
      sameAs: helpers.withMessage(
        'Надо отметить  обязательно',
        (value: boolean) => {
          return value
        }
      ),
    },

    items: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        ({ $params }: Record<string, any>) => `Минимум ${$params.min}`,
        minLength(2)
      ),
    },

    files: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        ({ $params }: Record<string, any>) => `Минимум ${$params.min}`,
        minLength(2)
      ),
    },
  }
})

const v$ = useVuelidate(rules, form)

const getErrorMessage = (field: any) => {
  if (field.$errors && field.$errors.length) {
    return field.$errors[0].$message
  }

  return ''
}

const updateValue = (fieldName: string) => {
  v$.value[fieldName].$touch()
}

const sendForm = async () => {
  // v$.value.$reset()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    console.log('sendForm')
  }
}
</script>
