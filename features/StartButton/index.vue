<template>
  <div class="start-button">
    <UiSpinnerIcon :style="'accent'" v-if="isLoading" />
    <UiBaseIcon
      width="24px"
      height="24px"
      font-size="24px"
      class="start-button__icon stop"
      icon="fa-solid fa-pause"
      :class="{ active: user.startStatus == 'paused' }"
      @click="() => setStatus('paused')"
    />
    <UiBaseIcon
      width="24px"
      height="24px"
      font-size="24px"
      class="start-button__icon start"
      icon="fa-solid fa-play"
      :class="{ active: user.startStatus == 'started' }"
      @click="() => setStatus('started')"
    />
    <UiBaseIcon
      width="24px"
      height="24px"
      font-size="24px"
      class="start-button__icon stop"
      icon="fa-solid fa-stop"
      :class="{ active: user.startStatus == 'stopped' }"
      @click="() => setStatus('stopped')"
    />
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/api/user'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const isLoading = ref(false)

const setStatus = async (status: User['startStatus']) => {
  try {
    isLoading.value = true
    await userStore.setStartStatus(status)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.start-button {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  &__icon {
    cursor: pointer;
    color: $gray-300;

    &.active {
      color: $blue;
    }

    &:hover {
      color: $blue-300;
    }

    &:active {
      color: $blue-900;
    }
  }
}
</style>
