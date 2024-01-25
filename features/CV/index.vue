<template>
  <UiBaseForm
    title="Резюме"
    class="base-block q-mt-lg q-mb-lg"
    @submit="sendForm"
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
  >
    <div class="image q-mb-lg">
      <img
        src="https://avatars.mds.yandex.net/i?id=aefeb02bc321d03e4c317911c53e1cef985e2c6f-9821502-images-thumbs&n=13"
        width="160"
        height="160"
      />
      <UiBaseFileinput
        v-model="form.imageFile"
        multiple
        class="q-mb-md"
        :accept="['text/html', 'text/javascript']"
        :max-size="9000"
        label="Прикрепить файлы"
        @update:modelValue="updateValue('imageFile')"
        :validation-result="{
          status: v$.imageFile.$error ? 'error' : 'success',
          message: getErrorMessage(v$.imageFile),
        }"
      />
    </div>

    <UiBaseInput
      name="name"
      label="Имя"
      required
      :root-class="['q-mb-xl']"
      @update="v$.name.$touch"
      v-model="form.name"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'success',
        message: getErrorMessage(v$.name),
      }"
    />

    <UiBaseInput
      name="phone"
      label="Номер телефона"
      required
      :root-class="['q-mb-xl']"
      v-model="maskedPhone"
      @update="updateValue('phone')"
      :validation-result="{
        status: v$.phone.$error ? 'error' : 'success',
        message: getErrorMessage(v$.phone),
      }"
      mask="+7 (###) ### ##-##"
    />

    <UiBaseInput
      name="city"
      label="Город"
      :root-class="['q-mb-lg']"
      @update="v$.city.$touch"
      v-model="form.city"
      @update:modelValue="getSuggestions(form.city)"
      :validation-result="{
        status: v$.city.$error ? 'error' : 'success',
        message: getErrorMessage(v$.city),
      }"
      :suggestions="citys"
    />

    <span class="label">Пол</span>
    <div style="display: flex" class="q-mb-xl">
      <UiBaseRadio
        name="gender"
        value="male"
        label="Мужской"
        v-model="form.gender"
        class="q-mr-md"
      />
      <UiBaseRadio
        name="gender"
        value="female"
        label="Женский"
        v-model="form.gender"
      />
    </div>

    <UiSelect
      :options="[
        { label: 'PHP', value: '1', selected: false },
        { label: 'JS', value: '2', selected: false },
        { label: 'Java', value: '3', selected: false },
        { label: 'C++', value: '4', selected: false },
      ]"
      clearable
      multiple
      class="q-mb-xl"
      name="programingLanguages"
      label="Дополнительные языки программирования"
      v-model="form.programingLanguages"
      @update="updateValue('programingLanguages')"
      :validation-result="{
        status: v$.programingLanguages.$error ? 'error' : 'success',
        message: getErrorMessage(v$.programingLanguages),
      }"
    ></UiSelect>

    <div class="experience">
      <p class="text-h2 q-mb-md">Опыт работы</p>
      <template v-for="(item, index) in form.experience" :key="index">
        <UiDatePicker
          label="Дата начала"
          :name="`experience.startDate[${index}]`"
          v-model="form.experience[index].startDate"
          @update:modelValue="v$.experience[index].startDate.$touch()"
          class="q-mb-lg"
          :validation-result="{
            status: v$.experience[index].startDate.$error ? 'error' : 'success',
            message: getErrorMessage(v$.experience[index].startDate),
          }"
        ></UiDatePicker>
        <UiBaseCheckbox
          v-model="form.experience[index].tillNow"
          @update="v$.experience[index].tillNow.$touch()"
          name="tillNow"
          v-if="index + 1 === form.experience.length"
        >
          По настоящее время
        </UiBaseCheckbox>
        <UiDatePicker
          :disabled="form.experience[index].tillNow"
          label="Дата окончания"
          v-model="form.experience[index].endDate"
          @update:modelValue="v$.experience[index].endDate.$touch()"
          :name="`experience.endDate[${index}]`"
          class="q-mb-lg"
          :validation-result="{
            status: v$.experience[index].endDate.$error ? 'error' : 'success',
            message: getErrorMessage(v$.experience[index].endDate),
          }"
        ></UiDatePicker>
      </template>
    </div>

    <!-- <UiBaseInput
      name="name"
      label="Введите имя"
      required
      :root-class="['q-mb-xl']"
      @update="v$.name.$touch"
      v-model="form.name"
      @update:modelValue="getSuggestions"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'success',
        message: getErrorMessage(v$.name),
      }"
      :suggestions="citys"
    />
    <UiBaseInput
      name="phone"
      label="Введите телефон"
      required
      :root-class="['q-mb-xl']"
      v-model="maskedPhone"
      @update="updateValue('phone')"
      :validation-result="{
        status: v$.phone.$error ? 'error' : 'success',
        message: getErrorMessage(v$.phone),
      }"
      mask="+7 (###) ### ##-##"
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
      required
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
      class="q-mb-md"
      :accept="['text/html', 'text/javascript']"
      :max-size="9000"
      label="Прикрепить файлы"
      @update:modelValue="updateValue('files')"
      :validation-result="{
        status: v$.files.$error ? 'error' : 'success',
        message: getErrorMessage(v$.files),
      }"
    />
    <UiDatePicker
      v-model="form.date"
      @update:modelValue="updateValue('date')"
      class="q-mb-lg"
      :validation-result="{
        status: v$.date.$error ? 'error' : 'success',
        message: getErrorMessage(v$.date),
      }"
    ></UiDatePicker> -->
  </UiBaseForm>
</template>
<script setup lang="ts">
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { Mask } from 'maska'

const form = reactive<Record<string, any>>({
  imageFile: [],
  name: '',
  phone: '',
  city: '',
  gender: 'male',
  programingLanguages: [],
  experience: [
    {
      startDate:
        'Thu Jan 11 2024 13:26:00 GMT+0300 (Москва, стандартное время)',
      endDate: '',
      tillNow: false,
      organisation: '', //dadataa
      position: '',
      responsibilitys: '',
    },
    {
      startDate: '',
      endDate: '',
      tillNow: false,
      organisation: '', //dadataa
      position: '',
      responsibilitys: '',
    },
  ],
  education: [
    {
      degree: '',
      releaseYear: '',
      instityte: '',
      faculty: '',
      specialisation: '',
    },
  ],
  skils: [],
  aboutMe: '111',

  // email: 'initial',
  // isCurrent: false,
  // options: ['o2'],
  // picked: '2',
  // items: [],
  // files: [],
  // date: '',
})

const phoneMask = '+7 (###) ### ##-##'
const mask = new Mask({ mask: phoneMask })
const maskedPhone = ref('')
const unmaskedPhone = computed(() => {
  form.phone = mask.unmasked(maskedPhone.value)
  return mask.unmasked(maskedPhone.value)
})

const citys = ref<string[]>([])

const getSuggestions = async (value: string) => {
  try {
    citys.value = await getSuggestionCitys(value)
  } catch (error) {
    return []
  }
}
const mustBeEndOfExperience = (isTillNow: boolean) => {
  console.log(isTillNow)
  return helpers.withParams(
    { type: 'contains', value: isTillNow },
    (value: string | null) => value || isTillNow
  )
}
const rules = computed(() => {
  return {
    imageFile: {},
    name: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        ({ $params }: Record<string, any>) => `Минимум ${$params.min} символов`,
        minLength(6)
      ),
    },
    city: {},
    phone: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        () => `Введите корректный телефон`,
        minLength(10)
      ),
    },
    gender: {},
    programingLanguages: {},
    experience: form.experience.map((el: any, index: number) => {
      return {
        startDate: {
          required: helpers.withMessage('Поле обязательно', required),
        },
        endDate: {
          required: helpers.withMessage(
            'Поле обязательно',
            mustBeEndOfExperience(form.experience[index].tillNow)
          ),
        },
        tillNow: {},
        organisation: {}, //dadataa
        position: {},
        responsibilitys: {},
      }
    }),
    // email: {
    //   required: helpers.withMessage('Поле обязательно', required),
    //   email: helpers.withMessage('Не верный email', email),
    // },
    // name: {
    //   required: helpers.withMessage('Поле обязательно', required),
    //   minLength: helpers.withMessage(
    //     ({ $params }: Record<string, any>) => `Минимум ${$params.min} символов`,
    //     minLength(6)
    //   ),
    // },
    // phone: {
    //   required: helpers.withMessage('Поле обязательно', required),
    //   minLength: helpers.withMessage(
    //     () => `Введите корректный телефон`,
    //     minLength(10)
    //   ),
    // },
    // about: {
    //   required: helpers.withMessage('Поле обязательно', required),
    //   minLength: helpers.withMessage(
    //     ({ $params }: Record<string, any>) => `Минимум ${$params.min} символов`,
    //     minLength(6)
    //   ),
    // },
    // isCurrent: {
    //   sameAs: helpers.withMessage(
    //     'Надо отметить  обязательно',
    //     (value: boolean) => {
    //       return value
    //     }
    //   ),
    // },
    // items: {
    //   required: helpers.withMessage('Поле обязательно', required),
    //   minLength: helpers.withMessage(
    //     ({ $params }: Record<string, any>) => `Минимум ${$params.min}`,
    //     minLength(2)
    //   ),
    // },
    // files: {
    //   required: helpers.withMessage('Поле обязательно', required),
    //   minLength: helpers.withMessage(
    //     ({ $params }: Record<string, any>) => `Минимум ${$params.min}`,
    //     minLength(2)
    //   ),
    // },
    // date: {
    //   required: helpers.withMessage('Поле обязательно', required),
    // },
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
    console.log('sendForm')
  }
}
</script>
<style lang="scss">
.image {
  display: flex;
  align-items: center;
  img {
    border-radius: 8px;
    margin-right: 40px;
  }
}
</style>
