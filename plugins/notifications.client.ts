import Notifications from '@kyvg/vue3-notification'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Notifications, {
    type: 'warn', //success , error
    duration: 1000000,
    speed: 100000,
  })
})
