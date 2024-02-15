<template>
  <section>
    <!-- <UiBaseButton @click="userStore.$reset()">reset </UiBaseButton> -->
    <ClientOnly>
      <FeaturePaymentCard />
    </ClientOnly>

    <UiBaseSkeleton width="120px" height="120px" />

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
</script>

<style lang="scss" scoped>
.skeleton {
  width: 100px;
  height: 100px;
}

.background {
  width: 100%;
  height: 1000px;
  background: $white;
  position: relative;
  overflow-x: hidden;
}
</style>
