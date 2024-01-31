<template>
  <UiBaseButton type="primary" size="small" :disabled="true">
    Кнопка
  </UiBaseButton>
  <UiBaseButton type="secondary" size="small" :disabled="true">
    Кнопка
  </UiBaseButton>
  <UiBaseButton type="boarded" size="small" :disabled="true">
    Кнопка
  </UiBaseButton>
  <UiBaseButton type="link" size="small" :disabled="true">
    Кнопка
  </UiBaseButton>
  <UiBaseButton type="primary" size="small"> Кнопка </UiBaseButton>
  <UiBaseButton type="secondary" size="small"> Кнопка </UiBaseButton>
  <UiBaseButton type="boarded" size="small"> Кнопка </UiBaseButton>
  <UiBaseButton type="link" size="small"> Кнопка </UiBaseButton>
  <!-- <FeatureCV></FeatureCV>
  <client-only>
    <UiBaseTracker :value="80" class="h" size="big" />
  </client-only>
  <client-only>
    <UiBaseTracker :value="80" class="h" size="small" />
  </client-only>

  <UiBaseButton type="primary" size="small">
    <template #left-icon>
      <client-only>
        <font-awesome-icon icon="fa-solid fa-user-astronaut" />
      </client-only>
    </template>
    Базовая кнопка
  </UiBaseButton>
  <UiBaseButton type="secondary" size="small">
    <template #right-icon>
      <client-only>
        <font-awesome-icon icon="fa-solid fa-user-astronaut" />
      </client-only>
    </template>
    Базовая кнопка
  </UiBaseButton>
  <UiBaseButton type="boarded" size="big">
    <template #right-icon>
      <client-only>
        <font-awesome-icon icon="fa-solid fa-user-astronaut" />
      </client-only>
    </template>
    Базовая кнопка
  </UiBaseButton>
  <UiBaseButton type="boarded" size="small" prev-icon="fa-up-right-from-square">
    <template #right-icon>
      <client-only>
        <font-awesome-icon icon="fa-solid fa-user-astronaut" />
      </client-only>
    </template>
    Базовая кнопка1
  </UiBaseButton>
  <UiBaseButton
    type="boarded"
    size="small"
    prev-icon="fa-up-right-from-square"
    :disabled="true"
  >
    <template #right-icon>
      <client-only>
        <font-awesome-icon icon="fa-solid fa-user-astronaut" />
      </client-only>
    </template>
    Базовая кнопка2
  </UiBaseButton>
  <UiBaseButton
    type="external-link"
    size="big"
    to="https://yandex.ru/search/?clid=2353835&text=git+stash+delete&lr=46"
  >
    Базовая ссылка
  </UiBaseButton>
  <UiBaseButton type="link" size="small"> Базовая ссылка </UiBaseButton> -->
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI -kit'

let popup = ref(false)
</script>

<style lang="scss">
@import '~/assets/styles/base-styles.scss';
.resume-form {
  min-width: 90vw;
  @media (min-width: $breakpoint-xs) {
    min-width: 50vw;
  }

  // @media (min-width: $breakpoint-xs) {
  // }
}
</style>
