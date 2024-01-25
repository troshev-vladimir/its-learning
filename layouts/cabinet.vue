<template>
  <div class="cabinet-layout">
    <AppTheSidebar class="cabinet-layout__sidebar" :links="sidebarLinks">
    </AppTheSidebar>
    <div class="cabinet-layout__container">
      <AppTheCabinetHeader class="cabinet-layout__header" />
      <div class="container">
        <slot></slot>
      </div>
      <AppTheFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
let route = useRoute()
let sidebarLinks = computed(() => [
  {
    icon: 'fas fa-book-open',
    title: 'Обучение',
    active: route.name == 'cabinet',
    to: '/cabinet',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Трудоустройство',
    active: false,
    to: '/',
  },
  {
    icon: 'fas fa-code',
    title: 'Ui-kit',
    active: route.name == 'ui_kit',
    to: '/ui_kit',
  },
])
</script>

<style lang="scss" scoped>
.cabinet-layout {
  min-height: 100vh;
  display: flex;

  &__sidebar {
    position: fixed;
    z-index: 2;
    top: 65px;

    @media screen and (min-width: $breakpoint-xs) {
      position: sticky;
      top: 0;
    }
  }

  &__header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  &__container {
    flex: 1 1 auto;

    .container {
      min-height: calc(100vh - 70px);
      margin-top: 32px;
      margin-bottom: 32px;
    }
  }
}
</style>
