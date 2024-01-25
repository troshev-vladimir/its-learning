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
        <div class="user-info-block__photo-span">
          <img
            src="https://www.nuxtjs.cn/logos/nuxt-icon-white@2x.png"
            alt=""
          />
        </div>
        <p class="user-info-block__name" v-if="isOpen">Елизавета Воробьева</p>
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
            class="sidebar-toggle-icon text-gray-300"
            :class="{ active: isOpen }"
            @click="() => (isOpen = !isOpen)"
          />
        </ClientOnly>
        <teleport to="#cabiner-header-left-side">
          <ClientOnly>
            <font-awesome-icon
              :icon="['fas', 'arrow-alt-circle-right']"
              class="sidebar-toggle-icon sidebar-toggle-icon_mobile text-gray-300"
              :class="{ active: isOpen }"
              @click="() => (isOpen = !isOpen)"
            />
          </ClientOnly>
        </teleport>
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
  background: $white;
  left: -100%;
  display: flex;
  height: 100%;
  overflow: hidden;

  @media screen and (min-width: $breakpoint-xs) {
    height: 100vh;
    width: 80px;
    animation: none;
  }

  * {
    transition: 0.2s;
  }

  &__container {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .show-enter-from {
    animation: showSidebarMobile 0.2s ease;

    @media screen and (min-width: $breakpoint-xs) {
      animation: showSidebarDesctop 0.2s ease;
    }

    @keyframes showSidebarMobile {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0%);
      }
    }

    @keyframes showSidebarDesctop {
      from {
        width: 80px;
      }
      to {
        width: 200px;
      }
    }
  }

  &.active {
    left: 0% !important;
    width: 100%;
    animation: showSidebarMobile 0.2s ease;

    @media screen and (min-width: $breakpoint-xs) {
      width: 200px;
      animation: showSidebarDesctop 0.2s ease;
    }
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
      display: flex;
      justify-content: center;

      img {
        width: 50%;

        @media screen and (min-width: $breakpoint-xs) {
          width: 100%;
        }
      }
    }
  }

  &__user-info-block,
  .user-info-block {
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    &__photo-span {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      overflow: hidden;
      flex: 0 0 auto;
      object-fit: contain;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &__link-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1 1 auto;
  }

  &__toggle-button-block {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
  }
}
</style>

<style lang="scss">
.sidebar-toggle-icon {
  cursor: pointer;
  &.active {
    transform: rotate(180deg);
  }

  &_mobile {
    display: block;

    @media (min-width: $breakpoint-xs) {
      display: none;
    }
  }
}
</style>
