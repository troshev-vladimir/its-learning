<template>
  <UiExpancionItem class="education-lesson-accardion" :model-value="true">
    <template #header>
      <div class="education-lesson-accardion__header">
        <ClientOnly>
          <font-awesome-icon icon="fas fa-chevron-don" />
        </ClientOnly>
        <p class="text-body1">Пример урока</p>
      </div>
    </template>
    <template #default>
      <div class="education-lesson-accardion__content">
        123
        <slot></slot>
      </div>
    </template>
  </UiExpancionItem>
</template>

<script lang="ts" setup></script>

<style lang="sass" scoped></style>
