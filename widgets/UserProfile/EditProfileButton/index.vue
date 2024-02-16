<template>
  <div>
    <UiBaseButton
      type="boarded"
      size="small"
      @click="() => (userProfileEdit = true)"
    >
      Редактировать
    </UiBaseButton>
    <UiBasePopup v-model="userProfileEdit">
      <template #default>
        <FeatureUserProfile
          class="base-block"
          @submit="() => (userProfileEdit = false)"
        />
      </template>
    </UiBasePopup>
  </div>
</template>

<script lang="ts" setup>
const userProfileEdit = ref(false)
</script>
