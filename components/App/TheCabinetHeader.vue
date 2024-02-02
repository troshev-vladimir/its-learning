<template>
  <header class="header">
    <div class="header__container">
      <div class="column items-start">
        <div class="header__left-side">
          <div id="cabiner-header-left-side"></div>
        </div>
      </div>
      <p v-if="route.meta.pageTitle" class="text-body1">
        {{ route.meta.pageTitle }}
      </p>
      <div class="header__right-side">
        <div class="header__logout-block row items-center" @click="exit">
          <ClientOnly>
            <font-awesome-icon
              title="Выход"
              class="header__exit-icon q-mr-sm"
              icon="fa-solid fa-right-from-bracket"
            />
          </ClientOnly>
          <p class="text-body2">Выход</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const exit = () => {
  localStorage.clear()
  router.push({ name: 'auth' })
}
</script>

<style scoped lang="scss">
.header {
  background: $white;

  &__logout-block:hover {
    cursor: pointer;
    * {
      color: $blue-400;
      text-decoration: underline;
    }
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding: 24px;

    @media screen and (min-width: $bp-xs) {
      flex-direction: row;
    }
  }

  &__exit-icon {
    font-size: 24px;
    color: $accent;
    cursor: pointer;

    @media screen and (min-width: $bp-xs) {
      font-size: 30px;
    }

    &:hover {
      color: $blue-400;
    }

    &:active {
      color: $blue-900;
    }

    @media (min-width: $bp-xs) {
      font-size: 24px;
    }
  }

  &__left-side {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  &__right-side {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__user-name {
    text-decoration: underline;
    display: none;

    @media (min-width: $bp-xs) {
      display: block;
    }

    &:hover {
      color: $blue-400;
    }
  }

  .logo {
    img {
      height: 42px;

      @media screen and (min-width: $bp-sm) {
        height: 72px;
      }
    }
  }
}
</style>
