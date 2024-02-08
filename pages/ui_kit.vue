<template>
  <section>
    <!-- <UiBaseButton @click="userStore.$reset()">reset </UiBaseButton> -->
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
definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI-kit'
</script>

<style lang="scss"></style>
