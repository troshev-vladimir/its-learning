import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    defaultProps: {
      arrow: true,
      theme: 'custom',
      interactive: false,
    },
  })
})
