<template>
  <section>
    <div v-if="pending" class="sdf">asdasd</div>
    <div v-else-if="error" class="asdf">{{ error.cause }}</div>
    <div v-else class="asdf">{{ user }}</div>

    <UiBaseButton @click="userStore.$reset()">reset </UiBaseButton>
    <FeaturePaymentCard />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI-kit'

import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { pending, error } = await useLazyAsyncData('user', () =>
  userStore.fetchUser().then(() => true)
)
route.meta.pageTitle = 'UI -kit'
</script>

<style lang="scss"></style>
