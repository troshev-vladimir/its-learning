<template>
  <section>
    <div v-if="pending" class="sdf">asdasd</div>
    <div v-else class="asdf">{{ user }}</div>

    <UiBaseButton @click="userStore.$reset()">reset </UiBaseButton>
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

const { pending } = await useLazyAsyncData('user', () =>
  userStore.fetchUser().then(() => true)
)
</script>

<style lang="scss"></style>
