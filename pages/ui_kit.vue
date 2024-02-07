<template>
  <section>
    <div v-if="pending" class="sdf">asdasd</div>
    <div v-else-if="error" class="asdf">{{ error.cause }}</div>
    <div v-else class="asdf">{{ user }}</div>

    <UiBaseButton @click="userStore.$reset()">reset </UiBaseButton>
    <FeaturePaymentCard />

    <!-- <UiBaseButton
      @click="
        notify({
          title: 'Authorization',
          text: 'You have been logged in!',
          duration: 10000,
          speed: 1000,
          data: {
            auth: true,
          },
        })
      "
    >
      notify
    </UiBaseButton> -->
  </section>
</template>

<script setup lang="ts">
// import { useNotification } from '@kyvg/vue3-notification'
// const { notify } = useNotification()

definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI-kit'

import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { pending, error } = await useLazyAsyncData(
  'user',
  () => userStore.fetchUser().then(() => true),
  { server: false }
)

onMounted(() => {})
</script>

<style lang="scss"></style>
