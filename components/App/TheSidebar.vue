<template>
  <div class="the-sidebar" :class="{ active: isOpen }">
    <div class="the-sidebar__container">
      <div class="the-sidebar__logo-block">
        <div class="logo-block__container">
          <img src="@/assets/img/logo-small.svg" alt="" v-if="!isOpen" />
          <img src="@/assets/img/logo.svg" alt="" v-else />
        </div>
      </div>
      <div class="the-sidebar__user-info-block">
        <div class="user-info-block__photo-span"></div>
        <p class="user-info-block__name"></p>
      </div>
      <div class="the-sidebar__link-list">
        <UiBaseSidebarLink
          v-for="(link, i) in props.links"
          :key="i"
          :icon="link.icon"
          :sidebarStatus="isOpen"
          :title="link.title"
          :class="{ active: link.active }"
          :to="link.to"
        />
      </div>
      <div class="the-sidebar__toggle-button-block">
        <ClientOnly>
          <font-awesome-icon
            :icon="['fas', 'arrow-alt-circle-right']"
            class="toggle-icon text-gray-300"
            :class="{ active: isOpen }"
            @click="() => (isOpen = !isOpen)"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RouterLinkProps } from 'vue-router'

interface LinkInterface {
  icon: string | string[]
  title: string
  active: boolean
  to: string | RouterLinkProps
}

interface Props {
  links: LinkInterface[]
}
const props = defineProps<Props>()
let isOpen = ref(false)
</script>

<style lang="scss" scoped>
.the-sidebar {
  display: flex;
  width: 80px;
  height: 100vh;
  background: $white;
  * {
    transition: 0.2s;
  }

  &__container {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }

  &.active {
    width: 200px;
  }

  &__logo-block,
  .logo-block {
    width: 100%;
    display: flex;
    justify-content: center;

    &__container {
      width: 80%;
      padding: 12px 10px;
      border-bottom: 1px solid $gray-300;

      img {
        width: 100%;
      }
    }
  }

  &__link-list {
    flex: 1 1 auto;
  }

  &__toggle-button-block {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;

    .toggle-icon {
      cursor: pointer;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
