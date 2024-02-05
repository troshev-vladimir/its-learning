<template>
  <div ref="sidebar" class="the-sidebar" :class="{ active: isOpen }">
    <div class="the-sidebar__container">
      <NuxtLink
        v-tippy="{
          placement: 'right',
          onShow() {
            return !isOpen
          },
        }"
        :content="'Личный кабинет'"
        to="/cabinet"
        class="the-sidebar__user-info-block"
        @click="closeSidebarOnMobile"
      >
        <div class="user-info-block__photo-span">
          <img src="~/assets/img/base-user-image.svg" alt="" />
        </div>
        <p v-if="isOpen" class="user-info-block__name">Виктор Андреевич</p>
      </NuxtLink>
      <div class="the-sidebar__link-list">
        <AppTheSidebarBaseSidebarLink
          v-for="(link, i) in links"
          :key="i"
          :icon="link.icon"
          :sidebar-status="isOpen"
          :title="link.title"
          :class="{ active: link.active }"
          :to="link.to || ''"
          @click="closeSidebarOnMobile"
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
import { useBodyFreez } from '~/composables'

interface LinkInterface {
  icon?: string | string[]
  title?: string
  active?: boolean
  to?: string | RouterLinkProps
}

interface Props {
  links: LinkInterface[]
}

const props = defineProps<Props>()
const isOpen = ref(false)
const sidebar = ref<HTMLElement | null>(null)

const { startBodyFreez, stopBodyFreez } = useBodyFreez(isOpen)

const closeSidebarOnMobile = () => {
  if (window.outerWidth < 600 && isOpen.value === true) {
    isOpen.value = false
  }
}

const onClickOutSidebar = (event: any) => {
  if (
    sidebar.value &&
    !event.target.closest('.the-sidebar') &&
    !event.target.closest('.sidebar-toggle-icon') &&
    isOpen.value == true
  ) {
    isOpen.value = false
  }
}

const setBodyFreezOnMobile = () => {
  if (window.outerWidth < 600) {
    startBodyFreez()
  } else {
    stopBodyFreez()
  }
}

watch(isOpen, () => {
  if (isOpen.value === true) {
    document.addEventListener('click', onClickOutSidebar)
  } else {
    document.removeEventListener('click', onClickOutSidebar)
  }
})

onMounted(() => {
  setBodyFreezOnMobile()
  window.addEventListener('orientationchange', setBodyFreezOnMobile)
  window.addEventListener('resize', setBodyFreezOnMobile)
})
</script>

<style lang="scss" scoped>
.the-sidebar {
  background: $white;
  left: -100%;
  display: flex;
  height: 100%;
  transition: left 0.2s ease;

  @media screen and (min-width: $bp-sm) {
    transition: width 0.2s ease;
    left: 0%;
    height: 100vh;
    width: 80px;
  }

  @include media($bp-xs) {
    width: 80px;
  }
  &.active {
    left: 0% !important;
    width: 100%;

    @media screen and (min-width: $bp-xs) {
      width: 200px;
    }
  }

  * {
    transition: 0.2s;
  }

  &__container {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 48px;
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
      transition: 0.1s;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      * {
        text-decoration: underline;
        color: $blue-500;
      }

      .user-info-block__photo-span {
        outline: 2px solid $blue-500;
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
  font-size: 16px;
  &.active {
    transform: rotate(180deg);
  }

  &_mobile {
    display: block;

    @media (min-width: $bp-sm) {
      display: none;
    }
  }
}
</style>
