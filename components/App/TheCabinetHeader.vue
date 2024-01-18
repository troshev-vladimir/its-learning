<template>
  <header class="header q-pt-md">
    <div class="header__container container">
      <div class="logo column items-start">
        <img src="~/assets/img/logo.svg" alt="logo" />
        <span class="text-body1">Академия 1С программирования</span>
      </div>
      <div class="header__right-side">
        <router-link to="/cabinet">
          <p class="header__user-name">Иван Иванович</p>
        </router-link>
        <font-awesome-icon
          title="Выход"
          class="header__exit-icon"
          icon="fa-solid fa-right-from-bracket"
          @click="exit"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const exit = () => {
  localStorage.clear()
  router.push({ name: 'auth' })
}
</script>

<style scoped lang="scss">
.header {
  &__container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: nowrap;

    @media screen and (min-width: $breakpoint-xs) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__exit-icon {
    font-size: 30px;
    color: $accent;
    cursor: pointer;

    &:hover {
      color: $blue-400;
    }

    &:active {
      color: $blue-900;
    }

    @media (min-width: $breakpoint-xs) {
      font-size: 24px;
    }
  }

  &__right-side {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__user-name {
    text-decoration: underline;
    display: none;

    @media (min-width: $breakpoint-xs) {
      display: block;
    }

    &:hover {
      color: $blue-400;
    }
  }

  .logo {
    img {
      height: 42px;

      @media screen and (min-width: $breakpoint-sm) {
        height: 72px;
      }
    }
  }
}
</style>
