<template>
  <div class="base-icon">
    <UiBaseSkeleton
      v-if="isLoading"
      :width="width || fontSize"
      :height="height || fontSize"
      :radius="radius"
      :background="background"
      class="base-icon__skeleton"
    />
    <slot v-if="!isLoading">
      <ClientOnly>
        <font-awesome-icon :icon="icon" :style="{ 'font-size': fontSize }" />
      </ClientOnly>
    </slot>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  icon?: string | string[]
  fontSize?: string
  width?: string
  height?: string
  radius?: string
  background?: string
}
defineProps<Props>()
const isLoading = ref(true)

onMounted(() => {
  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.base-icon {
  min-width: v-bind(width);
  &__skeleton {
    flex: 1 1 auto;
  }
}
</style>
