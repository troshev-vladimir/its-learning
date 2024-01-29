<template>
  <NuxtLink :to="to" class="base-sidebar-link" :class="{ full: sidebarStatus }">
    <div
      v-tippy="{
        content: title,
        placement: 'right',
        onBeforeUpdate(instance: any, partialProps: any) {
          if (props.sidebarStatus) {
            instance.disable()
          } else {
            instance.enable()
          }
        },
      }"
      class="base-sidebar-link__container"
    >
      <ClientOnly>
        <font-awesome-icon v-if="icon" :icon="icon" />
      </ClientOnly>
      <p class="text-body2" v-if="sidebarStatus && title">
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
