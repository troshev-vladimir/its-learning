<template>
  <NuxtLink
    v-if="to && title"
    :to="to"
    class="base-sidebar-link"
    :class="{ full: sidebarStatus }"
    no-prefetch
  >
    <div
      v-tippy="{
        placement: 'right',
        onShow() {
          return !props.sidebarStatus
        },
      }"
      :content="title"
      class="base-sidebar-link__container"
    >
      <UiBaseIcon
        font-size="16px"
        width="20px"
        hight="16px"
        radius="4px"
        :icon="icon"
      />
      <p v-if="sidebarStatus && title" class="text-body2">
        {{ title }}
      </p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { RouterLinkProps } from 'vue-router'

const props = defineProps<{
  icon?: string | string[]
  title?: string
  sidebarStatus: boolean
  to: string | RouterLinkProps
  active?: boolean
}>()
</script>

<style lang="scss" scoped>
.base-sidebar-link {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '';
    display: block;
    width: 4px;
    height: 90%;
    position: absolute;
    right: 0;
    border-radius: 8px 0 0 8px;
  }

  &.router-link-exact-active,
  &.active {
    &::after {
      background: $blue-600;
    }
  }

  &__container {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 12px;
    margin: 0px 10px 0px 8px;

    * {
      color: $gray-400;
    }
  }

  &:hover &__container,
  &.router-link-exact-active &__container,
  &.active &__container {
    border-radius: 8px;
    background: $blue-100;
    * {
      color: $blue-600;
    }
  }

  &.full &__container {
    justify-content: flex-start;
  }
}
</style>
