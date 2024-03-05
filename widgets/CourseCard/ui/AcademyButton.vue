<template>
  <UiBaseButton
    :model-value="isLoading"
    class="course-card__button"
    type="boarded"
    size="small"
    @click="sendAcademy"
  >
    Запросить академический отпуск
  </UiBaseButton>
</template>

<script lang="ts" setup>
const isLoading = ref(false)
const sendAcademy = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}
</script>

<script lang="ts">
export default {}
</script>
