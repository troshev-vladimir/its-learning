<template>
  <div>
    <UiBaseForm v-model="form">
      <template #default="{ validators }">
        <UiBaseInput
          :rules="[validators.minMaxLength(1, 4)]"
          name="name12"
          label="Введите имя"
          class="q-mb-xl"
        />

        <UiBaseInput name="email" label="Введите почту" class="q-mb-lg" />
      </template>
    </UiBaseForm>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name12: {
    value: '1asasdad',
    status: 'error',
    message: 'asdasd',
  },
  email: {
    value: 'asdasd',
    status: null,
    message: 'asdasd',
  },
})
</script>

<style scoped lang="scss"></style>
