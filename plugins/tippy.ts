import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    defaultProps: {
      arrow: true,
      theme: 'custom',
      interactive: true,
    },
    flipDuration: 0,
  })
})
