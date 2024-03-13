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
          <img v-if="user?.photoUrl" :src="user?.photoUrl" alt="" />
          <img v-else src="/img/base-user-image.svg" alt="" />
        </div>
        <p v-if="isOpen" class="user-info-block__name">
          {{ user?.name + ' ' + user?.thirdname }}
        </p>
      </NuxtLink>
      <div class="the-sidebar__link-list">
        <AppTheSidebarBaseSidebarLink
          v-for="(link, i) in links"
          :key="i"
          :icon="link.icon"
          :active="link.active"
          :sidebar-status="isOpen"
          :title="link.title"
          :class="{ active: link.active }"
          :to="link.to || ''"
          @click="closeSidebarOnMobile"
        />
        <slot></slot>
      </div>
      <div class="the-sidebar__toggle-button-block">
        <UiBaseIcon
          font-size="16px"
          radius="1000px"
          :icon="['fas', 'arrow-alt-circle-right']"
          class="sidebar-toggle-icon text-gray-300"
          :class="{ active: isOpen }"
          @click="() => (isOpen = !isOpen)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RouterLinkProps } from 'vue-router'
import { useUserStore } from '~/stores/user/index'

interface LinkInterface {
  icon?: string | string[]
  title?: string
  active?: boolean
  to?: string | RouterLinkProps
}

interface Props {
  links?: LinkInterface[]
}

defineProps<Props>()

const { $sidebar } = useNuxtApp()
const { isOpen } = $sidebar
const sidebar = ref<HTMLElement | null>(null)
const { startBodyFreez, stopBodyFreez } = useBodyFreez(isOpen)
const isLoading = ref(true)
const { user } = storeToRefs(useUserStore())

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
  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.the-sidebar {
  background: $white;
  left: -100%;
  display: flex;
  transition: left 0.2s ease;
  box-shadow: 0px 7px 8px 0px rgba(115, 115, 115, 0.25);
  overflow: hidden;

  @media screen and (min-width: $bp-sm) {
    transition: width 0.2s ease;
    left: 0%;
    width: 90px;
  }

  @include media($bp-xs) {
    width: 90px;
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
    justify-content: center;

    &__photo-span {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 100%;
      overflow: hidden;
      flex: 0 0 auto;
      object-fit: contain;
      transition: 0.1s;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
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

    &__name {
      margin-left: 8px;
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
