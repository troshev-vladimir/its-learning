<template>
  <UiBaseForm
    title="Резюме"
    class="q-mb-lg"
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
    @submit="sendForm"
  >
    <div :class="[$style.image, 'q-mb-lg']">
      <img
        v-for="(photoURL, index) in userPhoto"
        :key="index"
        :src="photoURL"
        width="160"
      />
      <UiBaseFileinput
        v-model="form.imageFile"
        class="q-mb-sm"
        :accept="['image/png', 'image/jpeg']"
        :max-size="9 * 1024 * 1024"
        label="Прикрепить файлы"
        :validation-result="{
          status: v$.imageFile.$error ? 'error' : 'success',
          message: getErrorMessage(v$.imageFile),
        }"
        @preview="getUserProto"
        @update:model-value="updateValue('imageFile')"
      />
    </div>

    <UiBaseInput
      v-model="form.name"
      name="name"
      label="Имя"
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'success',
        message: getErrorMessage(v$.name),
      }"
      @update:model-value="v$.name.$touch"
    />

    <UiBaseInput
      v-model="maskedPhone"
      name="phone"
      label="Номер телефона"
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.phone.$error ? 'error' : 'success',
        message: getErrorMessage(v$.phone),
      }"
      mask="+7 (###) ### ##-##"
      @update:model-value="updateValue('phone')"
    />

    <UiBaseInput
      v-model="form.city"
      name="city"
      label="Город"
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.city.$error ? 'error' : 'success',
        message: getErrorMessage(v$.city),
      }"
      :suggestions="citys"
      @update="v$.city.$touch"
      @update:model-value="sugestCity(form.city)"
    />

    <span class="label">Пол</span>
    <div style="display: flex" class="q-mb-sm">
      <UiBaseRadio
        v-model="form.gender"
        name="gender"
        value="male"
        label="Мужской"
        class="q-mr-md"
      />
      <UiBaseRadio
        v-model="form.gender"
        name="gender"
        value="female"
        label="Женский"
      />
    </div>

    <UiSelect
      v-model="form.programingLanguages"
      :options="[
        { label: 'PHP', value: '1', selected: false },
        { label: 'JS', value: '2', selected: false },
        { label: 'Java', value: '3', selected: false },
        { label: 'C++', value: '4', selected: false },
      ]"
      clearable
      multiple
      each-clearable
      class="q-mb-sm"
      name="programingLanguages"
      label="Дополнительные языки программирования"
      :validation-result="{
        status: v$.programingLanguages.$error ? 'error' : 'success',
        message: getErrorMessage(v$.programingLanguages),
      }"
      @update="updateValue('programingLanguages')"
    ></UiSelect>

    <div class="experience base-block base-shadow q-my-xl">
      <p class="text-h2 q-mb-sm">Опыт работы</p>
      <template v-for="(item, index) in form.experience" :key="index">
        <UiDatePicker
          v-model="form.experience[index].startDate"
          label="Дата начала"
          :name="`experience.startDate[${index}]`"
          root-class="q-mb-sm"
          :validation-result="{
            status: v$.experience[index].startDate.$error ? 'error' : 'success',
            message: getErrorMessage(v$.experience[index].startDate),
          }"
          @update:model-value="v$.experience[index].startDate.$touch"
        ></UiDatePicker>
        <UiBaseCheckbox
          v-if="index + 1 === form.experience.length"
          v-model="form.experience[index].tillNow"
          name="tillNow"
          @update="v$.experience[index].tillNow.$touch"
        >
          По настоящее время
        </UiBaseCheckbox>
        <UiDatePicker
          v-if="!form.experience[index].tillNow"
          v-model="form.experience[index].endDate"
          label="Дата окончания"
          :name="`experience.endDate[${index}]`"
          root-class="q-mb-sm"
          :validation-result="{
            status: v$.experience[index].endDate.$error ? 'error' : 'success',
            message: getErrorMessage(v$.experience[index].endDate),
          }"
          @update:model-value="v$.experience[index].endDate.$touch"
        ></UiDatePicker>

        <UiBaseInput
          v-model="form.experience[index].company"
          :name="`experience.company[${index}]`"
          label="Компания"
          :root-class="['q-mb-sm']"
          :validation-result="{
            status: v$.experience[index].company.$error ? 'error' : 'success',
            message: getErrorMessage(v$.experience[index].company),
          }"
          :suggestions="companies"
          @update="v$.experience[index].company.$touch"
          @update:model-value="sugestCompany(form.experience[index].company)"
        />

        <UiBaseInput
          v-model="form.experience[index].position"
          :name="`experience.position[${index}]`"
          label="Должность"
          required
          :root-class="['q-mb-sm']"
          :validation-result="{
            status: v$.experience[index].position.$error ? 'error' : 'success',
            message: getErrorMessage(v$.experience[index].position),
          }"
          @update="v$.experience[index].position.$touch"
        />

        <UiBaseInput
          v-model="form.experience[index].responsibilitys"
          :name="`experience.responsibilitys[${index}]`"
          label="Обязанности на рабочем месте"
          required
          textarea
          :root-class="['q-mb-sm']"
          :validation-result="{
            status: v$.experience[index].responsibilitys.$error
              ? 'error'
              : 'success',
            message: getErrorMessage(v$.experience[index].responsibilitys),
          }"
          @update="v$.experience[index].responsibilitys.$touch"
        />

        <UiBaseButton
          v-if="form.experience && form.experience.length > 1"
          class="q-mb-sm"
          size="small"
          prev-icon="times"
          @click.prevent="deleteOneOfBlock('experience', index)"
        >
          Удалить
        </UiBaseButton>
      </template>
      <UiBaseButton
        v-if="form.experience && form.experience.length"
        class="q-mb-sm"
        size="small"
        type="boarded"
        post-icon="plus"
        :disabled="v$.experience.$errors.length"
        @click.prevent="addExpirienceBlock"
      >
        Добавить
      </UiBaseButton>
    </div>

    <div class="degree base-block base-shadow q-my-xl">
      <p class="text-h2 q-mb-sm">Образование</p>
      <template v-for="(item, index) in form.education" :key="index">
        <UiSelect
          v-model="form.education[index].degree"
          :options="[
            { label: 'Бакалавр', value: '1', selected: false },
            { label: 'Специалитет', value: '2', selected: false },
            { label: 'Магистратура', value: '3', selected: false },
          ]"
          clearable
          class="q-mb-sm"
          :name="`education.degree.${index}`"
          label="Уровень образования"
          :validation-result="{
            status: v$.education[index].degree.$error ? 'error' : 'success',
            message: getErrorMessage(v$.education[index].degree),
          }"
          @update:model-value="v$.education[index].degree.$touch"
        ></UiSelect>

        <UiDatePicker
          v-model="form.education[index].releaseYear"
          label="Год окончания"
          year-picker
          :max-date="new Date()"
          :name="`education.${index}.release`"
          :root-class="'q-mb-sm'"
          :validation-result="{
            status: v$.education[index].releaseYear.$error
              ? 'error'
              : 'success',
            message: getErrorMessage(v$.education[index].releaseYear),
          }"
          @update:model-value="v$.education[index].releaseYear.$touch"
        ></UiDatePicker>
        <UiBaseInput
          v-model="form.education[index].instityte"
          name="instityte"
          label="Институт"
          required
          :root-class="['q-mb-sm']"
          :validation-result="{
            status: v$.education[index].instityte.$error ? 'error' : 'success',
            message: getErrorMessage(v$.education[index].instityte),
          }"
          @update="v$.education[index].instityte.$touch"
        />

        <UiBaseInput
          v-model="form.education[index].faculty"
          :name="`education.${index}.faculty`"
          label="Факультет"
          required
          :root-class="['q-mb-sm']"
          :validation-result="{
            status: v$.education[index].faculty.$error ? 'error' : 'success',
            message: getErrorMessage(v$.education[index].faculty),
          }"
          @update="v$.education[index].faculty.$touch"
        />

        <UiBaseInput
          v-model="form.education[index].specialisation"
          name="specialisation"
          label="Специализация"
          required
          :root-class="['q-mb-sm']"
          :validation-result="{
            status: v$.education[index].specialisation.$error
              ? 'error'
              : 'success',
            message: getErrorMessage(v$.education[index].specialisation),
          }"
          @update="v$.education[index].specialisation.$touch"
        />
        <UiBaseButton
          v-if="form.education && form.education.length > 1"
          class="q-mb-sm"
          size="small"
          prev-icon="times"
          @click.prevent="deleteOneOfBlock('education', index)"
        >
          Удалить
        </UiBaseButton>
      </template>
      <UiBaseButton
        v-if="form.education && form.education.length"
        class="q-mb-sm"
        size="small"
        type="boarded"
        post-icon="plus"
        :disabled="v$.education.$errors.length"
        @click.prevent="addEducationBlock"
      >
        Добавить
      </UiBaseButton>
    </div>
    <UiBaseInput
      v-model="form.aboutMe"
      name="aboutMe"
      label="О себе"
      textarea
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.aboutMe.$error ? 'error' : 'success',
        message: getErrorMessage(v$.aboutMe),
      }"
      @update="updateValue('aboutMe')"
    />
    <!-- <UiBaseCheckbox
        name="current-work"
        v-model="v$.isCurrent.$model"
        label="По настоящее время"
        @update="updateValue('isCurrent')"
        class="q-mb-sm"
        required
        :validation-result="{
          status: v$.isCurrent.$error ? 'error' : 'success',
          message: getErrorMessage(v$.isCurrent),
        }"
      ></UiBaseCheckbox> -->
    <!-- <div class="q-mb-sm">
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
      </div> -->
    <!-- <UiBaseInput
      name="name"
      label="Введите имя"
      required
      :root-class="['q-mb-sm']"
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
      :root-class="['q-mb-sm']"
      v-model="maskedPhone"
      @update="updateValue('phone')"
      :validation-result="{
        status: v$.phone.$error ? 'error' : 'success',
        message: getErrorMessage(v$.phone),
      }"
      mask="+7 (###) ### ##-##"
    />
  
    <UiBaseInput
      name="email"
      label="Введите почту"
      type="text"
      :root-class="['q-mb-sm']"
      v-model="form.email"
      @update="updateValue('email')"
      required
      :validation-result="{
        status: v$.email.$error ? 'error' : 'success',
        message: getErrorMessage(v$.email),
      }"
    />
  
    <div style="display: flex; flex-direction: column" class="q-mb-sm">
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
      class="q-mb-sm"
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
      class="q-mb-sm"
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
import useMultipleBlock from './composables/useMultyBlock'
const { citys, companies, sugestCity, sugestCompany } = useSugestions()

const phoneMask = '+7 (###) ### ##-##'
const mask = new Mask({ mask: phoneMask })
const maskedPhone = ref('')
const unmaskedPhone = computed(() => {
  return mask.unmasked(maskedPhone.value)
})
const userPhoto = ref()
const getUserProto = (filesURLs: unknown[]) => {
  userPhoto.value = filesURLs
}
const form = reactive<Record<string, any>>({
  imageFile: [],
  name: '',
  phone: unmaskedPhone,
  city: '',
  gender: 'male',
  programingLanguages: [],
  experience: [
    {
      startDate: '',
      endDate: '',
      tillNow: false,
      company: '',
      position: '',
      responsibilitys: '',
    },
  ],
  education: [
    {
      degree: [],
      releaseYear: '',
      instityte: '',
      faculty: '',
      specialisation: '',
    },
  ],
  skils: [],
  aboutMe: '111',
})

const mustBeEndOfExperience = (isTillNow: boolean) => {
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
    aboutMe: {},
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
        company: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
        },
        position: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
        },
        responsibilitys: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
          minLength: helpers.withMessage(
            ({ $params }: Record<string, any>) =>
              `Минимум ${$params.min} символов`,
            minLength(6)
          ),
        },
      }
    }),
    education: form.education.map((el: any, index: number) => {
      return {
        degree: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
        },
        releaseYear: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
        },
        instityte: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
        },
        faculty: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
        },
        specialisation: {
          required: helpers.withMessage(
            'Поле обязательно',
            helpers.withMessage('Поле обязательно', required)
          ),
        },
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
const {
  deleteOneOfBlock,
  getEducationForm,
  addExpirienceBlock,
  addEducationBlock,
} = useMultipleBlock(v$, form)

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
  }
}
</script>
<style lang="scss" module>
.image {
  display: flex;
  align-items: center;
  img {
    border-radius: 8px;
    margin-right: 40px;
  }
}
</style>
