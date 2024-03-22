<template>
  <h1 class="text-h1 q-mb-xs text-center auth__title">
    Для входа в игру введите свой номер
  </h1>
  <p class="q-mb-md text-body2 text-center auth__description">
    чтобы сохранить игровой процесс
  </p>
  <transition name="slide-fade" mode="out-in">
    <FeatureAuthCreateCandidate
      v-if="stage === 'phone'"
      @go-further="stage = 'pin'"
    />
    <FeatureAuthConfirmCandidate
      v-else-if="stage === 'pin'"
      @go-back="stage = 'phone'"
      @go-further="goToGame"
    />
  </transition>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const stage = ref<'phone' | 'pin'>('phone')
const router = useRouter()
const goToGame = () => {
  if (process.env.NODE_ENV === 'production') {
    history.pushState({}, '', 'https://lk.itseducation.ru/configurator/auth/')
    window.location.replace('/its_game')
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.auth {
  &__title {
    font-size: 36px;
  }

  &__description {
    font-size: 16px;
  }
}
</style>
